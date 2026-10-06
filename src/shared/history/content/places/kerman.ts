import { definePlace } from '../../schema'

export default definePlace({
  id: 'kerman',
  names: [
    { text: 'Kerman', lang: 'en', role: 'primary' },
    { text: 'کرمان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 30.3,
    lon: 57.08,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kerman (ne_id 1159147317)' }
      }
    ]
  }
})
