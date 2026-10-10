import { definePlace } from '../../schema'

export default definePlace({
  id: 'university-of-tehran',
  names: [
    { text: 'University of Tehran', lang: 'en', role: 'primary' },
    { text: 'دانشگاه تهران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'building',
  regions: ['iran'],
  modernCountry: 'IR'
})
