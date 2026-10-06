import { definePlace } from '../../schema'

export default definePlace({
  id: 'dhaka',
  names: [
    { text: 'Dhaka', lang: 'en', role: 'primary' },
    { text: 'ঢাকা', lang: 'bn', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'BD'
})
