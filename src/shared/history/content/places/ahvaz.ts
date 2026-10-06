import { definePlace } from '../../schema'

export default definePlace({
  id: 'ahvaz',
  names: [
    { text: 'Ahvaz', lang: 'en', role: 'primary' },
    { text: 'اهواز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 31.2819,
    lon: 48.7181,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ahvaz (ne_id 1159150125)' }
      }
    ]
  }
})
