import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'german-empire',
  names: [
    { text: 'German Empire', lang: 'en', role: 'primary' },
    { text: 'Deutsches Kaiserreich', lang: 'de', role: 'native' },
    {
      text: 'Second Reich',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Imperial Germany', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1871-01-18' },
        cites: [
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '4' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The German Empire--often called the Second Reich to distinguish it from the First Reich, established by Charlemagne in 800--was based on two compromises. The first was between the king of Prussia and the rulers of the other German states, who agreed to accept him as the kaiser (emperor) of a united Germany, provided they could continue to rule their states largely as they had in the past. The second was the agreement among many segments of German society to accept a unified Germany based on a constitution that combined a powerful authoritarian monarchy with a weak representative body, the Reichstag, elected by universal male suffrage. No one was completely satisfied with the bargain.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Imperial Germany', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/28.htm' }
        },
        {
          id: 'q2',
          text: 'As had been the tradition in Prussia, the kaiser controlled foreign policy and the army through his handpicked ministers, who formed the government and prepared legislation. The government was headed by a chancellor, also selected by the kaiser, who served in this post at the kaiser\'s pleasure and could be dismissed by him at any time.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Imperial Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/28.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'Bismarck sincerely regarded the new German Empire as "satiated," that is, having no desire to expand further and hence posing no threat to its neighbors.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_%283._Fassung_1885%29.jpg/1280px-A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_%283._Fassung_1885%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg',
    credit: { institution: 'Bismarck Museum', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  }
})
