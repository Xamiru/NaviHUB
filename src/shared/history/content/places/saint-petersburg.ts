import { definePlace } from '../../schema'

export default definePlace({
  id: 'saint-petersburg',
  names: [
    { text: 'Saint Petersburg', lang: 'en', role: 'primary' },
    { text: 'Санкт-Петербург', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU',
  coords: {
    lat: 59.941,
    lon: 30.3141,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'St.  Petersburg (ne_id 1159151291)' }
      }
    ]
  }
})
