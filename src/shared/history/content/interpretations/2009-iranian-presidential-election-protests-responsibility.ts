import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '2009-iranian-presidential-election-protests-responsibility',
  about: ['event:2009-iranian-presidential-election-protests'],
  topic: 'responsibility',
  positions: [
    {
      id: 'opposition-candidates-the-voting-was-rigged',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mir Hossein Mousavi', ref: 'person:mir-hossein-mousavi' },
        { kind: 'participant', name: 'Mehdi Karroubi' },
        { kind: 'participant', name: 'Mohsen Rezaii' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Rival candidates\' accusations of official favoritism and electoral meddling by the government came to a head on election day.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        }
      ]
    },
    {
      id: 'khamenei-the-protests-must-end',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Following an uncompromising demand by Ayatollah Ali Khamenei, Iran\'s supreme leader, during his June 19 sermon that the protests against the country\'s disputed elections must end and that reformist political leaders would be blamed for any violence, Iran\'s security forces began a major crackdown on public protests starting Saturday, June 20.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
            loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2009/06/23/iran-violent-crackdown-protesters-widens'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'The demonstrations were overwhelmingly peaceful.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        }
      ]
    },
    {
      id: 'officials-foreign-powers-instigated-the-protests',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The government accused foreign media and governments of instigating demonstrations after the contested presidential election in mid-June, expelled most foreign correspondents, and arrested Iranian nationals employed in the British embassy in Tehran.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-iran',
            loc: { section: 'World Report 2010: Iran', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/iran'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Although some protestors engaged in acts of vandalism, the demonstrators were overwhelmingly peaceful.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-02-11-the-islamic-republic-at-31-post-election-abuses',
            loc: { section: 'The Islamic Republic at 31', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2010/02/11/islamic-republic-31/post-election-abuses-show-serious-human-rights-crisis'
          }
        }
      ]
    },
    {
      id: 'state-radio-the-gathering-was-unauthorized-and-attacked-a-military-post',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran (state radio)' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'On June 16, 2009, Iranian state radio reported that seven people died the night before, during a gathering in Tehran to protest alleged fraud in the victory of Mahmoud Ahmadinejad in the June 12 presidential elections.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-06-18-iran-investigate-protester-deaths',
            loc: { section: 'Iran: Investigate Protester Deaths' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2009/06/18/iran-investigate-protester-deaths'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'A source at Rasool-e-Akram hospital in Tehran told Human Rights Watch that nine persons died after the June 15 protests, three are in coma, and 40 others are in a critical condition.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-06-18-iran-investigate-protester-deaths',
            loc: { section: 'Iran: Investigate Protester Deaths' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2009/06/18/iran-investigate-protester-deaths'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
