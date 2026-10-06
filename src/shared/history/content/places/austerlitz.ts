import { definePlace } from '../../schema'

export default definePlace({
  id: 'austerlitz',
  names: [
    { text: 'Austerlitz', lang: 'en', role: 'primary' },
    { text: 'Slavkov u Brna', lang: 'cs', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'battlefield',
  regions: ['europe'],
  modernCountry: 'CZ'
})
