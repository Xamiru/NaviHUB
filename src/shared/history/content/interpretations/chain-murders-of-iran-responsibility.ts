import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'chain-murders-of-iran-responsibility',
  about: ['event:chain-murders-of-iran'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'Speculation about where the ultimate responsibility for the killings lay played a direct role in the year\'s most traumatic incidents of political violence, the student protests of July and their suppression by a combination of uniformed and irregular forces.',
    lang: 'en',
    cite: {
      source: 'hrw-2000-world-report-iran',
      loc: { section: 'World Report 2000: Iran', para: '7' }
    },
    provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
  },
  positions: [
    {
      id: 'judiciary-domestic-and-external-hands',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Judiciary of the Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q2',
          text: '"domestic and external hands"',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'Salām ran a front page report which claimed that amending the press law had been recommended by Saʿid Eslāmi, also known as Emāmi, a senior Intelligence Ministry official who had been named as the chief culprit in the assassinations of the Foruhars, Moḵtāri, and Puyandeh, and who had later been officially reported to have committed suicide while in prison.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        }
      ]
    },
    {
      id: 'hrw-the-state-is-implicated',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'However, although senior officials repeatedly promised an open trial of the suspects, no trial had started by the end of the year.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
