import { definePlace } from '../../schema'

export default definePlace({
  id: 'brandenburg-gate',
  names: [
    { text: 'Brandenburg Gate', lang: 'en', role: 'primary' },
    { text: 'Brandenburger Tor', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'building',
  regions: ['europe'],
  modernCountry: 'DE'
})
