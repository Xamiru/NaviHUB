import { definePlace } from '../../schema'

export default definePlace({
  id: 'shusha',
  names: [
    { text: 'Shusha', lang: 'en', role: 'primary' },
    { text: 'شوشی', lang: 'fa', role: 'native' },
    {
      text: 'Shusha',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['russia-central-asia', 'iran'],
  modernCountry: 'AZ',
  coords: {
    lat: 39.7601,
    lon: 46.7499,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Shusha (geonameid 147105)' } }
    ]
  }
})
