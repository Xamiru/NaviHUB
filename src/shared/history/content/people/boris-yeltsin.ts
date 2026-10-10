import { definePerson } from '../../schema'

export default definePerson({
  id: 'boris-yeltsin',
  names: [
    { text: 'Boris Yeltsin', lang: 'en', role: 'primary' },
    { text: 'Борис Николаевич Ельцин', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1931-02-01' },
        cites: [
          {
            source: 'lc-names-yeltsin-boris-nikolayevich-n83228407',
            loc: { section: 'Yeltsin, Boris Nikolayevich, 1931-2007' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2007-04-23' },
        cites: [
          {
            source: 'lc-names-yeltsin-boris-nikolayevich-n83228407',
            loc: { section: 'Yeltsin, Boris Nikolayevich, 1931-2007' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'Chairman of the Supreme Soviet of the Russian Republic',
      polity: 'polity:soviet-union',
      start: {
        alts: [
          {
            value: { d: '1990-05' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '16' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '16' }
        }
      ]
    },
    {
      title: 'President of the Russian Republic',
      start: {
        alts: [
          {
            value: { d: '1991-06-12' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Nationality Ferment', para: '13' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Nationality Ferment', para: '13' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Boris_Yeltsin_Kremlin.ru.jpg/1280px-Boris_Yeltsin_Kremlin.ru.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Boris_Yeltsin_Kremlin.ru.jpg',
    credit: { institution: 'Press and Information Office of the President of Russia' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Exactly six years after Gorbachev had appointed Boris Yeltsin to run the Moscow city committee of the party, Yeltsin now was president of the largest successor state to the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Boris N. Yeltsin made his national political debut as one of two members added to the CPSU Secretariat.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Gorbachev Era', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/16.htm' }
        },
        {
          id: 'q3',
          text: 'In December Yeltsin advanced again, this time as first secretary of the Moscow city committee of the party.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Gorbachev Era', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/16.htm' }
        },
        {
          id: 'q4',
          text: 'For example, when Yeltsin spoke out in 1987 against the slow pace of reform, he was stripped of his Politburo and Moscow CPSU posts.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Gorbachev\'s Reform Dilemma', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/18.htm' }
        },
        {
          id: 'q5',
          text: 'Yeltsin\'s May 1990 election as chairman of the Russian Supreme Soviet had made him the de facto president of the Russian Republic, just as Gorbachev\'s election as chairman of the Supreme Soviet of the Soviet Union had made him de facto president of the country in 1989.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        },
        {
          id: 'q6',
          text: 'As the leader of the most populous and richest union republic, Yeltsin became the champion of all the republics\' rights against control from the center.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        },
        {
          id: 'q7',
          text: 'On June 12, Yeltsin, whose popularity had risen steadily as Gorbachev\'s plummeted, was elected president of the Russian Republic with 57 percent of the vote.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        },
        {
          id: 'q8',
          text: 'Yeltsin took control of the central broadcasting company and key economic ministries and agencies, and in November he banned the CPSU and the Russian Communist Party.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
        },
        {
          id: 'q9',
          text: 'The parliament\'s failure to endorse a compromise was an important factor in Yeltsin\'s dissolution of the body in September 1993.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Constitution and Government Structure', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/69.htm' }
        },
        {
          id: 'q10',
          text: 'Yeltsin declined to carry out serious negotiations with Chechnya, however, allowing the situation to deteriorate into full-scale war at the end of 1994',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q11',
          text: 'In the opinion polls of early 1996, Yeltsin trailed far behind most of the other candidates; his popularity rating was below 10 percent for a prolonged period.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Constitution and Government Structure', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/69.htm' }
        },
        {
          id: 'q12',
          text: 'Most observers in Russia and elsewhere concurred that the election boosted democratization in Russia, and many asserted that reforms in Russia had become irreversible.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Constitution and Government Structure', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/69.htm' }
        },
        {
          id: 'q13',
          text: 'During the seven years both were in office, “Bill and Boris” met eighteen times, nearly as often as their predecessors had met throughout the entire Cold War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bill-clinton-boris-yeltsin-and-us-russian-relations',
            loc: { section: 'Bill Clinton, Boris Yeltsin, and U.S.-Russian Relations', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/clinton-yeltsin'
          }
        }
      ]
    }
  ]
})
