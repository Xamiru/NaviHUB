import { definePlace } from '../../schema'

export default definePlace({
  id: 'zohab',
  names: [
    { text: 'Zohab', lang: 'en', role: 'primary' },
    { text: 'ذهاب', lang: 'fa', role: 'native' },
    {
      text: 'Zohāb',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['iran', 'mena'],
  modernCountry: 'IR'
})
