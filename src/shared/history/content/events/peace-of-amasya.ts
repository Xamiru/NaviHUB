import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'peace-of-amasya',
  names: [
    { text: 'Peace of Amasya', lang: 'en', role: 'primary' },
    {
      text: 'Treaty of Amasya',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '18' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1555-05-29' },
        cites: [
          {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:amasya',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
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
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tahmasp-i',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      ref: 'person:suleiman-the-magnificent',
      role: 'head-of-state',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      name: 'Šāh-qolī Āqā',
      role: 'negotiator',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      name: 'Kamāl-al-dīn Farroḵzāda Beg',
      role: 'negotiator',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:battle-of-chaldiran',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      ref: 'event:ottoman-safavid-war-1578-1590',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
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
          text: 'The third Ottoman campaign, mounted in 1554-55, ended with the Peace of Amasya, which recognized Ottoman suzerainty over Iraq and eastern Anatolia while leaving Persia in control of Azarbaijan and the southeastern Caucasus.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'After their great defeat by the Ottomans at Čālderān in 920/1514, the Safavids avoided open battle and employed tactics of delay and scorched earth.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Ottomans made drives into Iranian territory, but each time difficulties of supply and guerrilla counterattacks prevented a longer stay.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        },
        {
          id: 'q4',
          text: 'Eventually both sides suffered from exhausted resources and demoralized troops.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        },
        {
          id: 'q5',
          text: 'The peace offer was doubtless welcome to the Ottomans, since they were not able to gain a decisive victory and were also fighting against the Habsburgs at their Western border; it was accepted, and an armistice was agreed upon until the signing of the treaty.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        },
        {
          id: 'q6',
          text: 'The Ottomans also continued to challenge the Safavids for control of Azarbaijan and the Caucasus until the Treaty of Qasr-e Shirin in 1639 established frontiers both in Iraq and in the Caucasus that remain virtually unchanged in the late twentieth century.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The treaty enabled the Ottomans to devote themselves to the western front and internal problems.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        },
        {
          id: 'q10',
          text: 'Iran was able to consolidate its forces and resources, while its western provinces were able to recover from war.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        },
        {
          id: 'q11',
          text: 'The peace was kept by both sides until the death of Shah Ṭahmāsb (984/1576), when the ensuing troubles in Iran encouraged the Ottomans to occupy those regions of the Caucasus claimed by both countries.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        },
        {
          id: 'q12',
          text: 'After the Peace of Amasya and the shift of the imperial residence, the militant nomadism associated with the dawlat-e qezelbāš that had dominated the first forty years of Safavid dynastic rule began to dissipate.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
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
            value: { d: '1554-08-06' },
            cites: [
              {
                source: 'iranica-kohbach-amasya-peace',
                loc: { section: 'AMASYA, PEACE OF', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 7 Ramażān 961 /6 August 1554, the Iranians sent a Turkish captive with a peace offer into the Ottoman camp near Bāyazīd (today: Doğu Beyazıt).',
        lang: 'en',
        cite: {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/amasya-peace'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1555-05-10' },
            cites: [
              {
                source: 'iranica-kohbach-amasya-peace',
                loc: { section: 'AMASYA, PEACE OF', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 18 Jomādā II 962/10 May 1555 the chief doorkeeper (īšīk-āqāsī) Kamāl-al-dīn Farroḵzāda Beg arrived in Amasya, where Solaymān was camped for the winter season.',
        lang: 'en',
        cite: {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/amasya-peace'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1555-05-29' },
            cites: [
              {
                source: 'iranica-kohbach-amasya-peace',
                loc: { section: 'AMASYA, PEACE OF', para: '1' }
              },
              {
                source: 'iranica-mitchell-tahmasp-i',
                loc: { section: 'ṬAHMĀSP I', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The treaty was signed nineteen days later.',
        lang: 'en',
        cite: {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/amasya-peace'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Illustration_from_the_S%C3%BCleymanname%2C_TSM_Haz_1517_f.603a%2C_The_reception_of_the_Safavid_envoy_to_Suleiman_the_Magnificent_during_the_Treaty_of_Amasya.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Illustration_from_the_S%C3%BCleymanname,_TSM_Haz_1517_f.603a,_The_reception_of_the_Safavid_envoy_to_Suleiman_the_Magnificent_during_the_Treaty_of_Amasya.jpg',
    credit: { institution: 'Topkapı Palace Museum' },
    license: { id: 'public-domain' }
  }
})
