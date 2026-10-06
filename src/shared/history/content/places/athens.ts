import { definePlace } from '../../schema'

export default definePlace({
  id: 'athens',
  names: [
    { text: 'Athens', lang: 'en', role: 'primary' },
    { text: 'Αθήνα', lang: 'el', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GR',
  coords: {
    lat: 37.9853,
    lon: 23.7314,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Athens (ne_id 1159151545)' }
      }
    ]
  }
})
