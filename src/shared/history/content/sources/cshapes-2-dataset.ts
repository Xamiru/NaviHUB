import { defineSource } from '../../schema'

export default defineSource({
  id: 'cshapes-2-dataset',
  type: 'dataset',
  title: 'CShapes 2.0 and CShapes-Europe: historical state boundaries and capitals',
  lang: 'en',
  contributors: [
    { name: 'Guy Schvitz', role: 'compiler' },
    { name: 'Seraina Rüegger', role: 'compiler' },
    { name: 'Luc Girardin', role: 'compiler' },
    { name: 'Lars-Erik Cederman', role: 'compiler' },
    { name: 'Nils Weidmann', role: 'compiler' },
    { name: 'Kristian Skrede Gleditsch', role: 'compiler' }
  ],
  publisher: 'International Conflict Research, ETH Zürich',
  place: 'Zürich',
  date: '2022',
  url: 'https://icr.ethz.ch/data/cshapes/',
  accessed: '2026-10-08',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
