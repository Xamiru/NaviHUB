import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'brezhnev-era',
  names: [
    { text: 'Brezhnev era', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
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
  end: {
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
  prominence: 2,
  parent: 'period:soviet-union',
  hero: {
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
          text: 'The regime that followed Khrushchev took a much more conservative approach to most problems. Stalinism did not return, but there was less latitude for individual expression. Foreign relations continued to roller-coaster, with the invasion of Afghanistan in 1979 constituting a major setback for relations with the West. The Soviet economy continued to falter, reaping no apparent benefit from the end of Khrushchev\'s economic experimentation.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        },
        {
          id: 'q2',
          text: 'Conservative policies characterized the regime\'s agenda in the years after Khrushchev. Upon assuming power, the collective leadership not only reversed such Khrushchev policies as the bifurcation of the party, it also halted de-Stalinization.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'After removing Khrushchev from power, the leaders of the Politburo (as the Presidium was renamed in 1966 by the Twenty-Third Party Congress) and Secretariat again established a collective leadership. As was the case following Stalin\'s death, several individuals, including Aleksey Kosygin, Nikolay Podgornyy, and Leonid Brezhnev, contended for power behind a facade of unity.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        },
        {
          id: 'q4',
          text: 'The years after Khrushchev were notable for the stability of the cadres, groups of activists in responsible and influential positions in the party and state apparatus. By introducing the slogan "Trust in Cadres" in 1965, Brezhnev won the support of many bureaucrats wary of the constant reorganizations of the Khrushchev era and eager for security in established hierarchies. Indicative of the stability of the period is the fact that nearly half of the Central Committee members in 1981 were holdovers from fifteen years earlier. The corollary to this stability was the aging of Soviet leaders; the average age of Politburo members rose from fifty-five in 1966 to sixty-eight in 1982. The Soviet leadership (or the "gerontocracy," as it was referred to in the West) became increasingly conservative and ossified.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        }
      ]
    }
  ]
})
