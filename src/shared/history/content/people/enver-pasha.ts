import { definePerson } from '../../schema'

export default definePerson({
  id: 'enver-pasha',
  names: [
    { text: 'Enver Pasha', lang: 'en', role: 'primary' },
    { text: 'Enver Paşa', lang: 'tr', role: 'native' },
    {
      text: 'Ismail Enver Pasha',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Ottomans’ Jihad, and its Practice in Iran', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1881-11-22' },
        cites: [
          { source: 'eo1418-ahmad-enver', loc: { section: 'Enver Pasha, Ismail' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1922-08-04' },
        cites: [
          { source: 'eo1418-ahmad-enver', loc: { section: 'Enver Pasha, Ismail' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:istanbul',
    cites: [
      { source: 'eo1418-ahmad-enver', loc: { section: 'Enver Pasha, Ismail' } }
    ]
  },
  regions: ['mena', 'russia-central-asia'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'chief of staff and war minister',
      start: {
        alts: [
          {
            value: { d: '1914-01-03' },
            cites: [
              { source: 'eo1418-ahmad-enver', loc: { section: 'Rise to Power', para: '4' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-ahmad-enver', loc: { section: 'Rise to Power', para: '4' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After leading the coup that brought the Committee of Union and Progress to power, Enver was appointed chief of staff and war minister. Convinced of a German victory, he decided to join World War One. In November 1918, he fled to Germany and then to Turkestan, where he organized Muslim forces against the Bolsheviks. He was killed in battle.',
          lang: 'en',
          cite: { source: 'eo1418-ahmad-enver', loc: { section: 'Enver Pasha, Ismail' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/enver-pasha-ismail/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On 23 January 1913, he led the coup d’état that overthrew the defeatist Mehmed Kâmil Pasha (1833-1913) cabinet and brought the CUP to power.',
          lang: 'en',
          cite: { source: 'eo1418-ahmad-enver', loc: { section: 'Rise to Power', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/enver-pasha-ismail/'
          }
        },
        {
          id: 'q3',
          text: 'As the two European alliance systems drew closer to war in 1914, Enver\'s pronounced pro-German sympathies, shared by many in the military and bureaucracy, prevailed over the pragmatic neutrality proposed by Talat and Cemal.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'World War I', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/ENPER_PASHA_WARMINISTER.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:ENPER_PASHA_WARMINISTER.jpg',
    credit: { institution: 'Museum für Kunst und Gewerbe Hamburg', creator: 'Nicola Perscheid' },
    license: { id: 'public-domain' }
  }
})
