import { definePlace } from '../../schema'

export default definePlace({
  id: 'finckenstein-palace',
  names: [
    { text: 'Finckenstein Palace', lang: 'en', role: 'primary' },
    { text: 'Pałac w Kamieńcu', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'building',
  regions: ['europe'],
  modernCountry: 'PL'
})
