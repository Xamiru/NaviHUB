import { definePerson } from '../../schema'

export default definePerson({
  id: 'mikhail-gorbachev',
  names: [
    { text: 'Mikhail Gorbachev', lang: 'en', role: 'primary' },
    { text: 'Михаил Сергеевич Горбачёв', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1931-03-02' },
        cites: [
          {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2022-08-30' },
        cites: [
          {
            source: 'gorbachev-foundation-about-the-foundation',
            loc: { section: 'The Gorbachev Foundation', para: '1' }
          },
          {
            source: 'gorbachev-foundation-30-avgusta-den-pamyati',
            loc: { section: '30 августа – День памяти', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:privolnoye',
    cites: [
      {
        source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
        loc: { section: 'Mikhail Gorbachev', para: '1' }
      }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'General Secretary of the Communist Party of the Soviet Union',
      polity: 'polity:soviet-union',
      start: {
        alts: [
          {
            value: { d: '1985-03' },
            cites: [
              {
                source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
                loc: { section: 'Mikhail Gorbachev', para: '26' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '26' }
        },
        {
          source: 'state-dept-milestones-us-soviet-relations-1981-1991',
          loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
        }
      ]
    },
    {
      title: 'President of the Soviet Union',
      polity: 'polity:soviet-union',
      start: {
        alts: [
          {
            value: { d: '1990-03-15' },
            cites: [
              {
                source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
                loc: { section: 'Mikhail Gorbachev', para: '27' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1991-12-25' },
            cites: [
              {
                source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
                loc: { section: 'Mikhail Gorbachev', para: '31' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '27' }
        },
        {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '31' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Bundesarchiv_Bild_183-1989-1006-410%2C_Berlin%2C_Ankunft_Gorbatschows.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1989-1006-410,_Berlin,_Ankunft_Gorbatschows.jpg',
    credit: {
      institution: 'Bundesarchiv (German Federal Archives), Bild 183-1989-1006-410',
      creator: 'Karl-Heinz Schindler'
    },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In contrast to the uncertain handling of leadership vacancies in 1982 and 1984, upon the death of Chernenko the Politburo acted within hours to choose unanimously the healthy and relatively youthful Gorbachev as general secretary.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Gorbachev Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/16.htm' }
        },
        {
          id: 'q2',
          text: 'The period of 1985 – 1991 was the time of a fundamental change in the USSR’s relations with the West – a move from the image of an enemy, an “evil empire” to a partner image.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '28' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Mikhail Gorbachev was born on March 2, 1931 in the village of Privolnoye, Krasnogvardeisky District, Stavropol Territory, in the south of the Russian republic into a Russian – Ukrainian peasant family who moved to the Stavropol Territory from the Russian Voronezh Region and from the Chernigov Province in the Ukraine.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q4',
          text: 'In 1950 Gorbachev graduated from high school with a silver medal. His father insisted that the youth continued his education, and Mikhail chose the Moscow State University as the best university in the USSR. He was enrolled to the university without entrance exams and even without an interview.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q5',
          text: 'When a university student, Gorbachev met his future wife Raisa Titarenko. She was also a student of the Moscow University, philosophy faculty She was one year his junior but joined the university one year before him. They married on September 25, 1953.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'On November 27, 1978 the Plenary Session of the CPSU Central Committee elected Gorbachev Central Committee Secretary.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q7',
          text: 'In March 1985 Gorbachev was elected General Secretary of the CPSU Central Committee.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q8',
          text: 'Gorbachev initiated the process of change in the Soviet Union - what was later called perestroika (1985-1991). Glasnost and openness became perestroika’s driving force.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q9',
          text: 'In December 1987 they signed the Intermediate-Range Nuclear Forces Treaty, which eliminated an entire class of missiles.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/u.s.-soviet-relations'
          }
        },
        {
          id: 'q10',
          text: 'For his efforts to reduce superpower tensions around the world, he was awarded the Nobel Prize for Peace in 1990.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q11',
          text: 'On December 25, 1991, Gorbachev stepped down as Head of State.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '31' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q12',
          text: 'Since January 1992, Mikhail Gorbachev has been President of the International Non-Governmental Foundation for Socio-Economic and Political Studies (The Gorbachev Foundation).',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '32' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q13',
          text: 'Mikhail Gorbachev was the President of the Foundation until his passing on August 30, 2022.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-about-the-foundation',
            loc: { section: 'The Gorbachev Foundation', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbi_fund/about/' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q15',
          text: 'My declaration of January 15, 1986, is well known around the world. I addressed arms reduction, including nuclear arms, and I proposed that by the year 2000 no country should have atomic weapons. I personally felt a moral responsibility to end the arms race. But Chernobyl opened my eyes like nothing else: it showed the horrible consequences of nuclear power, even when it is used for non-military purposes. One could now imagine much more clearly what might happen if a nuclear bomb exploded. According to scientific experts, one SS-18 rocket could contain 100 Chernobyls.',
          lang: 'en',
          cite: {
            source: 'gorbachev-2006-turning-point-at-chernobyl',
            loc: { section: 'VIEW: Turning point at Chernobyl', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
          }
        },
        {
          id: 'q16',
          text: 'Mr. President, ladies and gentlemen, comrades, succeeding generations will hand down their verdict on the importance of the event which we are about to witness. But I will venture to say that what we are going to do, the signing of the first-ever agreement eliminating nuclear weapons, has a universal significance for mankind, both from the standpoint of world politics and from the standpoint of humanism.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1987-12-08-remarks-on-signing-the-inf-treaty',
            loc: {
              section: 'Remarks on Signing the Intermediate-Range Nuclear Forces Treaty',
              para: '14'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/remarks-signing-intermediate-range-nuclear-forces-treaty'
          }
        }
      ]
    }
  ]
})
