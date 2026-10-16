import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sack-of-damascus-and-aleppo',
  names: [
    { text: 'Sack of Damascus and Aleppo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1400' },
        cites: [
          { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } }
        ]
      },
      {
        value: { d: '1401' },
        cites: [
          { source: 'britannica-1911-aleppo', loc: { section: 'ALEPPO', para: '6' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1401' },
        cites: [
          {
            source: 'iranica-woods-ebn-arabshah',
            loc: { section: 'EBN ʿARABŠĀH, ŠEHĀB-AL-DĪN ABU’L-ʿABBĀS AḤMAD', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John E. Woods', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1399' },
        cites: [
          { source: 'britannica-1911-damascus', loc: { section: 'DAMASCUS', para: '15' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:damascus',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    },
    {
      ref: 'place:aleppo',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    },
    {
      ref: 'polity:mamluk-sultanate',
      cites: [
        {
          source: 'iranica-iraq-ii-iii-mongols-to-safavids',
          loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '29' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      cites: [
        { source: 'iranica-ajaeb-al-maqdur', loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '2' } }
      ]
    },
    {
      name: 'Sultan Faraj',
      role: 'leader',
      cites: [
        {
          source: 'iranica-iraq-ii-iii-mongols-to-safavids',
          loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '31' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:sack-of-delhi', rel: 'preceded-by' },
    { ref: 'event:battle-of-ankara', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the course of his seven-year wars he also captured Aleppo and sacked Damascus.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q2',
          text: 'Then he plundered Damascus and ravaged Syria; the chapter on the capture of Aleppo and the discussion between Tīmūr and the lawyers about legal matters Ebn ʿArabšāh based on the chronicle of Ebn Šeḥna',
          lang: 'en',
          cite: {
            source: 'iranica-ajaeb-al-maqdur',
            loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/ajaeb-al-maqdur'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Disorders in northern Syria following the deaths of Qāżī Borhān-al-dīn and the Mamluk sultan Barqūq (r. 784-801/1382-99) gave occasion for conflict between the expanding Ottoman power and the westward-moving conqueror Tīmūr.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q4',
          text: 'Solṭān-Aḥmad took refuge in Egypt with the Mamluk ruler al-Malek-al-Ẓāher Barquq, who welcomed him warmly and sent him with an army to Aleppo.',
          lang: 'en',
          cite: {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iraq-iii-mongols-to-safavids/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'According to the autobiography quoted by Ebn Taḡrīberdī, when Tīmūr conquered Damascus in 803/1401, Ebn ʿArabšāh and his family were transported to Tīmūr’s capital, Samarkand.',
          lang: 'en',
          cite: {
            source: 'iranica-woods-ebn-arabshah',
            loc: { section: 'EBN ʿARABŠĀH, ŠEHĀB-AL-DĪN ABU’L-ʿABBĀS AḤMAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/ebn-arabsah'
          }
        },
        {
          id: 'q8',
          text: 'Craftsmen deported from all the conquered countries contributed to the new buildings, and some villages in the vicinity are still named after their places of origin (Širāz, Demašq).',
          lang: 'en',
          cite: {
            source: 'iranica-grenet-samarqand-i',
            loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/samarqand-i'
          }
        },
        {
          id: 'q9',
          text: 'The fleeing Solṭān-Aḥmad reached Aleppo, where he was seized and imprisoned by Sultan Faraj, son and successor of the Mamluk ruler al-Malek-al-Ẓāher Barquq, who feared Timur’s vengence.',
          lang: 'en',
          cite: {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iraq-iii-mongols-to-safavids/'
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
            value: { d: '1401' },
            cites: [
              { source: 'britannica-1911-aleppo', loc: { section: 'ALEPPO', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Thereafter the Mamelukes took and kept possession, despite the renewed Tatar inroad of 1401, until the final conquest by the Ottomans in 1517.',
        lang: 'en',
        cite: { source: 'britannica-1911-aleppo', loc: { section: 'ALEPPO', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Aleppo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1401' },
            cites: [
              {
                source: 'iranica-woods-ebn-arabshah',
                loc: { section: 'EBN ʿARABŠĀH, ŠEHĀB-AL-DĪN ABU’L-ʿABBĀS AḤMAD', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'John E. Woods', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1399' },
            cites: [
              { source: 'britannica-1911-damascus', loc: { section: 'DAMASCUS', para: '15' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Of its later history we need only mention the Mongolian capture in 1260; its Egyptian recapture by the Mameluke Kotuz; the ferocious raid of Timur (Tamerlane) in 1399; and the conquest by the Turkish sultan Selim, whereby it became a city of the Ottoman empire (1516).',
        lang: 'en',
        cite: { source: 'britannica-1911-damascus', loc: { section: 'DAMASCUS', para: '15' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Damascus'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Timur_Attacks_Aleppo%2C_Zafarnama_of_Ibrahim_Sultan%2C_Timurid_Shiraz%2C_1436.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Timur_Attacks_Aleppo,_Zafarnama_of_Ibrahim_Sultan,_Timurid_Shiraz,_1436.jpg',
    credit: { creator: '1435–36 artist' },
    license: { id: 'public-domain' }
  }
})
