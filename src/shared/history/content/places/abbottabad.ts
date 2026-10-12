import { definePlace } from '../../schema'

export default definePlace({
  id: 'abbottabad',
  names: [
    { text: 'Abbottabad', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'PK',
  coords: {
    lat: 34.1495,
    lon: 73.1995,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Abbottabad (ne_id 1159128399)' }
      }
    ]
  }
})
