import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'munich-agreement-verdict',
  about: ['event:munich-agreement'],
  topic: 'significance',
  researched: '2026-10-09',
  positions: [
    {
      id: 'peace-saved',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom (Prime Minister Neville Chamberlain)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'When the House met last Wednesday, we were all under the shadow of a great and imminent menace. War, in a form more stark and terrible than ever before, seemed to be staring us in the face. Before I sat down, a message had come which gave us new hope that peace might yet be saved, and to-day, only a few days after, we all meet in joy and thankfulness that the prayers of millions have been answered, and a cloud of anxiety has been lifted from our hearts.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1938-10-03-prime-ministers-statement',
            loc: { section: 'HC Deb 03 October 1938 vol 339 cc40-162', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1938/oct/03/prime-ministers-statement'
          }
        },
        {
          id: 'q2',
          text: 'I believe there are many who will feel with me that such a declaration, signed by the German Chancellor and myself, is something more than a pious expression of opinion.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1938-10-03-prime-ministers-statement',
            loc: { section: 'HC Deb 03 October 1938 vol 339 cc40-162', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1938/oct/03/prime-ministers-statement'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'Chamberlain believed that Sudeten German grievances were just and Hitler\'s intention limited.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        },
        {
          id: 'q11',
          text: 'Both Britain and France advised Czechoslovakia to concede.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        }
      ]
    },
    {
      id: 'victory-for-brute-force',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Clement Attlee' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'We all feel relief that war has not come this time. Every one of us has been passing through days of anxiety; we cannot, however, feel that peace has been established, but that we have nothing but an armistice in a state of war. We have been unable to go in for care-free rejoicing. We have felt that we are in the midst of a tragedy. We have felt humiliation. This has not been a victory for reason and humanity. It has been a victory for brute force.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1938-10-03-prime-ministers-statement',
            loc: { section: 'HC Deb 03 October 1938 vol 339 cc40-162', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1938/oct/03/prime-ministers-statement'
          }
        }
      ]
    },
    {
      id: 'defeat-without-a-war',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Winston Churchill', ref: 'person:winston-churchill' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'I will begin by saying what everybody would like to ignore or forget but which must nevertheless be stated, namely, that we have sustained a total and unmitigated defeat, and that France has suffered even more than we have.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1938-10-05-policy-of-his-majestys-government',
            loc: { section: 'HC Deb 05 October 1938 vol 339 cc337-454', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1938/oct/05/policy-of-his-majestys-government'
          }
        },
        {
          id: 'q5',
          text: 'They should know that there has been gross neglect and deficiency in our defences; they should know that we have sustained a defeat without a war, the consequences of which will travel far with us along our road; they should know that we have passed an awful milestone in our history, when the whole equilibrium of Europe has been deranged, and that the terrible words have for the time being been pronounced against the Western democracies: Thou art weighed in the balance and found wanting.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1938-10-05-policy-of-his-majestys-government',
            loc: { section: 'HC Deb 05 October 1938 vol 339 cc337-454', para: '82' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1938/oct/05/policy-of-his-majestys-government'
          }
        }
      ]
    },
    {
      id: 'munich-betrayal',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russian Federation (President Vladimir Putin)' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The partition of Czechoslovakia was brutal and cynical. Munich destroyed even the formal, fragile guarantees that remained on the continent. It showed that mutual agreements were worthless. It was the Munich Betrayal that served as the “trigger” and made the great war in Europe inevitable.',
          lang: 'en',
          cite: {
            source: 'kremlin-2020-06-19-putin-75th-anniversary-great-victory',
            loc: {
              section: '75th Anniversary of the Great Victory: Shared Responsibility to History and our Future',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://en.kremlin.ru/events/president/news/63527'
          }
        },
        {
          id: 'q7',
          text: 'The Munich Betrayal showed to the Soviet Union that the Western countries would deal with security issues without taking its interests into account.',
          lang: 'en',
          cite: {
            source: 'kremlin-2020-06-19-putin-75th-anniversary-great-victory',
            loc: {
              section: '75th Anniversary of the Great Victory: Shared Responsibility to History and our Future',
              para: '28'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://en.kremlin.ru/events/president/news/63527'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The Soviet Union announced its willingness to come to Czechoslovakia\'s assistance. Benes, however, refused to go to war without the support of the Western powers.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Munich', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'http://countrystudies.us/czech-republic/28.htm'
          }
        }
      ]
    },
    {
      id: 'end-of-collective-security',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'But the West proved unwilling to counter German provocative behavior, and after France and Britain acceded to Hitler\'s demands for Czechoslovak territory at Munich in 1938, Stalin abandoned his efforts to forge a collective security agreement with the West.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    }
  ]
})
