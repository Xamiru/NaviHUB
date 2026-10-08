import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'german-democratic-republic-legitimacy',
  about: ['polity:german-democratic-republic'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'one-indivisible-german-republic',
      category: 'official',
      holders: [
        { kind: 'state', name: 'German Democratic Republic' }
      ],
      statements: [
        {
          id: 'q1',
          text: '(1) Deutschland ist eine unteilbare demokratische Republik; sie baut sich auf den deutschen Ländern auf.',
          lang: 'de',
          cite: { source: 'documentarchiv-verfassung-der-ddr-1949', loc: { section: 'Artikel 1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'http://www.documentarchiv.de/ddr/verfddr1949.html'
          }
        },
        {
          id: 'q2',
          text: '(4) Es gibt nur eine deutsche Staatsangehörigkeit.',
          lang: 'de',
          cite: { source: 'documentarchiv-verfassung-der-ddr-1949', loc: { section: 'Artikel 1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'http://www.documentarchiv.de/ddr/verfddr1949.html'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'West Germany joined the Western community of nations, while East Germany became the westernmost part of the Soviet empire.',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '15' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    },
    {
      id: 'frg-sole-legitimate-successor',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Despite this step taken to deal with the reality of the German situation, the United States continued until German reunification in 1990 to view the FRG as the sole legitimate successor government of the historical German state and a future reunified Germany.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-german-democratic-republic',
            loc: { section: 'East Germany (German Democratic Republic): Summary', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/german-democratic-republic'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'untries in the summer and fall of 1989, particularly through Hungary, was telling evidence that the GDR did not have the support of its citizens',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '20' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    },
    {
      id: 'artificial-entity',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Unlike West Germany, East Germany was not freely supported by its citizens. Indeed, force was needed to keep East Germans from fleeing to the West. Although some consolidation of the GDR was assured by the construction of the Berlin Wall, the GDR remained an artificial entity maintained by Soviet military power. Once this support was withdrawn, the GDR collapsed.',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '17' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    }
  ]
})
