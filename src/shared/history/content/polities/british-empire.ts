import { definePolity } from '../../schema'

export default definePolity({
  id: 'british-empire',
  names: [
    { text: 'British Empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1583' },
        cites: [
          {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '139' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'europe'],
  prominence: 1,
  figures: [
    {
      key: 'population',
      value: {
        alts: [
          {
            value: { min: 400000000, qualifier: 'about' },
            cites: [
              {
                source: 'britannica-1911-british-empire',
                loc: { section: 'BRITISH EMPIRE', para: '4' }
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Imperial_federation._Map_of_the_world_showing_the_extent_of_the_British_empire_in_1886._Special_information_furnished_-_by_capitain_J._C._R._Colomb..._-_btv1b530620982.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Imperial_federation._Map_of_the_world_showing_the_extent_of_the_British_empire_in_1886._Special_information_furnished_-_by_capitain_J._C._R._Colomb..._-_btv1b530620982.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'J. C. R. Colomb' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BRITISH EMPIRE, the name now loosely given to the whole aggregate of territory, the inhabitants of which, under various forms of government, ultimately look to the British crown as the supreme head.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/British_Empire'
          }
        },
        {
          id: 'q2',
          text: 'Of this area the British empire occupies nearly one-quarter, extending over an area of about 12,000,000 sq. m.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/British_Empire'
          }
        },
        {
          id: 'q3',
          text: 'This vast congeries of states, widely different in character, and acquired by many different methods, holds together under the supreme headship of the crown on a generally acknowledged triple principle of self-government, self-support and self-defence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '487' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/British_Empire'
          }
        },
        {
          id: 'q4',
          text: 'The colonial empire comprises over fifty distinct governments. It is divided into colonies of three classes and dependencies; these, again, are in some instances associated for administrative purposes in federated groups.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '490' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/British_Empire'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
          text: 'With these exceptions and the nominal possession taken of Newfoundland by Sir Humphrey Gilbert in 1583, all the territorial acquisitions of the empire have been made in the 17th and subsequent centuries.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '139' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/British_Empire'
          }
        },
        {
          id: 'q6',
          text: 'The Indian section of the empire was acquired during the 17th–19th centuries under a royal charter granted to the East India Company by Queen Elizabeth in 1600. It was transferred to the imperial government in 1858, and Queen Victoria was proclaimed empress under the Royal Titles Act in 1877.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-british-empire',
            loc: { section: 'BRITISH EMPIRE', para: '393' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/British_Empire'
          }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 8680 }
  ],
  furtherReading: [
    { source: 'tharoor-2016-an-era-of-darkness', perspective: 'south-asian' },
    { source: 'boahen-1987-african-perspectives-on-colonialism', perspective: 'african' }
  ]
})
