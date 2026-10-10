import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'dissolution-of-the-soviet-union-causes',
  about: ['event:dissolution-of-the-soviet-union'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'For several months after his return to Moscow, Gorbachev and his aides made futile attempts to restore stability and legitimacy to the central institutions.',
    lang: 'en',
    cite: {
      source: 'loc-russia-country-study-1996',
      loc: { section: 'The August Coup and Its Aftermath', para: '4' }
    },
    provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
  },
  positions: [
    {
      id: 'gorbachev-resignation-address',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Mikhail Gorbachev', ref: 'person:mikhail-gorbachev' },
        { kind: 'state', name: 'Soviet Union' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The reason could already be seen: the society was suffocating in the vise of the command-bureaucratic system, doomed to serve ideology and bear the terrible burden of the arms race.',
          lang: 'en',
          cite: {
            source: 'marxists-gorbachev-1991-12-25-resignation-speech',
            loc: { section: 'Resignation Speech', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.marxists.org/archive/gorbachev/1991/december-25.htm'
          }
        },
        {
          id: 'q3',
          text: 'The August coup brought the general crisis to its ultimate limit.',
          lang: 'en',
          cite: {
            source: 'marxists-gorbachev-1991-12-25-resignation-speech',
            loc: { section: 'Resignation Speech', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.marxists.org/archive/gorbachev/1991/december-25.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The coup failed, and Gorbachev resumed his position but the Soviet Union was in evident decline.',
          lang: 'en',
          cite: {
            source: 'millercenter-george-h-w-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        }
      ]
    },
    {
      id: 'gorbachev-foundation-destructive-processes',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Gorbachev Foundation' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Destructive processes which the emerging Soviet democracy was unable to curb, eventually led to the disintegration of the multinational Union of republics that Gorbachev led.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '30' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Throughout the fall, the Soviet Republics began to declare their independence from the Soviet Union, and in December, Russia, Ukraine, and Belarus announced they were forming a new confederation of states.',
          lang: 'en',
          cite: {
            source: 'millercenter-george-h-w-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        }
      ]
    },
    {
      id: 'russian-presidency-greatest-geopolitical-catastrophe',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russia' },
        { kind: 'participant', name: 'Vladimir Putin' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'First of all, it should be acknowledged, and I have spoken of this before, that the collapse of the Soviet Union was the greatest geopolitical catastrophe of the century.',
          lang: 'en',
          cite: {
            source: 'putin-2005-04-25-annual-address-to-the-federal-assembly',
            loc: { section: 'Annual Address to the Federal Assembly' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://irp.fas.org/news/2005/04/putin042505.html'
          }
        },
        {
          id: 'q8',
          text: 'Tens of millions of our citizens and fellow-countrymen found themselves outside the Russian Federation.',
          lang: 'en',
          cite: {
            source: 'putin-2005-04-25-annual-address-to-the-federal-assembly',
            loc: { section: 'Annual Address to the Federal Assembly' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://irp.fas.org/news/2005/04/putin042505.html'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'If one accepts the premise that he made this statement from the standpoint of a Russian citizen for a Russian audience, it is hard to disagree with the conclusion that the collapse of the Soviet Union was the greatest geopolitical catastrophe for Russia not only of the 20th century, but for all of Russia’s modern history.',
          lang: 'en',
          cite: {
            source: 'kuchins-2005-europes-last-geopolitician',
            loc: { section: 'Europe\'s Last Geopolitician?', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://carnegieendowment.org/2005/05/09/europe-s-last-geopolitician-pub-16887'
          }
        },
        {
          id: 'q10',
          text: 'The problem, however, is that the Russian President did not clarify exactly for whom the Soviet collapse was a “geopolitical catastrophe.”',
          lang: 'en',
          cite: {
            source: 'kuchins-2005-europes-last-geopolitician',
            loc: { section: 'Europe\'s Last Geopolitician?', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://carnegieendowment.org/2005/05/09/europe-s-last-geopolitician-pub-16887'
          }
        }
      ]
    },
    {
      id: 'office-of-the-historian-eastern-europe-and-the-coup',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'Gorbachev’s decision to loosen the Soviet yoke on the countries of Eastern Europe created an independent, democratic momentum that led to the collapse of the Berlin Wall in November 1989, and then the overthrow of Communist rule throughout Eastern Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
          }
        }
      ]
    },
    {
      id: 'library-of-congress-republics-against-the-center',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q12',
          text: 'As the leader of the most populous and richest union republic, Yeltsin became the champion of all the republics\' rights against control from the center.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        },
        {
          id: 'q13',
          text: 'Yeltsin originally hoped for the creation of a new federation anchored by bilateral and multilateral treaties between and among the union republics, with Russia as the preeminent member.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
