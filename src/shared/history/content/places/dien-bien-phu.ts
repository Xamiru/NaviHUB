import { definePlace } from '../../schema'

export default definePlace({
  id: 'dien-bien-phu',
  names: [
    { text: 'Dien Bien Phu', lang: 'en', role: 'primary' },
    { text: 'Điện Biên Phủ', lang: 'vi', role: 'native' }
  ],
  researched: '2026-10-07',
  placeType: 'battlefield',
  regions: ['southeast-asia'],
  modernCountry: 'VN'
})
