import { defineSource } from '../../schema'

export default defineSource({
  id: 'geonames-cities500',
  type: 'dataset',
  title: 'GeoNames cities500: all cities with a population of 500 or more',
  lang: 'en',
  contributors: [],
  publisher: 'GeoNames',
  date: 'n.d.',
  url: 'https://download.geonames.org/export/dump/',
  license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
  accessed: '2026-10-08'
})
