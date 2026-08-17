import type { SeedCourse } from './japaneseSeed'

// Second wave of seed packs (2026-07-05): radicals, counters, manga SFX,
// speech styles / role language, and idioms. Same voice as the first wave —
// explain the pattern, then say why it matters for reading manga/VNs.

export const RADICALS_COURSE: SeedCourse = {
  title: 'Kanji Radicals & Components',
  description:
    'The ~90 building blocks kanji are made of. Learn these before (or alongside) the kanji ' +
    'decks and every new character becomes a combination of parts you already know, ' +
    'instead of a pile of strokes. Includes the sound-hint components that let you guess readings.',
  level: 'N5+',
  difficulty: 2,
  lessons: [
    {
      kind: 'grammar',
      title: 'What radicals are (and why they make kanji easy)',
      body: `Almost no kanji is a random drawing. Complex characters are built from a small set of reusable parts — radicals (部首) and components. 海 (sea), 泳 (swim) and 酒 (sake) all share 氵, the "water" part. Once you see the parts, a 12-stroke kanji is two or three chunks, not twelve strokes.

The positions have names — you'll meet them in every dictionary (including this app's kanji lookups):

・へん — left side (亻 in 休, 氵 in 海)
・つくり — right side (刂 in 別)
・かんむり — top (艹 in 花, 宀 in 家)
・あし — bottom (灬 in 熱, 心 in 思)
・たれ — hangs over the top-left (广 in 店, 疒 in 病)
・にょう — wraps around the bottom-left (辶 in 道)
・かまえ — encloses (門 in 間, 囗 in 国)

The real cheat code: about two-thirds of all kanji are 形声 (keisei) compounds — ONE part hints at the meaning, ANOTHER hints at the sound. 時・持・詩 all contain 寺 and all read ジ/じ. The final lesson in this course teaches the most productive sound-hints.

Reading payoff: when a manga throws an unknown kanji at you, the radical is your search handle — and half the time the sound-side lets you guess the reading before you even look it up.`,
      cards: [
        {
          front: 'へん',
          back: 'radical on the LEFT side of a kanji',
          pos: 'position',
          exampleJp: '休 = 亻 + 木',
          exampleEn: 'person resting against a tree'
        },
        {
          front: 'かんむり',
          back: 'radical on TOP of a kanji ("crown")',
          pos: 'position',
          exampleJp: '花 = 艹 + 化',
          exampleEn: 'grass crown + sound-hint 化 (カ)'
        },
        {
          front: 'かまえ・たれ・にょう',
          back: 'enclosure / top-left overhang / bottom-left wrap',
          pos: 'position',
          exampleJp: '国・店・道',
          exampleEn: 'enclosure 囗, overhang 广, wrap 辶'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'The big left-siders (へん)',
      cards: [
        {
          front: '亻',
          reading: 'にんべん',
          back: 'person (left side)',
          notes: 'Squeezed form of 人. Anything humans do.',
          exampleJp: '休・体・作・使',
          exampleEn: 'rest, body, make, use'
        },
        {
          front: '氵',
          reading: 'さんずい',
          back: 'water / liquid',
          notes: 'Three drops. Rivers, seas, tears, alcohol.',
          exampleJp: '海・泳・涙・酒',
          exampleEn: 'sea, swim, tears, sake'
        },
        {
          front: '扌',
          reading: 'てへん',
          back: 'hand / action with hands',
          notes: 'Squeezed 手.',
          exampleJp: '持・投・打・指',
          exampleEn: 'hold, throw, hit, finger/point'
        },
        {
          front: '忄',
          reading: 'りっしんべん',
          back: 'heart / feelings (left side)',
          notes: 'Squeezed 心. Emotions live here.',
          exampleJp: '怖・悔・情・慣',
          exampleEn: 'scary, regret, emotion, get used to'
        },
        {
          front: '木',
          reading: 'きへん',
          back: 'tree / wood',
          exampleJp: '林・森・枝・机',
          exampleEn: 'grove, forest, branch, desk'
        },
        {
          front: '言',
          reading: 'ごんべん',
          back: 'words / speech',
          notes: 'Anything said, told, discussed or read.',
          exampleJp: '話・読・語・誰',
          exampleEn: 'talk, read, language, who'
        },
        {
          front: '糸',
          reading: 'いとへん',
          back: 'thread / connection',
          exampleJp: '結・続・約・絆',
          exampleEn: 'tie, continue, promise, bonds'
        },
        {
          front: '金',
          reading: 'かねへん',
          back: 'metal / money',
          exampleJp: '銀・鉄・針・銃',
          exampleEn: 'silver, iron, needle, gun'
        },
        {
          front: '女',
          reading: 'おんなへん',
          back: 'woman',
          exampleJp: '好・姉・妹・娘',
          exampleEn: 'like, older sister, younger sister, daughter'
        },
        {
          front: '口',
          reading: 'くちへん',
          back: 'mouth / opening',
          notes: 'As a left part: speaking, eating, shouting.',
          exampleJp: '叫・呼・味・鳴',
          exampleEn: 'scream, call, taste, cry (animal)'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'Crowns & feet (かんむり・あし)',
      cards: [
        {
          front: '艹',
          reading: 'くさかんむり',
          back: 'grass / plants (top)',
          exampleJp: '花・草・薬・茶',
          exampleEn: 'flower, grass, medicine, tea'
        },
        {
          front: '宀',
          reading: 'うかんむり',
          back: 'roof / house (top)',
          notes: 'Things under a roof: home, safety, sleep.',
          exampleJp: '家・安・室・寝',
          exampleEn: 'house, cheap/safe, room, sleep'
        },
        {
          front: '竹',
          reading: 'たけかんむり',
          back: 'bamboo (top)',
          notes: 'Old tools were bamboo: brushes, boxes, flutes.',
          exampleJp: '笑・箱・筆・笛',
          exampleEn: 'laugh, box, brush, flute'
        },
        {
          front: '雨',
          reading: 'あめかんむり',
          back: 'rain / weather (top)',
          exampleJp: '雪・雲・雷・電',
          exampleEn: 'snow, cloud, thunder, electricity'
        },
        {
          front: '灬',
          reading: 'れっか',
          back: 'fire (bottom, four dots)',
          notes: 'Flattened 火 — heat and cooking hide down there.',
          exampleJp: '熱・焦・煮・黒',
          exampleEn: 'hot, char/impatience, boil, black'
        },
        {
          front: '心',
          reading: 'こころ',
          back: 'heart (bottom)',
          notes: 'Full-width 心 under a sound part = a feeling.',
          exampleJp: '思・悲・恋・忘',
          exampleEn: 'think, sad, love, forget'
        },
        {
          front: '儿',
          reading: 'ひとあし',
          back: 'human legs (bottom)',
          exampleJp: '見・兄・先・光',
          exampleEn: 'see, older brother, ahead, light'
        },
        {
          front: '穴',
          reading: 'あなかんむり',
          back: 'hole / cave (top)',
          exampleJp: '空・突・窓',
          exampleEn: 'sky/empty, thrust, window'
        },
        {
          front: '罒',
          reading: 'あみがしら',
          back: 'net (top)',
          notes: 'A flattened net — catching and judging.',
          exampleJp: '買・罪・罰',
          exampleEn: 'buy, crime, punishment'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'Enclosures & overhangs (かまえ・たれ・にょう)',
      cards: [
        {
          front: '辶',
          reading: 'しんにょう',
          back: 'road / movement (wraps bottom-left)',
          notes: 'THE travel radical.',
          exampleJp: '道・近・週・逃',
          exampleEn: 'road, near, week, escape'
        },
        {
          front: '广',
          reading: 'まだれ',
          back: 'building / lean-to (overhang)',
          exampleJp: '店・広・度・座',
          exampleEn: 'shop, wide, degree, sit/seat'
        },
        {
          front: '疒',
          reading: 'やまいだれ',
          back: 'sickness (overhang)',
          notes: 'A person on a bed. Every disease kanji has it.',
          exampleJp: '病・痛・疲・癒',
          exampleEn: 'illness, pain, tired, heal'
        },
        {
          front: '門',
          reading: 'もんがまえ',
          back: 'gate (enclosure)',
          exampleJp: '間・開・閉・闇',
          exampleEn: 'interval, open, close, darkness'
        },
        {
          front: '囗',
          reading: 'くにがまえ',
          back: 'border / enclosure',
          notes: 'Bigger than 口 — it surrounds the whole kanji.',
          exampleJp: '国・回・図・囲',
          exampleEn: 'country, turn, diagram, surround'
        },
        {
          front: '尸',
          reading: 'しかばね',
          back: 'body / flag (overhang)',
          exampleJp: '屋・尾・届・居',
          exampleEn: 'roof/shop, tail, deliver, reside'
        },
        {
          front: '气',
          reading: 'きがまえ',
          back: 'steam / spirit',
          exampleJp: '気・汽',
          exampleEn: 'spirit/energy, steam'
        },
        {
          front: '彳',
          reading: 'ぎょうにんべん',
          back: 'step / going (left side)',
          notes: '"Going person" — movement on foot.',
          exampleJp: '行・待・後・彼',
          exampleEn: 'go, wait, after, he'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'People & body parts',
      cards: [
        {
          front: '目',
          reading: 'め',
          back: 'eye',
          exampleJp: '見・眠・瞬',
          exampleEn: 'see, sleep, blink/instant'
        },
        {
          front: '耳',
          reading: 'みみ',
          back: 'ear',
          exampleJp: '聞・聴・恥',
          exampleEn: 'hear, listen, shame'
        },
        {
          front: '手',
          reading: 'て',
          back: 'hand (full form)',
          notes: 'Full 手 usually sits at the bottom; 扌 on the left.',
          exampleJp: '拳・撃・掌',
          exampleEn: 'fist, attack, palm'
        },
        {
          front: '足',
          reading: 'あし',
          back: 'foot / leg',
          exampleJp: '走・路・跳・蹴',
          exampleEn: 'run, road, jump, kick'
        },
        {
          front: '月',
          reading: 'にくづき',
          back: 'flesh / body part (left side)',
          notes:
            'Looks like moon 月 but comes from 肉 (meat). If a kanji with 月 is an organ or body part, it is THIS one.',
          exampleJp: '腕・胸・腹・脳',
          exampleEn: 'arm, chest, belly, brain'
        },
        {
          front: '頁',
          reading: 'おおがい',
          back: 'head (right side)',
          exampleJp: '顔・頭・願・類',
          exampleEn: 'face, head, wish, kind/sort'
        },
        {
          front: '自',
          reading: 'みずから',
          back: 'self (originally: nose)',
          notes: 'Japanese people point at their nose to say "me".',
          exampleJp: '自分・臭',
          exampleEn: 'oneself, smell'
        },
        {
          front: '血',
          reading: 'ち',
          back: 'blood',
          exampleJp: '血液・衆',
          exampleEn: 'blood, masses'
        },
        {
          front: '骨',
          reading: 'ほね',
          back: 'bone',
          exampleJp: '骸・体?',
          exampleEn: 'skeleton (骸骨 = skeleton)',
          notes: 'Rare as a part but constant in battle manga.'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'Nature & animals',
      cards: [
        {
          front: '山',
          reading: 'やま',
          back: 'mountain',
          exampleJp: '岩・岸・峰',
          exampleEn: 'boulder, shore, peak'
        },
        {
          front: '日',
          reading: 'ひへん',
          back: 'sun / day / time',
          notes: 'Time words are full of suns.',
          exampleJp: '時・明・晴・暗',
          exampleEn: 'time, bright, sunny, dark'
        },
        {
          front: '土',
          reading: 'つちへん',
          back: 'earth / ground',
          exampleJp: '地・場・城・塔',
          exampleEn: 'ground, place, castle, tower'
        },
        {
          front: '石',
          reading: 'いし',
          back: 'stone',
          exampleJp: '砂・破・磨',
          exampleEn: 'sand, break, polish'
        },
        {
          front: '田',
          reading: 'た',
          back: 'rice field',
          notes: 'Everywhere in names: 田中, 山田…',
          exampleJp: '町・畑・思?',
          exampleEn: 'town, field (思 top is actually 田-shaped)'
        },
        {
          front: '貝',
          reading: 'かい',
          back: 'shell → money',
          notes: 'Shells were currency. Money/value kanji carry 貝.',
          exampleJp: '買・貯・費・賭',
          exampleEn: 'buy, save up, expense, bet'
        },
        {
          front: '虫',
          reading: 'むしへん',
          back: 'bug / creature',
          exampleJp: '蛇・蝶・蟲',
          exampleEn: 'snake, butterfly, bugs (archaic — see Mushishi)'
        },
        {
          front: '魚',
          reading: 'うおへん',
          back: 'fish',
          exampleJp: '鮭・鮫・鯨',
          exampleEn: 'salmon, shark, whale'
        },
        {
          front: '犭',
          reading: 'けものへん',
          back: 'beast (left side)',
          notes: 'Dogs, cats, wolves, monsters.',
          exampleJp: '猫・犬?・狼・狂',
          exampleEn: 'cat, (犬 full form), wolf, madness'
        },
        {
          front: '馬',
          reading: 'うまへん',
          back: 'horse',
          exampleJp: '駅・駆・騎',
          exampleEn: 'station, gallop, mounted (騎士 = knight)'
        },
        {
          front: '鳥',
          reading: 'とり',
          back: 'bird',
          exampleJp: '鳴・鶏・鴉',
          exampleEn: 'cry/chirp, chicken, crow'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'Tools, weapons & work',
      cards: [
        {
          front: '刂',
          reading: 'りっとう',
          back: 'blade (right side)',
          notes: 'Squeezed 刀 (katana!). Cutting and dividing.',
          exampleJp: '切・別・刻・剣',
          exampleEn: 'cut, separate, carve, sword'
        },
        {
          front: '弓',
          reading: 'ゆみへん',
          back: 'bow',
          exampleJp: '引・強・弱・弾',
          exampleEn: 'pull, strong, weak, bullet/play'
        },
        {
          front: '矢',
          reading: 'や',
          back: 'arrow',
          exampleJp: '知・短',
          exampleEn: 'know, short'
        },
        {
          front: '斤',
          reading: 'おのづくり',
          back: 'axe (right side)',
          exampleJp: '新・近・断',
          exampleEn: 'new, near, sever/refuse'
        },
        {
          front: '力',
          reading: 'ちから',
          back: 'power / strength',
          exampleJp: '助・勝・動・努',
          exampleEn: 'help, win, move, strive'
        },
        {
          front: '工',
          reading: 'たくみ',
          back: 'work / craft',
          exampleJp: '空・功・攻',
          exampleEn: 'sky, achievement, attack'
        },
        {
          front: '巾',
          reading: 'はば',
          back: 'cloth',
          exampleJp: '帰・帽・幕',
          exampleEn: 'return, hat, curtain (幕 as in shogunate 幕府)'
        },
        {
          front: '車',
          reading: 'くるまへん',
          back: 'vehicle / wheel',
          exampleJp: '軍・転・輪・軽',
          exampleEn: 'army, roll, wheel/ring, light(weight)'
        },
        {
          front: '舟',
          reading: 'ふねへん',
          back: 'boat',
          exampleJp: '船・航',
          exampleEn: 'ship, voyage'
        },
        {
          front: '皿',
          reading: 'さら',
          back: 'dish (bottom)',
          exampleJp: '盛・盗・血?',
          exampleEn: 'serve/heap, steal (blood 血 looks similar!)'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'Spirit, speech & society',
      cards: [
        {
          front: '礻',
          reading: 'しめすへん',
          back: 'spirit / god (left side)',
          notes: 'From 示 (altar). Shrines, prayer, fate.',
          exampleJp: '神・礼・祈・福',
          exampleEn: 'god, courtesy, pray, fortune'
        },
        {
          front: '衤',
          reading: 'ころもへん',
          back: 'clothes (left side)',
          notes:
            'ONE extra stroke vs 礻 — gods (礻) vs clothes (衤). 神 wears the spirit one, 袖 (sleeve) the cloth one.',
          exampleJp: '袖・被・裸',
          exampleEn: 'sleeve, cover/receive, naked'
        },
        {
          front: '見',
          reading: 'みる',
          back: 'seeing (right/bottom)',
          exampleJp: '親・観・覚',
          exampleEn: 'parent, observe, awaken/remember'
        },
        {
          front: '音',
          reading: 'おと',
          back: 'sound',
          exampleJp: '暗・闇・響',
          exampleEn: 'dark, darkness, echo/resound'
        },
        {
          front: '飠',
          reading: 'しょくへん',
          back: 'food / eating (left side)',
          exampleJp: '飯・飲・餓',
          exampleEn: 'cooked rice/meal, drink, starve'
        },
        {
          front: '酉',
          reading: 'とりへん',
          back: 'alcohol / fermentation',
          notes: 'A sake jar — NOT the bird 鳥.',
          exampleJp: '酒・酔・配',
          exampleEn: 'alcohol, drunk, distribute'
        },
        {
          front: '王',
          reading: 'おうへん',
          back: 'king / jewel (left side)',
          notes: 'From 玉 (jewel). Precious, sphere-like things.',
          exampleJp: '理・球・現・玉',
          exampleEn: 'reason, sphere/ball, appear, jewel'
        },
        {
          front: '示',
          reading: 'しめす',
          back: 'altar / to show (full form)',
          exampleJp: '祭・禁',
          exampleEn: 'festival, forbid'
        },
        {
          front: '鬼',
          reading: 'おに',
          back: 'demon / ghost',
          notes: 'A whole radical of its own. Demons, souls, magic.',
          exampleJp: '魂・魔・鬼',
          exampleEn: 'soul, magic/demon, oni'
        }
      ]
    },
    {
      kind: 'kanji',
      title: 'Sound-hints: the 形声 cheat code',
      cards: [
        {
          front: '寺',
          reading: 'じ',
          back: 'lends the sound ジ',
          notes: 'The temple kanji as a sound part.',
          exampleJp: '時・持・詩・待',
          exampleEn: 'time, hold, poem (all ジ; 待 drifts to タイ)'
        },
        {
          front: '青',
          reading: 'せい',
          back: 'lends the sound セイ',
          exampleJp: '晴・清・精・請',
          exampleEn: 'sunny, pure, spirit, request — all セイ'
        },
        {
          front: '白',
          reading: 'はく',
          back: 'lends the sound ハク',
          exampleJp: '伯・拍・泊',
          exampleEn: 'count/uncle, beat, stay overnight — all ハク'
        },
        {
          front: '反',
          reading: 'はん',
          back: 'lends the sound ハン',
          exampleJp: '版・販・飯・坂',
          exampleEn: 'edition, sell, meal, slope (ハン/バン and サカ drift)'
        },
        {
          front: '交',
          reading: 'こう',
          back: 'lends the sound コウ',
          exampleJp: '校・効・絞',
          exampleEn: 'school, effect, strangle — all コウ'
        },
        {
          front: '里',
          reading: 'り',
          back: 'lends the sound リ',
          exampleJp: '理・裏',
          exampleEn: 'reason, reverse side — both リ'
        },
        {
          front: '化',
          reading: 'か',
          back: 'lends the sound カ',
          exampleJp: '花・貨・靴',
          exampleEn: 'flower, goods, shoes (カ; 靴 drifts to クツ)'
        },
        {
          front: '生',
          reading: 'せい',
          back: 'lends the sound セイ',
          exampleJp: '性・星・姓',
          exampleEn: 'nature/gender, star, surname — all セイ/ショウ'
        },
        {
          front: '可',
          reading: 'か',
          back: 'lends the sound カ',
          exampleJp: '歌・河・何',
          exampleEn: 'song, river (カ; 何 drifts to なに)'
        },
        {
          front: '方',
          reading: 'ほう',
          back: 'lends the sound ホウ',
          exampleJp: '訪・放・防',
          exampleEn: 'visit, release, defend — all ホウ/ボウ'
        }
      ]
    }
  ]
}

export const COUNTERS_COURSE: SeedCourse = {
  title: 'Counters & Numbers',
  description:
    'Japanese never counts bare — three flat things, two small animals, one sword. ' +
    'This course covers the counters you will actually meet in manga and VNs, the irregular ' +
    'readings that trip everyone up (ひとり, ついたち, はたち), and how to ask "how many?".',
  level: 'N5–N4',
  difficulty: 6,
  lessons: [
    {
      kind: 'grammar',
      title: 'How counting works',
      body: `A number never attaches straight to a noun. It takes a COUNTER that classifies the thing being counted:

りんごを 三つ 食べた。 — I ate three apples. (generic counter つ)
猫が 二匹 いる。 — There are two cats. (small-animal counter 匹)

The counter phrase usually floats AFTER the particle: りんごを三つ買う, not 三つのりんごを買う (possible, but marked).

The pain point is sound changes. Numbers 1, 3, 6, 8, 10 mutate before counters starting with h/k/s/t:
・一 + 匹 → いっぴき  三 + 匹 → さんびき  六 + 匹 → ろっぴき
・一 + 本 → いっぽん  三 + 本 → さんぼん  十 + 本 → じゅっぽん
Pattern to internalize: 一 and 十 double the consonant (いっ・じゅっ), 三 voices it (さんび/さんぼ), 六 and 八 double before k/p (ろっ・はっ).

Don't memorize tables — learn one anchor word per counter (the cards in this course) and let the pattern generalize.

Reading payoff: casual dialogue counts constantly (もう一回! — one more time!, 二人きり — just the two of us), and battle manga loves 一発 (one shot) and 十連撃 (ten-hit combo).`,
      cards: [
        {
          front: 'りんごを三つ食べた。',
          reading: 'りんごをみっつたべた。',
          back: 'I ate three apples.',
          notes: 'Counter phrase floats after を.'
        },
        {
          front: '猫が二匹いる。',
          reading: 'ねこがにひきいる。',
          back: 'There are two cats.'
        },
        {
          front: 'もう一回やろう！',
          reading: 'もういっかいやろう！',
          back: "Let's go one more time!",
          notes: '一回 → いっかい (small っ).'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'The generic counter 〜つ',
      cards: [
        { front: '一つ', reading: 'ひとつ', back: 'one (thing)', pos: 'counter' },
        { front: '二つ', reading: 'ふたつ', back: 'two (things)', pos: 'counter' },
        { front: '三つ', reading: 'みっつ', back: 'three (things)', pos: 'counter' },
        { front: '四つ', reading: 'よっつ', back: 'four (things)', pos: 'counter' },
        { front: '五つ', reading: 'いつつ', back: 'five (things)', pos: 'counter' },
        { front: '六つ', reading: 'むっつ', back: 'six (things)', pos: 'counter' },
        { front: '七つ', reading: 'ななつ', back: 'seven (things)', pos: 'counter' },
        { front: '八つ', reading: 'やっつ', back: 'eight (things)', pos: 'counter' },
        { front: '九つ', reading: 'ここのつ', back: 'nine (things)', pos: 'counter' },
        { front: '十', reading: 'とお', back: 'ten (things — no つ!)', pos: 'counter' },
        {
          front: 'いくつ',
          back: 'how many (things) / how old',
          pos: 'question',
          notes: 'おいくつですか = polite "how old are you?"'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'People & animals',
      cards: [
        {
          front: '一人',
          reading: 'ひとり',
          back: 'one person / alone',
          pos: 'counter',
          notes: 'Irregular! Also = "by oneself" (一人で).'
        },
        {
          front: '二人',
          reading: 'ふたり',
          back: 'two people',
          pos: 'counter',
          notes: 'Irregular. 二人きり = just the two of us (romance staple).'
        },
        {
          front: '三人',
          reading: 'さんにん',
          back: 'three people',
          pos: 'counter',
          notes: 'From 3 up it is regular 〜にん. 四人 = よにん.'
        },
        { front: '何人', reading: 'なんにん', back: 'how many people', pos: 'question' },
        {
          front: '〜匹',
          reading: 'ひき',
          back: 'small animals (cats, dogs, fish, demons…)',
          pos: 'counter',
          notes: 'いっぴき・にひき・さんびき — the classic sound-change demo.'
        },
        {
          front: '〜頭',
          reading: 'とう',
          back: 'large animals (horses, cattle, dragons)',
          pos: 'counter'
        },
        {
          front: '〜羽',
          reading: 'わ',
          back: 'birds (and rabbits!)',
          pos: 'counter',
          notes: 'Rabbits count as birds — old monk loophole for eating them.'
        },
        {
          front: '〜名',
          reading: 'めい',
          back: 'people (formal — reservations, staff)',
          pos: 'counter',
          notes: '二名様 — "party of two" (restaurant speech).'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Objects: long, flat, bound and mechanical',
      cards: [
        {
          front: '〜本',
          reading: 'ほん',
          back: 'long thin things: bottles, swords, arms, trains',
          pos: 'counter',
          notes: 'いっぽん・にほん・さんぼん. A judo ippon = 一本. Nothing to do with books!'
        },
        {
          front: '〜枚',
          reading: 'まい',
          back: 'flat things: paper, tickets, plates, cards',
          pos: 'counter',
          notes: 'TCG anime: カードを一枚引く — draw one card.'
        },
        {
          front: '〜個',
          reading: 'こ',
          back: 'small solid things (general-purpose)',
          pos: 'counter',
          notes: 'いっこ・にこ. The safe fallback when つ feels childish.'
        },
        { front: '〜台', reading: 'だい', back: 'machines & vehicles', pos: 'counter' },
        {
          front: '〜冊',
          reading: 'さつ',
          back: 'bound volumes: books, manga!',
          pos: 'counter',
          notes: '漫画を三冊買った — bought three manga volumes.'
        },
        { front: '〜着', reading: 'ちゃく', back: 'clothes (outfits)', pos: 'counter' },
        {
          front: '〜足',
          reading: 'そく',
          back: 'pairs of footwear',
          pos: 'counter',
          notes: 'いっそく・にそく・さんぞく.'
        },
        { front: '〜軒', reading: 'けん', back: 'houses & shops', pos: 'counter' },
        {
          front: '〜杯',
          reading: 'はい',
          back: 'cupfuls / bowlfuls',
          pos: 'counter',
          notes: 'いっぱい = one cup — AND "full/a lot". おかわり一杯！'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Time & dates (the irregular minefield)',
      cards: [
        {
          front: '〜時',
          reading: 'じ',
          back: "o'clock",
          pos: 'counter',
          notes: '四時 = よじ, 九時 = くじ (not よん/きゅう).'
        },
        {
          front: '〜分',
          reading: 'ふん',
          back: 'minutes',
          pos: 'counter',
          notes: 'いっぷん・さんぷん・じゅっぷん — the ふん/ぷん dance.'
        },
        { front: '〜秒', reading: 'びょう', back: 'seconds', pos: 'counter' },
        {
          front: '一日',
          reading: 'ついたち',
          back: '1st of the month',
          pos: 'date',
          notes: 'BUT いちにち = "one day (duration)". Same kanji, two words.'
        },
        {
          front: '二日',
          reading: 'ふつか',
          back: '2nd / two days',
          pos: 'date',
          notes: 'Days 2–10 use the old readings: みっか・よっか・いつか・むいか・なのか・ようか・ここのか・とおか.'
        },
        { front: '二十日', reading: 'はつか', back: '20th / twenty days', pos: 'date' },
        {
          front: '〜月',
          reading: 'がつ',
          back: 'month names',
          pos: 'counter',
          notes: '四月 = しがつ, 七月 = しちがつ, 九月 = くがつ.'
        },
        { front: '〜年', reading: 'ねん', back: 'years', pos: 'counter' },
        {
          front: '〜歳',
          reading: 'さい',
          back: 'years old',
          pos: 'counter',
          notes: '二十歳 = はたち (fully irregular). Often written 〜才.'
        },
        { front: '〜週間', reading: 'しゅうかん', back: 'weeks (duration)', pos: 'counter' },
        {
          front: '〜ヶ月',
          reading: 'かげつ',
          back: 'months (duration)',
          pos: 'counter',
          notes: 'The small ヶ reads か. 三ヶ月後 — three months later (timeskip!).'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Frequency, rank & battle counters',
      cards: [
        {
          front: '〜回',
          reading: 'かい',
          back: 'times (occurrences)',
          pos: 'counter',
          notes: 'もう一回 — one more time. 何回も — over and over.'
        },
        {
          front: '〜度',
          reading: 'ど',
          back: 'times / degrees',
          pos: 'counter',
          notes: '今度 = next time; 二度と…ない = never again (dramatic!).'
        },
        {
          front: '〜番',
          reading: 'ばん',
          back: 'number (in a series) / turn',
          pos: 'counter',
          notes: '一番 = number one → "the most". 俺の番だ — my turn!'
        },
        { front: '〜番目', reading: 'ばんめ', back: 'the Nth one', pos: 'counter' },
        {
          front: '〜位',
          reading: 'い',
          back: 'rank / place',
          pos: 'counter',
          notes: 'Tournament arcs: 一位 first place, 最下位 dead last.'
        },
        {
          front: '〜級',
          reading: 'きゅう',
          back: 'grade / class (kyū)',
          pos: 'counter',
          notes: 'S級冒険者 — S-rank adventurer. Also JLPT-style levels.'
        },
        {
          front: '〜段',
          reading: 'だん',
          back: 'dan rank / steps / tiers',
          pos: 'counter',
          notes: 'Martial arts dan; also 階段 steps and 段々 = gradually.'
        },
        {
          front: '〜発',
          reading: 'はつ',
          back: 'shots / punches / blasts',
          pos: 'counter',
          notes: '一発 = one hit. 一発逆転 — turning it all around in one blow.'
        },
        {
          front: '〜連',
          reading: 'れん',
          back: 'in a row (combos, streaks)',
          pos: 'counter',
          notes: '三連勝 = three wins straight; 十連ガチャ = 10-pull.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'Asking & approximating',
      body: `何 + counter asks "how many":
何人 (なんにん) — how many people? 何本・何枚・何回…
Watch the reading drift: 何分 = なんぷん, 何匹 = なんびき (何 triggers the same sound changes as 三).

Approximation and distribution:
・〜ぐらい／〜くらい — about: 十人ぐらい "about ten people"
・〜ほど — about (slightly stiffer); with negatives = "not as much as"
・〜ずつ — apiece: 一つずつ "one each", 少しずつ "little by little"

Emphasis with quantity:
・counter + も — "as many as": 百人も来た "a whole hundred people came!"
・counter + しか…ない — "only": 一人しかいない "there's only one person"

Reading payoff: these show up in every dungeon brief and every shop scene — 一人二千円ぐらい, ポーションは一人三本まで, 少しずつ強くなる.`,
      cards: [
        {
          front: '教室に何人いる？',
          reading: 'きょうしつになんにんいる？',
          back: 'How many people are in the classroom?'
        },
        {
          front: '十分ぐらい待って。',
          reading: 'じゅっぷんぐらいまって。',
          back: 'Wait about ten minutes.'
        },
        {
          front: '弾は三発しか残ってない。',
          reading: 'たまはさんぱつしかのこってない。',
          back: 'Only three bullets left.',
          notes: 'しか…ない — scarcity, dramatic tension.'
        }
      ]
    }
  ]
}

export const SFX_COURSE: SeedCourse = {
  title: 'Manga SFX & Onomatopoeia',
  description:
    'The sound effects drawn across manga panels and the mimetic words that pepper dialogue. ' +
    'These are almost never in beginner textbooks, yet a manga page can be half SFX. ' +
    'After this course the big scrawled katakana stops being decoration and starts being story.',
  level: 'N5+',
  difficulty: 10,
  lessons: [
    {
      kind: 'grammar',
      title: 'How to read SFX',
      body: `Japanese has three flavors of sound-symbolic words:

・擬音語 (giongo) — real sounds: ドン (bang), ザーザー (pouring rain)
・擬態語 (gitaigo) — states/manner that make no sound: キラキラ (sparkling), こっそり (stealthily)
・擬情語 (gijōgo) — inner feelings: ドキドキ (heart racing), イライラ (irritated)

Reading rules that unlock 90% of panel SFX:

1. Script sets the texture — katakana = hard/loud/sharp (ドンッ), hiragana = soft/quiet/squishy (ふわふわ).
2. Small ッ at the end = abrupt cutoff. ドン = boom; ドンッ = BOOM-stop.
3. ー stretches the sound. シーン is a LONG silence.
4. Doubling = continuing/repeating. ゴロ (a roll) → ゴロゴロ (rolling on and on; also thunder, also a cat purring, also lazing around — context!).
5. Voicing (゛) makes it bigger/heavier/dirtier: とんとん (light knock) → どんどん (pounding); さらさら (silky) → ざらざら (gritty).

In dialogue these behave like adverbs, usually with と or して: ドキドキする (to be nervous), こっそり入る (sneak in), ニヤニヤしながら (while smirking).

Reading payoff: SFX are drawn INTO the art, so OCR often misses them — your eyes have to know them. The next lessons are the canonical set.`,
      cards: [
        {
          front: '心臓がドキドキしてる。',
          reading: 'しんぞうがドキドキしてる。',
          back: 'My heart is pounding.',
          notes: 'ドキドキ + する — the verb form of an SFX.'
        },
        {
          front: '彼はニヤニヤしながら見てた。',
          reading: 'かれはニヤニヤしながらみてた。',
          back: 'He watched with a smirk.',
          notes: 'ニヤニヤ = smirking (creepy/sly nuance).'
        },
        {
          front: '雨がザーザー降ってる。',
          reading: 'あめがザーザーふってる。',
          back: "It's pouring rain.",
          notes: 'ザーザー — heavy continuous rain.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Impacts & action',
      cards: [
        { front: 'ドン', back: 'bang / boom / dramatic slam', pos: 'SFX', notes: 'THE impact sound. Also the "dramatic reveal" sting.' },
        { front: 'バン', back: 'bang (door, gunshot, table slap)', pos: 'SFX' },
        { front: 'ガン', back: 'clang (hard hit on metal/head)', pos: 'SFX', notes: 'ガーン (stretched) = the SHOCK effect — mental damage.' },
        { front: 'バキッ', back: 'crack (bone, punch connecting)', pos: 'SFX' },
        { front: 'ドカッ', back: 'thud (heavy blow landing)', pos: 'SFX' },
        { front: 'ズドン', back: 'heavy boom (cannon, big gun)', pos: 'SFX' },
        { front: 'ザシュッ', back: 'slash (blade through something)', pos: 'SFX' },
        { front: 'ビュン', back: 'whoosh (fast movement past)', pos: 'SFX', notes: 'ヒュン is lighter, ビュンビュン = whipping by repeatedly.' },
        { front: 'ドサッ', back: 'thump (body/bag hitting the floor)', pos: 'SFX' },
        { front: 'ガシャン', back: 'crash (glass/dishes breaking)', pos: 'SFX' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Atmosphere & silence',
      cards: [
        {
          front: 'シーン',
          back: 'dead silence',
          pos: 'SFX',
          notes: 'The most famous "sound of no sound". Awkward pauses, empty rooms.'
        },
        { front: 'ゴゴゴゴ', back: 'ominous rumbling menace', pos: 'SFX', notes: 'JoJo made it iconic — dread pressure in the air.' },
        { front: 'ザワザワ', back: 'crowd murmur / unease', pos: 'SFX', notes: 'Kaiji-style. A room full of nervous whispering.' },
        { front: 'ピリピリ', back: 'crackling tension / on edge', pos: 'SFX', notes: 'Also physical: spicy tingling, static.' },
        { front: 'キラキラ', back: 'sparkling, glittering', pos: 'SFX', notes: 'Shoujo aura, treasure, admiring eyes.' },
        { front: 'ドヨーン', back: 'gloomy heavy mood', pos: 'SFX', notes: 'The depressed-aura effect over a character\'s head.' },
        { front: 'ジメジメ', back: 'damp, humid, gloomy', pos: 'SFX' },
        { front: 'ヒュー', back: 'wind whistling (empty/cold scene)', pos: 'SFX', notes: 'Also the crowd going "woo!" — context.' },
        { front: 'メラメラ', back: 'flames blazing up (incl. burning passion)', pos: 'SFX' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Hearts & nerves',
      cards: [
        { front: 'ドキドキ', back: 'heart pounding (nerves, love)', pos: 'SFX', notes: 'ドキッ = a single skipped beat.' },
        { front: 'バクバク', back: 'heart hammering (fear, exertion)', pos: 'SFX' },
        { front: 'キュン', back: 'heart squeeze (moe / lovestruck pang)', pos: 'SFX', notes: '胸キュン — the "my heart!" moment.' },
        { front: 'ゾクゾク', back: 'shivers (fear or thrill)', pos: 'SFX', notes: 'ゾクッ = a single chill down the spine.' },
        { front: 'ワクワク', back: 'excited anticipation', pos: 'SFX' },
        { front: 'ウキウキ', back: 'buoyant, walking on air', pos: 'SFX' },
        { front: 'イライラ', back: 'irritated, ticked off', pos: 'SFX', notes: 'The pulsing anger vein (怒りマーク) in visual form.' },
        { front: 'ムカムカ', back: 'seething / queasy', pos: 'SFX', notes: 'ムカつく = "pisses me off" comes from this.' },
        { front: 'ハラハラ', back: 'watching anxiously (on the edge of your seat)', pos: 'SFX' },
        { front: 'ビクッ', back: 'flinch / startle', pos: 'SFX', notes: 'ビクビク = constantly jumpy, cowering.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Faces & reactions',
      cards: [
        { front: 'ニヤニヤ', back: 'smirking (sly, teasing)', pos: 'SFX', notes: 'ニヤリ = a single smirk. ニコニコ is the friendly one.' },
        { front: 'ニコニコ', back: 'beaming, smiling warmly', pos: 'SFX' },
        { front: 'ジロジロ', back: 'staring rudely', pos: 'SFX', notes: 'ジロッ = one sharp glare.' },
        { front: 'チラッ', back: 'a quick glance', pos: 'SFX', notes: 'チラチラ = repeated stolen glances (obvious ones).' },
        { front: 'ポカーン', back: 'dumbfounded, mouth open', pos: 'SFX' },
        { front: 'キョトン', back: 'blank puzzled blink', pos: 'SFX' },
        { front: 'ガーン', back: 'shock! (mental blow)', pos: 'SFX', notes: 'Drawn as vertical lines over the face.' },
        { front: 'ハッ', back: 'sudden realization / sharp gasp', pos: 'SFX' },
        { front: 'エヘヘ', back: 'sheepish giggle', pos: 'SFX', notes: 'ニヘラ, デレデレ — the lovestruck grins live nearby.' },
        { front: 'ウルウル', back: 'eyes welling up', pos: 'SFX' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Movement & sneaking',
      cards: [
        { front: 'ダッ', back: 'sudden dash', pos: 'SFX', notes: 'ダダダ = full sprint footsteps.' },
        { front: 'スタスタ', back: 'walking briskly (purposeful)', pos: 'SFX' },
        { front: 'トボトボ', back: 'trudging dejectedly', pos: 'SFX' },
        { front: 'ウロウロ', back: 'wandering aimlessly / loitering', pos: 'SFX' },
        { front: 'フラフラ', back: 'unsteady, wobbling (dizzy, exhausted)', pos: 'SFX', notes: 'ヨロヨロ = staggering, about to fall.' },
        { front: 'コソコソ', back: 'sneaking around (furtive)', pos: 'SFX', notes: 'こっそり = the adverb "in secret".' },
        { front: 'ソロソロ', back: 'moving slowly/carefully', pos: 'SFX', notes: 'Different from そろそろ "it\'s about time" — context!' },
        { front: 'ピョン', back: 'hop, boing', pos: 'SFX', notes: 'ピョンピョン = bouncing along (rabbits, genki girls).' },
        { front: 'スッ', back: 'smooth quiet motion (slides in/away)', pos: 'SFX' },
        { front: 'バタバタ', back: 'flailing / hectic running about', pos: 'SFX', notes: 'Also "busy": 今日はバタバタしてた.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Eating, drinking & sleeping',
      cards: [
        { front: 'パクパク', back: 'munching away', pos: 'SFX', notes: 'パクッ = one bite. パクリ too.' },
        { front: 'モグモグ', back: 'chewing (cheeks full)', pos: 'SFX' },
        { front: 'ゴクゴク', back: 'gulping a drink', pos: 'SFX', notes: 'ゴクリ／ゴクッ = one nervous gulp — tension scenes!' },
        { front: 'ペロペロ', back: 'licking', pos: 'SFX', notes: 'ペロッ = a quick lick (and the cheeky tongue-out face).' },
        { front: 'カリカリ', back: 'crunchy / crunching', pos: 'SFX', notes: 'Also = irritated, and cat kibble is カリカリ.' },
        { front: 'ペコペコ', back: 'starving (お腹ペコペコ)', pos: 'SFX', notes: 'ALSO bowing repeatedly (sucking up). Two meanings.' },
        { front: 'グーグー', back: 'snoring / stomach growling', pos: 'SFX', notes: 'グ〜 from the belly = hungry. From the futon = asleep.' },
        { front: 'スヤスヤ', back: 'sleeping peacefully', pos: 'SFX' },
        { front: 'ウトウト', back: 'nodding off', pos: 'SFX' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Textures & states (gitaigo in prose)',
      cards: [
        { front: 'ふわふわ', back: 'fluffy, floaty', pos: 'SFX', notes: 'Hair, clouds, pancakes, airheaded personalities.' },
        { front: 'つるつる', back: 'slippery smooth', pos: 'SFX' },
        { front: 'ざらざら', back: 'rough, gritty', pos: 'SFX' },
        { front: 'ぴかぴか', back: 'shiny, polished, brand-new', pos: 'SFX' },
        { front: 'びしょびしょ', back: 'soaking wet', pos: 'SFX', notes: 'ずぶ濡れ is the plain word; びしょ濡れ mixes them.' },
        { front: 'ぼろぼろ', back: 'worn out, falling apart', pos: 'SFX', notes: 'Clothes, buildings, AND people after a fight.' },
        { front: 'ぐちゃぐちゃ', back: 'squishy mess / in chaos', pos: 'SFX', notes: 'Mud, crushed food, a room, someone\'s feelings.' },
        { front: 'ぎりぎり', back: 'just barely (at the limit)', pos: 'SFX', notes: 'ぎりぎりセーフ — safe by a hair!' },
        { front: 'たっぷり', back: 'plenty, generously', pos: 'SFX' },
        { front: 'こんがり', back: 'toasted golden-brown', pos: 'SFX' }
      ]
    }
  ]
}

export const SPEECH_COURSE: SeedCourse = {
  title: 'Speech Styles & Role Language',
  description:
    'Who is speaking? In Japanese fiction the words themselves tell you: pronouns, name suffixes, ' +
    'family terms and sentence endings all encode age, class, gender and attitude (役割語 — role language). ' +
    'This goes deeper than the Manga & VN courses: archetype by archetype.',
  level: 'N4+',
  difficulty: 17,
  lessons: [
    {
      kind: 'vocab',
      title: 'First-person pronouns: what "I" says about you',
      cards: [
        {
          front: '私',
          reading: 'わたし',
          back: 'neutral-polite "I" (default for women; formal for men)',
          pos: 'pronoun',
          notes: 'わたくし = ultra-formal (butlers, nobility, business).'
        },
        {
          front: '僕',
          reading: 'ぼく',
          back: 'soft masculine "I" (boys, gentle men)',
          pos: 'pronoun',
          notes: 'A 僕 user is polite, bookish or young. ボクっ娘 = girl who uses 僕.'
        },
        {
          front: '俺',
          reading: 'おれ',
          back: 'rough masculine "I" (casual, assertive)',
          pos: 'pronoun',
          notes: 'The shounen protagonist default. Rude in formal settings.'
        },
        {
          front: 'あたし',
          reading: 'あたし',
          back: 'casual feminine "I"',
          pos: 'pronoun',
          notes: 'Relaxed わたし. あたい = downtown/brash variant.'
        },
        {
          front: 'うち',
          reading: 'うち',
          back: 'casual feminine "I" (Kansai flavor); also "our house/family"',
          pos: 'pronoun'
        },
        {
          front: 'わし',
          reading: 'わし',
          back: 'old man "I"',
          pos: 'pronoun',
          notes: 'Role language: ANY elderly character, plus Hiroshima dialect.'
        },
        {
          front: '拙者',
          reading: 'せっしゃ',
          back: 'samurai "I" (humble)',
          pos: 'pronoun',
          notes: 'Period drama / ninja speech. Pairs with 〜でござる.'
        },
        {
          front: '我',
          reading: 'われ',
          back: 'archaic/grand "I" (gods, demon lords, poetry)',
          pos: 'pronoun',
          notes: '我々 (われわれ) = "we" in speeches and villain organizations.'
        },
        {
          front: '俺様',
          reading: 'おれさま',
          back: '"I, the great me" — arrogant villain/rival "I"',
          pos: 'pronoun',
          notes: 'Self-applied 様. Instant characterization.'
        },
        {
          front: '自分',
          reading: 'じぶん',
          back: '"oneself"; military/sports "I"; Kansai "you"(!)',
          pos: 'pronoun',
          notes: 'Stoic soldiers say 自分は. In Kansai dialect it can mean YOU — context.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Second person: from polite to fighting words',
      cards: [
        {
          front: 'あなた',
          reading: 'あなた',
          back: '"you" (neutral-polite; wives → husbands: "dear")',
          pos: 'pronoun',
          notes: 'Real Japanese avoids "you" — use the name + さん instead.'
        },
        {
          front: '君',
          reading: 'きみ',
          back: '"you" (soft, to equals/juniors; songs & romance)',
          pos: 'pronoun'
        },
        {
          front: 'お前',
          reading: 'おまえ',
          back: '"you" (blunt male speech — buddies or hostility)',
          pos: 'pronoun',
          notes: 'Between friends = rough warmth. To a stranger = provocation.'
        },
        {
          front: 'あんた',
          reading: 'あんた',
          back: '"you" (casual, often exasperated; tsundere staple)',
          pos: 'pronoun'
        },
        {
          front: '貴様',
          reading: 'きさま',
          back: '"you" (hostile — pre-fight)',
          pos: 'pronoun',
          notes: 'Once respectful, now pure venom. 貴様ら = "you lot".'
        },
        {
          front: 'てめえ',
          reading: 'てめえ',
          back: '"you" (thug speech — maximum aggression)',
          pos: 'pronoun',
          notes: 'From 手前. てめぇ…！ = the growl before a punch.'
        },
        {
          front: 'お主',
          reading: 'おぬし',
          back: '"you" (archaic — old masters, samurai)',
          pos: 'pronoun'
        },
        {
          front: 'そなた',
          reading: 'そなた',
          back: '"you" (archaic, gentle — royalty addressing subjects)',
          pos: 'pronoun'
        },
        {
          front: '呼び捨て',
          reading: 'よびすて',
          back: 'calling someone by bare name, no suffix',
          pos: 'concept',
          notes: 'Intimacy or disrespect. The FIRST TIME a character drops the suffix is always a moment.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Name suffixes & titles',
      cards: [
        {
          front: '〜さん',
          back: 'neutral-polite suffix (the safe default)',
          pos: 'suffix'
        },
        {
          front: '〜くん',
          back: 'for boys/juniors; offices use it for staff of any gender',
          pos: 'suffix'
        },
        {
          front: '〜ちゃん',
          back: 'affectionate diminutive (kids, close friends, pets)',
          pos: 'suffix',
          notes: 'An adult man called 〜ちゃん by everyone = comic relief marker.'
        },
        {
          front: '〜様',
          reading: 'さま',
          back: 'exalted suffix (customers, gods, nobles)',
          pos: 'suffix',
          notes: 'お客様, 神様. Self-use (俺様) = arrogance.'
        },
        {
          front: '〜殿',
          reading: 'どの',
          back: 'formal/archaic suffix (documents, samurai)',
          pos: 'suffix',
          notes: 'In fantasy: knights addressing each other.'
        },
        {
          front: '〜氏',
          reading: 'し',
          back: 'news/report suffix ("Mr./Ms." in print); otaku slang between nerds',
          pos: 'suffix'
        },
        {
          front: '先輩',
          reading: 'せんぱい',
          back: 'senior (school/work) — used AS a name suffix too',
          pos: 'title',
          notes: '後輩 (こうはい) = junior; rarely used as a suffix.'
        },
        {
          front: '先生',
          reading: 'せんせい',
          back: 'teacher / doctor / author / artist',
          pos: 'title',
          notes: 'Mangaka are 先生. So are shady politicians — flattery.'
        },
        {
          front: '師匠',
          reading: 'ししょう',
          back: 'master (of a craft or martial art)',
          pos: 'title'
        },
        {
          front: '陛下・殿下',
          reading: 'へいか・でんか',
          back: 'Your Majesty / Your Highness',
          pos: 'title',
          notes: 'Fantasy court speech: 国王陛下, 王女殿下.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Family terms across registers',
      cards: [
        {
          front: 'お母さん／母／ママ',
          reading: 'おかあさん・はは',
          back: 'mom (neutral) / my mother (humble, to outsiders) / mommy',
          pos: 'family',
          notes: '母上 (ははうえ) = archaic-noble; おふくろ = gruff male "ma".'
        },
        {
          front: 'お父さん／父／パパ',
          reading: 'おとうさん・ちち',
          back: 'dad / my father (humble) / daddy',
          pos: 'family',
          notes: '父上 = noble; おやじ = "my old man" (rough affection); 親父 also = middle-aged guy.'
        },
        {
          front: 'お兄ちゃん',
          reading: 'おにいちゃん',
          back: 'big brother (affectionate)',
          pos: 'family',
          notes: 'The register ladder: お兄ちゃん→お兄さん→兄さん→兄貴→兄上. Little-sister characters are DEFINED by which one they use.'
        },
        {
          front: '兄貴',
          reading: 'あにき',
          back: 'big bro (rough) — also gang senior!',
          pos: 'family',
          notes: 'Yakuza films: アニキ. 姉御 (あねご) = female equivalent.'
        },
        {
          front: 'お姉ちゃん',
          reading: 'おねえちゃん',
          back: 'big sister (affectionate)',
          pos: 'family',
          notes: 'お姉さん also = "young woman" politely. 姉上 = noble.'
        },
        {
          front: 'おじいちゃん／じじい',
          reading: 'おじいちゃん・じじい',
          back: 'grandpa / old geezer (RUDE)',
          pos: 'family',
          notes: 'くそじじい = the classic bratty insult. ばばあ for old women — equally rude.'
        },
        {
          front: 'おばあちゃん',
          reading: 'おばあちゃん',
          back: 'grandma',
          pos: 'family',
          notes: 'おばさん (aunt/ma\'am) vs おばあさん (grandma) — one vowel of danger.'
        },
        {
          front: '姉妹・兄弟',
          reading: 'しまい・きょうだい',
          back: 'sisters / siblings (brothers)',
          pos: 'family',
          notes: '兄弟 covers mixed siblings in speech.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'お嬢様 speech: refined & fancy',
      body: `The rich-girl archetype (お嬢様) has a whole grammar:

・Sentence-final わ（＋よ／ね）: 存じませんわ, 素敵ですわね — refined feminine emphasis (in Kansai dialect men also use わ, differently!)
・〜ですこと / 〜ますこと: よくお出来になりましたこと — ornate exclamation
・〜(さ)せていただきますわ — over-polite volition
・ごきげんよう — hello AND goodbye, aristocrat edition
・わたくし as "I", plus お/ご on almost every noun

The laugh is part of the kit: おほほほ (o-hohoho).

Real-life note: almost nobody talks like this today — it's pure role language, which is exactly why fiction leans on it. One ですわ and the reader knows the character's whole wardrobe.`,
      cards: [
        {
          front: 'ごきげんよう、皆様。',
          reading: 'ごきげんよう、みなさま。',
          back: 'Good day, everyone. (aristocratic)',
          notes: 'Greeting AND farewell.'
        },
        {
          front: 'そんなこと、存じませんわ。',
          reading: 'そんなこと、ぞんじませんわ。',
          back: "I wouldn't know anything about that. (refined)",
          notes: '存じる = humble 知る; final わ = refined feminine.'
        },
        {
          front: 'まあ、素敵ですわね。',
          reading: 'まあ、すてきですわね。',
          back: 'My, how lovely.',
          notes: 'まあ — the refined gasp.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'Elders, samurai & period drama',
      body: `Two archetypes share a shelf:

The ELDER (老人語): わし as "I", sentence-final じゃ instead of だ, 〜んじゃ, 〜じゃろう (=だろう), plus 〜ておる (=ている) and 〜ぬ negatives:
知らんのじゃ = 知らないんだ。 わしが育てた = I raised him (every old master ever).

The SAMURAI (時代劇): 拙者 as "I", お主/そなた as "you", ござる as the be-verb: 〜でござる (=です), and negatives in 〜ぬ/〜せぬ: 許せぬ！ (unforgivable!). かたじけない = thank you/much obliged. 〜まする = extra-humble ます.

Note the overlap with N1 literary grammar (ぬ, まじき, べし) — period speech IS old grammar fossilized into character voice. Rurouni Kenshin's ござる, every isekai king's のじゃ, every hermit master's わし: once you hear the pattern, you can't unhear it.`,
      cards: [
        {
          front: 'わしはもう年じゃ。',
          reading: 'わしはもうとしじゃ。',
          back: "I'm old now. (elder speech)",
          notes: 'じゃ = だ.'
        },
        {
          front: '拙者は浪人でござる。',
          reading: 'せっしゃはろうにんでござる。',
          back: 'I am a masterless samurai. (samurai speech)',
          notes: 'でござる = です.'
        },
        {
          front: 'それは許せぬ！',
          reading: 'それはゆるせぬ！',
          back: 'That I cannot forgive! (archaic negative)',
          notes: 'ぬ = ない — dramatic, archaic.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'Rough speech & fight scenes',
      body: `The escalation ladder of delinquent Japanese:

・Vowel crushing: すごい→すげえ, うるさい→うるせえ, 分からない→わかんねえ. The えぇ ending is the sound of not caring.
・ぶっ〜/ぶん〜 prefix = violent intensifier: ぶっ飛ばす (send flying), ぶん殴る (deck someone), ぶっ壊す (smash up).
・〜やがる = contempt for someone's action: 逃げやがった (the bastard ran).
・Threat set phrases: なめんな(よ) (don't underestimate me — from なめる "to lick/look down on"), やんのか？ (you wanna go?), 上等だ (bring it on), ぶっ殺す (I'll kill you — stock threat).
・Confrontation particles: だと？ (what did you just say?), ああ？ (rising "aa?" — pure menace).

Grammar-wise it's all contractions of things you know: なめるな→なめんな, やるのか→やんのか. The roughness is in the compression.`,
      cards: [
        {
          front: 'なめんなよ！',
          reading: 'なめんなよ！',
          back: "Don't you look down on me!",
          notes: 'なめる + な (prohibitive), crushed.'
        },
        {
          front: 'てめえ、ぶっ飛ばすぞ！',
          reading: 'てめえ、ぶっとばすぞ！',
          back: "I'll send you flying, punk!",
          notes: 'ぶっ〜 intensifier + ぞ.'
        },
        {
          front: '逃げやがったな。',
          reading: 'にげやがったな。',
          back: 'The bastard ran.',
          notes: 'やがる — contempt auxiliary.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'Polite menace & command styles',
      body: `Commands come in ranks — and fiction plays them against type:

・〜ろ/〜え (imperative): 待て！ 死ね！ — raw orders (military, fights)
・〜なさい: 座りなさい — parental/teacher authority
・〜たまえ: 入りたまえ — condescending permission from above (old-fashioned bosses, mad scientists)
・〜てくれるかな？ — "would you kindly?" — creepy when the power differential is obvious
・お〜ください: お座りください — service politeness

Then the villain specialty: 慇懃無礼 (いんぎんぶれい) — polite words, insolent intent. A villain in flawless 敬語 (ございます, いたします, 〜ていただけますか) while doing something horrible reads as MORE menacing than any てめえ. The politeness signals total control.

Reading payoff: register whiplash = characterization. The moment a soft-spoken character switches from です/ます to plain form (or the reverse) is always deliberate.`,
      cards: [
        {
          front: '入りたまえ。',
          reading: 'はいりたまえ。',
          back: 'You may enter. (condescending)',
          notes: 'たまえ — superiors granting permission.'
        },
        {
          front: 'そろそろ死んでいただけますか？',
          reading: 'そろそろしんでいただけますか？',
          back: 'Would you kindly die now? (polite menace)',
          notes: '慇懃無礼 — flawless keigo, horrifying content.'
        },
        {
          front: '座りなさい。',
          reading: 'すわりなさい。',
          back: 'Sit down. (parental authority)',
          notes: 'なさい — firm but not vulgar.'
        }
      ]
    }
  ]
}

export const IDIOMS_COURSE: SeedCourse = {
  title: 'Idioms & Set Phrases (慣用句)',
  description:
    'Expressions whose meaning you cannot assemble from the words: the 気 family, body-part idioms, ' +
    'battle-scene set phrases, four-character idioms (四字熟語) and the proverbs fiction quotes. ' +
    'These read as single units — learn them as units and dialogue speeds up dramatically.',
  level: 'N3–N2',
  difficulty: 22,
  lessons: [
    {
      kind: 'vocab',
      title: 'The 気 system',
      cards: [
        {
          front: '気になる',
          reading: 'きになる',
          back: 'to weigh on your mind / be curious about',
          pos: 'idiom',
          notes: 'あの人が気になる — "I can\'t stop thinking about them" (crush flag).'
        },
        {
          front: '気にする',
          reading: 'きにする',
          back: 'to worry about / let it bother you',
          pos: 'idiom',
          notes: '気にするな！ = don\'t worry about it. なる happens TO you; する you do.'
        },
        {
          front: '気がする',
          reading: 'きがする',
          back: 'to have a feeling that…',
          pos: 'idiom',
          notes: '見たことある気がする — I feel like I\'ve seen this before.'
        },
        {
          front: '気がつく',
          reading: 'きがつく',
          back: 'to notice / come to (regain consciousness)',
          pos: 'idiom',
          notes: '気がついたら病院だった — classic post-battle wake-up line.'
        },
        {
          front: '気をつける',
          reading: 'きをつける',
          back: 'to be careful',
          pos: 'idiom',
          notes: '気をつけて！ — look out! / take care!'
        },
        {
          front: '気に入る',
          reading: 'きにいる',
          back: 'to take a liking to',
          pos: 'idiom',
          notes: '気に入った！ — villain-recruiting-the-hero line.'
        },
        {
          front: '気が済む',
          reading: 'きがすむ',
          back: 'to be satisfied (feel closure)',
          pos: 'idiom',
          notes: '気が済んだか？ — feel better now? (after someone vents)'
        },
        {
          front: '気のせい',
          reading: 'きのせい',
          back: 'just your imagination',
          pos: 'idiom',
          notes: '気のせいか…… — horror-manga staple before things get bad.'
        },
        {
          front: '気が向く',
          reading: 'きがむく',
          back: 'to feel like it (whim)',
          pos: 'idiom',
          notes: '気が向いたらね — "if I feel like it" (aloof characters).'
        },
        {
          front: '気を失う',
          reading: 'きをうしなう',
          back: 'to lose consciousness',
          pos: 'idiom'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Body idioms I: eyes, mouth, ears',
      cards: [
        {
          front: '目がない',
          reading: 'めがない',
          back: 'to have a weakness for (love something)',
          pos: 'idiom',
          notes: '甘いものに目がない — helpless before sweets.'
        },
        {
          front: '目を通す',
          reading: 'めをとおす',
          back: 'to look over (a document)',
          pos: 'idiom'
        },
        {
          front: '目に入る',
          reading: 'めにはいる',
          back: 'to catch one\'s eye',
          pos: 'idiom'
        },
        {
          front: '目を離す',
          reading: 'めをはなす',
          back: 'to take one\'s eyes off',
          pos: 'idiom',
          notes: '目を離した隙に — "the moment I looked away…" (disaster setup).'
        },
        {
          front: '口が悪い',
          reading: 'くちがわるい',
          back: 'to have a sharp tongue',
          pos: 'idiom',
          notes: 'The tsundere diagnosis: 口は悪いけど、いい人.'
        },
        {
          front: '口を出す',
          reading: 'くちをだす',
          back: 'to butt in (with opinions)',
          pos: 'idiom'
        },
        {
          front: '口が堅い',
          reading: 'くちがかたい',
          back: 'tight-lipped (keeps secrets)',
          pos: 'idiom',
          notes: '口が軽い = can\'t keep a secret — the opposite.'
        },
        {
          front: '耳にする',
          reading: 'みみにする',
          back: 'to happen to hear',
          pos: 'idiom',
          notes: '噂を耳にした — I heard a rumor.'
        },
        {
          front: '耳が痛い',
          reading: 'みみがいたい',
          back: 'painful to hear (because it\'s true)',
          pos: 'idiom'
        },
        {
          front: '耳を貸す',
          reading: 'みみをかす',
          back: 'to lend an ear',
          pos: 'idiom',
          notes: '誰も耳を貸さなかった — nobody would listen.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Body idioms II: hands, feet, belly, head',
      cards: [
        {
          front: '手に入れる',
          reading: 'てにいれる',
          back: 'to obtain / get one\'s hands on',
          pos: 'idiom',
          notes: 'ついに手に入れた！ — treasure-get line. 手に入る = to come into one\'s possession.'
        },
        {
          front: '手が出ない',
          reading: 'てがでない',
          back: 'out of reach (too expensive / too strong)',
          pos: 'idiom'
        },
        {
          front: 'お手上げ',
          reading: 'おてあげ',
          back: 'to give up (hands in the air)',
          pos: 'idiom',
          notes: 'もうお手上げだ — I\'m out of options.'
        },
        {
          front: '手を貸す',
          reading: 'てをかす',
          back: 'to lend a hand',
          pos: 'idiom',
          notes: '力を貸す = lend one\'s strength (more dramatic).'
        },
        {
          front: '足を運ぶ',
          reading: 'あしをはこぶ',
          back: 'to go somewhere (make the trip)',
          pos: 'idiom'
        },
        {
          front: '足手まとい',
          reading: 'あしでまとい',
          back: 'dead weight / a burden (in a fight)',
          pos: 'idiom',
          notes: '足手まといになりたくない — party-member angst, every adventure story.'
        },
        {
          front: '腹が立つ',
          reading: 'はらがたつ',
          back: 'to get angry',
          pos: 'idiom',
          notes: '腹立つ〜！ in casual speech.'
        },
        {
          front: '腹をくくる',
          reading: 'はらをくくる',
          back: 'to steel oneself / accept what\'s coming',
          pos: 'idiom'
        },
        {
          front: '頭にくる',
          reading: 'あたまにくる',
          back: 'to lose one\'s temper',
          pos: 'idiom'
        },
        {
          front: '顔が広い',
          reading: 'かおがひろい',
          back: 'well-connected (knows everyone)',
          pos: 'idiom'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Battle & story set phrases',
      cards: [
        {
          front: '手加減する',
          reading: 'てかげんする',
          back: 'to hold back / go easy on',
          pos: 'idiom',
          notes: '手加減しないぞ — I won\'t go easy on you.'
        },
        {
          front: '本気を出す',
          reading: 'ほんきをだす',
          back: 'to get serious / stop holding back',
          pos: 'idiom',
          notes: 'こっちも本気を出すか…… — the power-up cue.'
        },
        {
          front: '油断する',
          reading: 'ゆだんする',
          back: 'to drop one\'s guard',
          pos: 'idiom',
          notes: '油断するな！ — stay sharp! 油断大敵 = carelessness is the great enemy.'
        },
        {
          front: '命をかける',
          reading: 'いのちをかける',
          back: 'to stake one\'s life on',
          pos: 'idiom',
          notes: '命がけで守る — protect with one\'s life.'
        },
        {
          front: '覚悟を決める',
          reading: 'かくごをきめる',
          back: 'to resolve oneself / accept the consequences',
          pos: 'idiom',
          notes: '覚悟しろ！ — prepare yourself! (attacker); 覚悟の上だ — I knew the cost.'
        },
        {
          front: '一か八か',
          reading: 'いちかばちか',
          back: 'all or nothing / a gamble',
          pos: 'idiom',
          notes: '一か八かやってみる — bet it all on one move.'
        },
        {
          front: '相手にならない',
          reading: 'あいてにならない',
          back: 'to be no match',
          pos: 'idiom',
          notes: 'お前じゃ相手にならない — you\'re not worth fighting.'
        },
        {
          front: 'とどめを刺す',
          reading: 'とどめをさす',
          back: 'to deliver the finishing blow',
          pos: 'idiom',
          notes: 'とどめだ！ — the finisher call.'
        },
        {
          front: '勝負あり',
          reading: 'しょうぶあり',
          back: 'match decided! (referee call)',
          pos: 'idiom'
        },
        {
          front: '足を洗う',
          reading: 'あしをあらう',
          back: 'to go straight / leave a shady life',
          pos: 'idiom',
          notes: 'Yakuza stories: この稼業から足を洗う.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Four-character idioms (四字熟語)',
      cards: [
        {
          front: '絶体絶命',
          reading: 'ぜったいぜつめい',
          back: 'cornered with no way out / desperate situation',
          pos: '四字熟語',
          notes: 'Chapter-title favorite: 絶体絶命のピンチ.'
        },
        {
          front: '一石二鳥',
          reading: 'いっせきにちょう',
          back: 'two birds with one stone',
          pos: '四字熟語'
        },
        {
          front: '自業自得',
          reading: 'じごうじとく',
          back: 'you reap what you sow / serves you right',
          pos: '四字熟語',
          notes: 'Buddhist origin — your own karma coming home.'
        },
        {
          front: '正々堂々',
          reading: 'せいせいどうどう',
          back: 'fair and square (openly, honorably)',
          pos: '四字熟語',
          notes: '正々堂々と勝負しろ！ — fight me fairly!'
        },
        {
          front: '単刀直入',
          reading: 'たんとうちょくにゅう',
          back: 'straight to the point',
          pos: '四字熟語',
          notes: 'Literally "single sword, direct entry".'
        },
        {
          front: '半信半疑',
          reading: 'はんしんはんぎ',
          back: 'half believing, half doubting',
          pos: '四字熟語'
        },
        {
          front: '疑心暗鬼',
          reading: 'ぎしんあんき',
          back: 'paranoia — suspicion breeding demons in the dark',
          pos: '四字熟語',
          notes: 'Death-game manga fuel.'
        },
        {
          front: '無我夢中',
          reading: 'むがむちゅう',
          back: 'losing yourself completely in something',
          pos: '四字熟語',
          notes: '無我夢中で走った — I ran without thinking of anything.'
        },
        {
          front: '優柔不断',
          reading: 'ゆうじゅうふだん',
          back: 'indecisive (as a character flaw)',
          pos: '四字熟語',
          notes: 'The harem-protagonist accusation.'
        },
        {
          front: '以心伝心',
          reading: 'いしんでんしん',
          back: 'understanding without words (hearts in sync)',
          pos: '四字熟語'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Proverbs fiction actually quotes',
      cards: [
        {
          front: '猿も木から落ちる',
          reading: 'さるもきからおちる',
          back: 'even monkeys fall from trees (experts fail too)',
          pos: 'ことわざ'
        },
        {
          front: '七転び八起き',
          reading: 'ななころびやおき',
          back: 'fall seven times, get up eight',
          pos: 'ことわざ',
          notes: 'THE perseverance proverb — sports manga scripture.'
        },
        {
          front: '急がば回れ',
          reading: 'いそがばまわれ',
          back: 'more haste, less speed (the long way is faster)',
          pos: 'ことわざ'
        },
        {
          front: '花より団子',
          reading: 'はなよりだんご',
          back: 'dumplings over flowers (substance over beauty)',
          pos: 'ことわざ',
          notes: 'Punned into 花より男子 (Boys Over Flowers).'
        },
        {
          front: '蛙の子は蛙',
          reading: 'かえるのこはかえる',
          back: 'the frog\'s child is a frog (like parent, like child)',
          pos: 'ことわざ',
          notes: 'Often resented by characters escaping their parents\' shadow.'
        },
        {
          front: '二兎を追う者は一兎をも得ず',
          reading: 'にとをおうものはいっとをもえず',
          back: 'chase two rabbits, catch neither',
          pos: 'ことわざ'
        },
        {
          front: '継続は力なり',
          reading: 'けいぞくはちからなり',
          back: 'persistence is power',
          pos: 'ことわざ',
          notes: 'なり = archaic だ — proverbs preserve old grammar.'
        },
        {
          front: '住めば都',
          reading: 'すめばみやこ',
          back: 'anywhere feels like home once you live there',
          pos: 'ことわざ'
        },
        {
          front: '口は災いの元',
          reading: 'くちはわざわいのもと',
          back: 'the mouth is the source of disaster (loose lips)',
          pos: 'ことわざ'
        },
        {
          front: '井の中の蛙',
          reading: 'いのなかのかわず',
          back: 'a frog in a well (knows nothing of the ocean)',
          pos: 'ことわざ',
          notes: 'Full: 井の中の蛙大海を知らず. The arrogant-prodigy takedown.'
        }
      ]
    }
  ]
}
