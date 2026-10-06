import { definePlace } from '../../schema'

export default definePlace({
  id: 'manchuria',
  names: [
    { text: 'Manchuria', lang: 'en', role: 'primary' },
    { text: '满洲', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'region',
  regions: ['east-asia'],
  modernCountry: 'CN'
})
