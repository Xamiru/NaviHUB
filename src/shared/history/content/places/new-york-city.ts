import { definePlace } from '../../schema'

export default definePlace({
  id: 'new-york-city',
  names: [
    { text: 'New York City', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US'
})
