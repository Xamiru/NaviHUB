import { definePolity } from '../../schema'

export default definePolity({
  id: 'aq-qoyunlu',
  names: [
    { text: 'Aq Qoyunlu', lang: 'en', role: 'primary' },
    {
      text: 'Āq Qoyunlū',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '1' }
        }
      ]
    },
    {
      text: 'White Sheep',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'confederation',
  start: {
    alts: [
      {
        value: { d: '1402' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1501', notAfter: '1503' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          },
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:tabriz',
      start: {
        alts: [
          {
            value: { d: '1468' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '12' }
              },
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '11' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 555994 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Qara ʿOṯmān was the real founder of the Āq Qoyunlū state.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q2',
          text: 'The Āq Qoyunlū empire reached its zenith under Uzun Ḥasan.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'With no leaders remaining, the Qara Qoyunlū confederation ceased to be politically operative, and Uzun Ḥasan was able to take over Azarbaijan in the summer of 873/1468.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q4',
          text: 'With his last rival for hegemony over western Iran eliminated, Uzun Ḥasan immediately annexed the Iranian provinces up to the borders of Khorasan and moved his government from Āmed to Tabrīz, the traditional seat of authority that had been the capital of not only the Qara Qoyunlū and the Jalayerids but also the Il-khans.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q5',
          text: 'None of the tribal factions could secure more than provincial recognition of its favored throne-claimant, with the result that three sultans reigned concurrently: Alvand b. Yūsof b. Uzun Ḥasan in the west, Uzun Ḥasan’s nephew Qāsem b. Jahāngīr in an enclave in Dīār Bakr, and Alvand’s brother Moḥammadī in Fārs and ʿErāq-e ʿAǰam (until his violent death in the summer of 905/1500, when he was followed by Morād b. Yaʿqūb).',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The collapse of Āq Qoyunlū rule in Iran began in the autumn of 907/1501 with their defeat by Esmāʿīl Ṣafawī, who had left Lāhīǰān two years earlier and used his charisma to rally a large following of Turkman warriors.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q7',
          text: 'The last Āq Qoyunlū sultan, Morād, who hoped to regain the throne with the help of Ottoman troops, was defeated and killed at his last stronghold, Rohā, by Esmāʿīl’s Qizilbāš fighters.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Hunting_Sultan_Uzun_Hasa_diptych%2C_1467-1473%2C_Aq_Qoyunlu.jpg/1280px-Hunting_Sultan_Uzun_Hasa_diptych%2C_1467-1473%2C_Aq_Qoyunlu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hunting_Sultan_Uzun_Hasa_diptych,_1467-1473,_Aq_Qoyunlu.jpg',
    credit: { creator: '1460s–1470s artist' },
    license: { id: 'public-domain' }
  }
})
