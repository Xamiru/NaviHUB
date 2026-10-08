import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-waitangi',
  names: [
    { text: 'Treaty of Waitangi', lang: 'en', role: 'primary' },
    { text: 'Te Tiriti o Waitangi', lang: 'mi', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1840-02-06' },
        cites: [
          {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '1' }
          },
          {
            source: 'waitangi-tribunal-maori-and-english-texts',
            loc: { section: 'Māori and English texts', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['oceania'],
  prominence: 2,
  places: [
    {
      ref: 'place:waitangi',
      cites: [
        {
          source: 'waitangi-tribunal-about-the-treaty',
          loc: { section: 'About the treaty', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:british-empire' }
  ],
  participants: [
    {
      name: 'Captain William Hobson',
      role: 'signatory',
      cites: [
        {
          source: 'waitangi-tribunal-about-the-treaty',
          loc: { section: 'About the treaty', para: '1' }
        },
        {
          source: 'waitangi-tribunal-about-the-treaty',
          loc: { section: 'About the treaty', para: '3' }
        }
      ]
    },
    {
      ref: 'person:queen-victoria',
      role: 'head-of-state',
      cites: [
        {
          source: 'waitangi-tribunal-maori-and-english-texts',
          loc: { section: 'Māori and English texts', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 500, qualifier: 'over' },
            cites: [
              {
                source: 'waitangi-tribunal-about-the-treaty',
                loc: { section: 'About the treaty', para: '5' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 6 February 1840, te Tiriti o Waitangi was signed at Waitangi in the Bay of Islands by Captain William Hobson, several English residents, and between 43 and 46 Māori rangatira.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The British Government was considering establishing a form of civil government in New Zealand because of the increasing number of British people who were coming to live in New Zealand.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q4',
          text: 'The government instructed Captain William Hobson to act for the British Crown in negotiating a treaty on the grounds that it was necessary to obtain Māori consent before establishing any form of government.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'After the signing at Waitangi, te Tiriti was taken to places in Northland to obtain additional Māori signatures.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q6',
          text: 'By the end of that year, over 500 Māori had signed te Tiriti.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q7',
          text: 'A sheet bearing the English text was signed only at Waikato Heads and at Manukau by 39 rangatira.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'The origins of the treaty, and the process by which it was signed at various locations throughout New Zealand, have been the source of considerable historical debate.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q9',
          text: 'Under the Treaty of Waitangi Act 1975, the Waitangi Tribunal is tasked with determining the meaning and effect of the treaty for the purposes of inquiring into Māori claims.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Te_Tiriti_o_Waitangi_-_The_Treaty_of_Waitangi_%281840%29_-_Waitangi_Sheet_.jpg/1280px-Te_Tiriti_o_Waitangi_-_The_Treaty_of_Waitangi_%281840%29_-_Waitangi_Sheet_.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Te_Tiriti_o_Waitangi_-_The_Treaty_of_Waitangi_(1840)_-_Waitangi_Sheet_.jpg',
    credit: { institution: 'Archives New Zealand' },
    license: { id: 'cc-by', version: '2.0' }
  },
  furtherReading: [
    { source: 'walker-1990-ka-whawhai-tonu-matou', perspective: 'pacific' }
  ]
})
