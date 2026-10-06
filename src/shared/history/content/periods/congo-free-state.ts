import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'congo-free-state',
  names: [
    { text: 'Congo Free State', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1885' },
        cites: [
          {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1908-11-14' },
        cites: [
          {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '38' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Free State, under King Leopold of Belgium, was organized as an absolute monarchy.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '63' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q2',
          text: 'Civil and criminal codes were promulgated by decrees, and in both cases the laws of Belgium were adopted as the basis of legislation, and “modified to suit the special requirements” of the state; e.g. forced labour (prestations) was legalized (law of the 18th of November 1903).[9] This forced labour was to be remunerated and was regarded as in the nature of a tax.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '63' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q3',
          text: 'The Fondation controlled the most valuable rubber region in the Congo, and in that region the natives appeared to be treated with the utmost severity.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q4',
          text: 'In the first place the native policy of the Congo government was denounced as at variance with the humanitarian spirit which had been regarded by the powers as one of the chief motives inspiring the foundation of the Congo State. In the second place it was contended that the method of exploitation of the state lands and the concessions system nullified the free trade provisions of the Berlin Act.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Sir Edward Grey affirmed that the Congo State had “morally forfeited every right to international recognition,” and quoted with approval Lord Cromer’s statement that the Congo system was the worst he had ever seen.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q6',
          text: 'The debate closed on the 20th of August, when the treaty of annexation, the additional act and the colonial law were all voted by substantial majorities.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        },
        {
          id: 'q7',
          text: 'On the 14th of November the state ceased to exist, the rights of sovereignty being assumed by Belgium the next day without ceremony of any kind.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-congo-free-state',
            loc: { section: 'CONGO FREE STATE', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Congo_Free_State'
          }
        }
      ]
    }
  ]
})
