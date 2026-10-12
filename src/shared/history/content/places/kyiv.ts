import { definePlace } from '../../schema'

export default definePlace({
  id: 'kyiv',
  names: [
    { text: 'Kyiv', lang: 'en', role: 'primary' },
    { text: 'Київ', lang: 'uk', role: 'native' },
    { text: 'Kiev', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'UA',
  coords: {
    lat: 50.4353,
    lon: 30.5147,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Kyiv (ne_id 1159151495)' } }
    ]
  }
})
