import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'adams-onis-treaty',
  names: [
    { text: 'Adams–Onís Treaty', lang: 'en', role: 'primary' },
    {
      text: 'Transcontinental Treaty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-acquisition-of-florida',
          loc: {
            section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
            para: '5'
          }
        }
      ]
    },
    {
      text: 'Onís-Adams Treaty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-acquisition-of-florida',
          loc: {
            section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
            para: '5'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1819-02-22' },
        cites: [
          {
            source: 'avalon-adams-onis-treaty',
            loc: { section: 'Treaty of Amity, Settlement, and Limits, closing clause' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'avalon-adams-onis-treaty',
          loc: { section: 'Treaty of Amity, Settlement, and Limits, closing clause' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:kingdom-of-spain' }
  ],
  participants: [
    {
      ref: 'person:john-quincy-adams',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-acquisition-of-florida',
          loc: {
            section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
            para: '5'
          }
        }
      ]
    },
    {
      name: 'Luis de Onís',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-acquisition-of-florida',
          loc: {
            section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
            para: '5'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1810, these American settlers in West Florida rebelled, declaring independence from Spain.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-acquisition-of-florida',
            loc: {
              section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/florida'
          }
        },
        {
          id: 'q2',
          text: 'Although U.S. Spanish relations were strained over suspicions of American support for the independence struggles of Spanish-American colonies, the situation became critical when General Andrew Jackson seized the Spanish forts at Pensacola and St. Marks in his 1818 authorized raid against Seminoles and escaped slaves who were viewed as a threat to Georgia.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-acquisition-of-florida',
            loc: {
              section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/florida'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Minister Onís and Secretary Adams reached an agreement whereby Spain ceded East Florida to the United States and renounced all claim to West Florida.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-acquisition-of-florida',
            loc: {
              section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/florida'
          }
        },
        {
          id: 'q4',
          text: 'Under the Onís-Adams Treaty of 1819 (also called the Transcontinental Treaty and ratified in 1821) the United States and Spain defined the western limits of the Louisiana Purchase and Spain surrendered its claims to the Pacific Northwest. In return, the United States recognized Spanish sovereignty over Texas.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-acquisition-of-florida',
            loc: {
              section: 'Acquisition of Florida: Treaty of Adams-Onis (1819) and Transcontinental Treaty (1821)',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/florida'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'His Catholic Majesty cedes to the United States, in full property and sovereignty, all the territories which belong to him, situated to the eastward of the Mississippi, known by the name of East and West Florida.',
          lang: 'en',
          cite: {
            source: 'avalon-adams-onis-treaty',
            loc: { section: 'Treaty of Amity, Settlement, and Limits, Art. 2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/sp1819.asp'
          }
        },
        {
          id: 'q6',
          text: 'Done at Washington this twenty-second day of February, one thousand eight hundred and nineteen.',
          lang: 'en',
          cite: {
            source: 'avalon-adams-onis-treaty',
            loc: { section: 'Treaty of Amity, Settlement, and Limits, closing clause' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/sp1819.asp'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_of_the_United_States_of_America_-_with_the_contiguous_British_and_Spanish_possessions_LOC_96686661.jpg/1280px-Map_of_the_United_States_of_America_-_with_the_contiguous_British_and_Spanish_possessions_LOC_96686661.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_United_States_of_America_-_with_the_contiguous_British_and_Spanish_possessions_LOC_96686661.jpg',
    credit: { institution: 'Library of Congress', creator: 'John Melish' },
    license: { id: 'public-domain' }
  }
})
