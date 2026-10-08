import { definePlace } from '../../schema'

export default definePlace({
  id: 'islamabad',
  names: [
    { text: 'Islamabad', lang: 'en', role: 'primary' },
    { text: 'اسلام آباد', lang: 'ur', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'PK',
  coords: {
    lat: 33.7019,
    lon: 73.1647,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Islamabad (ne_id 1159150645)' }
      }
    ]
  }
})
