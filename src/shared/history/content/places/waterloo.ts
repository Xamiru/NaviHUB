import { definePlace } from '../../schema'

export default definePlace({
  id: 'waterloo',
  names: [
    { text: 'Waterloo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['europe'],
  coords: {
    lat: 50.7147,
    lon: 4.3991,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Waterloo (geonameid 2783985)' } }
    ]
  },
  modernCountry: 'BE'
})
