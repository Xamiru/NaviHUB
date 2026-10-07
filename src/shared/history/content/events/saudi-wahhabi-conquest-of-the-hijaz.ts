import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'saudi-wahhabi-conquest-of-the-hijaz',
  names: [
    { text: 'Saudi-Wahhabi conquest of the Hijaz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1803' },
        cites: [
          {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 3,
  related: [
    { ref: 'event:wahhabi-sack-of-karbala', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After Muhammad ibn Saud died in 1765, his son, Abd al Aziz, continued the Wahhabi advance. In 1801 the Al Saud-Wahhabi armies attacked and sacked Karbala, the Shia shrine in eastern Iraq that commemorates the death of Husayn. In 1803 they moved to take control of Sunni towns in the Hijaz. Although the Wahhabis spared Mecca and Medina the destruction they visited upon Karbala, they destroyed monuments and grave markers that were being used for prayer to Muslim saints and for votive rituals, which the Wahhabis consider acts of polytheism.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q2',
          text: 'But capturing the Hijaz brought the Al Saud empire into conflict with the rest of the Islamic world. The popular and Shia practices to which the Wahhabis objected were important to other Muslims, the majority of whom were alarmed that shrines were destroyed and access to the holy cities restricted.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        },
        {
          id: 'q3',
          text: 'At the beginning of the nineteenth century, the Ottomans were not in a position to recover the Hijaz, because the empire had been in decline for more than two centuries, and its forces were weak and overextended. Accordingly, the Ottomans delegated the recapture of the Hijaz to their most ambitious client, Muhammad Ali, the semi-independent commander of their garrison in Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        }
      ]
    }
  ]
})
