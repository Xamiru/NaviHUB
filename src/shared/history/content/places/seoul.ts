import { definePlace } from '../../schema'

export default definePlace({
  id: 'seoul',
  names: [
    { text: 'Seoul', lang: 'en', role: 'primary' },
    { text: '서울', lang: 'ko', role: 'native' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'KR',
  coords: {
    lat: 37.5683,
    lon: 126.9978,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Seoul (ne_id 1159151523)' }
      }
    ]
  }
})
