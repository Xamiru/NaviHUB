import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'german-hyperinflation-of-1923-causes',
  about: ['event:german-hyperinflation-of-1923'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'war-debts-and-reparations',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Inflation was fueled partly by the enormous wartime debts the imperial government had contracted rather than raise taxes to finance the war.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Problems of Parliamentary Politics', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/36.htm' }
        },
        {
          id: 'q2',
          text: 'Even more inflationary were the enormous war reparations demanded by the Allies, which made economic recovery seem impossible to many objective expert observers.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Problems of Parliamentary Politics', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/36.htm' }
        }
      ]
    },
    {
      id: 'war-finance-and-money-supply',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Michael Kunzel' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Seit Beginn des Ersten Weltkrieges 1914 vermehrte sich im Deutschen Reich die umlaufende Geldmenge und führte zu einer kontinuierlichen Geldwertverschlechterung und sinkender Kaufkraft.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
          }
        },
        {
          id: 'q4',
          text: 'Die Folge dieser Form der Kriegsfinanzierung war eine immense Staatsverschuldung.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
          }
        }
      ]
    },
    {
      id: 'financing-passive-resistance',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Michael Kunzel' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Auf den Einmarsch reagierte die Reichsregierung mit der Proklamation des passiven Widerstandes, die gesamte Bevölkerung an Rhein und Ruhr trat in den Streik. Für die finanzielle Unterstützung der Streikenden druckten die Notenpressen immer mehr Geldscheine.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-inflation-1923',
            loc: { section: 'Die Inflation', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/weimarer-republik/innenpolitik/inflation-1923.html'
          }
        }
      ]
    }
  ]
})
