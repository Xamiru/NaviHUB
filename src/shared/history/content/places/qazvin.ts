import { definePlace } from '../../schema'

export default definePlace({
  id: 'qazvin',
  names: [
    { text: 'Qazvin', lang: 'en', role: 'primary' },
    { text: 'قزوین', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.27,
    lon: 50.0,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Qazvin (ne_id 1159148675)' }
      }
    ]
  }
})
