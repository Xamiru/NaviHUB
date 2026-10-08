import { definePlace } from '../../schema'

export default definePlace({
  id: 'guadalupe-hidalgo',
  names: [
    { text: 'Guadalupe Hidalgo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  coords: {
    lat: 19.4939,
    lon: -99.1107,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'Gustavo Adolfo Madero (geonameid 3514674)' }
      }
    ]
  },
  modernCountry: 'MX'
})
