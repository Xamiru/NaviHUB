import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1948-arab-israeli-war-naming',
  about: ['event:1948-arab-israeli-war'],
  topic: 'naming',
  researched: '2026-10-09',
  positions: [
    {
      id: 'war-of-independence',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'On 14 May 1948, Israel proclaimed its independence. Less than 24 hours later, the regular armies of Egypt, Jordan, Syria, Lebanon, and Iraq invaded the country, forcing Israel to defend the sovereignty it had regained in its ancestral homeland.',
          lang: 'en',
          cite: {
            source: 'israel-mfa-history-the-state-of-israel',
            loc: { section: 'The State of Israel is born', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/2015id_/http://mfa.gov.il/MFA/AboutIsrael/History/Pages/HISTORY-%20The%20State%20of%20Israel.aspx'
          }
        },
        {
          id: 'q2',
          text: 'In what became known as Israel\'s War of Independence, the newly formed, poorly equipped Israel Defense Forces (IDF) repulsed the invaders in fierce intermittent fighting, which lasted some 15 months and claimed over 6,000 Israeli lives (nearly one percent of the country\'s Jewish population at the time).',
          lang: 'en',
          cite: {
            source: 'israel-mfa-history-the-state-of-israel',
            loc: { section: 'The State of Israel is born', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/2015id_/http://mfa.gov.il/MFA/AboutIsrael/History/Pages/HISTORY-%20The%20State%20of%20Israel.aspx'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'After Israel declared its independence on May 14, 1948, the fighting intensified with other Arab forces joining the Palestinian Arabs in attacking territory in the former Palestinian mandate.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        },
        {
          id: 'q6',
          text: 'British trained forces from Transjordan eventually intervened in the conflict, but only in areas that had been designated as part of the Arab state under the United Nations Partition Plan and the corpus separatum of Jerusalem.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        }
      ]
    },
    {
      id: 'nakba',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Maher Charif' },
        { kind: 'organization', name: 'Institute for Palestine Studies' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'After this massive uprooting and the dismemberment and de-Arabization of Palestine, it is no surprise that the Palestinians refer to the events of 1947-48 as the Nakba - the Catastrophe in Arabic.',
          lang: 'en',
          cite: { source: 'palquest-charif-the-nakba', loc: { section: 'The Nakba', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.palquest.org/en/highlight/160/nakba'
          }
        },
        {
          id: 'q4',
          text: 'Each year, on the 5th of Iyar according to the Hebrew calendar (which corresponded to 15 May 1948), it celebrates instead what it considers to be a day of “independence.”',
          lang: 'en',
          cite: {
            source: 'palquest-charif-meanings-of-the-nakba',
            loc: { section: 'Meanings of the Nakba', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.palquest.org/en/highlight/6585/meanings-nakba'
          }
        }
      ]
    }
  ]
})
