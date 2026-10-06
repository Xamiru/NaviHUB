import { definePlace } from '../../schema'

export default definePlace({
  id: 'kabul',
  names: [
    { text: 'Kabul', lang: 'en', role: 'primary' },
    { text: 'کابل', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'AF'
})
