import { definePerson } from '../../schema'

export default definePerson({
  id: 'muhammad-ahmad-al-mahdi',
  names: [
    { text: 'Muhammad Ahmad al-Mahdi', lang: 'en', role: 'primary' },
    { text: 'محمد أحمد المهدي', lang: 'ar', role: 'native' },
    {
      text: 'Muhammad Ahmad ibn as Sayyid Abd Allah',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '3' }
        }
      ]
    },
    {
      text: 'Mahommed Ahmed ibn Seyyid Abdullah',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-mahdi', loc: { section: 'MAHDI', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1844' },
        cites: [
          { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '42' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1885' },
        cites: [
          { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '42' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'mena'],
  roles: ['cleric', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In this troubled atmosphere, Muhammad Ahmad ibn as Sayyid Abd Allah, a faqir or holy man who combined personal magnetism with religious zealotry, emerged, determined to expel the Turks and restore Islam to its primitive purity.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'The son of a Dunqulah boatbuilder, Muhammad Ahmad had become the disciple of Muhammad ash Sharif, the head of the Sammaniyah order. Later, as a shaykh of the order, Muhammad Ahmad spent several years in seclusion and gained a reputation as a mystic and teacher. In 1880 he became a Sammaniyah leader.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'The Mahdist movement demanded a return to the simplicity of early Islam, abstention from alcohol and tobacco, and the strict seclusion of women.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q4',
          text: 'The Mahdi maintained that his movement was not a religious order that could be accepted or rejected at will, but that it was a universal regime, which challenged man to join or to be destroyed.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Among those who joined him was Abdallahi ibn Muhammad, a Baqqara from southern Darfur.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q6',
          text: 'In 1881 Mahommed Ahmed ibn Seyyid Abdullah (q.v.), a Dongolese, proclaimed himself al-mahdi and founded in the eastern Sudan the short-lived empire overthrown by an Anglo-Egyptian force at the battle of Omdurman in 1898.',
          lang: 'en',
          cite: { source: 'britannica-1911-mahdi', loc: { section: 'MAHDI', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mahdi'
          }
        }
      ]
    }
  ]
})
