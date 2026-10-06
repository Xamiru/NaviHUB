import { definePlace } from '../../schema'

export default definePlace({
  id: 'bushehr',
  names: [
    { text: 'Bushehr', lang: 'en', role: 'primary' },
    { text: 'بوشهر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 28.92,
    lon: 50.83,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bandar-e Bushehr (ne_id 1159148665)' }
      }
    ]
  }
})
