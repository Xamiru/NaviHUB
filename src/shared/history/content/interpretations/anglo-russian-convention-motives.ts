import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anglo-russian-convention-motives',
  about: ['event:anglo-russian-convention-of-1907'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'kazemzadeh',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Firuz Kazemzadeh', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The statesmen responsible for the formulation of British foreign policies sought an understanding with Russia that would complement the Anglo-French entente and complete the diplomatic isolation of Germany.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-russian-convention-of-1907'
          }
        },
        {
          id: 'q2',
          text: 'Only fear of Germany and the consequent firm determination to maintain good relations with Russia can explain Britain’s passivity in the face of such Russian acts as the invasions of Persia, the occupation of its northern provinces, and even collection of taxes in certain of its areas.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-russian-convention-of-1907'
          }
        }
      ]
    },
    {
      id: 'russian-interests',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Japan\'s victory in 1905 had forced Russia to make deals with the British and the Japanese.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        },
        {
          id: 'q4',
          text: 'To maintain its sphere of influence in northern Manchuria and northern Persia, Russia agreed to Japanese ascendancy in southern Manchuria and Korea, and to British ascendancy in southern Persia, Afghanistan, and Tibet.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Last Years of the Autocracy', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/7.htm' }
        }
      ]
    }
  ]
})
