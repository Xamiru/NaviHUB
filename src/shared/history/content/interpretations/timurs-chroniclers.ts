import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'timurs-chroniclers',
  about: ['person:timur'],
  topic: 'historiography',
  positions: [
    {
      id: 'court-and-enemy-accounts',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Timūr’s generally recognized biographers are—ʽAlī Yazdī, commonly called Sharifu ’d-Dīn, author of the Persian Zafarnāma, translated by Petis de la Croix in 1722, and from French into English by J. Darby in the following year; and Ahmad ibn Mohammed ibn Abdallah, al Dimashki, al ʽAjmi, commonly called Ibn ʽArabshāh, author of the Arabic ʽAljaibu ’l Makhlnkāt, translated by the Dutch Orientalist Golius in 1636. In the work of the former, as Sir William Jones remarks, “the Tartarian conqueror is represented as a liberal, benevolent and illustrious prince”; in that of the latter he is “deformed and impious, of a low birth and detestable principles.”',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        },
        {
          id: 'q2',
          text: 'But the favourable account was written under the personal supervision of Timūr’s grandson, Ibrāhīm, while the other was the production of his direst enemy.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        },
        {
          id: 'q3',
          text: 'Few indeed, if any, original annals of this class are written otherwise than to order, under patronage, or to serve a purpose to which truth is secondary.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        }
      ]
    },
    {
      id: 'ajaeb-assessment',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ursula Nashashibi', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The ʿAǰāʾeb has a bitter tone, conveying Ebn ʿArabšāh’s hatred of Tīmūr, and is marked by spiteful descriptions and crude attacks and insults.',
          lang: 'en',
          cite: {
            source: 'iranica-ajaeb-al-maqdur',
            loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/ajaeb-al-maqdur'
          }
        },
        {
          id: 'q5',
          text: 'Hence the official Persian historians (Šaraf al-dīn Yazdī, Neẓām-al-dīn Šāmī) tend to be more truthful, accurate, and comprehensive in chronicling Tīmūr’s campaigns.',
          lang: 'en',
          cite: {
            source: 'iranica-ajaeb-al-maqdur',
            loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/ajaeb-al-maqdur'
          }
        }
      ]
    },
    {
      id: 'eyewitness-testimony',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Beatrice Forbes Manz', discipline: 'historian' },
        { kind: 'scholar', name: 'Margaret L. Dunaway', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Clavijo’s account of Tīmūr’s realm tallies with information in the Persian histories, while providing details on features considered too ordinary to be described by court historians.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        },
        {
          id: 'q7',
          text: 'These accounts, though brief, preserve contemporary testimony by eyewitnesses, often censored in court histories, and agree closely with other contemporary sources originating outside the Timurid court',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
