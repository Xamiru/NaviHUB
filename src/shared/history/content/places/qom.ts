import { definePlace } from '../../schema'

export default definePlace({
  id: 'qom',
  names: [
    { text: 'Qom', lang: 'en', role: 'primary' },
    { text: 'قم', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 34.652,
    lon: 50.9481,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Qom (ne_id 1159148671)' } }
    ]
  }
})
