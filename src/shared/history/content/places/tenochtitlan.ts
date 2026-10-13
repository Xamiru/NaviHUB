import { definePlace } from '../../schema'

export default definePlace({
  id: 'tenochtitlan',
  names: [
    { text: 'Tenochtitlán', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'MX',
  coords: {
    lat: 19.7603,
    lon: -99.9225,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'San Miguel Tenochtitlán (geonameid 3518326)' }
      }
    ]
  }
})
