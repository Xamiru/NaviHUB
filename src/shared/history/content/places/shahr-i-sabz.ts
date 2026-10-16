import { definePlace } from '../../schema'

export default definePlace({
  id: 'shahr-i-sabz',
  names: [
    { text: 'Shahr-i Sabz', lang: 'en', role: 'primary' },
    { text: 'Shahrisabz', lang: 'en', role: 'alternative' },
    { text: 'شهر سبز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'UZ',
  coords: {
    lat: 39.0578,
    lon: 66.8342,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Shahrisabz (geonameid 1216187)' } }
    ]
  }
})
