import { definePlace } from '../../schema'

export default definePlace({
  id: 'antananarivo',
  names: [
    { text: 'Antananarivo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'MG',
  coords: {
    lat: -18.9147,
    lon: 47.5147,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Antananarivo (ne_id 1159150835)' }
      }
    ]
  }
})
