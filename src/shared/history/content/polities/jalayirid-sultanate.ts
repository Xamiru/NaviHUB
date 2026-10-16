import { definePolity } from '../../schema'

export default definePolity({
  id: 'jalayirid-sultanate',
  names: [
    { text: 'Jalayirid Sultanate', lang: 'en', role: 'primary' },
    {
      text: 'Jalayerids',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'sultanate',
  start: {
    alts: [
      {
        value: { d: '1336' },
        cites: [
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '10' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Bahaʾ-al-Din Khorramshahi', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1340' },
        cites: [
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '22' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1431' },
        cites: [
          { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '14' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Peter Jackson', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1432' },
        cites: [
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '10' }
          },
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '22' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['mena', 'iran'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:baghdad',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '4' } }
      ]
    },
    {
      ref: 'place:tabriz',
      start: {
        alts: [
          {
            value: { d: '1359' },
            cites: [
              {
                source: 'iranica-jackson-jalayerids',
                loc: { section: 'JALAYERIDS', para: '5' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '5' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 866716 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'JALAYERIDS or ĀL-E JALĀYER (sometimes called the Ilakāni by Persian historians), a dynasty of Mongol origin which ruled over Iraq, and for several decades also over north-western Persia, from the collapse of the Il-khanate in the late 1330s until the early 9th/15th century',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q2',
          text: 'Its history can be divided into four phases: (1) the early years, in which the dynasty was in practice autonomous but theoretically acknowledged the authority of a series of feeble Il-khans; (2) the apogee of the Jalayerids, coinciding with the reign of Šayḵ Ovays (1356-74); (3) an era of incipient decline following his death, marked by internecine conflict; and (4) a final phase, beginning in 1385, in which the Jalayerid territories were subjected to external attack by the Central Asian conqueror Timur (Temür/Tamerlane) and by the rising power of the Qarā Qoyunlu (‘Black Sheep’) Türkmen, at whose hands the dynasty met its end.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Ḥasan’s son by Delšād ḵātun, Šayḵ Ovays (1356-74), was the first of the dynasty to take the title of Sultan.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q4',
          text: 'When Šayḵ Ovays died in Tabriz on 2 Jomādā I 776/9 October 1374 at the age of thirty, the amirs killed his eldest son and heir, Ḥasan, and enthroned another son, Ḥosayn I (1374-82).',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q6',
          text: 'Timur, already angry that the Jalayerid ruler had escaped him, was further infuriated by the spirited resistance of the city during a forty-day siege.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q7',
          text: 'Taken by storm on 27 Ḏuʾl-qaʿda 803/9 July 1401, Baghdad was ruthlessly sacked and its fortifications and most of the public buildings were destroyed.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q8',
          text: 'Unlike the other successor dynasties, the Jalayerids survived Timur’s onslaught, but only to fall victim to the Qarā Qoyunlu.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The Jalayerids were not completely eliminated, however, since minor scions of the family maintained themselves in Ḵuzestān and southern Iraq, where their history is documented by al-Ḡiāṯ',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q10',
          text: 'The Jalayerids gained a reputation as patrons of literary activity and the arts, and under their rule both Baghdad and Tabriz were centers of flourishing schools of miniature painting.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Map_of_the_Jalayirid_Sultanate.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_Jalayirid_Sultanate.jpg',
    credit: { creator: 'Smoothist' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
