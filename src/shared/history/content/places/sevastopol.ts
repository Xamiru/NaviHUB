import { definePlace } from '../../schema'

export default definePlace({
  id: 'sevastopol',
  names: [
    { text: 'Sevastopol', lang: 'en', role: 'primary' },
    { text: 'Севастополь', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'UA'
})
