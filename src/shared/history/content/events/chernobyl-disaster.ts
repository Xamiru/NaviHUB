import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'chernobyl-disaster',
  names: [
    { text: 'Chernobyl disaster', lang: 'en', role: 'primary' },
    { text: 'Чорнобильська катастрофа', lang: 'uk', role: 'native' },
    { text: 'Чернобыльская катастрофа', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1986-04-26' },
        cites: [
          {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '1' }
          },
          {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:chernobyl',
      cites: [
        {
          source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
          loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '1' }
        },
        {
          source: 'iaea-frequently-asked-chernobyl-questions',
          loc: { section: 'Frequently Asked Chernobyl Questions', para: '1' }
        }
      ]
    },
    {
      ref: 'place:ukraine',
      cites: [
        {
          source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
          loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:soviet-union' }
  ],
  participants: [
    {
      ref: 'person:mikhail-gorbachev',
      role: 'leader',
      cites: [
        {
          source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
          loc: { section: 'Document 230', para: '1' }
        }
      ]
    },
    {
      name: 'Nikolay Ryzhkov',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '17' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 28 },
            cites: [
              {
                source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
                loc: {
                  section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident',
                  para: '5'
                }
              },
              {
                source: 'iaea-frequently-asked-chernobyl-questions',
                loc: { section: 'Frequently Asked Chernobyl Questions', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'U.S. Nuclear Regulatory Commission' },
              { kind: 'organization', name: 'International Atomic Energy Agency' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 115000, qualifier: 'about' },
            cites: [
              {
                source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
                loc: {
                  section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident',
                  para: '3'
                }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'U.S. Nuclear Regulatory Commission' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '20' }
        }
      ]
    },
    {
      ref: 'event:inf-treaty',
      rel: 'related',
      cites: [
        {
          source: 'gorbachev-2006-turning-point-at-chernobyl',
          loc: { section: 'VIEW: Turning point at Chernobyl', para: '12' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On April 26, 1986, the Number Four RBMK reactor at the nuclear power plant at Chernobyl, Ukraine, went out of control during a test at low-power, leading to an explosion and fire that demolished the reactor building and released large amounts of radiation into the atmosphere.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        },
        {
          id: 'q2',
          text: 'The accident and the fire that followed released massive amounts of radioactive material into the environment.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Chernobyl reactors, called RBMKs, were high-powered reactors that used graphite to help maintain the chain reaction and cooled the reactor cores with water.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'Safety measures were ignored, the uranium fuel in the reactor overheated and melted through the protective barriers.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        },
        {
          id: 'q5',
          text: 'RBMK reactors do not have what is known as a containment structure, a concrete and steel dome over the reactor itself designed to keep radiation inside the plant in the event of such an accident. Consequently, radioactive elements including plutonium, iodine, strontium and caesium were scattered over a wide area.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The initial explosion resulted in the death of two workers.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        },
        {
          id: 'q7',
          text: 'Emergency crews responding to the accident used helicopters to pour sand and boron on the reactor debris. The sand was to stop the fire and additional releases of radioactive material; the boron was to prevent additional nuclear reactions.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        },
        {
          id: 'q8',
          text: 'Meanwhile we were still able to take measures to help people in the disaster zone; they were evacuated, and more than 200 medical organisations were involved in testing the population for radiation poisoning.',
          lang: 'en',
          cite: {
            source: 'gorbachev-2006-turning-point-at-chernobyl',
            loc: { section: 'VIEW: Turning point at Chernobyl', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
          }
        },
        {
          id: 'q9',
          text: 'In his first public remarks on Chernobyl Gorbachev blasted U.S. and Western leaders for exploiting the accident to divert attention from Soviet arms control initiatives.',
          lang: 'en',
          cite: {
            source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
            loc: { section: 'Document 230', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1981-88v05/d230'
          }
        },
        {
          id: 'q10',
          text: 'The Soviet nuclear power authorities presented their initial accident report to an International Atomic Energy Agency meeting in Vienna, Austria, in August 1986.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'The entire town of Pripyat (population 49,360), which lay only three kilometres from the plant was completely evacuated 36 hours after the accident.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        },
        {
          id: 'q12',
          text: 'After the accident, officials closed off the area within 30 kilometers (18 miles) of the plant, except for persons with official business at the plant and those people evaluating and dealing with the consequences of the accident and operating the undamaged reactors.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        },
        {
          id: 'q13',
          text: 'The Soviet authorities started the concrete sarcophagus to cover the destroyed Chernobyl reactor in May 1986 and completed the extremely challenging job six months later.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q14',
          text: 'The Chernobyl accident\'s severe radiation effects killed 28 of the site\'s 600 workers in the first four months after the event. Another 106 workers received high enough doses to cause acute radiation sickness. Two workers died within hours of the reactor explosion from non-radiological causes.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        },
        {
          id: 'q15',
          text: 'The Chernobyl accident contaminated wide areas of Belarus, the Russian Federation, and Ukraine inhabited by millions of residents.',
          lang: 'en',
          cite: {
            source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
            loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q16',
          text: 'The official announcement of glasnost , scheduled for mid-1986, was overtaken by an event that lent new meaning to the term.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q17',
          text: 'Despite the clumsy reaction of the Soviet government to the Chernobyl\' episode, Gorbachev turned the accident in his favor by citing it as an example of the need for economic perestroika .',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q18',
          text: 'Upgrading was performed on all RBMK units to eliminate the design deficiencies which contributed to the Chernobyl accident, to improve shutdown mechanisms and heighten general safety awareness among staff.',
          lang: 'en',
          cite: {
            source: 'iaea-frequently-asked-chernobyl-questions',
            loc: { section: 'Frequently Asked Chernobyl Questions', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20191123021211id_/https://www.iaea.org/newscenter/focus/chernobyl/faqs'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q19',
          text: 'The nuclear meltdown at Chernobyl this month 20 years ago, even more than my launch of perestroika, was perhaps the real cause of the collapse of the Soviet Union five years later. Indeed, the Chernobyl catastrophe was an historic turning point: there was the era before the disaster, and there is the very different era that has followed.',
          lang: 'en',
          cite: {
            source: 'gorbachev-2006-turning-point-at-chernobyl',
            loc: { section: 'VIEW: Turning point at Chernobyl', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
          }
        },
        {
          id: 'q20',
          text: 'The Chernobyl disaster, more than anything else, opened the possibility of much greater freedom of expression',
          lang: 'en',
          cite: {
            source: 'gorbachev-2006-turning-point-at-chernobyl',
            loc: { section: 'VIEW: Turning point at Chernobyl', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1986-04-26' },
            cites: [
              {
                source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
                loc: {
                  section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On April 26, 1986, a sudden surge of power during a reactor systems test destroyed Unit 4 of the nuclear power station at Chernobyl, Ukraine, in the former Soviet Union.',
        lang: 'en',
        cite: {
          source: 'nrc-backgrounder-on-chernobyl-nuclear-power-plant-accident',
          loc: { section: 'Backgrounder on Chernobyl Nuclear Power Plant Accident', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20200207141205id_/http://www.nrc.gov/reading-rm/doc-collections/fact-sheets/chernobyl-bg.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-04-28' },
            cites: [
              {
                source: 'gorbachev-2006-turning-point-at-chernobyl',
                loc: { section: 'VIEW: Turning point at Chernobyl', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Although the first report on Chernobyl appeared in Pravda on April 28, the situation was far from clear.',
        lang: 'en',
        cite: {
          source: 'gorbachev-2006-turning-point-at-chernobyl',
          loc: { section: 'VIEW: Turning point at Chernobyl', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.gorby.ru/en/presscenter/2006/04/view-turning-point-at-chernobyl-mikhail-s-gorbachev-kopiya'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-05-14' },
            cites: [
              {
                source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
                loc: { section: 'Document 230', para: '-2' }
              },
              {
                source: 'reagan-lib-1986-05-14-speakes-statement-on-gorbachev-chernobyl-address',
                loc: { section: 'Statement on Gorbachev’s Address on Chernobyl', para: '0' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Claiming that the worst was over, he said that the fire in reactor four was out and the other three reactors at the site had been shut down.',
        lang: 'en',
        cite: {
          source: 'frus-1981-88-v05-d230-gorbachev-speech-on-chernobyl',
          loc: { section: 'Document 230', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/historicaldocuments/frus1981-88v05/d230'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Chernobyl_04710017_%288134337381%29.jpg/1280px-Chernobyl_04710017_%288134337381%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Chernobyl_04710017_(8134337381).jpg',
    credit: { institution: 'IAEA Imagebank', creator: 'Vadim Mouchkin' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  },
  furtherReading: [
    { source: 'alexievich-1997-chernobylskaya-molitva', perspective: 'russian-soviet' }
  ]
})
