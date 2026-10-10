import { definePlace } from '../../schema'

export default definePlace({
  id: 'tabas',
  names: [
    { text: 'Tabas', lang: 'en', role: 'primary' },
    { text: 'طبس', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 33.5959,
    lon: 56.9244,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Tabas (geonameid 113659)' } }
    ]
  }
})
