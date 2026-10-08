import { definePlace } from '../../schema'

export default definePlace({
  id: 'shatt-al-arab',
  names: [
    { text: 'Shatt al-Arab', lang: 'en', role: 'primary' },
    { text: 'شط العرب', lang: 'ar', role: 'native' },
    { text: 'اروندرود', lang: 'fa', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'water',
  regions: ['mena', 'iran'],
  modernCountry: 'IQ'
})
