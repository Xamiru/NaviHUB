import { definePlace } from '../../schema'

export default definePlace({
  id: 'gulnabad',
  names: [
    { text: 'Gulnabad', lang: 'en', role: 'primary' },
    { text: 'گلن‌آباد', lang: 'fa', role: 'native' },
    {
      text: 'Golnābād',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'battlefield',
  regions: ['iran'],
  modernCountry: 'IR'
})
