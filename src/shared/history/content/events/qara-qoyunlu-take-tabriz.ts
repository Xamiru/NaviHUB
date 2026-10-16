import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'qara-qoyunlu-take-tabriz',
  names: [
    { text: 'Qara Qoyunlu capture of Tabriz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1406', notAfter: '1411' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-bosworth-azarbaijan-iv',
          loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    },
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'qara-qoyunlu',
      name: 'Qara Qoyunlu',
      polity: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    },
    {
      key: 'timurids',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:qara-yusuf',
      role: 'leader',
      side: 'qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    },
    {
      name: 'Mīrānšāh',
      role: 'commander',
      side: 'timurids',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    },
    {
      name: 'Abū Bakr',
      role: 'commander',
      side: 'timurids',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:jahan-shahs-conquests', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Aḥmad was defeated in battle and executed by the Qara Qoyunlū leader Qara Yūsof, and Tabrīz now became the capital of the Black Sheep Turkmen; under Jahānšāh b. Qara Yūsof (841-72/1438-67), Tabrīz became the capital of a kingdom stretching from Anatolia to Herat, and was enriched by such splendid buildings as the Blue Mosque.',
          lang: 'en',
          cite: {
            source: 'iranica-bosworth-azarbaijan-iv',
            loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-iv'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Jalayerids seem to have achieved among the population of Azarbaijan a measure of support; there was, for instance, public rejoicing when in 809/1406-07 Aḥmad Jalāyer regained power in Tabrīz, for Azarbaijan had suffered considerably from such events as the invasion through the Caucasus of Tīmūr’s rival, the Golden Horde khan Toqtamiš, in 787/1385 and the unbridled excesses of Tīmūr’s debauched son Mīrānšāh when he was governor in Tabrīz (among other things, he exhumed the corpse of the great vizier of the Il-khanids Rašīd-al-dīn).',
          lang: 'en',
          cite: {
            source: 'iranica-bosworth-azarbaijan-iv',
            loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-iv'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Šāhroḵ’s interventions, together with conflicts among the sons of Qara Yūsof, who had died at the time of the first campaign, weakened the position of the Qara Qoyunlū.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Troops_of_Qara_Yusuf_Qaraqoyunlu_in_battle_in_1407.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Troops_of_Qara_Yusuf_Qaraqoyunlu_in_battle_in_1407.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  }
})
