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

  it('ispravno prikazuje ime čistača i cijenu', () => {
    const wrapper = mount(CleanerCard, {
      props: {
        cistac: testniCistac, // Usklađeno s propom u komponenti
      },
      global: {
        stubs: {
          QCard: { template: '<div><slot /></div>' },
          QCardSection: { template: '<div><slot /></div>' },
          QAvatar: { template: '<div><slot /></div>' },
          QIcon: true,
          QBtn: true,
        },
      },
    })

    // Provjeravamo ime i prezime
    expect(wrapper.text()).toContain('Marija')
    expect(wrapper.text()).toContain('Čisto')
    // Provjeravamo cijenu
    expect(wrapper.text()).toContain('15')
  })

  it('emitira "click" event kada se klikne na karticu', async () => {
    const wrapper = mount(CleanerCard, {
      props: {
        cistac: testniCistac,
      },
      global: {
        stubs: { QCard: { template: '<div @click="$emit(\'click\')"><slot /></div>' } },
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click') // Provjera emitera
  })
})
