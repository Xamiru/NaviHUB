import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-mehmandust',
  names: [
    { text: 'Battle of Mehmandust', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Mehmāndust',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '6' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1729-09-29' },
        cites: [
          {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '4' }
          },
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '6' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:mehmandust',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Ṭahmāsp’s army',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '3' } }
      ]
    },
    {
      key: 'afghan',
      name: 'Afghans',
      polity: 'polity:hotaki-dynasty',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } }
      ]
    },
    {
      ref: 'person:ashraf-hotaki',
      role: 'leader',
      side: 'afghan',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } }
      ]
    },
    {
      ref: 'person:tahmasp-ii',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '3' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:siege-of-isfahan-1722',
      rel: 'related',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '6' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Nāder’s defeat of Ašraf at the pivotal battle of Mehmāndust in Ṣafar 1142/September 1729 marked the end of Afghan rule in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        },
        {
          id: 'q2',
          text: 'In 1729 Ashraf became alarmed, and led an Afghan army into Khorasan, where he was defeated by Nadir at Damghan, and forced to retreat.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'One of these chiefs, Nāder-qolī Bēg Afšār, the future Nāder Shah, became Ṭahmāsp’s principal military backer.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q4',
          text: 'In the mid 1720s, Nāder played an important role in defeating Malek Maḥmud Sistāni, one of that area’s main warlords, who had set himself up as the scion of the 9th-10th century Saffarid dynasty.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Taking advantage of this success, Nāder embarked forthwith on a vigorous counteroffensive.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q6',
          text: 'Ashraf tried to escape to Kandahar almost alone, but was murdered by a party of Baluch robbers; and thus, by the genius of Nadir, his native land was delivered from the terrible Afghan invaders.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q7',
          text: 'Ašraf’s defeat marked the end of Afghan rule in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
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
            value: { d: '1726' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Northeastern Iran was then gradually brought under control and made the base for an attempt to reconquer the throne.',
        lang: 'en',
        cite: { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1729' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Ašraf at first belittled this adversary, but later took the threat seriously and launched an offensive against Ṭahmāsp.',
        lang: 'en',
        cite: { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1729-09-29' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '4' }
              },
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'He first defeated the Abdāli (later known as Dorrāni) Afghans near Herat in May 1729, then achieved victory over the Ḡilzi Afghans led by Ašraf at Mehmāndust on 29 September 1729.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1729-11-13' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Ašraf had to abandon his capital on 21 Rabīʿa II 1142/13 November 1729, and Nāder made his entry three days later at the head of the victorious force.',
        lang: 'en',
        cite: { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Mapofthehotaks1728.png/1280px-Mapofthehotaks1728.png',
    page: 'https://commons.wikimedia.org/wiki/File:Mapofthehotaks1728.png',
    credit: { creator: 'Kailanmapper' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
