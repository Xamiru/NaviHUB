import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'third-battle-of-panipat-significance',
  about: ['event:third-battle-of-panipat'],
  topic: 'significance',
  positions: [
    {
      id: 'british-time',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'For several decades the Dorrānī empire was the dominating regional power. Its victory over the strong army of the Maratha confederation at Panipat (1174/1761) even played a decisive historical role, by giving the British enough time to consolidate the foothold they had gained in Bengal at the battle of Plassey (1170/1757).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      id: 'afghan-peak',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The victory at Panipat was the high point of Ahmad Shah\'s--and Afghan--power.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    },
    {
      id: 'upper-india',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In modern times, the plains of Panipat thrice formed the scene of decisive battles which sealed the fate of upper India—in 1526, when Bāber completely defeated the imperial forces; in 1556, when his grandson, Akbar, on the same battlefield, conquered Himu, the Hindu general of the Afghān Adil Shāh, thus a second time establishing the Mogul power; and finally, on the 7th of January 1761, when Ahmad Shāh Durāni shattered the Mahratta confederacy.',
          lang: 'en',
          cite: { source: 'britannica-1911-panipat', loc: { section: 'PANIPAT', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Panipat'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
