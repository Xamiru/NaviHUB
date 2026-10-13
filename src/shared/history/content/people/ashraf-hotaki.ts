import { definePerson } from '../../schema'

export default definePerson({
  id: 'ashraf-hotaki',
  names: [
    { text: 'Ashraf Hotaki', lang: 'en', role: 'primary' },
    {
      text: 'Ašraf Ḡilzay',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '1' } }
      ]
    },
    {
      text: 'Ashraf',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1700', approx: true, notAfter: '1720' },
        cites: [
          {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1730' },
        cites: [
          {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Shah of Persia',
      polity: 'polity:hotaki-dynasty',
      start: {
        alts: [
          {
            value: { d: '1725-04-26' },
            cites: [
              {
                source: 'iranica-balland-asraf-gilzay',
                loc: { section: 'AŠRAF ḠILZAY', para: '1' }
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
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '1' } },
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/A_coin_of_Ashraf_Hotak_%28Ashrafi%29.jpg/1280px-A_coin_of_Ashraf_Hotak_%28Ashrafi%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_coin_of_Ashraf_Hotak_(Ashrafi).jpg',
    credit: { institution: 'NumisBids' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ašraf’s reign of little more than four years was almost wholly occupied with fighting against various external and internal adversaries.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q2',
          text: 'Mahmud was succeeded by his first cousin, Ashraf, the son of Mir ʽAbdallah.',
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
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Born in southern Afghanistan early in the 12th/18th century, he took part in the invasion of Safavid territory by these tribes in 1133/1721-1135/1722.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '1' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Posing as the legitimate inheritor of the Iranian throne, Ašraf demanded restitution of all the annexed territories.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q5',
          text: 'Preferring not to push onward, Ašraf opened negotiations which led to the signature of a peace treaty in Ṣafar, 1140/October, 1727.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q6',
          text: 'Ašraf at first belittled this adversary, but later took the threat seriously and launched an offensive against Ṭahmāsp.',
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
          id: 'q7',
          text: 'Ašraf had to abandon his capital on 21 Rabīʿa II 1142/13 November 1729, and Nāder made his entry three days later at the head of the victorious force.',
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
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Ašraf himself unsuccessfully attempted to flee by sea to Baṣra, where he hoped to obtain Ottoman support for his ambition to regain the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q9',
          text: 'Ashraf tried to escape to Kandahar almost alone, but was murdered by a party of Baluch robbers; and thus, by the genius of Nadir, his native land was delivered from the terrible Afghan invaders.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
