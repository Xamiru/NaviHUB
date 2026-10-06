import { definePlace } from '../../schema'

export default definePlace({
  id: 'yanan',
  names: [
    { text: 'Yan\'an', lang: 'en', role: 'primary' },
    { text: '延安', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
