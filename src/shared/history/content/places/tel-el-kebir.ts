import { definePlace } from '../../schema'

export default definePlace({
  id: 'tel-el-kebir',
  names: [
    { text: 'Tel el-Kebir', lang: 'en', role: 'primary' },
    { text: 'التل الكبير', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'battlefield',
  regions: ['mena'],
  coords: {
    lat: 30.5432,
    lon: 31.785,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'At Tall al Kabīr (geonameid 359710)' } }
    ]
  },
  modernCountry: 'EG'
})
