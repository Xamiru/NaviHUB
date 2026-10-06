import { definePlace } from '../../schema'

export default definePlace({
  id: 'tehran',
  names: [
    { text: 'Tehran', lang: 'en', role: 'primary' },
    { text: 'تهران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 35.6739,
    lon: 51.4224,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tehran (ne_id 1159151551)' }
      }
    ]
  }
})
