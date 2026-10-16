import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'timurid-succession-war',
  names: [
    { text: 'Timurid succession war', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1405' },
        cites: [
          {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '31' }
          },
          {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1409' },
        cites: [
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          }
        ]
      },
      {
        value: { d: '1408' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1405' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-courts-and-courtiers-v',
          loc: {
            section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
            para: '6'
          }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-bosworth-azarbaijan-iv',
          loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-iraq-ii-iii-mongols-to-safavids',
          loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '31' }
        }
      ]
    },
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    },
    {
      ref: 'polity:jalayirid-sultanate',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '13' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:khalil-sultan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-courts-and-courtiers-v',
          loc: {
            section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
            para: '6'
          }
        }
      ]
    },
    {
      ref: 'person:shahrukh',
      role: 'leader',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'person:qara-yusuf',
      role: 'leader',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    },
    {
      name: 'Mīrānšāh',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } }
      ]
    }
  ],
  related: [
    { ref: 'event:death-of-timur', rel: 'preceded-by' },
    { ref: 'event:reign-of-shahrukh-and-herat-as-capital', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1405 Timur died, and in less than six months his vast empire was parceled out between quarreling sons and grandsons.',
          lang: 'en',
          cite: {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iraq-iii-mongols-to-safavids/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Under Qara Yūsof, their leader from 792/1390 to 823/1420, they expelled Tīmūr’s grandson Abū Bakr and killed the latter’s father, Mīrānšāh, the governor of Azarbaijan; they then defeated the Jalayerids to gain control of Baghdad and ʿErāq-e ʿArab (Mesopotamia), conquered parts of Georgia, and penetrated deeper into Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q5',
          text: 'For a time Solṭān Aḥmad collaborated against Timur with the Qarā Qoyunlu leader, Qarā Yusof, who, like the Jalayerids themselves, had suffered a series of attacks by the conqueror.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q6',
          text: 'His waste of time and treasure upon fascinating mistress named Shadu ʽl-Mulk, the “delight of the kingdom,” soon brought about his deposition, and in 1408 he gave way to Shah Rukh, who, with the exception of Miran Shah, was the only surviving son of Timur.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
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
            value: { d: '1405' },
            cites: [
              {
                source: 'iranica-armenia-vi',
                loc: {
                  section: 'ARMENIA AND IRAN vi. Armeno-Iranian relations in the Islamic period',
                  para: '31'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After the final invasion and the defeat and capture near Angora of the Ottoman Sultan Bāyażīd, Tamerlane had appointed his son Mīrānšāh as governor of the western principalities. But after Tamerlane’s death in 1405, the power-seeking nomadic amirs everywhere rebelled against Mīrānšāh.',
        lang: 'en',
        cite: {
          source: 'iranica-armenia-vi',
          loc: {
            section: 'ARMENIA AND IRAN vi. Armeno-Iranian relations in the Islamic period',
            para: '31'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/armenia-vi'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Khalil_Sultan_enthroned%2C_in_Timurid_genealogy_1405-1409_%28Topkapi_Sarayi_M%C3%BCzesi%2C_H2152%29_f.32a.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Khalil_Sultan_enthroned,_in_Timurid_genealogy_1405-1409_(Topkapi_Sarayi_M%C3%BCzesi,_H2152)_f.32a.jpg',
    credit: { institution: 'Topkapı Palace Museum', creator: '1405–1409 artist' },
    license: { id: 'public-domain' }
  }
})
