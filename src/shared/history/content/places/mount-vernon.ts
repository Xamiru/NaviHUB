import { definePlace } from '../../schema'

export default definePlace({
  id: 'mount-vernon',
  names: [
    { text: 'Mount Vernon', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'site',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 40.9126,
    lon: -73.8371,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Mount Vernon (geonameid 5127835)' } }
    ]
  }
})
