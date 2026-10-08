import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'helsinki-accords-significance',
  about: ['event:helsinki-accords'],
  topic: 'significance',
  positions: [
    {
      id: 'participating-states-final-act',
      category: 'official',
      holders: [
        {
          kind: 'organization',
          name: 'Conference on Security and Co-operation in Europe (participating States)'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'They will promote and encourage the effective exercise of civil, political, economic, social, cultural and other rights and freedoms all of which derive from the inherent dignity of the human person and are essential for his free and full development.',
          lang: 'en',
          cite: {
            source: 'csce-1975-helsinki-final-act',
            loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Helsinki_Final_Act'
          }
        },
        {
          id: 'q2',
          text: 'Within this framework the participating States will recognize and respect the freedom of the individual to profess and practice, alone or in community with others, religion or belief acting in accordance with the dictates of his own conscience.',
          lang: 'en',
          cite: {
            source: 'csce-1975-helsinki-final-act',
            loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Helsinki_Final_Act'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'The Vienna Review Meeting introduced recognition of the rights of emigration and religious freedom, which helped to open ties between Eastern and Western Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        }
      ]
    },
    {
      id: 'oh-border-recognition-and-human-rights-basket',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The Soviet Union first sought a European conference on security issues in 1954 at the Geneva Conference in the hopes that such a meeting would result in formal recognition of the political boundaries in Eastern Europe that had been established after World War II. At that time, the United States and the other Western nations were reluctant to engage in such a discussion because they feared that it might strengthen the Soviet position and lead to an expansion of communism. As a result, no progress was made through the 1950s and 1960s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        },
        {
          id: 'q4',
          text: 'Some activists opposed the Western concession on boundaries that resulted in a formal acceptance of the Soviet annexation of Estonia, Latvia and Lithuania, effectively acknowledging Soviet domination of Eastern Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        },
        {
          id: 'q5',
          text: 'In spite of such criticism, the third basket on human rights and freedoms ultimately proved to be important to dissidents in Eastern Europe and the Soviet Union. To follow the progress of the USSR in implementing the human rights stipulations established in the Act, human rights activists set up Helsinki Monitoring Groups in the Soviet Union and across Europe. These groups tracked violations of the Act and drew international attention to human rights violations. Furthermore, the Belgrade follow-up meeting introduced a review process to track violators of the Helsinki Final Act and hold them accountable. Together these measures enabled dissidents to act and speak more openly than would otherwise have been possible.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
