import { definePlace } from '../../schema'

export default definePlace({
  id: 'baku',
  names: [
    { text: 'Baku', lang: 'en', role: 'primary' },
    { text: 'Bakı', lang: 'az', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'AZ',
  coords: {
    lat: 40.3972,
    lon: 49.8603,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Baku (ne_id 1159151123)' } }
    ]
  }
})
