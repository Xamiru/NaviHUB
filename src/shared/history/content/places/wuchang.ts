import { definePlace } from '../../schema'

export default definePlace({
  id: 'wuchang',
  names: [
    { text: 'Wuchang', lang: 'en', role: 'primary' },
    { text: '武昌', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
