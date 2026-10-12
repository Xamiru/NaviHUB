import { definePlace } from '../../schema'

export default definePlace({
  id: 'afghanistan',
  names: [
    { text: 'Afghanistan', lang: 'en', role: 'primary' },
    { text: 'افغانستان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-12',
  placeType: 'country',
  regions: ['russia-central-asia', 'south-asia'],
  modernCountry: 'AF'
})
