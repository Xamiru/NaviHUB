import { definePolity } from '../../schema'

export default definePolity({
  id: 'hotaki-dynasty',
  names: [
    { text: 'Hotaki dynasty', lang: 'en', role: 'primary' },
    {
      text: 'Hotak dynasty',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1709' },
        cites: [
          { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1738' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          },
          { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:kandahar',
      start: {
        alts: [
          {
            value: { d: '1709' },
            cites: [
              { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
      ]
    },
    {
      ref: 'place:isfahan',
      start: {
        alts: [
          {
            value: { d: '1722-10-21' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
              }
            ]
          }
        ]
      },
      end: {
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
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '2' } }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 627449 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Early in the eighteenth century, one of the Pashtun tribes, the Hotaki, seized Qandahar from the Safavids, and a group of Ghilzai Pashtuns subsequently made greater inroads into Safavid territory.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/10.htm' }
        },
        {
          id: 'q2',
          text: 'In 1121/1709 a Ḡilzay uprising, led by the Hōtakī tribal chief Mīr Ways, had freed all of southern Afghanistan from Safavid control, thus establishing the basis of a state which would extend westwards into the heart of Persia (fall of Isfahan, 1135/1722); but the retaliation led by Nāder Shah Afšār destroyed the new state in a few rapid attacks (fall of Qandahār [Kandahār], 1150/1738; of Kabul, 1151/1738), and the Afghan territory was once again annexed to the Persian empire.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In 1702 a newly-appointed governor, one Shah Nawaz, called Gurji Khan from having been “wali” or ruler of Georgia, arrived at Kandahar with a tolerably large force.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q4',
          text: 'Maḥmūd invaded Persia and captured Isfahan, the Persian capital, in 1135/1722.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q5',
          text: 'The Ottomans recognized Ašraf as the king of Persia after suffering a defeat at his hand.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q6',
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
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Assisted by the Abdālīs, Nāder Shah also defeated the last independent Ḡalzay ruler of Qandahār, Shah Ḥosayn Hotak, Shah Maḥmūd’s brother in 1150/1738.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q8',
          text: 'A much more important factor was the disaccord within the Afghan tribes.',
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
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Mahmud_Hotak_Coin.jpg/1280px-Mahmud_Hotak_Coin.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmud_Hotak_Coin.jpg',
    credit: { creator: 'M.samei' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
