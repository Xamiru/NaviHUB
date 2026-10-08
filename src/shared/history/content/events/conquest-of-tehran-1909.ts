import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'conquest-of-tehran-1909',
  names: [
    { text: 'Conquest of Tehran (1909)', lang: 'en', role: 'primary' },
    { text: 'فتح تهران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1909-07' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1909-07-16' },
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
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'event:persian-constitutional-revolution' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mohammad-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
        }
      ]
    },
    {
      name: 'Sardār Asʿad',
      role: 'commander',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1909' }
        }
      ]
    },
    {
      name: 'Sepahdār-e Tonokāboni',
      role: 'leader',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1909' }
        }
      ]
    },
    {
      name: 'Yephram Khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1909' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Constitutionalist forces from Tabriz, Rasht, and Isfahan lay siege to Tehran, resulting in the abdication of Moḥammed-ʿAli Shah. The Constitutionalists name the eleven-year old Crown Prince Aḥmad Mirzā to the throne, with ʿAli-Reżā Khan Ażod-al-Molk, chief of the Qajar tribe, as viceregent.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q1',
          text: 'Isfahan is occupied by Najafqoli Khan Baḵtiāri’s forces in support of the Constitution; Sardār Asʿad leads the Baḵtiāri forces’ advance on Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'In Rasht, supporters of the Constitution led by the Armenian Yephram Khan, Moʿezz-al-Solṭān, and ʿAli-Moḥammad Khan Tarbiat, call on Sepahdār-e Tonokāboni to assume their leadership in their move on Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q4',
          text: 'In view of the unhappy record of the Qajar rulers, opinion at the time favored the deposition of the Qajars and the installation of a new dynasty.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Execution of Shaikh Fażl-Allāh Nuri (b. 1843), a leading theologian and political activist who initiated the Islamic fundamentalist movement in Iran, by the conquerers of Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Mohammad_Ali_Shah_Qajar.png/1280px-Mohammad_Ali_Shah_Qajar.png',
    page: 'https://commons.wikimedia.org/wiki/File:Mohammad_Ali_Shah_Qajar.png',
    title: 'Shah of Persia, Mohammed Ali Mirzi, Dec. 19, 1907',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'kasravi-1939-tarikh-e-hejdah-saleh-ye-azarbayjan', perspective: 'iranian' },
    { source: 'malekzadeh-1949-tarikh-e-enqelab-e-mashrutiyat', perspective: 'iranian' }
  ]
})
