import { definePlace } from '../../schema'

export default definePlace({
  id: 'pristina',
  names: [
    { text: 'Pristina', lang: 'en', role: 'primary' },
    { text: 'Prishtina', lang: 'sq', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'XK',
  coords: {
    lat: 42.6727,
    lon: 21.1669,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Pristina (geonameid 786714)' } }
    ]
  }
})
