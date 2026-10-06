import { definePlace } from '../../schema'

export default definePlace({
  id: 'herat',
  names: [
    { text: 'Herat', lang: 'en', role: 'primary' },
    { text: 'هرات', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'AF',
  coords: {
    lat: 34.33,
    lon: 62.17,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Herat (ne_id 1159150319)' }
      }
    ]
  }
})
