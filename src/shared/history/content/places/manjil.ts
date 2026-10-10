import { definePlace } from '../../schema'

export default definePlace({
  id: 'manjil',
  names: [
    { text: 'Manjil', lang: 'en', role: 'primary' },
    { text: 'منجیل', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.7445,
    lon: 49.4008,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Manjīl (geonameid 124967)' } }
    ]
  }
})
