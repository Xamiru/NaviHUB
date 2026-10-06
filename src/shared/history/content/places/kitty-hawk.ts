import { definePlace } from '../../schema'

export default definePlace({
  id: 'kitty-hawk',
  names: [
    { text: 'Kitty Hawk', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'site',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 36.0773,
    lon: -75.7047,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kitty Hawk (ne_id 1159133455)' }
      }
    ]
  }
})
