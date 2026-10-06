import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-name-change-of-1935-motives',
  about: ['event:iran-name-change-of-1935'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'berlin-diplomats',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Oliver Bast' },
        { kind: 'scholar', name: 'Yair Hirschfeld' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In the same year, apparently at the suggestion of Persian diplomats posted in Berlin, Reżā Shah ordered that, from March 20 onwards, the country be called Iran instead of Persia in all international communications',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    },
    {
      id: 'aryan-origin',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ahmad Ashraf' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Herzfeld’s (q.v.) idea of Achaemenid Iran as a geo-political concept, as “the empire of the Aryans,” as well as his idea that the Iranian “nation” in its combined geographical and political sense emerged during the Achaemenid period, were adopted as the formal ideological framework of the Pahlavi state.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-iranian-identity-19th-20th',
            loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
          }
        },
        {
          id: 'q3',
          text: 'They led to four historical innovations: the change, in Western languages, of the country’s name from Persia to Iran in 1935, signifying the primordial Aryan origin of the nation',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-iranian-identity-19th-20th',
            loc: { section: 'IRANIAN IDENTITY iv. 19TH-20TH CENTURIES', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iranian-identity-iv-19th-20th-centuries/'
          }
        }
      ]
    }
  ]
})
