import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'oslo-accords-significance',
  about: ['event:oslo-accords'],
  topic: 'significance',
  positions: [
    {
      id: 'rabin-enough-of-blood-and-tears',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Yitzhak Rabin', ref: 'person:yitzhak-rabin' },
        { kind: 'state', name: 'State of Israel' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'We have no desire for revenge. We harbor no hatred towards you.',
          lang: 'en',
          cite: {
            source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
            loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1993/09/1993-09-13-remarks-by-the-president-and-others-at-israel-palestinian-sig.html'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'Israel\'s response to the attacks included a tightening of the existing closure of the West Bank and Gaza Strip.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-israel-and-the-occupied-territories',
            loc: { section: 'World Report 1998: Israel and the Occupied Territories', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-07.htm'
          }
        }
      ]
    },
    {
      id: 'arafat-a-difficult-decision-requiring-courage',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Yasser Arafat', ref: 'person:yasser-arafat' },
        { kind: 'party', name: 'Palestine Liberation Organization' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'And let me assure them that the difficult decision we reached together was one that required great and exceptional courage.',
          lang: 'en',
          cite: {
            source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
            loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1993/09/1993-09-13-remarks-by-the-president-and-others-at-israel-palestinian-sig.html'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Although most Palestinians lived in areas under some degree of PA control, Israel exercised extensive control over the freedom of movement of all West Bank and Gaza Strip Palestinians, impeding the exercise of those rights dependant on freedom of movement.',
          lang: 'en',
          cite: {
            source: 'hrw-1999-world-report-israel',
            loc: { section: 'World Report 1999: Israel and the Occupied Territories', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport99/mideast/israel.html'
          }
        }
      ]
    },
    {
      id: 'hamas-initiatives-contradict-the-movement',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Hamas (Islamic Resistance Movement)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Initiatives, and so-called peaceful solutions and international conferences, are in contradiction to the principles of the Islamic Resistance Movement.',
          lang: 'en',
          cite: {
            source: 'avalon-hamas-covenant-1988',
            loc: {
              section: 'Article Thirteen: Peaceful Solutions, Initiatives and International Conferences'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://avalon.law.yale.edu/20th_century/hamas.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'A second suicide bombing occurred in the West Jerusalem Mahane Yehuda market on July 30, killing fourteen in addition to the bombers.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-israel-and-the-occupied-territories',
            loc: { section: 'World Report 1998: Israel and the Occupied Territories', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-07.htm'
          }
        }
      ]
    },
    {
      id: 'said-an-interim-settlement-that-entrenches-the-occupation',
      category: 'contemporary',
      holders: [
        { kind: 'scholar', name: 'Edward Said', discipline: 'philosopher' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Certainly most Palestinians don’t want to return to interim negotiations for an interim settlement that gives the Israelis the right to do what they’re doing and continue the settlement, which has been ongoing never more than under the last prime minister, Ehud Barak.',
          lang: 'en',
          cite: {
            source: 'isr-2001-said-what-they-want-is-my-silence',
            loc: { section: '“What They Want is My Silence” – 1', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.marxists.org/history/etol/newspape/isr-iso/2001/no18/said1.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
