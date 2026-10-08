import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iranian-cultural-revolution-purpose',
  about: ['event:iranian-cultural-revolution'],
  topic: 'motives',
  positions: [
    {
      id: 'islamization-of-the-universities',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Supreme Council of the Cultural Revolution' },
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Culture, in the meantime, enjoys a unique status so that it is impossible to imagine a change in governing system without a change in governing culture.',
          lang: 'en',
          cite: {
            source: 'sccr-history',
            loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20250208220322/https://sccr.ir/pages/10257/2'
          }
        },
        {
          id: 'q2',
          text: 'It is for some time the need for cultural revolution – that is an Islamic issue requested by the Muslim nation – has been highlighted but little has been done in this regard. The Muslim nation, especially the faithful and dedicated university students are concerned about this. They have also expressed concerns on sabotage of the conspirators, instances of which raises its head now and then. The Muslim nation are worried the chance might be missed without any positive work, so that the culture might remain the same as in the past corrupt regime. During the past regime, this fundamentally important center had been put at the disposal of the colonial powers by uncultured and uneducated employers. Sustainability of this catastrophe that is the wish of some groups affiliated to foreign powers, will send a deadly shock throughout the Islamic Revolution and Islamic Republic of Iran. Any moderation in this vital issue is a grave treachery against Islam and against this Muslim country.”',
          lang: 'en',
          cite: {
            source: 'sccr-history',
            loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20250208220322/https://sccr.ir/pages/10257/2'
          }
        },
        {
          id: 'q3',
          text: 'Avoiding influence of Western culture by advancing influence and empowerment of constructive Islamic and national culture, and establishing cultural revolution in all fields across the country require so much effort and endeavor that long years must be spent on fighting the deeply rooted influence of the West.',
          lang: 'en',
          cite: {
            source: 'sccr-history',
            loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20250208220322/https://sccr.ir/pages/10257/2'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'In the first phase the administrators of the educational system were thus charged with creating a “new Muslim person,” imbued with Islamic and revolutionary values.',
          lang: 'en',
          cite: {
            source: 'iranica-mehran-education-postrevolutionary',
            loc: {
              section: 'EDUCATION xxiv. EDUCATION IN POSTREVOLUTIONARY PERSIA, 1979-95',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/education-xxiv-education-in-postrevolutionary-persia-1979-95/'
          }
        },
        {
          id: 'q8',
          text: 'In fact, the four ideological pillars of the Islamic Republic, inseparability of religion and politics, Islamic revival, cultural revolution, and creation of the new Islamic person, had a direct impact on Persian education in the early revolutionary period.',
          lang: 'en',
          cite: {
            source: 'iranica-mehran-education-postrevolutionary',
            loc: {
              section: 'EDUCATION xxiv. EDUCATION IN POSTREVOLUTIONARY PERSIA, 1979-95',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/education-xxiv-education-in-postrevolutionary-persia-1979-95/'
          }
        }
      ]
    },
    {
      id: 'narrower-than-its-chinese-namesake',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The term “cultural revolution” inevitably calls to mind the wave of persecutions that raged in China from 1966 to 1976, but the purpose of its Iranian namesake was narrower, as explained by Khomeini: To adapt the educational system to the priorities and worldview of the Islamic Revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '77' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      id: 'purge-of-the-insufficiently-islamic',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The universities then were purged of professors and students considered insufficiently Islamic and were not completely reopened until the fall of 1983.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/61.htm' }
        }
      ]
    },
    {
      id: 'banisadrs-contemporary-view',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Abolhassan Banisadr', ref: 'person:abolhassan-banisadr' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The universities were closed and the official thinking was that this would consolidate support among educated people. This has not occurred: if he opens the universities, they will become centers of opposition.',
          lang: 'en',
          cite: {
            source: 'merip-1981-bani-sadr-interview',
            loc: { section: '“I Defeated the Ideology of the Regime”', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.merip.org/1981/10/i-defeated-the-ideology-of-the-regime/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
