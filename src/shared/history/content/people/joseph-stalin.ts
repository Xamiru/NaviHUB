import { definePerson } from '../../schema'

export default definePerson({
  id: 'joseph-stalin',
  names: [
    { text: 'Joseph Stalin', lang: 'en', role: 'primary' },
    { text: 'Иосиф Виссарионович Сталин', lang: 'ru', role: 'native' },
    {
      text: 'Josef Wissarionowitsch Dschugaschwili',
      lang: 'de',
      role: 'alternative',
      cites: [
        {
          source: 'lemo-biografie-josef-stalin',
          loc: { section: 'Josef W. Stalin 1878/79-1953', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1878-12-18' },
        cites: [
          {
            source: 'lemo-biografie-josef-stalin',
            loc: { section: 'Josef W. Stalin 1878/79-1953', para: '2' }
          }
        ]
      },
      {
        value: { d: '1879-12-21' },
        cites: [
          {
            source: 'lemo-biografie-josef-stalin',
            loc: { section: 'Josef W. Stalin 1878/79-1953', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1953-03-05' },
        cites: [
          {
            source: 'lemo-biografie-josef-stalin',
            loc: { section: 'Josef W. Stalin 1878/79-1953', para: '57' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['revolutionary', 'politician'],
  offices: [
    {
      title: 'general secretary of the Communist Party',
      start: {
        alts: [
          {
            value: { d: '1922-04-03' },
            cites: [
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '58' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Era of the New Economic Policy', para: '5' }
        },
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '58' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A minor member of the party\'s Central Committee at the time of the Bolshevik Revolution, Stalin was thought to be a rather lackluster personality and therefore well suited to the routine work required of the general secretary.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q6',
          text: 'In the meantime, Stalin gradually consolidated his power base and, when he had sufficient strength, broke with Kamenev and Zinov\'yev.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/9.htm' }
        },
        {
          id: 'q7',
          text: 'During the second half of the 1920s, Joseph Stalin set the stage for gaining absolute power by employing police repression against opposition elements within the Communist Party.',
          lang: 'en',
          cite: {
            source: 'loc-revelations-russian-archives-internal-workings',
            loc: { section: 'Internal Workings of the Soviet Union' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.loc.gov/exhibits/archives/intn.html'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q4',
          text: 'But Stalin countered their attacks on his position with his well-timed formulation of the theory of "socialism in one country."',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Era of the New Economic Policy', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/9.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'During the postwar reconstruction period, Stalin tightened domestic controls, justifying the repression by playing up the threat of war with the West.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Reconstruction and Cold War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/JStalin_Secretary_general_CCCP_1942_%283x4_cropped%29.jpg/1280px-JStalin_Secretary_general_CCCP_1942_%283x4_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:JStalin_Secretary_general_CCCP_1942_(3x4_cropped).jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
