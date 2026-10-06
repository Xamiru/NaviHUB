import { definePlace } from '../../schema'

export default definePlace({
  id: 'sokoto',
  names: [
    { text: 'Sokoto', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'NG',
  coords: {
    lat: 13.06,
    lon: 5.24,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Sokoto (ne_id 1159150773)' }
      }
    ]
  }
})
