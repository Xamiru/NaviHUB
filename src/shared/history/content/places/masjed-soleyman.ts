import { definePlace } from '../../schema'

export default definePlace({
  id: 'masjed-soleyman',
  names: [
    { text: 'Masjed Soleyman', lang: 'en', role: 'primary' },
    { text: 'مسجد سلیمان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 31.98,
    lon: 49.2999,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Masjed Soleyman (ne_id 1159130749)' }
      }
    ]
  }
})
