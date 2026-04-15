import db from '../config/db.js'

// 1. KREIRANJE REZERVACIJE
export const createBooking = async (req, res) => {
  console.log("Stigao zahtjev za booking:", req.body);

  const {
    cleaner_id,
    service_id,
    adresa,
    kvadratura,
    datum_ciscenja,
    vrijeme_pocetka,
    ukupna_cijena,
    oprema_agencije,
    napomena,
  } = req.body

  const client_id = req.user.id

  // 1. OSIGURANJE TIPOVA PODATAKA (Bitno za mrežne filtere na ucka)
  // Pretvaramo true/false u 1/0 jer neki MySQL filteri ne vole boolean objekte
  const oprema = oprema_agencije === true || oprema_agencije === 1 ? 1 : 0;

  // Osiguravamo da su brojevi stvarno brojevi, a ne stringovi
  const c_id = parseInt(cleaner_id);
  const s_id = parseInt(service_id);
  const kvad = parseInt(kvadratura);
  const cijena = parseFloat(ukupna_cijena);

  // Ako je napomena prazna, stavljamo null ili prazan string da izbjegnemo undefined
  const napomenaFinal = napomena || "";
  const adresaFinal = adresa || "Nije navedena";

  try {
    const [result] = await db.execute(
      `INSERT INTO Bookings
      (client_id, cleaner_id, service_id, adresa, kvadratura, datum_ciscenja, vrijeme_pocetka, ukupna_cijena, oprema_agencije, napomena, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Na čekanju')`,
      [
        client_id,    // 1
        c_id,         // 2
        s_id,         // 3
        adresaFinal,  // 4
        kvad,         // 5
        datum_ciscenja, // 6 (format: 'YYYY-MM-DD')
        vrijeme_pocetka, // 7 (format: 'HH:mm:ss')
        cijena,       // 8
        oprema,       // 9
        napomenaFinal // 10
      ],
    )

    console.log("Rezervacija uspješno spremljena, ID:", result.insertId);

    res.status(201).json({
      poruka: 'Rezervacija uspješno kreirana',
      bookingId: result.insertId
    })
  } catch (error) {
    console.error("DETALJNA GREŠKA NA BACKENDU:", error);
    res.status(500).json({
      poruka: 'Greška pri kreiranju rezervacije na serveru',
      detalji: error.message,
      sqlCode: error.code // Ovo će nam reći je li problem u tablici ili filteru
    })
  }
}

// 2. DOHVAĆANJE MOJIH REZERVACIJA (Popravljeno s JOIN-om)
export const getMyBookings = async (req, res) => {
  const userId = req.user.id
  const rola = req.user.uloga

  try {
    let query = ''
    if (rola === 'cleaner') {
      // Dodani klijent_email i klijent_telefon
      query = `
        SELECT
          b.*,
          s.naziv as usluga_ime,
          u.ime_prezime as klijent_ime,
          u.email as klijent_email,
          u.telefon as klijent_telefon
        FROM Bookings b
        JOIN Services s ON b.service_id = s.id
        JOIN Users u ON b.client_id = u.id
        JOIN Cleaner_Profiles cp ON b.cleaner_id = cp.user_id
        WHERE cp.user_id = ?
        ORDER BY b.datum_ciscenja DESC
      `
    } else {
      // Dodani cistac_email i cistac_telefon
      query = `
        SELECT
          b.*,
          s.naziv as usluga_ime,
          u.ime_prezime as cistac_ime,
          u.email as cistac_email,
          u.telefon as cistac_telefon
        FROM Bookings b
        LEFT JOIN Services s ON b.service_id = s.id
        LEFT JOIN Cleaner_Profiles cp ON b.cleaner_id = cp.user_id
        LEFT JOIN Users u ON cp.user_id = u.id
        WHERE b.client_id = ?
        ORDER BY b.datum_ciscenja DESC
      `
    }

    const [rows] = await db.execute(query, [userId])
    res.json(rows)
  } catch (error) {
    res.status(500).json({ poruka: 'Greška u bazi', detalji: error.message })
  }
}

// 3. OTKAZIVANJE REZERVACIJE
export const cancelBooking = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  try {
    // Koristimo 'Otkazano' da odgovara tvom UI-u i bazi
    await db.execute(`UPDATE Bookings SET status = 'Otkazano' WHERE id = ? AND client_id = ?`, [
      id,
      userId,
    ])
    res.json({ poruka: 'Rezervacija otkazana' })
  } catch (error) {
    res.status(500).json({ poruka: 'Greška pri otkazivanju', detalji: error.message })
  }
}
