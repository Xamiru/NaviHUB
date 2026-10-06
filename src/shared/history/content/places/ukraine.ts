import { definePlace } from '../../schema'

export default definePlace({
  id: 'ukraine',
  names: [
    { text: 'Ukraine', lang: 'en', role: 'primary' },
    { text: 'Україна', lang: 'uk', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'region',
  regions: ['russia-central-asia'],
  modernCountry: 'UA'
})
