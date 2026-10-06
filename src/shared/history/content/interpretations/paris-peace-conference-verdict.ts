import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'paris-peace-conference-verdict',
  about: ['event:paris-peace-conference'],
  topic: 'legacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'carthaginian-peace',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Maynard Keynes' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'He portrayed Wilson as a ponderous Presbyterian bamboozled by Lloyd George, the “Welsh Wizard”, and bullied by Clemenceau, the formidable “Tiger”, into betraying his principles and creating a “Carthaginian peace”, intent on ruining Germany as effectively as Rome had destroyed Carthage in 146 BC.',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'While neither true, nor certainly a full account of how the settlement was reached – much of which was determined by the Council of Five – nonetheless the “Big Four” did confront the contentious issues.',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ]
    },
    {
      id: 'new-order-fouled-the-old',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Harold Nicolson' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Nicolson was typical of many Anglo-American participants when he declared, “We came to Paris convinced that the new order was about to be established; we left it convinced that the new order had merely fouled the old.”',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'Conclusion', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ]
    },
    {
      id: 'harsh-and-resented',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'According to French and British wishes, the Treaty of Versailles subjected Germany to strict punitive measures.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/paris-peace'
          }
        },
        {
          id: 'q5',
          text: 'Germans grew to resent the harsh conditions imposed by the Treaty of Versailles.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/paris-peace'
          }
        }
      ]
    },
    {
      id: 'more-sympathetic-appraisals',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Alan Sharp' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'This harsh judgement has been echoed by many subsequent historians, though the release of governmental archives from the 1960s onwards and recognition that the contemporary record of tackling ethnic nationalism and ideological extremism has not been brilliant, has prompted some more sympathetic appraisals.',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'Conclusion', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        },
        {
          id: 'q7',
          text: 'Yet the responsibility for this new catastrophe cannot be attributed to the peacemakers alone as they sought to remedy the ills that drove Europe to war in 1914. The settlements they reached were not perfect and contained potential seeds of further conflict but also offered the hope for a better future.',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'Conclusion', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ]
    },
    {
      id: 'next-world-war',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Vladimir Lenin', ref: 'person:vladimir-lenin' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Finally, he predicted that the treaty conditions prescribing the new European order would lead to the next world war.',
          lang: 'en',
          cite: {
            source: 'eo1418-ennker-lenin',
            loc: { section: 'Lenin and the Peace Treaties', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lenin-vladimir-ilich/'
          }
        }
      ]
    }
  ]
})
