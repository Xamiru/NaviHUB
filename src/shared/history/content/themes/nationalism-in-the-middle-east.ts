import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'nationalism-in-the-middle-east',
  names: [
    { text: 'Nationalism in the Middle East', lang: 'en', role: 'primary' }
  ],
  regions: ['mena', 'iran', 'europe'],
  thread: [
    {
      ref: 'event:edict-of-gulhane',
      quote: {
        id: 'q5',
        text: 'Facing internal dissent and increasing external pressures, Ottoman government began to implement European-inspired reforms during the 19th century, commonly referred to as the Tanzimat era.',
        lang: 'en',
        cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Introduction', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      ref: 'event:reforms-of-amir-kabir',
      quote: {
        id: 'q6',
        text: 'Persia’s reform movement, which was primarily a response of the reforming Persian literati to the challenges of Western powers, was instrumental in promoting new ideas of nation and national homeland.',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-iranian-identity-19th-20th',
          loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
        }
      }
    },
    {
      ref: 'event:ottoman-constitution-of-1876',
      quote: {
        id: 'q7',
        text: 'The reforms included establishing an Ottoman constitution and parliament during the First Constitutional Era (1876-1878), which were dissolved in 1879 but reinstated in 1908.',
        lang: 'en',
        cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Introduction', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      ref: 'period:reign-of-abdul-hamid-ii',
      quote: {
        id: 'q8',
        text: 'Abdul Hamid tried to earn the loyalty of his Muslim subjects by preaching pan-Islamic ideas and in 1908 completing the Hijaz Railway between Istanbul and Medina.',
        lang: 'en',
        cite: {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'Ottoman Empire', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/syria/7.htm' }
      }
    },
    { ref: 'event:urabi-revolt' },
    {
      ref: 'person:mirza-aqa-khan-kermani',
      quote: {
        id: 'q9',
        text: 'The intellectual forerunners of romantic nationalism included Mirzā Fatḥ-ʿAli Āḵundzāda, Jalāl-al-Din Mirzā Qājār, and Mirzā Āqā Khan Kermāni',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-iranian-identity-19th-20th',
          loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
        }
      }
    },
    { ref: 'event:tobacco-protest' },
    { ref: 'event:first-zionist-congress' },
    {
      ref: 'event:persian-constitutional-revolution',
      quote: {
        id: 'q10',
        text: 'The intellectual ideas of the constitutional movement was primarily oriented toward two fundamental goals: creating a ‘modern nation-state’ in order to develop the resources of the country and protect its autonomy vis-à-vis foreign powers, and forming a nation by transforming the people from “subjects” (raʿāyā) to citizens, with a greater participation in the political life of the country.',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-iranian-identity-19th-20th',
          loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
        }
      }
    },
    {
      ref: 'event:young-turk-revolution',
      quote: {
        id: 'q11',
        text: 'After 1908, however, it quickly became clear that the nationalism of Abdul Hamid\'s successors was Turkish nationalism bent on Turkification of the Ottoman domain rather than on granting local autonomy.',
        lang: 'en',
        cite: {
          source: 'loc-jordan-country-study-1989',
          loc: { section: 'ARAB NATIONALISM AND ZIONISM', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/jordan/7.htm' }
      }
    },
    {
      ref: 'event:arab-revolt',
      quote: {
        id: 'q12',
        text: 'Against this backdrop, the leaders of the Arab Revolt launched their rebellion in the name of Arab and Muslim unity, freedom, and independence.',
        lang: 'en',
        cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Introduction', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    { ref: 'event:sykes-picot-agreement' },
    { ref: 'event:balfour-declaration' },
    {
      ref: 'event:egyptian-revolution-of-1919',
      quote: {
        id: 'q13',
        text: 'The British authorities arrested its leadership, sparking a wave of strikes and demonstrations across Egypt, precipitating what came to be known as the “1919 Revolution” and marking a watershed in the Egyptian struggle against British rule.',
        lang: 'en',
        cite: {
          source: 'eo1418-manela-wilsonian-moment',
          loc: { section: 'The Colonial World Mobilized', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/wilsonian-moment/'
        }
      }
    },
    {
      ref: 'event:turkish-war-of-independence',
      quote: {
        id: 'q14',
        text: 'Revered by his troops as well as the Turkish masses, Atatürk soon emerged as the standard-bearer of the Turkish nationalist movement.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    },
    {
      ref: 'event:iraqi-revolt-of-1920',
      quote: {
        id: 'q15',
        text: 'In 1920, Iraqis from different religious and tribal groups revolted together against British occupation of their lands.',
        lang: 'en',
        cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Aftermath', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      ref: 'event:proclamation-of-the-republic-of-turkey',
      quote: {
        id: 'q16',
        text: 'Its main points were enumerated in the "Six Arrows" of Kemalism: republicanism, nationalism, populism, reformism, etatism (statism), and secularism.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '24' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    },
    {
      ref: 'period:reign-of-reza-shah',
      quote: {
        id: 'q17',
        text: 'Similar to the common pattern of the early 20th century, the Pahlavi nation-state was founded on self-glorification.',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-iranian-identity-19th-20th',
          loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
        }
      }
    },
    { ref: 'event:great-syrian-revolt' },
    { ref: 'event:arab-revolt-in-palestine' },
    {
      ref: 'event:founding-of-the-national-front-of-iran',
      quote: {
        id: 'q18',
        text: 'The main proponents of this mode of national identity in the mid-20th century included the National Front (Jebha-ye melli), a loose coalition of various organizations (under the leadership of Mohammad Moṣaddeq) with different persuasions from the right to the left of the political spectrum',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-iranian-identity-19th-20th',
          loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '30' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
        }
      }
    },
    { ref: 'event:nationalization-of-the-iranian-oil-industry' },
    { ref: 'event:egyptian-revolution-of-1952' },
    {
      ref: 'person:gamal-abdel-nasser',
      quote: {
        id: 'q19',
        text: 'Arab nationalism peaked in strength under Egyptian president Jamāl ‘Abd al-Nāṣer (1918-1970) in the 1950s and 1960s with his land reforms, nationalization projects, and his role in the formation of the United Arab Republic with Syria.',
        lang: 'en',
        cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Notes', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    },
    {
      ref: 'event:suez-crisis',
      quote: {
        id: 'q20',
        text: 'His Egyptian nationalism became Arab nationalism when he decided that if the Arab countries worked together, they would have the resources to solve their individual problems.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '37'
          }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
      }
    },
    { ref: 'event:iraqi-revolution-of-1958' },
    {
      ref: 'event:six-day-war',
      quote: {
        id: 'q21',
        text: 'The movement fell into decline for a variety of reasons but was dealt a particularly heavy blow by the inability of the Arab coalition to successfully defend Palestine against Israeli territorial expansion in 1967.',
        lang: 'en',
        cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Notes', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
        }
      }
    }
  ],
  related: [
    { ref: 'theme:decolonization' },
    { ref: 'theme:the-two-world-wars' },
    { ref: 'theme:constitutionalism-in-iran' },
    { ref: 'theme:oil-in-iran' },
    { ref: 'theme:iran-and-britain' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Feisal_party_at_Paris_Peace_Conference_1919111-SC-52371.jpg/1280px-Feisal_party_at_Paris_Peace_Conference_1919111-SC-52371.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Feisal_party_at_Paris_Peace_Conference_1919111-SC-52371.jpg',
    credit: { institution: 'US National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'As nationalist movements gained momentum in Europe during the 19th and 20th centuries, minorities within the Ottoman Empire such as the Greeks (1821-1832), Bulgarians (1876), and Serbians (1804-1817) revolted against the regime seeking various levels of autonomy and independence.',
          lang: 'en',
          cite: {
            source: 'eo1418-el-bakri-arab-revolt',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        },
        {
          id: 'q2',
          text: 'In the last two decades of the nineteenth century, two separate movements developed that were to have continuing effects for all of the Middle East--the Arab revival and Zionism.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'ARAB NATIONALISM AND ZIONISM', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/jordan/7.htm' }
        },
        {
          id: 'q3',
          text: 'Appearing sporadically in the 19th century, the ideas of popular, liberal nationalism flourished in the course of the 1905-11 Constitutional Revolution (q.v.), and later they were transformed into a state-sponsored form of ethno-nationalism during the Pahlavi period (1925-78).',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-iranian-identity-19th-20th',
            loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
          }
        },
        {
          id: 'q4',
          text: 'Arab nationalism continued to develop into a full-fledged political movement after World War I, taking on new forms with changing times and local contexts. Its development was largely due to the legacy of the mandate system imposed by Britain and France in the war’s wake.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Conclusion', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  furtherReading: [
    { source: 'antonius-1939-the-arab-awakening', perspective: 'arab' },
    { source: 'hourani-1983-arabic-thought-in-the-liberal-age', perspective: 'arab' },
    { source: 'khalidi-2010-palestinian-identity', perspective: 'palestinian' },
    { source: 'shapira-1992-land-and-power', perspective: 'israeli' }
  ]
})
