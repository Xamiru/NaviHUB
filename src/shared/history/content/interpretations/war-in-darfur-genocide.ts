import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'war-in-darfur-genocide',
  about: ['event:war-in-darfur'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'The government-Janjaweed partnership is characterized by joint attacks on civilians rather than on the rebel forces.',
    lang: 'en',
    cite: { source: 'hrw-2004-darfur-destroyed-summary', loc: { section: 'Summary', para: '5' } },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://web.archive.org/web/20230802123251/http://www.hrw.org/reports/2004/sudan0504/2.htm'
    }
  },
  positions: [
    {
      id: 'united-states-genocide-has-been-committed',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Colin Powell' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'When we reviewed the evidence compiled by our team, and then put it beside other information available to the State Department and widely known throughout the international community, widely reported upon by the media and by others, we concluded, I concluded, that genocide has been committed in Darfur and that the Government of Sudan and the Jingaweit bear responsibility -- and that genocide may still be occurring.',
          lang: 'en',
          cite: {
            source: 'powell-2004-09-09-testimony-the-crisis-in-darfur',
            loc: { section: 'The Crisis in Darfur', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231231023730/https://2001-2009.state.gov/secretary/former/powell/remarks/36042.htm'
          }
        },
        {
          id: 'q3',
          text: 'We believe the evidence corroborates the specific intent of the perpetrators to destroy "a group in whole or in part," the words of the Convention.',
          lang: 'en',
          cite: {
            source: 'powell-2004-09-09-testimony-the-crisis-in-darfur',
            loc: { section: 'The Crisis in Darfur', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231231023730/https://2001-2009.state.gov/secretary/former/powell/remarks/36042.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The government and its Janjaweed allies have killed thousands of Fur, Masalit, and Zaghawa-- often in cold blood, raped women, and destroyed villages, food stocks and other supplies essential to the civilian population.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-darfur-destroyed-summary',
            loc: { section: 'Summary', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230802123251/http://www.hrw.org/reports/2004/sudan0504/2.htm'
          }
        },
        {
          id: 'q5',
          text: 'Because of Sudan’s unwillingness to prosecute serious crimes in Darfur, the UN Security Council in 2005 referred the situation in Darfur to the ICC, which has since issued arrest warrants for three individuals, including President al-Bashir, for war crimes, crimes against humanity, and genocide.',
          lang: 'en',
          cite: {
            source: 'hrw-2011-darfur-in-the-shadows',
            loc: { section: 'Darfur in the Shadows', para: '118' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231206033425/https://www.hrw.org/report/2011/06/05/darfur-shadows/sudanese-governments-ongoing-attacks-civilians-and-human-rights'
          }
        }
      ]
    },
    {
      id: 'sudan-tribal-conflict-without-state-coordination',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Sudan' },
        { kind: 'participant', name: 'Abdul-Moniem Osman Mohammed Taha' }
      ],
      statements: [
        {
          id: 'q6',
          text: '[In Darfur] there are scattered tribes battling over meager resources.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-entrenching-impunity-janjaweed-militias',
            loc: {
              section: 'IV. Ground Forces of “Ethnic Cleansing”: the “Janjaweed” Militias',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231207112425/https://www.hrw.org/legacy/features/darfur/fiveyearson/report4.html'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Despite persistent Sudanese government characterization of the Darfur conflict as a “tribal conflict,” and repeated denials of state coordination of abusive militia groups, there is irrefutable evidence of a Sudanese government policy of systematic support for, coordination of, and impunity from prosecution granted to the “Janjaweed militias,” a policy that continues to this day.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-entrenching-impunity-janjaweed-militias',
            loc: {
              section: 'IV. Ground Forces of “Ethnic Cleansing”: the “Janjaweed” Militias',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231207112425/https://www.hrw.org/legacy/features/darfur/fiveyearson/report4.html'
          }
        }
      ]
    },
    {
      id: 'human-rights-watch-ethnic-cleansing',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'The Janjaweed and Sudanese armed forces continued a campaign begun in earnest in 2003 of ethnic cleansing and forced displacement by bombing and burning villages, killing civilians, and raping women.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-sudan',
            loc: { section: 'World Report 2005: Sudan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303050849/https://www.hrw.org/world-report/2005/country-chapters/sudan'
          }
        },
        {
          id: 'q9',
          text: 'Distrusting the armed forces, many of whom were originally from Darfur, the Sudanese government recruited the “Janjaweed” militias as the main ground forces for the government’s counterinsurgency campaign in Darfur.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-entrenching-impunity-janjaweed-militias',
            loc: {
              section: 'IV. Ground Forces of “Ethnic Cleansing”: the “Janjaweed” Militias',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20231207112425/https://www.hrw.org/legacy/features/darfur/fiveyearson/report4.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
