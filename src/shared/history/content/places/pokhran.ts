import { definePlace } from '../../schema'

export default definePlace({
  id: 'pokhran',
  names: [
    { text: 'Pokhran', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 26.9201,
    lon: 71.9163,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Pokaran (geonameid 1259460)' } }
    ]
  }
})
