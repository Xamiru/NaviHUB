import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nationalization-of-the-iranian-oil-industry',
  names: [
    { text: 'Nationalization of the Iranian oil industry', lang: 'en', role: 'primary' },
    { text: 'ملی شدن صنعت نفت ایران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'nationalization',
  start: {
    alts: [
      {
        value: { d: '1951-03-15' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '27' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1951-05-01' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '28' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:abadan',
      cites: [
        {
          source: 'pahlavi-1961-mission-for-my-country',
          loc: { section: 'Mission for My Country' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' },
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:mohammad-mosaddegh',
      role: 'leader',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '27' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    },
    {
      ref: 'person:hossein-fatemi',
      role: 'ideologue',
      cites: [
        {
          source: 'iranica-azimi-fatemi-hosayn',
          loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '2' }
        }
      ]
    },
    {
      ref: 'person:abol-ghasem-kashani',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '40' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'pahlavi-1961-mission-for-my-country',
          loc: { section: 'Mission for My Country' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:founding-of-the-national-front-of-iran', rel: 'preceded-by' },
    {
      ref: 'event:1953-iranian-coup',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
        }
      ]
    },
    {
      ref: 'event:iranian-oil-consortium-agreement-1954',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '51' }
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
          text: 'On 15 March 1951, upon the recommendation of the special oil committee headed by Moṣaddeq, the principle of nationalization of Iran’s oil industry received parliamentary approval and on 20 March the Senate followed the example of the Majles and adopted the nationalization law.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'He put through the Majles a bill for the nationalization of Persian oil and entered into a protracted struggle against the British for redressing the country’s right to its resources.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1947, for instance, the taxes paid by the company to the British government were more than double the total sum received by the Persian government from the company in that year (Elm, p. 37).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q4',
          text: 'In November 1950, the Majlis committee concerned with oil matters, headed by Mossadeq, rejected a draft agreement in which the AIOC had offered the government slightly improved terms. These terms did not include the fifty-fifty profit-sharing provision that was part of other new Persian Gulf oil concessions.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q5',
          text: 'On 12 December 1950 Iranian newspapers published Kāšāni’s fatwa. In his edict, “the great leader of Muslims” established “the religious and patriotic duty of the Islamic people of Iran” (Šāhed-e kešāvarzān, 13 December 1950). Kāšāni ruled that “all Iranians should demand the nationalization of Iran’s oil industry throughout the entire geographical expanse of the country” (ibid.).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'The one thing that united this coalition was vehement anti-British Sentiment, which found an outlet in the issue which dominated Iranian politics: the oil question.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q7',
          text: 'The major objectives of Iran’s nationalization consisted of: The establishment of Iran’s sovereignty, ownership and control of the country’s oil industry and resources; the eradication of British political and economic influence in Iran; and the mobilization of financial resources for the implementation of the country’s development plans which needed to be financed largely from the oil revenue and foreign borrowing.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'The nine-points law provided for the implementation of nationalization, covering, inter alia, provisions for expropriation of the assets of the Anglo-Iranian Oil Company, the settlement of claims and counter claims of the two parties, the establishment of the National Iranian Oil Company for the operation of the Iranian oil industry, and arrangements for the uninterrupted sale of oil to the former customers of AIOC (Elm, pp. 91-93).',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q9',
          text: 'Oil production came to a virtual standstill as British technicians left the country, and Britain imposed a worldwide embargo on the purchase of Iranian oil.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q10',
          text: 'By 1952, Iranian production had plummeted to just 20,000 barrels per day, compared to 664,000 in 1950, while total world production had risen from 10.9 million barrels per day in 1950 to 13.0 million in 1952, an increase more than three times greater than Iran’s total output in 1950 (Yergin, p. 464).',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q11',
          text: '1951 The Oil Nationalization Law is passed; Britain boycotts the purchase of Iranian oil and appeals to the United Nations Security Council. Moṣaddeq presents Iran’s case to the Council, which in turn refers the case to the International Court of Justice at The Hague; a ruling is made Iran’s favor.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1951' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'The economy began to suffer from the loss of foreign exchange and oil revenues.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q13',
          text: 'Moṣaddeq succeeded in nationalizing Iranian oil but failed in making nationalization work for the benefit of his country. Nonetheless he must be accorded the credit for the effort he made, and for his success, even at a high price to himself and to the people of Iran, in eliminating from Iran the last vestiges of foreign control.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q17',
          text: 'Mossadegh, however, declined to recognize the International Court’s jurisdiction. The British Government thereupon referred the dispute to the Security Council of the United Nations. In October 1951, after considerable debate, the Security Council decided it should wait to consider the case until the International Court had ruled on its own jurisdiction.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1961-mission-for-my-country',
            loc: { section: 'Mission for My Country' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q19',
          text: 'By an irony of history it was on that same day that the International Court handed down its decision that it had no jurisdiction in the oil dispute.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1961-mission-for-my-country',
            loc: { section: 'Mission for My Country' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
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
            value: { d: '1951-04-28' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 28 April 1951 Moṣaddeq was appointed prime minister and on the same day another law known as the nine-points law, was enacted by the Majles and passed the Senate on the 29th, and received royal assent on 1 May 1951.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1951-06-19' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '34' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The Jackson Mission. On 19 June 1951, the British delegation headed by Basil Jackson the AIOC Director offered, on behalf of the AIOC, to advance the Iranian government 10 million Pounds and, in addition, to make monthly advances of 3 million Pounds Sterling while discussions were proceeding and as for arrangements which would maintain efficient operations while being consistent with the principle of nationalization, proposed that Iranian assets of the AIOC would be vested in National Iranian Oil Company (NIOC) which would grant the use of the assets to a new subsidiary to be established by AIOC. The new subsidiary would have Iranian directors on its board and would, in effect, operate the Iranian oil industry using the assets owned by NIOC. The AIOC’s distribution business in Iran would be transferred to NIOC (Bamberg, pp. 422-30).',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '34' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1951-08-11' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '35' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Stokes mission. On 11 August 1951, a British delegation headed by Richard Stokes, Lord Privy Seal, handed an eight-point memorandum containing proposals for an oil settlement to the Iranian government.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '35' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1951-11-10' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '41' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The International Bank’s Proposal. While Moṣaddeq was in Washington for talks with the US State Department, it was suggested to him by the Pakistani ambassador that the International Bank of Reconstructions and Development (The World Bank) might be able to help relieve the oil crisis. Moṣaddeq expressed interest in the idea, and on 10 November 1951, Robert Garner, Vice President of the International Bank, called on him and outlined in general terms the principles on which the Bank might be able to help restart the Iranian oil industry.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '41' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1952-08-30' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '42' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The Churchill-Truman proposals which were amended and improved several times were first officially presented to Dr. Moṣaddeq on 30 August 1952 by George Middleton and Loy Henderson the British and American ambassadors in Tehran',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-03-20' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '47' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On 7 March 1953 a communiqué was issued in Washington, stating that the US government regarded the proposals of 20 February 1953 as fair and reasonable and in keeping with the principle of oil nationalization, but on the 20 March, Moṣaddeq made a broadcast speech rejecting the proposals of 20 February.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '47' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Internationaal_Hof_van_Justitie._Zitting_oliekwestie_Perzie_en_Engeland%2C_Bestanddeelnr_905-1524.jpg/1280px-Internationaal_Hof_van_Justitie._Zitting_oliekwestie_Perzie_en_Engeland%2C_Bestanddeelnr_905-1524.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Internationaal_Hof_van_Justitie._Zitting_oliekwestie_Perzie_en_Engeland,_Bestanddeelnr_905-1524.jpg',
    credit: { institution: 'Nationaal Archief', creator: 'Harry Pot' },
    license: { id: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en' }
  },
  archive: [
    {
      id: 'longines-chronoscope-henry-f-grady-1951',
      mediaKind: 'video',
      title: 'LONGINES CHRONOSCOPE WITH HENRY F. GRADY',
      date: { d: '1951-10-24' },
      url: 'https://archive.org/download/gov.archives.arc.95708/gov.archives.arc.95708_512kb.mp4',
      page: 'https://archive.org/details/gov.archives.arc.95708',
      credit: { institution: 'National Archives and Records Administration' },
      license: { id: 'cc0', version: '1.0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' },
      bytes: 63721012,
      durationSec: 881
    }
  ],
  furtherReading: [
    { source: 'rouhani-1973-tarikh-e-melli-shodan-e-sanat-e-naft', perspective: 'iranian' },
    { source: 'makki-1983-ketab-e-siyah', perspective: 'iranian' },
    { source: 'movahhed-1999-khvab-e-ashofteh-ye-naft', perspective: 'iranian' },
    { source: 'safai-1992-eshtebah-e-bozorg', perspective: 'iranian' },
    { source: 'fateh-1979-panjah-sal-naft-e-iran', perspective: 'iranian' }
  ]
})
