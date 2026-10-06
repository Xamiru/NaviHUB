import { definePlace } from '../../schema'

export default definePlace({
  id: 'mahabad',
  names: [
    { text: 'Mahabad', lang: 'en', role: 'primary' },
    { text: 'مهاباد', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.7704,
    lon: 45.72,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Mahabad (ne_id 1159142675)' }
      }
    ]
  }
})
