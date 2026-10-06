import { definePlace } from '../../schema'

export default definePlace({
  id: 'stalingrad',
  names: [
    { text: 'Stalingrad', lang: 'en', role: 'primary' },
    { text: 'Волгоград', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU'
})
