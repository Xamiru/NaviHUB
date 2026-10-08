import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-hasan-shirazi',
  names: [
    { text: 'Mirza Hasan Shirazi', lang: 'en', role: 'primary' },
    { text: 'میرزا حسن شیرازی', lang: 'fa', role: 'native' },
    {
      text: 'Ḥājj Mirzā Moḥammad Ḥasan Širāzi',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-floor-tobacco', loc: { section: 'TOBACCO', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-08',
  regions: ['iran', 'mena'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'ḤASAN ŠIRĀZI, MIRZĀ MOḤAMMAD, often referred to as Mirzā-ye Širāzi, leading Shiʿite cleric chiefly renowned for the role he played in the celebrated Tobacco Boycott of 1892',
          lang: 'en',
          cite: { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Born on 15 Jomādā II 1230/25 April 1814 in Shiraz, Mirzā Ḥasan Širāzi lost his father, Sayyed Maḥmud, at an early age, and he grew up in the care of a maternal uncle, Sayyed Ḥosayn Majd-al-Ašrāf, who hired a tutor to teach him calligraphy and the basics of Persian when he was no more than four years old.',
          lang: 'en',
          cite: { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'On the death of Anṣāri in 1281/1864, his foremost pupils gathered in the home of Mirzā Ḥabib-Allāh Rašti and agreed that Mirzā Ḥasan Širāzi was the best qualified among them to succeed Anṣāri both as a teacher in Najaf and as a “source of emulation” (marjaʿ-e taqlid), the dispenser of authoritative guidance to the Shiʿa community at large.',
          lang: 'en',
          cite: { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        },
        {
          id: 'q1',
          text: 'In 1287/1870, Samarra came temporarily to overshadow Naǰaf, when Mīrzā Ḥasan Šīrāzī, soon to become the sole marǰaʿ-e taqlīd of the day, moved there from Naǰaf to escape various pressures to which he was subject (Āḡā Bozorg Tehrānī, Mīrzā-ye Šīrāzī, Tehran, 1362 Š./ 1983, pp. 40-41).',
          lang: 'en',
          cite: { source: 'iranica-algar-atabat', loc: { section: 'ʿATABĀT', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabat'
          }
        },
        {
          id: 'q5',
          text: 'On the death of Sayyed Ḥosayn Kuhkamari in 1290/1873 Širāzi effectively became the sole marjaʿ-e taqlid of all Persian Shiʿites.',
          lang: 'en',
          cite: { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        },
        {
          id: 'q6',
          text: 'Mirzā Ḥasan’s intervention in the matter began with a telegram to Nāṣer-al-Din Shah dated 19 Ḏu’l-Ḥejja 1308/26 July 1891, protesting against both the banishing of Fālasiri and the granting of the tobacco monopoly.',
          lang: 'en',
          cite: { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        },
        {
          id: 'q7',
          text: 'Once Nāṣer-al-Din Shah had decided to yield to the overwhelming popular pressure and cancel the concession, it was, in any event, a new fatwā from Mirzā Ḥasan and a telegram in confirmation sent to Āštiāni on 25 Jomādā II 1309/26 January 1892 that brought the whole episode to a close.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-hasan-sirazi',
            loc: { section: 'ḤASAN ŠIRĀZI', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Taxed by the strains of this episode, and already eighty years old, Mirzā Ḥasan Širāzi died on 24 Šaʿbān 1312/20 February 1895. His body was taken to Najaf for burial',
          lang: 'en',
          cite: {
            source: 'iranica-algar-hasan-sirazi',
            loc: { section: 'ḤASAN ŠIRĀZI', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'The successful agitation against the tobacco monopoly can be regarded as the first instance of mass politics in Persia, and it was no accident that Mirzā Ḥasan, as the supreme if not sole marjaʿ of the day, stood at the center of the episode.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-hasan-sirazi',
            loc: { section: 'ḤASAN ŠIRĀZI', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        },
        {
          id: 'q10',
          text: 'His place in the general historical memory of Persia was secured by the role he played in the tobacco boycott, for it was seen to herald the increasingly frequent intervention by the ulama in the political sphere that was one of the leading features of twentieth century Persian history.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-hasan-sirazi',
            loc: { section: 'ḤASAN ŠIRĀZI', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/hasan-sirazi-mirza-mohammad/'
          }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1814-04-25' },
        cites: [
          { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '2' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1895-02-20' },
        cites: [
          {
            source: 'iranica-algar-hasan-sirazi',
            loc: { section: 'ḤASAN ŠIRĀZI', para: '14' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:shiraz',
    cites: [
      { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '2' } }
    ]
  },
  diedIn: {
    ref: 'place:samarra',
    cites: [
      { source: 'iranica-algar-hasan-sirazi', loc: { section: 'ḤASAN ŠIRĀZI', para: '1' } }
    ]
  }
})
