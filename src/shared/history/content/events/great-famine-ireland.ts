import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-famine-ireland',
  names: [
    { text: 'Great Famine (Ireland)', lang: 'en', role: 'primary' },
    {
      text: 'Great Famine',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nai-famine-records-and-distress-papers',
          loc: { section: 'Famine Records and Distress Papers', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'famine',
  start: {
    alts: [
      {
        value: { d: '1845' },
        cites: [
          {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '1' }
          },
          {
            source: 'nli-searching-for-images-of-the-great-famine',
            loc: { section: 'Searching for images of The Great Famine?', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1852' },
        cites: [
          {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '1' }
          },
          {
            source: 'nli-searching-for-images-of-the-great-famine',
            loc: { section: 'Searching for images of The Great Famine?', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'north-america'],
  prominence: 1,
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 1000000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-exhibit-john-bull-and-uncle-sam-exploration-and-settlement',
                loc: { section: 'Irish Immigration' }
              }
            ]
          }
        ]
      }
    }
  ],
  participants: [
    {
      name: 'Daniel O\'Connell',
      role: 'participant',
      cites: [
        {
          source: 'hansard-commons-1846-02-17-famine-and-disease-in-ireland',
          loc: { section: 'HC Deb 17 February 1846 vol 83 cc1050-89' }
        }
      ]
    },
    {
      name: 'Sir James Graham',
      role: 'participant',
      cites: [
        {
          source: 'hansard-commons-1846-02-17-famine-and-disease-in-ireland',
          loc: { section: 'HC Deb 17 February 1846 vol 83 cc1050-89' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Great Famine (1845-1852) had a devastating impact on Ireland.',
          lang: 'en',
          cite: {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://nationalarchives.ie/help-with-research/research-guides/famine-records-distress-papers-and-the-relief-commission/'
          }
        },
        {
          id: 'q2',
          text: 'During this time, government agencies such as the Chief Secretary’s Office, the Poor Law Commission and the Relief Commission were tasked with managing the crisis and providing relief to the Irish population.',
          lang: 'en',
          cite: {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://nationalarchives.ie/help-with-research/research-guides/famine-records-distress-papers-and-the-relief-commission/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'A series of bad harvests culminating in the potato blight of 1845-46 brought widespread misery and some starvation.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q4',
          text: 'There there are five millions of people always on the verge of starvation.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1846-02-17-famine-and-disease-in-ireland',
            loc: { section: 'HC Deb 17 February 1846 vol 83 cc1050-89' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1846/feb/17/famine-and-disease-in-ireland'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'From 1846 onwards, these agencies were inundated with letters, reports and petitions from famine-stricken areas pleading for aid.',
          lang: 'en',
          cite: {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://nationalarchives.ie/help-with-research/research-guides/famine-records-distress-papers-and-the-relief-commission/'
          }
        },
        {
          id: 'q6',
          text: 'Established in 1845, the Relief Commission was a government agency tasked with administering famine relief efforts.',
          lang: 'en',
          cite: {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://nationalarchives.ie/help-with-research/research-guides/famine-records-distress-papers-and-the-relief-commission/'
          }
        },
        {
          id: 'q7',
          text: 'It was disbanded in August 1846 but was subsequently reconstituted in February 1847 under the Temporary Relief Act.',
          lang: 'en',
          cite: {
            source: 'nai-famine-records-and-distress-papers',
            loc: { section: 'Famine Records and Distress Papers', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://nationalarchives.ie/help-with-research/research-guides/famine-records-distress-papers-and-the-relief-commission/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Famine forced more than a million Irish to emigrate to the United States in the decade after 1845.',
          lang: 'en',
          cite: {
            source: 'loc-exhibit-john-bull-and-uncle-sam-exploration-and-settlement',
            loc: { section: 'Irish Immigration' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.loc.gov/exhibits/british/brit-1.html'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q9',
          text: 'Photographs of the Great Famine in Ireland (1845 – 1852) and famine victims are scarce because photography was a relatively new invention at the time.',
          lang: 'en',
          cite: {
            source: 'nli-searching-for-images-of-the-great-famine',
            loc: { section: 'Searching for images of The Great Famine?', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nli.ie/news-stories/stories/searching-images-great-famine'
          }
        },
        {
          id: 'q10',
          text: 'So, when searching for pictures of the famine times, we rely on our Prints and Drawings and on the Ephemera Collections.',
          lang: 'en',
          cite: {
            source: 'nli-searching-for-images-of-the-great-famine',
            loc: { section: 'Searching for images of The Great Famine?', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nli.ie/news-stories/stories/searching-images-great-famine'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1846-01' },
            cites: [
              {
                source: 'nai-famine-records-and-distress-papers',
                loc: { section: 'Famine Records and Distress Papers', para: '24' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Initially formed in 1845, the Commission was reorganised in January 1846.',
        lang: 'en',
        cite: {
          source: 'nai-famine-records-and-distress-papers',
          loc: { section: 'Famine Records and Distress Papers', para: '24' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://nationalarchives.ie/help-with-research/research-guides/famine-records-distress-papers-and-the-relief-commission/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Skibbereen_by_James_Mahony%2C_1847.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Skibbereen_by_James_Mahony,_1847.JPG',
    credit: { creator: 'James Mahony' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'trevelyan-1848',
      mediaKind: 'document',
      title: 'The Irish crisis',
      date: { d: '1848' },
      url: 'https://archive.org/download/irishcrisis00trevuoft/irishcrisis00trevuoft.pdf',
      page: 'https://archive.org/details/irishcrisis00trevuoft',
      credit: {
        institution: 'Kelly Library, University of Toronto (Internet Archive)',
        creator: 'Charles Edward Trevelyan'
      },
      license: { id: 'public-domain' },
      bytes: 6928844
    }
  ]
})
