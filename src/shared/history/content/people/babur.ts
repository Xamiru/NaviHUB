import { definePerson } from '../../schema'

export default definePerson({
  id: 'babur',
  names: [
    { text: 'Babur', lang: 'en', role: 'primary' },
    {
      text: 'ظهیرالدین محمد بابر',
      lang: 'fa',
      role: 'native',
      translit: 'Ẓahīr-al-Dīn Moḥammad Bābor'
    },
    {
      text: 'Bābor',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-lehmann-babor',
          loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '1' }
        }
      ]
    },
    {
      text: 'Baber',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'BABER', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1483-02-14' },
        cites: [
          {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '1' }
          },
          { source: 'britannica-1911-baber', loc: { section: 'BABER', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1530-12-26' },
        cites: [
          {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '1' }
          },
          {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'russia-central-asia'],
  roles: ['monarch', 'military', 'writer'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Idealized_portrait_of_Babur_%281483-1530%29%2C_painted_in_1605-1615_in_India_%28British_Museum_1921%2C1011%2C0.3%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Idealized_portrait_of_Babur_(1483-1530),_painted_in_1605-1615_in_India_(British_Museum_1921,1011,0.3).jpg',
    credit: { institution: 'British Museum' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the early sixteenth century, descendants of the Mongol, Turkish, Iranian, and Afghan invaders of South Asia--the Mughals--invaded India under the leadership of Zahir-ud-Din Babur.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q2',
          text: 'Bābor had planned the conquest intending to make India the base of his empire since Kabul’s resources proved too limited to support his nobles and troops.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'He was plunged into the maelstrom of Timurid politics by his father’s death in Ramażān, 899/June, 1494, when he was only eleven.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In fact, the Uzbek leader was defeated and killed by Shah Esmāʿīl Ṣafawī in 916/1510, and this opened the way for Bābor’s last bid for a throne in Samarqand.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        },
        {
          id: 'q5',
          text: 'From Rajab, 917 to Ṣafar, 918/October, 1511 to May, 1512, he held the city for the third time, but as a client of Shah Esmāʿīl, a condition that required him to make an outward profession of the Shiʿite faith and to adopt the Turkman costume of the Safavid troops.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        },
        {
          id: 'q6',
          text: 'First he maneuvered Sultan Ebrāhīm Lōdī into attacking his prepared position at the village of Panipat north of Delhi on 8 Rajab 932/20 April 1526.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Bābor did not leave Agra again, and died there later that year on 6 Jomādā I 937/26 December 1530.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        }
      ]
    }
  ]
})
