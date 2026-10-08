import { definePlace } from '../../schema'

export default definePlace({
  id: 'menlo-park',
  names: [
    { text: 'Menlo Park', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  coords: {
    lat: 40.5187,
    lon: -74.4121,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Edison (geonameid 5097529)' } }
    ]
  },
  modernCountry: 'US'
})
