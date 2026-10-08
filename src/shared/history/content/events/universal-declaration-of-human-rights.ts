import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'universal-declaration-of-human-rights',
  names: [
    { text: 'Universal Declaration of Human Rights', lang: 'en', role: 'primary' },
    {
      text: 'Allgemeine Erklärung der Menschenrechte',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1948', loc: { section: 'Jahreschronik 1948', para: '152' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1948-12-10' },
        cites: [
          { source: 'lemo-chronik-1948', loc: { section: 'Jahreschronik 1948', para: '151' } }
        ]
      }
    ]
  },
  regions: ['global'],
  prominence: 2,
  related: [
    { ref: 'event:founding-of-the-united-nations', rel: 'related' },
    { ref: 'event:the-holocaust', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The United Nations General Assembly adopted the Universal Declaration of Human Rights on December 10, 1948 in the midst of an especially bitter phase of the Cold War.',
          lang: 'en',
          cite: {
            source: 'fdr-library-universal-declaration-of-human-rights',
            loc: { section: 'Universal Declaration of Human Rights' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://www.fdrlibrary.org/human-rights' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'WHEREAS recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world,',
          lang: 'en',
          cite: {
            source: 'avalon-universal-declaration-of-human-rights',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/unrights.asp'
          }
        },
        {
          id: 'q3',
          text: 'WHEREAS disregard and contempt for human rights have resulted in barbarous acts which have outraged the conscience of mankind, and the advent of a world in which human beings shall enjoy freedom of speech and belief and freedom from fear and want has been proclaimed as the highest aspiration of the common people,',
          lang: 'en',
          cite: {
            source: 'avalon-universal-declaration-of-human-rights',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/unrights.asp'
          }
        },
        {
          id: 'q4',
          text: 'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.',
          lang: 'en',
          cite: {
            source: 'avalon-universal-declaration-of-human-rights',
            loc: { section: 'Article 1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/unrights.asp'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Eleanor_Roosevelt_UDHR.jpg/1280px-Eleanor_Roosevelt_UDHR.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Eleanor_Roosevelt_UDHR.jpg',
    credit: { institution: 'FDR Presidential Library & Museum' },
    license: { id: 'cc-by', version: '2.0' }
  }
})
