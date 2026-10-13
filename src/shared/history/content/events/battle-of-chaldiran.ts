import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-chaldiran',
  names: [
    { text: 'Battle of Chaldiran', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Čālderān',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } },
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '10' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1514-08-23' },
        cites: [
          { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } },
          { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } },
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1061' } },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:chaldiran',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    },
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:selim-i',
      role: 'commander',
      side: 'ottoman',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    },
    {
      ref: 'person:ismail-i',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    },
    {
      name: 'Moḥammad Khan Ostājlū',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '10' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'safavid',
      value: {
        alts: [
          {
            value: { min: 40000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-mccaffrey-calderan',
                loc: { section: 'ČĀLDERĀN', para: '10' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'ottoman',
      value: {
        alts: [
          {
            value: { min: 140000, qualifier: 'about' },
            cites: [
              { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } }
            ]
          }
        ]
      }
    },
    {
      key: 'executed',
      side: 'safavid',
      value: {
        alts: [
          {
            value: { min: 40000, qualifier: 'over' },
            cites: [
              { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '8' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:peace-of-amasya',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-kohbach-amasya-peace',
          loc: { section: 'AMASYA, PEACE OF', para: '1' }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-safavid-state',
      rel: 'caused-by',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '2' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The next remarkable event in Ismaʽil’s reign is his war with Sultan Selim I.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1061' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q2',
          text: 'In fine, at or near Khoi, the frontier-town of Azerbaijan, the battle (1514) was fought between the two rival monarchs, ending in the defeat of the Persians and the triumphant entry of Selim into their capital.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1061' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q3',
          text: 'It was, in fact, the direct and inevitable result of the establishment of the Safavid state.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The contemporary chroniclers tended to cite certain individual acts of provocation on the part of Esmāʿīl as the cause of the Čālderān campaign.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q5',
          text: 'The self-declared defenders of Sunni Islam could not but feel threatened by the establishment of a militant Shiʿite state on their border, and by Safavid propaganda among the Turkmens of central and eastern Anatolia, many of whom had long supported the Safavid cause.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q7',
          text: 'Relations between the two powers were aggravated by the arrogant, seemingly hostile attitude of Esmāʿīl.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q8',
          text: 'Before the start of the campaign Salīm ordered the execution of upwards of 40,000 Anatolian Qezelbāš as punishment for their rebellious behavior.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q9',
          text: 'When the Ottomans arrived the Safavid army, numbering about 40,000 troops, was waiting in place.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q10',
          text: 'After some initial success against the Ottoman left wing, Esmāʿīl decided to renew his attack on the center and in so doing played right into the hands of the Ottomans.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q11',
          text: 'The Janissary units were stationed in the center behind a barricade of gun-carriages.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q12',
          text: 'When Esmāʿīl realized the extent of defeat he broke off the engagement and fled with some 300 of his followers.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'Following Čālderān, the Ottomans briefly occupied Tabriz.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q18',
          text: 'The most dramatic outcome of the defeat at Čālderān was, however, the doubt it cast on the invincibility and thus the divine aura of the Safavid ruler.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '11' }
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
            value: { d: '1514-03-20' },
            cites: [
              { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Having secured the necessary fatwās sanctioning the war Salīm launched the campaign on 23 Moḥarram/20 March.',
        lang: 'en',
        cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/calderan-battle'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1514-07-01' },
            cites: [
              { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The Ottomans reached Sīvās on 8 Jomādā I/1 July.',
        lang: 'en',
        cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/calderan-battle'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1514-08-23' },
            cites: [
              { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } },
              { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On I Rajab/22 August Salīm reached Čālderān, and the battle took place on the following day.',
        lang: 'en',
        cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '9' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/calderan-battle'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1514-09-07' },
            cites: [
              {
                source: 'iranica-mccaffrey-calderan',
                loc: { section: 'ČĀLDERĀN', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Salīm was thus able to march unopposed into Tabrīz, which he occupied on 17 Rajab/7 September.',
        lang: 'en',
        cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/calderan-battle'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/The_Battle_of_Chaldiran%2C_16th-17th_century_possibly_1580%2C_Palazzo_Mirto%2C_Palermo%2C_Italy.jpg/1280px-The_Battle_of_Chaldiran%2C_16th-17th_century_possibly_1580%2C_Palazzo_Mirto%2C_Palermo%2C_Italy.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Battle_of_Chaldiran,_16th-17th_century_possibly_1580,_Palazzo_Mirto,_Palermo,_Italy.jpg',
    credit: { institution: 'Palazzo Mirto, Palermo' },
    license: { id: 'public-domain' }
  }
})
