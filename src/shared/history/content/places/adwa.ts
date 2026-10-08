import { definePlace } from '../../schema'

export default definePlace({
  id: 'adwa',
  names: [
    { text: 'Adwa', lang: 'en', role: 'primary' },
    { text: 'ዓድዋ', lang: 'ti', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  coords: {
    lat: 14.1635,
    lon: 38.8992,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Adwa (geonameid 344797)' } }
    ]
  },
  modernCountry: 'ET'
})
