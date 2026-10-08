import { definePlace } from '../../schema'

export default definePlace({
  id: 'nain',
  names: [
    { text: 'Nain', lang: 'en', role: 'primary' },
    { text: 'نائین', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  coords: {
    lat: 32.86,
    lon: 53.0869,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Nā’īn (geonameid 122869)' } }
    ]
  },
  modernCountry: 'IR'
})
