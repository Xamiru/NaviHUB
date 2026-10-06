import { definePlace } from '../../schema'

export default definePlace({
  id: 'beijing',
  names: [
    { text: 'Beijing', lang: 'en', role: 'primary' },
    { text: '北京', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
