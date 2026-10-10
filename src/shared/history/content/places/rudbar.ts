import { definePlace } from '../../schema'

export default definePlace({
  id: 'rudbar',
  names: [
    { text: 'Rudbar', lang: 'en', role: 'primary' },
    { text: 'رودبار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.809,
    lon: 49.4149,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Khalīlābād (geonameid 118244)' } }
    ]
  }
})
