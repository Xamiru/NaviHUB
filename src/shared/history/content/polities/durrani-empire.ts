import { definePolity } from '../../schema'

export default definePolity({
  id: 'durrani-empire',
  names: [
    { text: 'Durrani Empire', lang: 'en', role: 'primary' },
    {
      text: 'Durrani Empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '-1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1747' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          },
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '1' }
          },
          { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1826' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '15' }
          },
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'russia-central-asia', 'iran'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:kandahar',
      start: {
        alts: [
          {
            value: { d: '1747' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1775' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
        }
      ]
    },
    {
      ref: 'place:kabul',
      start: {
        alts: [
          {
            value: { d: '1775' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:afsharid-iran',
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 700, to: 1828 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'From Nadir Shah\'s death in 1747 until the communist coup of April 1978, Afghanistan was governed--at least nominally--by Pashtun rulers from the Abdali group of clans.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q2',
          text: 'For several decades the Dorrānī empire was the dominating regional power.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'At Nāder Shah’s death they felt strong enough to proclaim their independence.',
          lang: 'en',
          cite: { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/dorrani-1'
          }
        },
        {
          id: 'q4',
          text: 'Ahmad Shah began by capturing Ghazni from the Ghilzai Pashtuns, and then wresting Kabul from the local ruler.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q5',
          text: 'Ahmad Shah declared an Islamic holy war against the Marathas, and warriors from various Pashtun tribes, as well as other tribes such as the Baloch, answered his call.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q6',
          text: 'The victory at Panipat was the high point of Ahmad Shah\'s--and Afghan--power.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Centrifugal tendencies intensified after Aḥmad Shah’s death (20 Raǰab 1186/16 October 1772) and the accession of his chosen successor, his younger son Tīmūr, who had been governor of Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        },
        {
          id: 'q8',
          text: 'Ahmad Shah\'s successors governed so ineptly during a period of profound unrest that within fifty years of his death, Afghanistan was embroiled in a civil war.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q9',
          text: 'From 1818 until Dost Mohammad\'s ascendancy in 1826, chaos reigned in the domains of Ahmad Shah Durrani\'s empire as various sons of Painda Khan struggled for supremacy.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Painting_of_Ahmad_Shah_Abdali_%28also_known_as_Ahmad_Shah_Durrani%29_kept_in_the_Lahore_Museum.jpg/1280px-Painting_of_Ahmad_Shah_Abdali_%28also_known_as_Ahmad_Shah_Durrani%29_kept_in_the_Lahore_Museum.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Painting_of_Ahmad_Shah_Abdali_(also_known_as_Ahmad_Shah_Durrani)_kept_in_the_Lahore_Museum.jpg',
    credit: { institution: 'Lahore Museum' },
    license: { id: 'public-domain' }
  }
})
