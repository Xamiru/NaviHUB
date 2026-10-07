import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'declaration-of-the-bab',
  names: [
    { text: 'Declaration of the Báb', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1844-05-22' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
          },
          {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '5' }
          },
          {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' },
    { ref: 'period:babi-movement' }
  ],
  related: [
    {
      ref: 'event:imprisonment-of-the-bab',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '15' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:the-bab',
      role: 'leader',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
        }
      ]
    },
    {
      ref: 'person:molla-hosayn-boshrui',
      role: 'participant',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
        },
        {
          source: 'iranica-maceoin-boshrui',
          loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
        }
      ]
    },
    {
      ref: 'person:qoddus',
      role: 'participant',
      cites: [
        { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '4' } }
      ]
    },
    {
      ref: 'person:tahereh-qorrat-al-ayn',
      role: 'participant',
      cites: [
        {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '5' }
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
          text: 'The most important religious event during Moḥammad Shah’s reign was the emergence of the Bābi movement, which started with the claims of its founder, Sayyed ʿAli-Moḥammad Širāzi, and his proclamation in May 1844.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q2',
          text: 'In common with other Shaikhis, Bošrūʾī was searching for a possible successor to Raštī (see babism) and, on 5 Jomādā I/22 May, Sayyed ʿAlī Moḥammad told him privately that he was indeed Raštī’s successor as the bearer of divine knowledge and, more specifically, the channel of communication with (or “gate to”) the Hidden Imam (bāb al-emām), a theme which is pursued in the pages of the Qayyūm al-asmāʾ.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q3',
          text: 'This date is mentioned by the Bāb in several places, notably his Persian Bayān (2:7, p. 30).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'At its inception, Babism was an intense expression of certain radical tendencies in the Shaikhi school of Shiʿism which had come to the fore during the leadership of Sayyed Kāẓem Raštī.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q5',
          text: 'A second such experience occurred on 15 Rabīʿ II 1260/4 May 1844, which he describes as “the first day on which the spirit descended into his heart” (Ketāb al-fehrest, p. 286)',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q6',
          text: 'The degree of involvement of the Bāb and his followers (beginning with Mollā Moḥammad-Ḥosayn Bošruʾi) with Sayyed Kāẓem Rašti and succession remains open to discussion.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'A small group of disciples, to whom he gave the title ḥorūf al-ḥayy (Letters of the Living) was thus formed around the Bāb, instructed by him, and sent out as missionaries on his behalf to various parts of Iran and Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q8',
          text: 'The unity of Shaikhism was irretrievably shattered and a core of convinced Babis brought into existence, eager to put into practice the radical changes implicit in the Bāb’s claims.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
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
            value: { d: '1844-04-01' },
            cites: [
              {
                source: 'iranica-maceoin-babism-i',
                loc: { section: 'BABISM i. The Babi movement', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Leaving Kūfa with a brother and cousin on or just after 12 Rabīʿ I 1260/1 April 1844, Bošrūʾī set out for Kermān, where he planned to consult with Moḥammad Karīm Khan (for references see MacEoin, “From Shaykhism,” p. 144).',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/babism' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1844-05-22' },
            cites: [
              {
                source: 'iranica-maceoin-babism-i',
                loc: { section: 'BABISM i. The Babi movement', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'After some weeks, during which Bošrūʾī seems to have read at least a part of these writings, on 5 Jomādā I/22 May, Sayyed ʿAlī-Moḥammad announced to him that he was the successor to Raštī and the bāb of the Hidden Imam.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/babism' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1844-07' },
            cites: [
              {
                source: 'iranica-maceoin-babism-i',
                loc: { section: 'BABISM i. The Babi movement', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After a short period of instruction ending in early July, 1844, the Bāb instructed sixteen of the ḥorūf al-ḥayy to disperse in various directions, carrying transcriptions of parts of his early writings, notably his commentary on the Koranic chapter Yūsof, the Qayyūm al-asmāʾ.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/babism' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1844-09-10' },
            cites: [
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'While his earliest disciples spread news of his appearance, the Bāb left Shiraz on 26 Šaʿbān 1260/10 September 1844, accompanied by Mollā Moḥammad ʿAlī Bārforūšī and an Ethiopian slave, heading for Mecca by way of Būšehr.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Tablet-Bab-to-first-letter-of-the-living.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tablet-Bab-to-first-letter-of-the-living.jpg',
    credit: { institution: 'The Dawn-Breakers (bahai-library.com)', creator: 'The Báb' },
    license: { id: 'public-domain' }
  }
})
