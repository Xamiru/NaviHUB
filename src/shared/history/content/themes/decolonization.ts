import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'decolonization',
  names: [
    { text: 'Decolonization', lang: 'en', role: 'primary' },
    { text: 'Decolonisation', lang: 'en', role: 'alternative' }
  ],
  regions: ['global', 'subsaharan-africa', 'south-asia', 'southeast-asia', 'mena'],
  thread: [
    { ref: 'event:french-invasion-of-algiers' },
    { ref: 'event:indian-rebellion-of-1857' },
    { ref: 'polity:british-raj' },
    {
      ref: 'event:berlin-conference',
      quote: {
        id: 'q5',
        text: 'In addition, the introduction of colonial rule drew arbitrary natural boundaries where none had existed before, dividing ethnic and linguistic groups and natural features, and laying the foundation for the creation of numerous states lacking geographic, linguistic, ethnic, or political affinity.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-decolonization-of-asia-and-africa',
          loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
        }
      }
    },
    { ref: 'event:founding-of-the-indian-national-congress' },
    {
      ref: 'polity:congo-free-state',
      quote: {
        id: 'q6',
        text: 'However, the colonies were exploited, sometimes brutally, for natural and labor resources, and sometimes even for military conscripts.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-decolonization-of-asia-and-africa',
          loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
        }
      }
    },
    { ref: 'event:battle-of-adwa' },
    { ref: 'event:herero-and-nama-genocide' },
    {
      ref: 'event:paris-peace-conference',
      quote: {
        id: 'q8',
        text: 'By that time, however, it was becoming clear that the Paris Peace Conference, rather than constructing a new world order based on self-determination, was largely aiming to restore the old imperial one, at least outside of Europe.',
        lang: 'en',
        cite: {
          source: 'eo1418-manela-wilsonian-moment',
          loc: { section: 'The Colonial World Mobilized', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/wilsonian-moment/'
        }
      }
    },
    {
      ref: 'event:amritsar-massacre',
      quote: {
        id: 'q7',
        text: 'The Amritsar Massacre became a symbol of British oppression and augured a new era of Indian resistance.',
        lang: 'en',
        cite: {
          source: 'eo1418-manela-wilsonian-moment',
          loc: { section: 'The Colonial World Mobilized', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/wilsonian-moment/'
        }
      }
    },
    {
      ref: 'event:non-cooperation-movement',
      quote: {
        id: 'q9',
        text: 'Although Gandhi\'s first nationwide satyagraha was too late to influence the framing of the new Government of India Act of 1919, the magnitude of disorder resulting from the movement was unparalleled and presented a new challenge to foreign rule.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/20.htm' }
      }
    },
    { ref: 'event:salt-march' },
    { ref: 'event:second-italo-ethiopian-war' },
    {
      ref: 'person:kwame-nkrumah',
      quote: {
        id: 'q10',
        text: 'Later, in London, Nkrumah became active in the West African Students\' Union and the Pan-African Congress. He was one of the few Africans who participated in the Manchester Congress of 1945 of the Pan-Africanist movement.',
        lang: 'en',
        cite: {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'The Politics of the Independence Movements', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ghana/13.htm' }
      }
    },
    {
      ref: 'event:founding-of-the-united-nations',
      quote: {
        id: 'q11',
        text: 'The revolutionary idea of 1919, that of an international order predicated on notionally equal, self-determining nation-states, was codified in the structure of the United Nations.',
        lang: 'en',
        cite: {
          source: 'eo1418-manela-wilsonian-moment',
          loc: { section: 'Toward a New Order', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/wilsonian-moment/'
        }
      }
    },
    { ref: 'event:indonesian-national-revolution' },
    { ref: 'event:partition-of-india' },
    { ref: 'event:mau-mau-uprising' },
    { ref: 'event:battle-of-dien-bien-phu' },
    { ref: 'event:algerian-war' },
    {
      ref: 'event:bandung-conference',
      quote: {
        id: 'q12',
        text: 'Many of the new nations resisted the pressure to be drawn into the Cold War, joined in the “nonaligned movement,” which formed after the Bandung conference of 1955, and focused on internal development.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-decolonization-of-asia-and-africa',
          loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
        }
      }
    },
    {
      ref: 'event:suez-crisis',
      quote: {
        id: 'q13',
        text: 'The immediate effect was that Britain and France were finally out of Egypt.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '36'
          }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
      }
    },
    { ref: 'event:independence-of-ghana' },
    { ref: 'event:congo-crisis' },
    { ref: 'event:handover-of-hong-kong' }
  ],
  related: [
    { ref: 'theme:the-cold-war' },
    { ref: 'theme:nationalism-in-the-middle-east' },
    { ref: 'theme:the-two-world-wars' },
    { ref: 'theme:iran-and-britain' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Asian%E2%80%93African_Conference_at_Bandung_April_1955.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Asian%E2%80%93African_Conference_at_Bandung_April_1955.jpg',
    credit: { institution: 'Nehru Memorial Museum and Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Between 1945 and 1960, three dozen new states in Asia and Africa achieved autonomy or outright independence from their European colonial rulers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-decolonization-of-asia-and-africa',
            loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
          }
        },
        {
          id: 'q2',
          text: 'In the mid to late 19th century, the European powers colonized much of Africa and Southeast Asia. During the decades of imperialism, the industrializing powers of Europe viewed the African and Asian continents as reservoirs of raw materials, labor, and territory for future settlement.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-decolonization-of-asia-and-africa',
            loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
          }
        },
        {
          id: 'q3',
          text: 'The wake of the Great War saw mobilizations against empire across the world, with many adopting the language of self-determination popularized by U.S. President Woodrow Wilson. While Wilson and the other peacemakers largely ignored these demands, these movements marked the emergence of anticolonial nationalism as a force in international affairs.',
          lang: 'en',
          cite: { source: 'eo1418-manela-wilsonian-moment', loc: { section: 'Wilsonian Moment' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilsonian-moment/'
          }
        },
        {
          id: 'q4',
          text: 'There was no one process of decolonization. In some areas, it was peaceful, and orderly. In many others, independence was achieved only after a protracted revolution.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-decolonization-of-asia-and-africa',
            loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q14',
          text: 'The newly independent nations that emerged in the 1950s and the 1960s became an important factor in changing the balance of power within the United Nations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-decolonization-of-asia-and-africa',
            loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  furtherReading: [
    { source: 'mazrui-1999-africa-since-1935', perspective: 'african' },
    { source: 'jansen-osterhammel-2013-dekolonisation', perspective: 'european' },
    { source: 'ageron-1991-la-decolonisation-francaise', perspective: 'european' }
  ]
})
