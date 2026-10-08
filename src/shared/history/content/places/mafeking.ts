import { definePlace } from '../../schema'

export default definePlace({
  id: 'mafeking',
  names: [
    { text: 'Mafeking', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  coords: {
    lat: -25.8652,
    lon: 25.6442,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Mafikeng (geonameid 980595)' } }
    ]
  },
  modernCountry: 'ZA'
})
