import { definePlace } from '../../schema'

export default definePlace({
  id: 'bam',
  names: [
    { text: 'Bam', lang: 'en', role: 'primary' },
    { text: 'بم', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 29.1077,
    lon: 58.362,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Bam (ne_id 1159147315)' } }
    ]
  }
})
