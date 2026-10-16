import { definePlace } from '../../schema'

export default definePlace({
  id: 'plymouth',
  names: [
    { text: 'Plymouth', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 50.3854,
    lon: -4.16,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Plymouth (ne_id 1159135121)' }
      }
    ]
  }
})
