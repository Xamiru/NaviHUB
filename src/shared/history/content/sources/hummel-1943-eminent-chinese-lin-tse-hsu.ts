import { defineSource } from '../../schema'

export default defineSource({
  id: 'hummel-1943-eminent-chinese-lin-tse-hsu',
  type: 'book',
  title: 'Lin Tsê-hsü',
  lang: 'en',
  contributors: [
    { name: 'Tu Lien-chê', role: 'author' },
    { name: 'Arthur W. Hummel', role: 'editor' }
  ],
  container: 'Eminent Chinese of the Ch\'ing Period (1644-1912)',
  volume: '1',
  publisher: 'United States Government Printing Office',
  place: 'Washington',
  date: '1943',
  url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC',
  accessed: '2026-10-08',
  license: { id: 'public-domain' }
})
