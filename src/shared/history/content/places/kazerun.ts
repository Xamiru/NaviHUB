import { definePlace } from '../../schema'

export default definePlace({
  id: 'kazerun',
  names: [
    { text: 'Kazerun', lang: 'en', role: 'primary' },
    { text: 'کازرون', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  coords: {
    lat: 29.6192,
    lon: 51.6535,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Kāzerūn (geonameid 128321)' } }
    ]
  },
  modernCountry: 'IR'
})
