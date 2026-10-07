import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'amritsar-massacre',
  names: [
    { text: 'Amritsar massacre', lang: 'en', role: 'primary' },
    {
      text: 'Jallianwala Bagh Massacre',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Contesting Memory', para: '2' }
        }
      ]
    },
    { text: 'ਜਲ੍ਹਿਆਂਵਾਲਾ ਬਾਗ ਹੱਤਿਆਕਾਂਡ', lang: 'pa', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1919-04-13' },
        cites: [
          {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Amritsar, Massacre of' }
          },
          {
            source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
            loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '115' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:amritsar',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
        }
      ]
    },
    {
      ref: 'place:jallianwala-bagh',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:british-raj' }
  ],
  participants: [
    {
      ref: 'person:reginald-dyer',
      role: 'perpetrator',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
        }
      ]
    },
    {
      name: 'Sir Michael O’Dwyer',
      role: 'head-of-government',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Contesting Memory', para: '2' }
        }
      ]
    },
    {
      name: 'Lord William Hunter',
      role: 'participant',
      cites: [
        {
          source: 'eo1418-singh-amritsar-massacre',
          loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 379 },
            cites: [
              {
                source: 'eo1418-singh-amritsar-massacre',
                loc: { section: 'Contesting Memory', para: '1' }
              },
              {
                source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
                loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '149' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Hunter Commission' },
              { kind: 'participant', name: 'Winston Churchill' }
            ]
          },
          {
            value: { min: 1500, qualifier: 'about' },
            cites: [
              {
                source: 'eo1418-singh-amritsar-massacre',
                loc: { section: 'Contesting Memory', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Indian National Congress inquiry' }
            ]
          },
          {
            value: { min: 1000, qualifier: 'over' },
            cites: [
              {
                source: 'eo1418-singh-amritsar-massacre',
                loc: { section: 'Understanding the Amritsar Massacre', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'participant', name: 'An eyewitness quoted from the Congress inquiry' }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 1200, qualifier: 'over' },
            cites: [
              {
                source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
                loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '149' }
              }
            ],
            heldBy: [
              { kind: 'participant', name: 'Winston Churchill' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:paris-peace-conference', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q11',
          text: 'The British military commander, Brigadier Reginald E.H. Dyer, ordered his soldiers to fire at point-blank range into an unarmed and unsuspecting crowd of some 10,000 men, women, and children. They had assembled at Jallianwala Bagh, a walled garden, to celebrate a Hindu festival without prior knowledge of the imposition of martial law. A total of 1,650 rounds were fired, killing 379 persons and wounding 1,137 in the episode, which dispelled wartime hopes and goodwill in a frenzy of postwar reaction.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/india/19.htm' }
        },
        {
          id: 'q1',
          text: 'His less-than-celebrated actions in Punjab involved firing 1,650 rounds into a peaceful crowd of up to 20,000 religious pilgrims and political protestors assembled in a large square (the Jallianwala Bagh) in the middle of Amritsar.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'There were also attempts to justify the violence that had preceded 13 April by placing it in the context of agitation against the Rowlatt Acts – the extension into perpetuity in British India of emergency wartime measures that suspended ordinary jurisprudence, freedom of assembly and freedom of the press – and previous firings on crowds by the police on 10 April.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Q. – When you got to the bagh, what did you do?',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        },
        {
          id: 'q4',
          text: 'A. – I opened fire.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        },
        {
          id: 'q5',
          text: 'A. – Immediately. I had thought about the matter and don’t imagine it took me more than 30 seconds to make up my mind as to what my duty was.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        },
        {
          id: 'q6',
          text: 'I saw hundreds of persons killed on the spot. The worst part of the whole thing was that firing was directed towards the gate through which the people were running out. There were small outlets, 4 or 5 in all, and bullets actually rained over the people at all these gates, and […] many got trampled under the feet of the rushing crowds and thus lost their lives. Blood was pouring in profusion.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Understanding the Amritsar Massacre', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'The precise details of the massacre were and remain contested.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        },
        {
          id: 'q8',
          text: 'The Hunter Commission claimed a death-toll of 379 after fifty soldiers fired their rifles for approximately ten minutes.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        },
        {
          id: 'q9',
          text: 'The Indian National Congress in a parallel inquiry led by Mahatma Gandhi (1869-1948) and Chittaranjan Das (1869-1925), and involving Jawaharlal Nehru (1889-1964), claimed the number of the dead was closer to 1,500.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'As Gandhi put it in an editorial in his newspaper Young India in the aftermath of the Jallianwala Bagh Massacre, “No government deserves respect which holds cheap the liberty of its subjects.”14 Within months Gandhi was directing the Non-Cooperation – Khilafat Movement – the first all-India push for independence.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Jallianwala_Bagh_Memorial%2C_Amritsar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jallianwala_Bagh_Memorial,_Amritsar.jpg',
    credit: { creator: 'Baap8969' },
    license: { id: 'cc0' }
  }
})
