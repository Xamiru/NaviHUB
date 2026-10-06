import { definePlace } from '../../schema'

export default definePlace({
  id: 'addis-ababa',
  names: [
    { text: 'Addis Ababa', lang: 'en', role: 'primary' },
    { text: 'አዲስ አበባ', lang: 'am', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ET',
  coords: {
    lat: 9.0353,
    lon: 38.6981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Addis Ababa (ne_id 1159151549)' }
      }
    ]
  }
})
