import { defineSource } from '../../schema'

export default defineSource({
  id: 'hrw-2001-world-report-russia',
  type: 'web',
  title: 'World Report 2001: Russia',
  lang: 'en',
  contributors: [
    { name: 'Human Rights Watch', role: 'institution' }
  ],
  publisher: 'Human Rights Watch',
  date: '2001-01',
  url: 'http://www.hrw.org/legacy/wr2k1/europe/russian.html',
  accessed: '2026-10-12',
  container: 'World Report 2001',
  archivedUrl: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html',
  license: { id: 'cc-by-nc-nd', url: 'https://www.hrw.org/permissions' }
})
