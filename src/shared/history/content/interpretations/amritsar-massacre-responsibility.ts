import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'amritsar-massacre-responsibility',
  about: ['event:amritsar-massacre', 'person:reginald-dyer'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'duty-in-a-rebellion',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Reginald Dyer', ref: 'person:reginald-dyer' },
        { kind: 'participant', name: 'Sir Edward Carson' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'He had to decide as to whether this was a riot, an insurrection, a rebellion, a revolution, or part of a revolution. If one was to go into it, but that is not possible now, I think there is a great deal to show, even on the face of the Report itself, from the information they had that it was at all events the precursor to a revolution.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
            loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '71' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1920/jul/08/army-council-and-general-dyer'
          }
        },
        {
          id: 'q2',
          text: 'You must back your men, and it is not such a distinction, as I have already shown, that is the origin of this matter as to this error of judgment, that will ever give confidence to those faithful and patriotic citizens who have been the men who have won for you and kept your great Empire beyond the seas.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
            loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1920/jul/08/army-council-and-general-dyer'
          }
        }
      ]
    },
    {
      id: 'monstrous-event',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Winston Churchill' },
        { kind: 'state', name: 'British government (Army Council)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'It is an extraordinary event, a monstrous event, an event which stands in singular and sinister isolation.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
            loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '115' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1920/jul/08/army-council-and-general-dyer'
          }
        },
        {
          id: 'q4',
          text: 'We have to make it absolutely clear, some way or other, that this is not the British way of doing business.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1920-07-08-army-council-and-general-dyer',
            loc: { section: 'HC Deb 08 July 1920 vol 131 cc1705-819', para: '149' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1920/jul/08/army-council-and-general-dyer'
          }
        }
      ]
    },
    {
      id: 'colonial-violence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Gajendra Singh' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The precise details were disputed by the British and anti-colonial nationalists, but the ever-present nature of spectacular displays of colonial violence were not.',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    },
    {
      id: 'punjab-wrong',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Indian National Congress' },
        { kind: 'participant', name: 'Mahatma Gandhi' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Even for the Indian National Congress, it was not merely the massacre that constituted the “Punjab Wrong” but the failure to prosecute or condemn Dyer even though the evidence of wrong-doing was overwhelming (Dyer was retired on half-pay and a retirement fund was raised to celebrate his actions by the British press13).',
          lang: 'en',
          cite: {
            source: 'eo1418-singh-amritsar-massacre',
            loc: { section: 'Contesting Memory', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/amritsar-massacre-of/'
          }
        }
      ]
    }
  ]
})
