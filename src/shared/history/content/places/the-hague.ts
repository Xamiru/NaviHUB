import { definePlace } from '../../schema'

export default definePlace({
  id: 'the-hague',
  names: [
    { text: 'The Hague', lang: 'en', role: 'primary' },
    { text: 'Den Haag', lang: 'nl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'NL',
  coords: {
    lat: 52.08,
    lon: 4.27,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'The Hague (ne_id 1159149457)' }
      }
    ]
  }
})
