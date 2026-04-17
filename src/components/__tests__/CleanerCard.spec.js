import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CleanerCard from '../CleanerCard.vue'

describe('CleanerCard.vue', () => {
  const testniCistac = {
    ime: 'Marija',
    prezime: 'Čisto',
    avatar: 'https://cdn.quasar.dev/img/avatar.png',
    ocjena: 4.8,
    recenzije: 10,
    ukupnoPoslova: 50,
    cijena: 15,
    usluge: ['Generalno čišćenje', 'Pranje prozora'],
  }

  // Zajedničke postavke za mountanje komponente
  const globalnaKonfiguracija = {
    directives: {
      ripple: {},
    },
    stubs: {
      // Koristimo template sa slotovima kako bi se tekst unutar njih zapravo iscrtao
      QCard: { template: '<div @click="$emit(\'click\')"><slot /></div>' },
      QCardSection: { template: '<div><slot /></div>' },
      QAvatar: { template: '<div><slot /></div>' },
      QIcon: { template: '<span><slot /></span>' },
      QBtn: { template: '<button><slot /></button>' },
    },
  }

  it('ispravno prikazuje ime čistača i cijenu', () => {
    const wrapper = mount(CleanerCard, {
      props: {
        cistac: testniCistac,
      },
      global: globalnaKonfiguracija,
    })

    // Provjeravamo ime i prezime
    expect(wrapper.text()).toContain('Marija')
    expect(wrapper.text()).toContain('Čisto')
    // Provjeravamo cijenu (očekujemo broj 15 uz simbol € iz templatea)
    expect(wrapper.text()).toContain('15')
  })

  it('emitira "click" event kada se klikne na karticu', async () => {
    const wrapper = mount(CleanerCard, {
      props: {
        cistac: testniCistac,
      },
      global: globalnaKonfiguracija,
    })

    // Budući da smo QCard stubali kao div, okidamo click na njemu
    await wrapper.trigger('click')

    // Provjera je li komponenta emitirala 'click'
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
