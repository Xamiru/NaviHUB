import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'establishment-of-twelver-shiism-as-state-religion',
  names: [
    {
      text: 'Establishment of Twelver Shiism as the state religion',
      lang: 'en',
      role: 'primary'
    },
    {
      text: 'Official adoption of Twelver Shiʿism',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'religious',
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
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
          },
          {
            source: 'iranica-algar-shiism-in-iran-since-the-safavids',
            loc: {
              section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
              para: '7'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-algar-shiism-in-iran-since-the-safavids',
          loc: {
            section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
            para: '7'
          }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ismail-i',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-shiism-in-iran-since-the-safavids',
          loc: {
            section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
            para: '5'
          }
        }
      ]
    },
    {
      ref: 'person:tahmasp-i',
      role: 'leader',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '16' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-safavid-state',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q16',
          text: 'The Safavids declared Shia Islam the state religion and used proselytizing and force to convert the large majority of Muslims in Iran to the Shia sect.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q17',
          text: 'The second major problem facing Esmāʿīl was how to convert a nominally Sunni population to Eṯnā-ʿašarī Shiʿism.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '14' }
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
          id: 'q3',
          text: 'The transformation of the Safavids from a hereditary Sufi order of conventional Sunnite orientation into a politico-military grouping espousing a deviant species of Shiʿism began with Ṣafi-al-Din’s grandson, Ḵᵛāja ʿAli (d. 833/1429), a full half century after his death.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-shiism-in-iran-since-the-safavids',
            loc: {
              section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
          }
        },
        {
          id: 'q4',
          text: 'Much about the early Safavid order remains unclear.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The positive and pacific propagation of Shiʿism in Persia fell therefore to the lot of Arab scholars hailing from Jabal ʿĀmel',
          lang: 'en',
          cite: {
            source: 'iranica-algar-shiism-in-iran-since-the-safavids',
            loc: {
              section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
          }
        },
        {
          id: 'q8',
          text: 'Shah Ṭahmāsp made great efforts to further implant Shiʿism and bring religious unity to Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The near-complete eradication of Sunnism from the Iranian plateau, achieved by these and other means, must clearly have been gradual, and at least in some places it consisted initially of the pragmatic and superficial acceptance of a coerced creed.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-shiism-in-iran-since-the-safavids',
            loc: {
              section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
              para: '14'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
          }
        },
        {
          id: 'q11',
          text: 'However, it introduced into the Persian body politic the virtual certainty of eventual conflict between the shah, the symbol of “secular” government, and the religious leaders, who considered all secular governments illegitimate and whose ultimate goal was theocratic government.',
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
          id: 'q18',
          text: 'In the mid-16th century, several important cities such as Qazvin, Shiraz and Hamadan were still known as Sunni centers, and as late as 1720 an Ottoman observer noted that one-third of the country’s population retained Sunni affiliation.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '16' }
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
            value: { d: '1501' },
            cites: [
              {
                source: 'iranica-algar-shiism-in-iran-since-the-safavids',
                loc: {
                  section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
                  para: '7'
                }
              },
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On capturing Tabriz in 907/1501, a city two-thirds Sunnite in population, Shah Esmāʿil threatened with death all who might resist the adoption of Shiʿite prayer ritual in the main congregational mosque, and he had Qezelbāš soldiers patrol the congregation to ensure that none raise his voice against the cursing of the first three caliphs, viewed as enemies of the Prophet’s family.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-shiism-in-iran-since-the-safavids',
          loc: {
            section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
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
                source: 'iranica-algar-shiism-in-iran-since-the-safavids',
                loc: {
                  section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The extirpation of the Kāzaruniya, the oldest Sufi order in Persia existing at the time, was certainly abrupt and thoroughgoing: when Shah Esmāʿil conquered Fars in 909/1503, he desecrated the tomb in Kāzarun of its founder, Abu Esḥāq, and massacred some 4,000 people in its vicinity',
        lang: 'en',
        cite: {
          source: 'iranica-algar-shiism-in-iran-since-the-safavids',
          loc: {
            section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1608' },
            cites: [
              {
                source: 'iranica-algar-shiism-in-iran-since-the-safavids',
                loc: {
                  section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
                  para: '14'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'As far west as Hamadān, the Sunnites were numerous enough to provide the headman (kadḵodā) of the city; he was executed by Shah ʿAbbās in 1017/1608',
        lang: 'en',
        cite: {
          source: 'iranica-algar-shiism-in-iran-since-the-safavids',
          loc: {
            section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
            para: '14'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Sheikh-Safi-al-Din-Kh%C4%81neg%C4%81h-and-Shrine-Ensemble.jpg/1280px-Sheikh-Safi-al-Din-Kh%C4%81neg%C4%81h-and-Shrine-Ensemble.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sheikh-Safi-al-Din-Kh%C4%81neg%C4%81h-and-Shrine-Ensemble.jpg',
    credit: { creator: 'Ali Aali Abuzar' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
