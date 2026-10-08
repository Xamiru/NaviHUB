import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'the-babi-and-bahai-movement',
  names: [
    { text: 'The Babi and Bahai movement', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  regions: ['iran', 'mena'],
  thread: [
    { ref: 'person:the-bab' },
    { ref: 'event:declaration-of-the-bab' },
    { ref: 'period:babi-movement' },
    { ref: 'person:molla-hosayn-boshrui' },
    { ref: 'person:tahereh-qorrat-al-ayn' },
    { ref: 'event:imprisonment-of-the-bab' },
    {
      ref: 'event:badasht-conference',
      quote: {
        id: 'q4',
        text: 'Qorrat-al-ʿAyn was perhaps the guiding spirit behind the events at the enclave of Badašt in 1848, when a group of Babis proclaimed the abrogation of the Islamic Šarīʿa.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/babism' }
      }
    },
    { ref: 'person:qoddus' },
    {
      ref: 'event:shaykh-tabarsi-uprising',
      quote: {
        id: 'q5',
        text: 'As the new creed spread, violence broke out between Shiʿites and Babis, ending when Qajar government troops intervened to besiege and massacre the Babis.',
        lang: 'en',
        cite: {
          source: 'iranica-cole-bahaism-i',
          loc: { section: 'BAHAISM i. The Faith', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
        }
      }
    },
    { ref: 'event:zanjan-upheaval' },
    { ref: 'event:nayriz-upheaval' },
    { ref: 'event:execution-of-the-bab' },
    {
      ref: 'event:babi-attempt-on-naser-al-din-shah',
      quote: {
        id: 'q6',
        text: 'Some Babi leaders in Tehran plotted, in revenge, the death of Nāṣer-al-Dīn Shah, but the assassination failed and large numbers of suspected Babis were tortured and killed.',
        lang: 'en',
        cite: {
          source: 'iranica-cole-bahaism-i',
          loc: { section: 'BAHAISM i. The Faith', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
        }
      }
    },
    { ref: 'event:execution-of-tahereh' },
    { ref: 'person:bahaullah' },
    { ref: 'person:sobh-e-azal' },
    {
      ref: 'event:faramush-khana',
      quote: {
        id: 'q7',
        text: 'It is, in fact, important to remember that the farāmūš-ḵānas were regarded by many as centers for Babi recruitment and proselytizing',
        lang: 'en',
        cite: { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/azali-babism'
        }
      }
    },
    { ref: 'event:declaration-of-bahaullah' },
    { ref: 'event:babi-bahai-schism' },
    {
      ref: 'person:mirza-aqa-khan-kermani',
      quote: {
        id: 'q8',
        text: 'Rūḥī and Āqā Khan formed the core of a group of Azalis resident in Istanbul in the 1880s and 90s who had close links with political activists such as Mīrzā Malkom Khan (q.v.) and Sayyed Jamāl-al-dīn Afḡānī.',
        lang: 'en',
        cite: { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/azali-babism'
        }
      }
    },
    {
      ref: 'event:assassination-of-naser-al-din-shah',
      quote: {
        id: 'q9',
        text: 'Neither Jamāl-al-dīn Afḡānī nor Mīrzā Moḥammad Reżā Kermānī, the assassin of Nāṣer-al-dīn Shah, were Babis, although both were often described as such.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-azali-babism',
          loc: { section: 'AZALI BABISM', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/azali-babism'
        }
      }
    },
    {
      ref: 'event:persian-constitutional-revolution',
      quote: {
        id: 'q10',
        text: 'Edward Browne noted that it was “a remarkable fact that several very prominent supporters of the Persian Constitutional Movement were, or had the reputation of being, Azalīs”',
        lang: 'en',
        cite: { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '9' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/azali-babism'
        }
      }
    },
    {
      ref: 'period:reign-of-reza-shah',
      quote: {
        id: 'q11',
        text: 'From 1934, however, the Reżā Shah period was not a particularly happy one for the Iranian Bahai community, though violence against them occurred much less frequently because of better security and less influence over affairs by the Shiʿite ʿolamāʾ.',
        lang: 'en',
        cite: {
          source: 'iranica-cole-bahaism-i',
          loc: { section: 'BAHAISM i. The Faith', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
        }
      }
    },
    {
      ref: 'period:reign-of-mohammad-reza-shah',
      quote: {
        id: 'q12',
        text: 'In 1955, in a move which seems to have done as much for the appeasement of ʿolamāʾ as to divert the attention of the general populace from unpopular policies, including the forging of a US-British-sponsored military alliance (the Baghdad Pact), the shah’s military destroyed the dome of the Bahai center in Tehran',
        lang: 'en',
        cite: {
          source: 'iranica-cole-bahaism-i',
          loc: { section: 'BAHAISM i. The Faith', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
        }
      }
    }
  ],
  related: [
    { ref: 'theme:womens-rights-in-iran' },
    { ref: 'theme:constitutionalism-in-iran' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Shrine_of_the_B%C3%A1b_in_Haifa_6801-11.jpg/1280px-Shrine_of_the_B%C3%A1b_in_Haifa_6801-11.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shrine_of_the_B%C3%A1b_in_Haifa_6801-11.jpg',
    credit: { institution: 'Haifa Municipality', creator: 'Zvi Roger' },
    license: { id: 'cc-by', version: '3.0', url: 'https://creativecommons.org/licenses/by/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Although the Babi movement as such was rapidly crushed and rendered politically and religiously insignificant, the impetus towards the proclamation of a post-Islamic revelation was continued in Bahaism which began as a Babi sect in competition with that of the Azalī Babism during the 1860s.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q2',
          text: 'Paradoxically, Azali conservatism in religious matters seems to have provided a matrix within which radical social and political ideas could be propounded.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'Since its inception in 1979, the Islamic Republic of Iran has, despite denials and explanations, demonstrated every intention of destroying the Bahai community altogether.',
          lang: 'en',
          cite: {
            source: 'iranica-cole-bahaism-i',
            loc: { section: 'BAHAISM i. The Faith', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' },
    {
      source: 'vahman-2010-yeksad-o-shast-sal-mobarezeh-ba-diyanat-e-bahai',
      perspective: 'iranian'
    }
  ]
})
