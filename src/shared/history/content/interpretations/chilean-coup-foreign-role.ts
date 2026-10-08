import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'chilean-coup-foreign-role',
  about: ['event:1973-chilean-coup'],
  topic: 'foreign-role',
  framing: {
    id: 'q1',
    text: 'Debate continues on whether the United States provided direct support for Pinochet’s coup.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-allende-and-the-pinochet-coup',
      loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '13' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-09',
      url: 'https://history.state.gov/milestones/1969-1976/allende'
    }
  },
  positions: [
    {
      id: 'oh-no-direct-evidence',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The report found that the United States had carried out covert actions in Chile during these years and had even considered a proposal for Track II, a covert action meant to organize a military coup to prevent Allende coming to power. However, it concluded that there was little evidence to link the U.S. Government to covert support of Pinochet’s coup.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-and-the-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        }
      ]
    },
    {
      id: 'loc-actions-contributed',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Most scholars have concluded that these United States actions contributed to the downfall of Allende, although no one has established direct United States participation in the coup d\'état and very few would assign the United States the primary role in the destruction of that government.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q4',
          text: 'Critics of the right accused Popular Unity, in conjunction with the United States, of ruining the economy and of calling out the armed forces to protect its property and privileges.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        }
      ]
    },
    {
      id: 'allende-foreign-capital',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Salvador Allende', ref: 'person:salvador-allende' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'En este momento definitivo, el último en que yo pueda dirigirme a ustedes, quiero que aprovechen la lección: el capital foráneo, el imperialismo, unido a la reacción, creó el clima para que las Fuerzas Armadas rompieran su tradición, la que les enseñara el Schneider y reafirmara el comandante Araya, víctimas del mismo sector social que hoy estará en sus casas esperando con mano ajena, reconquistar el poder para seguir defendiendo sus granjerías y sus privilegios.',
          lang: 'es',
          cite: { source: 'allende-1973-ultimas-palabras', loc: { section: 'Últimas palabras' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/espanol/allende/1973/11-09-73.htm'
          },
          translation: {
            text: 'At this definitive moment, the last moment when I can address you, I wish you to take advantage of the lesson: foreign capital, imperialism, together with the reaction, created the climate in which the Armed Forces broke their tradition, the tradition taught by General Schneider and reaffirmed by Commander Araya, victims of the same social sector which will today be in their homes hoping, with foreign assistance, to retake power to continue defending their profits and their privileges.',
            lang: 'en',
            cite: {
              source: 'allende-1973-last-words-to-the-nation-furuhashi',
              loc: { section: 'Last Words to the Nation' }
            },
            provenance: {
              via: 'web',
              at: '2026-10-09',
              url: 'https://www.marxists.org/archive/allende/1973/september/11.htm'
            }
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
