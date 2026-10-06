import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'congress-of-berlin-outcome',
  about: ['event:congress-of-berlin'],
  topic: 'outcome',
  researched: '2026-10-06',
  positions: [
    {
      id: 'menace-removed',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Earl of Beaconsfield', ref: 'person:benjamin-disraeli' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Our present contention is that we can show that, by the changes and modifications which have been made in the Treaty of San Stefano by the Congress of Berlin and by the Convention of Constantinople, the menace to European independence has been removed, and the threatened injury to the British Empire has been averted.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1878-07-18-congress-of-berlin',
            loc: { section: 'HL Deb 18 July 1878 vol 241 cc1753-843', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1878/jul/18/congress-correspondence-and-protocols'
          }
        }
      ]
    },
    {
      id: 'all-russia-wished',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Earl Granville' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'I really cannot understand how this Treaty of Berlin can be considered in any other light than giving to Russia all that she really wished or ever expected to have.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1878-07-18-congress-of-berlin',
            loc: { section: 'HL Deb 18 July 1878 vol 241 cc1753-843', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1878/jul/18/congress-correspondence-and-protocols'
          }
        }
      ]
    },
    {
      id: 'short-of-liberation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The final provisions for Bulgarian liberation fell far short of the goals of the national liberation movement.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'BULGARIAN INDEPENDENCE', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/10.htm' }
        }
      ]
    },
    {
      id: 'russian-displeasure',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Deutsches Historisches Museum' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Aus Verärgerung über die Ergebnisse des Berliner Kongresses 1878 schreibt Zar Alexander II. (1818-1881) den von Bismarck als "Ohrfeigenbrief" titulierten Brief an Wilhelm I., in dem sich der russische Zar über die neutrale Haltung Bismarcks beklagt.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1879', loc: { section: 'Chronik 1879', para: '41' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1879.html'
          }
        }
      ]
    }
  ]
})
