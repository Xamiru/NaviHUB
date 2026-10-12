import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iraq-war-justification',
  about: ['event:iraq-war'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'us-iraq-a-continuing-threat-with-weapons-of-mass-destruction',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Dick Cheney' },
        { kind: 'state', name: 'United States Congress' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In an August 2002 speech, Vice President Cheney made the Administration’s case by laying out Saddam’s efforts over many years to deceive weapons inspectors: “Simply stated, there is no doubt that Saddam Hussein now has weapons of mass destruction. There is no doubt that he is amassing them to use them against our friends, against our allies, and against us.”',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q2',
          text: 'Whereas Iraq both poses a continuing threat to the national security of the United States and international peace and security in the Persian Gulf region and remains in material and unacceptable breach of its international obligations by, among other things, continuing to possess and develop a significant chemical and biological weapons capability, actively seeking a nuclear weapons capability, and supporting and harboring terrorist organizations;',
          lang: 'en',
          cite: {
            source: 'us-congress-2002-aumf-against-iraq-resolution',
            loc: {
              section: 'Authorization for Use of Military Force Against Iraq Resolution of 2002'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Authorization_for_Use_of_Military_Force_Against_Iraq_Resolution_of_2002'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'The international community later learned that the regime had disposed of much of its WMD capabilities, but had not been open about its actions.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-george-w-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        }
      ]
    },
    {
      id: 'iraq-inquiry-the-uk-joined-before-peaceful-options-were-exhausted',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'The Iraq Inquiry (Sir John Chilcot)' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'We have concluded that the UK chose to join the invasion of Iraq before the peaceful options for disarmament had been exhausted.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        },
        {
          id: 'q5',
          text: 'The judgements about the severity of the threat posed by Iraq’s weapons of mass destruction – WMD – were presented with a certainty that was not justified.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        },
        {
          id: 'q6',
          text: 'In the absence of a majority in support of military action, we consider that the UK was, in fact, undermining the Security Council’s authority.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        }
      ]
    },
    {
      id: 'most-security-council-members-peaceful-options-had-not-run-out',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'Members of the United Nations Security Council' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Without evidence of major new Iraqi violations or reports from the inspectors that Iraq was failing to co-operate and they could not carry out their tasks, most members of the Security Council could not be convinced that peaceful options to disarm Iraq had been exhausted and that military action was therefore justified.',
          lang: 'en',
          cite: {
            source: 'iraq-inquiry-2016-07-06-chilcot-public-statement',
            loc: { section: 'Sir John Chilcot\'s public statement, 6 July 2016', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://web.archive.org/web/20160706180903/http://www.iraqinquiry.org.uk/the-inquiry/sir-john-chilcots-public-statement/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
