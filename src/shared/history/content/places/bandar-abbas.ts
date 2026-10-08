import { definePlace } from '../../schema'

export default definePlace({
  id: 'bandar-abbas',
  names: [
    { text: 'Bandar Abbas', lang: 'en', role: 'primary' },
    { text: 'بندرعباس', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 27.1865,
    lon: 56.2808,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Bandar Abbas (geonameid 141681)' } }
    ]
  }
})
