import { definePlace } from '../../schema'

export default definePlace({
  id: 'qeshm',
  names: [
    { text: 'Qeshm', lang: 'en', role: 'primary' },
    { text: 'قشم', lang: 'fa', role: 'native' },
    {
      text: 'Qešm',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-savory-emamqoli-khan',
          loc: { section: 'EMĀMQOLĪ KHAN', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'site',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 26.9492,
    lon: 56.2691,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Qeshm (geonameid 119374)' } }
    ]
  }
})
