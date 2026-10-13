import { definePlace } from '../../schema'

export default definePlace({
  id: 'mughan-steppe',
  names: [
    { text: 'Mughan steppe', lang: 'en', role: 'primary' },
    { text: 'دشت مغان', lang: 'fa', role: 'native' },
    {
      text: 'Moḡān steppe',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'region',
  regions: ['iran', 'russia-central-asia'],
  modernCountry: 'AZ'
})
