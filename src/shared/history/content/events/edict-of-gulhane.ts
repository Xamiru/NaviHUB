import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'edict-of-gulhane',
  names: [
    { text: 'Edict of Gülhane', lang: 'en', role: 'primary' },
    { text: 'Gülhane Hatt-ı Şerifi', lang: 'tr', role: 'native' },
    {
      text: 'Rescript of Gülhane',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'rescript-of-gulhane-1839-english',
          loc: { section: 'The Rescript of Gülhane', para: '1' }
        }
      ]
    },
    {
      text: 'Tanzimāt, or Hatt-i-Sherīf of Gulhané',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1839-11-03' },
        cites: [
          {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'state', name: 'Ottoman Empire' }
        ]
      },
      {
        value: { d: '1839-11-15' },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (1911)' }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'rescript-of-gulhane-1839-english',
          loc: { section: 'The Rescript of Gülhane', para: '27' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:ottoman-sack-of-karbala-1843',
      rel: 'related',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
      ]
    },
    { ref: 'event:ottoman-constitution-of-1876', rel: 'related' }
  ],
  polities: [
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      name: 'Abd-ul-Mejid',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/TanzimatFermani.png',
    page: 'https://commons.wikimedia.org/wiki/File:TanzimatFermani.png',
    credit: { institution: 'Mufassal Osmanlı Tarihi' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'It was therefore no sudden revolution when, on the 15th of November 1839 Abd-ul-Mejid signalized his accession by promulgating the Tanzimāt, or Hatt-i-Sherīf of Gulhané, a decree abolishing the arbitrary and unlimited power hitherto exercised by the state and its officials, laying down the doctrine of the perfect equality of all Ottoman subjects of whatever race or creed, and providing for the regular, orderly and legal government of the country and the security of life, property and honour for all its inhabitants.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The destruction of the Janissaries and the suppression of the quasi-independent power of the dérébeys had removed the worst disturbing elements; the government had been centralized; a series of enactments had endeavoured to secure economy in the administration, to curb the abuses of official power, and ensure the impartiality of justice; and the sultan had even expressed his personal belief in the principle of the equality of all, Mussulman and non-Mussulman, before the law.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q3',
          text: 'In the last one hundred and fifty years a succession of accidents and divers causes have arisen which have brought about a disregard for the sacred code of laws and the regulations flowing therefrom, and the former strength and prosperity have changed into weakness and poverty; an empire in fact loses all its stability so soon as it ceases to observe its laws.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: 'These institutions must be principally carried out under three heads, which are:',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        },
        {
          id: 'q5',
          text: '1. The guarantees insuring to our subjects perfect security for life, honor, and fortune.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        },
        {
          id: 'q6',
          text: '2. A regular system of assessing and levying taxes.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        },
        {
          id: 'q7',
          text: '3. An equally regular system for the levying of troops and the duration of their service.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        },
        {
          id: 'q8',
          text: 'From henceforth, therefore, the cause of every accused person shall be publicly judged, as the divine law requires, after inquiry and examination, and so long as a regular judgment shall not have been pronounced, no one can secretly or publicly put another to death by poison or in any other manner.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        },
        {
          id: 'q9',
          text: 'These imperial concessions shall extend to all our subjects, of whatever religion or sect they may be; they shall enjoy them without exception.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        },
        {
          id: 'q10',
          text: 'a rigorous law shall be passed against the traffic of favoritism and bribery (rüşvet), which the Divine law reprobates, and which is one of the principal causes of the decay of the empire.',
          lang: 'en',
          cite: {
            source: 'rescript-of-gulhane-1839-english',
            loc: { section: 'The Rescript of Gülhane', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://anayasa.gen.tr/gulhane.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'Yet the feelings of dismay and even ridicule with which this proclamation was received by the Mussulmans in many parts of the country show how great a change it instituted, and how strong was the opposition which it encountered among the ruling race.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q12',
          text: 'But the wars with Russia and other Christian powers, and the different risings of the Greeks and Servians, helped to stimulate the feelings of animosity and contempt entertained towards them by the ruling race; and the promulgation of the Tanzimāt undoubtedly heralded for the subject nationalities the dawn of a new era.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1423' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q13',
          text: 'In 1843, the new Ottoman governor, Najib Pāšā, was determined to subdue Karbala as part of the centralizing reform (ṭanẓimāt) policy.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'tanor-2020-osmanli-turk-anayasal-gelismeleri', perspective: 'turkish' }
  ]
})
