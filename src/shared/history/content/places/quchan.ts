import { definePlace } from '../../schema'

export default definePlace({
  id: 'quchan',
  names: [
    { text: 'Quchan', lang: 'en', role: 'primary' },
    { text: 'قوچان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 37.1118,
    lon: 58.5015,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Quchan (ne_id 1159142717)' }
      }
    ]
  }
})
