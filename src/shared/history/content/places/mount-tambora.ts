import { definePlace } from '../../schema'

export default definePlace({
  id: 'mount-tambora',
  names: [
    { text: 'Mount Tambora', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['southeast-asia'],
  coords: {
    lat: -8.2465,
    lon: 117.9586,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Gunung Tambora (geonameid 1625272)' }
      }
    ]
  },
  modernCountry: 'ID'
})
