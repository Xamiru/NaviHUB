import { definePerson } from '../../schema'

export default definePerson({
  id: 'david-livingstone',
  names: [
    { text: 'David Livingstone', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1813' },
        cites: [
          {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '14' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1873-04' },
        cites: [
          {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '85' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  roles: ['other', 'writer'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'David Livingstone, perhaps the best known missionary and explorer of the Victorian period, was born in 1813 to parents Neil and Agnes Livingstone. He began life in Blantyre, a small town near Glasgow on the river Clyde where the cotton mill was the major employer.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1838 Livingstone joined the London Missionary Society (LMS), a predominantly congregationalist organisation.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        },
        {
          id: 'q3',
          text: 'Now a celebrated national hero, Livingstone received substantial support for his plans.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'At the end of April 1873 he died in the village of Chitambo (present-day Chipundu, Zambia).',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '85' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/David_Livingstone_by_Thomas_Annan.jpg/1280px-David_Livingstone_by_Thomas_Annan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:David_Livingstone_by_Thomas_Annan.jpg',
    credit: { institution: 'National Galleries of Scotland', creator: 'Thomas Annan' },
    license: { id: 'public-domain' }
  }
})
