import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'treaty-of-waitangi-meaning',
  about: ['event:treaty-of-waitangi'],
  topic: 'nature',
  researched: '2026-10-09',
  framing: {
    id: 'q1',
    text: 'However, the Māori text is not an exact translation of the English text.',
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
  },
  positions: [
    {
      id: 'english-text-sovereignty',
      category: 'official',
      holders: [
        { kind: 'state', name: 'British Crown' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Chiefs of the Confederation of the United Tribes of New Zealand and the separate and independent Chiefs who have not become members of the Confederation cede to Her Majesty the Queen of England absolutely and without reservation all the rights and powers of Sovereignty which the said Confederation or Individual Chiefs respectively exercise or possess, or may be supposed to exercise or to possess over their respective Territories as the sole Sovereigns thereof.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-maori-and-english-texts',
            loc: { section: 'Māori and English texts', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/maori-and-english-versions'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'By contrast, in the English text this was called the ‘exclusive right of Preemption’, which meant only the Crown could purchase land from Māori.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q9',
          text: 'For this reason, the Treaty of Waitangi Act requires the Tribunal to ‘decide issues raised by the differences between them’.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        }
      ]
    },
    {
      id: 'kawanatanga-governance',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Waitangi Tribunal' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In the Māori text of article 1, Māori gave the British ‘kawanatanga’, the right of governance, whereas in the English text, Māori ceded \'sovereignty\'.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q4',
          text: 'One of the problems that faced the original drafters of the te reo Māori text of the treaty was that \'sovereignty\' had no direct equivalent in the context of Māori society.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/about-the-treaty'
          }
        },
        {
          id: 'q5',
          text: 'Scholars and the Tribunal have concluded Māori and the Crown held different interpretations of this provision.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-about-the-treaty',
            loc: { section: 'About the treaty', para: '30' }
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
      id: 'no-understanding-of-sovereignty',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hugh Kawharu' }
      ],
      statements: [
        {
          id: 'q6',
          text: '\'Government\': \'kawanatanga\'. There could be no possibility of the Māori signatories having any understanding of government in the sense of \'sovereignty\': ie, any understanding on the basis of experience or cultural precedent.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-maori-and-english-texts',
            loc: { section: 'Māori and English texts', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/maori-and-english-versions'
          }
        },
        {
          id: 'q7',
          text: 'The translation sets out to show how Māori would have understood the meaning of the text they signed.',
          lang: 'en',
          cite: {
            source: 'waitangi-tribunal-maori-and-english-texts',
            loc: { section: 'Māori and English texts', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.waitangitribunal.govt.nz/en/about/the-treaty/maori-and-english-versions'
          }
        }
      ]
    }
  ]
})
