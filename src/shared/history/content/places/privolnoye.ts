import { definePlace } from '../../schema'

export default definePlace({
  id: 'privolnoye',
  names: [
    { text: 'Privolnoye', lang: 'en', role: 'primary' },
    { text: 'Привольное', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU',
  coords: {
    lat: 43.0639,
    lon: 45.6513,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Alkhazurovo (geonameid 582490)' } }
    ]
  }
})
