import { definePlace } from '../../schema'

export default definePlace({
  id: 'beirut',
  names: [
    { text: 'Beirut', lang: 'en', role: 'primary' },
    { text: 'بيروت', lang: 'ar', role: 'native', translit: 'Bayrūt' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'LB',
  coords: {
    lat: 33.8739,
    lon: 35.5078,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Beirut (ne_id 1159150957)' }
      }
    ]
  }
})
