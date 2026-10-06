import { definePlace } from '../../schema'

export default definePlace({
  id: 'karbala',
  names: [
    { text: 'Karbala', lang: 'en', role: 'primary' },
    { text: 'كربلاء', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 32.6149,
    lon: 44.0245,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Karbala (ne_id 1159142291)' }
      }
    ]
  }
})
