import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'battle-of-the-somme-outcome',
  about: ['event:battle-of-the-somme'],
  topic: 'outcome',
  researched: '2026-10-06',
  positions: [
    {
      id: 'attritional-success',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'William Philpott' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Although it did not decide the war in 1916, it shifted the fortunes of an industrialised war of attrition in the Allies’ favour.',
          lang: 'en',
          cite: {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        }
      ]
    },
    {
      id: 'lions-led-by-donkeys',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'British popular memory' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The 1916 Somme offensive was Britain’s most costly and remains its most notorious First World War battle, while the French army’s major role and relative success in the offensive has been all but forgotten.',
          lang: 'en',
          cite: { source: 'eo1418-philpott-somme', loc: { section: 'Aftermath', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        }
      ]
    },
    {
      id: 'no-breakthrough',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Deutsches Historisches Museum' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Einstellung der Kämpfe an der Somme ohne strategisch bedeutsame Durchbrüche.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '188' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1916.html'
          }
        }
      ]
    }
  ]
})
