import { definePlace } from '../../schema'

export default definePlace({
  id: 'yerevan',
  names: [
    { text: 'Yerevan', lang: 'en', role: 'primary' },
    { text: 'Երևան', lang: 'hy', role: 'native' },
    { text: 'Erevan', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'AM'
})
