import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-safavid-state',
  names: [
    { text: 'Founding of the Safavid state', lang: 'en', role: 'primary' },
    {
      text: 'Safavid conquest of Azarbaijan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1501' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
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
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    },
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
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
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    },
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ismail-i',
      role: 'leader',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    },
    {
      name: 'Alvand',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:establishment-of-twelver-shiism-as-state-religion',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
        }
      ]
    },
    {
      ref: 'event:battle-of-marv',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    },
    {
      ref: 'event:battle-of-chaldiran',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '10' }
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
          text: 'In 1501, under their leader Ismail, the Safavids seized power in Tabriz, which became their capital.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'With Azarbaijan seized, Esmāʿil, barely 15 years of age, inaugurated Safavid political rule in 1501 by proclaiming himself shah in Tabriz, having coins struck in his name and declaring the city his capital.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q3',
          text: 'The reign of Esmāʿīl is one of the most important in the history of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The Safavids began in about 1300 as a mystical order centered in the northwestern town of Ardabil, the hometown and burial place of the order’s founder, Shaikh Ṣafi-al-Din (1252-1334).',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q5',
          text: 'The relationship of the Qezelbāš to the shah was a mystical one of the Sufi master, moršed, and his disciple (morid).',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Shah Esmāʿīl came to power as the culmination of two centuries of promotion of the Safavid cause, initially through quiet propaganda carried on by the leaders of a local Sufi order in Gīlān, and ultimately through the militant and revolutionary activity by supporters of the Safavid family among the Turkman tribes of eastern Anatolia, the southern Caucasus, and elsewhere.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The rise of the Safavids marks the reemergence in Iran of a powerful central authority within geographical boundaries attained by former Iranian empires.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q12',
          text: 'Secondly, one of his first acts, the promulgation of the Eṯnā-ʿašarī rite of Shiʿism to be the official religion of the newly-created state, had profound consequences for the subsequent history of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        },
        {
          id: 'q13',
          text: 'ʿArabestān (Khuzestan), ruled by the local Shiʿite Mošaʿšaʿ dynasty, was subdued next, and with the seizure of Širvān the following year, all of Persia except for Khorasan was in Safavid hands.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
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
            value: { d: '1499' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Having lived under the protection of the ruler of Gilān for five years, in 1499 Esmāʿil emerged from the Caspian region, defeated the Širvānšāhs, and set out to wrest control of western Persia from the Āq Qoyunlu.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
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
            value: { d: '1501' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In 1501, the Safavid army broke the power of the Āq Qoyunlu by defeating their ruler, Alvand',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
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
            value: { d: '1503' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Internal divisions and the plague prevented the Āq Qoyunlu from resisting Esmāʿil’s conquest of Fārs in 1503.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '8' }
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
            value: { d: '1508' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In 1508, Safavid forces achieved their final victory over the Āq Qoyunlu by capturing Iraq, including Baghdad and the Shiʿite shrine cities of Najaf and Karbalāʾ.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Shah_Ismail_I_Safavid%2C_Behzad_%28portrait_detail%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Ismail_I_Safavid,_Behzad_(portrait_detail).jpg',
    credit: { creator: 'Kamāl ud-Dīn Behzād' },
    license: { id: 'public-domain' }
  }
})
