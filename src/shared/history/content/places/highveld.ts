import { definePlace } from '../../schema'

export default definePlace({
  id: 'highveld',
  names: [
    { text: 'Highveld', lang: 'en', role: 'primary' },
    { text: 'Hoëveld', lang: 'af', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA'
})
