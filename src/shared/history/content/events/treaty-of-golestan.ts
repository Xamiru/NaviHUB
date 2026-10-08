import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-golestan',
  names: [
    { text: 'Treaty of Golestan', lang: 'en', role: 'primary' },
    { text: 'عهدنامه گلستان', lang: 'fa', role: 'native' },
    {
      text: 'Treaty of Gulistan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1813-10-24', julian: true },
        cites: [
          {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } }
        ]
      },
      {
        value: { d: '1813-10-21' },
        cites: [
          {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Emineh Pakravan' }
        ]
      },
      {
        value: { d: '1813-03' },
        cites: [
          {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '6' }
          }
        ]
      },
      {
        value: { d: '1812' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:golestan',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '7' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:russo-persian-war-1804-1813' },
    { ref: 'period:qajar-dynasty' }
  ],
  sides: [
    {
      key: 'persia',
      name: 'Persia',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '7' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      side: 'persia',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '6' }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '6' }
        }
      ]
    },
    {
      ref: 'person:abul-hasan-khan-ilchi',
      role: 'signatory',
      side: 'persia',
      cites: [
        {
          source: 'iranica-javadi-abul-hasan-khan-ilci',
          loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '6' }
        }
      ]
    },
    {
      ref: 'person:gore-ouseley',
      role: 'negotiator',
      side: 'persia',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '7' }
        }
      ]
    },
    {
      name: 'N. R. Ritischev',
      role: 'negotiator',
      side: 'russia',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '7' }
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
          text: 'GOLESTĀN TREATY (Treaty of Gulistan), agreement arranged under British auspices to end the Russo-Persian War of 1218-28/1804-13',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q2',
          text: 'The parties met for talks at the village of Golestān in Qarābāḡ, with Ritischev representing Russia and Abu’l-Ḥasan Khan and Ouseley as representatives for Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q3',
          text: 'It provided for cessation of all hostilities between Russia and Persia (Article 1) and a demarcation of the frontier between them on the basis of the status quo ad presentem, i.e., with each side essentially keeping the territory then under its control.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q4',
          text: 'The Persian shah was obliged to recognize the sovereignty of the tsar over Georgia, Mingrelia, Abkhazia, Ganja, Qarābāḡ, Qobba, Darband, Baku, Dāḡestān, Šakki, and other territories (Article 3).',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q5',
          text: 'Russia was also guaranteed the right of access for its commercial ships to Persian ports on the Caspian and the exclusive right to maintain ships-of-war on the Caspian (Article 5).',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q16',
          text: 'The rise of French influence in Persia, viewed as the prelude to an attack on India, had greatly alarmed the British, and the Franco-Russian rapprochement at Tilsit conveniently provided an opportunity for a now isolated Britain to resume its efforts in Persia, as reflected in the subsequent missions of John Malcolm (1807-8) and Harford Jones (1809).',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q6',
          text: 'Then, in the third and final twist to this story, Napoleon invaded Russia in June 1812, making Russia and Britain allies once again. Britain, like France after Tilsit, was thus obliged to steer a course between antagonizing Russia and violating its commitments to Persia, with its best option being to broker a settlement of the conflict between the two.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In two disastrous wars with Russia, which ended with the Treaty of Gulistan (1812) and the Treaty of Turkmanchay (1828), Iran lost all its territories in the Caucasus north of the Aras River.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q8',
          text: 'This deliberately ambiguous language was intended to get around a specific Russian demand to support ʿAbbās Mirzā as successor to the throne (having dropped an earlier, and insulting, demand to include formal recognition of Fatḥ-ʿAli as shah in the treaty; see Atkin, p. 143).',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q9',
          text: 'At the same time, the treaty vastly increased the role of Russia in the political and economic affairs of Persia while not fully satisfying the territorial ambitions of the Russians, particularly those of their governors and military officers in the Caucasus.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q10',
          text: 'The conclusion of the Golestān peace treaty not only resulted in the loss of precious territory in the Caucasus but also made Persia more susceptible to Russian imperial whim and to British insidious conduct.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q11',
          text: 'One of the most hotly contested areas continued to be the area between Lake Gokča and Erevan, and the Russian military occupation of the Gokča district in 1825 precipitated the second Russo-Persian War of 1826-28 (Watson, pp. 206-7).',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
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
            value: { d: '1812-08' },
            cites: [
              {
                source: 'iranica-daniel-golestan-treaty',
                loc: { section: 'GOLESTĀN TREATY', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In August, ʿAbbās Mirza resumed hostilities and captured Lankarān.',
        lang: 'en',
        cite: {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812-10-31' },
            cites: [
              {
                source: 'iranica-daniel-golestan-treaty',
                loc: { section: 'GOLESTĀN TREATY', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Then, on 24 Šawwāl 1227/31 October 1812, while Ritischev was away in Tbilisi, the general Peter Kotliarevski launched a surprise night attack on the Persian encampment at Āṣlānduz (q.v.), which resulted in the complete rout of the army of ʿAbbās Mirzā and the death of one of the British supporting officers (Christie).',
        lang: 'en',
        cite: {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1813', approx: true },
            cites: [
              {
                source: 'iranica-daniel-golestan-treaty',
                loc: { section: 'GOLESTĀN TREATY', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In early 1813, the Persian fortress at Lankarān fell and its garrison was annihilated, enabling the Russians to occupy most of Ṭāleš again',
        lang: 'en',
        cite: {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1814-09' },
            cites: [
              {
                source: 'iranica-daniel-golestan-treaty',
                loc: { section: 'GOLESTĀN TREATY', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The Treaty of Golestān was concluded on 29 Šawwāl 1228/24 October 1813 (12 October according to Hurewitz, I, p. 197; 21 October in Pakravan, p. 156) and ratified at Tbilisi in September 1814.',
        lang: 'en',
        cite: {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Treaty_of_Gulistan_p01.jpg/1280px-Treaty_of_Gulistan_p01.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Treaty_of_Gulistan_p01.jpg',
    credit: { institution: 'Archive of the Ministry of Foreign Affairs of the Russian Federation' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' },
    {
      source: 'dubrovin-2019-istoriia-voiny-i-vladychestva-russkikh-na-kavkaze',
      perspective: 'russian-soviet'
    },
    {
      source: 'kuznetsova-1983-iran-v-pervoi-polovine-xix-veka',
      perspective: 'russian-soviet'
    }
  ]
})
