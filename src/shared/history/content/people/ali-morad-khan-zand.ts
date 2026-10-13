import { definePerson } from '../../schema'

export default definePerson({
  id: 'ali-morad-khan-zand',
  names: [
    { text: 'Ali-Morad Khan Zand', lang: 'en', role: 'primary' },
    { text: 'علی‌مراد خان زند', lang: 'fa', role: 'native' },
    {
      text: 'ʿAlī-Morād Khan Zand',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-ali-morad-khan-zand',
          loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  died: {
    alts: [
      {
        value: { d: '1785-02' },
        cites: [
          { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Zand ruler',
      polity: 'polity:zand-iran',
      start: {
        alts: [
          {
            value: { d: '1781' },
            cites: [
              {
                source: 'iranica-perry-ali-morad-khan-zand',
                loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '1' }
              },
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1785-02' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-perry-ali-morad-khan-zand',
          loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '1' }
        },
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Coin_of_Ali_Morad_Khan_Zand%2C_minted_in_Kashan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Coin_of_Ali_Morad_Khan_Zand,_minted_in_Kashan.jpg',
    credit: { institution: 'Classical Numismatic Group' },
    license: { id: 'cc-by-sa', version: '2.5', url: 'https://creativecommons.org/licenses/by-sa/2.5' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ʿAli-Morād Khan (r. 1781-85) was faced with a resurgence of Qajar power and established his capital strategically at Isfahan.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q2',
          text: 'On the Wakīl’s death in 1193/1779, ʿAlī-Morād helped Zakī secure power in the name of Karīm Khan’s second son, Moḥammad-ʿAlī.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-ali-morad-khan-zand',
            loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ali-morad-khan-zand-r'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Zakī then dispatched him with his best troops in pursuit of Āḡā Moḥammad Qāǰār, who had fled from Shiraz to Māzandarān.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-ali-morad-khan-zand',
            loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ali-morad-khan-zand-r'
          }
        },
        {
          id: 'q4',
          text: 'At Isfahan he rebelled in the name of Abu’l-Fatḥ, the Wakīl’s eldest son deposed by Zakī; and, on his way to quell this threat, Zakī was killed in a mutiny.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-ali-morad-khan-zand',
            loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ali-morad-khan-zand-r'
          }
        },
        {
          id: 'q5',
          text: 'ʿAlī-Morād was blind in one eye and is characterized as a heavy drinker.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-ali-morad-khan-zand',
            loc: { section: 'ʿALĪ-MORĀD KHAN ZAND', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ali-morad-khan-zand-r'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Hastening to defend his capital in midwinter while ill, ʿAli-Morād Khan died at Murčaḵur in February 1785.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    }
  ]
})
