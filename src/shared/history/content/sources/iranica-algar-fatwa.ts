import { defineSource } from '../../schema'

export default defineSource({
  id: 'iranica-algar-fatwa',
  type: 'encyclopedia',
  title: 'FATWĀ',
  lang: 'en',
  contributors: [
    { name: 'Hamid Algar', role: 'author' }
  ],
  container: 'Encyclopædia Iranica',
  volume: 'IX',
  issue: 'Fasc. 4',
  pages: '428-436',
  publisher: 'Encyclopædia Iranica Foundation',
  date: '1999-12-15',
  url: 'https://www.iranicaonline.org/articles/fatwa',
  accessed: '2026-10-06'
})
