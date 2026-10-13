import { definePlace } from '../../schema'

export default definePlace({
  id: 'chaldiran',
  names: [
    { text: 'Chaldiran', lang: 'en', role: 'primary' },
    { text: 'چالدران', lang: 'fa', role: 'native' },
    {
      text: 'Čālderān',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'battlefield',
  regions: ['iran'],
  modernCountry: 'IR'
})
