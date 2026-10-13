import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-karim-khan-zand-and-the-succession-war',
  names: [
    {
      text: 'Death of Karim Khan Zand and the Zand succession war',
      lang: 'en',
      role: 'primary'
    }
  ],
  researched: '2026-10-13',
  type: 'crisis',
  start: {
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
  end: {
    alts: [
      {
        value: { d: '1789' },
        cites: [
          { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '1' }
        }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '6' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:zand-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } }
      ]
    },
    {
      ref: 'polity:qajar-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '6' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:karim-khan-zand',
      role: 'victim',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '12' }
        }
      ]
    },
    {
      name: 'Zaki Khan',
      role: 'participant',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } }
      ]
    },
    {
      name: 'Ṣādeq Khan',
      role: 'participant',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } }
      ]
    },
    {
      ref: 'person:ali-morad-khan-zand',
      role: 'participant',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '6' } }
      ]
    },
    {
      ref: 'person:lotf-ali-khan-zand',
      role: 'participant',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:karim-khan-zands-regency',
      rel: 'preceded-by',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } }
      ]
    },
    {
      ref: 'event:agha-mohammad-khans-rise',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
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
          text: 'Karim Khan died in his seventies after a six-months illness, probably of tuberculosis, on 13 Ṣafar 1193/1 March 1779.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q2',
          text: 'On Karim’s death a new period of anarchy supervened.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1111' } },
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
          text: 'None of Karim Khan’s five successors formally adopted his title of ‘deputy’ (wakil), nor did they take that of ‘shah.’',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q4',
          text: 'In Shiraz, internecine war had broken out even before Karīm’s corpse was buried.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
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
        },
        {
          id: 'q6',
          text: 'Loṭf-ʿAli Khan surprised Kerman in 1794 and held it for four months before the Qajars were admitted by treachery.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
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
            value: { d: '1779' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1779 Zaki Khan sent ʿAli-Morād Khan Zand in pursuit of Āḡā Moḥammad Khan Qājār who had fled from Shiraz to Māzandarān, but ʿAli-Morād Khan rebelled at Isfahan in the name of Abu’l-Fatḥ.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1779' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Ṣādeq Khan was thus enabled to return and occupy Shiraz, but he was still opposed by ʿAli-Morād Khan.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1781-02' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On ʿAli-Morad Khan’s order, Akbar Khan killed the two surviving sons of Karim Khan (Abu’l-Fatḥ and Moḥammad-ʿAli), as well as Ṣādeq Khan together with all his sons except Jaʿfar Khan, who had come to terms privately with ʿAli-Morād Khan.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1785-02' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Hastening to defend his capital in midwinter while ill, ʿAli-Morād Khan died at Murčaḵur in February 1785.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1785' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Jaʿfar Khan (r. 1785-89), through his energetic son Loṭf-ʿAli Khan, subdued Lār and Kerman and re-occupied Isfahan, but he was driven out twice by Āḡā Moḥammad Khan Qājār and fell back on Shiraz.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Portrait_of_Karim_Khan_Zand%2C_Zand_Persia%2C_late_18th_century.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Karim_Khan_Zand,_Zand_Persia,_late_18th_century.jpg',
    credit: { institution: 'Christie\'s' },
    license: { id: 'public-domain' }
  }
})
