import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'rwandan-genocide-international-response',
  about: ['event:rwandan-genocide'],
  topic: 'foreign-role',
  framing: {
    id: 'q1',
    text: 'Policymakers in France, Belgium, and the United States and at the United Nations all knew of the preparations for massive slaughter and failed to take the steps needed to prevent it.',
    lang: 'en',
    cite: {
      source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
      loc: { section: 'Introduction', para: '9' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-10',
      url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-01.htm'
    }
  },
  positions: [
    {
      id: 'united-states-clinton-kigali',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Bill Clinton', ref: 'person:bill-clinton' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The international community, together with nations in Africa, must bear its share of responsibility for this tragedy, as well. We did not act quickly enough after the killing began. We should not have allowed the refugee camps to become safe haves for the killers. We did not immediately call these crimes by their rightful name: genocide.',
          lang: 'en',
          cite: {
            source: 'white-house-1998-03-25-remarks-to-genocide-survivors-kigali',
            loc: { section: 'Remarks to Genocide Survivors, Kigali', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse3.archives.gov/Africa/19980325-16872.html'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'Unwilling to confront its own responsibility, the United States did not investigate its past record but instead funded social scientists to develop models to predict when and where genocides might occur in the future.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-leave-none-to-tell-the-story-ten-years-later',
            loc: { section: 'Ten Years Later', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/10years.htm'
          }
        },
        {
          id: 'q4',
          text: 'With the failure in Somalia still very much in the minds of American policymakers, neither the United States nor the United Nations moved aggressively to stop the slaughter.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
          }
        }
      ]
    },
    {
      id: 'human-rights-watch-inertia',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'When international leaders did finally voice disapproval, the genocidal authorities listened well enough to change their tactics although not their ultimate goal.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
            loc: { section: 'Introduction', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-01.htm'
          }
        },
        {
          id: 'q6',
          text: 'Thus the study establishes that the international community, so anxious to absent itself from the scene, was in fact present at the genocide.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-leave-none-to-tell-the-story-introduction',
            loc: { section: 'Introduction', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1999/rwanda/Geno1-3-01.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
