import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'chernobyl-disaster-responsibility',
  about: ['event:chernobyl-disaster'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'The efforts to contain the accident and its attendant publicity were handled with exceptional ineptitude',
    lang: 'en',
    cite: {
      source: 'loc-russia-country-study-1996',
      loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '20' }
    },
    provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
  },
  positions: [
    {
      id: 'iaea-design-deficiencies',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'International Atomic Energy Agency' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In addition, the graphite blocks used as a moderating material in the RBMK caught fire at high temperature as air entered the reactor core, which contributed to emission of radioactive materials into the environment.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        },
        {
          id: 'q3',
          text: 'Just as important as the design safety work has been the focus on operational safety and on systems of regulatory oversight.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        }
      ]
    },
    {
      id: 'nrc-power-surge-during-test',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'U.S. Nuclear Regulatory Commission' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The NRC continues to conclude that many factors protect U.S. reactors against the combination of lapses that led to the accident at Chernobyl.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        }
      ]
    },
    {
      id: 'gorbachev-no-concealment',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Mikhail Gorbachev', ref: 'person:mikhail-gorbachev' },
        { kind: 'state', name: 'Soviet Union' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Thus, claims that the Politburo engaged in concealment of information about the disaster is far from the truth.',
          lang: 'en',
          cite: {
            source: 'gorbachev-2006-turning-point-at-chernobyl',
            loc: { section: 'VIEW: Turning point at Chernobyl', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
          }
        },
        {
          id: 'q6',
          text: 'In fact, nobody knew the truth, and that is why all our attempts to receive full information about the extent of the catastrophe were in vain.',
          lang: 'en',
          cite: {
            source: 'gorbachev-2006-turning-point-at-chernobyl',
            loc: { section: 'VIEW: Turning point at Chernobyl', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
          }
        },
        {
          id: 'q7',
          text: 'The accident at the Chernobyl nuclear power station was graphic evidence, not only of how obsolete our technology was, but also of the failure of the old system.',
          lang: 'en',
          cite: {
            source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
            loc: { section: 'Document 230', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1981-88v05/d230'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'Implicitly seeking to defend the Soviet record on providing information, Gorbachev (falsely) stated that the U.S. had taken 10 days to inform Congress and over a month to inform the IAEA about the accident at Three Mile Island.',
          lang: 'en',
          cite: {
            source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
            loc: { section: 'Document 230', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1981-88v05/d230'
          }
        }
      ]
    },
    {
      id: 'us-view-of-the-soviet-response',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'He offered not a word of self-criticism or apology to the Western European nations exposed to radiation from the accident.',
          lang: 'en',
          cite: {
            source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
            loc: { section: 'Document 230', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1981-88v05/d230'
          }
        },
        {
          id: 'q9',
          text: 'Unfounded accusations against others must not be used in an attempt to exonerate national officials from their obligation to inform the public promptly of accidents which may affect their health.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1986-05-14-speakes-statement-on-gorbachev-chernobyl-address',
            loc: { section: 'Statement on Gorbachev’s Address on Chernobyl', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/research/speeches/51486c'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
