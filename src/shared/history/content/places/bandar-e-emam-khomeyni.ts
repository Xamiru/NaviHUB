import { definePlace } from '../../schema'

export default definePlace({
  id: 'bandar-e-emam-khomeyni',
  names: [
    { text: 'Bandar-e Emam Khomeyni', lang: 'en', role: 'primary' },
    { text: 'بندر امام خمینی', lang: 'fa', role: 'native' },
    { text: 'Bandar-e Shahpur', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 30.437,
    lon: 49.1029,
    cites: [
      {
        source: 'geonames-cities500',
        loc: { section: 'Bandar-e Emam Khomeyni (geonameid 8521444)' }
      }
    ]
  }
})
