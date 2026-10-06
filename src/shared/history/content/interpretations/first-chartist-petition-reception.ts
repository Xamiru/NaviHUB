import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-chartist-petition-reception',
  about: ['event:first-chartist-petition'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'peaceful-constitutional-right',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Thomas Attwood' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Yet at all the 224 meetings which have been held, the persons attending them had confined themselves strictly to the legal pursuit of their constitutional rights, for the purpose of remedying the extreme sufferings which they had endured for so many years.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jun/14/national-petition-the-chartists'
          }
        },
        {
          id: 'q2',
          text: 'He washed his hands of any idea, of any appeal to physical force.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-06-14-national-petition',
            loc: { section: 'HC Deb 14 June 1839 vol 48 cc222-7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jun/14/national-petition-the-chartists'
          }
        }
      ]
    },
    {
      id: 'not-the-nation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord John Russell' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'I deny, that this petition represents the sentiments and opinions of the people at large.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jul/12/the-national-petition'
          }
        },
        {
          id: 'q4',
          text: 'Therefore it is not by universal suffrage, or by any form of suffrage, or by any principle of representation, that you can, as the hon. Gentleman presumes, obtain laws which shall ensure lasting prosperity to the people.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jul/12/the-national-petition'
          }
        }
      ]
    },
    {
      id: 'real-grievance',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Benjamin Disraeli' },
        { kind: 'participant', name: 'Joseph Hume' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'He could not believe, that a movement which, if not national, was yet most popular, could have been produced by those common means of sedition to which the noble Lord had referred.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jul/12/the-national-petition'
          }
        },
        {
          id: 'q6',
          text: 'That organization arose out of deep and general discontent,',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jul/12/the-national-petition'
          }
        }
      ]
    },
    {
      id: 'principle-not-details',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Daniel O\'Connell' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'I must claim the indulgence of the House whilst I express my opinions on this occasion; because having taken a decided part against the Chartists out of this House, I feel it to be my duty to declare, that I am favourable to the principle, but not to the details of this petition.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1839-07-12-national-petition',
            loc: { section: 'HC Deb 12 July 1839 vol 49 cc220-74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1839/jul/12/the-national-petition'
          }
        }
      ]
    }
  ]
})
