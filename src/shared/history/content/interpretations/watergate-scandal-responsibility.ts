import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'watergate-scandal-responsibility',
  about: ['event:watergate-scandal'],
  topic: 'responsibility',
  positions: [
    {
      id: 'white-house-denial',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States of America (Nixon administration)' },
        { kind: 'participant', name: 'Ron Ziegler' },
        { kind: 'participant', name: 'Richard Nixon', ref: 'person:richard-nixon' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The following day, White House Press Secretary Ron Ziegler called the break-in a “third-rate burglary.” At a press conference on June 22, President Richard Nixon denied involvement.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Meanwhile, the White House announced that the president had no prior knowledge of the Watergate matter. Yet Dean’s testimony refuted that claim. He told a stunned Senate committee and, through the gathered media, an astonished public, that Nixon not only knew of the break-in, the president had directed in the cover-up.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '64' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        },
        {
          id: 'q8',
          text: 'They ended his presidency by furnishing proof of his involvement in the Watergate cover-up',
          lang: 'en',
          cite: {
            source: 'millercenter-hughes-nixon-impact-and-legacy',
            loc: { section: 'Richard Nixon: Impact and Legacy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://millercenter.org/president/nixon/impact-and-legacy'
          }
        }
      ]
    },
    {
      id: 'tapes-show-obstruction',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Richard Nixon Presidential Library and Museum' },
        { kind: 'organization', name: 'Gerald R. Ford Presidential Library and Museum' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Nixon denied any personal involvement with the Watergate burglary, but the courts forced him to yield tape recordings of conversations between the president and his advisers indicating that the president had, in fact, participated in the cover-up, including an attempt to use the Central Intelligence Agency to divert the FBI\'s investigation into the break-in.',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '42' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        }
      ]
    },
    {
      id: 'presidents-resignation',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States of America' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'I hereby resign the Office of President of the United States.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '388' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The seriousness of the Watergate matter was measured by the strength of the Senate’s vote to create an investigative committee – 77 to 0.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        }
      ]
    },
    {
      id: 'nixons-later-regret',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Richard Nixon', ref: 'person:richard-nixon' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In response, Nixon issued a statement in which he said he regretted "not acting more decisively and forthrightly in dealing with Watergate."',
          lang: 'en',
          cite: { source: 'nixon-library-president-nixon', loc: { section: 'The Life', para: '46' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'https://www.nixonlibrary.gov/president-nixon' }
        }
      ]
    },
    {
      id: 'fords-pardon',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States of America' },
        { kind: 'participant', name: 'Gerald R. Ford' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'As a result of certain acts or omissions occurring before his resignation from the Office of President, Richard Nixon has become liable to possible indictment and trial for offenses against the United States.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '403' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        },
        {
          id: 'q6',
          text: 'NOW, THEREFORE, I, Gerald R. Ford, President of the United States, pursuant to the pardon power conferred upon me by Article II, Section 2, of the Constitution, have granted and by these presents do grant a full, free, and absolute pardon unto Richard Nixon for all offenses against the United States which he, Richard Nixon, has committed or may have committed or taken part in during the period from January 20, 1969 through August 9, 1974.',
          lang: 'en',
          cite: {
            source: 'ford-library-the-watergate-files',
            loc: { section: 'The Watergate Files', para: '405' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.fordlibrarymuseum.gov/museum/exhibits/watergate_files/index.html'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'Instead Ford\'s pardon of Nixon touched off a firestorm of protest. Polls showed that most Americans wanted Nixon punished.',
          lang: 'en',
          cite: {
            source: 'millercenter-greene-ford-domestic-affairs',
            loc: { section: 'Gerald Ford: Domestic Affairs' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://millercenter.org/president/ford/domestic-affairs'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
