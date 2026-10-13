import { definePlace } from '../../schema'

export default definePlace({
  id: 'saint-domingue',
  names: [
    { text: 'Saint-Domingue', lang: 'en', role: 'primary' },
    { text: 'Haiti', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  placeType: 'region',
  regions: ['latin-america'],
  modernCountry: 'HT'
})
