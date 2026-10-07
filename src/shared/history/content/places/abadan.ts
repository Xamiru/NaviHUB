import { definePlace } from '../../schema'

export default definePlace({
  id: 'abadan',
  names: [
    { text: 'Abadan', lang: 'en', role: 'primary' },
    { text: 'آبادان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 30.3307,
    lon: 48.2797,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Abadan (ne_id 1159148667)' }
      }
    ]
  }
})
