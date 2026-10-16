import { defineSource } from '../../schema'

export default defineSource({
  id: 'iranica-ardabil',
  type: 'encyclopedia',
  title: 'ARDABĪL',
  lang: 'en',
  contributors: [
    { name: 'Xavier de Planhol', role: 'author' },
    { name: 'Clifford Edmund Bosworth', role: 'author' },
    { name: 'Martin E. Weaver', role: 'author' },
    { name: 'Margaret Medley', role: 'author' }
  ],
  container: 'Encyclopædia Iranica',
  volume: 'II',
  issue: 'Fasc. 4',
  pages: '357-365',
  publisher: 'Encyclopædia Iranica Foundation',
  date: '1986-12-15',
  url: 'https://www.iranicaonline.org/articles/ardabil',
  accessed: '2026-10-16'
})
