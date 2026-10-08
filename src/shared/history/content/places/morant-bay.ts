import { definePlace } from '../../schema'

export default definePlace({
  id: 'morant-bay',
  names: [
    { text: 'Morant Bay', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  coords: {
    lat: 17.8815,
    lon: -76.4093,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Morant Bay (geonameid 3489440)' } }
    ]
  },
  modernCountry: 'JM'
})
