import { defineSource } from '../../schema'

export default defineSource({
  id: 'hrw-1998-world-report-hong-kong',
  type: 'web',
  title: 'Human Rights Watch World Report 1998: Hong Kong',
  lang: 'en',
  contributors: [
    { name: 'Human Rights Watch', role: 'institution' }
  ],
  publisher: 'Human Rights Watch',
  date: '1997-12',
  url: 'https://www.hrw.org/legacy/worldreport/Asia-05.htm',
  accessed: '2026-10-10',
  license: { id: 'cc-by-nc-nd', url: 'https://www.hrw.org/permissions' },
  container: 'Human Rights Watch World Report 1998'
})
