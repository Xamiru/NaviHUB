import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'safavid-order-under-junayd-and-haydar',
  names: [
    { text: 'The Safavid order under Junayd and Haydar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1447', notAfter: '1448' },
        cites: [
          { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '3' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1488-07-09' },
        cites: [
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:ardabil',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '2' } }
      ]
    },
    {
      ref: 'place:amed',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } }
      ]
    },
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } }
      ]
    },
    {
      ref: 'polity:shirvan',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid-order',
      name: 'Safavid order',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '1' } }
      ]
    },
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '5' }
        }
      ]
    },
    {
      key: 'qara-qoyunlu',
      name: 'Qara Qoyunlu',
      polity: 'polity:qara-qoyunlu',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:junayd-safavi',
      role: 'leader',
      side: 'safavid-order',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '1' } }
      ]
    },
    {
      ref: 'person:haydar-safavi',
      role: 'leader',
      side: 'safavid-order',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } }
      ]
    },
    {
      ref: 'person:uzun-hasan',
      role: 'head-of-state',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '5' }
        }
      ]
    },
    {
      ref: 'person:jahan-shah',
      role: 'head-of-state',
      side: 'qara-qoyunlu',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } }
      ]
    },
    {
      name: 'Shaikh Jaʿfar b. Ḵᵛāja ʿAli',
      role: 'participant',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '3' } }
      ]
    }
  ],
  related: [
    { ref: 'event:death-of-haydar-and-the-imprisonment-of-his-sons', rel: 'followed-by' },
    {
      ref: 'event:founding-of-the-safavid-state',
      rel: 'contributed-to',
      cites: [
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '3' } },
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '6' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Weathering the political storms attending the demise of Mongol rule in Iran and the rise and fall of Timur Lang, the Safavid order continued under the leadership of Ṣafi-al-Din’s son Ṣadr-al-Din (d. 1391-92) and Ḵᵛāja ʿAli (d. 1427), Jonayd (d. 1460), and Ḥaydar (q.v.; 1460-88), growing into an elaborate, ambitious movement inhabiting the interstices of the territory ruled by the Āq Qoyunlu and the Qara Qoyunlu.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'The new character of the Ṣafaviya order reflected the preaching and organizing efforts (ḵalifa system) Jonayd spent in his travels through Qarāmān, the Taurus Mountains, and Kastamonu regions heavily populated by Turkmen tribes.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Not long after Yāqūt’s time, in 650/1252, came the birth of the religious leader whose descendants were to raise Ardabīl to new heights of importance—Shaikh Ṣafī-al-dīn Esḥāq—so that the town became the center of Ṣafawīya Sufi order',
          lang: 'en',
          cite: { source: 'iranica-ardabil', loc: { section: 'ARDABĪL', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/ardabil'
          }
        },
        {
          id: 'q4',
          text: 'The Safavids originated as a hereditary lineage of Sufi shaikhs centered on Ardabil, Shafeʿite in school and probably Kurdish in origin.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-shiism-in-iran-since-the-safavids',
            loc: {
              section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
          }
        },
        {
          id: 'q5',
          text: 'Located in northwestern Persia, close to the Caspian Sea, the city of Ardabil lay on important east-west and north-south trade routes traveled by merchants on their way to Anatolia or the Caucasus.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Esmāʿil, barely 15 years of age, inaugurated Safavid political rule in 1501 by proclaiming himself shah in Tabriz, having coins struck in his name and declaring the city his capital.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Esmāʿil’s revolution could not have succeeded without his corps of Turkmen devotees, that is, westward-moving Turks, whom his grandfather, Shaikh Jonayd, had recruited from Ottoman and Ḏu’l-Qadar dominions in Asia Minor and Syria.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
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
            value: { d: '1456' },
            cites: [
              { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '10' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1456, the year that Jonayd probably married Uzun Ḥasan’s sister, Jonayd fought a holy war (ḡazāʾ) with his Turkmen converts against Byzantine in Anatolia, in the area of Trabezond',
        lang: 'en',
        cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '10' } },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/jonayd' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1460-03-12' },
            cites: [
              { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'According to Ḥayāti Tabrizi, Ḥaydar was eight months old at the time of his father Jonayd’s death, which took place on 10 Jomādā I 864/12 March 1460 (Ḥayāti Tabrizi, folios 89b, 74a).',
        lang: 'en',
        cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/haydar-safavi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1478' },
            cites: [
              { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'As it appears from Ḵonji Eṣfahāni’s account, Ḥaydar’s first expedition against Dagestan was overland and took place about five years later in 883/1478',
        lang: 'en',
        cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/haydar-safavi'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Sheikh_Safi_Al-Din_Ardabili%27s_Shrine-Ardabil-Iran_%283%29.jpg/1280px-Sheikh_Safi_Al-Din_Ardabili%27s_Shrine-Ardabil-Iran_%283%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sheikh_Safi_Al-Din_Ardabili%27s_Shrine-Ardabil-Iran_(3).jpg',
    credit: { creator: 'Zahra Multimedia' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
