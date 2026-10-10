import { defineSource } from '../../schema'

export default defineSource({
  id: 'hrw-1999-world-report-united-kingdom',
  type: 'web',
  title: 'Human Rights Watch World Report 1999: United Kingdom',
  lang: 'en',
  contributors: [
    { name: 'Human Rights Watch', role: 'institution' }
  ],
  publisher: 'Human Rights Watch',
  date: '1998-12',
  url: 'https://www.hrw.org/legacy/worldreport99/europe/uk.html',
  accessed: '2026-10-10',
  license: { id: 'cc-by-nc-nd', url: 'https://www.hrw.org/permissions' },
  container: 'Human Rights Watch World Report 1999'
})
