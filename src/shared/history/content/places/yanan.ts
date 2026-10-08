import { definePlace } from '../../schema'

export default definePlace({
  id: 'yanan',
  names: [
    { text: 'Yan\'an', lang: 'en', role: 'primary' },
    { text: '延安', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['east-asia'],
  coords: {
    lat: 36.5989,
    lon: 109.4917,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Yan’an (geonameid 1787765)' } }
    ]
  },
  modernCountry: 'CN'
})
