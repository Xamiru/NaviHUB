import { definePlace } from '../../schema'

export default definePlace({
  id: 'soweto',
  names: [
    { text: 'Soweto', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -26.2678,
    lon: 27.8585,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Soweto (geonameid 953781)' } }
    ]
  }
})
