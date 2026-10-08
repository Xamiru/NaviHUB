import { definePlace } from '../../schema'

export default definePlace({
  id: 'reykjavik',
  names: [
    { text: 'Reykjavík', lang: 'en', role: 'primary' },
    { text: 'Reykjavík', lang: 'is', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IS',
  coords: {
    lat: 64.15,
    lon: -21.95,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Reykjavík (ne_id 1159150587)' }
      }
    ]
  }
})
