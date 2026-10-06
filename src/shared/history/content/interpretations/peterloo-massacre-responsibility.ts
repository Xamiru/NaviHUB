import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'peterloo-massacre-responsibility',
  about: ['event:peterloo-massacre'],
  topic: 'responsibility',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'What happened on St Peter’s Field was instantly infamous and a public relations disaster for the state.',
    lang: 'en',
    cite: {
      source: 'tna-peterloo-massacre-collection',
      loc: { section: 'Engraving showing ‘the slaughter at Manchester’' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
    }
  },
  positions: [
    {
      id: 'reformers',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Reformers' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Reformers called it ‘Peterloo’, comparing it to the slaughter at the battle of Waterloo.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Engraving showing ‘the slaughter at Manchester’' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        },
        {
          id: 'q3',
          text: 'This engraving, cheap and hand coloured, showing troops cutting at fallen and screaming victims, shows the form radical representations of Peterloo took.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Engraving showing ‘the slaughter at Manchester’' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    },
    {
      id: 'the-times',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'The Times' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Widespread meetings were called in support of the victims, even the conservative Times criticised the government.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Engraving showing ‘the slaughter at Manchester’' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    },
    {
      id: 'government',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'British government' },
        { kind: 'participant', name: 'Henry Hobhouse' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Here, Henry Hobhouse, the Home Office’s chief civil servant, thanks a magistrate for forwarding information about the radicals, saying that he and Lord Sidmouth, the Home Secretary, are convinced that Lancashire, ‘will not be tranquillized, until Blood shall have been shed either by the Law or the sword’.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Letter from the Home Office to a Lancashire magistrate' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        },
        {
          id: 'q6',
          text: 'Despite the outrage that surrounded Peterloo, the government, magistrates and cavalry remained defiantly unapologetic.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Pro-government pamphlet about the Peterloo Massacre' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        },
        {
          id: 'q7',
          text: 'This pamphlet attempts to place the blame for the death of a child, William Fildes, at Peterloo on his mother, for dropping him when she was hit by a cavalryman’s horse.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Pro-government pamphlet about the Peterloo Massacre' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    },
    {
      id: 'blamed-reformers',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Many of the public' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'They were supported by many of the public, who blamed reformers.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Pro-government pamphlet about the Peterloo Massacre' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    },
    {
      id: 'state-struck-first',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'The National Archives' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'In a matter of months, he would be proved right, but it would be the state that struck the first blow.',
          lang: 'en',
          cite: {
            source: 'tna-peterloo-massacre-collection',
            loc: { section: 'Letter from the Home Office to a Lancashire magistrate' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/the-peterloo-massacre/'
          }
        }
      ]
    }
  ]
})
