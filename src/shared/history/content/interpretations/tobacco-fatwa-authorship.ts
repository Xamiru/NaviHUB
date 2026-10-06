import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'tobacco-fatwa-authorship',
  about: ['event:tobacco-protest', 'person:mirza-hasan-shirazi'],
  topic: 'other',
  researched: '2026-10-06',
  positions: [
    {
      id: 'issued-by-shirazi',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Willem M. Floor' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'When a leading cleric, Mirza Hasan Shirazi, issued a fatva (religious ruling) forbidding the use of tobacco, the ban was universally observed, and the shah was once again forced to cancel the concession at considerable cost to an already depleted treasury.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q2',
          text: 'Despite their smoking habit, most Persians (including the women in the royal harem) stopped smoking voluntarily between 3 December 1890 and 26 January 1891 when the leading Shiʿite scholar of the time, Ḥājj Mirzā Moḥammad Ḥasan Širāzi, banned the sale of tobacco and smoking as a means to force the shah to revoke the Tobacco Concession (see DOḴĀNIYĀT).',
          lang: 'en',
          cite: { source: 'iranica-floor-tobacco', loc: { section: 'TOBACCO', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/tobacco'
          }
        }
      ]
    },
    {
      id: 'issued-in-his-name',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The fatwā which was issued in the name of Mirzā Ḥasan Širāzi, Shaikh Mortażā AnsÂāri’s successor as sole marjaʿ taqlid, by another of AnsÂāri’s students and of the most prominent mojtahed in Tehran, Mirzā Ḥasan Āštiāni (q.v.), prohibited the consumption of tobacco until the repealing of the Regie concession.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'attribution-doubted-never-denied',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' },
        { kind: 'scholar', name: 'Jean Calmard' },
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Doubt has been cast on the attribution of the fatwā to Šīrāzī, but it is known that about one month earlier Āqā Najafī (d. 1333/1914), the leading religious scholar of Isfahan had asked him to issue such a ruling, and the foremost propagator of the fatwā in Tehran, Mīrzā Ḥasan Āštīānī (q.v.; d. 1319/1901), was in communication with Šīrāzī.',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/fatwa' }
        },
        {
          id: 'q5',
          text: 'In any event, Šīrāzī never denied the attribution to him of the fatwā, and the ruling that permitted a resumption of smoking after the rescinding of the concession to the British monopoly in February 1892 was indubitably his (Tārīḵ-e bīdārī, ed. Saʿīdī Sīrjānī, I, pp. 19-60; Teymūrī; Algar, 1969, pp. 211-15).',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/fatwa' }
        },
        {
          id: 'q6',
          text: 'With the fatwā prohibiting smoking, attributed to Mīrzā Ḥasan Šīrāzī (December, 1891), opposition further developed within the government and even in the shah’s andarūn.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q7',
          text: 'The uprising culminated in a religious decree attributed to Mirzā Ḥasan Širāzi, the leading source of emulation, which declared: “Today the use of tobacco in whatever way is tantamount to war against the Lord of the Age.”',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1891' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
