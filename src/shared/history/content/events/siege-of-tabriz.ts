import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-tabriz',
  names: [
    { text: 'Siege of Tabriz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1908-06-23' },
        cites: [
          {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1909-04' },
        cites: [
          {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tabriz' }
  ],
  partOf: [
    { ref: 'event:persian-constitutional-revolution' },
    { ref: 'period:lesser-autocracy' }
  ],
  participants: [
    {
      ref: 'person:sattar-khan',
      role: 'commander',
      cites: [
        {
          source: 'iranica-pistor-hatam-sattar-khan',
          loc: { section: 'SATTĀR KHAN', para: '4' }
        }
      ]
    },
    {
      ref: 'person:baqer-khan',
      role: 'commander',
      cites: [
        {
          source: 'iranica-amanat-baqer-khan',
          loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '3' }
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
          text: 'The following eleven months of civil war in Tabriz and the siege of the town by government troops can be divided into three stages: The first stage is characterized by street fighting in the city in late June and early July 1908, when the Mojāhedin succeeded in preventing the royalist forces from gaining control over the city. During the second stage, the royalist forces were stationed in the outskirts of the town and attacked it repeatedly, but to no avail. Beginning in early February 1909, the third stage is marked by the siege of Tabriz, which brought hunger, disease and death.',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        },
        {
          id: 'q2',
          text: 'By then, the central venue of the Constitutionalist cause and its resistance against the shah and his government had moved from Tehran to Tabriz. Owing to the courage and stamina of a large part of the population of Tabriz as well as to the determination of some of its leaders, Sattār Khan among them, the Constitution was “salvaged.”',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        },
        {
          id: 'q3',
          text: 'Since Moḥammad-ʿAli Shah did not comply with the British and Russian desire for an armistice in Tabriz, both the British and the Russians agreed to let Russia send troops into Persia to end the siege of Tabriz.',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Furthermore, for some months Tabrīz demonstrated the only effective opposition to Moḥammad-ʿAlī Shah and remained a source of encouragement for the formation of other centers of resistance.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baqer-khan-salar-melli/'
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
            value: { d: '1909-02-04' },
            cites: [
              {
                source: 'iranica-pistor-hatam-sattar-khan',
                loc: { section: 'SATTĀR KHAN', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'From 13 Moḥarram 1327/4 February 1909, the city was completely cut off from its supply routes.',
        lang: 'en',
        cite: {
          source: 'iranica-pistor-hatam-sattar-khan',
          loc: { section: 'SATTĀR KHAN', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1909-03-22' },
            cites: [
              {
                source: 'iranica-amanat-baqer-khan',
                loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'in the major battle of Sārīdāḡ (29 Ṣafar 1327/22 March 1909), one of the highlights of his career, he led the mojāhedīn forces to capture the positions overlooking Tabrīz and tried, though suffering high casualties, to open the supply routes to the starving city.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-baqer-khan',
          loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baqer-khan-salar-melli/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1909-04-29' },
            cites: [
              {
                source: 'iranica-amanat-baqer-khan',
                loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'But the weakening position of the shah made the Russians intervene, and the starvation and shortages gave them the necessary pretext to bring a small contingent into Tabrīz, thus frustrating the short-lived hopes of an imminent victory and forcing Bāqer Khan and Sattār Khan to seek refuge in the Ottoman consulate (8 Rabīʿ II 1327/29 April 1909).',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-baqer-khan',
          loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baqer-khan-salar-melli/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sattar_khan_and_Bagir_khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sattar_khan_and_Bagir_khan.jpg',
    credit: {
      institution: 'Azərbaycan Respublikası Prezidentinin İşlər İdarəsinin Siyasi Sənədlər Arxivi'
    },
    license: { id: 'public-domain' }
  }
})
