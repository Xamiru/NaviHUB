import { definePlace } from '../../schema'

export default definePlace({
  id: 'petrograd',
  names: [
    { text: 'Petrograd', lang: 'en', role: 'primary' },
    { text: 'Петроград', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  coords: {
    lat: 59.9386,
    lon: 30.3141,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Saint Petersburg (geonameid 498817)' } }
    ]
  },
  modernCountry: 'RU'
})
