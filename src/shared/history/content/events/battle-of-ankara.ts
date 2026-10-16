import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-ankara',
  names: [
    { text: 'Battle of Ankara', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Angora',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1402' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '3' }
          },
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '6' }
          },
          {
            source: 'iranica-ajaeb-al-maqdur',
            loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '2' }
          },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1345' } }
        ]
      },
      {
        value: { d: '1403' },
        cites: [
          {
            source: 'iranica-perry-deportations-iii',
            loc: { section: 'DEPORTATIONS iii. In the Islamic period', para: '16' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:ankara',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    },
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'timurid',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      side: 'timurid',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    },
    {
      ref: 'person:bayezid-i',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    },
    {
      name: 'Qara ʿOṯmān',
      role: 'commander',
      side: 'timurid',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:sack-of-damascus-and-aleppo', rel: 'preceded-by' },
    {
      ref: 'event:ottoman-interregnum',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
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
          text: 'Timur crushed Ottoman forces near Ankara in 1402 and captured Bayezid I.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In Anatolia, where Ottoman policy had been directed toward consolidating the sultan\'s hold over the gazi amirates by means of conquest, usurpation, and purchase, the Ottomans were confronted by the forces of the Mongol leader Timur (Tamerlane), to whom many of the Turkish gazis had defected.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q4',
          text: 'By that time, the Ottomans were being drawn into the politics of eastern Anatolia, and Kemāḵ was briefly captured by the sultan Bāyazid I (r. 1389-1402); according to Ruy González de Clavijo (d. 1412), it was Bāyazid’s demand to cede Kemāḵ that prompted the amir of Arzenjān to appeal for aid from Timur',
          lang: 'en',
          cite: { source: 'iranica-ahmadi-dastgerdi-kemak', loc: { section: 'KEMĀḴ', para: '6' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/kemak' }
        },
        {
          id: 'q5',
          text: 'After Timur decided to invade Anatolia and attack Bāyazid, Kemāḵ was one of his first targets.',
          lang: 'en',
          cite: { source: 'iranica-ahmadi-dastgerdi-kemak', loc: { section: 'KEMĀḴ', para: '6' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/kemak' }
        },
        {
          id: 'q6',
          text: 'The seige of the fortress there by Timur’s son, Amir Moḥammad Solṭān, in Šawwāl 804/1402 is described in detail by Ebn ʿArabšāh',
          lang: 'en',
          cite: { source: 'iranica-ahmadi-dastgerdi-kemak', loc: { section: 'KEMĀḴ', para: '6' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/kemak' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Voluntarily joining Tīmūr in 802/1399-1400, Qara ʿOṯmān led the vanguard in Tīmūr’s campaigns against Sīvās, whose defenders received Ottoman support (802-03/1402), and against the Mamluk dependencies; he also participated in the battle of Ankara (804/1402), which ended in a crushing defeat for the Ottomans.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q8',
          text: 'They met in the neighbourhood of Angora. Timur\'s army is said to have numbered 200,000, Bayezid\'s force to have amounted to about half that figure, mostly seasoned veterans. The sultan\'s five sons were with the army, as well as all his generals; 7000 Servian auxiliaries under Stephen, son of Lazarus, took part in the battle (1402). Prodigies of valour on the part of Bayezid\'s troops could not make up for the defection of the newly-absorbed levies from Aīdin, Sarukhan and Menteshē who went over to their former princes in Timur\'s camp. The rout of the Turkish army was complete.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1345' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'By the 1420s, however, Ottoman power had revived to the extent that fresh campaigns were undertaken in Greece.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q11',
          text: 'After his defeat of the Ottoman Bāyazīd in 806/1403 he resettled captives from Amasya and Qayṣarīya (30,000-40,000, according to some accounts), chiefly Qara Tatar nomads, in Transoxania; they rebelled at Dāmḡān en route and were slaughtered in large numbers',
          lang: 'en',
          cite: {
            source: 'iranica-perry-deportations-iii',
            loc: { section: 'DEPORTATIONS iii. In the Islamic period', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/deportations/deportations-iii-in-the-islamic-period/'
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
            value: { d: '1402' },
            cites: [
              {
                source: 'iranica-ajaeb-al-maqdur',
                loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'At the battle of Angora in 805/1402 Tīmūr inflicted a shattering defeat on the Ottomans',
        lang: 'en',
        cite: { source: 'iranica-ajaeb-al-maqdur', loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/ajaeb-al-maqdur'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1403' },
            cites: [
              {
                source: 'britannica-1911-bayezid-i',
                loc: { section: 'BAYEZID I.', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Utterly defeated at Angora by the Mongol invader, Bayezid became his prisoner, and died in captivity some months later, in March 1403.',
        lang: 'en',
        cite: { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bayezid_I.'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Battle_of_Ankara_%281402%29._The_forces_of_Timur_and_Yildirim_Beyazit_arm_for_battle%2C_early_on_20_July_1402._Zafarnama_of_1436%2C_facing_folios_360r_%28left%29%2C_359v_%28right%29.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Ankara_(1402)._The_forces_of_Timur_and_Yildirim_Beyazit_arm_for_battle,_early_on_20_July_1402._Zafarnama_of_1436,_facing_folios_360r_(left),_359v_(right).jpg',
    credit: { creator: '1436 painter' },
    license: { id: 'public-domain' }
  }
})
