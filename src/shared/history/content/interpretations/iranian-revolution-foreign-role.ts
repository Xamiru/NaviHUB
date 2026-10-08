import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iranian-revolution-foreign-role',
  about: ['event:iranian-revolution'],
  topic: 'foreign-role',
  positions: [
    {
      id: 'huyser-mission-and-american-plots',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'On the eighth of Bahman[January 28, 1979] – a few days before Imam (r.a.) entered the country. General Huyser, who was America’s agent, came to Iran so that he could maybe save and preserve the regime from the danger of the Revolution.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-us-enmity-against-the-iranian-nation',
            loc: {
              section: 'Does U.S. enmity against the Iranian nation stem from the 1979 Revolution?',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/7155/Does-U-S-enmity-against-the-Iranian-nation-stem-from-the-1979'
          }
        },
        {
          id: 'q2',
          text: 'They went and captured the U.S. embassy and it became clear that that embassy was a Den of Espionage.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-us-enmity-against-the-iranian-nation',
            loc: {
              section: 'Does U.S. enmity against the Iranian nation stem from the 1979 Revolution?',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/7155/Does-U-S-enmity-against-the-Iranian-nation-stem-from-the-1979'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'Many royalists adduced two major pieces of “hard evidence” for this theory: General Robert Huyser’s secret mission to Persia in January 1979, allegedly to neutralize the Persian armed forces, and the Guadeloupe summit meeting on 14 January 1979, at which Western powers supposedly decided to replace the shah with an Islamic regime.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'abandoned-by-the-west',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Imperial State of Iran' },
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Huyser succeeded in winning over my last chief of staff, General Ghara-Baghi, whose later behavior leads me to believe that he was a traitor. He asked Ghara-Baghi to arrange a meeting for him with Behdi Bazargan, the human-rights lawyer who became Khomeini\'s first Prime Minister. The General informed me of Huyser’s request before I left, but I have no idea of what ensued. I do know that Ghara-Baghi used his authority to prevent military action against Khomeini.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q4',
          text: 'By the time Huyser left Iran, the army had been destroyed and the Bakhtiar government he had supposedly come to save was in shambles.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q5',
          text: 'I do not believe that this convergence of forces represented an organized plot against me in which each part meshed with the others. But clearly all the forces involved had their own reasons for pushing me offstage.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q12',
          text: 'The most important complex of conspiracy theories involving the United States is focused on the notion that the Persian revolution was masterminded by the Carter administration, either to create a barrier to the southward movement of the Soviet Union or to prevent Persia from becoming a major power.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'bbc-and-the-british-hand',
      category: 'fringe',
      holders: [
        { kind: 'participant', name: 'Ashraf Pahlavi' },
        { kind: 'public', name: 'Older upper- and middle-class Iranians' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'these riots took place during a steady campaign of biased anti-Shah news reports by the BBC, almost a reprise of the attacks made on my father a few decades earlier.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'In contemporary social psychology such theories are defined as elaborate and internally consistent systems of “collective delusions,” often tenaciously held and extremely difficult to refute',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        },
        {
          id: 'q8',
          text: 'The notion of an anti-Persian conspiracy led by the British reappeared during the Revolution of 1357 Š./1979. The anti-American tone of the revolution and regular daily broadcasting by the British Broadcasting Corporation (B.B.C.) of news about events left the shah in no doubt (M. R. Pahlavi, 1980, p. 15), and many older Persians of the upper and middle classes also believed that British agents had stage-managed the revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'two-american-assessments',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Richard W. Cottam' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'Two sharply opposed assessments emerged within the administration regarding the nature of the revolutionary forces and the significance of the revolution for American strategic interests. One view, associated with officials in the Department of State, was that the revolution was essentially an internal manifestation of dissatisfaction with the royal autocratic rule and not connected closely with any external forces (Sick, 1985a, pp. 68-70).',
          lang: 'en',
          cite: {
            source: 'iranica-cottam-carter-administration',
            loc: { section: 'CARTER ADMINISTRATION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/carter-administration-1977-81-policy-toward-persia/'
          }
        }
      ]
    },
    {
      id: 'huyser-and-brzezinski',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'The United States had continued to supply the shah with military aid and equipment as the final stages of the revolution unfolded, and, on 4 January 1979, General Robert Huyser of the U.S. Central Command had come to Tehran in order to assess the possibility of crushing the revolution militarily, a course of action favored by Zbigniew Brzezinski, National Security Adviser',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '66' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      id: 'american-ties-seen-as-subservience',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'The banishment of its most forceful leader, Ruḥ-Allāh Khomeini, to Iraq did not weaken the movement, contrary to the Persian government’s expectations. It was, in fact, strengthened by the increasing involvement of the government with the United States and the purchase of enormous amount of armament from that country',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
