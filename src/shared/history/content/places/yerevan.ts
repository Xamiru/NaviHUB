import { definePlace } from '../../schema'

export default definePlace({
  id: 'yerevan',
  names: [
    { text: 'Yerevan', lang: 'en', role: 'primary' },
    { text: 'Երևան', lang: 'hy', role: 'native' },
    { text: 'Erevan', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'AM',
  coords: {
    lat: 40.1831,
    lon: 44.5116,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Yerevan (ne_id 1159151119)' }
      }
    ]
  }
})
