import { defineSource } from '../../schema'

export default defineSource({
  id: 'luther-1915-disputation-on-indulgences',
  type: 'primary',
  title: 'Disputation on Indulgences (the Ninety-five Theses)',
  lang: 'en',
  contributors: [
    { name: 'Martin Luther', role: 'author' },
    { name: 'Henry Eyster Jacobs', role: 'translator' },
    { name: 'Adolph Spaeth', role: 'translator' }
  ],
  publisher: 'A. J. Holman Company',
  date: '1915',
  url: 'https://en.wikisource.org/wiki/Ninety-Five_Theses',
  accessed: '2026-10-13',
  container: 'Works of Martin Luther, with introductions and notes',
  place: 'Philadelphia',
  volume: '1',
  license: { id: 'public-domain' }
})
