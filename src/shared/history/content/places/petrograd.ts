import { definePlace } from '../../schema'

export default definePlace({
  id: 'petrograd',
  names: [
    { text: 'Petrograd', lang: 'en', role: 'primary' },
    { text: 'Петроград', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU'
})
