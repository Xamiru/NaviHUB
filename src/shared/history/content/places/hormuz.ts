import { definePlace } from '../../schema'

export default definePlace({
  id: 'hormuz',
  names: [
    { text: 'Hormuz', lang: 'en', role: 'primary' },
    { text: 'هرمز', lang: 'fa', role: 'native' },
    {
      text: 'Hormoz',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-floor-hormuz-ii',
          loc: { section: 'HORMUZ ii. Islamic Period', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'site',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 27.095,
    lon: 56.4529,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Hormoz (geonameid 131231)' } }
    ]
  }
})
