import { definePlace } from '../../schema'

export default definePlace({
  id: 'najaf',
  names: [
    { text: 'Najaf', lang: 'en', role: 'primary' },
    { text: 'النجف', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 32.0003,
    lon: 44.3354,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Najaf (ne_id 1159150089)' }
      }
    ]
  }
})
