import { definePlace } from '../../schema'

export default definePlace({
  id: 'otlukbeli',
  names: [
    { text: 'Otlukbeli', lang: 'en', role: 'primary' },
    {
      text: 'Otluqbeli',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    },
    {
      text: 'Baškent',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    },
    {
      text: 'Terǰān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bosworth-army-ii',
          loc: { section: 'ARMY ii. Islamic, to the Mongol period', para: '22' }
        },
        { source: 'iranica-bosworth-arzenjan', loc: { section: 'ARZENJĀN', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-16',
  placeType: 'battlefield',
  regions: ['mena'],
  modernCountry: 'TR',
  coords: {
    lat: 39.97,
    lon: 40.0187,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Otlukbeli (geonameid 303147)' } }
    ]
  }
})
