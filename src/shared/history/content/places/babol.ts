import { definePlace } from '../../schema'

export default definePlace({
  id: 'babol',
  names: [
    { text: 'Babol', lang: 'en', role: 'primary' },
    { text: 'بابل', lang: 'fa', role: 'native' },
    { text: 'Barforush', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR'
})
