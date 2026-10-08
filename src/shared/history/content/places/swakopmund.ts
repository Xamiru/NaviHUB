import { definePlace } from '../../schema'

export default definePlace({
  id: 'swakopmund',
  names: [
    { text: 'Swakopmund', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'NA',
  coords: {
    lat: -22.6689,
    lon: 14.535,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Swakopmund (ne_id 1159148233)' }
      }
    ]
  }
})
