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
  researched: '2026-10-08',
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
  places: [
    {
      ref: 'place:ireland',
      cites: [
        {
          source: 'nai-famine-records-and-distress-papers',
          loc: { section: 'Famine Records and Distress Papers', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
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
    },
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 200000, max: 300000 },
            cites: [
              { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica' }
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
        },
        {
          id: 'q12',
          text: 'In 1845 the population had swelled to 8,295,061, the greater part of whom depended on the potato only. There was no margin, and when the “precarious exotic” failed an awful famine was the result.',
          lang: 'en',
          cite: { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ireland'
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
        },
        {
          id: 'q14',
          text: 'The policy of the government was accordingly changed, and the task of feeding a whole people was undertaken. More than 3,000,000 rations, generally cooked, were at one time distributed',
          lang: 'en',
          cite: { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ireland'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q15',
          text: 'From 200,000 to 300,000 perished of starvation or of fever caused by insufficient food.',
          lang: 'en',
          cite: { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ireland'
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
        },
        {
          id: 'q16',
          text: 'This movement of population took its first great impulse from the famine of 1846 and has continued ever since. When that disaster fell upon the country it found a teeming population fiercely competing for a very narrow margin of subsistence; and so widespread and devastating were its effects that between 1847 and 1852 over 1,200,000 of the Irish people emigrated to other lands.',
          lang: 'en',
          cite: { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ireland'
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
    },
    {
      date: {
        alts: [
          {
            value: { d: '1847-03' },
            cites: [
              { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Great public and private efforts were made to meet the case, and relief works were undertaken, on which, in March 1847, 734,000 persons, representing a family aggregate of not less than 3,000,000, were employed.',
        lang: 'en',
        cite: { source: 'britannica-1911-ireland', loc: { section: 'IRELAND' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ireland'
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
  ],
  furtherReading: [
    { source: 'o-grada-1999-black-47-and-beyond', perspective: 'european' },
    { source: 'crowley-2012-atlas-of-the-great-irish-famine', perspective: 'european' },
    { source: 'poirteir-1996-glortha-on-ghorta', perspective: 'european' }
  ]
})
