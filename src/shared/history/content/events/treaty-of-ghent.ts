import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-ghent',
  names: [
    { text: 'Treaty of Ghent', lang: 'en', role: 'primary' },
    {
      text: 'Treaty of Peace and Amity Between the United States and Great Britain',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'nara-milestone-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent (1814)', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1814-12-24' },
        cites: [
          {
            source: 'avalon-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent, closing clause' }
          },
          {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '5' }
          },
          {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:ghent',
      cites: [
        {
          source: 'avalon-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent, closing clause' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:war-of-1812' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Under the mediation of the Czar of Russia, Great Britain and the United States came together in the summer of 1814 to negotiate the terms of peace. On Christmas Eve British and American negotiators signed the Treaty of Ghent, restoring the political boundaries on the North American continent to the status quo ante bellum, establishing a boundary commission to resolve further territorial disputes, and creating peace with Indian nations on the frontier.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        },
        {
          id: 'q2',
          text: 'A meeting in Belgium of American delegates and British commissioners ended with the signing of the Treaty of Ghent on December 24, 1814. Great Britain agreed to relinquish claims to the Northwest Territory, and both countries pledged to work toward ending the slave trade.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        },
        {
          id: 'q3',
          text: 'America, in turn, gained influence as a foreign power.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: 'There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns, and People of every degree without exception of places or persons.',
          lang: 'en',
          cite: { source: 'avalon-treaty-of-ghent', loc: { section: 'Treaty of Ghent, Art. 1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/ghent.asp'
          }
        },
        {
          id: 'q5',
          text: 'All hostilities both by sea and land shall cease as soon as this Treaty shall have been ratified by both parties as hereinafter mentioned.',
          lang: 'en',
          cite: { source: 'avalon-treaty-of-ghent', loc: { section: 'Treaty of Ghent, Art. 1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/ghent.asp'
          }
        },
        {
          id: 'q6',
          text: 'Done in triplicate at Ghent the twenty fourth day of December one thousand eight hundred and fourteen.',
          lang: 'en',
          cite: {
            source: 'avalon-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent, closing clause' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/ghent.asp'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/The_Signing_of_the_Treaty_of_Ghent%2C_Christmas_Eve%2C_1814_SAAM-1922.5.2_1.jpg/1280px-The_Signing_of_the_Treaty_of_Ghent%2C_Christmas_Eve%2C_1814_SAAM-1922.5.2_1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Signing_of_the_Treaty_of_Ghent,_Christmas_Eve,_1814_SAAM-1922.5.2_1.jpg',
    credit: { institution: 'Smithsonian American Art Museum', creator: 'Amédée Forestier' },
    license: { id: 'cc0' }
  }
})
