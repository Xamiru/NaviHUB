import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-treaty-of-erzurum',
  names: [
    { text: 'First Treaty of Erzurum', lang: 'en', role: 'primary' },
    { text: 'عهدنامه اول ارزروم', lang: 'fa', role: 'native' },
    {
      text: 'Erzurum treaty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1823-07-28' },
        cites: [
          {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ernest Tucker' }
        ]
      },
      {
        value: { d: '1823-07-29' },
        cites: [
          {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Keith McLachlan' }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    { ref: 'place:erzurum' }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' },
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'participant',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
        }
      ]
    },
    {
      name: 'the Ottoman Šayḵ-al-Eslām',
      role: 'participant',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
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
          text: 'Changes in the relationship between Persia and Iraq in the Qajar era can also be perceived in the last substantial military conflict between the Ottomans and Persia in the early 1820s. It erupted, as had previous confrontations, due to tension that arose among groups living on the Persia-Iraq border and as an indirect consequence of increased European presence in the area. In contrast to previous hostilities, Ottoman clerics issued no anti-Shiʿite fatwās at all to justify the conflict. When peace negotiations commenced, the Ottoman Šayḵ-al-Eslām wrote a letter to the Qajar crown prince ʿAbbās Mirzā, who led the Persian army, extolling the basic friendship between their nations and describing them as “two great countries that are as one body” (Cevdet, XII, p. 254). The Erzurum treaty of 19 Ḏu’l-qaʿda 1238/28 July 1823 that ended this military confrontation explicitly reconfirmed the provisions of the 1746 treaty and extended the formal legal recognition of the personal status of Persians in the Ottoman empire even more than before, including a section, for example, providing detailed instructions for the disposition of the estates and property of Persians who died there',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        },
        {
          id: 'q2',
          text: 'The arrangements made at Zohāb were therefore reasonably flexible, and both powers were suffi­ciently preoccupied elsewhere so that the border re­mained largely unchanged until an outbreak of war in 1237/1821-22, which ended in the first Treaty of Erzurum (19 Ḏu’l-qaʿda 1238/29 July 1823).',
          lang: 'en',
          cite: {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'From that time on repeated conflicts and developments in the larger geopolitical sphere led to concerted efforts to draw the boundary more precisely.',
          lang: 'en',
          cite: {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-i'
          }
        },
        {
          id: 'q5',
          text: 'However, since hostile incidents continued to erupt along this border over the next twenty years, an international peace conference was convened in 1843 at the behest of the Russians and the British. It resulted four years later (1847) in a second Treaty of Erzurum',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/An_official_copy_of_the_treaty_of_Erzurum%2C_Persia%2C_Qajar%2C_19th_Century.jpg/1280px-An_official_copy_of_the_treaty_of_Erzurum%2C_Persia%2C_Qajar%2C_19th_Century.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:An_official_copy_of_the_treaty_of_Erzurum,_Persia,_Qajar,_19th_Century.jpg',
    credit: { institution: 'Sotheby\'s, Arts of the Islamic World (2013), lot 41' },
    license: { id: 'public-domain' }
  }
})
