import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'september-11-attacks-motives',
  about: ['event:september-11-attacks'],
  topic: 'motives',
  framing: {
    id: 'q1',
    text: 'Many Americans have wondered, "Why do \'they\' hate us?" Some also ask, "What can we do to stop these attacks?"',
    lang: 'en',
    cite: {
      source: 'national-commission-2004-9-11-commission-report-chapter-2',
      loc: { section: 'The Foundation of the New Terrorism', para: '25' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
    }
  },
  positions: [
    {
      id: 'al-qaeda-occupation-of-the-holy-places',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Al Qaeda' },
        { kind: 'participant', name: 'Osama bin Laden', ref: 'person:osama-bin-laden' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'First, for over seven years the United States has been occupying the lands of Islam in the holiest of places, the Arabian Peninsula, plundering its riches, dictating to its rulers, humiliating its people, terrorizing its neighbors, and turning its bases in the Peninsula into a spearhead through which to fight the neighboring Muslim peoples.',
          lang: 'en',
          cite: {
            source: 'world-islamic-front-1998-02-23-statement-urging-jihad-against-jews-and-crusaders',
            loc: { section: 'World Islamic Front Statement', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://irp.fas.org/world/para/docs/980223-fatwa.htm'
          }
        },
        {
          id: 'q3',
          text: 'Second, despite the great devastation inflicted on the Iraqi people by the crusader-Zionist alliance, and despite the huge number of those killed, which has exceeded 1 million... despite all this, the Americans are once against trying to repeat the horrific massacres, as though they are not content with the protracted blockade imposed after the ferocious war or the fragmentation and devastation.',
          lang: 'en',
          cite: {
            source: 'world-islamic-front-1998-02-23-statement-urging-jihad-against-jews-and-crusaders',
            loc: { section: 'World Islamic Front Statement', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://irp.fas.org/world/para/docs/980223-fatwa.htm'
          }
        }
      ]
    },
    {
      id: 'nine-eleven-commission-ideology',
      category: 'contemporary',
      holders: [
        {
          kind: 'organization',
          name: 'National Commission on Terrorist Attacks Upon the United States'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Bin Ladin shares Qutb\'s stark view, permitting him and his followers to rationalize even unprovoked mass murder as righteous defense of an embattled faith.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-2',
            loc: { section: 'The Foundation of the New Terrorism', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
          }
        },
        {
          id: 'q5',
          text: 'Bin Ladin also stresses grievances against the United States widely shared in the Muslim world.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
