import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-treaty-of-erzurum',
  names: [
    { text: 'Second Treaty of Erzurum', lang: 'en', role: 'primary' },
    { text: 'عهدنامه دوم ارزروم', lang: 'fa', role: 'native' },
    {
      text: 'second treaty of Erzerum',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1847-05-31' },
        cites: [
          {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '2' }
          },
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:erzurum',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' }
  ],
  related: [
    { ref: 'event:first-treaty-of-erzurum', rel: 'related' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' },
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      ref: 'person:amir-kabir',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '2' }
        }
      ]
    },
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '13' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Great Britain in particular feared that unceasing and savage raiding on both sides of the border would weaken both the Ottoman empire and Persia, thus exposing them to Russian territorial or commercial expansion. A border commission composed of representatives of the Ottoman government, Persia, Great Britain, and Russia was therefore established. It sat from 1259/1843 to 1263/1847, and its work culminated in the second Treaty of Erzurum, which was signed on 16 Jomādā II 1263/31 May 1847.',
          lang: 'en',
          cite: {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/boundaries-i'
          }
        },
        {
          id: 'q2',
          text: 'The treaty stipulated that Iran would cede the region west of Zohāb to the Ottomans in exchange for guaranteed sovereignty over islands and territory near the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-i'
          }
        },
        {
          id: 'q3',
          text: 'In this agreement, the Persia-Iraq land boundary was demarcated far more specifically than in any previous treaty, but it still did not clearly address the question of jurisdiction over the waters of the Šaṭṭ-al-ʿArab river.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Local thugs at Karbalāʾ created similar problems with subsequent Ottoman harsh repression that resulted in a wholesale massacre of the inhabitants. Both British and Russian envoys intervened to prevent war between Persia and the Ottomans (Algar, pp. 114 ff.), which led to the signing of the second treaty of Erzerum (16 Jomādā II 1263/31 May 1847; Hedāyat, Rawżat al-ṣafā X, pp. 302-6; see BOUNDARIES i).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'More significant were the almost four years that he spent in Erzurum, participating in the work of a commission to delineate the Ottoman-Iranian frontier and settle certain other differences between the two states. He appears to have been the most forceful member of the Iranian negotiating team, resisting attempts to exclude Moḥammara (present-day Ḵorramšahr) from Iranian sovereignty and to make Iran pay compensation for its military incursions into the area of Solaymānīya.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Immediately after the signing of the second Treaty of Erzurum fighting broke out over the region around Qoṭūr and Ḵᵛoy in northwestern Azarbaijan; the dispute was settled in 1295/1878 by the Treaty of Berlin (Ramazani, p. 56), in which the Ottoman and Qajar governments formally acquiesced to the terms of the 1263/1847 agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-i'
          }
        },
        {
          id: 'q9',
          text: 'Although a form of treaty was concluded between Iran and the Ottoman State, the borders had still not been delineated when the Crimean War erupted and the British and Russian mediators found themselves at war and withdrew.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q10',
          text: 'Negotiations continued for years on this issue, but since neither side had enough incentive to resolve this issue, the British Foreign Secretary, Lord Palmerston, commented in 1851 that “the boundary line between Turkey and Persia can never be finally settled except by an arbitrary decision on the part of Great Britain and Russia,” presaging many decades of discussion.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        }
      ]
    }
  ]
})
