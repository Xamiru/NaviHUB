import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'constitutional-revolution-mashruta-and-mashrua',
  about: ['event:persian-constitutional-revolution', 'event:persian-constitution-of-1906'],
  topic: 'nature',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'What remained in dispute, however, was the role of the ʿolamāʾ.',
    lang: 'en',
    cite: {
      source: 'iranica-amanat-constitutional-revolution-intellectual-background',
      loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '40' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
    }
  },
  positions: [
    {
      id: 'mashrua',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Fazlollah Nuri' },
        { kind: 'participant', name: 'The bast-seekers at Shah Abd al-Azim (1907)' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'پس عنوان سخن و مبدء مذاکرات بی قانونی دوایر دولت بود و حاجت ما مردم ایران هم بوضع اصول و قوانین در وظایف درباری و معاملات دیوانی انحصار داشت',
          lang: 'fa',
          cite: { source: 'kasravi-tarikh-e-mashruteh-7', loc: { section: 'گفتار هفتم' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://fa.wikisource.org/wiki/%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE_%D9%85%D8%B4%D8%B1%D9%88%D8%B7%D9%87_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86/%DB%B7'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'For Nūrī and his supporters mašrūṭa-ye mašrūʿa meant a constitutional system in which the mojtaheds, as the sole legal authority, would codify the Šarīʿa in order to broaden its applicability and supplant the ʿorf in the sphere of public law.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q3',
          text: 'The strongest argument brought against the Majles was that it had no legitimate basis in šarʿ law, and that its establishment would therefore undermine the šariʿa.',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        }
      ]
    },
    {
      id: 'najaf-mojtaheds',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ākūnd Moḥammad-Kāẓem Ḵorāsānī' },
        { kind: 'participant', name: 'ʿAbd-Allāh Māzandarānī' },
        { kind: 'participant', name: 'Moḥammad-Ḥosayn Tehrānī' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'It is a necessity of the faith that during the occultation of the Lord of the Age (Ṣāḥeb-al-Zamān) the government of the Muslims should be in the hands of the representatives of the Muslims',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      id: 'naini-lesser-evil',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Constitutionalism, based on consultation and popular representation, is less likely to be oppressive than absolutism and is closer to the principles of Islam.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      id: 'social-democratic-reading',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The Social democrats, among them Rasūlzāda, argued that, as the premature occurrence of revolution in Persia had resulted from its anti-imperialist and antidespotic character, nationalism should therefore be promoted, and constitutional government should restrict the rich (aḡnīā) and make concessions to the poor',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    }
  ]
})
