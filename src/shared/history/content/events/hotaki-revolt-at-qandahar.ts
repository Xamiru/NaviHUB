import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hotaki-revolt-at-qandahar',
  names: [
    { text: 'Hotaki revolt at Qandahar', lang: 'en', role: 'primary' },
    {
      text: 'Ḡilzay uprising',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1709' },
        cites: [
          { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:kandahar',
      cites: [
        { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
      ]
    }
  ],
  sides: [
    {
      key: 'hotaki',
      name: 'Hotaki',
      polity: 'polity:hotaki-dynasty',
      cites: [
        { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } }
      ]
    },
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mir-ways-hotak',
      role: 'leader',
      side: 'hotaki',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
        }
      ]
    },
    {
      name: 'Gorgin Khan',
      role: 'commander',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:siege-of-isfahan-1722',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
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
          text: 'In 1121/1709 a Ḡilzay uprising, led by the Hōtakī tribal chief Mīr Ways, had freed all of southern Afghanistan from Safavid control, thus establishing the basis of a state which would extend westwards into the heart of Persia (fall of Isfahan, 1135/1722); but the retaliation led by Nāder Shah Afšār destroyed the new state in a few rapid attacks (fall of Qandahār [Kandahār], 1150/1738; of Kabul, 1151/1738), and the Afghan territory was once again annexed to the Persian empire.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        },
        {
          id: 'q2',
          text: 'Early in the eighteenth century, one of the Pashtun tribes, the Hotaki, seized Qandahar from the Safavids, and a group of Ghilzai Pashtuns subsequently made greater inroads into Safavid territory.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The oppressiveness of his rule and the brutal behavior of his troops vis-à-vis the Sunni population of Qandahar alienated the eastern borderlands and provoked a rebellion led by the Afghan warlord Mir Wais.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q4',
          text: 'Mir Wais’s decision to revolt against the Safavids was a direct outgrowth of the cancellation of his post as supervisor of the eastern caravan trade, ostensibly for his lack of service and dereliction of duty in collecting tolls and taxes.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Maḥmūd invaded Persia and captured Isfahan, the Persian capital, in 1135/1722.',
          lang: 'en',
          cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/gilzi-'
          }
        },
        {
          id: 'q6',
          text: 'Ašraf’s reign of little more than four years was almost wholly occupied with fighting against various external and internal adversaries.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
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
            value: { d: '1702' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1702 a newly-appointed governor, one Shah Nawaz, called Gurji Khan from having been “wali” or ruler of Georgia, arrived at Kandahar with a tolerably large force.',
        lang: 'en',
        cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1709' },
            cites: [
              { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1121/1709, Mīr Ways, a Hōtak chief, overthrew Persian rule in Qandahār and declared independence',
        lang: 'en',
        cite: { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/gilzi-' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1715', notAfter: '1716' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'His brother, Mir ʽAbdallah, succeeded him in the government of the Afghans; but after a few months, Mahmud, a son of Mir Waʽiẓ, a very young man, murdered his uncle and assumed the title of a sovereign prince.',
        lang: 'en',
        cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Map_of_the_Hotak_Empire_1715%2C_Mirwais_Hotak.png/1280px-Map_of_the_Hotak_Empire_1715%2C_Mirwais_Hotak.png',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_Hotak_Empire_1715,_Mirwais_Hotak.png',
    credit: { creator: 'Noorullah21' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  archive: [
    {
      id: 'a1',
      mediaKind: 'document',
      title: 'The history of the late revolutions of Persia: taken from the memoirs of Father Krusinski, Procurator of the Jesuits at Ispahan..',
      date: { d: '1733' },
      url: 'https://archive.org/download/historyoflaterev01krusiala/historyoflaterev01krusiala.pdf',
      page: 'https://archive.org/details/historyoflaterev01krusiala',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Krusinski, Father'
      },
      license: { id: 'public-domain' },
      bytes: 16142731
    }
  ]
})
