import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'second-intifada-responsibility-for-attacks-on-civilians',
  about: ['event:second-intifada'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'The majority of these deaths and injuries were caused by so-called suicide bombings carried out by Palestinians.',
    lang: 'en',
    cite: {
      source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
      loc: { section: 'Erased in a Moment' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://www.hrw.org/report/2002/10/15/erased-moment/suicide-bombing-attacks-against-israeli-civilians'
    }
  },
  positions: [
    {
      id: 'israel-the-palestinian-authority-is-responsible-for-all-attacks',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' },
        { kind: 'participant', name: 'Ariel Sharon', ref: 'person:ariel-sharon' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Prime Minister Ariel Sharon\'s coalition government held the severely weakened Palestinian Authority (PA) responsible for all armed attacks by Palestinians.',
          lang: 'en',
          cite: {
            source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'On the basis of what was publicly available as of the end of September 2002, Human Rights Watch did not find evidence that Arafat and the PA planned, ordered, or carried out suicide bombings or other attacks on Israeli civilians.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
            loc: { section: 'Erased in a Moment' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2002/10/15/erased-moment/suicide-bombing-attacks-against-israeli-civilians'
          }
        }
      ]
    },
    {
      id: 'palestinian-armed-groups-resistance-to-occupation',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Palestinian armed groups' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Palestinian armed groups have sought to justify suicide bombing attacks on civilians by pointing to Israeli military actions that have killed numerous Palestinian civilians during current clashes, as well as the continuing Israeli occupation of the West Bank and much of the Gaza Strip.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
            loc: { section: 'Erased in a Moment' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2002/10/15/erased-moment/suicide-bombing-attacks-against-israeli-civilians'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'International humanitarian law leaves absolutely no doubt that attacks targeting civilians constitute war crimes when committed in situations of armed conflict, and cross the threshold to become crimes against humanity when conducted systematically, whether in peace or war.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-10-erased-in-a-moment-suicide-bombing-attacks-against-israeli-civilians',
            loc: { section: 'Erased in a Moment' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2002/10/15/erased-moment/suicide-bombing-attacks-against-israeli-civilians'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
