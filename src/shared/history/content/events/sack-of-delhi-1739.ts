import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sack-of-delhi-1739',
  names: [
    { text: 'Sack of Delhi', lang: 'en', role: 'primary' },
    {
      text: 'Nāderšāhi',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1739-03-22' },
        cites: [
          {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:delhi',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:nader-shahs-invasion-of-india',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'persia',
      name: 'Persian troops',
      polity: 'polity:afsharid-iran',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      key: 'delhi',
      name: 'Inhabitants of Delhi',
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
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      name: 'Inhabitants of Delhi',
      role: 'victim',
      side: 'delhi',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'civilian-deaths',
      side: 'delhi',
      value: {
        alts: [
          {
            value: { min: 20000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-afsharid-zand-periods',
                loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:battle-of-karnal',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
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
          text: 'When the rumor spread that Nāder had been assassinated, the Indians attacked and killed his troops.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'While engaged in levying a heavy contribution, the Persian troops were attacked by the populace, and many of them were killed.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        },
        {
          id: 'q4',
          text: 'Before the end of day, Nāder was informed of mob attacks in the city directed against units of his Qezelbāš troops, during which a number of Persian soldiers were killed.',
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
          text: 'It is estimated on March 22 approximately 20,000 inhabitants of Delhi (of differing religious persuasions) perished between 9 a.m. and 3 p.m., when Nāder finally directed his forces to halt their orgy of blood, pillaging, and extensive destruction of buildings',
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
        },
        {
          id: 'q7',
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
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1739-03-21' },
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
        id: 'q8',
        text: 'On March 21, coinciding with both the Persian New Year and the Muslim feast of the sacrifice, the sermon (ḵoṭba) in the congregational prayers was delivered in the name of the Persian conqueror, and coins were struck in his name in recognition of his supremacy.',
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
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Nadir_Shah_at_the_sack_of_Delhi_-_Battle_scene_with_Nader_Shah_on_horseback%2C_possibly_by_Muhammad_Ali_ibn_Abd_al-Bayg_ibn_Ali_Quli_Jabbadar%2C_mid-18th_century%2C_Museum_of_Fine_Arts%2C_Boston.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nadir_Shah_at_the_sack_of_Delhi_-_Battle_scene_with_Nader_Shah_on_horseback,_possibly_by_Muhammad_Ali_ibn_Abd_al-Bayg_ibn_Ali_Quli_Jabbadar,_mid-18th_century,_Museum_of_Fine_Arts,_Boston.jpg',
    credit: { institution: 'Museum of Fine Arts, Boston' },
    license: { id: 'public-domain' }
  }
})
