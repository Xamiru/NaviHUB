import { definePlace } from '../../schema'

export default definePlace({
  id: 'schonhausen',
  names: [
    { text: 'Schönhausen', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 52.5808,
    lon: 12.0392,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Schönhausen (geonameid 2836587)' } }
    ]
  },
  modernCountry: 'DE'
})
