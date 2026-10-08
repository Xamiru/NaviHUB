import { definePlace } from '../../schema'

export default definePlace({
  id: 'helsinki',
  names: [
    { text: 'Helsinki', lang: 'en', role: 'primary' },
    { text: 'Helsingfors', lang: 'sv', role: 'alternative' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FI',
  coords: {
    lat: 60.1775,
    lon: 24.9322,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Helsinki (ne_id 1159151419)' }
      }
    ]
  }
})
