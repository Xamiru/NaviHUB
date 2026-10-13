import { definePlace } from '../../schema'

export default definePlace({
  id: 'stettin',
  names: [
    { text: 'Stettin', lang: 'en', role: 'primary' },
    { text: 'Szczecin', lang: 'pl', role: 'alternative' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'PL',
  coords: {
    lat: 53.4289,
    lon: 14.553,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Szczecin (geonameid 3083829)' } }
    ]
  }
})
