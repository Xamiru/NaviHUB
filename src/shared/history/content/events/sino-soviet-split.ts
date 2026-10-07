import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sino-soviet-split',
  names: [
    { text: 'Sino-Soviet split', lang: 'en', role: 'primary' },
    {
      text: 'Sino-Soviet rift',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'China', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1960' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Sino-Soviet Relations', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'russia-central-asia', 'global'],
  prominence: 2,
  places: [
    { ref: 'place:beijing' },
    { ref: 'place:moscow' }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'China', para: '1' } },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Sino-Soviet Relations', para: '3' }
        }
      ]
    },
    {
      ref: 'person:nikita-khrushchev',
      role: 'leader',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'China', para: '1' } }
      ]
    },
    {
      ref: 'person:leonid-brezhnev',
      role: 'leader',
      cites: [
        { source: 'loc-russia-country-study-1996', loc: { section: 'China', para: '1' } },
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Brezhnev Era', para: '8' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Mao_Zedong_meeting_with_the_Communist_Party_of_Belgium_headed_by_Jacques_Grippa.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mao_Zedong_meeting_with_the_Communist_Party_of_Belgium_headed_by_Jacques_Grippa.jpg',
    credit: { institution: 'Peking Review (Chinese state magazine), 1964 issue 25' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1959 and 1960, the Sino-Soviet rift came to full world attention with Khrushchev\'s renunciation of an agreement to provide nuclear technology to China, the Soviet withdrawal of all economic advisers, and mutual accusations of ideological impurity.',
          lang: 'en',
          cite: { source: 'loc-russia-country-study-1996', loc: { section: 'China', para: '1' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/84.htm' }
        },
        {
          id: 'q2',
          text: 'In retrospect, the major ideological, military, and economic reasons behind the Sino-Soviet split were essentially the same: for the Chinese leadership, the strong desire to achieve self-reliance and independence of action outweighed the benefits Beijing received as Moscow\'s junior partner.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Sino-Soviet Relations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/128.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'During the second half of the 1950s, strains in the Sino-Soviet alliance gradually began to emerge over questions of ideology, security, and economic development. Chinese leaders were disturbed by the Soviet Union\'s moves under Nikita Khrushchev toward deStalinization and peaceful coexistence with the West. Moscow\'s successful earth satellite launch in 1957 strengthened Mao\'s belief that the world balance was in the communists\' favor--or, in his words, "the east wind prevails over the west wind"--leading him to call for a more militant policy toward the noncommunist world in contrast to the more conciliatory policy of the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Sino-Soviet Relations', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/128.htm' }
        },
        {
          id: 'q4',
          text: 'In addition to ideological disagreements, Beijing was dissatisfied with several aspects of the Sino-Soviet security relationship: the insufficient degree of support Moscow showed for China\'s recovery of Taiwan, a Soviet proposal in 1958 for a joint naval arrangement that would have put China in a subordinate position, Soviet neutrality during the 1959 tension on the SinoIndian border, and Soviet reluctance to honor its agreement to provide nuclear weapons technology to China. And, in an attempt to break away from the Soviet model of economic development, China launched the radical policies of the Great Leap Forward (1958-60), leading Moscow to withdraw all Soviet advisers from China in 1960.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Sino-Soviet Relations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/128.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'During the 1960s the Sino-Soviet ideological dispute deepened and spread to include territorial issues, culminating in 1969 in bloody armed clashes on their border. In 1963 the boundary dispute had come into the open when China explicitly raised the issue of territory lost through "unequal treaties" with tsarist Russia. After unsuccessful border consultations in 1964, Moscow began the process of a military buildup along the border with China and in Mongolia, which continued into the 1970s.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Sino-Soviet Relations', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/128.htm' }
        },
        {
          id: 'q6',
          text: 'A major concern of Khrushchev\'s successors was to reestablish Soviet primacy in the community of communist states by undermining the influence of China. Although the new leaders originally approached China without hostility, Mao\'s condemnation of Soviet foreign policy as "revisionist" and his competition for influence in the Third World soon led to a worsening of relations between the two countries. The Sino-Soviet relationship reached a low point in 1969 when clashes broke out along the disputed Ussuri River boundary in the Far East. Later, the Chinese, intimidated by Soviet military strength, agreed not to patrol the border area claimed by the Soviet Union; but strained relations between the two countries continued into the early 1980s.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Brezhnev Era', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/14.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The Chinese were alarmed in 1966-68 by steady Soviet military buildups along their common border. The Soviet invasion of Czechoslovakia in 1968 heightened Chinese apprehensions.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q8',
          text: 'The tension on the border had a sobering effect on the fractious Chinese political scene and provided the regime with a new and unifying rallying call.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1969-03' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In March 1969 Chinese and Soviet troops clashed on Zhenbao Island (known to the Soviets as Damanskiy Island) in the disputed Wusuli Jiang (Ussuri River) border area.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
      }
    }
  ]
})
