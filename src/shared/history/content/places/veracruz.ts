import { definePlace } from '../../schema'

export default definePlace({
  id: 'veracruz',
  names: [
    { text: 'Veracruz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'MX',
  coords: {
    lat: 19.1773,
    lon: -96.16,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Veracruz (ne_id 1159150763)' }
      }
    ]
  }
})
