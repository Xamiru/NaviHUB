import { definePlace } from '../../schema'

export default definePlace({
  id: 'karlowitz',
  names: [
    { text: 'Karlowitz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'RS',
  coords: {
    lat: 45.2028,
    lon: 19.9337,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'Sremski Karlovci (geonameid 3190101)' }
      }
    ]
  }
})
