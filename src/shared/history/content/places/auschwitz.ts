import { definePlace } from '../../schema'

export default definePlace({
  id: 'auschwitz',
  names: [
    { text: 'Auschwitz', lang: 'en', role: 'primary' },
    { text: 'Oświęcim', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['europe'],
  coords: {
    lat: 50.0344,
    lon: 19.2104,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Oświęcim (geonameid 3089658)' } }
    ]
  },
  modernCountry: 'PL'
})
