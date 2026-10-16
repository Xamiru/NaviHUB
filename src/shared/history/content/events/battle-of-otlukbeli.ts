import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-otlukbeli',
  names: [
    { text: 'Battle of Otlukbeli', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Baškent',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-firearms-i-history',
          loc: { section: 'FIREARMS i. HISTORY', para: '6' }
        },
        {
          source: 'iranica-casari-italy-ii-diplomatic-and-commercial-relations',
          loc: { section: 'Italy ii. DIPLOMATIC AND COMMERCIAL RELATIONS', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1473-08' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          },
          {
            source: 'iranica-casari-italy-ii-diplomatic-and-commercial-relations',
            loc: { section: 'Italy ii. DIPLOMATIC AND COMMERCIAL RELATIONS', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:otlukbeli',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
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
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    },
    {
      key: 'ottomans',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:uzun-hasan',
      role: 'commander',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    },
    {
      ref: 'person:mehmed-ii',
      role: 'commander',
      side: 'ottomans',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:uzun-hasans-empire', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Uzun Ḥasan’s forces had been routed in 878/1473 near Terǰān in eastern Anatolia, when their firearms had been no match for Meḥemmed Fāteḥ’s handguns and cannon, with their cavalry decimated by the Ottoman superior firepower; but the Āq Qoyunlū speedily learnt to use them more effectively.',
          lang: 'en',
          cite: {
            source: 'iranica-bosworth-army-ii',
            loc: { section: 'ARMY ii. Islamic, to the Mongol period', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/army-ii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In Qaramān, Ottoman and Mamluk interests clashed with those of Uzun Ḥasan.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q3',
          text: 'The principality blocked the way to the Mediterranean and Cyprus, then virtually a protectorate of the Venetians, allies of the Āq Qoyunlū against the Ottomans since 868-69/1464.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Uzun Ḥasan made no further attempt to extend his sway westward beyond the Euphrates.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q5',
          text: 'Uzun Ḥasan’s hesitations and rare success at war, in particular his total defeat at the battle of Baškent in August 1473, limited the results, and by the end of his reign, disillusionment had set in and he was out of the international arena.',
          lang: 'en',
          cite: {
            source: 'iranica-casari-italy-ii-diplomatic-and-commercial-relations',
            loc: { section: 'Italy ii. DIPLOMATIC AND COMMERCIAL RELATIONS', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/italy-ii-diplomatic-and-commercial-relations-2'
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
            value: { d: '1472' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Expecting Venetian support, the Āq Qoyunlū invaded the Ottoman dominions in the late summer of 877/1472; they ravaged Ṭoqat and thrust past Sīvās and Kayseri into Qaramān but were pushed back by Ottoman troops.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1473-08' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '13' }
              },
              {
                source: 'iranica-casari-italy-ii-diplomatic-and-commercial-relations',
                loc: { section: 'Italy ii. DIPLOMATIC AND COMMERCIAL RELATIONS', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Uzun Ḥasan was soundly defeated in a pitched battle near the village of Baškent (Başköy) on the Otluqbeli, where Sultan Mehmed the Conqueror was able to bring artillery and muskets into action with decisive effect',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Otlukbeli_savasi.png/1280px-Otlukbeli_savasi.png',
    page: 'https://commons.wikimedia.org/wiki/File:Otlukbeli_savasi.png',
    credit: { institution: 'Musée Jacquemart-André' },
    license: { id: 'public-domain' }
  }
})
