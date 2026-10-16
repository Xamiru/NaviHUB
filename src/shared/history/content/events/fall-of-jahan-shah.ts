import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-jahan-shah',
  names: [
    { text: 'Fall of Jahan Shah', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1467' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '4' }
          }
        ]
      },
      {
        value: { d: '1468' },
        cites: [
          {
            source: 'iranica-courts-and-courtiers-v',
            loc: {
              section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
              para: '16'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Monika Gronke', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    },
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'qara-qoyunlu',
      name: 'Qara Qoyunlu',
      polity: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
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
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:jahan-shah',
      role: 'leader',
      side: 'qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    },
    {
      ref: 'person:uzun-hasan',
      role: 'commander',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    },
    {
      name: 'Pīr Būdāq',
      role: 'combatant',
      side: 'qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:jahan-shahs-conquests', rel: 'preceded-by' },
    {
      ref: 'event:uzun-hasans-empire',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        },
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
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
          text: 'In 872/1467 Uzun Ḥasan had defeated and killed the Qara Qoyunlu chief Jahānšāh, and the Qara Qoyunlu empire disintegrated.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Reunited under Uzun Ḥasan’s leadership, the Āq Qoyunlū began to regain strength.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
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
            value: { d: '1467' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'Jahānšāh Qara Qoyunlū, who had meanwhile extended his rule over ʿErāq-e ʿAǰam, Fārs, and Kermān at the expense of the Timurids, at first avoided conflict with the Āq Qoyunlū despite some provocation from their side. Among his preoccupations was the revolt of his son Pīr Būdāq in Baghdad; only when this had been crushed did he set out in 871/1467 for war with Uzun Ḥasan. Obliged by the premature onset of winter to send most of his troops back to their winter quarters, he was routed when Uzun Ḥasan attacked his camp. He and his son Moḥammad lost their lives during the retreat, and two other sons perished a short time later.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Qara_Qoyunlu._Jahan_Shah._AH_837-872_AD_1434-1467_Countermarked_issue._Dated_AH_871_%28AD_1466-7%29.jpg/1280px-Qara_Qoyunlu._Jahan_Shah._AH_837-872_AD_1434-1467_Countermarked_issue._Dated_AH_871_%28AD_1466-7%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Qara_Qoyunlu._Jahan_Shah._AH_837-872_AD_1434-1467_Countermarked_issue._Dated_AH_871_(AD_1466-7).jpg',
    credit: { institution: 'Classical Numismatic Group' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
