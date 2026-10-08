import { definePlace } from '../../schema'

export default definePlace({
  id: 'halabja',
  names: [
    { text: 'Halabja', lang: 'en', role: 'primary' },
    { text: 'هەڵەبجە', lang: 'ku', role: 'native' },
    { text: 'حلبجة', lang: 'ar', role: 'alternative' },
    { text: 'حلبچه', lang: 'fa', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 35.1778,
    lon: 45.9861,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Halabja (geonameid 96205)' } }
    ]
  }
})
