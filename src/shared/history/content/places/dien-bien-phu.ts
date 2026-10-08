import { definePlace } from '../../schema'

export default definePlace({
  id: 'dien-bien-phu',
  names: [
    { text: 'Dien Bien Phu', lang: 'en', role: 'primary' },
    { text: 'Điện Biên Phủ', lang: 'vi', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['southeast-asia'],
  coords: {
    lat: 21.386,
    lon: 103.023,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Dien Bien Phu (geonameid 1583477)' } }
    ]
  },
  modernCountry: 'VN'
})
