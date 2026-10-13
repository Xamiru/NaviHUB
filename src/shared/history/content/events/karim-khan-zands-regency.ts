import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'karim-khan-zands-regency',
  names: [
    { text: 'Karim Khan Zand’s regency', lang: 'en', role: 'primary' },
    {
      text: 'Zand rule in Shiraz',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1751' },
        cites: [
          { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1750' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1779-03-01' },
        cites: [
          {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '12' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1779-03-02' },
        cites: [
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '2' }
        }
      ]
    },
    {
      ref: 'place:basra',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '11' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:zand-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    },
    {
      ref: 'polity:afsharid-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:karim-khan-zand',
      role: 'leader',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '2' } }
      ]
    },
    {
      name: 'Esmāʿil III',
      role: 'participant',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '2' }
        }
      ]
    },
    {
      name: 'Āzād Khan Afḡān',
      role: 'participant',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:assassination-of-nader-shah',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '1' }
        }
      ]
    },
    {
      ref: 'event:death-of-karim-khan-zand-and-the-succession-war',
      rel: 'followed-by',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Finally Karim Khan Zand (1750-79) was able to defeat his rivals and to unify the country, except for Khorasan, under a loose form of central control.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'Throughout his life, Karim Khan never assumed the title of king (šāh), but was known as the wakil (‘deputy’).',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q3',
          text: 'The Safavid Esmāʿil III predeceased him in 1187/1773, and the fiction of a Safavid revival was quietly dropped.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In 1732 Nāder Shah deported thousands of Baḵ-tiāri and a number of Zand families to Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q5',
          text: 'Karim Khan devoted his efforts to reviving trade and agriculture in Fārs and western Persia.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Karim Khan directed particular attention to reviving the economy and normalizing foreign trade.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q7',
          text: 'Karim Khan repaired the neglected tombs of Šāh Šojāʿ, Ḥāfeẓ, and Saʿdi.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q8',
          text: 'Karim Khan made it a personal rule not to appropriate windfalls: just as in his years of struggle he distributed booty among his troops and new allies, so in the period of consolidation he refused to confiscate the residue of those deceased without immediate heir, and when, during the rebuilding of Shiraz, a pot of gold coins was unearthed, he shared it out among the workers on the site.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q9',
          text: 'The dynasty’s reputation rests on its founder Karim Khan, who was able not only to weld together an army from the different Iranian pastoral tribes of the Zagros but also to build a measure of trust and some lasting alliances with the bureaucrats and magnates of the major cities of western and southern Persia (Isfahan, Shiraz, Tabriz, and Kerman).',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
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
            value: { d: '1751-01' },
            cites: [
              {
                source: 'iranica-perry-karim-khan-zand',
                loc: { section: 'KARIM KHAN ZAND', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Karim Khan, who had meanwhile returned to Isfahan in January 1751 with an augmented army, sought out and defeated his rival in Baḵtiāri country.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1763-02' },
            cites: [
              {
                source: 'iranica-perry-karim-khan-zand',
                loc: { section: 'KARIM KHAN ZAND', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Karim Khan then advanced into Azarbaijan, successively defeating the Afšār and Donboli forces and taking Tabriz and Urmia in February 1763.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1765' },
            cites: [
              {
                source: 'iranica-perry-karim-khan-zand',
                loc: { section: 'KARIM KHAN ZAND', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1765 an amphibious assault by the Wakil, the Ottoman ʿOmar Pasha of Baghdad, and the British East India Company failed through poor coordination',
        lang: 'en',
        cite: {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1775' },
            cites: [
              {
                source: 'iranica-perry-karim-khan-zand',
                loc: { section: 'KARIM KHAN ZAND', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1775 the Wakil sent his brother (Moḥammad) Ṣādeq Khan to besiege Basra in Ottoman Iraq, which after a yearlong siege was taken and occupied until Karim Khan’s death in 1779.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1775-09', notAfter: '1775-11' },
            cites: [
              {
                source: 'iranica-perry-karim-khan-zand',
                loc: { section: 'KARIM KHAN ZAND', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In autumn of 1775, for instance, a severe famine in Isfahan and Fārs obliged the Wakil to throw open the state granaries for the relief of the poor.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Arg_of_Karim_Khan%2C_Shiraz_03.jpg/1280px-Arg_of_Karim_Khan%2C_Shiraz_03.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Arg_of_Karim_Khan,_Shiraz_03.jpg',
    credit: { creator: 'Bernard Gagnon' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
