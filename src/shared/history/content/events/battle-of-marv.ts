import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-marv',
  names: [
    { text: 'Battle of Marv', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Merv',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1510-12-02' },
        cites: [
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '10' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '9' }
          },
          {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:marv',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    },
    {
      ref: 'polity:khanate-of-bukhara',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    },
    {
      key: 'uzbek',
      name: 'Uzbeks',
      polity: 'polity:khanate-of-bukhara',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ismail-i',
      role: 'commander',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    },
    {
      ref: 'person:muhammad-shaybani',
      role: 'commander',
      side: 'uzbek',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    },
    {
      ref: 'person:babur',
      role: 'combatant',
      cites: [
        {
          source: 'iranica-lehmann-babor',
          loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-safavid-state',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '8' }
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
          text: 'In 1510, Esmāʿil defeated Moḥammad Šaybāni Khan and took Marv and Herat, thus extending his realm from the ancient Mongol capital to that of the successors of the Timurids.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'By the time of Šïbāni Khan’s death in the battle with the Persians at Merv in 916/1510, the territories that he had conquered included Transoxania, Farḡāna, Khwarazm, and a part of Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'After Šïbāni Khan’s conquest of Herat in 913/1507, he had his name read in the Friday sermon (ḵoṭba) with the title Emām-al-zamān wa ḵalifat-al-raḥmān (the Leader of the Age and the Vicegerent of the Merciful), which was a claim to both spiritual and temporal supreme authority in the Muslim world',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Ismaʽil quickly followed him and enticed him out to battle by taunt and reproach.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1060' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'In 916/1510 the Safavid ruler had the skull of the defeated pro-Ottoman Uzbek ruler Moḥammad Šaybānī Khan made into a drinking cup and sent it to Bāyazīd together with a number of demands.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q8',
          text: 'Esmāʿil did not intend to expand his territory beyond Khorasan into Transoxania, but was drawn into an attack on Samarqand by the ambitions of Ẓahir-al-Din Bābor (r. 1526-30), a descendant of Timur and the progenitor of the Indian Mughal dynasty.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q9',
          text: 'From Rajab, 917 to Ṣafar, 918/October, 1511 to May, 1512, he held the city for the third time, but as a client of Shah Esmāʿīl, a condition that required him to make an outward profession of the Shiʿite faith and to adopt the Turkman costume of the Safavid troops.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        },
        {
          id: 'q10',
          text: 'After the death of Šïbāni Khan the sultans (members of the Abu’l-Khayrid clan), convened an assembly (qoreltāy), at which a new khan was elected.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
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
            value: { d: '1507' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Uzbeks, led by Moḥammad Khan Šaybāni (r. 1500-12), had overrun the area in 1507-08, moving as far west as Dāmḡān, from where they organized raids against Kermān and Yazd.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1510-12-02' },
            cites: [
              {
                source: 'iranica-savory-esmail-i-safawi-biography',
                loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Although initially ruler of Azarbaijan only, by the year 916/1510 Esmāʿīl was master of the whole of Persia, having crushed the residual forces of the Aq Qoyunlu and driven the Uzbeks out of the northeastern frontier province of Khorasan, following his great victory over Moḥammad Šībānī (Šaybak) Khan at Marv on 30 Šaʿbān 916/2 December 1510, recorded in the chronogram “fatḥ-e šāh-e dīn-panāh”',
        lang: 'en',
        cite: {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Shaybani_Khan.jpg/1280px-Shaybani_Khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shaybani_Khan.jpg',
    credit: { creator: 'Indian School, 18th century' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
