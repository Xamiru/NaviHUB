import { definePlace } from '../../schema'

export default definePlace({
  id: 'saint-germain-en-laye',
  names: [
    { text: 'Saint-Germain-en-Laye', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 48.8964,
    lon: 2.0904,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'Saint-Germain-en-Laye (geonameid 2979783)' }
      }
    ]
  }
})
