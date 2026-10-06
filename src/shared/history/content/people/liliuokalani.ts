import { definePerson } from '../../schema'

export default definePerson({
  id: 'liliuokalani',
  names: [
    { text: 'Lili\'uokalani', lang: 'en', role: 'primary' },
    {
      text: 'Liliuokalani',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['oceania'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'When King Kalākaua died in 1891, his sister Lili\'uokalani succeeded him.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        },
        {
          id: 'q2',
          text: 'Though she introduced a new constitution that would restore her power and Hawaiian rights, she would be Hawaii\'s last monarch.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'In a last, unsuccessful attempt to return control of her homeland to native Hawaiians, Queen Lili’uokalani sent a letter of protest to the U.S. House of Representatives.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Liliuokalani%2C_photograph_by_Henry_L._Chase_%28PPWD-16-4-003%29.jpg/1280px-Liliuokalani%2C_photograph_by_Henry_L._Chase_%28PPWD-16-4-003%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Liliuokalani,_photograph_by_Henry_L._Chase_(PPWD-16-4-003).jpg',
    credit: { institution: 'Hawaii State Archives', creator: 'Henry Lyman Chase' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'hawaiis-story-1898',
      mediaKind: 'document',
      title: 'Hawaii\'s story by Hawaii\'s queen, Liliuokalani',
      date: { d: '1898' },
      url: 'https://archive.org/download/hawaiisstorybyh00lili/hawaiisstorybyh00lili.pdf',
      page: 'https://archive.org/details/hawaiisstorybyh00lili',
      credit: {
        institution: 'Smithsonian Libraries (Internet Archive)',
        creator: 'Liliuokalani, Queen of Hawaii, 1838-1917'
      },
      license: { id: 'public-domain' },
      bytes: 35327203
    }
  ]
})
