import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'end-of-apartheid-credit',
  about: ['event:end-of-apartheid'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'Inside South Africa, riots, boycotts, and protests by black South Africans against white rule had occurred since the inception of independent white rule in 1910.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-the-end-of-apartheid',
      loc: { section: 'The End of Apartheid', para: '4' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-10',
      url: 'https://history.state.gov/milestones/1989-1992/apartheid'
    }
  },
  positions: [
    {
      id: 'south-african-government-reform-from-within',
      category: 'official',
      holders: [
        { kind: 'state', name: 'South African government' },
        { kind: 'participant', name: 'F. W. de Klerk' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The general election on September the 6th, 1989, placed our country irrevocably on the road of drastic change.',
          lang: 'en',
          cite: {
            source: 'gov-za-1990-02-02-de-klerk-address-at-the-opening-of-parliament',
            loc: {
              section: 'Address by the State President at the opening of Parliament, 2 February 1990',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.gov.za/node/538196' }
        },
        {
          id: 'q3',
          text: 'The new situation in Eastern Europe also shows that foreign intervention is no recipe for domestic change.',
          lang: 'en',
          cite: {
            source: 'gov-za-1990-02-02-de-klerk-address-at-the-opening-of-parliament',
            loc: {
              section: 'Address by the State President at the opening of Parliament, 2 February 1990',
              para: '16'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.gov.za/node/538196' }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Township revolt and repeated states of emergency showed the state could not restore order, while international sanctions, disinvestment and economic decline weakened the government.',
          lang: 'en',
          cite: {
            source: 'saho-the-coming-of-democracy-and-coming-to-terms-with-the-past',
            loc: { section: 'The Coming of Democracy and Coming to Terms with the Past' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sahistory.org.za/classroom/grade-12/coming-democracy-and-coming-terms-past'
          }
        },
        {
          id: 'q5',
          text: 'The international community used trade sanctions and investment embargoes as their weapon to put pressure on the Apartheid state: Between 1970 and 1984 foreign investment began to decline, dropping by 30%.',
          lang: 'en',
          cite: {
            source: 'saho-in-summary-factors-resulting-in-the-crisis',
            loc: { section: 'In summary: Factors resulting in the crisis' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sahistory.org.za/article/summary-factors-resulting-crisis'
          }
        }
      ]
    },
    {
      id: 'african-national-congress-mass-action',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'African National Congress' },
        { kind: 'participant', name: 'Nelson Mandela', ref: 'person:nelson-mandela' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Today, the majority of South Africans, black and white, recognize that apartheid has no future.',
          lang: 'en',
          cite: {
            source: 'fordham-sourcebook-mandela-1990-speech-on-release-from-prison',
            loc: { section: 'Speech on Release from Prison, 1990', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sourcebooks.web.fordham.edu/mod/1990MANDELA.asp'
          }
        },
        {
          id: 'q7',
          text: 'The largescale mass mobilization of the past few years is one of the key factors which led to the opening of the final chapter of our struggle.',
          lang: 'en',
          cite: {
            source: 'fordham-sourcebook-mandela-1990-speech-on-release-from-prison',
            loc: { section: 'Speech on Release from Prison, 1990', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sourcebooks.web.fordham.edu/mod/1990MANDELA.asp'
          }
        },
        {
          id: 'q8',
          text: 'On this occasion, we thank the world, we thank the world community for their great contribution to the anti-apartheid struggle.',
          lang: 'en',
          cite: {
            source: 'fordham-sourcebook-mandela-1990-speech-on-release-from-prison',
            loc: { section: 'Speech on Release from Prison, 1990', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sourcebooks.web.fordham.edu/mod/1990MANDELA.asp'
          }
        }
      ]
    },
    {
      id: 'office-of-the-historian-sanctions-and-the-end-of-the-cold-war',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'However, by the late 1970s, grassroots movements in Europe and the United States succeeded in pressuring their governments into imposing economic and cultural sanctions on Pretoria.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        },
        {
          id: 'q10',
          text: 'When South Africa reached a multilateral agreement in 1988 to end its occupation of Namibia in return for a Cuban withdrawal from Angola, even the most ardent anti-communists in the United States lost their justification for support of the Apartheid regime.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-end-of-apartheid',
            loc: { section: 'The End of Apartheid', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/apartheid'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
