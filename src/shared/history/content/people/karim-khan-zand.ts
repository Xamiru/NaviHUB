import { definePerson } from '../../schema'

export default definePerson({
  id: 'karim-khan-zand',
  names: [
    { text: 'Karim Khan Zand', lang: 'en', role: 'primary' },
    { text: 'کریم‌خان زند', lang: 'fa', role: 'native', translit: 'Karīm Khān Zand' },
    {
      text: 'The Wakil',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '1' }
        }
      ]
    },
    {
      text: 'Moḥammad-Karim Beg',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1705', approx: true },
        cites: [
          {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1779-03-01' },
        cites: [
          {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '12' }
          },
          {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '1' }
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
  diedIn: {
    ref: 'place:shiraz',
    cites: [
      {
        source: 'iranica-perry-karim-khan-zand',
        loc: { section: 'KARIM KHAN ZAND', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Wakil (deputy) of Persia',
      polity: 'polity:zand-iran',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1751' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '2' }
              }
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
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '2' } },
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '12' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Portrait_de_Karim_Khan_Zand_fumant_le_qalyan_-_MAO_796_-_v1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_de_Karim_Khan_Zand_fumant_le_qalyan_-_MAO_796_-_v1.jpg',
    credit: { institution: 'Musée du Louvre', creator: 'Muhammad Sadiq II' },
    license: { id: 'public-domain' }
  },
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
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
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
        },
        {
          id: 'q4',
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
        },
        {
          id: 'q5',
          text: 'Karim Khan did not attempt to recover Khorasan, which became a tributary of the Afghan monarch, Aḥmad Shah Dorrāni.',
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
        },
        {
          id: 'q6',
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
      ]
    },
    {
      kind: 'legacy',
      quotes: [
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
          text: 'Though stories abound of his personal courage, sexual prowess, and enjoyment of wine and perhaps opium, it is his strict fairness, sense of humor, and notable humanity that are most frequently recorded in popular anecdotes.',
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
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q10',
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
          id: 'q11',
          text: 'Karim Khan’s resting place is no longer known for certain.',
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
        }
      ]
    }
  ]
})
