import { definePlace } from '../../schema'

export default definePlace({
  id: 'strait-of-hormuz',
  names: [
    { text: 'Strait of Hormuz', lang: 'en', role: 'primary' },
    { text: 'تنگه هرمز', lang: 'fa', role: 'native' },
    { text: 'مضيق هرمز', lang: 'ar', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'water',
  regions: ['iran']
})
