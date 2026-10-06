import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'gallipoli-campaign-memory-of-kemal',
  about: ['event:gallipoli-campaign', 'person:mustafa-kemal-ataturk'],
  topic: 'historiography',
  researched: '2026-10-06',
  positions: [
    {
      id: 'single-handed-victor',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Republic of Turkey' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Afterwards, official narratives emphasized the role of Atatürk and his Turkish soldiers in Gallipoli victory, while Enver and the other CUP leaders were blamed for the ultimate Ottoman defeat.',
          lang: 'en',
          cite: {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'The Legacy of Gallipoli', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
          }
        },
        {
          id: 'q2',
          text: 'After Mustafa Kemal became president of the Turkish Republic in 1923 and a personality cult developed around him, he was portrayed in Turkish historiography as the single-handed victor of the Gallipoli Campaign, erasing the role of the German commanders.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'World War I Years – Beyond the Gallipoli Narrative', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        }
      ]
    },
    {
      id: 'divisional-commander-under-others',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Erik-Jan Zürcher' },
        { kind: 'scholar', name: 'Harold Allen Skinner Jr.' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Yet the reality was different: Mustafa Kemal twice played a crucial role in containing the British and ANZAC advances, but in fact he served as a divisional commander with the rank of colonel under both General Esat Pasha, commander of the III Corps, and Liman von Sanders, overall commander of the Fifth Army that defended the Dardanelles.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'World War I Years – Beyond the Gallipoli Narrative', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        },
        {
          id: 'q4',
          text: 'Aside from the official histories of the Turkish General Staff, the role of Esat, other Ottoman officers, and the non-Turkish troops of the old empire faded from public memory of Gallipoli.',
          lang: 'en',
          cite: {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'The Legacy of Gallipoli', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
          }
        }
      ]
    }
  ]
})
