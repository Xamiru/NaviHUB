import { definePerson } from '../../schema'

export default definePerson({
  id: 'bahaullah',
  names: [
    { text: 'Baháʼu\'lláh', lang: 'en', role: 'primary' },
    { text: 'بهاءالله', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā Ḥosayn-ʿAlī Nūrī',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } }
      ]
    },
    {
      text: 'Bahāʾ-Allāh',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1817-11-12' },
        cites: [
          { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1892' },
        cites: [
          { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } },
          { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '17' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BAHĀʾ-ALLĀH MĪRZĀ ḤOSAYN-ʿALĪ NŪRĪ (1233-1309/1817-92). Iranian notable and founder of the Bahai religion or Bahaism.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Iranian notable and founder of the Bahai religion or Bahaism. He was born 2 Moḥarram 1233/12 November 1817 in Tehran into the household of a notable family from Māzandarān.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q3',
          text: 'From this point Mīrzā Ḥosayn-ʿAlī adopted the name Bahāʾ (the glory, [of God]).',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q11',
          text: 'In June, 1851, Bahāʾ-Allāh left Tehran for Karbalāʾ in Iraq at the suggestion of First Minister Amīr Neẓām Taqī Khan (later Amīr[-e] Kabīr), who attempted to co-opt him by offering him a government post whenever he should return. Bahāʾ-Allāh refused the post, but took the hint that he should leave Iran for a while. Bahāʾ-Allāh found Babis in Karbalāʾ following a Sayyed ʿOloww, who claimed to be a divine incarnation until Bahāʾ-Allāh’s greater prestige caused him to renounce his pretensions. While in Karbalāʾ in 1851, according to his companion Shaikh Ḥasan Zonūzī, Bahāʾ-Allāh said he was himself the return of Imam Ḥosayn (whom many expected to appear after the Mahdī, whom Babis identified with the Bāb), though he kept this “messianic secret” from most of his associates. In public, Bahāʾ-Allāh supported Azal, in the interests of unity, and worked to spread Babism in Karbalāʾ',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q4',
          text: 'Despite having found him innocent, the government exiled Bahāʾ-Allāh, who chose to return to Iraq in the Ottoman empire, arriving in Baghdad on 12 January 1853.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q5',
          text: 'In the 1860s, Bahāʾ-Allāh’s gatherings attracted many local notables and Iranian pilgrims, lending him greater influence in Iran as well as in Baghdad.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q6',
          text: 'From 1866 Bahāʾ-Allāh began addressing a series of letters to world leaders, announcing his advent as the promised one of all religions.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q7',
          text: 'In 1868 he wrote a long letter (Lawḥ-e solṭān) to Nāṣer-al-Dīn Shah, saying Babis under his leadership were not militant, and requesting an end to their persecution in Iran. The shah had Bahāʾ-Allāh’s emissary bearing this letter tortured and killed.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q8',
          text: 'Bahāʾ-Allāh was imprisoned in the citadel for over two years, where some of his followers died from the unsanitary conditions.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q9',
          text: 'Around 1873 Bahāʾ-Allāh in ʿAkkā set down a new book of law and ritual, the Ketāb-e aqdas, which he said derived from divine revelation, meant to replace both the Qurʾān and the Bayān',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q10',
          text: 'In 1877, however, the Pasha gave him permission to live in a mansion outside ʿAkkā, at Mazraʿa till 1879, then at Bahjī until his death in 1892.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'vahman-2010-yeksad-o-shast-sal-mobarezeh-ba-diyanat-e-bahai',
      perspective: 'iranian'
    }
  ]
})
