import { definePolity } from '../../schema'

export default definePolity({
  id: 'mandatory-iraq',
  names: [
    { text: 'Mandatory Iraq', lang: 'en', role: 'primary' },
    { text: 'العراق', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'mandate',
  start: {
    alts: [
      {
        value: { d: '1920-04-25' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1932-10-13' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:baghdad',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'Iraq (code 645), capital Baghdad' } }
      ]
    }
  ],
  partOf: [
    {
      ref: 'polity:british-empire',
      start: {
        alts: [
          {
            value: { d: '1920-04-25' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '6' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1932-10-13' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '6' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 645, from: 1920.31, to: 1932.78 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/King_Faysal_%28Faisal%29_I_of_Iraq_%28left%29_probably_with_his_brother_Emir_Abdullah_of_Transjordan%2C_at_the_palace%2C_Baghdad%2C_Iraq_LOC_matpc.13171.jpg/1280px-King_Faysal_%28Faisal%29_I_of_Iraq_%28left%29_probably_with_his_brother_Emir_Abdullah_of_Transjordan%2C_at_the_palace%2C_Baghdad%2C_Iraq_LOC_matpc.13171.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:King_Faysal_(Faisal)_I_of_Iraq_(left)_probably_with_his_brother_Emir_Abdullah_of_Transjordan,_at_the_palace,_Baghdad,_Iraq_LOC_matpc.13171.jpg',
    credit: { institution: 'Library of Congress, Matson Collection' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At the 1919 Paris Peace Conference, under Article 22 of the League of Nations Covenant, Iraq was formally made a Class A mandate entrusted to Britain. This award was completed on April 25, 1920, at the San Remo Conference in Italy.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'The most striking problem facing the British was the growing anger of the nationalists, who felt betrayed at being accorded mandate status. The nationalists soon came to view the mandate as a flimsy disguise for colonialism.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/19.htm' }
        },
        {
          id: 'q3',
          text: 'At the Cairo Conference of 1921, the British set the parameters for Iraqi political life that were to continue until the 1958 revolution; they chose Faisal as Iraq\'s first King; they established an indigenous Iraqi army; and they proposed a new treaty.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/19.htm' }
        },
        {
          id: 'q4',
          text: 'Ultimately, the British-created monarchy suffered from a chronic legitimacy crisis: the concept of a monarchy was alien to Iraq.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/19.htm' }
        },
        {
          id: 'q5',
          text: 'The twenty-year treaty, which was ratified in October 1922, stated that the king would heed British advice on all matters affecting British interests and on fiscal policy as long as Iraq was in debt to Britain, and that British officials would be appointed to specified posts in eighteen departments to act as advisers and inspectors.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    }
  ]
})
