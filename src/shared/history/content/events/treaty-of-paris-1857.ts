import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-paris-1857',
  names: [
    { text: 'Treaty of Paris (1857)', lang: 'en', role: 'primary' },
    { text: 'عهدنامه پاریس', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1857-03-04' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
          }
        ]
      },
      {
        value: { d: '1857-03-03' },
        cites: [
          {
            source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
            loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Farrokh Gaffary' }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:farrokh-khan-ghaffari',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-gaffary-amin-al-dawla-farrok-khan',
          loc: { section: 'AMĪN-AL-DAWLA, FARROḴ KHAN ḠAFFĀRĪ', para: '1' }
        },
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    },
    {
      name: 'Lord Cowley',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    },
    {
      ref: 'person:napoleon-iii',
      role: 'participant',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    },
    {
      name: 'Count Walewski',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:anglo-persian-war-1856-1857',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Through the mediation of Napoleon III and his foreign minister, Count Walewski, Farroḵ Khan managed to start negotiations with Lord Cowley, British minister in Paris. This led to the signature of the Treaty of Paris on 4 March 1857, with ratifications exchanged at Baghdad on 2 May 1857.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q4',
          text: 'Persia was obliged to relinquish all claims over Herat and Afghanistan, while Britain was to serve as arbiter in any disputes between Persia and the Afghan states (article 6). British consular authorities, subjects, commerce, and trade were to be treated on a “most favored nation” basis (article 9).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In fact, the Persian government had sued for peace directly after the capture of Bushire.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q2',
          text: 'Facing an empty war-chest and the threat of political ruin, the terrified Nāṣer-al-Din Shah and his bewildered premier instructed Farroḵ Khan in Paris to accept the harsh British conditions for a ceasefire and the eventual restoration of diplomatic relations.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'In a separate note to the treaty, the terms of Murray’s return to Tehran were set out in “humiliating detail” (Wright, The English, p. 24).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q7',
          text: 'Otherwise, no guarantees, no indemnities, and no concessions were exacted; there was no demand for the ṣadr-e aʿẓam’s dismissal (Standish, “The Persian War,” p. 39), and the shah’s note of December 1855 insulting Murray was even annexed (see Aitchison, A Collection XIII, no. XVIII, pp. 81-86).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q9',
          text: 'One of the few concessions, however, in the 1857 treaty won by the Persian negotiator, Farroḵ Khan Amin-al-Dawla, was the undertaking by Britain not to admit Persian subjects as protégés arbitrarily (Hurewitz, II, pp. 341-43).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q10',
          text: 'Before they withdrew, the Persians installed Solṭān Aḥmad Khan, the nephew and son-in-law of Dōst Moḥammad, as Herat’s ruler. Effectively a vassal to the Persian crown (though this was never officially proclaimed), he enjoyed de facto British recognition as well. He was overthrown by Dōst Moḥammad in May, 1863; until then the Persian government managed to keep control over Herat while adhering to the Treaty of Paris (Standish, “The Persian War,” p. 35).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'From the middle of the 18th century, following Nāder Shah’s assassination in 1747, Herat became the focus of a century-long power struggle and regional rivalry that came to an end only with Persia renouncing its sovereignty over the city in 1857.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Brooklyn_Museum_-_Members_of_the_Special_Mission_of_Persia_to_the_Courts_of_Europe_-_Gustave_le_Grand.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Members_of_the_Special_Mission_of_Persia_to_the_Courts_of_Europe_-_Gustave_le_Grand.jpg',
    credit: { institution: 'Brooklyn Museum' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'mahmud-1949-tarikh-e-ravabet-e-siyasi-ye-iran-va-engelis',
      perspective: 'iranian'
    }
  ]
})
