import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-haydar-and-the-imprisonment-of-his-sons',
  names: [
    { text: 'Death of Haydar and the imprisonment of his sons', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'other',
  start: {
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
  end: {
    alts: [
      {
        value: { d: '1492' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '21' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1493-08' },
        cites: [
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tabasaran',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '1' } }
      ]
    },
    {
      ref: 'place:ardabil',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    },
    {
      ref: 'polity:shirvan',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '5' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid-order',
      name: 'Safavid order',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    },
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    },
    {
      key: 'shirvan',
      name: 'Shirvanshah',
      polity: 'polity:shirvan',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:haydar-safavi',
      role: 'leader',
      side: 'safavid-order',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    },
    {
      ref: 'person:sultan-yaqub-aq-qoyunlu',
      role: 'commander',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    },
    {
      name: 'Sultan ʿAlī',
      role: 'victim',
      side: 'safavid-order',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
        }
      ]
    },
    {
      name: 'Ebrāhīm',
      role: 'victim',
      side: 'safavid-order',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
        }
      ]
    },
    {
      name: 'Esmāʿīl',
      role: 'victim',
      side: 'safavid-order',
      cites: [
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:safavid-order-under-junayd-and-haydar', rel: 'preceded-by' },
    { ref: 'event:aq-qoyunlu-civil-wars', rel: 'related' },
    {
      ref: 'event:founding-of-the-safavid-state',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '22' }
        },
        {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '7' }
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
          text: 'For the second time in little more than a quarter of a century, the Safavid movement lost its leader, but did not fade into oblivion.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'As spiritual leader of the Ṣafaviya ṭariqa, Ḥaydar entered into alliances with a number of local grandees and military chiefs of Tāleš, Šervān, and southern Dagestan.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        },
        {
          id: 'q3',
          text: 'Ḥaydar’s political aspirations meant that the Safavid-Aq Qoyunlu alliance was eventually doomed to break down, because the whole political situation in Persia was changing.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Esmāʿīl reached sanctuary in Gīlān at the court of the local ruler Kār Kīā Mīrzā.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The political and military alliances forged under Ḥaydar were to play a crucial role in Shah Esmāʿil’s rise to the throne as the founder of the Safavid dynasty in Azarbaijan in the opening years of the 16th century.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
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
            value: { d: '1488' },
            cites: [
              { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'At the end of the third and last of his campaigns against southern Dagestan in 893/1488, Ḥaydar and his troops were cornered outside Bayqird Castle in Tābasarān, and he was killed in the battle that ensued.',
        lang: 'en',
        cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } },
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
            value: { d: '1491' },
            cites: [
              {
                source: 'iranica-savory-esmail-i-safawi-biography',
                loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Of the three sons of Ḥaydar, the eldest, Sultan ʿAlī, succeeded him as head of the Safavid Order, but ʿAlī and his two brothers, Ebrāhīm and the youthful Esmāʿīl, were arrested with their mother in Ardabīl, and imprisoned in the Eṣṭaḵr fortress in Fārs',
        lang: 'en',
        cite: {
          source: 'iranica-savory-esmail-i-safawi-biography',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Sheikh_Safi_Al-Din_Ardabili%27s_Shrine-Ardabil-Iran_%284%29.jpg/1280px-Sheikh_Safi_Al-Din_Ardabili%27s_Shrine-Ardabil-Iran_%284%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sheikh_Safi_Al-Din_Ardabili%27s_Shrine-Ardabil-Iran_(4).jpg',
    credit: { creator: 'Zahra Multimedia' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
