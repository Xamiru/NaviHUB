import { definePlace } from '../../schema'

export default definePlace({
  id: 'otrar',
  names: [
    { text: 'Otrar', lang: 'en', role: 'primary' },
    { text: 'اترار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'site',
  regions: ['russia-central-asia'],
  modernCountry: 'KZ',
  coords: {
    lat: 42.791,
    lon: 68.3717,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Shaul’der (geonameid 1519259)' } }
    ]
  }
})
