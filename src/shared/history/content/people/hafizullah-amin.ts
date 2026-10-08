import { definePerson } from '../../schema'

export default definePerson({
  id: 'hafizullah-amin',
  names: [
    { text: 'Hafizullah Amin', lang: 'en', role: 'primary' },
    { text: 'حفیظ الله امین', lang: 'fa', role: 'native', translit: 'Ḥafīẓallāh Amīn' }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1979-12-27' },
        cites: [
          {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          },
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'Deputy Prime Minister of the Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      start: {
        alts: [
          {
            value: { d: '1978-04' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-03' },
            cites: [
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
        }
      ]
    },
    {
      title: 'Prime Minister of the Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      start: {
        alts: [
          {
            value: { d: '1979-03' },
            cites: [
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-12-27' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Hafizullah_Amin_with_Abdurrahman_Gunadirdja.jpg/1280px-Hafizullah_Amin_with_Abdurrahman_Gunadirdja.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hafizullah_Amin_with_Abdurrahman_Gunadirdja.jpg',
    credit: { institution: 'The Kabul Times, 9 October 1979, p. 1' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the summer of 1979, Hafizullah Amin, a longtime ally of Taraki who became Deputy Prime Minister following the April Revolution, received word that Babrak Karmal (Daoud’s early supporter) was leading a Parcham plot to overthrow the Taraki regime. Amin took the opportunity to purge and execute many Parchamists and consolidate his own power.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Confident that his military officers were reliable, Daud must have discounted the diligence of Taraki\'s lieutenant, Hafizullah Amin, who had sought out dissident Pushtun officers. The bungling of Amin\'s arrest, which enabled him to trigger the coup ahead of its planned date, also suggests Khalq\'s penetration of Daud\'s security police.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q3',
          text: 'Amīn became premier in late March and had replaced Tarakī as minister of defense by July.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q4',
          text: 'Amīn continued, against Soviet advice, the unpopular Ḵalqī program of sovietization. On 5 Jady/24 December, with the country poised on the brink of collapse from widespread popular rebellion, a quiet but massive airlift of Soviet forces into Afghanistan began.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'On 5 Jady/24 December, with the country poised on the brink of collapse from widespread popular rebellion, a quiet but massive airlift of Soviet forces into Afghanistan began. Three days later there was an invasion of land forces, while various deceptive operations ensured the immobilization of Afghan army units and disrupted communications (Arnold, 1985, p. 94). That same evening a team (spetsnaz) of K.G.B. special forces in Afghan uniforms overcame Amīn’s personal guards and killed him in the Dār al-Amān palace',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1929' },
        cites: [
          { source: 'lc-names-n2015221777', loc: { section: 'Amīn, Ḥafīẓ Allāh, 1929-1979' } }
        ]
      }
    ]
  }
})
