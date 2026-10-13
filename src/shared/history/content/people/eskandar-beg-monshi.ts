import { definePerson } from '../../schema'

export default definePerson({
  id: 'eskandar-beg-monshi',
  names: [
    { text: 'Eskandar Beg Monshi', lang: 'en', role: 'primary' },
    {
      text: 'اسکندر بیگ منشی',
      lang: 'fa',
      role: 'native',
      translit: 'Eskandar Beg Torkamān Monšī'
    },
    {
      text: 'Eskandar Beg Torkamān Monšī',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-savory-eskandar-beg-torkaman',
          loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1560' },
        cites: [
          {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '1' }
          }
        ]
      },
      {
        value: { d: '1561' },
        cites: [
          {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1633', approx: true },
        cites: [
          {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['writer', 'scholar'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/A_farman_from_the_fourth_Safavid_shah%2C_Mohammad_Khodabandeh%2C_Safavid_Iran%2C_dated_1584.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_farman_from_the_fourth_Safavid_shah,_Mohammad_Khodabandeh,_Safavid_Iran,_dated_1584.jpg',
    credit: { institution: 'Chiswick Auctions' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Internal evidence indicates that Eskandar Beg was born in 968/1560 or 969/1561: He was twenty-six years old when he fought on the side of Ḥamza Mīrzā at the battle of Ṣāʾen Qalʿa (spring of 994/1586) and seventy years old in 1038/1628-29 when he completed his history',
          lang: 'en',
          cite: {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/eskandar-beg-torkaman'
          }
        },
        {
          id: 'q2',
          text: 'Few personal details are known about the life of Eskandar Beg.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/eskandar-beg-torkaman'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'He started his career in the Safavid bureaucracy by studying bookkeeping (ʿelm-e sīāq), but he soon gave this up as unworthy of his talents and obtained an appointment in the royal chancellery (daftar-ḵāna-ye homāyūn) and started at the Dīvān-e wekālat.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/eskandar-beg-torkaman'
          }
        },
        {
          id: 'q4',
          text: 'In 1001/1592-93 he joined the rank of royal secretaries (monšīān-e ʿeżām)and from that moment his career in the shah’s personal service began',
          lang: 'en',
          cite: {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/eskandar-beg-torkaman'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q6',
          text: 'This is noticeable, among other things, in the evolution of Safavid historiography from a tribal to a dynastic enterprise.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Since Ṣafī reigned for fourteen years (1038-52/1629-42), it seems virtually certain that the first four years of his reign were recorded by Eskandar Beg, who must, therefore, have died about 1043/1633',
          lang: 'en',
          cite: {
            source: 'iranica-savory-eskandar-beg-torkaman',
            loc: { section: 'ESKANDAR BEG TORKAMĀN MONŠĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/eskandar-beg-torkaman'
          }
        }
      ]
    }
  ]
})
