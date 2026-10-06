import { definePlace } from '../../schema'

export default definePlace({
  id: 'kashan',
  names: [
    { text: 'Kashan', lang: 'en', role: 'primary' },
    { text: 'کاشان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 33.9804,
    lon: 51.58,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kashan (ne_id 1159142579)' }
      }
    ]
  }
})
