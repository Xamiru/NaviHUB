import { definePlace } from '../../schema'

export default definePlace({
  id: 'ahmedabad',
  names: [
    { text: 'Ahmedabad', lang: 'en', role: 'primary' },
    { text: 'અમદાવાદ', lang: 'gu', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 23.032,
    lon: 72.5781,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ahmedabad (ne_id 1159151433)' }
      }
    ]
  }
})
