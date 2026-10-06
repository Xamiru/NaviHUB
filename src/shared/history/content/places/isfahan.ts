import { definePlace } from '../../schema'

export default definePlace({
  id: 'isfahan',
  names: [
    { text: 'Isfahan', lang: 'en', role: 'primary' },
    { text: 'اصفهان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 32.702,
    lon: 51.6981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Isfahan (ne_id 1159150971)' }
      }
    ]
  }
})
