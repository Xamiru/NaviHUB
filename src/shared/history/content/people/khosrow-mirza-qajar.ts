import { definePerson } from '../../schema'

export default definePerson({
  id: 'khosrow-mirza-qajar',
  names: [
    { text: 'Khosrow Mirza Qajar', lang: 'en', role: 'primary' },
    { text: 'خسرو میرزا قاجار', lang: 'fa', role: 'native' },
    { text: 'Ḵosrow Mirzā', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1813' },
        cites: [
          {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1875-10-21' },
        cites: [
          {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['diplomat'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ḴOSROW MIRZĀ QĀJĀR (b. 1813; d. Hamadan, 21 Ramazan, 1291/21 October 1875), the seventh son of Crown Prince ʿAbbās Mirzā, who led an official Iranian delegation to the Tsarist court in St. Petersburg.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The mission was headed by Ḵosrow Mirzā, who was present at the peace negotiations in Dehḵˇārqān, which led to the signing of the Treaty of Turkmanchay. There he had met General Ivan Paskevich, the Russian commander of the Caucasus, and had made a very good impression on him.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        },
        {
          id: 'q3',
          text: 'While in Moscow, Ḵosrow Mirzā unexpectedly visited Griboedov’s mother and shed tears with her. This act endeared him to the Moscovites.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        },
        {
          id: 'q4',
          text: 'He was feted like royalty and took part in maneuvers, balls, and state dinners, and visited the opera, ballet, and all the important sites of the Russian capital',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Khusraw_Mirza_in_St_Petersburg%27._Iran%2C_1829._State_Hermitage%2C_St._Petersburg.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Khusraw_Mirza_in_St_Petersburg%27._Iran,_1829._State_Hermitage,_St._Petersburg.jpg',
    credit: { institution: 'State Hermitage Museum', creator: 'Eduard Caspar Hauser' },
    license: { id: 'public-domain' }
  }
})
