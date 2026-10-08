import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'influenza-pandemic-of-1918-origin',
  about: ['event:influenza-pandemic-of-1918'],
  topic: 'causes',
  researched: '2026-10-09',
  positions: [
    {
      id: 'military-camps-and-troop-movements',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Howard Phillips' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Best documented are outbreaks in 1916 and 1917 of what was then dubbed “purulent bronchitis”, which occurred in two big military camps, at Étaples in north-western France and at Aldershot in south-eastern England.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'A possible path to a lethal pandemic', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        },
        {
          id: 'q2',
          text: 'what was now a re-assorted, more infectious influenza A virus re-appeared in public in March 1918 in rural Kansas, and soon after this at two jam-packed US military camps, the one nearby at Camp Funston, Fort Riley, and the other at Camp Oglethorpe in Georgia.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'A possible path to a lethal pandemic', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        }
      ]
    },
    {
      id: 'no-consensus',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Centers for Disease Control and Prevention' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Although there is not universal consensus regarding where the virus originated, it spread worldwide during 1918-1919.',
          lang: 'en',
          cite: {
            source: 'cdc-1918-pandemic-h1n1',
            loc: { section: '1918 Pandemic (H1N1 virus)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.cdc.gov/www_cdc_gov/flu/pandemic-resources/1918-pandemic-h1n1.html'
          }
        }
      ]
    },
    {
      id: 'carried-by-armies-into-persia',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Amir Arsalan Afkhami' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Ironically, the Russian troops who carried the illness to Ashkhabad had themselves contracted the disease from the American expeditionary force, which had landed infected troops in October at the Baltic port of Archangel (Crosby, pp. 145-46).',
          lang: 'en',
          cite: { source: 'iranica-afkhami-influenza', loc: { section: 'INFLUENZA', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/influenza'
          }
        }
      ]
    },
    {
      id: 'corrupt-winds',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Tehran residents in 1918' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The Spanish Flu broke out in Tehran unexpectedly, a shock that coincided with the emergence of a strong western wind on 24 September, fueling the popularly held belief that the outbreak was caused by “corrupt winds.” So strongly was this belief held that influenza at this time became known as the illness of the wind (nāḵoši-e bād).',
          lang: 'en',
          cite: { source: 'iranica-afkhami-influenza', loc: { section: 'INFLUENZA', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/influenza'
          }
        }
      ]
    }
  ]
})
