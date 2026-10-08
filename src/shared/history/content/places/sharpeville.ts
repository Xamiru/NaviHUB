import { definePlace } from '../../schema'

export default definePlace({
  id: 'sharpeville',
  names: [
    { text: 'Sharpeville', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  coords: {
    lat: -26.6841,
    lon: 27.8743,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Sharpeville (geonameid 956162)' }
      }
    ]
  },
  modernCountry: 'ZA'
})
