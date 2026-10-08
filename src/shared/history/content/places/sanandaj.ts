import { definePlace } from '../../schema'

export default definePlace({
  id: 'sanandaj',
  names: [
    { text: 'Sanandaj', lang: 'en', role: 'primary' },
    { text: 'سنندج', lang: 'fa', role: 'native', translit: 'Sanandaj' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 35.3,
    lon: 47.02,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Sanandaj (ne_id 1159130783)' }
      }
    ]
  }
})
