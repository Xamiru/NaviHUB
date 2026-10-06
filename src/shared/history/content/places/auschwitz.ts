import { definePlace } from '../../schema'

export default definePlace({
  id: 'auschwitz',
  names: [
    { text: 'Auschwitz', lang: 'en', role: 'primary' },
    { text: 'Oświęcim', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'site',
  regions: ['europe'],
  modernCountry: 'PL'
})
