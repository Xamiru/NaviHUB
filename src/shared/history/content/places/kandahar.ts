import { definePlace } from '../../schema'

export default definePlace({
  id: 'kandahar',
  names: [
    { text: 'Kandahar', lang: 'en', role: 'primary' },
    { text: 'کندهار', lang: 'ps', role: 'native' },
    {
      text: 'Qandahar',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'AF',
  coords: {
    lat: 31.61,
    lon: 65.6949,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kandahar (ne_id 1159151125)' }
      }
    ]
  }
})
