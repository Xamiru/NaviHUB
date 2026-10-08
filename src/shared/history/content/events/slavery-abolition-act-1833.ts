import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'slavery-abolition-act-1833',
  names: [
    { text: 'Slavery Abolition Act 1833', lang: 'en', role: 'primary' },
    {
      text: 'Act for the Abolition of Slavery throughout the British Colonies',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'tna-1833-abolition-of-slavery-act',
          loc: {
            section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1833-08-28' },
        cites: [
          {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: {
              section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
            }
          }
        ]
      },
      {
        value: { d: '1834' },
        cites: [
          {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'The Post-Emancipation Societies', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america', 'subsaharan-africa'],
  prominence: 1,
  places: [
    { ref: 'place:london' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:british-empire' }
  ],
  related: [
    {
      ref: 'event:great-trek',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Colonialism', para: '6' }
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
          text: 'The 1833 Act outlawed British trade in enslaved people.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: {
              section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q2',
          text: 'It stated that \'all such persons should be manumitted [freed by their enslaver] and set free and that a reasonable Compensation should be made available to the Persons hitherto entitled to the Services of such Slaves’.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: {
              section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q3',
          text: 'After a long struggle for emancipation, the Act made apprentice labourers of those aged over six who had been enslaved.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: {
              section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q4',
          text: 'The Act also set out some rights.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: {
              section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        },
        {
          id: 'q5',
          text: 'Formerly enslaved people could not be removed from a colony, families could not be separated, and employers were to supply food, clothing, lodging and medicine.',
          lang: 'en',
          cite: {
            source: 'tna-1833-abolition-of-slavery-act',
            loc: {
              section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The apprenticeship system was designed to ease the transition from slavery to freedom by forcing the ex-slaves to remain on their plantations for a period of six years.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'The Post-Emancipation Societies', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/9.htm'
          }
        },
        {
          id: 'q7',
          text: 'Five years later, the British Parliament decreed that slavery would no longer be permitted in any part of the empire.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Colonialism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/11.htm' }
        },
        {
          id: 'q8',
          text: 'After a four-year period of "apprenticeship," all slaves would become free persons, able, because of Ordinance 50, to sell their labor for whatever the market would bear.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Colonialism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/11.htm' }
        },
        {
          id: 'q9',
          text: 'Emancipation of the slaves provided the catalyst for the rise of an energetic, dynamic peasantry throughout the Caribbean.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'The Post-Emancipation Societies', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/9.htm'
          }
        },
        {
          id: 'q10',
          text: 'Barbados and Antigua abolished slavery without an apprenticeship system in 1834.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'The Post-Emancipation Societies', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/9.htm'
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
            value: { d: '1834-08-01' },
            cites: [
              {
                source: 'tna-1833-abolition-of-slavery-act',
                loc: { section: 'Forms for slave owners to claim compensation' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'When the Act came into effect on 1 August 1834, owners had to complete forms recording the numbers and value of enslaved people in their possession to claim compensation.',
        lang: 'en',
        cite: {
          source: 'tna-1833-abolition-of-slavery-act',
          loc: { section: 'Forms for slave owners to claim compensation' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838' },
            cites: [
              {
                source: 'tna-1833-abolition-of-slavery-act',
                loc: {
                  section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
                }
              },
              {
                source: 'loc-caribbean-islands-country-study-1987',
                loc: { section: 'The Post-Emancipation Societies', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The period of apprenticeship ended in 1838, after which full emancipation was granted to all throughout the British Colonies.',
        lang: 'en',
        cite: {
          source: 'tna-1833-abolition-of-slavery-act',
          loc: {
            section: 'The published Act for the Abolition of Slavery throughout the British Colonies'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Slaves_on_a_British_plantation_in_the_West_Indies_receiving_news_of_their_emancipation_following_the_passage_of_the_Slavery_Abolition_Act_of_1833.jpg/1280px-Slaves_on_a_British_plantation_in_the_West_Indies_receiving_news_of_their_emancipation_following_the_passage_of_the_Slavery_Abolition_Act_of_1833.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Slaves_on_a_British_plantation_in_the_West_Indies_receiving_news_of_their_emancipation_following_the_passage_of_the_Slavery_Abolition_Act_of_1833.jpg',
    credit: { creator: 'Cassell\'s History of England' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'beckles-2013-britains-black-debt', perspective: 'caribbean' }
  ]
})
