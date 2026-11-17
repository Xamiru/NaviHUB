// Authored kana lessons: one unit per basic row of hiragana and of katakana,
// plus units for dakuten, combinations, long vowels, small っ/ッ and the
// katakana-only sounds. The Learn tab of the kana page (JapaneseKanaPage)
// renders them; "Drill this row" hands `rows` to the existing kana drill, so
// row keys must match @shared/kanaRows.ts. Units are in teaching order: every
// practice word uses only kana taught by its own unit or an earlier one
// (tests/kanaLessons.test.ts enforces that, the coverage of every drill row and
// the romaji agreeing with the drill).

export type KanaScript = 'hiragana' | 'katakana' | 'both'

export interface KanaLessonChar {
  kana: string
  romaji: string
  /** Memory aid for the shape. Required on basic-row units. */
  hook?: string
}

export interface KanaLookAlike {
  kana: string[]
  tell: string
}

export interface KanaLessonWord {
  word: string
  romaji: string
  meaning: string
}

export interface KanaUnit {
  key: string
  script: KanaScript
  title: string
  /** The kana shown on the unit's card. */
  label: string
  /** Drill rows (keys from @shared/kanaRows.ts) this unit teaches; empty = no drill. */
  rows: string[]
  intro: string
  chars: KanaLessonChar[]
  lookAlikes: KanaLookAlike[]
  words: KanaLessonWord[]
}

export const KANA_SCRIPT_GROUPS: { script: KanaScript; title: string }[] = [
  { script: 'hiragana', title: 'Hiragana' },
  { script: 'both', title: 'Both scripts' },
  { script: 'katakana', title: 'Katakana' }
]

const c = (kana: string, romaji: string, hook?: string): KanaLessonChar =>
  hook ? { kana, romaji, hook } : { kana, romaji }
const w = (word: string, romaji: string, meaning: string): KanaLessonWord => ({
  word,
  romaji,
  meaning
})

