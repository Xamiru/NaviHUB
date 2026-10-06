import { definePerson } from '../../schema'

export default definePerson({
  id: 'abdul-hamid-ii',
  names: [
    { text: 'Abdul Hamid II', lang: 'en', role: 'primary' },
    { text: 'Abdül Hamid II', lang: 'tr', role: 'alternative' }
  ],
  researched: '2026-10-06',
  regions: ['mena', 'europe'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The repressive policies of Abdül Hamid II fostered disaffection, especially among those educated in Europe or in Westernized schools. Young officers and students who conspired against the sultan\'s regime coalesced into small groups, largely outside Istanbul.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        },
        {
          id: 'q2',
          text: 'Abdül Hamid II was forced to abdicate and was succeeded by his brother, Mehmet V, in 1909.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Sultan_Abdul_Hamid_II_of_the_Ottoman_Empire.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sultan_Abdul_Hamid_II_of_the_Ottoman_Empire.jpg',
    credit: { institution: 'Topkapı Palace', creator: 'Abdullah Frères' },
    license: { id: 'public-domain' }
  }
})
