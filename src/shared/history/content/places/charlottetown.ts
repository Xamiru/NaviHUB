import { definePlace } from '../../schema'

export default definePlace({
  id: 'charlottetown',
  names: [
    { text: 'Charlottetown', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'CA',
  coords: {
    lat: 46.2493,
    lon: -63.1313,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Charlottetown (ne_id 1159151075)' }
      }
    ]
  }
})
