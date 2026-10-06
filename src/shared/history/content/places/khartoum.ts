import { definePlace } from '../../schema'

export default definePlace({
  id: 'khartoum',
  names: [
    { text: 'Khartoum', lang: 'en', role: 'primary' },
    { text: 'الخرطوم', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'SD',
  coords: {
    lat: 15.59,
    lon: 32.5322,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Khartoum (ne_id 1159151275)' }
      }
    ]
  }
})
