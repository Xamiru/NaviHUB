import { definePlace } from '../../schema'

export default definePlace({
  id: 'saint-petersburg',
  names: [
    { text: 'Saint Petersburg', lang: 'en', role: 'primary' },
    { text: 'Санкт-Петербург', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU'
})
