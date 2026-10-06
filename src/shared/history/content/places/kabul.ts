import { definePlace } from '../../schema'

export default definePlace({
  id: 'kabul',
  names: [
    { text: 'Kabul', lang: 'en', role: 'primary' },
    { text: 'کابل', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'AF',
  coords: {
    lat: 34.5186,
    lon: 69.1813,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kabul (ne_id 1159151561)' }
      }
    ]
  }
})
