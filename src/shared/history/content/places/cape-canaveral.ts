import { definePlace } from '../../schema'

export default definePlace({
  id: 'cape-canaveral',
  names: [
    { text: 'Cape Canaveral', lang: 'en', role: 'primary' },
    { text: 'Cape Kennedy', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 28.4058,
    lon: -80.6048,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Cape Canaveral (geonameid 4149959)' } }
    ]
  }
})
