import { definePolity } from '../../schema'

export default definePolity({
  id: 'french-second-republic',
  names: [
    { text: 'French Second Republic', lang: 'en', role: 'primary' },
    { text: 'Deuxième République', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1848-02-24' },
        cites: [
          {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '748' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1852-12-02' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'France (code 220), capital Paris' } }
      ]
    }
  ],
  cshapes: [
    { set: 'europe', code: 220, from: 1848.15, to: 1852.92 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg/1280px-Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Philippoteaux_-_Lamartine_in_front_of_the_Town_Hall_of_Paris_rejects_the_red_flag.jpg',
    credit: { institution: 'Musée Carnavalet', creator: 'Henri Félix Philippoteaux' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'From the point of view of constitutional law, the Second Republic and the Second Empire were each in a certain sense a return to the past. The former revived the tradition of the Assemblies of the Revolution;',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '747' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q2',
          text: 'The executive authority, with very extensive powers, was given to a president of the Republic, also elected by the universal and direct suffrage of the French citizens.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '748' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q7',
          text: 'The industrial population of the faubourgs on its way towards the centre of the town was welcomed by the National Guard, among cries of “Vive la réforme.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '492' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q3',
          text: 'It was now the turn of the Republic, and it was proclaimed by Lamartine in the name of the provisional government elected by the Chamber under the pressure of the mob.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '492' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The provisional government set up by the revolution of the 24th of February 1848 proclaimed universal suffrage, and by this means was elected a Constituent Assembly, which sat till May 1849, and, after first organizing various forms of another provisional government, passed the Republican constitution of 1848.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '748' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q5',
          text: 'Now Louis Napoleon, who was elected president on the 10th of December 1848 by a huge majority, wished to be re-elected.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '748' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'With the coup d’état of the 2nd of December 1851 began a new era of constitutional plebiscites and disguised absolutism.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '749' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'agulhon-1973-1848-ou-lapprentissage-de-la-republique', perspective: 'european' }
  ]
})
