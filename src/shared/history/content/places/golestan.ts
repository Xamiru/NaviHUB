import { definePlace } from '../../schema'

export default definePlace({
  id: 'golestan',
  names: [
    { text: 'Golestan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['russia-central-asia'],
  coords: {
    lat: 40.3571,
    lon: 46.584,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Gülüstan (geonameid 586388)' }
      }
    ]
  },
  modernCountry: 'AZ'
})
