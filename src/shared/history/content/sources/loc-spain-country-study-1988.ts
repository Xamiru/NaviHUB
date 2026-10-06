import { defineSource } from '../../schema'

export default defineSource({
  id: 'loc-spain-country-study-1988',
  type: 'government',
  title: 'Spain: A Country Study',
  lang: 'en',
  contributors: [
    { name: 'Eric Solsten', role: 'editor' },
    { name: 'Sandra W. Meditz', role: 'editor' }
  ],
  publisher: 'GPO for the Library of Congress',
  place: 'Washington',
  date: '1988',
  url: 'http://countrystudies.us/spain/',
  accessed: '2026-10-06',
  holding: 'Federal Research Division, Library of Congress',
  license: { id: 'public-domain' }
})
