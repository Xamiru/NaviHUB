import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'lewis-and-clark-expedition-significance',
  about: ['event:lewis-and-clark-expedition'],
  topic: 'significance',
  researched: '2026-10-08',
  positions: [
    {
      id: 'scientific-success',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Park Service' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'By any measure of scientific exploration, the Lewis and Clark Expedition—the nation’s first “road trip”—was phenomenally successful in terms of accomplishing its stated goals, expanding human knowledge, and spurring further curiosity and wonder about the American West.',
          lang: 'en',
          cite: {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
          }
        }
      ]
    },
    {
      id: 'rising-empire',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Like their contemporaries, Lewis and Clark were more than representatives of European rationalism. They also represented a rising American empire, one built on aggressive territorial expansion and commercial gain.',
          lang: 'en',
          cite: {
            source: 'loc-exhibition-rivers-edens-empires-lewis-and-clark',
            loc: {
              section: 'Rivers, Edens, Empires: Lewis & Clark and the Revealing of America, Lewis & Clark',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.loc.gov/exhibits/lewisandclark/lewis-landc.html'
          }
        }
      ]
    },
    {
      id: 'native-view',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'But there was another view of the West: that of the native inhabitants of the land. Their understandings of landscapes, peoples, and resources formed both a contrast and counterpoint to those of Jefferson\'s travelers.',
          lang: 'en',
          cite: {
            source: 'loc-exhibition-rivers-edens-empires-lewis-and-clark',
            loc: {
              section: 'Rivers, Edens, Empires: Lewis & Clark and the Revealing of America, Lewis & Clark',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.loc.gov/exhibits/lewisandclark/lewis-landc.html'
          }
        }
      ]
    }
  ]
})