export const KANA_UNITS: KanaUnit[] = [
  // ---- hiragana ----
  {
    key: 'a',
    script: 'hiragana',
    title: 'Hiragana a row',
    label: 'あいうえお',
    rows: ['a'],
    intro:
      'The five vowels. Every other kana is a consonant plus one of these, so their sounds never change: a as in father, i as in machine, u as in food without rounding the lips, e as in pet, o as in old but shorter.',
    chars: [
      c('あ', 'a', 'A cross with a big loop swinging under it; find the small "a" curled inside the loop.'),
      c('い', 'i', 'Two short strokes side by side, like two eels: "ii".'),
      c('う', 'u', 'A short dash over a curve, like someone bent over a sore stomach saying "ooh".'),
      c('え', 'e', 'A dash over a zigzag, like a bird with a crest on its head: "eh?"'),
      c('お', 'o', 'Like あ but with an extra dash flying off the top right: "oh, it has a dot".')
    ],
    lookAlikes: [
      {
        kana: ['あ', 'お'],
        tell: 'お has a separate dot at the top right and its curl sits to the left of the vertical stroke; あ has no dot and its loop wraps around the right.'
      }
    ],
    words: [
      w('あい', 'ai', 'love'),
      w('あう', 'au', 'to meet'),
      w('いう', 'iu', 'to say'),
      w('うえ', 'ue', 'above'),
      w('いえ', 'ie', 'house'),
      w('あおい', 'aoi', 'blue'),
      w('おおい', 'ooi', 'many')
    ]
  },
  {
    key: 'ka',
    script: 'hiragana',
    title: 'Hiragana ka row',
    label: 'かきくけこ',
    rows: ['ka'],
    intro: 'k plus each vowel. The sounds are as in English: ka, ki, ku, ke, ko.',
    chars: [
      c('か', 'ka', 'A strong arm flexing with a small dash beside it, like a karate chop: "ka!"'),
      c('き', 'ki', 'A key: two crossbars on a shaft, with the teeth curling out at the bottom.'),
      c('く', 'ku', 'An open beak going "ku ku", like a cuckoo.'),
      c('け', 'ke', 'A keg standing beside a tap: one upright, then a crossbar with a long stroke.'),
      c('こ', 'ko', 'Two short lines, like two coins lying flat.')
    ],
    lookAlikes: [
      {
        kana: ['き', 'さ'],
        tell: 'き has two crossbars; さ has only one. Both end in a curl at the bottom.'
      },
      {
        kana: ['く', 'へ'],
        tell: 'く opens to the right like a beak; へ is a low hill opening downward.'
      }
    ],
    words: [
      w('かお', 'kao', 'face'),
      w('あき', 'aki', 'autumn'),
      w('いけ', 'ike', 'pond'),
      w('こえ', 'koe', 'voice'),
      w('えき', 'eki', 'station'),
      w('かく', 'kaku', 'to write'),
      w('きく', 'kiku', 'to listen'),
      w('あかい', 'akai', 'red')
    ]
  },
  {
    key: 'sa',
    script: 'hiragana',
    title: 'Hiragana sa row',
    label: 'さしすせそ',
    rows: ['sa'],
    intro: 's plus each vowel, with one exception: し is "shi", never "si".',
    chars: [
      c('さ', 'sa', 'A cross with a curl under it: one crossbar, like a single sail on a mast.'),
      c('し', 'shi', 'A fishing hook hanging down, like a shepherd\'s crook: "shi".'),
      c('す', 'su', 'A cross whose stroke loops once before dropping, like a swing seat.'),
      c('せ', 'se', 'A crossbar with two posts, the left one bending into a floor, like a seat.'),
      c('そ', 'so', 'A zigzag thread pulled down, like sewing: "so".')
    ],
    lookAlikes: [
      {
        kana: ['さ', 'ち'],
        tell: 'They mirror each other at the bottom: さ\'s lower stroke sweeps right and ends pointing up-right; ち bulges right, then its tail hooks back to the left, like a 5.'
      },
      {
        kana: ['し', 'つ'],
        tell: 'し drops down from the top and hooks up; つ starts on the left and arches over to the right.'
      }
    ],
    words: [
      w('すし', 'sushi', 'sushi'),
      w('あさ', 'asa', 'morning'),
      w('かさ', 'kasa', 'umbrella'),
      w('しお', 'shio', 'salt'),
      w('いす', 'isu', 'chair'),
      w('せかい', 'sekai', 'world'),
      w('うそ', 'uso', 'lie, untruth'),
      w('おかし', 'okashi', 'sweets')
    ]
  },
  {
    key: 'ta',
    script: 'hiragana',
    title: 'Hiragana ta row',
    label: 'たちつてと',
    rows: ['ta'],
    intro: 'Two exceptions here: ち is "chi" and つ is "tsu". The rest are ta, te, to.',
    chars: [
      c('た', 'ta', 'A t-shaped cross on the left with こ beside it: "t" plus "a".'),
      c('ち', 'chi', 'A cross with a big bulge to the right, like a round pompom held out to the side.'),
      c('つ', 'tsu', 'One wave arching over: a tsunami about to break.'),
      c('て', 'te', 'A bar with a long tail swinging down, like an arm held out at a table.'),
      c('と', 'to', 'A short slanted stroke resting on a curve, like a toe with a splinter in it.')
    ],
    lookAlikes: [
      {
        kana: ['さ', 'ち'],
        tell: 'ち bulges right and its tail hooks back to the left; さ\'s lower stroke sweeps right and ends pointing up-right.'
      },
      {
        kana: ['た', 'な'],
        tell: 'た has こ on its right; な has a small loop on its right instead.'
      }
    ],
    words: [
      w('たかい', 'takai', 'tall, expensive'),
      w('くち', 'kuchi', 'mouth'),
      w('ちかい', 'chikai', 'near'),
      w('つくえ', 'tsukue', 'desk'),
      w('そと', 'soto', 'outside'),
      w('て', 'te', 'hand'),
      w('した', 'shita', 'below'),
      w('たこ', 'tako', 'octopus')
    ]
  },
  {
    key: 'na',
    script: 'hiragana',
    title: 'Hiragana na row',
    label: 'なにぬねの',
    rows: ['na'],
    intro: 'n plus each vowel: na, ni, nu, ne, no.',
    chars: [
      c('な', 'na', 'A cross with a little knot tied on the right: say it like "nap".'),
      c('に', 'ni', 'One upright and two short bars, like a knee beside a step.'),
      c('ぬ', 'nu', 'Crossed strokes ending in a small loop, like a bowl of noodles with chopsticks.'),
      c('ね', 'ne', 'An upright with a looping body ending in a curl, like a cat\'s curled tail; neko means cat.'),
      c('の', 'no', 'One swirl, like a "no entry" sign drawn in a single stroke.')
    ],
    lookAlikes: [
      {
        kana: ['ぬ', 'ね'],
        tell: 'ね has a straight vertical stroke on the left; ぬ has two crossing diagonals and no vertical. Both end in a loop.'
      },
      {
        kana: ['に', 'こ'],
        tell: 'に has the extra upright on the left; こ is only the two short bars.'
      }
    ],
    words: [
      w('なつ', 'natsu', 'summer'),
      w('にく', 'niku', 'meat'),
      w('いぬ', 'inu', 'dog'),
      w('ねこ', 'neko', 'cat'),
      w('おかね', 'okane', 'money'),
      w('あなた', 'anata', 'you'),
      w('なに', 'nani', 'what'),
      w('きのこ', 'kinoko', 'mushroom')
    ]
  },
  {
    key: 'ha',
    script: 'hiragana',
    title: 'Hiragana ha row',
    label: 'はひふへほ',
    rows: ['ha'],
    intro:
      'h plus each vowel, but ふ is "fu", a soft sound made with both lips. As a particle は is read "wa" and へ is read "e".',
    chars: [
      c('は', 'ha', 'An upright beside a cross with a loop at the bottom: someone laughing "ha".'),
      c('ひ', 'hi', 'A wide grin: a smiling mouth saying "hee hee".'),
      c('ふ', 'fu', 'Four scattered strokes, like Mount Fuji with clouds around it.'),
      c('へ', 'he', 'A low hill: "hey, a hill".'),
      c('ほ', 'ho', 'Like は with an extra bar on top, like a hotel with a roof.')
    ],
    lookAlikes: [
      {
        kana: ['は', 'ほ'],
        tell: 'ほ has an extra short bar above its crossbar; は has just one crossbar.'
      },
      {
        kana: ['け', 'は'],
        tell: 'け ends in a long tail sweeping down; は ends in a loop.'
      }
    ],
    words: [
      w('はな', 'hana', 'flower; nose'),
      w('ひと', 'hito', 'person'),
      w('ふね', 'fune', 'ship'),
      w('へた', 'heta', 'unskilled'),
      w('ほし', 'hoshi', 'star'),
      w('はし', 'hashi', 'bridge; chopsticks'),
      w('ふたつ', 'futatsu', 'two (things)'),
      w('ひこうき', 'hikouki', 'airplane')
    ]
  },
  {
    key: 'ma',
    script: 'hiragana',
    title: 'Hiragana ma row',
    label: 'まみむめも',
    rows: ['ma'],
    intro: 'm plus each vowel: ma, mi, mu, me, mo.',
    chars: [
      c('ま', 'ma', 'Like ほ\'s right side alone: two bars on a post with a loop, a mast with flags.'),
      c('み', 'mi', 'A loop with a tail and a short stroke crossing it, like the number 21: "me at 21".'),
      c('む', 'mu', 'A cross with a loop and a dash, like a cow\'s face going "moo".'),
      c('め', 'me', 'Two crossing strokes with a loop, like an eye; me means eye.'),
      c('も', 'mo', 'A hook with two bars through it, like a fishing hook catching more fish.')
    ],
    lookAlikes: [
      {
        kana: ['ぬ', 'め', 'ね'],
        tell: 'ぬ and め are two crossing diagonals: ぬ ends in a small closed loop, め ends without one. ね has a straight vertical on the left instead of crossing diagonals, and ends in a loop.'
      },
      {
        kana: ['ほ', 'ま'],
        tell: 'ほ has a separate upright on the left; ま has no upright on the left, just two bars on one post that ends in a loop.'
      },
      {
        kana: ['ま', 'も'],
        tell: 'ま\'s vertical starts above the bars and ends in a loop; も\'s hook starts above and curves up to the right with no loop.'
      }
    ],
    words: [
      w('まち', 'machi', 'town'),
      w('みみ', 'mimi', 'ear'),
      w('むし', 'mushi', 'insect'),
      w('め', 'me', 'eye'),
      w('もの', 'mono', 'thing'),
      w('うみ', 'umi', 'sea'),
      w('あたま', 'atama', 'head'),
      w('くも', 'kumo', 'cloud')
    ]
  },
  {
    key: 'ya',
    script: 'hiragana',
    title: 'Hiragana ya row',
    label: 'やゆよ',
    rows: ['ya'],
    intro: 'Only three kana: ya, yu, yo. Small versions of them form the combinations later.',
    chars: [
      c('や', 'ya', 'A yak\'s head: a curved horn with two strokes.'),
      c('ゆ', 'yu', 'A fish swimming around a hook: "you" caught it.'),
      c('よ', 'yo', 'A short bar on a post with a loop, like a yo-yo on a string.')
    ],
    lookAlikes: [
      {
        kana: ['ゆ', 'よ'],
        tell: 'ゆ is a wide loop with a vertical stroke through the middle; よ is a single post with one bar and a loop at the foot.'
      },
      {
        kana: ['よ', 'ま'],
        tell: 'よ has one crossbar; ま has two.'
      }
    ],
    words: [
      w('やま', 'yama', 'mountain'),
      w('ゆき', 'yuki', 'snow'),
      w('ゆめ', 'yume', 'dream'),
      w('よむ', 'yomu', 'to read'),
      w('へや', 'heya', 'room'),
      w('おゆ', 'oyu', 'hot water'),
      w('ふゆ', 'fuyu', 'winter'),
      w('やすみ', 'yasumi', 'rest, holiday')
    ]
  },
  {
    key: 'ra',
    script: 'hiragana',
    title: 'Hiragana ra row',
    label: 'らりるれろ',
    rows: ['ra'],
    intro:
      'The Japanese r is a light tap of the tongue, between an English r, l and d: ra, ri, ru, re, ro.',
    chars: [
      c('ら', 'ra', 'A dash over a curve opening left, like a rabbit\'s ear above its body.'),
      c('り', 'ri', 'Two strokes hanging down, the right one long, like reeds by a river.'),
      c('る', 'ru', 'A zigzag that ends in a closed loop, like a route that loops back.'),
      c('れ', 're', 'An upright with a stroke that ends kicking out to the right, like a leg ready to run a race.'),
      c('ろ', 'ro', 'The same zigzag as る but with an open end, like an open road.')
    ],
    lookAlikes: [
      {
        kana: ['る', 'ろ'],
        tell: 'る ends in a small closed loop; ろ ends open with no loop.'
      },
      {
        kana: ['い', 'り'],
        tell: 'り\'s right stroke is far longer than its left and the two are often joined; い has two short strokes of similar length.'
      },
      {
        kana: ['ら', 'う'],
        tell: 'ら\'s second stroke starts with a short downward line on the left; う\'s starts as a straight bar across.'
      }
    ],
    words: [
      w('さくら', 'sakura', 'cherry blossom'),
      w('そら', 'sora', 'sky'),
      w('とり', 'tori', 'bird'),
      w('くるま', 'kuruma', 'car'),
      w('いろ', 'iro', 'color'),
      w('れきし', 'rekishi', 'history'),
      w('よる', 'yoru', 'night'),
      w('ふろ', 'furo', 'bath')
    ]
  },
  {
    key: 'wa',
    script: 'hiragana',
    title: 'Hiragana wa row',
    label: 'わをん',
    rows: ['wa'],
    intro:
      'わ is "wa". を sounds like お and is used only as the object particle. ん is the only kana with no vowel; it is a full beat of its own.',
    chars: [
      c('わ', 'wa', 'An upright with a body that curves around and ends turned in, like a swan\'s neck: "wa".'),
      c('を', 'wo', 'A person with a bar across the chest and a cape blowing behind, falling over: "whoa".'),
      c('ん', 'n', 'One stroke like a lowercase n written fast.')
    ],
    lookAlikes: [
      {
        kana: ['わ', 'れ', 'ね'],
        tell: 'All start with an upright and a zigzag. わ ends in a curve turned inward, れ ends kicking out to the right, ね ends in a small loop.'
      },
      {
        kana: ['ん', 'そ'],
        tell: 'ん is one smooth stroke with no top bar; そ starts with a zigzag at the top.'
      }
    ],
    words: [
      w('わたし', 'watashi', 'I, me'),
      w('かわ', 'kawa', 'river'),
      w('ほん', 'hon', 'book'),
      w('みかん', 'mikan', 'mandarin orange'),
      w('にわ', 'niwa', 'garden'),
      w('てんき', 'tenki', 'weather'),
      w('おんな', 'onna', 'woman'),
      w('ほんをよむ', 'hon o yomu', 'to read a book (を marks the object)')
    ]
  },
  {
    key: 'dakuten',
    script: 'hiragana',
    title: 'Hiragana dakuten and handakuten',
    label: 'が ざ だ ば ぱ',
    rows: ['ga', 'za', 'da', 'ba', 'pa'],
    intro:
      'Two small marks voice a consonant: the dakuten (two ticks) turns k into g, s into z, t into d and h into b. The handakuten (a small circle) turns h into p. じ is "ji". ぢ and づ sound the same as じ and ず and appear only in a few words, mostly when a sound repeats (つづく) or two words join.',
    chars: [
      c('が', 'ga'),
      c('ぎ', 'gi'),
      c('ぐ', 'gu'),
      c('げ', 'ge'),
      c('ご', 'go'),
      c('ざ', 'za'),
      c('じ', 'ji'),
      c('ず', 'zu'),
      c('ぜ', 'ze'),
      c('ぞ', 'zo'),
      c('だ', 'da'),
      c('ぢ', 'ji', 'ち with the two ticks; read like じ.'),
      c('づ', 'zu', 'つ with the two ticks; read like ず.'),
      c('で', 'de'),
      c('ど', 'do'),
      c('ば', 'ba'),
      c('び', 'bi'),
      c('ぶ', 'bu'),
      c('べ', 'be'),
      c('ぼ', 'bo'),
      c('ぱ', 'pa', 'The circle looks like puckered lips about to say "p".'),
      c('ぴ', 'pi'),
      c('ぷ', 'pu'),
      c('ぺ', 'pe'),
      c('ぽ', 'po')
    ],
    lookAlikes: [
      {
        kana: ['ば', 'ぱ'],
        tell: 'Two ticks make b; a small circle makes p. The circle is the only difference, so look at the top right.'
      },
      {
        kana: ['じ', 'ぢ'],
        tell: 'Same sound. じ is the usual spelling; ぢ appears in a few words such as はなぢ (nosebleed).'
      }
    ],
    words: [
      w('かぎ', 'kagi', 'key'),
      w('かばん', 'kaban', 'bag'),
      w('ごはん', 'gohan', 'rice, meal'),
      w('みず', 'mizu', 'water'),
      w('つづく', 'tsuzuku', 'to continue'),
      w('でんわ', 'denwa', 'telephone'),
      w('ともだち', 'tomodachi', 'friend'),
      w('えんぴつ', 'enpitsu', 'pencil')
    ]
  },
  {
    key: 'combos',
    script: 'hiragana',
    title: 'Hiragana combinations',
    label: 'きゃ しゃ ちゃ',
    rows: ['kya', 'sha', 'cha', 'nya', 'hya', 'mya', 'rya', 'gya', 'ja', 'bya', 'pya'],
    intro:
      'An i-row kana followed by a small ゃ, ゅ or ょ blends into one beat: き plus small ゃ is "kya", not "ki-ya". Compare the sizes: きや is two beats (ki-ya), きゃ is one.',
    chars: [
      c('きゃ', 'kya'),
      c('きゅ', 'kyu'),
      c('きょ', 'kyo'),
      c('しゃ', 'sha'),
      c('しゅ', 'shu'),
      c('しょ', 'sho'),
      c('ちゃ', 'cha'),
      c('ちゅ', 'chu'),
      c('ちょ', 'cho'),
      c('にゃ', 'nya'),
      c('にゅ', 'nyu'),
      c('にょ', 'nyo'),
      c('ひゃ', 'hya'),
      c('ひゅ', 'hyu'),
      c('ひょ', 'hyo'),
      c('みゃ', 'mya'),
      c('みゅ', 'myu'),
      c('みょ', 'myo'),
      c('りゃ', 'rya'),
      c('りゅ', 'ryu'),
      c('りょ', 'ryo'),
      c('ぎゃ', 'gya'),
      c('ぎゅ', 'gyu'),
      c('ぎょ', 'gyo'),
      c('じゃ', 'ja'),
      c('じゅ', 'ju'),
      c('じょ', 'jo'),
      c('びゃ', 'bya'),
      c('びゅ', 'byu'),
      c('びょ', 'byo'),
      c('ぴゃ', 'pya'),
      c('ぴゅ', 'pyu'),
      c('ぴょ', 'pyo')
    ],
    lookAlikes: [
      {
        kana: ['きや', 'きゃ'],
        tell: 'A full-size や is its own beat (ki-ya); the small ゃ sits low and merges (kya).'
      },
      {
        kana: ['びょういん', 'びよういん'],
        tell: 'びょういん (hospital) has a small ょ; びよういん (hair salon) has a full-size よ. Size changes the word.'
      }
    ],
    words: [
      w('おちゃ', 'ocha', 'tea'),
      w('いしゃ', 'isha', 'doctor'),
      w('きょう', 'kyou', 'today'),
      w('しゃしん', 'shashin', 'photograph'),
      w('りょこう', 'ryokou', 'trip'),
      w('ひゃく', 'hyaku', 'hundred'),
      w('じゅぎょう', 'jugyou', 'class, lesson'),
      w('でんしゃ', 'densha', 'train')
    ]
  },

  // ---- both scripts ----
  {
    key: 'long-vowels',
    script: 'both',
    title: 'Long vowels',
    label: 'おう えい ー',
    rows: [],
    intro:
      'A long vowel lasts two beats, and the length changes meaning: おばさん (aunt) and おばあさん (grandmother). Hiragana spells length with a vowel kana: add あ after an a sound, い after i, う after u. A long e is usually written えい (せんせい, read "sensee") and a long o usually おう (おとうさん, read "otoosan"). The word list below romanizes by spelling (sensei, otousan), so it shows these spellings rather than the sound. A few words use ええ or おお (おねえさん, おおきい). Katakana uses one mark instead: ー stretches the vowel before it, as in コーヒー (coffee). The mark runs across in horizontal text and down in vertical text.',
    chars: [
      c('ー', '(hold the vowel)', 'A plain dash: keep the previous vowel going for one more beat.')
    ],
    lookAlikes: [
      {
        kana: ['ー', '一'],
        tell: 'The long-vowel mark comes after a katakana sound and stretches it; 一 is the kanji for "one" and stands on its own.'
      },
      {
        kana: ['おう', 'おお'],
        tell: 'Both read as a long o. おう is the usual spelling; おお appears in a small set of words such as おおきい (big) and とおい (far).'
      }
    ],
    words: [
      w('おかあさん', 'okaasan', 'mother'),
      w('おにいさん', 'oniisan', 'older brother'),
      w('くうき', 'kuuki', 'air'),
      w('おねえさん', 'oneesan', 'older sister'),
      w('おとうさん', 'otousan', 'father'),
      w('せんせい', 'sensei', 'teacher'),
      w('えいが', 'eiga', 'movie'),
      w('おおきい', 'ookii', 'big')
    ]
  },
  {
    key: 'small-tsu',
    script: 'both',
    title: 'Small っ and ッ',
    label: 'っ ッ',
    rows: [],
    intro:
      'A small つ (っ in hiragana, ッ in katakana) is a one-beat pause: stop the breath for a moment, then say the next sound. In romaji it doubles the next consonant: きって is "kitte". Compare きて (come, two beats) with きって (stamp, three beats).',
    chars: [
      c('っ', '(double the next consonant)', 'A small つ sitting low: a short catch in the breath.'),
      c('ッ', '(double the next consonant)', 'A small ツ sitting low, used the same way in katakana words such as カップ.')
    ],
    lookAlikes: [
      {
        kana: ['つ', 'っ'],
        tell: 'Full-size つ is the sound "tsu"; the small one sits low and is silent, a pause.'
      }
    ],
    words: [
      w('きって', 'kitte', 'postage stamp'),
      w('がっこう', 'gakkou', 'school'),
      w('ちょっと', 'chotto', 'a little'),
      w('いっしょ', 'issho', 'together'),
      w('ざっし', 'zasshi', 'magazine'),
      w('きっぷ', 'kippu', 'ticket'),
      w('みっつ', 'mittsu', 'three (things)'),
      w('まって', 'matte', 'wait')
    ]
  },

  // ---- katakana ----
  {
    key: 'k-a',
    script: 'katakana',
    title: 'Katakana a row',
    label: 'アイウエオ',
    rows: ['k-a'],
    intro:
      'Katakana writes the same sounds as hiragana with straighter, sharper strokes. It is used mostly for words borrowed from other languages, so its words below are loanwords. Several katakana are simply a piece of their hiragana partner.',
    chars: [
      c('ア', 'a', 'An axe head on a short handle: "ah!" as it swings down.'),
      c('イ', 'i', 'A long slash sweeping down-left with a short vertical dropping from its middle, like a person leaning on a post.'),
      c('ウ', 'u', 'う boxed in: a dash on top and a roof with a side wall.'),
      c('エ', 'e', 'An I-beam, like the shaft of an elevator: "e" for elevator.'),
      c('オ', 'o', 'お\'s cross with the loop stripped off and one stroke slanting away: "oh".')
    ],
    lookAlikes: [
      {
        kana: ['ウ', 'う'],
        tell: 'ウ is う with a roof: the curve becomes a straight top bar with a short left wall.'
      },
      {
        kana: ['イ', 'ト'],
        tell: 'イ is a long diagonal from the top with a vertical below it; ト is a tall vertical with a short tick pointing right.'
      },
      {
        kana: ['エ', '工'],
        tell: 'They look the same. 工 is the kanji for "craft" and appears inside kanji words; next to katakana, read エ.'
      }
    ],
    words: [
      w('エア', 'ea', 'air'),
      w('ウエア', 'uea', 'sportswear, clothing'),
      w('エイ', 'ei', 'stingray'),
      w('オーイ', 'ooi', 'hey! (a call)'),
      w('アイ', 'ai', 'eye (as in アイライン, eyeliner)'),
      w('アイウエオ', 'aiueo', 'the five vowels, a-i-u-e-o')
    ]
  },
  {
    key: 'k-ka',
    script: 'katakana',
    title: 'Katakana ka row',
    label: 'カキクケコ',
    rows: ['k-ka'],
    intro: 'ka, ki, ku, ke, ko. カ and キ are almost the same as their hiragana partners.',
    chars: [
      c('カ', 'ka', 'か without the small dash: the same karate-chop arm.'),
      c('キ', 'ki', 'き without the curl at the bottom: a straight key with two teeth.'),
      c('ク', 'ku', 'A bird\'s head with its beak pointing down-left: a cuckoo again.'),
      c('ケ', 'ke', 'A slash with a crossbar and a long stroke dropping from it, like a letter K tipped over.'),
      c('コ', 'ko', 'こ\'s two strokes joined at the right into a corner, like the corner of a box.')
    ],
    lookAlikes: [
      {
        kana: ['カ', '力'],
        tell: 'They look nearly the same. 力 is the kanji for "power"; in katakana words read カ.'
      },
      {
        kana: ['キ', 'サ'],
        tell: 'キ has two crossbars and one vertical; サ has one crossbar and two downward strokes.'
      }
    ],
    words: [
      w('ケーキ', 'keeki', 'cake'),
      w('ココア', 'kokoa', 'cocoa'),
      w('クッキー', 'kukkii', 'cookie'),
      w('カカオ', 'kakao', 'cacao'),
      w('キー', 'kii', 'key'),
      w('ケア', 'kea', 'care'),
      w('コア', 'koa', 'core'),
      w('オーケー', 'ookee', 'OK')
    ]
  },
  {
    key: 'k-sa',
    script: 'katakana',
    title: 'Katakana sa row',
    label: 'サシスセソ',
    rows: ['k-sa'],
    intro: 'sa, shi, su, se, so. シ and ソ are the two most confused katakana with ツ and ン; learn the stroke direction.',
    chars: [
      c('サ', 'sa', 'A crossbar with two posts, the right one curving down: a straight-edged さ.'),
      c('シ', 'shi', 'Two drops stacked on the left and a long stroke rising from the bottom left, like a sheep\'s smiling face.'),
      c('ス', 'su', 'A bent seat with a leg kicking out: someone leaning back on a swing.'),
      c('セ', 'se', 'せ with sharp corners: a crossbar and a hooked post.'),
      c('ソ', 'so', 'A short tick and one long stroke falling from the top right, like a needle sewing down.')
    ],
    lookAlikes: [
      {
        kana: ['シ', 'ツ'],
        tell: 'シ\'s two drops are stacked on the left and point right, and its long stroke rises from the bottom. ツ\'s drops sit side by side on top and point down, and its long stroke falls from the top right.'
      },
      {
        kana: ['ス', 'ヌ'],
        tell: 'ヌ has an extra short stroke crossing its middle; ス does not.'
      }
    ],
    words: [
      w('アイス', 'aisu', 'ice cream'),
      w('スキー', 'sukii', 'skiing'),
      w('サッカー', 'sakkaa', 'soccer'),
      w('ケース', 'keesu', 'case'),
      w('ソース', 'soosu', 'sauce'),
      w('シーソー', 'shiisoo', 'seesaw'),
      w('キス', 'kisu', 'kiss'),
      w('スイス', 'suisu', 'Switzerland')
    ]
  },
  {
    key: 'k-ta',
    script: 'katakana',
    title: 'Katakana ta row',
    label: 'タチツテト',
    rows: ['k-ta'],
    intro: 'ta, chi, tsu, te, to. This row holds three of the classic confusions: ク/ケ/タ, シ/ツ and チ/テ.',
    chars: [
      c('タ', 'ta', 'ク with a short stroke inside it, like a tadpole with an eye.'),
      c('チ', 'chi', 'A slanted roof over a cross whose leg curves left, like a chair with a bent leg.'),
      c('ツ', 'tsu', 'Two drops side by side on top and a long wave falling from the top right: a tsunami crashing down.'),
      c('テ', 'te', 'Two flat bars over a leg sweeping left, like a telephone pole with two wires.'),
      c('ト', 'to', 'A totem pole with one branch to the right: the top of と.')
    ],
    lookAlikes: [
      {
        kana: ['ク', 'ケ', 'タ'],
        tell: 'ク is two strokes. タ adds a short stroke inside the ク. ケ\'s right part is a flat crossbar with a long stroke slanting down-left from its middle, not a curved hood.'
      },
      {
        kana: ['シ', 'ツ'],
        tell: 'ツ\'s drops are on top and its long stroke falls from the top right; シ\'s drops are on the left and its long stroke rises from the bottom.'
      },
      {
        kana: ['タ', '夕'],
        tell: 'They look nearly the same. 夕 is the kanji for "evening"; in a katakana word read タ.'
      },
      {
        kana: ['チ', 'テ'],
        tell: 'チ\'s top stroke slants down to the left and its vertical crosses the bar; テ\'s top is a flat bar and its leg hangs from the lower bar without crossing.'
      }
    ],
    words: [
      w('テスト', 'tesuto', 'test'),
      w('タクシー', 'takushii', 'taxi'),
      w('スーツ', 'suutsu', 'suit'),
      w('チケット', 'chiketto', 'ticket'),
      w('トースト', 'toosuto', 'toast'),
      w('ステーキ', 'suteeki', 'steak'),
      w('セット', 'setto', 'set'),
      w('コート', 'kooto', 'coat')
    ]
  },
  {
    key: 'k-na',
    script: 'katakana',
    title: 'Katakana na row',
    label: 'ナニヌネノ',
    rows: ['k-na'],
    intro: 'na, ni, nu, ne, no. ナ, ニ and ノ are pieces of な, に and の.',
    chars: [
      c('ナ', 'na', 'The cross from な without the knot.'),
      c('ニ', 'ni', 'に without the upright: just two bars.'),
      c('ヌ', 'nu', 'ス with a slash cutting through it, like chopsticks through noodles.'),
      c('ネ', 'ne', 'A dot over a cross with a small tick, like a necktie on a hanger.'),
      c('ノ', 'no', 'One single sweeping stroke: "no", nothing more.')
    ],
    lookAlikes: [
      {
        kana: ['ヌ', 'ス'],
        tell: 'ヌ has a short stroke crossing the middle; ス does not.'
      },
      {
        kana: ['ネ', 'ホ'],
        tell: 'ネ has a dot on top and one tick at the bottom right; ホ has a full cross with a tick on each side.'
      },
      {
        kana: ['ニ', '二'],
        tell: 'They look the same. 二 is the kanji for "two"; in a katakana word read ニ.'
      }
    ],
    words: [
      w('ネクタイ', 'nekutai', 'necktie'),
      w('テニス', 'tenisu', 'tennis'),
      w('カヌー', 'kanuu', 'canoe'),
      w('ノート', 'nooto', 'notebook'),
      w('ネット', 'netto', 'net, internet'),
      w('ツナ', 'tsuna', 'tuna'),
      w('コーナー', 'koonaa', 'corner'),
      w('ナッツ', 'nattsu', 'nuts')
    ]
  },
  {
    key: 'k-ha',
    script: 'katakana',
    title: 'Katakana ha row',
    label: 'ハヒフヘホ',
    rows: ['k-ha'],
    intro: 'ha, hi, fu, he, ho. ヘ is identical to へ.',
    chars: [
      c('ハ', 'ha', 'Two strokes spreading apart, like a laugh bursting out: "ha".'),
      c('ヒ', 'hi', 'A seat with a back and a flat bottom, like the heel of a shoe: "hi".'),
      c('フ', 'fu', 'A single hook, the top of ふ flattened: a flag on a pole blowing "fuu".'),
      c('ヘ', 'he', 'The same low hill as へ.'),
      c('ホ', 'ho', 'A cross with a tick on each side, like a holy cross on a hill; ほ\'s right side.')
    ],
    lookAlikes: [
      {
        kana: ['ヒ', 'ビ'],
        tell: 'Plain ヒ is "hi"; with two ticks it is "bi". Check the top right.'
      },
      {
        kana: ['ハ', '八'],
        tell: 'They look nearly the same. 八 is the kanji for "eight"; in a katakana word read ハ.'
      },
      {
        kana: ['ホ', '木'],
        tell: '木 (tree) has longer, joined sweeping legs; ホ has two short separate ticks.'
      }
    ],
    words: [
      w('コーヒー', 'koohii', 'coffee'),
      w('ハート', 'haato', 'heart'),
      w('ヘア', 'hea', 'hair'),
      w('ホッケー', 'hokkee', 'hockey'),
      w('ヒーター', 'hiitaa', 'heater'),
      w('ナイフ', 'naifu', 'knife'),
      w('ホース', 'hoosu', 'hose'),
      w('ハッカー', 'hakkaa', 'hacker')
    ]
  },
  {
    key: 'k-ma',
    script: 'katakana',
    title: 'Katakana ma row',
    label: 'マミムメモ',
    rows: ['k-ma'],
    intro: 'ma, mi, mu, me, mo. モ is も with the hook flattened.',
    chars: [
      c('マ', 'ma', 'A corner with a short dash tucked inside, like a nose on a mask: "ma".'),
      c('ミ', 'mi', 'Three slanting lines, like three claw marks: mi, as in みっつ, "three".'),
      c('ム', 'mu', 'A bent arm flexing a muscle: "mu".'),
      c('メ', 'me', 'A single X, like a mark on a map.'),
      c('モ', 'mo', 'Two bars on a post that hooks right at the foot: も made straight.')
    ],
    lookAlikes: [
      {
        kana: ['ア', 'マ'],
        tell: 'マ\'s second stroke is a short dash inside the corner pointing down-right; ア\'s falls from the middle of the top bar and sweeps left.'
      },
      {
        kana: ['メ', 'ヌ'],
        tell: 'メ is two crossing strokes; ヌ is a ス shape with a short crossing stroke.'
      },
      {
        kana: ['ミ', 'シ'],
        tell: 'ミ has three strokes slanting down to the right; シ has two drops and a long rising stroke.'
      }
    ],
    words: [
      w('マスク', 'masuku', 'mask'),
      w('ミス', 'misu', 'mistake'),
      w('ホーム', 'hoomu', 'platform; home'),
      w('メモ', 'memo', 'memo, note'),
      w('チーム', 'chiimu', 'team'),
      w('トマト', 'tomato', 'tomato'),
      w('ハム', 'hamu', 'ham'),
      w('マイク', 'maiku', 'microphone')
    ]
  },
  {
    key: 'k-ya',
    script: 'katakana',
    title: 'Katakana ya row',
    label: 'ヤユヨ',
    rows: ['k-ya'],
    intro: 'ya, yu, yo. Their small forms ャ, ュ, ョ make the katakana combinations.',
    chars: [
      c('ヤ', 'ya', 'や with the dot absorbed: a hooked bar and one slanted stroke, like a yak\'s horn.'),
      c('ユ', 'yu', 'A U-turn sign: a hook with a long floor running under it.'),
      c('ヨ', 'yo', 'Three bars on a frame open to the left, like a stack of yo-yos.')
    ],
    lookAlikes: [
      {
        kana: ['コ', 'ユ'],
        tell: 'Both boxes open to the left. コ\'s bottom bar stops at the corner; ユ\'s bottom bar runs past the right-hand vertical.'
      },
      {
        kana: ['ヨ', 'ヲ'],
        tell: 'ヨ is three horizontal bars on a frame; ヲ has two bars and a long stroke sweeping down to the left.'
      }
    ],
    words: [
      w('ヨット', 'yotto', 'yacht'),
      w('タイヤ', 'taiya', 'tire'),
      w('ユーモア', 'yuumoa', 'humor'),
      w('ヨーヨー', 'yooyoo', 'yo-yo'),
      w('ユース', 'yuusu', 'youth'),
      w('ヤッホー', 'yahhoo', 'yahoo! (a call across the mountains)')
    ]
  },
  {
    key: 'k-ra',
    script: 'katakana',
    title: 'Katakana ra row',
    label: 'ラリルレロ',
    rows: ['k-ra'],
    intro: 'ra, ri, ru, re, ro. Loanwords use this row for both English r and l: ホテル is "hotel".',
    chars: [
      c('ラ', 'ra', 'A dash over フ, like a rabbit\'s ear over its back.'),
      c('リ', 'ri', 'り straightened: two reeds, the right one longer.'),
      c('ル', 'ru', 'Two roots growing down; the right one kicks up at the end.'),
      c('レ', 're', 'One stroke down and up, like a lever.'),
      c('ロ', 'ro', 'A plain box, like a road sign.')
    ],
    lookAlikes: [
      {
        kana: ['ロ', '口'],
        tell: 'They look the same. 口 is the kanji for "mouth"; in a katakana word read ロ.'
      },
      {
        kana: ['ラ', 'フ'],
        tell: 'ラ has a separate dash on top; フ is the hook alone.'
      },
      {
        kana: ['リ', 'ソ'],
        tell: 'リ\'s two strokes both hang straight down, the right one longer; ソ\'s short tick sits at the top left and its long stroke slants from the top right down to the left.'
      },
      {
        kana: ['ル', 'レ'],
        tell: 'ル is two strokes; レ is only the right-hand one.'
      }
    ],
    words: [
      w('ホテル', 'hoteru', 'hotel'),
      w('カメラ', 'kamera', 'camera'),
      w('トイレ', 'toire', 'toilet'),
      w('ルール', 'ruuru', 'rule'),
      w('クラス', 'kurasu', 'class'),
      w('タオル', 'taoru', 'towel'),
      w('ロッカー', 'rokkaa', 'locker'),
      w('アメリカ', 'amerika', 'America')
    ]
  },
  {
    key: 'k-wa',
    script: 'katakana',
    title: 'Katakana wa row',
    label: 'ワヲン',
    rows: ['k-wa'],
    intro:
      'ワ is "wa" and ン is "n". ヲ is "wo" but is read "o", like を, and is almost never used: the particle を is written in hiragana even in text that is mostly katakana.',
    chars: [
      c('ワ', 'wa', 'ウ without the dash on top: the side view of a wine glass.'),
      c('ヲ', 'wo', 'Two bars and a stroke sweeping down to the left, like a hook with a bar through it.'),
      c('ン', 'n', 'One drop above a long stroke rising from the bottom left: a nose with a smile under it.')
    ],
    lookAlikes: [
      {
        kana: ['ソ', 'ン'],
        tell: 'ソ\'s drop points down and its long stroke falls from the top. ン\'s drop is flatter and its long stroke rises from the bottom left, like シ with one drop.'
      },
      {
        kana: ['ワ', 'ク'],
        tell: 'ワ has a short vertical stroke on the left and a flat top bar; ク starts with a slanting stroke and has no vertical.'
      },
      {
        kana: ['ウ', 'ワ', 'フ'],
        tell: 'ウ has a dash on top and a short left wall; ワ has the left wall but no dash; フ has neither, only the top bar and the hook.'
      }
    ],
    words: [
      w('ワイン', 'wain', 'wine'),
      w('レモン', 'remon', 'lemon'),
      w('ラーメン', 'raamen', 'ramen'),
      w('ミシン', 'mishin', 'sewing machine'),
      w('リモコン', 'rimokon', 'remote control'),
      w('ハワイ', 'hawai', 'Hawaii'),
      w('コンセント', 'konsento', 'power outlet'),
      w('アンテナ', 'antena', 'antenna')
    ]
  },
  {
    key: 'k-dakuten',
    script: 'katakana',
    title: 'Katakana dakuten and handakuten',
    label: 'ガ ザ ダ バ パ',
    rows: ['k-ga', 'k-za', 'k-da', 'k-ba', 'k-pa'],
    intro:
      'The same marks as in hiragana: two ticks voice k, s, t and h into g, z, d and b; a small circle makes h into p. Loanwords use them constantly, so most of the words you will meet need this unit.',
    chars: [
      c('ガ', 'ga'),
      c('ギ', 'gi'),
      c('グ', 'gu'),
      c('ゲ', 'ge'),
      c('ゴ', 'go'),
      c('ザ', 'za'),
      c('ジ', 'ji'),
      c('ズ', 'zu'),
      c('ゼ', 'ze'),
      c('ゾ', 'zo'),
      c('ダ', 'da'),
      c('ヂ', 'ji', 'Rare in loanwords; ジ is the usual spelling for "ji".'),
      c('ヅ', 'zu', 'Rare in loanwords; ズ is the usual spelling for "zu".'),
      c('デ', 'de'),
      c('ド', 'do'),
      c('バ', 'ba'),
      c('ビ', 'bi'),
      c('ブ', 'bu'),
      c('ベ', 'be'),
      c('ボ', 'bo'),
      c('パ', 'pa'),
      c('ピ', 'pi'),
      c('プ', 'pu'),
      c('ペ', 'pe'),
      c('ポ', 'po')
    ],
    lookAlikes: [
      {
        kana: ['シ', 'ジ', 'ツ', 'ヅ'],
        tell: 'The ticks do not change the base shape: tell シ from ツ first by stroke direction, then check for the ticks.'
      },
      {
        kana: ['バ', 'パ'],
        tell: 'Two ticks make b; a small circle makes p.'
      }
    ],
    words: [
      w('テレビ', 'terebi', 'television'),
      w('ゲーム', 'geemu', 'game'),
      w('パン', 'pan', 'bread'),
      w('ビール', 'biiru', 'beer'),
      w('ドア', 'doa', 'door'),
      w('バス', 'basu', 'bus'),
      w('ピアノ', 'piano', 'piano'),
      w('ジーンズ', 'jiinzu', 'jeans')
    ]
  },
  {
    key: 'k-combos',
    script: 'katakana',
    title: 'Katakana combinations',
    label: 'キャ シャ チャ',
    rows: ['k-kya', 'k-sha', 'k-cha', 'k-nya', 'k-hya', 'k-mya', 'k-rya', 'k-gya', 'k-ja', 'k-bya', 'k-pya'],
    intro:
      'The same blends as in hiragana: an i-row katakana plus a small ャ, ュ or ョ is one beat. シャ is "sha", ジュ is "ju".',
    chars: [
      c('キャ', 'kya'),
      c('キュ', 'kyu'),
      c('キョ', 'kyo'),
      c('シャ', 'sha'),
      c('シュ', 'shu'),
      c('ショ', 'sho'),
      c('チャ', 'cha'),
      c('チュ', 'chu'),
      c('チョ', 'cho'),
      c('ニャ', 'nya'),
      c('ニュ', 'nyu'),
      c('ニョ', 'nyo'),
      c('ヒャ', 'hya'),
      c('ヒュ', 'hyu'),
      c('ヒョ', 'hyo'),
      c('ミャ', 'mya'),
      c('ミュ', 'myu'),
      c('ミョ', 'myo'),
      c('リャ', 'rya'),
      c('リュ', 'ryu'),
      c('リョ', 'ryo'),
      c('ギャ', 'gya'),
      c('ギュ', 'gyu'),
      c('ギョ', 'gyo'),
      c('ジャ', 'ja'),
      c('ジュ', 'ju'),
      c('ジョ', 'jo'),
      c('ビャ', 'bya'),
      c('ビュ', 'byu'),
      c('ビョ', 'byo'),
      c('ピャ', 'pya'),
      c('ピュ', 'pyu'),
      c('ピョ', 'pyo')
    ],
    lookAlikes: [
      {
        kana: ['シャ', 'ジャ'],
        tell: 'The ticks on シ turn "sha" into "ja"; the small ャ stays the same.'
      },
      {
        kana: ['ユ', 'ュ'],
        tell: 'The small ュ sits low after another kana and merges with it; the full-size ユ is its own beat.'
      }
    ],
    words: [
      w('シャツ', 'shatsu', 'shirt'),
      w('ジュース', 'juusu', 'juice'),
      w('チョコレート', 'chokoreeto', 'chocolate'),
      w('メニュー', 'menyuu', 'menu'),
      w('キャンプ', 'kyanpu', 'camping'),
      w('ショッピング', 'shoppingu', 'shopping'),
      w('ニュース', 'nyuusu', 'news'),
      w('コンピューター', 'konpyuutaa', 'computer')
    ]
  },
  {
    key: 'k-extended',
    script: 'katakana',
    title: 'Katakana-only sounds',
    label: 'ファ ティ ウィ ヴ',
    rows: [],
    intro:
      'To write foreign sounds Japanese lacks, katakana pairs a kana with a small vowel ァ ィ ゥ ェ ォ: フ plus small ァ is "fa", テ plus small ィ is "ti". ヴ (ウ with two ticks) stands for v, though many words spell the same sound with バ, so ヴァイオリン and バイオリン are both seen.',
    chars: [
      c('ファ', 'fa'),
      c('フィ', 'fi'),
      c('フェ', 'fe'),
      c('フォ', 'fo'),
      c('ティ', 'ti'),
      c('ディ', 'di'),
      c('トゥ', 'tu'),
      c('ドゥ', 'du'),
      c('ウィ', 'wi'),
      c('ウェ', 'we'),
      c('ウォ', 'wo'),
      c('シェ', 'she'),
      c('ジェ', 'je'),
      c('チェ', 'che'),
      c('ヴ', 'vu', 'ウ with two ticks: the v sound.'),
      c('ヴァ', 'va'),
      c('ヴィ', 'vi'),
      c('ヴェ', 've'),
      c('ヴォ', 'vo')
    ],
    lookAlikes: [
      {
        kana: ['テイ', 'ティ'],
        tell: 'A full-size イ is its own beat (te-i); the small ィ merges into one beat (ti).'
      },
      {
        kana: ['ア', 'ァ'],
        tell: 'The small vowels are the same shapes, written smaller and lower.'
      }
    ],
    words: [
      w('ファン', 'fan', 'fan (supporter)'),
      w('フォーク', 'fooku', 'fork'),
      w('パーティー', 'paatii', 'party'),
      w('フィルム', 'firumu', 'film'),
      w('ウェブ', 'webu', 'web'),
      w('シェフ', 'shefu', 'chef'),
      w('チェック', 'chekku', 'check'),
      w('ヴァイオリン', 'vaiorin', 'violin')
    ]
  }
]

export function kanaUnitByKey(key: string | null | undefined): KanaUnit | undefined {
  return key ? KANA_UNITS.find((u) => u.key === key) : undefined
}
