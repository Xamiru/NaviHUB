import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-contra-affair-nature-and-responsibility',
  about: ['event:iran-contra-affair'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'It remains unclear how much President Reagan knew about the arms deal and its funding of the Contras.',
    lang: 'en',
    cite: {
      source: 'nara-text-message-2021-08-17-iran-contra-affair-faded-in-time',
      loc: { section: 'The Iran-Contra Affair: Faded in Time, but not Forgotten', para: '8' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://text-message.blogs.archives.gov/2021/08/17/iran-contra-affair/'
    }
  },
  positions: [
    {
      id: 'not-a-trade-for-hostages',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States (Reagan administration, 1986)' },
        { kind: 'participant', name: 'Ronald Reagan', ref: 'person:ronald-reagan' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The United States has not swapped boatloads or planeloads of American weapons for the return of American hostages. And we will not.',
          lang: 'en',
          cite: {
            source: 'reagan-library-1986-11-13-address-iran-arms-and-contra-aid-controversy',
            loc: {
              section: 'Address to the Nation on the Iran Arms and Contra Aid Controversy - November 13, 1986',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-iran-arms-and-contra-aid-controversy-november-13-1986'
          }
        },
        {
          id: 'q3',
          text: 'During the course of our secret discussions, I authorized the transfer of small amounts of defensive weapons and spare parts for defensive systems to Iran. My purpose was to convince Tehran that our negotiators were acting with my authority, to send a signal that the United States was prepared to replace the animosity between us with a new relationship.',
          lang: 'en',
          cite: {
            source: 'reagan-library-1986-11-13-address-iran-arms-and-contra-aid-controversy',
            loc: {
              section: 'Address to the Nation on the Iran Arms and Contra Aid Controversy - November 13, 1986',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-iran-arms-and-contra-aid-controversy-november-13-1986'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'These operations were the provision of assistance to the military activities of the Nicaraguan contra rebels during an October 1984 to October 1986 prohibition on such aid, and the sale of U.S. arms to Iran in contravention of stated U.S. policy and in possible violation of arms-export controls.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        },
        {
          id: 'q14',
          text: 'However, the abductions also sparked a strong personal reaction on the part of President Ronald Reagan, who despite public vows never to negotiate with terrorists, made clear to his aides that he intended to liberate the hostages regardless of the political consequences (Walsh, Final Report, vol. 1, p. 410; Reagan, pp. 490-92).',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        }
      ]
    },
    {
      id: 'strategic-opening-that-became-arms-for-hostages',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States (Reagan administration, 1987)' },
        { kind: 'participant', name: 'Ronald Reagan', ref: 'person:ronald-reagan' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'As the Tower board reported, what began as a strategic opening to Iran deteriorated, in its implementation, into trading arms for hostages.',
          lang: 'en',
          cite: {
            source: 'reagan-library-1987-03-04-address-iran-arms-and-contra-aid-controversy',
            loc: {
              section: 'Address to the Nation on the Iran Arms and Contra Aid Controversy March 4, 1987',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-iran-arms-and-contra-aid-controversy-0'
          }
        },
        {
          id: 'q6',
          text: 'As I told the Tower board, I didn\'t know about any diversion of funds to the contras.',
          lang: 'en',
          cite: {
            source: 'reagan-library-1987-03-04-address-iran-arms-and-contra-aid-controversy',
            loc: {
              section: 'Address to the Nation on the Iran Arms and Contra Aid Controversy March 4, 1987',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-iran-arms-and-contra-aid-controversy-0'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'The ignorance of the ``diversion\'\' asserted by President Reagan and his Cabinet officers on the National Security Council in no way absolves them of responsibility for the underlying Iran and contra operations.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        },
        {
          id: 'q12',
          text: 'The OIC could not prove that Reagan authorized or was aware of the diversion or that he had knowledge of the extent of North\'s control of the contra-resupply network.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        }
      ]
    },
    {
      id: 'independent-counsel-findings',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of Independent Counsel (Lawrence E. Walsh)' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'the Iran operations were carried out with the knowledge of, among others, President Ronald Reagan, Vice President George Bush, Secretary of State George P. Shultz, Secretary of Defense Caspar W. Weinberger, Director of Central Intelligence William J. Casey, and national security advisers Robert C. McFarlane and John M. Poindexter; of these officials, only Weinberger and Shultz dissented from the policy decision, and Weinberger eventually acquiesced by ordering the Department of Defense to provide the necessary arms',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        },
        {
          id: 'q8',
          text: 'following the revelation of these operations in October and November 1986, Reagan Administration officials deliberately deceived the Congress and the public about the level and extent of official knowledge of and support for these operations.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        }
      ]
    },
    {
      id: 'iranian-side-shared-responsibility',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Malcolm Byrne' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'On the Iranian side, then-Speaker of the Parliament ʿAli-Akbar Hāšemi Rafsanjāni reportedly brought senior leaders into the arms-for-hostages initiative out of a simple desire to share responsibility for it.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        },
        {
          id: 'q10',
          text: 'In short, all factions were represented, not just a supposed group of “moderates.”',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
