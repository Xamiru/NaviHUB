import { definePlace } from '../../schema'

export default definePlace({
  id: 'hradec-kralove',
  names: [
    { text: 'Königgrätz (Hradec Králové)', lang: 'en', role: 'primary' },
    { text: 'Hradec Králové', lang: 'cs', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['europe'],
  coords: {
    lat: 50.2092,
    lon: 15.8328,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Hradec Králové (geonameid 3074967)' } }
    ]
  },
  modernCountry: 'CZ'
})
