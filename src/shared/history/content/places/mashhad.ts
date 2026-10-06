import { definePlace } from '../../schema'

export default definePlace({
  id: 'mashhad',
  names: [
    { text: 'Mashhad', lang: 'en', role: 'primary' },
    { text: 'مشهد', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.272,
    lon: 59.5681,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Mashhad (ne_id 1159151421)' }
      }
    ]
  }
})
