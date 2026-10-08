import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'oil-in-iran',
  names: [
    { text: 'Oil in Iran', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  regions: ['iran', 'europe'],
  thread: [
    { ref: 'event:reuter-concession' },
    {
      ref: 'event:imperial-bank-of-persia',
      quote: {
        id: 'q5',
        text: 'Under this new concession the bank had the right to exploit all mineral resources throughout the country, except gold, silver, and other precious metals.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '-1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    { ref: 'event:darcy-oil-concession' },
    { ref: 'person:william-knox-darcy' },
    { ref: 'event:oil-strike-masjed-soleyman' },
    {
      ref: 'event:anglo-persian-oil-company-formation',
      quote: {
        id: 'q6',
        text: 'In June 1913 Winston Churchill, in his capacity as First Lord of the Admiralty, presented the Cabinet with a key memorandum on “Oil Fuel Supply for His Majesty’s Navy.” The Cabinet agreed in principle that the government should “acquire a controlling interest in trustworthy sources of supply.”',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      ref: 'event:iran-in-the-first-world-war',
      quote: {
        id: 'q7',
        text: 'During World War I the British government made a concerted effort to protect the oil flow from Iran because of its critical importance to the operation of the Royal Navy.',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-anglo-persian-oil-company',
          loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
        }
      }
    },
    { ref: 'event:subjugation-of-sheikh-khazal' },
    {
      ref: 'person:reza-shah-pahlavi',
      quote: {
        id: 'q8',
        text: 'Under the rule of Reza Shah, Iran embarked on an impressive program of modernization whose implementation required substantial financial resources. Foreign loans were excluded, for they would have compromised Reza Shah’s sense of national independence. Although internal indirect taxes on such everyday items as tea and sugar were raised to fund projects such as the Trans-Iranian Railway, the Shah could ill afford any loss of revenues, an increasing proportion of which came from the APOC’s royalty and tax payments.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      ref: 'person:abdolhossein-teymourtash',
      quote: {
        id: 'q9',
        text: 'Reza Shah rejected the validity of the Armitage-Smith Agreement of 1920 on the ground that he had exceeded his authority in reaching the agreement. The APOC regarded the agreement as valid, but recognized the desirability of revising the concession. To this end discussions were opened in 1928 by Sir John Cadman (q.v.), the chairman of APOC, and ʿAbd-al-Ḥosayn Teymurtāš, the court minister.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    { ref: 'event:cancellation-of-the-darcy-concession' },
    {
      ref: 'person:ahmad-qavam',
      quote: {
        id: 'q10',
        text: 'In June 1947, some months before the Majles passed the single article law of 22 October, the then prime minister, Aḥmad Qavām (Qāwām-al-Ṣalṭana), warned Sir John Le Rougetel, the British ambassador in Tehran, that the Iranian government might before long feel obligated to “attack” AIOC so that it would appear even handed in opposing Soviet concessionary aims in northern Iran. Appealing to nationalist sentiment, he broadcast a speech on 1 December 1947, asserting that when he informed the Soviet government of the parliament’s rejection of the proposed Irano-Soviet Oil Company, he had brought up the question of AIOC’s concession and would insist on satisfaction for the Iranian people',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      ref: 'event:founding-of-the-national-front-of-iran',
      quote: {
        id: 'q11',
        text: 'During the elections for the sixteenth session, many candidates, especially the National Front nominees led by Dr. Moḥammad Moṣaddeq, made the new oil agreement a major campaign issue, and when the new prime minister, General ʿAlī Razmārā, reintroduced the agreement to the newly elected Majlis in 1950, Moṣaddeq and his allies led a successful fight against it',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-anglo-persian-oil-company',
          loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
        }
      }
    },
    { ref: 'event:assassination-of-ali-razmara' },
    { ref: 'event:nationalization-of-the-iranian-oil-industry' },
    {
      ref: 'person:mohammad-mosaddegh',
      quote: {
        id: 'q12',
        text: 'Moṣaddeq succeeded in nationalizing Iranian oil but failed in making nationalization work for the benefit of his country. Nonetheless he must be accorded the credit for the effort he made, and for his success, even at a high price to himself and to the people of Iran, in eliminating from Iran the last vestiges of foreign control.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '50' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      ref: 'event:1953-iranian-coup',
      quote: {
        id: 'q13',
        text: 'Finally with active Anglo-American encouragement, Dr. Moṣaddeq was dismissed by the Shah, but upon his resistance against the dismissal the Shah left the country. This was followed by an uprising in Tehran in favor of the Shah which led to the overthrow of Dr. Moṣaddeq’s government in August 1953, the installation of General Faẓl-Allāh Zāhedi’s government, and the return of the Shah to the country',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '48' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    },
    {
      ref: 'event:iranian-oil-consortium-agreement-1954',
      quote: {
        id: 'q14',
        text: 'In 1954 the final arrangements for the consortium granted the AIOC a forty-percent share of Iranian oil; another forty percent was given to American oil companies, and the remainder was assigned to other European oil concerns.',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-anglo-persian-oil-company',
          loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
        }
      }
    },
    { ref: 'event:founding-of-opec' },
    { ref: 'event:tehran-agreement-1971' },
    { ref: 'event:1973-oil-crisis' },
    { ref: 'event:iran-iraq-war' }
  ],
  related: [
    { ref: 'theme:iran-and-britain' },
    { ref: 'theme:constitutionalism-in-iran' },
    { ref: 'theme:nationalism-in-the-middle-east' },
    { ref: 'theme:the-cold-war' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Abadan_the_city_of_Oil.jpg/1280px-Abadan_the_city_of_Oil.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abadan_the_city_of_Oil.jpg',
    credit: { institution: 'Iran Today (Iranian Department of Publication and Broadcasting)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The history of Iranian oil agreements began with an unprecedented concession granted by Nāṣer-al-Din Shah in 1872 to Baron Julius de Reuter, a British subject of German origin',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '-1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'The concession agreements, which were the legal basis on which the oil industry was run in most oil producing countries until early 1970s, can best be summed up as an arrangement whereby a government grants exclusive rights to a company or an individual to carry out petroleum operations in a defined area for a finite period. The concessionaire bears the burden of the financial and commercial risks but acquires the right to excavate the oil and dispose of it freely in exchange for the payment of certain specified sums to the government as the owner of resources',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '0' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'On 7 March 1951 Razmārā was assassinated, and within several days a bill to nationalize the oil industry was passed.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        },
        {
          id: 'q3',
          text: 'Thus the British company, first as Anglo-Persian, then as Anglo-Iranian Oil, operated in Iran for forty-two years, during thirty-nine of which it was the most important oil producer, refiner and exporter in the Persian Gulf area. During those thirty-nine years (1912-51, FIGURE 1, FIGURE 2) it exported a total of 338 million tons of oil from Iran for which it paid Iran ₤118,000,000 representing an average of about 7 shillings per ton. According to an estimate made by the author of Persian Oil the Anglo-Iranian’s total investment in Iran amounted to ₤21,656,252 of which ₤5,000,000 was provided by the British government. In return for this investment the company’s stockholders received ₤115,000,000 in dividends, of which ₤49,000,000 went to the British government apart from the sum of ₤175,000,000 which was paid to it as tax.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q16',
          text: 'In the years following nationalization, the exercise of effective control over the exploitation of petroleum resources had been at the forefront of NIOC’s agenda and had shaped its approach to international petroleum agreements.The 1957 Petroleum Act initially provided the vehicle for the achievement of these objectives.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '104' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q4',
          text: 'Finally with de facto changes in the contractual relationship with the Consortium Members and signing of the Sale and Purchase Agreement in 1973 followed by enactment of a new Petroleum Act and conclusion of several Risk Service Contracts in 1974, NIOC had, at last, reached its long cherished objective of full and complete control of the Iranian Oil Industry and resources.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '105' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'fateh-1979-panjah-sal-naft-e-iran', perspective: 'iranian' },
    { source: 'rouhani-1973-tarikh-e-melli-shodan-e-sanat-e-naft', perspective: 'iranian' },
    { source: 'makki-1983-ketab-e-siyah', perspective: 'iranian' },
    { source: 'movahhed-1999-khvab-e-ashofteh-ye-naft', perspective: 'iranian' }
  ]
})
