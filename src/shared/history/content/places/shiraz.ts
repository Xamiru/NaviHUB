import { definePlace } from '../../schema'

export default definePlace({
  id: 'shiraz',
  names: [
    { text: 'Shiraz', lang: 'en', role: 'primary' },
    { text: 'شیراز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR'
})
