import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'five-years-campaign',
  names: [
    { text: 'Timur’s five-year war', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1392' },
        cites: [
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1396' },
        cites: [
          {
            source: 'iranica-grenet-samarqand-i',
            loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } }
      ]
    },
    {
      ref: 'place:baghdad',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } }
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
      ref: 'polity:muzaffarids',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } }
      ]
    },
    {
      ref: 'polity:jalayirid-sultanate',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } }
      ]
    },
    {
      ref: 'polity:golden-horde',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } }
      ]
    }
  ],
  sides: [
    {
      key: 'timurid',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    },
    {
      key: 'muzaffarids',
      name: 'Muzaffarids',
      polity: 'polity:muzaffarids',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } }
      ]
    },
    {
      key: 'jalayirids',
      name: 'Jalayerids',
      polity: 'polity:jalayirid-sultanate',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      side: 'timurid',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    },
    {
      name: 'Solṭān Aḥmad',
      role: 'leader',
      side: 'jalayirids',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } }
      ]
    },
    {
      name: 'Shah Manṣur',
      role: 'leader',
      side: 'muzaffarids',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } }
      ]
    }
  ],
  related: [
    { ref: 'event:timurs-conquest-of-iran', rel: 'preceded-by' },
    { ref: 'event:sack-of-delhi', rel: 'followed-by' },
    { ref: 'event:timur-toqtamish-war', rel: 'related' },
    { ref: 'event:timurs-invasions-of-georgia', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After conquering Chorasmia and subduing the ruler of the Qebčaq plains, he embarked on a series of expansionist wars that included a three-year war beginning in 1386 and a five-year war beginning in 1392 and a seven-year war beginning in 1399.',
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
          text: 'The outcome was that he conquered Khorasan, Māzandarān and Astarābād, Azarbaijan, Georgia, Shirvan, and Armenia.',
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
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The civil war between the princes, however, represented seditious movements against the command of Timur, who had entrusted Fars, Kerman, and ʿErāq-e ʿAjam to the Mozaffarids during his first Iranian campaign.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'When Timur returned to Iran in 795/1393, Shah Manṣur fled Shiraz with his army once the news reached him that Timur’s forces had already captured the fortress of Qalʿa-ye Safid on their way to Shiraz.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
          }
        },
        {
          id: 'q7',
          text: 'Solṭān-Aḥmad’s rule in Baghdad ended with the westward thrust of Timur and his capture of Baghdad in 1393.',
          lang: 'en',
          cite: {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iraq-iii-mongols-to-safavids/'
          }
        },
        {
          id: 'q8',
          text: 'Hearing that Timur was engaged in a long campaign on the Qipchaq (Qepčāq) steppe and in southern Russia, the Jalayerid re-entered Baghdad in 1394 and forced Ḵᵛāja Masʿud to leave the city.',
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
        },
        {
          id: 'q9',
          text: 'It was not until 1395 that the power of Toktamish was finally broken',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'In consequence of Solṭān-Aḥmad’s bloodthirstiness and of Timur’s massacre, pillage, and vandalism, Baghdad suffered a devastating blow unprecedented in its history.',
          lang: 'en',
          cite: {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iraq-iii-mongols-to-safavids/'
          }
        },
        {
          id: 'q11',
          text: 'Although the other Mozaffarid princes rushed to Timur’s court to show their obedience, he turned the government of the Mozaffarid provinces over to more trustworthy individuals.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
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
            value: { d: '1393' },
            cites: [
              {
                source: 'iranica-jackson-jalayerids',
                loc: { section: 'JALAYERIDS', para: '12' }
              },
              {
                source: 'iranica-iraq-ii-iii-mongols-to-safavids',
                loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1393 Timur renewed the struggle with the Jalayerids, occupying Baghdad without a fight when Solṭān Aḥmad fled to Mamluk Syria.',
        lang: 'en',
        cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/jalayerids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1393-05-23' },
            cites: [
              {
                source: 'iranica-wing-mozaffarids',
                loc: { section: 'MOZAFFARIDS', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 11 Rajab 795/23 May 1393 the entire Mozaffarid house was executed, with the exception of Zayn-al-ʿĀbedin and his brother, Sultan Šebli, who had been blinded by Shah Šojāʿ; they were both sent to Timur’s capital at Samarqand',
        lang: 'en',
        cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/mozaffarids'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Empire_of_Timur_and_his_Campaigns.png/1280px-Empire_of_Timur_and_his_Campaigns.png',
    page: 'https://commons.wikimedia.org/wiki/File:Empire_of_Timur_and_his_Campaigns.png',
    credit: { creator: 'HetmanTheResearcher' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
