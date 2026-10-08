import { definePlace } from '../../schema'

export default definePlace({
  id: 'harpers-ferry',
  names: [
    { text: 'Harpers Ferry', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  coords: {
    lat: 39.3254,
    lon: -77.7389,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Harpers Ferry (geonameid 4808234)' }
      }
    ]
  },
  modernCountry: 'US'
})
