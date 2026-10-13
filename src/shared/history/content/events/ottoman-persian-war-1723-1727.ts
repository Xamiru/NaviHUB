import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-persian-war-1723-1727',
  names: [
    { text: 'Ottoman–Persian War of 1723–1727', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1723' },
        cites: [
          {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '4' }
          },
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1727-10' },
        cites: [
          {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  sides: [
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } }
      ]
    },
    {
      key: 'persia',
      name: 'Persia',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '4' }
        }
      ]
    },
    {
      key: 'hotaki',
      name: 'Afghans',
      polity: 'polity:hotaki-dynasty',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '2' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Aḥmad Pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '25' }
        }
      ]
    },
    {
      name: 'Ašraf',
      role: 'head-of-state',
      side: 'hotaki',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '2' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-persian-war-1722-1723',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1092' } }
      ]
    },
    {
      ref: 'event:siege-of-isfahan-1722',
      rel: 'response-to',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Russians and Ottomans saw the Afghan conquest as their own opportunity to acquire territory in Iran, so both invaded and occupied some land in 1723.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q2',
          text: 'Turkey and Russia were not slow to take advantage of the calamities of Persia.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1085' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the beginning of the eighteenth century, Ottoman conflicts with European powers overshadowed relations with the Safavids.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        },
        {
          id: 'q4',
          text: 'The Afghan conqueror of Persia, Maḥmud, had made a bad impression on an Ottoman emissary dispatched by the governor of Baghdad to him soon after the fall of Isfahan, so the Ottomans chose not to make him their ally.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Ottomans recognized Ašraf as the king of Persia after suffering a defeat at his hand.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q6',
          text: 'As Ašraf’s reign marked the highpoint of the Afghans’ tenuous hold over Persia, a new leader, Ṭahmāsp-qoli Khan (later known as Nāder Shah), was rising to power as one of Shah Ṭahmāsp II’s most successful military commanders.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
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
            value: { d: '1724' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '8'
                }
              },
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' },
              { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1723' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1092' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The following year they signed a treaty in which they recognized each other’s territorial gains and agreed to support the restoration of Safavid rule.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1725-04' },
            cites: [
              {
                source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
                loc: {
                  section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In Šaʿbān 1137/April 1725, Maḥmud died or was put to death by members of his court after he had gone mad, so his cousin Ašraf became shah.',
        lang: 'en',
        cite: {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1726-01' },
            cites: [
              {
                source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
                loc: {
                  section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Ašraf sent an emissary to the Ottoman sultan in January 1726 who requested that Ottoman forces withdraw from all of Persia.',
        lang: 'en',
        cite: {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1726-03', notAfter: '1726-06' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Ottomans took offence at this arrogance, as they saw it, and proceeded to sever relations and open hostilities in Azarbaijan in the spring of 1138/1726.',
        lang: 'en',
        cite: { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1726-10', notAfter: '1726-12' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In late 1726 the Ottomans invaded Persia, and Aḥmad Pasha, the Turkish commander-in-chief, sent an insulting message to Ašraf, who had meanwhile succeeded Maḥmud, saying that the Afghans were a miserable lot and that the Ottomans had come to reinstate Shah Solṭān Ḥosayn.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1727-10' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Preferring not to push onward, Ašraf opened negotiations which led to the signature of a peace treaty in Ṣafar, 1140/October, 1727.',
        lang: 'en',
        cite: { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Sultan_Ahmed_III_%281703-30%29_Rijksmuseum_SK-A-2015.jpeg/1280px-Sultan_Ahmed_III_%281703-30%29_Rijksmuseum_SK-A-2015.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Sultan_Ahmed_III_(1703-30)_Rijksmuseum_SK-A-2015.jpeg',
    credit: { institution: 'Rijksmuseum', creator: 'Jean Baptiste Vanmour' },
    license: { id: 'public-domain' }
  }
})
