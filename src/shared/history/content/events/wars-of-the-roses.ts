import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'wars-of-the-roses',
  names: [
    { text: 'Wars of the Roses', lang: 'en', role: 'primary' },
    {
      text: 'War of the Roses',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-subject-wars-of-the-roses',
          loc: { section: 'MARC field 450: variant headings' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1455-05-22' },
        cites: [
          {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '3' }
          },
          {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          },
          {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1485-08-22' },
        cites: [
          {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '4' }
          },
          {
            source: 'loc-subject-wars-of-the-roses',
            loc: { section: 'MARC field 151: heading' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress Subject Headings' }
        ]
      },
      {
        value: { d: '1487-06-16' },
        cites: [
          {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:st-albans',
      cites: [
        {
          source: 'britannica-1911-wars-of-the-roses',
          loc: { section: 'Roses, Wars of the', para: '3' }
        },
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'lancaster',
      name: 'House of Lancaster',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    },
    {
      key: 'york',
      name: 'House of York',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Richard, Duke of York',
      role: 'leader',
      side: 'york',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    },
    {
      name: 'Henry VI',
      role: 'head-of-state',
      side: 'lancaster',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    },
    {
      name: 'Edward IV',
      role: 'head-of-state',
      side: 'york',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    },
    {
      name: 'Richard III',
      role: 'head-of-state',
      side: 'york',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    },
    {
      name: 'Henry Tudor',
      role: 'leader',
      side: 'lancaster',
      cites: [
        {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:hundred-years-war',
      rel: 'preceded-by',
      cites: [
        {
          source: 'britannica-1911-wars-of-the-roses',
          loc: { section: 'Roses, Wars of the', para: '1' }
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
          text: 'ROSES, WARS OF THE, a name given to a series of civil wars in England during the reigns of Henry VI., Edward IV. and Richard III.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
          }
        },
        {
          id: 'q2',
          text: 'Following Henry VI\'s recovery following illness in 1455, Richard Duke of York, and his followers feared they would soon face treason charges.',
          lang: 'en',
          cite: {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The honest yeoman of Edward III.’s time had evolved into a professional soldier of fortune, and had been demoralized by the prolonged and dismal Hundred Years’ War, at the close of which many thousands of ruffians, whose occupation had gone, had been let loose in England.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
          }
        },
        {
          id: 'q4',
          text: 'At the same time the power of feudalism had become concentrated in the hands of a few great lords, who were wealthy enough and powerful enough to become king-makers.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'A period of uneasy politics followed the Battle of St Albans.',
          lang: 'en',
          cite: {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
          }
        },
        {
          id: 'q6',
          text: 'When York’s son, Edward, arrived from the Welsh borderlands, Londoners allowed him into the city. He proclaimed himself King on 4 March.',
          lang: 'en',
          cite: {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
          }
        },
        {
          id: 'q7',
          text: 'As the 1460s progressed, Edward IV’s regime encountered increasing difficulties.',
          lang: 'en',
          cite: {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
          }
        },
        {
          id: 'q8',
          text: 'Gloucester became Protector and declared Edward IV’s children illegitimate. Edward V and his brother disappeared in the Tower and on 26 June 1483, Gloucester became Richard III.',
          lang: 'en',
          cite: {
            source: 'national-archives-the-wars-of-the-roses',
            loc: { section: 'The Wars of the Roses' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'A last feeble attempt to renew the war, made by an army gathered to uphold the pretender Lambert Simnel, was crushed by Henry VII. at Stoke Field',
          lang: 'en',
          cite: {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
          }
        },
        {
          id: 'q10',
          text: 'It is from the Wars of the Roses that there originated the deep-rooted dislike of the professional soldier which was for nearly four centuries a conspicuous feature of the English social and governmental system, and it is therefore in their results rather than their incidents that they have affected the evolution of war.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-wars-of-the-roses',
            loc: { section: 'Roses, Wars of the', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
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
            value: { d: '1455-05-22' },
            cites: [
              {
                source: 'britannica-1911-wars-of-the-roses',
                loc: { section: 'Roses, Wars of the', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Lancastrians, and the king with them, marched out of London to meet them, and the two small armies (3000 Yorkists, 2000 Lancastrians) met at St Albans (May 22, 1455).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-wars-of-the-roses',
          loc: { section: 'Roses, Wars of the', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1460-07-10' },
            cites: [
              {
                source: 'britannica-1911-wars-of-the-roses',
                loc: { section: 'Roses, Wars of the', para: '3' }
              },
              {
                source: 'national-archives-the-wars-of-the-roses',
                loc: { section: 'The Wars of the Roses' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Henry VI was captured by the Duke York at Northampton in July 1460, yet remained king.',
        lang: 'en',
        cite: {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1461-03-29' },
            cites: [
              {
                source: 'national-archives-the-wars-of-the-roses',
                loc: { section: 'The Wars of the Roses' }
              },
              {
                source: 'national-archives-the-wars-of-the-roses',
                loc: { section: 'The Wars of the Roses' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Perhaps 60,000 soldiers fought in Britain’s largest ever land battle, when Henry VI’s Lancastrians and Edward IV’s Yorkists met in the snow at Towton, Yorkshire on 29 March.',
        lang: 'en',
        cite: {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1471' },
            cites: [
              {
                source: 'national-archives-the-wars-of-the-roses',
                loc: { section: 'The Wars of the Roses' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Edward IV returned in spring 1471 defeating Henry VI’s followers at Barnet and Tewkesbury.',
        lang: 'en',
        cite: {
          source: 'national-archives-the-wars-of-the-roses',
          loc: { section: 'The Wars of the Roses' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1485-08-22' },
            cites: [
              {
                source: 'britannica-1911-wars-of-the-roses',
                loc: { section: 'Roses, Wars of the', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'For fourteen years, except for local outbreaks, the land had peace, and then Richard III.’s crown, struck from his head on Bosworth Field (Aug. 22, 1485), was presented to Henry earl of Richmond, who, as Henry VII., established the kingship on a secure foundation.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-wars-of-the-roses',
          loc: { section: 'Roses, Wars of the', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Roses%2C_Wars_of_the'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Battle_of_Towton_by_Alexander_Leadman.jpg/1280px-Battle_of_Towton_by_Alexander_Leadman.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Towton_by_Alexander_Leadman.jpg',
    credit: { institution: 'The Yorkshire Archaeological Journal', creator: 'Alexander D. H. Leadman' },
    license: { id: 'public-domain' }
  }
})
