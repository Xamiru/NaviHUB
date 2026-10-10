import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'kosovo-war-nato-intervention',
  about: ['event:kosovo-war'],
  topic: 'legitimacy',
  framing: {
    id: 'q1',
    text: 'With the initiation of the NATO bombing on March 24, 1999, the conflict in Kosovo and all of the Federal Republic of Yugoslavia, to the extent that it involved NATO and Serbian and Yugoslav forces, became an international armed conflict to which the full body of international humanitarian law applied.',
    lang: 'en',
    cite: {
      source: 'hrw-2001-under-orders-the-nato-air-campaign',
      loc: { section: 'The NATO Air Campaign', para: '13' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-10',
      url: 'https://www.hrw.org/reports/2001/kosovo/undword2b.html'
    }
  },
  positions: [
    {
      id: 'united-states-clinton-address',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Bill Clinton', ref: 'person:bill-clinton' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'My fellow Americans, today our Armed Forces joined our NATO allies in air strikes against Serbian forces responsible for the brutality in Kosovo.',
          lang: 'en',
          cite: {
            source: 'white-house-1999-03-24-statement-to-the-nation-on-kosovo',
            loc: { section: 'Statement by the President to the Nation', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse5.archives.gov/textonly/WH/New/html/19990324-2872.html'
          }
        },
        {
          id: 'q3',
          text: 'We act to protect thousands of innocent people in Kosovo from a mounting military offensive.',
          lang: 'en',
          cite: {
            source: 'white-house-1999-03-24-statement-to-the-nation-on-kosovo',
            loc: { section: 'Statement by the President to the Nation', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse5.archives.gov/textonly/WH/New/html/19990324-2872.html'
          }
        },
        {
          id: 'q4',
          text: 'I am convinced that the dangers of acting are far outweighed by the dangers of not acting -- dangers to defenseless people and to our national interests.',
          lang: 'en',
          cite: {
            source: 'white-house-1999-03-24-statement-to-the-nation-on-kosovo',
            loc: { section: 'Statement by the President to the Nation', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse5.archives.gov/textonly/WH/New/html/19990324-2872.html'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'The Serbian and Yugoslav government offensive in Kosovo that began on March 20, 1999, four days before NATO bombing commenced, was a methodically planned and well-implemented campaign.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword.htm'
          }
        },
        {
          id: 'q6',
          text: 'Human Rights Watch found no evidence of war crimes in its investigation of NATO bombing in Kosovo.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-the-nato-air-campaign',
            loc: { section: 'The NATO Air Campaign', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword2b.html'
          }
        }
      ]
    },
    {
      id: 'human-rights-watch-nato-and-humanitarian-law',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The investigation did conclude, however, that NATO violated international humanitarian law.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-the-nato-air-campaign',
            loc: { section: 'The NATO Air Campaign', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword2b.html'
          }
        },
        {
          id: 'q8',
          text: 'While the government campaign seems to have been an attempt to crush the KLA, it clearly developed into something more once the NATO bombing began.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-under-orders-executive-summary',
            loc: { section: 'Executive Summary', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/2001/kosovo/undword.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
