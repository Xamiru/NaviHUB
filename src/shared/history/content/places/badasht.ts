import { definePlace } from '../../schema'

export default definePlace({
  id: 'badasht',
  names: [
    { text: 'Badasht', lang: 'en', role: 'primary' },
    { text: 'بدشت', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['iran'],
  coords: {
    lat: 36.4214,
    lon: 55.0531,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Bedasht (geonameid 140966)' }
      }
    ]
  },
  modernCountry: 'IR'
})
