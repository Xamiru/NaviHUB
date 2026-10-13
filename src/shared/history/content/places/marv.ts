import { definePlace } from '../../schema'

export default definePlace({
  id: 'marv',
  names: [
    { text: 'Marv', lang: 'en', role: 'primary' },
    { text: 'مرو', lang: 'fa', role: 'native' },
    {
      text: 'Merv',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['iran', 'russia-central-asia'],
  modernCountry: 'TM',
  coords: {
    lat: 37.5938,
    lon: 61.8303,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Mary (geonameid 1218667)' } }
    ]
  }
})
