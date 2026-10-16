import { definePlace } from '../../schema'

export default definePlace({
  id: 'natanz',
  names: [
    { text: 'Natanz', lang: 'en', role: 'primary' },
    { text: 'نطنز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 33.5112,
    lon: 51.9181,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Naţanz (geonameid 122491)' } }
    ]
  }
})
