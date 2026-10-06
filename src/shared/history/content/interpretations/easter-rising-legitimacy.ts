import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'easter-rising-legitimacy',
  about: ['event:easter-rising'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'treacherous-rebellion',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'General Sir John Maxwell' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'These rebels wore no uniform, and the man who was shooting at a soldier one minute might, for all he knew, be walking quietly beside him in the street at another … Nearly everything had to be left to the troops on the spot … how were the soldiers to discriminate? They saw their comrades killed beside them by hidden and treacherous assailants, and it is even possible that under the horrors of this peculiar attack some of them “saw red.” That is the inevitable consequence of a rebellion of this kind.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'The Battle for Dublin', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    },
    {
      id: 'clean-fight',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'The rebels' },
        { kind: 'public', name: 'Nationalist opinion' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Significantly, it was the rebels’ belief that they had fought “in a fair and clean manner” that came to be widely shared by nationalist opinion.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'The Battle for Dublin', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        },
        {
          id: 'q3',
          text: 'As the Irish Party leader, John Dillon (1851-1927), told the government in the House of Commons while the executions were continuing, “You are washing out our whole life work in a sea of blood.”',
          lang: 'en',
          cite: { source: 'eo1418-mcgarry-easter-rising', loc: { section: 'Conclusion', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    },
    {
      id: 'symbolic-gesture-not-blood-sacrifice',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Fearghal McGarry' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Although prepared to die for Ireland, there is little to suggest that IRB conspirators like Tom Clarke or Seán MacDermott (1883-1916) willingly sought martyrdom despite the subsequent myth of the Rising as a “blood sacrifice.”',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Rationale and Ideology', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        },
        {
          id: 'q5',
          text: 'The British Army, rather than the rebels, were responsible for most of the civilian fatalities.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'The Battle for Dublin', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    }
  ]
})
