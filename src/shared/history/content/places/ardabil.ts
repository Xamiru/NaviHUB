import { definePlace } from '../../schema'

export default definePlace({
  id: 'ardabil',
  names: [
    { text: 'Ardabil', lang: 'en', role: 'primary' },
    { text: 'اردبیل', lang: 'fa', role: 'native' },
    {
      text: 'Ardabīl',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 38.25,
    lon: 48.3,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ardabil (ne_id 1159148669)' }
      }
    ]
  }
})
