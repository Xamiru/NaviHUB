import { definePlace } from '../../schema'

export default definePlace({
  id: 'tabasaran',
  names: [
    { text: 'Tabasaran', lang: 'en', role: 'primary' },
    {
      text: 'Tābasarān',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  placeType: 'region',
  regions: ['russia-central-asia'],
  modernCountry: 'RU'
})
