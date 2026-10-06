import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'second-anglo-afghan-war-causes',
  about: ['event:second-anglo-afghan-war'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'keep-russia-from-india',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ludwig W. Adamec' },
        { kind: 'scholar', name: 'James Alfred Norris' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The British objective was to impose advice and a military presence on Afghanistan in order to keep the Russians far from India.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q2',
          text: 'Šēr ʿAlī committed himself to the Russians just enough to destroy his credit with the British; he refused to receive the British mission and was sent an ultimatum, to which he never replied.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        }
      ]
    },
    {
      id: 'british-control-and-forward-policy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Daniel Balland' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The English wanted to control Afghan politics directly by installing a permanent diplomatic mission at Kabul (since the Treaty of Peshawar, only an Indian Moslem wakīl represented British interests).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        },
        {
          id: 'q4',
          text: 'As a result the British pressed even harder to receive the same treatment, and the amir’s hesitations were interpreted as proof of Russian interference in Afghan affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      id: 'russian-mission',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'That same summer, Russia sent an uninvited diplomatic mission to Kabul.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        },
        {
          id: 'q6',
          text: 'Lord Lytton, the viceroy, called Sher Ali\'s bluff and ordered a diplomatic mission to set out for Kabul on November 21, 1878.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        }
      ]
    }
  ]
})
