import { definePerson } from '../../schema'

export default definePerson({
  id: 'klemens-von-metternich',
  names: [
    { text: 'Klemens von Metternich', lang: 'en', role: 'primary' },
    { text: 'Clemens von Metternich', lang: 'de', role: 'alternative' }
  ],
  researched: '2026-10-06',
  regions: ['europe'],
  roles: ['politician', 'diplomat'],
  offices: [
    {
      title: 'director of Austria’s foreign policy',
      start: {
        alts: [
          {
            value: { d: '1809' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The German Confederation, 1815-66', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1848' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The German Confederation, 1815-66', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The German Confederation, 1815-66', para: '3' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Prince Clemens von Metternich, who directed Austria\'s foreign policy from 1809 until 1848, was the dominant political figure within the confederation. He waged a decades-long campaign to prevent the spread of revolution in Europe by seeking to restore much of the political and social order that had existed before the French Revolution.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Confederation, 1815-66', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/23.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In the wake of this defeat, Franz appointed a new foreign minister, Clemens von Metternich, who sought reconciliation with France.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE HABSBURG EMPIRE AND THE FRENCH REVOLUTION: The Napoleonic Wars',
              para: '6'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/19.htm' }
        },
        {
          id: 'q3',
          text: 'Clemens von Metternich was initially successful in maintaining a European consensus favorable to Austrian interests.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'AUSTRIA IN THE AGE OF METTERNICH: International Developments, 1815-48',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/21.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Prince_Metternich_by_Lawrence.jpeg/1280px-Prince_Metternich_by_Lawrence.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Prince_Metternich_by_Lawrence.jpeg',
    credit: { institution: 'Royal Collection', creator: 'Thomas Lawrence' },
    license: { id: 'public-domain' }
  }
})
