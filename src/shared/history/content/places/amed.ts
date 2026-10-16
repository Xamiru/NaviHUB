import { definePlace } from '../../schema'

export default definePlace({
  id: 'amed',
  names: [
    { text: 'Amed', lang: 'en', role: 'primary' },
    {
      text: 'Āmed',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '6' }
        }
      ]
    },
    {
      text: 'Diyarbakır',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TR',
  coords: {
    lat: 37.9136,
    lon: 40.2172,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Diyarbakır (geonameid 316541)' } }
    ]
  }
})
