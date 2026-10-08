import { definePerson } from '../../schema'

export default definePerson({
  id: 'charles-darwin',
  names: [
    { text: 'Charles Darwin', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1809-02-12' },
        cites: [
          {
            source: 'britannica-1911-darwin-charles-robert',
            loc: { section: 'DARWIN, CHARLES ROBERT', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1882-04-19' },
        cites: [
          {
            source: 'britannica-1911-darwin-charles-robert',
            loc: { section: 'DARWIN, CHARLES ROBERT', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['scientist', 'writer'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'With much of his research completed, Darwin began in mid-June 1858 to write up the results of his study of pigeons, hoping to finish it in a week or two. He had scarcely begun when his work was interrupted by the arrival of the now-famous letter from Alfred Russel Wallace, enclosing an essay in which Wallace enunciated his own theory of natural selection.',
          lang: 'en',
          cite: {
            source: 'darwin-correspondence-project-1858-1859-origin',
            loc: { section: '1858-1859: Origin', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.darwinproject.ac.uk/letters/darwins-life-letters/darwin-letters-1858-1859-origin'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'My work is now nearly finished; but as it will take me two or three more years to complete it, and as my health is far from strong, I have been urged to publish this Abstract. I have more especially been induced to do this, as Mr. Wallace, who is now studying the natural history of the Malay archipelago, has arrived at almost exactly the same general conclusions that I have on the origin of species.',
          lang: 'en',
          cite: { source: 'darwin-1859-on-the-origin-of-species', loc: { section: 'INTRODUCTION' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gutenberg.org/cache/epub/1228/pg1228.txt'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Charles_Darwin_by_Maull_and_Polyblank%2C_1855-1.jpg/1280px-Charles_Darwin_by_Maull_and_Polyblank%2C_1855-1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Charles_Darwin_by_Maull_and_Polyblank,_1855-1.jpg',
    credit: { creator: 'Maull and Polyblank' },
    license: { id: 'public-domain' }
  }
})
