import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'constitutional-revolution-historiography',
  about: ['event:persian-constitutional-revolution'],
  topic: 'historiography',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'According to Mohammad-Reza Afshari, the historians of the Constitutional Revolution can be divided into three groups:',
    lang: 'en',
    cite: { source: 'iranica-pistor-hatam-sattar-khan', loc: { section: 'SATTĀR KHAN', para: '8' } },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
    }
  },
  positions: [
    {
      id: 'populists',
      category: 'scholarly',
      holders: [
        {
          kind: 'scholar',
          name: 'Aḥmad Kasravi',
          discipline: 'historian',
          ref: 'person:ahmad-kasravi'
        }
      ],
      statements: [
        {
          id: 'q6',
          text: 'در جنبش مشروطه دو دسته پا در میان داشتند: یکی وزیران و درباریان و مردان برجسته و بنام، و دیگری بازاریان و کسان گمنام و بیشکوه. آن دسته کمتر یکی درستی نمودند و این دسته کمتر یکی نادرستی نشان دادند. هر چه هست کارها را این دسته گمنام و بیشکوه پیش بردند و تاریخ باید بنام اینان نوشته شود.',
          lang: 'fa',
          cite: {
            source: 'kasravi-tarikh-e-mashruteh-preface',
            loc: { section: 'دیباچه', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://fa.wikisource.org/wiki/%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE_%D9%85%D8%B4%D8%B1%D9%88%D8%B7%D9%87_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86/%D8%AF%DB%8C%D8%A8%D8%A7%DA%86%D9%87'
          }
        },
        {
          id: 'q2',
          text: 'the populists (like Aḥmad Kasravi) focused on the common people and glorified the Mojāhedin in Tabriz',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        }
      ]
    },
    {
      id: 'elitists',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Fereydun Ādamiyat', discipline: 'historian' },
        { kind: 'scholar', name: 'Ebrāhim Ṣafāʾi', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'the elitists (among them Fereydun Ādamiyat and Ebrāhim Ṣafāʾi) concentrated on reformers and demystified popular heroes',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        }
      ]
    },
    {
      id: 'traditionalists',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nāẓem-al-Eslām Kermāni', discipline: 'historian' },
        { kind: 'scholar', name: 'Mehdi Šarif Kāšāni', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'the traditionalists (among them Nāẓem-al-Eslām Kermāni and Mehdi Šarif Kāšāni) sympathized with the leading pro-constitutional Mojtaheds',
          lang: 'en',
          cite: {
            source: 'iranica-pistor-hatam-sattar-khan',
            loc: { section: 'SATTĀR KHAN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/sattar-khan-one-of-the-most-popular-heroes-from-tabriz-who-defended-the-town-during-the-lesser-autocracy-in-1908-09/'
          }
        },
        {
          id: 'q5',
          text: 'The discourse of decline and renewal is well apparent in the portrayal of the Constitutional Revolution as a turning point away from the decadence of Qajar despotism to a new era of national rebirth.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-historiography-qajar',
            loc: { section: 'HISTORIOGRAPHY viii. QAJAR PERIOD', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/historiography-viii/'
          }
        }
      ]
    }
  ]
})
