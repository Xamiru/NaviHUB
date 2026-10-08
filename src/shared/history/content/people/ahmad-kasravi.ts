import { definePerson } from '../../schema'

export default definePerson({
  id: 'ahmad-kasravi',
  names: [
    { text: 'Ahmad Kasravi', lang: 'en', role: 'primary' },
    { text: 'احمد کسروی', lang: 'fa', role: 'native' },
    { text: 'Aḥmad Kasravi', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1890-09-29' },
        cites: [
          { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1946-03-11' },
        cites: [
          { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } },
          {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tabriz',
    cites: [
      { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } },
      {
        source: 'iranica-manafzadeh-kasravi-life-and-work',
        loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } }
    ]
  },
  regions: ['iran'],
  roles: ['scholar', 'writer', 'journalist'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Ahmad_kasravi.png',
    page: 'https://commons.wikimedia.org/wiki/File:Ahmad_kasravi.png',
    credit: { institution: 'Āẕari yā zabān-e bāstān-e Āẕarbāygān' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'KASRAVI, AḤMAD (احمد کسروی)(b. Tabriz, 29 September 1890; d. Tehran, 11 March 1946; Figure 1), influential social thinker, prominent historian, a pioneer of Iran’s linguistic studies, well-known social and religious reformer with a sense of prophetic mission, and prolific author.',
          lang: 'en',
          cite: { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad/'
          }
        },
        {
          id: 'q2',
          text: 'Faithful to his principles, to the end of his life Kasravi remained an unremitting defender of order, national unity, justice, the Constitution, and the modernization of the country.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Early life. Kasravi was born in Ḥokmāvār, a poor rural quarter in the suburbs of Tabriz, to Ḥāji Mir Qāsem, a small merchant in a family of religious functionaries.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        },
        {
          id: 'q4',
          text: 'In 1906 there broke out in Iran the Constitutional Revolution (q.v.), of which Tabriz became a, if not the, principal home. Kasravi had just turned 16.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'The first book he published after his return to Tehran was called Āẕari (a historical survey of the ancient language of Azarbaijan). He shows that the word āẕari found in most books of medieval history, especially those from the first centuries of Islam, is the name of the old language of Azarbaijan that was related to the Iranian languages and was a descendant of the language of the Medes with no relationship to Turkish',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        },
        {
          id: 'q6',
          text: 'Beginning in 1933, when he founded the magazine Peymān, a new period of his life commenced. While he continued to pursue his studies in history and linguistics, he entered the lists as a reformer or, as he put it, as a destroyer of illusions.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        },
        {
          id: 'q7',
          text: 'Kasravi seized the opportunity to propagate his ideas freely, and to this end he immediately founded an organization called “Society of Free Men” (Bāhamād-e Āzādegān), whose platform consisted basically of combating what he called illusions (Rāʾed, 1986, pp. 39-47). In 1942 he started a newspaper, Parčam, which was envisaged as a daily, the better to disseminate his thought.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q8',
          text: 'Kasravi’s critical analysis of Shiʿism undermined its historical foundations and in the process its doctrinal bases.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        },
        {
          id: 'q9',
          text: 'A politico-cultural movement grew up around the platform of his organization and from time to time carried out despicable acts such as the annual burnings of books that Kasravi considered deleterious to the education of youth.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q10',
          text: 'Kasravi was assassinated during a court proceeding inside the Palace of Justice (Kāḵ-e dādgostari).',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'kasravi-1960-zendegani-ye-man', perspective: 'iranian' }
  ]
})
