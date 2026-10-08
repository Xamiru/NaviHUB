import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-chartist-petition',
  names: [
    { text: 'First Chartist petition', lang: 'en', role: 'primary' },
    {
      text: 'National Petition',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'participant', name: 'Thomas Attwood' }
      ],
      cites: [
        {
          source: 'hansard-commons-1839-07-12-national-petition',
          loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1839-06-14' },
        cites: [
          {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1839-07-12' },
        cites: [
          {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  places: [
    { ref: 'place:london' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      name: 'Thomas Attwood',
      role: 'leader',
      cites: [
        {
          source: 'hansard-commons-1839-06-14-national-petition',
          loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
        }
      ]
    },
    {
      name: 'John Fielden',
      role: 'participant',
      cites: [
        {
          source: 'hansard-commons-1839-07-12-national-petition',
          loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
        }
      ]
    },
    {
      name: 'Lord John Russell',
      role: 'participant',
      cites: [
        {
          source: 'hansard-commons-1839-07-12-national-petition',
          loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 1280000 },
            cites: [
              {
                source: 'hansard-commons-1839-06-14-national-petition',
                loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
              }
            ]
          },
          {
            value: { min: 1200000 },
            cites: [
              {
                source: 'hansard-commons-1839-07-12-national-petition',
                loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The petition originated in the town of Birmingham.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jun/14/national-petition-the-chartists'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Chartism was a movement for the rights and suffrage of the working class based on the People’s Charter – a petition of six demands for reforms, the vote for all men over the age of 21 being the most significant.',
          lang: 'en',
          cite: {
            source: 'tna-william-cuffey',
            loc: { section: 'William Cuffey: The black man and his party' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/stories/william-cuffey/'
          }
        },
        {
          id: 'q3',
          text: 'He held in his hand a list of two hundred and fourteen towns and villages, in different parts of Great Britain, where the petition had been deliberately adopted and signed; and it was now presented to that House with 1,280,000 signatures, the result of not less than 500 public meetings, which had been held in support of the principles contained in this petition.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jun/14/national-petition-the-chartists'
          }
        },
        {
          id: 'q4',
          text: 'The first clause of the petition was for universal suffrage; that representation should be co-equal with taxation—the ancient constitutional law of England.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jun/14/national-petition-the-chartists'
          }
        },
        {
          id: 'q5',
          text: 'This produced loud laughter, from the gigantic dimensions of the petition.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jun/14/national-petition-the-chartists'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The House divided: Ayes 46; Noes 235; Majority 189.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jul/12/the-national-petition'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/William_Edward_Kilburn_-_View_of_the_Great_Chartist_Meeting_on_Kennington_Common_-_Google_Art_Project.jpg/1280px-William_Edward_Kilburn_-_View_of_the_Great_Chartist_Meeting_on_Kennington_Common_-_Google_Art_Project.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:William_Edward_Kilburn_-_View_of_the_Great_Chartist_Meeting_on_Kennington_Common_-_Google_Art_Project.jpg',
    credit: { creator: 'William Edward Kilburn' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'blake-1839',
      mediaKind: 'document',
      title: 'The House of Lords, the People\'s charter, and the Corn laws',
      date: { d: '1839' },
      url: 'https://archive.org/download/houseoflordspeop00blakuoft/houseoflordspeop00blakuoft.pdf',
      page: 'https://archive.org/details/houseoflordspeop00blakuoft',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'Francis Blake'
      },
      license: { id: 'public-domain' },
      bytes: 3483320
    }
  ]
})
