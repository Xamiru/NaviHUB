import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'naser-al-din-shahs-second-european-journey',
  names: [
    { text: 'Naser al-Din Shah’s second European journey', lang: 'en', role: 'primary' },
    { text: 'سفر دوم ناصرالدین شاه به فرنگ', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1878' },
        cites: [
          {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '3' }
          },
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
          },
          {
            source: 'iranica-walcher-kamran-mirza',
            loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '3' }
        }
      ]
    },
    {
      name: 'Kāmrān Mirzā',
      role: 'participant',
      cites: [
        {
          source: 'iranica-walcher-kamran-mirza',
          loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '10' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:naser-al-din-shahs-first-european-journey', rel: 'preceded-by' },
    {
      ref: 'event:founding-of-the-persian-cossack-brigade',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '3' }
        }
      ]
    },
    { ref: 'event:naser-al-din-shahs-third-european-journey', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On his second journey to Europe, in 1295/1878, Nāṣer-al-Dīn Shah (1264­-1313/1848-96) had been favorably impressed by the uniforms, equipment, and precision drills of the Russian Cossacks who had escorted him across Transcaucasia.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        },
        {
          id: 'q2',
          text: 'During his second European journey in 1878 the shah asked the Habsburg emperor and the Russian tsar for the loan of instructors.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Following the shah’s return from Europe in 1878, Kāmrān Mirzā was charged with real authority for the first time.',
          lang: 'en',
          cite: {
            source: 'iranica-walcher-kamran-mirza',
            loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kamran-mirza-nayeb-al-saltana'
          }
        },
        {
          id: 'q4',
          text: 'In order to break the power monopolies of Mirzā Ḥosayn Khan Sepahsālār and Mostawfi–al–Mamālek, the shah installed Kāmrān Mirzā into new offices, creating a triumvirate of power which he could manipulate more effectively (Bakhash, pp. 146-48. Mostawfi, I, pp. 146-49).',
          lang: 'en',
          cite: {
            source: 'iranica-walcher-kamran-mirza',
            loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kamran-mirza-nayeb-al-saltana'
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
            value: { d: '1878-10-12' },
            cites: [
              {
                source: 'iranica-walcher-kamran-mirza',
                loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'With the decree read on 12 October 1878, Kāmrān Mirzā received the government and administration of Tehran, the ministry of commerce, affairs of the clergy, princes, and merchants, as well as the governorships of Qazvin, Gilan, Māzandarān, Damāvand, Firuzkuh, Qom, Kashan, Sāveh, Malāyer, Tuyserkān, Nehāvand, Astarābād, Šāhrud, Besṭām, Dāmḡān, and Semnān; in 1881 Astarābād was given him in lieu of Kashan, which was passed on to the shah’s wife, Anis–al–Dawla (Mostawfi, I, pp. 146-47; Bāmdād, Rejāl, pp. 151-52; Nicholson to Salisbury and government of India, No. 26, 28 February 1888, FO 248/464, FO 65/1347, and IO L/P&S/9/190; Eʿtemād–al–Salṭana, 1977, p. 544; idem, 1989, III, p. 1823).',
        lang: 'en',
        cite: {
          source: 'iranica-walcher-kamran-mirza',
          loc: { section: 'KĀMRĀN MIRZĀ NĀYEB-AL-SALṬANA', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kamran-mirza-nayeb-al-saltana'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Naser_al-Din_Shah_Qajar%2C_close_up%2C_with_slight_smile_by_Nadar_-_Original.jpg/1280px-Naser_al-Din_Shah_Qajar%2C_close_up%2C_with_slight_smile_by_Nadar_-_Original.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Naser_al-Din_Shah_Qajar,_close_up,_with_slight_smile_by_Nadar_-_Original.jpg',
    credit: { institution: 'Bibliothèque nationale de France (Gallica)', creator: 'Nadar' },
    license: { id: 'public-domain' }
  }
})
