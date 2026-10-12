import { defineSource } from '../../schema'

export default defineSource({
  id: 'hrw-2010-world-report-india',
  type: 'web',
  title: 'World Report 2010: India',
  lang: 'en',
  contributors: [
    { name: 'Human Rights Watch', role: 'institution' }
  ],
  publisher: 'Human Rights Watch',
  date: '2010-01',
  url: 'https://www.hrw.org/world-report/2010/country-chapters/india',
  accessed: '2026-10-12',
  container: 'World Report 2010',
  archivedUrl: 'https://web.archive.org/web/20240217171001/https://www.hrw.org/world-report/2010/country-chapters/india',
  license: { id: 'cc-by-nc-nd', url: 'https://www.hrw.org/permissions' }
})
