import { definePlace } from '../../schema'

export default definePlace({
  id: 'hamadan',
  names: [
    { text: 'Hamadan', lang: 'en', role: 'primary' },
    { text: 'همدان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 34.796,
    lon: 48.515,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Hamadan (ne_id 1159150133)' }
      }
    ]
  }
})
