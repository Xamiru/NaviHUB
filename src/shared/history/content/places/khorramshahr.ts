import { definePlace } from '../../schema'

export default definePlace({
  id: 'khorramshahr',
  names: [
    { text: 'Khorramshahr', lang: 'en', role: 'primary' },
    { text: 'خرمشهر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  coords: {
    lat: 30.4408,
    lon: 48.1843,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Khorramshahr (geonameid 127319)' } }
    ]
  },
  modernCountry: 'IR'
})
