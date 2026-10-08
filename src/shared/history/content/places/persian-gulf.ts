import { definePlace } from '../../schema'

export default definePlace({
  id: 'persian-gulf',
  names: [
    { text: 'Persian Gulf', lang: 'en', role: 'primary' },
    { text: 'خلیج فارس', lang: 'fa', role: 'native' },
    { text: 'الخليج العربي', lang: 'ar', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'water',
  regions: ['mena']
})
