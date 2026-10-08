import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'sabra-and-shatila-massacre-responsibility',
  about: ['event:sabra-and-shatila-massacre'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'Citing a need to prevent civil disorder, the IDF entered West Beirut.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-reagan-administration-and-lebanon',
      loc: { section: 'The Reagan Administration and Lebanon, 1981–1984', para: '7' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://history.state.gov/milestones/1981-1988/lebanon'
    }
  },
  positions: [
    {
      id: 'kahan-commission-personal-responsibility',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Kahan Commission (Israeli commission of inquiry)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'If in fact the Defense Minister, when he decided that the Phalangists would enter the camps without the I.D.F. taking part in the operation, did not think that that decision could bring about the very disaster that in fact occurred, the only possible explanation for this is that he disregarded any apprehensions about what was to be expected because the advantages . . . to be gained from the Phalangists´ entry into the camps distracted him from the proper consideration in this instance.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        },
        {
          id: 'q3',
          text: 'In our view, the Minister of Defense made a grave mistake when he ignored the danger of acts of revenge and bloodshed by the Phalangists against the population in the refugee camps.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        }
      ]
    },
    {
      id: 'human-rights-watch-war-crimes',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Human Rights Watch takes the position that what happened at the Sabra and Shatilla refugee camps constitute war crimes and crimes against humanity, and that all those responsible need to be brought to justice.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        }
      ]
    },
    {
      id: 'us-administration-1982',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'We strongly opposed Israel\'s move into west Beirut following the assassination of President-elect Gemayel, both because we believed it wrong in principle and for fear that it would provoke further fighting.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1982-09-18-statement-on-murder-of-palestinian-refugees-in-lebanon',
            loc: {
              section: 'Statement on the Murder of Palestinian Refugees in Lebanon',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-murder-palestinian-refugees-lebanon'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'During the BBC program, Morris Draper, the U.S. Special Envoy to the Middle East at the time, said that U.S. officials were horrified when told Sharon had allowed Phalange militias into West Beirut and the camps “because it would be a massacre.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
