import { defineSource } from '../../schema'

export default defineSource({
  id: 'geonames-geographical-database',
  type: 'dataset',
  title: 'GeoNames geographical database (country extracts)',
  lang: 'en',
  contributors: [],
  publisher: 'GeoNames',
  date: 'n.d.',
  url: 'https://download.geonames.org/export/dump/',
  accessed: '2026-10-08',
  license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0/' }
})
