import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'operation-eagle-claw-outcome',
  about: ['event:operation-eagle-claw'],
  topic: 'outcome',
  positions: [
    {
      id: 'carter-equipment-failure',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Jimmy Carter', ref: 'person:jimmy-carter' },
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Late yesterday, I cancelled a carefully planned operation which was underway in Iran to position our rescue team for later withdrawal of American hostages, who have been held captive there since November 4. Equipment failure in the rescue helicopters made it necessary to end the mission.',
          lang: 'en',
          cite: {
            source: 'carter-1980-04-25-statement-on-the-iran-rescue-mission',
            loc: { section: 'April 25, 1980: Statement on the Iran Rescue Mission', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-25-1980-statement-iran-rescue-mission'
          }
        },
        {
          id: 'q2',
          text: 'There was no fighting; there was no combat.',
          lang: 'en',
          cite: {
            source: 'carter-1980-04-25-statement-on-the-iran-rescue-mission',
            loc: { section: 'April 25, 1980: Statement on the Iran Rescue Mission', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-25-1980-statement-iran-rescue-mission'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'The rescue mission was aborted, however, during the first phase of the operation after three helicopters malfunctioned.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'iranian-conspiracy-theories',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Iranian commentators' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'One theory was that the mission was part of a conspiracy to topple the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'vance-opposed-the-use-of-force',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Cyrus Vance' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'After all, he had opposed “the use of any military force, including a blockade or mining, as long as the hostages were unharmed and in no imminent danger”',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
