import { defineSource } from '../../schema'

export default defineSource({
  id: 'hrw-2000-world-report-india',
  type: 'web',
  title: 'Human Rights Watch World Report 2000: India',
  lang: 'en',
  contributors: [
    { name: 'Human Rights Watch', role: 'institution' }
  ],
  publisher: 'Human Rights Watch',
  date: '1999-12',
  url: 'https://www.hrw.org/legacy/wr2k/Asia-04.htm',
  accessed: '2026-10-10',
  license: { id: 'cc-by-nc-nd', url: 'https://www.hrw.org/permissions' },
  container: 'Human Rights Watch World Report 2000'
})
