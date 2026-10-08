import { definePlace } from '../../schema'

export default definePlace({
  id: 'eiffel-tower',
  names: [
    { text: 'Eiffel Tower', lang: 'en', role: 'primary' },
    { text: 'Tour Eiffel', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'building',
  regions: ['europe'],
  coords: {
    lat: 48.8583,
    lon: 2.2945,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Tour Eiffel (geonameid 6254976)' }
      }
    ]
  },
  modernCountry: 'FR'
})
