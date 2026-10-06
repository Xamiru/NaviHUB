import { definePlace } from '../../schema'

export default definePlace({
  id: 'kermanshah',
  names: [
    { text: 'Kermanshah', lang: 'en', role: 'primary' },
    { text: 'کرمانشاه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 34.382,
    lon: 47.0581,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kermanshah (ne_id 1159148681)' }
      }
    ]
  }
})
