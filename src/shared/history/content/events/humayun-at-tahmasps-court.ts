import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'humayun-at-tahmasps-court',
  names: [
    { text: 'Humayun at the court of Tahmasp I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1544' },
        cites: [
          {
            source: 'iranica-thackston-homayun-padesah',
            loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:kandahar',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    },
    {
      ref: 'polity:mughal-empire',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tahmasp-i',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    },
    {
      name: 'Homāyun',
      role: 'participant',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    },
    {
      name: 'Budāḡ Khan Qajar',
      role: 'commander',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:recovery-of-qandahar-1648',
      rel: 'related',
      cites: [
        {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
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
          text: 'In 1544 Homāyun went to Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-thackston-homayun-padesah',
            loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/homayun-padesah'
          }
        },
        {
          id: 'q2',
          text: 'Feted in Herat by the Safavid governor by royal decree, he journeyed through Mašhad, Nišāpur, Sabzavār, and Qazvin, and he met Shah Ṭahmāsp at Solṭāniya.',
          lang: 'en',
          cite: {
            source: 'iranica-thackston-homayun-padesah',
            loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/homayun-padesah'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'As a result, the emperor in exile had to force his way to Safavid Iran, while the prince, Akbar, fell into the custody of ʿAskari in Kandahar',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
          }
        },
        {
          id: 'q4',
          text: 'In fact, the Uzbek leader was defeated and killed by Shah Esmāʿīl Ṣafawī in 916/1510, and this opened the way for Bābor’s last bid for a throne in Samarqand.',
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
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'After parting with a valuable diamond and apparently compelled to acknowledge Shiʿism, Homāyun was re-equipped and given a division of ten thousand soldiers',
          lang: 'en',
          cite: {
            source: 'iranica-thackston-homayun-padesah',
            loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/homayun-padesah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The prince died almost immediately, and Kandahar became a bone of contention between the Safavids and the Mughals for many decades, the Safavids claiming that the territory had been given to them in perpetuity and the Mughals claiming that the apanage had reverted to them upon the death of the prince.',
          lang: 'en',
          cite: {
            source: 'iranica-thackston-homayun-padesah',
            loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/homayun-padesah'
          }
        },
        {
          id: 'q8',
          text: 'After regaining control of Kabul in 1545, Homāyun welcomed to his court artists and learned men from Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-thackston-homayun-padesah',
            loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/homayun-padesah'
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
            value: { d: '1545-09-03' },
            cites: [
              {
                source: 'iranica-thackston-homayun-padesah',
                loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Kandahar was retaken from Mirzā ʿAskari on 25 Jomādā II, 952/3 September 1545 and was ceded to the young Safavid prince as an apanage.',
        lang: 'en',
        cite: {
          source: 'iranica-thackston-homayun-padesah',
          loc: { section: 'HOMĀYUN PĀDEŠĀH', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/homayun-padesah'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Tahmasp%2C_Humayun_Meeting.jpg/1280px-Tahmasp%2C_Humayun_Meeting.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tahmasp,_Humayun_Meeting.jpg',
    credit: { creator: 'Unknown original painter' },
    license: { id: 'public-domain' }
  }
})
