import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'transfer-of-the-portuguese-court-to-brazil',
  names: [
    { text: 'Transfer of the Portuguese court to Brazil', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'migration',
  start: {
    alts: [
      {
        value: { d: '1807-11' },
        cites: [
          {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Peninsular Wars', para: '4' }
          },
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Transition to Kingdom Status', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'europe'],
  prominence: 3,
  places: [
    { ref: 'place:rio-de-janeiro' }
  ],
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  polities: [
    { ref: 'polity:first-french-empire' },
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      name: 'Dom João',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Transition to Kingdom Status', para: '2' }
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
          text: 'On November 17, 1807, an army of French and Spanish soldiers under the command of the French general Andoche Junot entered Portugal and marched on Lisbon. The British were in no position to defend their ally; consequently, the prince regent and the royal family left for Brazil.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Peninsular Wars', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/portugal/33.htm' }
        },
        {
          id: 'q2',
          text: 'In any case, the royal government did not move until Portugal was actually invaded in late 1807.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Transition to Kingdom Status', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/9.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Dom João opened Brazilian ports to world commerce, allowing British goods to stream in, and eliminating the Portuguese middlemen.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Transition to Kingdom Status', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/9.htm' }
        },
        {
          id: 'q4',
          text: 'For the Brazilian elites, the transfer of the court meant that they could have conservative political change without social disorder.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Transition to Kingdom Status', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/9.htm' }
        },
        {
          id: 'q5',
          text: 'The British not only saved the royal family and some 15,000 courtiers but also lent US$3 million in 1809 to keep the government functioning.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Transition to Kingdom Status', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/9.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Embarque_da_Fam%C3%ADlia_Real_para_o_Brasil_-_Nicolas-Louis-Albert_Delerive%2C_attrib._%28Museu_Nacional_dos_Coches%29.png/1280px-Embarque_da_Fam%C3%ADlia_Real_para_o_Brasil_-_Nicolas-Louis-Albert_Delerive%2C_attrib._%28Museu_Nacional_dos_Coches%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Embarque_da_Fam%C3%ADlia_Real_para_o_Brasil_-_Nicolas-Louis-Albert_Delerive,_attrib._(Museu_Nacional_dos_Coches).png',
    credit: { institution: 'Museu Nacional dos Coches', creator: 'Nicolas-Louis-Albert Delerive' },
    license: { id: 'public-domain' }
  }
})
