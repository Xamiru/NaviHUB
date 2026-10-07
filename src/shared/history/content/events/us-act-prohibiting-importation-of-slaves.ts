import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'us-act-prohibiting-importation-of-slaves',
  names: [
    { text: 'Act Prohibiting Importation of Slaves (1807)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1807-03-02' },
        cites: [
          {
            source: 'us-act-prohibiting-importation-of-slaves-1807',
            loc: { section: 'An Act to Prohibit the Importation of Slaves' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'subsaharan-africa'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'In 1807, Congress outlawed the African slave trade effective on January 1, 1808 (2 Stat. 426), and in 1820 declared it to be piracy punishable by death (3 Stat. 600-601).',
          lang: 'en',
          cite: {
            source: 'nara-slave-ship-manifests-new-orleans',
            loc: { section: 'Background', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/african-americans/slave-ship-manifests.html'
          }
        },
        {
          id: 'q1',
          text: 'That from and after the first day of January, one thousand eight hundred and eight, it shall not be lawful to import or bring into the United States or the territories thereof from any foreign kingdom, place, or country, any negro, mulatto, or person of colour, with intent to hold, sell, or dispose of such negro, mulatto, or person of colour, as a slave, or to be held to service or labour.',
          lang: 'en',
          cite: {
            source: 'us-act-prohibiting-importation-of-slaves-1807',
            loc: { section: 'An Act to Prohibit the Importation of Slaves' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/sl004.asp'
          }
        },
        {
          id: 'q2',
          text: 'APPROVED, March 2, 1807.',
          lang: 'en',
          cite: {
            source: 'us-act-prohibiting-importation-of-slaves-1807',
            loc: { section: 'An Act to Prohibit the Importation of Slaves' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/sl004.asp'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/An_Act_to_Prohibit_the_Importation_of_Slaves_Into_Any_Port_or_Place_within_the_Jurisdiction_of_the_United_States%2C_From_and_After_the_First_Day_of_January_1808_-_DPLA_-_0d6832aa61d94ed7a2f53d8297c701b8_%28page_1%29.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:An_Act_to_Prohibit_the_Importation_of_Slaves_Into_Any_Port_or_Place_within_the_Jurisdiction_of_the_United_States,_From_and_After_the_First_Day_of_January_1808_-_DPLA_-_0d6832aa61d94ed7a2f53d8297c701b8_(page_1).jpg',
    credit: { institution: 'National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
