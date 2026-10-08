import { definePerson } from '../../schema'

export default definePerson({
  id: 'tahereh-qorrat-al-ayn',
  names: [
    { text: 'Tahereh', lang: 'en', role: 'primary' },
    { text: 'طاهره قرةالعین', lang: 'fa', role: 'native' },
    {
      text: 'Qorrat-al-ʿAyn',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } }
      ]
    },
    {
      text: 'Ṭāhera',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } }
      ]
    },
    {
      text: 'Fāṭema Ḵānom Baraḡānī Qazvīnī',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1814', notAfter: '1817' },
        cites: [
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '6' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1852' },
        cites: [
          { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '6' } }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['cleric', 'writer'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'The role played by Qorrat-al-ʿAyn in Karbalāʾ was, as we have noted above, particularly significant.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q2',
          text: 'Residing in Raštī’s home there, she assumed supreme control of the Shaikhi-Babi community of the region, stressing her authority as one of the ḥorūf al-ḥayy and the incarnation of Fāṭema.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q3',
          text: 'In her classes attended by Babi men, she appeared unveiled, and on one occasion chose to celebrate the birth of the Bāb during the early days of Moḥarram.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q4',
          text: 'In the end, Qorrat-al-ʾAyn was arrested in Karbalāʾ, forced to leave the city for Baghdad in 1263/1847, kept there for several months in the home of the Mufti, Shaikh Maḥmūd al-Ālūsī, and finally expelled from Iraq on orders sent from Istanbul.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' },
    { source: 'bamdad-1968-zan-e-irani', perspective: 'iranian' }
  ]
})
