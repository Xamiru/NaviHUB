import { definePlace } from '../../schema'

export default definePlace({
  id: 'tus',
  names: [
    { text: 'Tus', lang: 'en', role: 'primary' },
    { text: 'طوس', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  coords: {
    lat: 36.4837,
    lon: 59.5188,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Tūs-e Soflá (geonameid 112465)' } }
    ]
  },
  modernCountry: 'IR'
})
