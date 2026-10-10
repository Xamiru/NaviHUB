import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'us-sanctions-on-iran-1995-1996-rationale',
  about: ['event:us-sanctions-on-iran-1995-1996'],
  topic: 'motives',
  positions: [
    {
      id: 'us-the-government-of-iran-as-a-threat',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Bill Clinton', ref: 'person:bill-clinton' },
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'I, William J. Clinton, President of the United States of America, find that the actions and policies of the Government of Iran constitute an unusual and extraordinary threat to the national security, foreign policy, and economy of the United States, and hereby declare a national emergency to deal with that threat.',
          lang: 'en',
          cite: {
            source: 'clinton-1995-executive-order-12957',
            loc: { section: 'Executive Order 12957' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Executive_Order_12957'
          }
        },
        {
          id: 'q2',
          text: 'The efforts of the Government of Iran to acquire weapons of mass destruction and the means to deliver them and its support of acts of international terrorism endanger the national security and foreign policy interests of the United States and those countries with which the United States shares common strategic and foreign policy objectives.',
          lang: 'en',
          cite: {
            source: 'us-congress-1996-iran-and-libya-sanctions-act',
            loc: { section: 'Public Law 104-172, Sec. 2(1)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.govinfo.gov/content/pkg/PLAW-104publ172/html/PLAW-104publ172.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'While the E.U. signaled displeasure with Iran after the Mykonos verdict, prominent voices in the U.S. advocated reevaluating its call for multilateral economic sanctions against Iran in light of evidence that they had won scant international support and had achieved little in the areas of policy that the sanctions had been designed to change, including human rights.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    },
    {
      id: 'germany-no-economic-sanctions',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Klaus Kinkel' },
        { kind: 'state', name: 'Germany' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'German Foreign Minister Klaus Kinkel made clear that for Germany there would be "no economic sanctions and no severing of relations."',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'But commercial interests remained paramount both before and after the dialogue was suspended, and there was little evidence of European initiatives on human rights.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
