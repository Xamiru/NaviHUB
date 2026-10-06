import { definePlace } from '../../schema'

export default definePlace({
  id: 'tilsit',
  names: [
    { text: 'Tilsit', lang: 'en', role: 'primary' },
    { text: 'Советск', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'RU'
})
