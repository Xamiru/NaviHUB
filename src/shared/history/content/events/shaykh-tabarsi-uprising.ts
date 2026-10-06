import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'shaykh-tabarsi-uprising',
  names: [
    { text: 'Shaykh Tabarsi uprising', lang: 'en', role: 'primary' },
    {
      text: 'Bābi upheaval of Tabarsi',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '7' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1848-09' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Denis M. MacEoin' }
        ]
      },
      {
        value: { d: '1848-10' },
        cites: [
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '7' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Nosrat Mohammad-Hosseini' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1849-05' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '7' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:shaykh-tabarsi-shrine',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
        },
        {
          source: 'iranica-maceoin-boshrui',
          loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
        }
      ]
    },
    {
      ref: 'place:babol',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:babi-movement' }
  ],
  sides: [
    {
      key: 'babis',
      name: 'Babis',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
        }
      ]
    },
    {
      key: 'state',
      name: 'provincial and state troops',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:molla-hosayn-boshrui',
      role: 'leader',
      side: 'babis',
      cites: [
        {
          source: 'iranica-maceoin-boshrui',
          loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
        }
      ]
    },
    {
      ref: 'person:qoddus',
      role: 'leader',
      side: 'babis',
      cites: [
        { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '7' } }
      ]
    },
    {
      ref: 'person:amir-kabir',
      role: 'head-of-government',
      side: 'state',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'babis',
      value: {
        alts: [
          {
            value: { min: 500, qualifier: 'nearly' },
            cites: [
              {
                source: 'iranica-maceoin-babism-ii',
                loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'babis',
      value: {
        alts: [
          {
            value: { min: 300, max: 400 },
            cites: [
              {
                source: 'iranica-mohammad-hosseini-qoddus',
                loc: { section: 'QODDUS', para: '7' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The struggle between a group of Babis and state forces in Māzandarān (September, 1848-May, 1849) caused considerable anxiety in the early months of Nāṣer-al-Dīn Shah’s reign, but its eventual suppression and the fact that it had been restricted to a rural area lessened the fear of the government.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q2',
          text: 'Qoddus was the most important figure in the Bābi upheaval of Tabarsi (Tabresi; October 1848 to May 1849) during which 300 to 400 Babis were killed while defendending themselves against the attacks of government troops.',
          lang: 'en',
          cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Also in July, 1848, Bošrūʾī and a large body of followers left Mašhad, possibly headed for Azarbaijan to rescue the Bāb from prison.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q4',
          text: 'Forced to travel on and attacked by a band of local horsemen, the Babis finally reached the shrine of Shaikh Abū ʿAlī Fażl Ṭabarsī, where they constructed a fort and were joined by other Babis from all parts of Iran, including Bārforūšī and seven other ḥorūf al-ḥayy, their numbers eventually reaching to near 500.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q5',
          text: 'In September, Bošrūʾī’s group, now enlarged, reached the shrine of Shaikh Abū ʿAlī al-Fażl Ṭabresī (Ṭabarsī), where they constructed a fortress of sorts to defend themselves against provincial and state troops who were sent to oppose their activities in the province.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        },
        {
          id: 'q6',
          text: 'A series of engagements soon ensued between the Babis and successive contingents of provincial and state troops until May, 1849, in the course of which all but a few of the defenders were killed.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Babism now clearly posed a direct threat to the established political and religious order.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q8',
          text: 'A task of equal importance that confronted him in the early days of his ministry was the repression of the Bābī insurrections that had coincided with the period of transition between Moḥammad Shah and Nāṣer-al-dīn Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
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
            value: { d: '1849-02-02' },
            cites: [
              {
                source: 'iranica-maceoin-boshrui',
                loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The struggle, which was led by Bošrūʾī until his death in the course of a sortie on 9 Rabīʿ I 1265/2 February 1849, ended with the surrender of the Babi survivors in May, 1849.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-boshrui',
          loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-05-16' },
            cites: [
              {
                source: 'iranica-mohammad-hosseini-qoddus',
                loc: { section: 'QODDUS', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Considered a martyr by the Bābis and later by the Bahais (see BAHAI FAITH), Qoddus’ tragic death has been compared to prominent figures of other religions, such as Jesus.',
        lang: 'en',
        cite: { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/qoddus-mohammad-ali-barforusi'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Shaykhtabarsi_2008.jpg/1280px-Shaykhtabarsi_2008.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shaykhtabarsi_2008.jpg',
    credit: { creator: 'NicholasJB' },
    license: { id: 'cc-by-sa', version: '3.0' }
  }
})
