import { definePlace } from '../../schema'

export default definePlace({
  id: 'baghdad',
  names: [
    { text: 'Baghdad', lang: 'en', role: 'primary' },
    { text: 'بغداد', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 33.3406,
    lon: 44.3919,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Baghdad (ne_id 1159151547)' }
      }
    ]
  }
})
