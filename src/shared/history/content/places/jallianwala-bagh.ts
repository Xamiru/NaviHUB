import { definePlace } from '../../schema'

export default definePlace({
  id: 'jallianwala-bagh',
  names: [
    { text: 'Jallianwala Bagh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['south-asia'],
  coords: {
    lat: 31.6202,
    lon: 74.8807,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Jallianwala Bagh (geonameid 7626593)' }
      }
    ]
  },
  modernCountry: 'IN'
})
