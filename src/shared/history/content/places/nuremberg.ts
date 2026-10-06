import { definePlace } from '../../schema'

export default definePlace({
  id: 'nuremberg',
  names: [
    { text: 'Nuremberg', lang: 'en', role: 'primary' },
    { text: 'Nürnberg', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 49.45,
    lon: 11.08,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Nürnberg (ne_id 1159146953)' }
      }
    ]
  }
})
