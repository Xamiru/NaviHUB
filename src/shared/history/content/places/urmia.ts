import { definePlace } from '../../schema'

export default definePlace({
  id: 'urmia',
  names: [
    { text: 'Urmia', lang: 'en', role: 'primary' },
    { text: 'ارومیه', lang: 'fa', role: 'native', translit: 'Orumiya' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 37.53,
    lon: 45.0,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Urmia (ne_id 1159130775)' }
      }
    ]
  }
})
