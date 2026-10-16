import { definePlace } from '../../schema'

export default definePlace({
  id: 'balkh',
  names: [
    { text: 'Balkh', lang: 'en', role: 'primary' },
    { text: 'بلخ', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'AF',
  coords: {
    lat: 36.7501,
    lon: 66.8997,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Balkh (ne_id 1159144599)' }
      }
    ]
  }
})
