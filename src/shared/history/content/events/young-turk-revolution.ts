import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'young-turk-revolution',
  names: [
    { text: 'Young Turk Revolution', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1908-07' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 1,
  places: [
    { ref: 'place:istanbul' }
  ],
  participants: [
    {
      ref: 'person:abdul-hamid-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '2' }
        }
      ]
    },
    {
      name: 'Committee of Union and Progress',
      role: 'organizer',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '1' }
        }
      ]
    },
    {
      name: 'Mustafa Kemal',
      role: 'participant',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:bosnian-annexation-crisis',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Atatürk\'s group merged with other nationalist reform organizations in 1907 to form the Committee of Union and Progress (CUP). Also known as the Young Turks, this group sought to restore the 1876 constitution and unify the diverse elements of the empire into a homogeneous nation through greater government centralization under a parliamentary regime.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In July 1908, army units in Macedonia revolted and demanded a return to constitutional government. Appearing to yield, Abdül Hamid II approved parliamentary elections in November in which the CUP won all but one of the Turkish seats under a system that allowed proportional representation of all millets .',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        },
        {
          id: 'q3',
          text: 'The Young Turk government was weakened by splits between nationalist and liberal reformers, however, and was threatened by traditionalist Muslims and by demands from non-Turkish communities for greater autonomy.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Foreign powers took advantage of the political instability in Istanbul to seize portions of the empire. Austria annexed Bosnia and Herzegovina immediately after the 1908 revolution, and Bulgaria proclaimed its complete independence.',
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
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1909' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'The Young Turks', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Abdül Hamid II was forced to abdicate and was succeeded by his brother, Mehmet V, in 1909.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Young Turks', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Greek_lithograph_celebrating_the_Ottoman_Constitution.png',
    page: 'https://commons.wikimedia.org/wiki/File:Greek_lithograph_celebrating_the_Ottoman_Constitution.png',
    credit: { creator: 'Sotiris Christidis' },
    license: { id: 'public-domain' }
  }
})
