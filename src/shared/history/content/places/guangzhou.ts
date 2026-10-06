import { definePlace } from '../../schema'

export default definePlace({
  id: 'guangzhou',
  names: [
    { text: 'Guangzhou', lang: 'en', role: 'primary' },
    { text: '广州', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
