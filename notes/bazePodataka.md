Database Documentation: tkatic

Ova baza podataka koristi InnoDB engine i podržava relacijski integritet putem stranih ključeva (Foreign Keys).
Entity Relationship Diagram (Pregled)

Baza je strukturirana oko tablice Users koja se grana na klijente i čistače, dok je Bookings centralna transakcijska tablica.
Tablice i Struktura

1. Users

Glavna tablica za sve korisnike sustava.
| Stupac | Tip | Opis |
| :--- | :--- | :--- |
| id | INT (PK) | Jedinstveni identifikator (Unsigned) |
| ime_prezime | VARCHAR(100) | Ime i prezime korisnika |
| email | VARCHAR(100) | Unique email za prijavu |
| lozinka_hash | VARCHAR(255) | Kriptirana lozinka (Bcrypt) |
| uloga | ENUM | 'client', 'cleaner', 'admin' | 2. Services

Katalog dostupnih vrsta čišćenja.
| Stupac | Tip | Opis |
| :--- | :--- | :--- |
| id | INT (PK) | ID usluge |
| naziv | VARCHAR(100) | Npr. 'Dubinsko čišćenje' |
| osnovna_cijena | DECIMAL | Početna cijena usluge | 3. Cleaner_Profiles

Dodatni podaci isključivo za zaposlenike (Čistače).
| Stupac | Tip | Opis |
| :--- | :--- | :--- |
| user_id | INT (FK) | Poveznica na Users.id (1:1) |
| cijena_po_satu | DECIMAL | Satnica čistača |
| prosjecna_ocjena| DECIMAL | Izračunata iz recenzija | 4. Bookings

Rezervacije i radni nalozi. Povezuje klijenta, čistača i vrstu usluge.
| Stupac | Tip | Opis |
| :--- | :--- | :--- |
| id | INT (PK) | Broj narudžbe/naloga |
| client_id | INT (FK) | Tko je naručio (Users) |
| cleaner_id | INT (FK) | Tko čisti (Users) |
| service_id | INT (FK) | Što se čisti (Services) |
| status | ENUM | Na čekanju, Potvrđeno, U tijeku, Završeno... |
Relacije (Foreign Keys)

    Cleaner_Profiles (user_id) ⮕ Users (id) [ON DELETE CASCADE]

    Availabilities (cleaner_id) ⮕ Users (id)

    Bookings (client_id) ⮕ Users (id)

    Bookings (cleaner_id) ⮕ Users (id)

    Bookings (service_id) ⮕ Services (id)

    Reviews (booking_id) ⮕ Bookings (id) [ON DELETE CASCADE]
