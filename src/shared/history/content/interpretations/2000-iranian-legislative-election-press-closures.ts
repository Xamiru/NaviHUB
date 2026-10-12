import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '2000-iranian-legislative-election-press-closures',
  about: ['event:2000-iranian-legislative-election'],
  topic: 'motives',
  positions: [
    {
      id: 'khamenei-bases-of-the-enemy',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Supreme Leader Ayatollah Khamenei, while endorsing "the free flow of information," openly condoned the action taken against the press accusing some un-named titles of being "bases of the enemy."',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'Conservatives mounted a concerted campaign to close independent newspapers in order to weaken the reformists\' influence.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        }
      ]
    },
    {
      id: 'jannati-the-best-thing-the-judiciary-had-done',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ahmad Jannati' },
        { kind: 'state', name: 'Council of Guardians of the Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Ayatollah Jannati, a member of the Council of Guardians, remarked that closing down the newspapers was "the best thing the judiciary had done since the revolution."',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Conservatives used their control over powerful state institutions, most importantly the judiciary, to intimidate and silence supporters of greater political freedom.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-iran',
            loc: { section: 'World Report 2001: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k1/mideast/iran.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
