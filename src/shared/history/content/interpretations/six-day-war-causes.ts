import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'six-day-war-causes',
  about: ['event:six-day-war'],
  topic: 'causes',
  positions: [
    {
      id: 'israel-self-defense',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Hopes for another decade of relative tranquility were dashed with the escalation of Arab terrorist raids across the Egyptian and Jordanian borders, persistent Syrian artillery bombardment of agricultural settlements in northern Galilee, and massive military build-ups by the neighboring Arab states. When Egypt again moved large numbers of troops into the Sinai desert (May 1967), ordered the UN peacekeeping forces (deployed since 1957) out of the area, reimposed the blockade of the Straits of Tiran, and entered into a military alliance with Jordan, Israel found itself faced by hostile Arab armies on all fronts.',
          lang: 'en',
          cite: {
            source: 'israel-mfa-history-the-state-of-israel',
            loc: { section: '1967 Six-Day War', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2015id_/http://mfa.gov.il/MFA/AboutIsrael/History/Pages/HISTORY-%20The%20State%20of%20Israel.aspx'
          }
        },
        {
          id: 'q2',
          text: 'As Israel\'s neighbors prepared to destroy the Jewish state, Israel invoked its inherent right of self-defense, launching a preemptive strike (5 June 1967) against Egypt in the South, followed by a counterattack against Jordan in the East and the routing of Syrian forces entrenched on the Golan Heights in the North.',
          lang: 'en',
          cite: {
            source: 'israel-mfa-history-the-state-of-israel',
            loc: { section: '1967 Six-Day War', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2015id_/http://mfa.gov.il/MFA/AboutIsrael/History/Pages/HISTORY-%20The%20State%20of%20Israel.aspx'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'While the administration’s response to Samu‘ helped prevent further Israeli reprisals against Jordan, it failed to address the underlying problem of Palestinian cross-border attacks. By the spring of 1967, the Israelis were retaliating forcefully against Syria, whose leaders demanded that Egypt intervene on their behalf.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1961-1968/arab-israeli-war-1967'
          }
        },
        {
          id: 'q9',
          text: 'However, U.S. efforts to preserve the regional balance of power were soon undermined by Fatah and other Palestinian guerilla organizations, which began attacking targets inside Israel. The Johnson administration tried to intercede with Fatah’s Syrian patrons and to prevent Israeli retaliation against Jordan, from which most Palestinian raids were launched.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1961-1968/arab-israeli-war-1967'
          }
        }
      ]
    },
    {
      id: 'palestinian-occupation',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'WAFA Palestinian News & Info Agency' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'On this day in 1967, the occupying state of Israel launched a pre-emptive attack on Egypt, Jordan, Iraq and Syria. After hitting the air defenses of these countries, Israel captured East Jerusalem, the West Bank and Gaza, as well as the Syrian Golan Heights and Egypt\'s Sinai Peninsula.',
          lang: 'en',
          cite: {
            source: 'wafa-2022-06-05-remembering-the-naksa',
            loc: { section: 'Remembering the Naksa, or setback, of 1967', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://english.wafa.ps/Pages/Details/129536' }
        },
        {
          id: 'q4',
          text: 'Twenty years after being recognized as an independent state on the ruins of historic Palestine, Israel began an occupation that would become the longest in modern history. As such, Israel took control of the final 22 per cent of historic Palestine that it wasn\'t able to occupy in 1948.',
          lang: 'en',
          cite: {
            source: 'wafa-2022-06-05-remembering-the-naksa',
            loc: { section: 'Remembering the Naksa, or setback, of 1967', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://english.wafa.ps/Pages/Details/129536' }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'After only six days of fighting, Israel had radically altered the political map of the region. By June 13, Israeli forces had captured the Golan Heights from Syria, Sinai and the Gaza Strip from Egypt, and all of Jerusalem and the West Bank from Jordan. The new territories more than doubled the size of pre1967 Israel',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/25.htm' }
        }
      ]
    },
    {
      id: 'soviet-false-report',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'On May 13, 1967, Soviet officials informed the Syrian and Egyptian Governments that Israel had massed troops on Syria’s border. Though the report was false, Nasser sent large numbers of Egyptian soldiers into the Sinai anyway.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/arab-israeli-war-1967'
          }
        }
      ]
    },
    {
      id: 'nasser-prestige',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'By the spring of 1967, Nasser\'s waning prestige, escalating Syrian-Israeli tensions, and the emergence of Levi Eshkol as prime minister set the stage for the third Arab-Israeli war.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/25.htm' }
        },
        {
          id: 'q7',
          text: 'The Soviet Union, wanting to involve Egypt as a deterrent to an Israeli initiative against Syria, misinformed Nasser on May 13 that the Israelis were planning to attack Syria on May 17 and that they had already concentrated eleven to thirteen brigades on the Syrian border for this purpose.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/25.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
