import { definePerson } from '../../schema'

export default definePerson({
  id: 'maximilian-i-of-mexico',
  names: [
    { text: 'Maximilian I of Mexico', lang: 'en', role: 'primary' },
    {
      text: 'Ferdinand Maximilian Joseph von Habsburg',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1867-06-19' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Mexico',
      polity: 'polity:second-mexican-empire',
      start: {
        alts: [
          {
            value: { d: '1864' },
            cites: [
              {
                source: 'state-dept-milestones-french-intervention-in-mexico',
                loc: {
                  section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1867-05-15' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Civil War and the French Intervention', para: '5' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        },
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In June 1863, a provisional government was chosen, and in October a delegation of Mexican conservatives invited Ferdinand Maximilian Joseph von Habsburg of Austria to accept the Mexican crown, all according to the plans of French emperor Napoleon III.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q2',
          text: 'Before departing for Mexico, Maximilian signed an agreement with Napoleon III, under which Maximilian assumed the debts incurred for the upkeep of the French army in Mexico.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q3',
          text: 'The conservatives expected the emperor to act against the Reform Laws, but Maximilian refused to revoke them.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'The Austrian Archduke Maximilian, who had been placed on the Mexican imperial throne but proved unable to impose himself, was abandoned, made prisoner,and ultimately shot by the Mexicans.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Maximilian_I_of_Mexico_portrait_standing.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Maximilian_I_of_Mexico_portrait_standing.jpg',
    credit: { institution: 'Library of Congress', creator: 'Ludwig Angerer' },
    license: { id: 'public-domain' }
  }
})
