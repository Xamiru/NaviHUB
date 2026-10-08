import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fall-of-the-berlin-wall-credit',
  about: ['event:fall-of-the-berlin-wall'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'Soviet tanks crushed demonstrators in East Berlin in June 1953, in Hungary in 1956, and again in Czechoslovakia in 1968.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
      loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '4' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
    }
  },
  positions: [
    {
      id: 'reagan-pressure-and-the-call-to-gorbachev',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ronald Reagan', ref: 'person:ronald-reagan' },
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'But through it all, the alliance held firm. And I invite those who protested then--I invite those who protest today--to mark this fact: Because we remained strong, the Soviets came back to the table. And because we remained strong, today we have within reach the possibility, not merely of limiting the growth of arms, but of eliminating, for the first time, an entire class of nuclear weapons from the face of the Earth.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-06-12-remarks-at-the-brandenburg-gate',
            loc: { section: 'Remarks at the Brandenburg Gate', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-east-west-relations-brandenburg-gate-west-berlin'
          }
        },
        {
          id: 'q3',
          text: 'Yes, across Europe, this wall will fall. For it cannot withstand faith; it cannot withstand truth. The wall cannot withstand freedom.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-06-12-remarks-at-the-brandenburg-gate',
            loc: { section: 'Remarks at the Brandenburg Gate', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-east-west-relations-brandenburg-gate-west-berlin'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Not even the most optimistic observer of President’s Ronald Reagan’s 1987 Berlin speech calling on Soviet General Secretary Mikhail Gorbachev to “tear down this wall” would have imagined that two years later the communist regimes of Eastern Europe would collapse like dominoes.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        }
      ]
    },
    {
      id: 'gorbachev-foundation-new-thinking',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Gorbachev Foundation' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Gorbachev’s activity played a prominent role in ending the Cold War, stopping the arms race and unifying Germany.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '28' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Mikhail Gorbachev’s policies of perestroika (restructuring) and glasnost (transparency) further legitimized popular calls for reform from within.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        }
      ]
    },
    {
      id: 'state-department-historians-soviet-restraint',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Gorbachev also made clear—at first secretly to the Eastern European leaders, then increasingly more public—that the Soviet Union had abandoned the policy of military intervention in support of communist regimes (the Brezhnev Doctrine).',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
