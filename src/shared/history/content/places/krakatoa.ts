import { definePlace } from '../../schema'

export default definePlace({
  id: 'krakatoa',
  names: [
    { text: 'Krakatoa', lang: 'en', role: 'primary' },
    { text: 'Krakatau', lang: 'id', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'site',
  regions: ['southeast-asia'],
  modernCountry: 'ID'
})
