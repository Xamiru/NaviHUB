import { definePlace } from '../../schema'

export default definePlace({
  id: 'magdala',
  names: [
    { text: 'Magdala', lang: 'en', role: 'primary' },
    { text: 'መቅደላ', lang: 'am', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'site',
  regions: ['subsaharan-africa'],
  coords: {
    lat: 11.4333,
    lon: 39.2833,
    cites: [
      {
        source: 'geonames-geographical-database',
        loc: { section: 'Āmba Maryam (geonameid 344094)' }
      }
    ]
  },
  modernCountry: 'ET'
})
