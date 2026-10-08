import { definePlace } from '../../schema'

export default definePlace({
  id: 'chernobyl',
  names: [
    { text: 'Chernobyl', lang: 'en', role: 'primary' },
    { text: 'Чорнобиль', lang: 'uk', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['russia-central-asia'],
  modernCountry: 'UA',
  coords: {
    lat: 51.3894,
    lon: 30.0989,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Chernobyl (ne_id 1159147523)' }
      }
    ]
  }
})
