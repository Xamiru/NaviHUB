import { definePlace } from '../../schema'

export default definePlace({
  id: 'sistan',
  names: [
    { text: 'Sistan', lang: 'en', role: 'primary' },
    { text: 'سیستان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'region',
  regions: ['iran'],
  modernCountry: 'IR'
})
