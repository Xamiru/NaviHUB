import { definePlace } from '../../schema'

export default definePlace({
  id: 'plassey',
  names: [
    { text: 'Plassey', lang: 'en', role: 'primary' },
    { text: 'Palashi', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  placeType: 'battlefield',
  regions: ['south-asia'],
  modernCountry: 'IN'
})
