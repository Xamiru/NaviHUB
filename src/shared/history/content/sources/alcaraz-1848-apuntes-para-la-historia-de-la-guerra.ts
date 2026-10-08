import { defineSource } from '../../schema'

export default defineSource({
  id: 'alcaraz-1848-apuntes-para-la-historia-de-la-guerra',
  type: 'book',
  title: 'Apuntes para la historia de la guerra entre México y los Estados Unidos',
  lang: 'es',
  contributors: [
    { name: 'Ramón Alcaraz', role: 'author' },
    { name: 'Guillermo Prieto', role: 'author' },
    { name: 'Manuel Payno', role: 'author' },
    { name: 'José María Iglesias', role: 'author' },
    { name: 'Ignacio Ramírez', role: 'author' }
  ],
  publisher: 'Tipografía de Manuel Payno (hijo)',
  place: 'México',
  date: '1848',
  ids: { archive: 'apuntesparalahis00alca' },
  url: 'https://archive.org/details/apuntesparalahis00alca',
  license: { id: 'public-domain' },
  accessed: '2026-10-08',
  holding: 'University of Connecticut Libraries (Internet Archive)'
})
