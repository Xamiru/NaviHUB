import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nixons-visit-to-china-taiwan-formula',
  about: ['event:nixons-visit-to-china'],
  topic: 'other',
  positions: [
    {
      id: 'prc-one-china-position',
      category: 'official',
      holders: [
        { kind: 'state', name: 'People’s Republic of China' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Chinese side reaffirmed its position: The Taiwan question is the crucial question obstructing the normalization of relations between China and the United States; the Government of the People’s Republic of China is the sole legal government of China; Taiwan is a province of China which has long been returned to the motherland; the liberation of Taiwan is China’s internal affair in which no other country has the right to interfere; and all U.S. forces and military installations must be withdrawn from Taiwan.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
            loc: {
              section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v17/d203'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Over the course of the talks, Mao and Zhou made clear to Nixon that their country would not normalize relations with the United States as long as Washington continued formal diplomatic relations with Taiwan; Nixon stated that the United States did not support Taiwanese independence.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        }
      ]
    },
    {
      id: 'us-acknowledgement-position',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States of America' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The U.S. side declared: The United States acknowledges that all Chinese on either side of the Taiwan Strait maintain there is but one China and that Taiwan is a part of China. The United States Government does not challenge that position. It reaffirms its interest in a peaceful settlement of the Taiwan question by the Chinese themselves. With this prospect in mind, it affirms the ultimate objective of the withdrawal of all U.S. forces and military installations from Taiwan. In the meantime, it will progressively reduce its forces and military installations on Taiwan as the tension in the area diminishes.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
            loc: {
              section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v17/d203'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Although the United States unsuccessfully opposed Taiwan’s expulsion from the General Assembly, it supported Communist China’s entrance and assumption of a seat on the Security Council; this contributed to a major diplomatic triumph for the People’s Republic of China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        }
      ]
    },
    {
      id: 'strategic-motives-of-both-sides',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The escalating war in Vietnam led U.S. officials to look for ways to improve relations with Communist governments in Asia in the hopes that such a policy might lessen future conflict, undermine alliances between Communist countries, diplomatically isolate North Vietnam, and increase U.S. leverage against the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        },
        {
          id: 'q4',
          text: 'Likewise, Sino-Soviet tension contributed to the Chinese leadership’s desire for a rapprochement with the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
