import { definePlace } from '../../schema'

export default definePlace({
  id: 'tilsit',
  names: [
    { text: 'Tilsit', lang: 'en', role: 'primary' },
    { text: 'Советск', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 55.0839,
    lon: 21.8785,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Sovetsk (geonameid 490068)' } }
    ]
  },
  modernCountry: 'RU'
})
