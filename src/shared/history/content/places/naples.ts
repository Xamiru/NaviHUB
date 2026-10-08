import { definePlace } from '../../schema'

export default definePlace({
  id: 'naples',
  names: [
    { text: 'Naples', lang: 'en', role: 'primary' },
    { text: 'Napoli', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 40.842,
    lon: 14.2431,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Naples (ne_id 1159151313)' }
      }
    ]
  }
})
