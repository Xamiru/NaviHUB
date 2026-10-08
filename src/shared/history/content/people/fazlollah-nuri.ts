import { definePerson } from '../../schema'

export default definePerson({
  id: 'fazlollah-nuri',
  names: [
    { text: 'Fazlollah Nuri', lang: 'en', role: 'primary' },
    { text: 'فضل‌الله نوری', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1843-11-24' },
        cites: [
          { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1909-07-07' },
        cites: [
          { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '1' } }
        ]
      },
      {
        value: { d: '1909-07-31' },
        cites: [
          { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '16' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '16' } }
    ]
  },
  regions: ['iran'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'a prominent jurist who campaigned in the Constitutional Revolution of 1906-1909 for constitutionalism according to the šariʿa (canonical laws of Islam), and in its default, preferred absolutism to secularism.',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'For Nūrī and his supporters mašrūṭa-ye mašrūʿa meant a constitutional system in which the mojtaheds, as the sole legal authority, would codify the Šarīʿa in order to broaden its applicability and supplant the ʿorf in the sphere of public law.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q3',
          text: 'The strongest argument brought against the Majles was that it had no legitimate basis in šarʿ law, and that its establishment would therefore undermine the šariʿa.',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'After Moḥammad-ʿAli Shah abdicated in July 1909, he took refuge in the Russian Legation, but Shaikh Fażl-Allāh, declined the offer of taking refuge in an embassy, unlike other supporters of the shah (Malekzādeh, VI, p. 117). He was arrested, tried on 31 July 1909 (13 Rajab 1327), and publicly hung in Tupḵāneh Square in Tehran.',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/AyatFazlollahNouriAndAyatBehbahani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AyatFazlollahNouriAndAyatBehbahani.jpg',
    credit: { institution: 'Internet Archive, Digital Library of India' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'safai-1963-rahbaran-e-mashruteh', perspective: 'iranian' },
    { source: 'kasravi-1940-tarikh-e-mashruteh-ye-iran', perspective: 'iranian' }
  ]
})
