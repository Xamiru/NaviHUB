import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-aslanduz',
  names: [
    { text: 'Battle of Aslanduz', lang: 'en', role: 'primary' },
    { text: 'نبرد اصلاندوز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1812-10-31' },
        cites: [
          { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } },
          {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:aslanduz',
      cites: [
        { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '1' } }
      ]
    }
  ],
  partOf: [
    { ref: 'event:russo-persian-war-1804-1813' },
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    {
      ref: 'event:treaty-of-golestan',
      rel: 'led-to',
      cites: [
        { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } }
      ]
    }
  ],
  sides: [
    {
      key: 'persia',
      name: 'the Iranian force under the crown prince ʿAbbās Mīrzā',
      cites: [
        { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } }
      ]
    },
    {
      key: 'russia',
      name: 'Russian',
      cites: [
        { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
      side: 'persia',
      cites: [
        { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } }
      ]
    },
    {
      name: 'Peter Kotliarevski',
      role: 'commander',
      side: 'russia',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '6' }
        }
      ]
    },
    {
      name: 'Charles Christie',
      role: 'combatant',
      side: 'persia',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '10'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'Despite the efforts of the British mission, ʿAbbās Mirzā’s attempt to exploit Russian weakness during Napoleon’s invasion of 1812 and to regain the lost territory of Georgia was a failure.Four British officers and 12 NCOs actually accompanied the Iranian troops into battle and, although the Iranians snatched one victory when they routed a Russian force near the Aras (Araxes) river in February 1812, the campaign ended in complete defeat at the battle of Āṣlānduz on 31 October 1812 during which one British officer, Charles Christie, was killed.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        },
        {
          id: 'q1',
          text: 'ĀṢLĀNDŪZ (or AṢLĀNDŪZ), a small village in the northeast of the Iranian province of East Azarbaijan (dehestān of Moḡān, baḵš of Germī, šahrestān of Ardabīl) on the south bank of the Aras river.',
          lang: 'en',
          cite: { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aslanduz/'
          }
        },
        {
          id: 'q2',
          text: 'Secondly, less than a month after the suspension of these parleys, the Iranian force under the crown prince ʿAbbās Mīrzā, which had camped in the village, was surprised by a Russian night attack on 24 Šawwāl 1227/31 October 1812.',
          lang: 'en',
          cite: { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aslanduz/'
          }
        },
        {
          id: 'q3',
          text: 'ʿAbbās Mīrzā’s troops were thrown into complete disarray and suffered heavy losses.',
          lang: 'en',
          cite: { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aslanduz/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Firstly, during the Russo-Iranian war of 1218/1803—1228/1813, it was the scene of preliminary peace parleys between Russian and Iranian military representatives on 27-30 Ramażān, 1227/29 September-1 October 1812',
          lang: 'en',
          cite: { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aslanduz/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The outcome of the ten-year-long war was in fact decided by this attack, because the army in Azarbaijan could no longer put up effective resistance.',
          lang: 'en',
          cite: { source: 'iranica-qaem-maqami-aslanduz', loc: { section: 'ĀṢLĀNDŪZ', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aslanduz/'
          }
        },
        {
          id: 'q6',
          text: 'As it also became increasingly apparent that Napoleon’s offensive in Russia had failed disastrously, the Russians were emboldened to pursue a more aggressive campaign in the Caucasus.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'Christie, of stout physique and spirit, who had earned the nickname of Rostam from his Persian troops, was killed as a volunteer in the battle of Āṣlānduz (q.v.) in October 1812 shortly after the time when most members of the British military mission were withdrawn by Ouseley’s order in deference to a request by Russia, Britain’s new ally.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/%D0%90%D1%81%D0%BB%D0%B0%D0%BD%D0%B4%D1%83%D0%B7%D1%81%D0%BA%D0%B0%D1%8F_%D0%B1%D0%B8%D1%82%D0%B2%D0%B0.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%90%D1%81%D0%BB%D0%B0%D0%BD%D0%B4%D1%83%D0%B7%D1%81%D0%BA%D0%B0%D1%8F_%D0%B1%D0%B8%D1%82%D0%B2%D0%B0.jpg',
    credit: { institution: 'Pokorennyi Kavkaz (St Petersburg, 1904)', creator: 'M. Andreev' },
    license: { id: 'public-domain' }
  }
})
