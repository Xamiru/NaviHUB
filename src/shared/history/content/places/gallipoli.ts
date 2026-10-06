import { definePlace } from '../../schema'

export default definePlace({
  id: 'gallipoli',
  names: [
    { text: 'Gallipoli peninsula', lang: 'en', role: 'primary' },
    { text: 'Gelibolu', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'region',
  regions: ['mena'],
  modernCountry: 'TR'
})
