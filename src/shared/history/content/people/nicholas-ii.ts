import { definePerson } from '../../schema'

export default definePerson({
  id: 'nicholas-ii',
  names: [
    { text: 'Nicholas II', lang: 'en', role: 'primary' },
    { text: 'Николай II', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['russia-central-asia'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1894 the accession of the pliable Nicholas II upon the death of Alexander III gave Witte and other powerful ministers the opportunity to dominate the government.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'Tsar Nicholas failed to orchestrate a coherent Far Eastern policy because of ministerial conflicts, however.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '33' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q3',
          text: 'The failure to do so was partly because the tsar was not willing to give up autocratic rule or share power.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Portrait_of_Czar_Nicholas_II.jpg/1280px-Portrait_of_Czar_Nicholas_II.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Czar_Nicholas_II.jpg',
    title: 'Portrait of Czar Nicholas II',
    credit: { creator: 'W. & D. Downey' },
    license: { id: 'public-domain' }
  }
})
