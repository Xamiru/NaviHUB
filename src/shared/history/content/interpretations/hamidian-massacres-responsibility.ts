import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'hamidian-massacres-responsibility',
  about: ['event:hamidian-massacres'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'fanatical-outbreak',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'Government of the United Kingdom' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'I deeply regret that a fanatical outbreak on the part of a section of the Turkish population has resulted in a series of massacres in those provinces, which have caused the deepest indignation in this country.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1896-02-11-queens-speech',
            loc: { section: 'HL Deb 11 February 1896 vol 37 cc3-6', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1896/feb/11/the-queens-speech'
          }
        }
      ]
    },
    {
      id: 'authorities-complicit',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Salisbury' },
        { kind: 'participant', name: 'Sir Edward Grey' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The reports which have reached us show that the Sultan is mistaken in his belief that the Armenians have provoked these disorders.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1896-03-03-armenian-christians',
            loc: { section: 'HC Deb 03 March 1896 vol 38 cc37-125', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1896/mar/03/armenian-christians'
          }
        },
        {
          id: 'q3',
          text: 'We are informed that on nearly every occasion this was not the case, and in too many instances the Turkish Authorities and troops have encouraged and even taken part in the outrages which have occurred.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1896-03-03-armenian-christians',
            loc: { section: 'HC Deb 03 March 1896 vol 38 cc37-125', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1896/mar/03/armenian-christians'
          }
        },
        {
          id: 'q4',
          text: 'But, Sir, you cannot prove that from the Blue-books, and you can prove that it was not merely the Mahomedan population, but the Turkish officials and soldiers who were accomplices in the oppressions of the Armenians.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1896-03-03-armenian-christians',
            loc: { section: 'HC Deb 03 March 1896 vol 38 cc37-125', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1896/mar/03/armenian-christians'
          }
        }
      ]
    },
    {
      id: 'agitation-and-exaggeration',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sir Ellis Ashmead-Bartlett' },
        { kind: 'participant', name: 'T. W. Legh' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The hon. Member and his Friends seemed to think that they could revile the Turks and the Moslem religion to any extent without causing any resentment; but he maintained that their abusive language was largely responsible for the terrible deeds which had lately occurred in Asia Minor.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1896-03-03-armenian-christians',
            loc: { section: 'HC Deb 03 March 1896 vol 38 cc37-125', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1896/mar/03/armenian-christians'
          }
        },
        {
          id: 'q6',
          text: 'The statement that 30,000 people had been massacred was reduced down to the fact that 265 people had lost their lives.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1896-03-03-armenian-christians',
            loc: { section: 'HC Deb 03 March 1896 vol 38 cc37-125', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1896/mar/03/armenian-christians'
          }
        },
        {
          id: 'q7',
          text: 'He believed they were got up on the other side of the Danube and on this side of the Channel by persons whose only care was to keep a whole skin to their bodies, keeping themselves out of the way while other people did the work.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1896-03-03-armenian-christians',
            loc: { section: 'HC Deb 03 March 1896 vol 38 cc37-125', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1896/mar/03/armenian-christians'
          }
        }
      ]
    },
    {
      id: 'support-or-passivity-of-authorities',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Boris Adjemian' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Occurring from 1894 to 1897, during the reign of Sultan Abdul Hamid II (1876-1909), they benefitted, in some cases, from manifest support, and in others, protective passivity from the authorities, who saw them as a useful tool for repressing the Armenians’ political demands.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        }
      ]
    },
    {
      id: 'repression-of-revolutionary-activities',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'In addition, the repression of revolutionary activities in Armenia during 1894-96 cost about 300,000 lives and aroused European public opinion against the Ottoman regime.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    }
  ]
})
