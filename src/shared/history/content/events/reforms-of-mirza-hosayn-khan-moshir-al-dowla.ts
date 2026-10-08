import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reforms-of-mirza-hosayn-khan-moshir-al-dowla',
  names: [
    { text: 'Reforms of Mirza Hosayn Khan Moshir al-Dowla', lang: 'en', role: 'primary' },
    { text: 'اصلاحات میرزا حسین‌خان سپهسالار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1871-11' },
        cites: [
          {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Guity Nashat' }
        ]
      },
      {
        value: { d: '1870-12' },
        cites: [
          {
            source: 'iranica-nabavi-journalism-qajar',
            loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Negin Nabavi' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1873-09' },
        cites: [
          {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
          },
          {
            source: 'iranica-nabavi-journalism-qajar',
            loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mirza-hosayn-khan-moshir-al-dowla',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-nashat-darbar-e-azam',
          loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-nashat-darbar-e-azam',
          loc: { section: 'DARBĀR-E AʿẒAM', para: '2' }
        }
      ]
    },
    {
      ref: 'person:malkom-khan',
      role: 'ideologue',
      cites: [
        {
          source: 'iranica-nashat-darbar-e-azam',
          loc: { section: 'DARBĀR-E AʿẒAM', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:reuter-concession', rel: 'related' },
    { ref: 'event:naser-al-din-shahs-first-european-journey', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Mīrzā Ḥosayn Khan Mošīr-al-Dawla, Persian ambassador to Istanbul, had for some time been urging Nāṣer-al-Dīn Shah to adopt such reforms; in December 1870 the shah recalled him to Tehran to undertake the necessary measures (Bakhash, pp. 77-120; Nashat, pp. 43-94).',
          lang: 'en',
          cite: {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
          }
        },
        {
          id: 'q2',
          text: 'He had been ambassador in Istanbul after 1856, and now he drew up extensive plans for the reorganization of the army, including measures to regulate the army budget, reform conscription, and improve military education (Nashat, pp. 55-71).',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        },
        {
          id: 'q3',
          text: 'Although in the text of Nāṣer-al-Dīn Shah’s edict Mošīr-al-Dawla is credited with creation of the darbār-e aʿẓam, the principal arguments for ministerial accountability and coordinating the work of the highest state officials had already been set forth in the essay “Ketābča-ye ḡaybī yā daftar-e tanẓīmat” by Mīrzā Malkom Khan in 1276/1859 (Nashat, p. 79).',
          lang: 'en',
          cite: {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'In 1871, with the encouragement of his new prime minister, Mirza Hosain Khan Moshir od Dowleh, the shah established a European-style cabinet with administrative responsibilities and a consultative council of senior princes and officials.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q5',
          text: 'DARBĀR-E AʿẒAM (lit., “the great court”), a council of ministers established in October 1872 asone of several experiments undertaken in the reign of Nāṣer-al-Dīn Shah (1264-1313/1848-96) to reorganize and rationalize the Persian administration on the model of Western cabinet government.',
          lang: 'en',
          cite: {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
          }
        },
        {
          id: 'q6',
          text: 'He was named ṣadr-e aʿẓam in November 1871 and immediately took steps to eliminate the overlapping jurisdictions and rationalize the unclear lines of authority that had previously prevailed within the government. He also attempted to end corruption by putting the state finances in order.',
          lang: 'en',
          cite: {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Whereas official gazettes, albeit under different titles, continued to be affiliated with the Office of Publications, which had been established in a supervisory capacity in March 1871, a number of semi-controlled and reformist-leaning newspapers also appeared for the first time. Among them were Waqāyeʿ-e ʿadliya (1871), Ruz-nāma-ye neẓāmi (Dec 1876-May 1877), Ruz-nāma-ye ʿelmi (December 1877-May 1880), and Merriḵ (December 1878-May 1880).',
          lang: 'en',
          cite: {
            source: 'iranica-nabavi-journalism-qajar',
            loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/journalism-i-qajar-period/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Although at first he enjoyed the full support of the shah, his efforts, particularly to concentrate power in his own hands, angered many powerful courtiers and officials. The opposition took advantage of the crisis generated by the government’s grant to Baron Julius de Reuter of exclusive rights to exploit most Persian natural resources (see CONCESSIONS ii) to bring about Mošīr-al-Dawla’s dismissal in September 1873.',
          lang: 'en',
          cite: {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
          }
        },
        {
          id: 'q9',
          text: 'The shah maintained his interest in reforming the central administration until the end of the decade, but in the remaining years of his rule he grew less enthusiastic.',
          lang: 'en',
          cite: {
            source: 'iranica-nashat-darbar-e-azam',
            loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
          }
        },
        {
          id: 'q10',
          text: 'In order to break the monopoly power of Mirzā Ḥosayn Khan Sepahsālār and Mostawfi–al–Mamālek, the shah in 1878 installed Kāmrān Mirzā into an immediate share of power.',
          lang: 'en',
          cite: {
            source: 'iranica-walcher-kamran-mirza',
            loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kamran-mirza-nayeb-al-saltana'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1871-11' },
            cites: [
              {
                source: 'iranica-nashat-darbar-e-azam',
                loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Guity Nashat' }
            ]
          },
          {
            value: { d: '1870-12' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Negin Nabavi' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Later, with the political restructuring of the 1870s and the promotion of the spirit of reform that was encouraged by Mirzā Ḥosayn Khan Mošir-al-Dawla during his tenure as grand vizier (ṣadr-e aʿẓam; December 1870-September 1873) and his subsequent positions as Minister of Foreign Affairs (wazir-e omur-e ḵāreja; 1873-80) and Minister of War (wazir-e jang; 1874-80), some change was introduced in the journalistic culture (Ādamiyat, p. 386).',
        lang: 'en',
        cite: {
          source: 'iranica-nabavi-journalism-qajar',
          loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/journalism-i-qajar-period/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1872-10-23' },
            cites: [
              {
                source: 'iranica-nashat-darbar-e-azam',
                loc: { section: 'DARBĀR-E AʿẒAM', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Guity Nashat' }
            ]
          },
          {
            value: { d: '1871' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The edict establishing the darbār-e aʿẓam, drafted by Mīrzā Ḥosayn Khan Mošīr-al-Dawla and approved by Nāṣer-al-Dīn Shah on 20 Šaʿbān 1289/23 October 1872, defined the authority of the individual cabinet ministers, as well as their relation to the central authority (for the text, see Ṣanīʿ-al-Dawla, pp. 162-66).',
        lang: 'en',
        cite: {
          source: 'iranica-nashat-darbar-e-azam',
          loc: { section: 'DARBĀR-E AʿẒAM', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/darbar-e-azam'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1873-09' },
            cites: [
              {
                source: 'iranica-nashat-darbar-e-azam',
                loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The combination of a palace coup, conservative princes and mojtaheds opposed to Westernizing reforms, and possible Russian intrigue brought down Mošir-al-Dawla’s government and put a halt to his program of reforms.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '26'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Portrait_of_Mirza_Hossein_Khan_Moshir_al-Dowleh_-_Unknown_Artist_-_Islamic_Consultative_Assembly_Museum_of_Iran.jpg/1280px-Portrait_of_Mirza_Hossein_Khan_Moshir_al-Dowleh_-_Unknown_Artist_-_Islamic_Consultative_Assembly_Museum_of_Iran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Mirza_Hossein_Khan_Moshir_al-Dowleh_-_Unknown_Artist_-_Islamic_Consultative_Assembly_Museum_of_Iran.jpg',
    credit: { institution: 'Islamic Consultative Assembly Museum of Iran' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'adamiyat-1973-andisheh-ye-taraqqi', perspective: 'iranian' }
  ]
})
