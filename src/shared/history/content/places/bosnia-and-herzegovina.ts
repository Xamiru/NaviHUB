import { definePlace } from '../../schema'

export default definePlace({
  id: 'bosnia-and-herzegovina',
  names: [
    { text: 'Bosnia and Herzegovina', lang: 'en', role: 'primary' },
    { text: 'Bosna i Hercegovina', lang: 'bs', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['europe'],
  modernCountry: 'BA'
})
