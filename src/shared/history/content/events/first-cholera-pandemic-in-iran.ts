import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-cholera-pandemic-in-iran',
  names: [
    { text: 'First cholera pandemic in Iran', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'epidemic',
  start: {
    alts: [
      {
        value: { d: '1821-06' },
        cites: [
          {
            source: 'iranica-de-planhol-balland-cholera',
            loc: { section: 'CHOLERA i. In Persia', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:bushehr',
      cites: [
        {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
        }
      ]
    },
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    {
      ref: 'event:ottoman-persian-war-1821-1823',
      rel: 'related',
      cites: [
        {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
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
          text: 'In Persian cholera was usually called wabā (wabāʾ), the term for any epidemic disease, but sometimes also hayża, which was more correctly applied to clinically similar but relatively benign diseases with which cholera was frequently confused before the German Robert Koch (1843-1910) discovered the bacterium (cholera vibrio, Vibrio comma, Vibrio cholerae Pacini 1854; Howard-Jones, p. 20) in 1301/1884, for example, Cholera sporadica (wabā-­ye pāʾīza “autumn cholera,” ṯeql-e sard “sporadic chol­era”) and infant diarrheas (Cholera ablactatorum; Schlimmer, pp. 130-35; Polak, I, p. 196, II, p. 345). In fact, it is possible to recognize the first clear appearance of the disease in Persia in the first great pandemic, which broke out in India in 1232/1817 and reached Persia in 1236/1821.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-balland-cholera',
            loc: { section: 'CHOLERA i. In Persia', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/cholera-disease/'
          }
        },
        {
          id: 'q2',
          text: 'It reached Tabrīz only in Šawwāl and Ḏu’l-qaʿda/July and August of the following summer, having arrived overland from Mesopotamia and the Ottoman empire, no doubt carried by Persian troops fighting the Turks north of Lake Urmia, especially after their scattered retreat.',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-balland-cholera',
            loc: { section: 'CHOLERA i. In Persia', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cholera-disease/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q3',
          text: 'In 1236/1821 at Būšehr, though the majority of the population of about 10,000 fled the city at the first warning of the disease, there were nevertheless about 400 deaths, thirty to forty a day at the peak of the epidemic, with a maximum of forty-three in one day and an average of thirteen or fourteen a day over the entire period of the outbreak',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-balland-cholera',
            loc: { section: 'CHOLERA i. In Persia', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cholera-disease/'
          }
        },
        {
          id: 'q4',
          text: 'At Shiraz, where the population was estimated at 35,000-40,000, there were eighty deaths on the first day of the epidemic and 200 on the third; the total was certainly as high as 5,000-6,000, that is, 12-15 percent of the population',
          lang: 'en',
          cite: {
            source: 'iranica-de-planhol-balland-cholera',
            loc: { section: 'CHOLERA i. In Persia', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cholera-disease/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'This campaign ended abruptly, however, with the prince’s death from cholera at Ṭāq-e Garrā during his withdrawal.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
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
            value: { d: '1821-06' },
            cites: [
              {
                source: 'iranica-de-planhol-balland-cholera',
                loc: { section: 'CHOLERA i. In Persia', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The first pandemic initially arrived by sea, reaching Būšehr in Ramażān 1236/June 1821 and spreading from there to Dālakī, Kāzerūn, Shiraz, Ābāda, and Isfahan before being temporarily halted by the winter cold',
        lang: 'en',
        cite: {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/cholera-disease/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1823-04' },
            cites: [
              {
                source: 'iranica-de-planhol-balland-cholera',
                loc: { section: 'CHOLERA i. In Persia', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'It continued to spread eastward, however, reaching Tehran, where the principal outbreak occurred in Rajab 1238/April 1823',
        lang: 'en',
        cite: {
          source: 'iranica-de-planhol-balland-cholera',
          loc: { section: 'CHOLERA i. In Persia', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/cholera-disease/'
        }
      }
    }
  ],
  archive: [
    {
      id: 'fraser-1825',
      mediaKind: 'document',
      title: 'Narrative of a journey into Khorasan, in the years 1821 and 1822. Including some account of the countries to the north-east of Persia; with remarks upon the national character, government, and resources of that kingdom',
      date: { d: '1825' },
      url: 'https://archive.org/download/narrativeofjourn00frasuoft/narrativeofjourn00frasuoft.pdf',
      page: 'https://archive.org/details/narrativeofjourn00frasuoft',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'James Baillie Fraser'
      },
      license: { id: 'public-domain' },
      bytes: 67777574
    },
    {
      id: 'fraser-1826',
      mediaKind: 'document',
      title: 'Travels and adventures in the Persian provinces on the southern banks of the Caspian Sea [microform] : with an appendix, containing short notices on the geology and commerce of Persia',
      date: { d: '1826' },
      url: 'https://archive.org/download/travelsadventure00frasrich/travelsadventure00frasrich.pdf',
      page: 'https://archive.org/details/travelsadventure00frasrich',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'James Baillie Fraser'
      },
      license: { id: 'public-domain' },
      bytes: 22308533
    }
  ]
})
