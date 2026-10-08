import { definePlace } from '../../schema'

export default definePlace({
  id: 'bandar-e-torkaman',
  names: [
    { text: 'Bandar-e Torkaman', lang: 'en', role: 'primary' },
    { text: 'بندر ترکمن', lang: 'fa', role: 'native' },
    { text: 'Bandar-e Shah', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.9012,
    lon: 54.072,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'Bandar-e Torkaman (geonameid 141653)' }
      }
    ]
  }
})
