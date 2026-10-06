import { definePlace } from '../../schema'

export default definePlace({
  id: 'mexico-city',
  names: [
    { text: 'Mexico City', lang: 'en', role: 'primary' },
    { text: 'Ciudad de México', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'MX'
})
