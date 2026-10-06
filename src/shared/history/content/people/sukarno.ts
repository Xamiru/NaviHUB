import { definePerson } from '../../schema'

export default definePerson({
  id: 'sukarno',
  names: [
    { text: 'Sukarno', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['southeast-asia'],
  roles: ['politician', 'revolutionary', 'head-of-state'],
  offices: [
    {
      title: 'President of Indonesia',
      lang: 'en',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '1' }
        },
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'INDEPENDENCE, 1950-65', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'On June 1, 1945, Sukarno gave a speech outlining the Pancasila; the five guiding principles of the Indonesian nation.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        },
        {
          id: 'q2',
          text: 'The committee chose Sukarno, who favored a unitary state, and Hatta, who wanted a federal system, as president and vice president, respectively--an association of two very different leaders that had survived the Japanese occupation and would continue until 1956.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/SoekarnoDoaProKemRI2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SoekarnoDoaProKemRI2.jpg',
    credit: { institution: 'Indonesian Department of Information', creator: 'Frans Mendur' },
    license: { id: 'public-domain' }
  }
})
