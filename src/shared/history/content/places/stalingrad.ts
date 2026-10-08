import { definePlace } from '../../schema'

export default definePlace({
  id: 'stalingrad',
  names: [
    { text: 'Stalingrad', lang: 'en', role: 'primary' },
    { text: 'Волгоград', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  coords: {
    lat: 48.7138,
    lon: 44.4976,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Volgograd (geonameid 472757)' } }
    ]
  },
  modernCountry: 'RU'
})
