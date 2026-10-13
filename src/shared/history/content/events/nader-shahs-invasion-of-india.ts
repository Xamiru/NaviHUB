import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nader-shahs-invasion-of-india',
  names: [
    { text: 'Nader Shah’s invasion of India', lang: 'en', role: 'primary' },
    {
      text: 'Persian invasion of the Mughal empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '5' }
        }
      ]
    },
    {
      text: 'Nāder’s invasion of the Mughal empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1738-12' },
        cites: [
          {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1739-05-05' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1097' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1739-05', approx: true },
        cites: [
          {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '8' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mansour Bonakdarian', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:delhi',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      ref: 'place:karnal',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      ref: 'place:kabul',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1095' } }
      ]
    },
    {
      ref: 'place:lahore',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      ref: 'place:kandahar',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '22' } }
      ]
    }
  ],
  sides: [
    {
      key: 'persia',
      name: 'Persians',
      polity: 'polity:afsharid-iran',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      key: 'mughal',
      name: 'Mughals',
      polity: 'polity:mughal-empire',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'leader',
      side: 'persia',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      name: 'Moḥammad Shah',
      role: 'head-of-state',
      side: 'mughal',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-durrani',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '10' }
        }
      ]
    },
    {
      name: 'Reżā-qoli',
      role: 'commander',
      side: 'persia',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '23' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:battle-of-karnal',
      rel: 'related',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      ref: 'event:sack-of-delhi-1739',
      rel: 'related',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-durrani-empire',
      rel: 'related',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '10' }
        }
      ]
    },
    {
      ref: 'event:third-battle-of-panipat',
      rel: 'related',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '10' }
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
          text: 'Nadir Shah conquered Qandahar and Kabul in 1738 along with defeating a great Mughal army in India, plundering Delhi, and massacring thousands of its people.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/10.htm' }
        },
        {
          id: 'q2',
          text: 'After a successful offensive that culminated in the final defeat of the Mughal forces at the battle of Karnāl near Delhi in February 1739, Nāder made the Mughal emperor Moḥammad Šāh (r. 1719-48) his vassal and divested him of a large part of his fabulous riches, including the Peacock Throne and the Koh-i-Noor diamond.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'Nāder’s invasion of the Mughal empire and the sacking of its capital Delhi came at a time of ongoing disintegration of Mughal central authority and increased internal and regional challenges to Mughal rule.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q4',
          text: 'After laying siege to Qandahar for almost a year, Nāder destroyed it in 1738—the last redoubt of the Ḡilzi, who were led by Shah Ḥosayn Solṭān, the brother of Shah Maḥmud, who had been the first Ḡilzay to rule Persia (1722-1725).',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '22' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'For fifty-eight days Nadir Shah remained in Delhi, and when he left he carried with him a treasure in money amounting, at the lowest computation, to eight or nine millions sterling, besides jewels of inestimable value, and other property to the amount of several millions more.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        },
        {
          id: 'q6',
          text: 'The remainder of Nāder’s long sojourn in Delhi, before finally departing on his homebound journey in mid-May, was devoted to exacting tribute from various city wards, the Mughal nobility, and officials.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q7',
          text: 'After the campaigns in India and Turkestan, particularly with acquisition of the Mughal treasury, Nāder found himself suddenly wealthy.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '26' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q8',
          text: 'The financial despoiling and the devastation wrought by Nāder Shah, his appointment of semi-autonomous regional officials in northwestern Mughal territories, along with the increased autonomy of regional governors (naw-wābs) in some other parts of the empire—as in the case of ʿAliverdi Khan, the nawwāb of Bengal, who ceased to remit provincial revenues to Delhi—and the blow to the Mughal military power, which now appeared even less capable than before in resisting internal and external challengers, were among additional developments contributing to the long-term weakening of Mughal central authority.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q9',
          text: 'Though it was by no means the leading factor in hastening the gradual collapse of the Mughal empire and the eventual rise of British hegemony throughout the subcontinent, after Nāder’s invasion the Mughal empire faced further disarray.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
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
            value: { d: '1738-12' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-afsharid-zand-periods',
                loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In December 1738 Nāder Shah’s forces left their Afghan bases, soon crossing the Indus and pushing on to Lahore in January 1739, where Sikh resistance and the forces of the Mughal governor failed to halt the invaders.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1739-02-24' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-afsharid-zand-periods',
                loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On February 24, the decisive battle of Karnal got underway, with the Mughal ruler Moḥammad Shah having reached the city earlier in the month.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1739-01' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-afsharid-zand-periods',
                loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'As the invading army captured and plundered city after city, Nāder also appointed or retained his own choice of regional governors, at times further augmenting the authority of regional Mughal officeholders (manṣabdārs) who surrendered and complied with Nāder’s ordinances, as in the case of Zakariya Khan the governor of Lahore (Punjab), who originally had resisted the invaders.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1739-05-12' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-afsharid-zand-periods',
                loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On May 12, the Persian conqueror reinstated Moḥammad Shah as the Mughal emperor during a “durbar” (darbār) ceremony.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Nadir_Shah_on_the_Peacock_Throne_after_his_defeat_of_Muhammad_Shah._ca._1850%2C_San_Diego_MOA.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nadir_Shah_on_the_Peacock_Throne_after_his_defeat_of_Muhammad_Shah._ca._1850,_San_Diego_MOA.jpg',
    credit: { institution: 'San Diego Museum of Art' },
    license: { id: 'public-domain' }
  }
})
