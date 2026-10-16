import { definePolity } from '../../schema'

export default definePolity({
  id: 'muzaffarids',
  names: [
    { text: 'Muzaffarids', lang: 'en', role: 'primary' },
    {
      text: 'Mozaffarids',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '1' } }
      ]
    },
    {
      text: 'Āl-e Moẓaffar',
      lang: 'fa',
      role: 'alternative',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'emirate',
  start: {
    alts: [
      {
        value: { d: '1314' },
        cites: [
          { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '1' } }
        ]
      },
      {
        value: { d: '1313' },
        cites: [
          { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '8' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Bertold Spuler', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1393' },
        cites: [
          { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '1' } },
          { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '15' } },
          {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:shiraz',
      start: {
        alts: [
          {
            value: { d: '1353' },
            cites: [
              {
                source: 'iranica-wing-mozaffarids',
                loc: { section: 'MOZAFFARIDS', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '7' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 6944360 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'MOZAFFARIDS (Āl-e Moẓaffar), family of governors of Yazd under the Il-Khanids, who expanded their domain after the collapse of the Il-Khanid power and established the Mozaffarid dynasty in Yazd, Kerman, Fars, and ʿErāq-e ʿAjam',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '1' } },
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
          id: 'q3',
          text: 'A greater rival than the tribes was the Inju ruler Amir Shaikh Abu Esḥāq b. Maḥmudšāh.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
          }
        },
        {
          id: 'q4',
          text: 'Timur initially allowed the Mozaffarid princes to maintain their local authority, as long as they acknowledged Timur’s supremacy and the right to collect taxes.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
          }
        },
        {
          id: 'q5',
          text: 'Thus, by 793/1391, Shah Manṣur was the most powerful Mozaffarid prince, having repelled the coalition against him and having taken both Shiraz and Isfahan.',
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
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'The history of the Mozaffarids is illustrative of the ways in which Mongol rule in Iran helped to shape the political order, as well as the significant role played by local, non-Chinggisid elites in the years after the collapse of the Il-khanid power.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
          }
        },
        {
          id: 'q9',
          text: 'Mobārez-al-Din Moḥammed and his progeny combined local status, imperial recognition and favor, Sunni religious ideology, and control of provincial and tribal military resources in an expansive, if internally turbulent, commonwealth in the years before the Timurid period.',
          lang: 'en',
          cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/mozaffarids'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Battle_between_Muzaffarid_Shah_Shuja_and_his_brother_Mahmud._Khvandamir%2C_%E1%B8%A4ab%C4%ABbu%CA%BEs-Siyar%2C_1592._Istanbul%2C_S%C3%BCleymaniye_K%C3%BCt%C3%BCphanesi%2C_Hekimo%C4%9Flu_Ali_Pa%C5%9Fa%2C_738%2C_fol._155r.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_between_Muzaffarid_Shah_Shuja_and_his_brother_Mahmud._Khvandamir,_%E1%B8%A4ab%C4%ABbu%CA%BEs-Siyar,_1592._Istanbul,_S%C3%BCleymaniye_K%C3%BCt%C3%BCphanesi,_Hekimo%C4%9Flu_Ali_Pa%C5%9Fa,_738,_fol._155r.jpg',
    credit: { institution: 'Süleymaniye Library' },
    license: { id: 'public-domain' }
  }
})
