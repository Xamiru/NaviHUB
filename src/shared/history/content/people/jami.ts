import { definePerson } from '../../schema'

export default definePerson({
  id: 'jami',
  names: [
    { text: 'Jami', lang: 'en', role: 'primary' },
    { text: 'عبدالرحمن جامی', lang: 'fa', role: 'native', translit: 'ʿAbd-al-Raḥmān Jāmi' },
    {
      text: 'Nur-al-Din ʿAbd-al-Raḥmān Jāmi',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-jami-headword', loc: { section: 'JĀMI', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1414-11-07' },
        cites: [
          { source: 'iranica-jami-headword', loc: { section: 'JĀMI', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1492-11-09' },
        cites: [
          { source: 'iranica-jami-headword', loc: { section: 'JĀMI', para: '1' } },
          {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '7' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:herat',
    cites: [
      { source: 'iranica-jami-headword', loc: { section: 'JĀMI', para: '1' } }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['writer', 'scholar', 'cleric'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Haft_Aurang_%28Seven_Thrones%29_of_Jami_MET_44289.jpg/1280px-Haft_Aurang_%28Seven_Thrones%29_of_Jami_MET_44289.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Haft_Aurang_(Seven_Thrones)_of_Jami_MET_44289.jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Jāmī' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Jāmi’s active career as a writer extended over almost fifty years, and he wrote a prolific amount of poetry and prose in both Persian and Arabic.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q2',
          text: 'In sum, whether by design or not, with his affiliations and enthusiasms, his original works and his commentaries, Jāmi represented a summation of the learned and spiritual traditions of the Persian-speaking world, especially Khorasan, on the eve of the transformations wrought by the Safavid conquest.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-ii'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Jāmi would take his penname from the nearby village of Jām (lying about midway between Mashad and Herat), where he spent his childhood.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q4',
          text: 'When Jāmi entered his teens, he and his father moved to Herat where he pursued further education in theology, Arabic grammar, and literature.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Jāmi does seem to have gone through a spiritual crisis sometime in his thirties, and he did, in fact, return to Herat, give up his scholarly career, and embark upon the Sufi path under Saʿd-al-Din’s direction.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q6',
          text: 'When Sultan Ḥosayn Bāyqarā seized power in Herat in 1470, Jāmi was a respected teacher and spiritual leader in the city and had already established close ties with Sultan Ḥoseyn’s powerful advisor and vizier, ʿAlišir Navāʾi.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q7',
          text: 'For the last fifteen years of Jāmi’s life, he, Sultan Ḥosayn, and ʿAlišir constituted a religious, military, and administrative ‘triumvirate’ governing Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q8',
          text: 'Despite his status, wealth, and influence, Jāmi lived simply and unostentatiously in the district of Ḵiyābān-e Herāt, just outside of the city.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q9',
          text: 'Jāmi joined to his Naqšbandi affiliations an enthusiastic, even combative devotion to the teachings and textual legacy of Ebn al-ʿArabi.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-ii'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q10',
          text: 'Jāmi’s seven long maṯnawis are known collectively as Haft owrang (awrang) (‘The Seven Thrones’ or ‘The Constellation of the Great Bear’).',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q11',
          text: 'One of the earliest and most famous of such works is the Lawāyeḥ (The Flashes), composed in 1465-66 and dedicated to the Qarā Qoyunlu ruler Jahānšāh.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q12',
          text: 'The nearly 39,000 lines of verse that make up Jāmi’s poetic oeuvre already make him one of the most prolific poets in the classical tradition.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q13',
          text: 'Jāmi died after a brief illness on November 9, 1492.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q14',
          text: 'Jāmi’s vast neo-classical project was met with nearly universal acclaim during his lifetime.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        }
      ]
    }
  ]
})
