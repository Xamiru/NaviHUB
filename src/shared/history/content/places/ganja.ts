import { definePlace } from '../../schema'

export default definePlace({
  id: 'ganja',
  names: [
    { text: 'Ganja', lang: 'en', role: 'primary' },
    { text: 'Gəncə', lang: 'az', role: 'native' },
    { text: 'Elizavetpol', lang: 'ru', role: 'former' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  coords: {
    lat: 40.6816,
    lon: 46.3613,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Ganja (geonameid 586523)' } }
    ]
  },
  modernCountry: 'AZ'
})
