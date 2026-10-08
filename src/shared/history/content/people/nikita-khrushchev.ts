import { definePerson } from '../../schema'

export default definePerson({
  id: 'nikita-khrushchev',
  names: [
    { text: 'Nikita Khrushchev', lang: 'en', role: 'primary' },
    { text: 'Никита Сергеевич Хрущёв', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  regions: ['russia-central-asia'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'first secretary',
      polity: 'polity:soviet-union',
      start: {
        alts: [
          {
            value: { d: '1953-09' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Khrushchev Era', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Khrushchev Era', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Nikita_Khrushchev_1959.jpg/1280px-Nikita_Khrushchev_1959.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nikita_Khrushchev_1959.jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Party leader Nikita S. Khrushchev denounced Stalin\'s tyrannical reign in 1956, signaling a sharp break with the past.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/13.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Of peasant background, Khrushchev had served as head of the Ukrainian party organization during and after World War II, and he was a member of the Soviet political elite during the late Stalin period.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/13.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'By 1955, however, Khrushchev had consolidated his power, forcing Malenkov to resign as Premier due to his close ties with Beria, and Khrushchev emerged as the sole leader.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        },
        {
          id: 'q4',
          text: 'His rivals in the Presidium, spurred by reversals in Soviet foreign policy in Eastern Europe in 1956, potentially threatening economic reforms, and the de-Stalinization campaign, united to vote him out of office in June 1957.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/13.htm' }
        },
        {
          id: 'q5',
          text: 'Although Khrushchev played a role in shutting down the rebellions in the Soviet satellites in Eastern Europe, he followed up on his address to the Twentieth Party Congress by continuing to advocate reforms and increased cooperation with the West.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q6',
          text: 'Despite his rank, Khrushchev never exercised the dictatorial authority of Stalin, nor did he ever completely control the party, even at the peak of his power.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/13.htm' }
        }
      ]
    }
  ]
})
