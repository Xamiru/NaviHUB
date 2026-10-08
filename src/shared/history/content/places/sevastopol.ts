import { definePlace } from '../../schema'

export default definePlace({
  id: 'sevastopol',
  names: [
    { text: 'Sevastopol', lang: 'en', role: 'primary' },
    { text: 'Севастополь', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  coords: {
    lat: 44.608,
    lon: 33.5213,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Sevastopol (geonameid 694423)' } }
    ]
  },
  modernCountry: 'UA'
})
