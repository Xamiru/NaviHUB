import { definePerson } from '../../schema'

export default definePerson({
  id: 'abdul-hamid-ii',
  names: [
    { text: 'Abdul Hamid II', lang: 'en', role: 'primary' },
    { text: 'Abdül Hamid II', lang: 'tr', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1842-09-21' },
        cites: [
          {
            source: 'britannica-1911-abd-ul-hamid-ii',
            loc: { section: 'ABD-UL-HAMID II.', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1918-02-10' },
        cites: [
          {
            source: 'britannica-1922-abdul-hamid-ii',
            loc: { section: '‛ABDUL HAMID II.', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'sultan',
      polity: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1876-08-31' },
            cites: [
              { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '72' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1909' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'External Threats and Internal Transformations', para: '10' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '72' } },
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '10' }
        }
      ]
    }
  ],
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
