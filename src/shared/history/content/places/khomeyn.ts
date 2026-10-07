import { definePlace } from '../../schema'

export default definePlace({
  id: 'khomeyn',
  names: [
    { text: 'Khomeyn', lang: 'en', role: 'primary' },
    { text: 'Khomein', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR'
})
