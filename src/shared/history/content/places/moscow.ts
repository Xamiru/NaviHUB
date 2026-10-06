import { definePlace } from '../../schema'

export default definePlace({
  id: 'moscow',
  names: [
    { text: 'Moscow', lang: 'en', role: 'primary' },
    { text: 'Москва', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU'
})
