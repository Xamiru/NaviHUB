import { definePerson } from '../../schema'

export default definePerson({
  id: 'leonid-brezhnev',
  names: [
    { text: 'Leonid Brezhnev', lang: 'en', role: 'primary' },
    { text: 'Леонид Брежнев', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1906' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '4' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1982-11' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '23' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'first secretary',
      start: {
        alts: [
          {
            value: { d: '1964-10' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Escalation of the War', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Brezhnev Era', para: '3' }
        }
      ]
    },
    {
      title: 'chairman of the Presidium of the Supreme Soviet',
      start: {
        alts: [
          {
            value: { d: '1977' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Brezhnev Era', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Brezhnev Era', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/President_Richard_Nixon_and_General_Secretary_Leonid_Brezhnev_Signing_the_Anti-Ballistic_Missile_%28ABM%29_Treaty_and_Interim_Strategic_Arms_Limitations_Talks_%28SALT%29_Agreement_-_DPLA_-_2183c7bf0be290b820f7eb20c295121b.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:President_Richard_Nixon_and_General_Secretary_Leonid_Brezhnev_Signing_the_Anti-Ballistic_Missile_(ABM)_Treaty_and_Interim_Strategic_Arms_Limitations_Talks_(SALT)_Agreement_-_DPLA_-_2183c7bf0be290b820f7eb20c295121b.jpg',
    credit: {
      institution: 'U.S. National Archives, Nixon White House Photo Office, via the Digital Public Library of America'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Born to a Russian worker\'s family in 1906, Brezhnev became a Khrushchev protégé early in his career and through his patron\'s influence rose to membership in the Presidium. As his own power grew, Brezhnev built up a coterie of followers whom he, as first secretary, gradually maneuvered into powerful positions. At the same time, Brezhnev slowly demoted or isolated possible contenders for his office. For instance, in December 1965 he succeeded in elevating Podgornyy to the ceremonial position of chairman of the Presidium of the Supreme Soviet, the highest legislative organization in the government, thus eliminating him as a rival. But Brezhnev\'s rise was very gradual; only in 1971, when he succeeded in appointing four close associates to the Politburo, did it become clear that his was the most influential voice in the collective leadership. After several more personnel changes, Brezhnev assumed the chairmanship of the Presidium of the Supreme Soviet in 1977, confirming his primacy in both party and state.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Although Brezhnev knew this was the most likely outcome of the invasion, he considered maintaining Soviet control in the East Bloc a higher priority in the short-term than pursuing détente with the West.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/soviet-invasion-czechoslavkia'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'Shortly after his cult of personality began to take root in the mid-1970s, Brezhnev began to experience periods of ill health. After Brezhnev suffered a stroke in 1975, Politburo members Mikhail Suslov and Andrey Kirilenko assumed some of the leader\'s functions for a time. Then, after another bout of poor health in 1978, Brezhnev delegated more of his responsibilities to Konstantin U. Chernenko, a longtime associate who soon began to be regarded as the heir apparent. His prospects of succeeding Brezhnev, however, were hurt by political problems plaguing the general secretary in the early 1980s. Not only were economic failures damaging Brezhnev\'s prestige, but scandals involving his family and political allies also were undermining his stature. Meanwhile, Yuriy V. Andropov, chief of the Committee for State Security (Komitet gosudarstvennoy bezopasnosti--KGB; see Glossary), apparently also began a campaign to discredit Brezhnev. Andropov took over Suslov\'s functions after Suslov died in 1982, and he used his position to promote himself as the next CPSU general secretary. Although he suffered another stroke in March 1982, Brezhnev refused to relinquish his office. He died that November.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        }
      ]
    }
  ]
})
