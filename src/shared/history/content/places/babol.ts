import { definePlace } from '../../schema'

export default definePlace({
  id: 'babol',
  names: [
    { text: 'Babol', lang: 'en', role: 'primary' },
    { text: 'بابل', lang: 'fa', role: 'native' },
    { text: 'Barforush', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  coords: {
    lat: 36.551,
    lon: 52.6786,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Bābol (geonameid 142363)' } }
    ]
  },
  modernCountry: 'IR'
})
