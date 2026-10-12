import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'israeli-disengagement-from-gaza-occupation',
  about: ['event:israeli-disengagement-from-gaza'],
  topic: 'significance',
  positions: [
    {
      id: 'israel-disengagement-dispels-claims-of-responsibility',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' },
        { kind: 'participant', name: 'Ariel Sharon', ref: 'person:ariel-sharon' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The plan states that the disengagement “will serve to dispel the claims regarding Israel’s responsibility for the Palestinians in the Gaza Strip.”',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2005/country-chapters/israel/palestine'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'In fact, under international humanitarian law, the steps envisioned will not end Israel’s occupation of the territory, and Israel will retain responsibility for the welfare of Gaza’s civilian population.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2005/country-chapters/israel/palestine'
          }
        }
      ]
    },
    {
      id: 'hrw-reconfigured-occupation',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q3',
          text: '“The removal of settlers and most military forces will not end Israel’s control over Gaza,” said Sarah Leah Whitson, Executive Director of Human Rights Watch’s Middle East and North Africa Division.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-10-28-israel-disengagement-will-not-end-gaza-occupation',
            loc: { section: 'Israel: \'Disengagement\' Will Not End Gaza Occupation', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2004/10/28/israel-disengagement-will-not-end-gaza-occupation'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
