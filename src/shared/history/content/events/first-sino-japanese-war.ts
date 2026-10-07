import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-sino-japanese-war',
  names: [
    { text: 'First Sino-Japanese War', lang: 'en', role: 'primary' },
    { text: '甲午戰爭', lang: 'zh', role: 'native' },
    { text: '日清戦争', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1894' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Overseas Expansion', para: '1' }
          },
          {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Choson Dynasty', para: '13' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1895-04-17' },
        cites: [
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '16' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:shimonoseki',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Overseas Expansion', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'japan',
      name: 'Japan',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Overseas Expansion', para: '1' }
        }
      ]
    },
    {
      key: 'china',
      name: 'China',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Overseas Expansion', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Li Hongzhang',
      role: 'negotiator',
      side: 'china',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Overseas Expansion', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:russo-japanese-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The revolt of 1894-95, known as the Tonghak Rebellion, had international repercussions.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Choson Dynasty', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-korea/5.htm' }
        },
        {
          id: 'q2',
          text: 'The Korean court apparently felt unable to cope with the rebels and invited China to send troops to quell the rebellion. This move gave Japan a pretext to dispatch troops to Korea.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Choson Dynasty', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-korea/5.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'A crisis was precipitated in 1894 when a leading pro-Japanese Korean political figure was assassinated in Shanghai with Chinese complicity. Prowar elements in Japan called for a punitive expedition, which the cabinet resisted. With assistance from several Japanese nationalistic societies, the illegal Tonghak (Eastern Learning) nationalistic religious movement in Korea staged a rebellion that was crushed by Chinese troops. Japan responded with force and quickly defeated China in the First Sino-Japanese War (1894-95).',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Overseas Expansion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/japan/27.htm' }
        },
        {
          id: 'q5',
          text: 'After nine months of fighting, a cease-fire was called and peace talks were held.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Overseas Expansion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/27.htm' }
        },
        {
          id: 'q6',
          text: 'The Treaty of Shimonoseki accomplished several things: recognition of Korean independence; cessation of Korean tribute to China; a 200 million tael (Chinese ounces of silver, the equivalent in 1895 of US$150 million) indemnity to Korea from China; cession of Taiwan, the Penghu Islands, and the Liaodong Peninsula (the southern part of Manchuria) to Japan; and opening of Chang Jiang (Yangtze River) ports to Japanese trade.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Overseas Expansion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/27.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The two countries soon engaged in the First Sino-Japanese War (1894-95), which accelerated the demise of the Qing Dynasty in China.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Choson Dynasty', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-korea/5.htm' }
        },
        {
          id: 'q8',
          text: 'Having their own imperialist designs on China and fearing China\'s impending disintegration, Russia, Germany, and France jointly objected to Japanese control of Liaodong.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Overseas Expansion', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/27.htm' }
        },
        {
          id: 'q9',
          text: 'Threatened with a tripartite naval maneuver in Korean waters, Japan decided to give back Liaodong in return for a larger indemnity from China.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Overseas Expansion', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/27.htm' }
        },
        {
          id: 'q10',
          text: 'The victorious Japanese established their hegemony over Korea via the Treaty of Shimonoseki (1895) and dictated to the Korean government a wide-ranging series of measures to prevent further domestic disturbances.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Choson Dynasty', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-korea/5.htm' }
        },
        {
          id: 'q11',
          text: 'The Middle Kingdom was henceforth being attacked on its edges: in the North by Russia, which ate away territories in Manchuria and Central Asia; in the South by France, which seized the tributary state of Annam in 1885; and in the East by Japan, which seized Korea in 1895.',
          lang: 'en',
          cite: {
            source: 'ehne-lacroix-unequal-treaties-china',
            loc: { section: 'Unequal Treaties with China', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-legal-regulation-international-relations/unequal-treaties-china'
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
            value: { d: '1894-06-10' },
            cites: [
              { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '17' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Einmarsch chinesischer Truppen in Korea; Beginn der zum chinesisch-japanischen Krieg führenden Verwicklungen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '18' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1894.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1895-04-17' },
            cites: [
              { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '16' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Der Friede von Schimonoseki beendet den neunmonatigen chinesisch-japanischen Krieg um die Vorherrschaft in Korea: China tritt Formosa (heute Taiwan) und die Pescadores-Inseln an Japan ab, zahlt 300 Millionen Yen Kriegsentschädigung und erkennt die Unabhängigkeit Koreas an.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '17' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1895.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1895-05-08' },
            cites: [
              { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '23' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Die Intervention des Deutschen Reiches, Russlands und Frankreichs in Tokio führt zur teilweisen Revision des Friedens von Schimonoseki im Friedensvertrag von Chefoo (heute Yantai in China): Japan gibt die Halbinsel Liaotung zurück und erhält dafür weitere Reparationszahlungen von China.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '24' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1895.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/%E3%80%8C%E5%90%91%E8%99%95%E7%84%A1%E6%95%B5_%E5%B9%B3%E5%A3%8C%E9%99%A5%E8%90%BD%E3%80%8D-There_Stands_No_Enemy_Where_We_Go-_Surrender_of_Pyongyang_from_a_series_on_the_Sino-Japanese_War_%28Mukau_tokoro_tekinashi-_Heij%C5%8D_kanraku%29_MET_DP146887.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%E3%80%8C%E5%90%91%E8%99%95%E7%84%A1%E6%95%B5_%E5%B9%B3%E5%A3%8C%E9%99%A5%E8%90%BD%E3%80%8D-There_Stands_No_Enemy_Where_We_Go-_Surrender_of_Pyongyang_from_a_series_on_the_Sino-Japanese_War_(Mukau_tokoro_tekinashi-_Heij%C5%8D_kanraku)_MET_DP146887.jpg',
    credit: { institution: 'The Metropolitan Museum of Art', creator: 'Toshihide Migita' },
    license: { id: 'cc0' }
  }
})
