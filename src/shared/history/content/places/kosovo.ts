import { definePlace } from '../../schema'

export default definePlace({
  id: 'kosovo',
  names: [
    { text: 'Kosovo', lang: 'en', role: 'primary' },
    { text: 'Kosova', lang: 'sq', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'region',
  regions: ['europe'],
  modernCountry: 'XK'
})
