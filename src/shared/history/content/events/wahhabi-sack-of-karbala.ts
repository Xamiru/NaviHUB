import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'wahhabi-sack-of-karbala',
  names: [
    { text: 'Wahhabi sack of Karbala', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1801-04-21' },
        cites: [
          { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } }
        ]
      }
    ]
  },
  regions: ['mena', 'iran'],
  prominence: 2,
  places: [
    { ref: 'place:karbala' }
  ],
  participants: [
    {
      name: 'Shaikh ʿAbd-al-ʿAziz Saʿud',
      role: 'leader',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 5000, qualifier: 'about' },
            cites: [
              { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 18 Ḏu’l-ḥejja 1215/21 April 1801, the anniversary of the event at Ḡadir Ḵomm celebrated by the Shiʿites, the Wahhābis of the Najd, who regarded the Shiʿites reverence of the Imams as polytheism, led by Shaikh ʿAbd-al-ʿAziz Saʿud, attacked Karbala. The Mamluk-Ottoman garrison fled, enabling the Wahhābis to loot the shrine and the city and kill about 5,000 people.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q2',
          text: 'In 1801 the Al Saud-Wahhabi armies attacked and sacked Karbala, the Shia shrine in eastern Iraq that commemorates the death of Husayn.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Fatḥ-ʿAlī Shah of Iran, while criticizing the Ottomans for their inability to confront the Wahhābis, offered Iranian troops to help defend the town and thereby consolidate his position as protector of the ʿAtabāt, but the Ottomans refused',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q4',
          text: 'Instead, Fatḥ-ʿAlī Shah sent 500 Baluchi families to settle in Karbala and defend it',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q5',
          text: 'Likewise, Sayyed ʿAli Ṭabāṭabāʾi (d. 1231/1815-16) built the town wall for protection from Wahhābi raids',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Karbala_City_1890_-_1899.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Karbala_City_1890_-_1899.jpg',
    credit: { institution: 'Architectural Survey of Karbala' },
    license: { id: 'public-domain' }
  }
})
