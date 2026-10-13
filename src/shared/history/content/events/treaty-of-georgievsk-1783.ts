import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-georgievsk-1783',
  names: [
    { text: 'Treaty of Georgievsk', lang: 'en', role: 'primary' },
    {
      text: 'Treaty of Giorgievsk',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1783' },
        cites: [
          { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          },
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:russian-empire',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } }
      ]
    },
    {
      key: 'georgia',
      name: 'Kartli-Kakheti',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:erekle-ii',
      role: 'signatory',
      side: 'georgia',
      cites: [
        { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } }
      ]
    },
    {
      ref: 'person:catherine-the-great',
      role: 'signatory',
      side: 'russia',
      cites: [
        { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:sack-of-tbilisi-1795',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '11'
          }
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
          text: 'Erekle finally obtained the guarantees he had sought from Russia when he and Catherine II concluded the Treaty of Georgievsk in 1783',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q2',
          text: 'Threatened by the Ottomans and Āḡā Moḥammad Khan, the Georgians asked for Russian protection',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Erekle’s initial attempts at cooperation with Russia also proved disappointing.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q4',
          text: 'In devising a foreign policy, Erekle was guided by the realization that if his country was to survive, it would need a protector.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Erekle died in 1798 convinced that only Russian protection could ensure the continued existence of his country.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q6',
          text: 'But even now Russia failed to live up to its responsibilities.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
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
            value: { d: '1783' },
            cites: [
              {
                source: 'iranica-hitchins-erekle-ii',
                loc: { section: 'EREKLE II', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1783 King Erekli II of the Georgian provinces of Kartli-Kakheti (the Safavid tributary of Gorǰestān), having secured virtual autonomy since 1747, sought to preserve this through an offensive and defensive alliance with Russia concluded at Giorgievsk',
        lang: 'en',
        cite: {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1787', notAfter: '1792' },
            cites: [
              {
                source: 'iranica-hitchins-erekle-ii',
                loc: { section: 'EREKLE II', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'During a new Russo-Turkish War in 1787-92 Russian troops evacuated Kartli-Kakheti, leaving Erekle to face new dangers from Persia alone.',
        lang: 'en',
        cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/erekle-ii'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Treaty_of_Georgievsk_of_1783_%28Esadze%2C_1913%29.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Treaty_of_Georgievsk_of_1783_(Esadze,_1913).JPG',
    credit: { institution: 'Letopis Gruzii (Esadze, 1913)' },
    license: { id: 'public-domain' }
  }
})
