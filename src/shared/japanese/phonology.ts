export interface PhonologyExample {
  jp: string
  reading: string
  morae: string[]
  note: string
}

export interface PhonologyQuestion {
  prompt: string
  options: string[]
  correct: number
  explain: string
}

export interface PhonologyUnit {
  id: string
  title: string
  focus: string
  lesson: string[]
  examples: PhonologyExample[]
  questions: PhonologyQuestion[]
  practice: string
}

export const PHONOLOGY_UNITS: PhonologyUnit[] = [
  {
    id: 'mora',
    title: 'Mora timing',
    focus: 'Hear Japanese as equal timing units rather than English-style stressed syllables.',
    lesson: [
      'A mora is the basic timing beat. A simple kana is usually one mora; a contracted pair such as きょ is one mora, not two.',
      'Keep each beat approximately even. Do not crush unstressed material or stretch a word merely because one syllable feels important.'
    ],
    examples: [
      { jp: '猫', reading: 'ねこ', morae: ['ね', 'こ'], note: 'Two even beats.' },
      { jp: '今日', reading: 'きょう', morae: ['きょ', 'う'], note: 'きょ is one beat; the long vowel owns the second.' },
      { jp: '病院', reading: 'びょういん', morae: ['びょ', 'う', 'い', 'ん'], note: 'Four beats, despite two written kanji.' }
    ],
    questions: [
      { prompt: 'How many morae are in きょう?', options: ['1', '2', '3', '4'], correct: 1, explain: 'きょ + う = two morae.' },
      { prompt: 'Which division matches びょういん?', options: ['びょ・う・い・ん', 'び・ょ・う・いん', 'びょう・いん', 'び・ょう・い・ん'], correct: 0, explain: 'Small ょ joins the preceding kana; う and ん each keep a beat.' },
      { prompt: 'Which rhythm is the safer default?', options: ['One even beat per mora', 'One strong beat per word', 'Stress the written kanji', 'Reduce every final vowel'], correct: 0, explain: 'Japanese timing is organized around morae, not English lexical stress.' }
    ],
    practice: 'Tap the desk once per displayed mora, then say the word without changing the spacing.'
  },
  {
    id: 'long-vowels',
    title: 'Long vowels',
    focus: 'Preserve the extra beat that distinguishes おばさん from おばあさん.',
    lesson: [
      'A long vowel is not decorative spelling. It occupies an additional mora and can change the word.',
      'In hiragana, おう and えい are often pronounced as long お and え. Katakana usually marks length with ー.'
    ],
    examples: [
      { jp: 'おばさん', reading: 'おばさん', morae: ['お', 'ば', 'さ', 'ん'], note: 'Aunt; four beats.' },
      { jp: 'おばあさん', reading: 'おばあさん', morae: ['お', 'ば', 'あ', 'さ', 'ん'], note: 'Grandmother; five beats.' },
      { jp: '高校', reading: 'こうこう', morae: ['こ', 'う', 'こ', 'う'], note: 'Both long vowels keep their own beat.' }
    ],
    questions: [
      { prompt: 'Which word means grandmother?', options: ['おばさん', 'おばあさん', 'おじさん', 'おかあさん'], correct: 1, explain: 'The additional あ is meaning-bearing.' },
      { prompt: 'How many morae are in こうこう?', options: ['2', '3', '4', '5'], correct: 2, explain: 'こ・う・こ・う.' },
      { prompt: 'What does ー do in ケーキ?', options: ['Lengthens the preceding vowel', 'Doubles the next consonant', 'Marks pitch fall', 'Makes the word polite'], correct: 0, explain: 'The long-vowel mark adds a timing beat to ケ.' }
    ],
    practice: 'Contrast each short/long pair while tapping. If the long form does not take longer, repeat it.'
  },
  {
    id: 'sokuon',
    title: 'Small っ and consonant closure',
    focus: 'Hold one silent beat before the following consonant instead of inserting a vowel.',
    lesson: [
      'Small っ occupies one mora. It closes or holds the following consonant: きて and きって are different rhythms.',
      'Do not pronounce っ as つ. Let the mouth prepare the next consonant and keep the beat silent.'
    ],
    examples: [
      { jp: '切手', reading: 'きって', morae: ['き', 'っ', 'て'], note: 'Prepare the t during the silent middle beat.' },
      { jp: '学校', reading: 'がっこう', morae: ['が', 'っ', 'こ', 'う'], note: 'Four beats: closure and long vowel both count.' },
      { jp: '作家', reading: 'さっか', morae: ['さ', 'っ', 'か'], note: 'Hold the k closure for one beat.' }
    ],
    questions: [
      { prompt: 'Which division matches がっこう?', options: ['が・っ・こ・う', 'がっ・こう', 'が・つ・こ・う', 'が・こ・う'], correct: 0, explain: 'Small っ and the long vowel each occupy a mora.' },
      { prompt: 'What should happen during っ in きって?', options: ['Prepare and hold the next consonant', 'Say a full つ', 'Lengthen き', 'Raise pitch'], correct: 0, explain: 'The closure is timed but normally has no vowel.' },
      { prompt: 'Which pair differs by a small っ?', options: ['きて / きって', 'ここ / こうこう', 'はし / ばし', 'あめ / あめ'], correct: 0, explain: 'きって contains the additional closure mora.' }
    ],
    practice: 'Say the word once with taps only, making the っ tap silent, then add the voice back.'
  },
  {
    id: 'moraic-n',
    title: 'The ん mora',
    focus: 'Give ん its own beat while allowing its mouth position to anticipate the next sound.',
    lesson: [
      'ん always occupies one mora, but its exact sound changes with its neighbor. Before p, b or m it often sounds m-like; before k or g it moves toward the back of the mouth.',
      'The spelling remains ん. The variation is normal coarticulation, not a different word.'
    ],
    examples: [
      { jp: '新聞', reading: 'しんぶん', morae: ['し', 'ん', 'ぶ', 'ん'], note: 'The first ん anticipates b and may sound m-like.' },
      { jp: '漫画', reading: 'まんが', morae: ['ま', 'ん', 'が'], note: 'The tongue moves toward the back before g.' },
      { jp: '原因', reading: 'げんいん', morae: ['げ', 'ん', 'い', 'ん'], note: 'Keep both ん beats distinct.' }
    ],
    questions: [
      { prompt: 'How many morae are in まんが?', options: ['2', '3', '4', '5'], correct: 1, explain: 'ま・ん・が.' },
      { prompt: 'Why can ん sound slightly m-like in しんぶん?', options: ['The mouth anticipates b', 'It is spelled む', 'The word is casual', 'Pitch changes the consonant'], correct: 0, explain: 'The following lip consonant influences the articulation.' },
      { prompt: 'Should ん lose its timing beat when its sound changes?', options: ['No, it remains one mora', 'Yes, before every consonant', 'Only in kanji words', 'Only at high speed'], correct: 0, explain: 'Its articulation varies; its mora timing does not disappear.' }
    ],
    practice: 'Hold ん for one tap in each example, then repeat naturally without deleting the beat.'
  },
  {
    id: 'devoicing',
    title: 'Devoiced vowels',
    focus: 'Recognize quiet い and う without treating them as missing kana.',
    lesson: [
      'High vowels い and う often become very quiet between voiceless consonants or at the end of a phrase, especially in standard speech.',
      'The mora is still present. Do not force a heavy vowel, and do not delete the consonant timing around it.'
    ],
    examples: [
      { jp: '好き', reading: 'すき', morae: ['す', 'き'], note: 'The う-like vowel in す may be barely voiced.' },
      { jp: 'です', reading: 'です', morae: ['で', 'す'], note: 'Phrase-final す is often heard as a light s.' },
      { jp: '聞く', reading: 'きく', morae: ['き', 'く'], note: 'The first or final high vowel may weaken with context.' }
    ],
    questions: [
      { prompt: 'If the vowel in す is devoiced, what remains true?', options: ['The mora still occupies its timing position', 'The kana changes to っ', 'The word loses a syllable in writing', 'The pitch pattern is erased'], correct: 0, explain: 'Devoicing reduces vocal-fold vibration, not the structural mora.' },
      { prompt: 'Which vowels most often devoice in standard Japanese?', options: ['い and う', 'あ and お', 'え and お', 'あ and え'], correct: 0, explain: 'The high vowels い and う are the common targets.' },
      { prompt: 'What is the safer production goal?', options: ['A light vowel in the right timing slot', 'A strongly stressed vowel', 'Delete the whole kana', 'Replace it with ん'], correct: 0, explain: 'Keep the rhythm and allow the vowel to become light.' }
    ],
    practice: 'Alternate a careful and a natural-speed version. Preserve the beat while making the high vowel lighter.'
  },
  {
    id: 'particles',
    title: 'Particle pronunciations',
    focus: 'Separate a kana’s ordinary reading from its grammatical particle reading.',
    lesson: [
      'The topic particle は is pronounced わ, the direction particle へ is pronounced え, and the object particle を is normally pronounced お.',
      'These readings apply to the grammatical particles. The same kana inside an ordinary word keeps its normal reading.'
    ],
    examples: [
      { jp: '私は学校へ行く。', reading: 'わたしはがっこうへいく。', morae: ['わ', 'た', 'し', 'わ', 'が', 'っ', 'こ', 'う', 'え', 'い', 'く'], note: 'The written particles は and へ are heard as わ and え.' },
      { jp: '本を読む。', reading: 'ほんをよむ。', morae: ['ほ', 'ん', 'お', 'よ', 'む'], note: 'Object を is normally pronounced お.' },
      { jp: '母は花を買う。', reading: 'ははははなをかう。', morae: ['は', 'は', 'わ', 'は', 'な', 'お', 'か', 'う'], note: 'Word-internal は stays は; the topic particle becomes わ.' }
    ],
    questions: [
      { prompt: 'How is topic-particle は pronounced?', options: ['わ', 'は', 'ば', 'ぱ'], correct: 0, explain: 'The spelling stays は; the particle reading is わ.' },
      { prompt: 'How is direction-particle へ pronounced?', options: ['え', 'へ', 'い', 'お'], correct: 0, explain: 'As a grammatical direction particle, へ is read え.' },
      { prompt: 'In 母は, which reading is correct?', options: ['ははわ', 'わわわ', 'ははは', 'わはわ'], correct: 0, explain: '母 is はは; the following topic particle は is わ.' }
    ],
    practice: 'Read the example slowly, point to each particle, then repeat it without pausing before the particle.'
  },
  {
    id: 'pitch',
    title: 'Pitch, not stress',
    focus: 'Use pitch movement without making the accented mora louder or heavier.',
    lesson: [
      'Tokyo Japanese distinguishes words partly through high and low pitch. This is not English stress: the accented location does not need extra volume, length or force.',
      'Learn pitch in phrases where the following particle makes a final drop audible. Use the dedicated Pitch page for word-specific patterns.'
    ],
    examples: [
      { jp: '雨が', reading: 'あめが', morae: ['あ', 'め', 'が'], note: 'Pitch movement distinguishes it from other あめ patterns.' },
      { jp: '橋を', reading: 'はしを', morae: ['は', 'し', 'お'], note: 'The particle helps expose where the fall occurs.' },
      { jp: '日本語', reading: 'にほんご', morae: ['に', 'ほ', 'ん', 'ご'], note: 'Keep the four morae even while the pitch changes.' }
    ],
    questions: [
      { prompt: 'What should a pitch accent change?', options: ['Pitch height', 'Mora length', 'Volume and force', 'Written kana'], correct: 0, explain: 'Pitch accent is primarily a pattern of high and low pitch.' },
      { prompt: 'Why practice a word with a following particle?', options: ['It can reveal a final pitch drop', 'It makes every word polite', 'It removes devoicing', 'It changes the dictionary form'], correct: 0, explain: 'Some patterns differ most clearly at the word boundary.' },
      { prompt: 'Which page provides word-specific contour practice?', options: ['Pitch accent', 'Kanji by parts', 'Comprehension', 'Shiritori'], correct: 0, explain: 'The Pitch page uses installed accent data and recorded takes.' }
    ],
    practice: 'Say the phrase once as flat rhythm, then add only the high/low movement without adding force.'
  },
  {
    id: 'connected',
    title: 'Connected speech',
    focus: 'Keep recognizing familiar forms when boundaries soften in natural dialogue.',
    lesson: [
      'Natural speech links particles and auxiliaries to what comes before them. Common contractions such as ている becoming てる and のだ becoming んだ change the surface without changing the underlying grammar.',
      'Do not imitate speed first. Preserve mora timing and phrase shape, then shorten only what the model actually shortens.'
    ],
    examples: [
      { jp: '何してるの？', reading: 'なにしてるの？', morae: ['な', 'に', 'し', 'て', 'る', 'の'], note: 'している contracts to してる.' },
      { jp: '分かんない。', reading: 'わかんない。', morae: ['わ', 'か', 'ん', 'な', 'い'], note: 'Casual 分からない contracts in speech.' },
      { jp: '行かなきゃ。', reading: 'いかなきゃ。', morae: ['い', 'か', 'な', 'きゃ'], note: '行かなければ contracts to 行かなきゃ.' }
    ],
    questions: [
      { prompt: 'What is the full form behind してる?', options: ['している', 'してある', 'しておく', 'してしまう'], correct: 0, explain: 'ている commonly contracts by losing い.' },
      { prompt: 'What should come before trying to sound fast?', options: ['Stable timing and phrase shape', 'Deleting every い and う', 'Raising the final mora', 'Replacing particles'], correct: 0, explain: 'Speed is a result of control, not the first target.' },
      { prompt: 'Which full form underlies 行かなきゃ?', options: ['行かなければ', '行かなくても', '行かないで', '行かなかった'], correct: 0, explain: 'なきゃ is a casual contraction of なければ.' }
    ],
    practice: 'Shadow one line at half speed, then at model speed. Record both and compare the boundaries, not only the pitch.'
  }
]

export function phonologyUnit(id: string): PhonologyUnit | undefined {
  return PHONOLOGY_UNITS.find((unit) => unit.id === id)
}
