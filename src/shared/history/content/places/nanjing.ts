import { definePlace } from '../../schema'

export default definePlace({
  id: 'nanjing',
  names: [
    { text: 'Nanjing', lang: 'en', role: 'primary' },
    { text: '南京', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
