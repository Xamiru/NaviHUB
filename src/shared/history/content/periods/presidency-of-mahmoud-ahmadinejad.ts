import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'presidency-of-mahmoud-ahmadinejad',
  names: [
    { text: 'Presidency of Mahmoud Ahmadinejad', lang: 'en', role: 'primary' },
    { text: 'ریاست‌جمهوری محمود احمدی‌نژاد', lang: 'fa', role: 'native' },
    { text: 'Ahmadinejad era', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '2005-08' },
        cites: [
          {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2013' },
        cites: [
          {
            source: 'hrw-2014-world-report-iran',
            loc: { section: 'World Report 2014: Iran', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'polity:islamic-republic-of-iran',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In June 2005, Iranians elected Mahmoud Ahmadinejad, who had campaigned on a platform of improving economic conditions, as their new president.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
          }
        },
        {
          id: 'q2',
          text: 'Maḥmud Aḥmadinežād, the fundamentalist mayor of Tehran, is elected president of Iran, defeating ʿAli-Akbar Hāšemi Rafsanjāni.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2005' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Ahmadinejad, a former Revolutionary Guard Corps officer, appointed another former officer in the Corps, Ḥosayn Ṣaffār Harandi, as Minister of Culture and Islamic Guidance, who for ten years had edited the daily, Kayhān, attacking the reform movement and liberal journalists and intellectuals. Ṣaffār Harandi’s first year in office saw three very prominent newspaper closures, which highlighted the continued serious assault on the Iranian media and the demise of its relationship with the state.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q4',
          text: 'Respect for basic human rights in Iran, especially freedom of expression and opinion, deteriorated considerably in 2005.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
          }
        },
        {
          id: 'q5',
          text: 'Only months into his term, amid intensified American and Israeli threats against Iran over its nuclear program, Aḥmadi-nežād heated up Iran’s anti-Israel rhetoric by making inflammatory statements.',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
            loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '82' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/israel-i-relations-with-iran/'
          }
        },
        {
          id: 'q6',
          text: 'After Ahmadinejad’s rise to presidential power (August 2005), the will to build an alliance provoked political resistance in both countries.',
          lang: 'en',
          cite: {
            source: 'iranica-therme-russia-iii-russo-iranian-relations-in-the-post-soviet-era',
            loc: {
              section: 'RUSSIA iii. Russo-Iranian Relations in the Post-Soviet Era (1991-present)',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-iii-iranian-relations-post-soviet/'
          }
        },
        {
          id: 'q7',
          text: 'Following the disputed June 12 presidential election and the massive protests it provoked, the government unleashed the most widespread crackdown in a decade.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-iran',
            loc: { section: 'World Report 2010: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/iran'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Millions of Iranians participated in presidential and local elections in June 2013.',
          lang: 'en',
          cite: {
            source: 'hrw-2014-world-report-iran',
            loc: { section: 'World Report 2014: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2014/country-chapters/iran'
          }
        },
        {
          id: 'q9',
          text: 'On May 21, the Guardian Council, an unelected body of 12 religious jurists, disqualified all but eight of the more than 680 registered presidential candidates using vague criteria that enabled authorities to make sweeping and arbitrary exclusions. Nonetheless, turnout was high and voters overwhelmingly elected cleric and former diplomat Hassan Rouhani whose campaign promises included a “civil rights charter,” improving the economy, and greater political engagement with the West.',
          lang: 'en',
          cite: {
            source: 'hrw-2014-world-report-iran',
            loc: { section: 'World Report 2014: Iran', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2014/country-chapters/iran'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Mahmoud_Ahmadinejad_and_Dmitry_Medvedev_1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmoud_Ahmadinejad_and_Dmitry_Medvedev_1.jpg',
    credit: { institution: 'Presidential Press and Information Office (Russia)' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
