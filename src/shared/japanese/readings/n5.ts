import type { JpPassage } from '../types'

// N5 graded reading passages. Keys FROZEN. Rules in ../types.ts and
// tests/jpReadings.test.ts — every kanji run carries a reading, 4 questions,
// 3-6 glossary entries whose words occur in the stripped text.
export const N5_PASSAGES: JpPassage[] = [
  {
    key: 'n5-01-konbini',
    title: 'コンビニで買[か]い物[もの]',
    level: 'N5',
    topic: 'Daily life',
    text:
      '今日[きょう]はコンビニに行[い]きました。おにぎりを二[ふた]つとお茶[ちゃ]を一本[いっぽん]買[か]いました。店員[てんいん]さんが「あたためますか」と聞[き]きました。私[わたし]は「はい、お願[ねが]いします」と言[い]いました。ぜんぶで六百円[ろっぴゃくえん]でした。安[やす]いです。\n' +
      '明日[あした]も朝[あさ]ごはんを買[か]いに行[い]きます。',
    questions: [
      {
        prompt: 'What did the writer buy at the convenience store?',
        kind: 'detail',
        options: [
          'A hot bento and a coffee',
          'Bread, milk and a magazine',
          'Rice balls and tea',
          'A cake for a friend'
        ],
        correct: 2,
        explain:
          'The second sentence lists おにぎりを二つとお茶を一本 — two rice balls and one bottle of tea.'
      },
      {
        prompt: "The staff member's question uses a verb meaning 'to warm'. What is being offered?",
        kind: 'vocab',
        options: [
          'Heating the food up',
          'Putting everything in a paper bag',
          'A point card',
          'A receipt'
        ],
        correct: 0,
        explain:
          'あたためる means to warm something up, and the writer answers はい、お願いします — yes, please.'
      },
      {
        prompt: 'What is this passage mainly about?',
        kind: 'main-idea',
        options: [
          'A part-time job at a shop',
          'Cooking dinner at home',
          'A trip to another city',
          'A short shopping trip'
        ],
        correct: 3,
        explain:
          'Every sentence is about walking to the konbini, buying a few things and paying ぜんぶで六百円 — one small errand.'
      },
      {
        prompt: 'Why will the writer go to the shop again tomorrow?',
        kind: 'inference',
        options: [
          'The rice balls were not fresh',
          'To buy something for breakfast',
          'To return the tea',
          'Because the shop is closed today'
        ],
        correct: 1,
        explain: 'The last line says 明日も朝ごはんを買いに行きます — the trip is for breakfast food.'
      }
    ],
    glossary: [
      { word: '店員', reading: 'てんいん', gloss: 'shop staff' },
      { word: 'お茶', reading: 'おちゃ', gloss: 'tea' },
      { word: 'お願いします', reading: 'おねがいします', gloss: 'yes please; I ask you' },
      { word: '六百円', reading: 'ろっぴゃくえん', gloss: '600 yen' },
      { word: '朝ごはん', reading: 'あさごはん', gloss: 'breakfast' },
      { word: '安い', reading: 'やすい', gloss: 'cheap' }
    ]
  },
  {
    key: 'n5-02-densha-okure',
    title: '電車[でんしゃ]がおくれた朝[あさ]',
    level: 'N5',
    topic: 'Travel',
    text:
      '金曜日[きんようび]の朝[あさ]、私[わたし]は駅[えき]へ行[い]きました。でも、電車[でんしゃ]が来[き]ません。駅[えき]のアナウンスは「電車[でんしゃ]は十五分[じゅうごふん]おくれます」と言[い]いました。\n' +
      '会社[かいしゃ]に電話[でんわ]をして、「少[すこ]しおくれます」とつたえました。電車[でんしゃ]の中[なか]はとても人[ひと]が多[おお]かったです。つかれましたが、間[ま]に合[あ]いました。',
    questions: [
      {
        prompt: 'How late was the train?',
        kind: 'detail',
        options: ['Five minutes', 'Fifteen minutes', 'Fifty minutes', 'It was cancelled'],
        correct: 1,
        explain: 'The station announcement says 電車は十五分おくれます — fifteen minutes late.'
      },
      {
        prompt: 'What did the writer do after hearing the announcement?',
        kind: 'detail',
        options: [
          'Took a taxi instead',
          'Went back home',
          'Waited without telling anyone',
          'Called the office'
        ],
        correct: 3,
        explain:
          '会社に電話をして、「少しおくれます」とつたえました — the writer phoned work to warn them.'
      },
      {
        prompt: 'The set phrase that closes the passage tells us that the writer',
        kind: 'vocab',
        options: ['arrived in time', 'missed the train', 'took the wrong line', 'left work early'],
        correct: 0,
        explain:
          '間に合う means to make it on time; it follows つかれましたが, so the tiring trip still ended well.'
      },
      {
        prompt: 'What was the inside of the train like?',
        kind: 'inference',
        options: ['Empty and quiet', 'Warm and comfortable', 'Very crowded', 'Not moving at all'],
        correct: 2,
        explain: '電車の中はとても人が多かったです says there were very many people inside.'
      }
    ],
    glossary: [
      { word: '駅', reading: 'えき', gloss: 'station' },
      { word: '電車', reading: 'でんしゃ', gloss: 'train' },
      { word: '会社', reading: 'かいしゃ', gloss: 'company, workplace' },
      { word: 'おくれます', reading: 'おくれます', gloss: 'to be late, to be delayed' },
      { word: '間に合いました', reading: 'まにあいました', gloss: 'made it in time' }
    ]
  },
  {
    key: 'n5-03-tomodachi-messeji',
    title: '六時[ろくじ]に駅[えき]で',
    level: 'N5',
    topic: 'Messages',
    text:
      'ゆうこ「明日[あした]、映画[えいが]を見[み]に行[い]きませんか」\n' +
      'けん「いいですね。何時[なんじ]からですか」\n' +
      'ゆうこ「三時[さんじ]からです。駅[えき]の前[まえ]で会[あ]いましょう」\n' +
      'けん「すみません、三時[さんじ]はアルバイトです。六時[ろくじ]はどうですか」\n' +
      'ゆうこ「わかりました。じゃあ、六時[ろくじ]に駅[えき]で」',
    questions: [
      {
        prompt: 'What does Yuko invite Ken to do?',
        kind: 'detail',
        options: [
          'See a movie',
          'Study together',
          'Go to a concert in the park',
          'Eat lunch at her house'
        ],
        correct: 0,
        explain: 'Her first message is 明日、映画を見に行きませんか — an invitation to see a film.'
      },
      {
        prompt: 'Ken gives his reason for being busy at three in katakana. What does it mean?',
        kind: 'vocab',
        options: ['A club activity', 'A cinema ticket', 'A part-time job', 'A train pass'],
        correct: 2,
        explain: 'アルバイト is a part-time job, so Ken is working at three and cannot meet then.'
      },
      {
        prompt: 'What time do they finally decide to meet?',
        kind: 'detail',
        options: ["Three o'clock", "Six o'clock", "Five o'clock", 'They did not decide'],
        correct: 1,
        explain: 'Ken asks 六時はどうですか and Yuko answers わかりました。じゃあ、六時に駅で.'
      },
      {
        prompt: 'Where will the two of them most likely meet?',
        kind: 'inference',
        options: [
          "At Yuko's house",
          'Inside the cinema',
          'At the place where Ken works part time',
          'In front of the station'
        ],
        correct: 3,
        explain:
          'Yuko says 駅の前で会いましょう and repeats 六時に駅で at the end, so the station is the meeting point.'
      }
    ],
    glossary: [
      { word: '映画', reading: 'えいが', gloss: 'film, movie' },
      { word: '何時', reading: 'なんじ', gloss: 'what time' },
      { word: 'アルバイト', reading: 'アルバイト', gloss: 'part-time job' },
      { word: '会いましょう', reading: 'あいましょう', gloss: "let's meet" },
      { word: '前', reading: 'まえ', gloss: 'front, in front of' }
    ]
  },
  {
    key: 'n5-04-game-tutorial',
    title: 'ゲームの使[つか]い方[かた]',
    level: 'N5',
    topic: 'Games',
    text:
      'ゲームをはじめると、さいしょに使[つか]い方[かた]が出[で]ます。\n' +
      '「左[ひだり]のボタンで歩[ある]きます。右[みぎ]のボタンでたたかいます」\n' +
      '「体力[たいりょく]が少[すく]ない時[とき]は、赤[あか]いくすりを飲[の]んでください」\n' +
      '「セーブは村[むら]の中[なか]でできます」\n' +
      '私[わたし]は三十分[さんじゅっぷん]で使[つか]い方[かた]を覚[おぼ]えました。今[いま]から新[あたら]しい世界[せかい]へ行[い]きます。',
    questions: [
      {
        prompt: 'Which button is used to fight?',
        kind: 'detail',
        options: [
          'The left one',
          'The one in the village',
          'No button, it happens automatically',
          'The right one'
        ],
        correct: 3,
        explain: '右のボタンでたたかいます — the right button fights, the left one walks.'
      },
      {
        prompt: 'What should the player do when their health is low?',
        kind: 'detail',
        options: [
          'Save the game',
          'Drink the red medicine',
          'Go back to the village',
          'Press both buttons'
        ],
        correct: 1,
        explain:
          '体力が少ない時は、赤いくすりを飲んでください tells the player to drink the red medicine.'
      },
      {
        prompt: 'The passage uses a katakana word for storing your progress. Which English word is it from?',
        kind: 'vocab',
        options: ['Start', 'Select', 'Save', 'Server'],
        correct: 2,
        explain: 'セーブ is English "save" in katakana, and the line says it is possible in the village.'
      },
      {
        prompt: 'What is the writer doing in this passage?',
        kind: 'main-idea',
        options: [
          'Learning how to play a new game',
          'Writing a review of a game',
          'Teaching a friend how to use the controls',
          'Buying a game at a shop'
        ],
        correct: 0,
        explain:
          'The quoted lines are the tutorial screen, and 三十分で使い方を覚えました says the writer learned them.'
      }
    ],
    glossary: [
      { word: '使い方', reading: 'つかいかた', gloss: 'how to use, controls' },
      { word: '体力', reading: 'たいりょく', gloss: 'health, HP' },
      { word: '村', reading: 'むら', gloss: 'village' },
      { word: '覚えました', reading: 'おぼえました', gloss: 'learned, memorised' },
      { word: '世界', reading: 'せかい', gloss: 'world' }
    ]
  },
  {
    key: 'n5-05-hajimete-no-kurabu',
    title: 'はじめてのマンガクラブ',
    level: 'N5',
    topic: 'School',
    text:
      '今日[きょう]、はじめてマンガクラブに行[い]きました。部屋[へや]には学生[がくせい]が十人[じゅうにん]いました。みんな絵[え]をかいていました。\n' +
      '先生[せんせい]が「すきなマンガは何[なん]ですか」と聞[き]きました。私[わたし]は「日本[にほん]のホラーマンガです」と答[こた]えました。となりの人[ひと]も同[おな]じマンガがすきでした。来週[らいしゅう]もまた行[い]きます。',
    questions: [
      {
        prompt: 'How many students were in the room?',
        kind: 'detail',
        options: ['Two', 'Seven', 'Ten', 'Twelve'],
        correct: 2,
        explain: '部屋には学生が十人いました — 十人 is ten people, all of them drawing.'
      },
      {
        prompt: 'What kind of manga does the writer like?',
        kind: 'detail',
        options: ['Sports manga', 'Romance manga', 'Cooking manga', 'Horror manga'],
        correct: 3,
        explain: 'Asked すきなマンガは何ですか, the writer answers 日本のホラーマンガです.'
      },
      {
        prompt: 'How does the writer seem to feel about the club?',
        kind: 'inference',
        options: [
          'Bored, and will not go back there',
          'Happy, and plans to go again',
          'Nervous about the teacher',
          'Sad that nobody drew'
        ],
        correct: 1,
        explain:
          '来週もまた行きます closes the passage, and the writer found someone who likes the same manga.'
      },
      {
        prompt: 'What is the passage mainly about?',
        kind: 'main-idea',
        options: [
          'A first visit to a manga club',
          'A manga the writer is drawing',
          'An exam at school',
          "A teacher's lesson about Japan"
        ],
        correct: 0,
        explain:
          'It opens with はじめてマンガクラブに行きました and everything after that describes that visit.'
      }
    ],
    glossary: [
      { word: '部屋', reading: 'へや', gloss: 'room' },
      { word: '学生', reading: 'がくせい', gloss: 'student' },
      { word: '絵', reading: 'え', gloss: 'picture, drawing' },
      { word: '答えました', reading: 'こたえました', gloss: 'answered' },
      { word: '同じ', reading: 'おなじ', gloss: 'the same' },
      { word: '来週', reading: 'らいしゅう', gloss: 'next week' }
    ]
  },
  {
    key: 'n5-06-ame-to-neko',
    title: '雨[あめ]の日[ひ]とねこ',
    level: 'N5',
    topic: 'Diary',
    text:
      '九月十日[くがつとおか]、雨[あめ]。\n' +
      '今日[きょう]は一日中[いちにちじゅう]、雨[あめ]でした。さむいので、外[そと]に出[で]ませんでした。うちの猫[ねこ]はまどの近[ちか]くで寝[ね]ていました。私[わたし]が本[ほん]を読[よ]んでいると、猫[ねこ]が上[うえ]に乗[の]りました。とても重[おも]かったですが、あたたかかったです。明日[あした]は晴[は]れるでしょうか。',
    questions: [
      {
        prompt: 'What was the weather like that day?',
        kind: 'detail',
        options: [
          'Rain all day',
          'Sunny and hot',
          'Cloudy in the morning only',
          'Snow in the evening'
        ],
        correct: 0,
        explain: '今日は一日中、雨でした — 一日中 means all day long, and the entry is headed 雨.'
      },
      {
        prompt: 'Where was the cat sleeping?',
        kind: 'detail',
        options: ['On the bed', 'Outside the house', 'Near the window', "On the writer's desk"],
        correct: 2,
        explain: 'うちの猫はまどの近くで寝ていました puts the cat by the window, not outside.'
      },
      {
        prompt: 'Why did the writer stay inside?',
        kind: 'inference',
        options: [
          'The cat was asleep',
          'There was no umbrella in the house',
          'The book was too long',
          'It was cold and raining'
        ],
        correct: 3,
        explain: 'さむいので、外に出ませんでした gives the cold as the reason, on a day of rain.'
      },
      {
        prompt: 'What is this diary entry mainly about?',
        kind: 'main-idea',
        options: [
          'A busy day at work',
          'A quiet day at home with a cat',
          'A walk in the rain with a friend',
          'A visit from a friend'
        ],
        correct: 1,
        explain:
          'The writer stays in out of the cold, reads a book, and the cat climbs on top — a quiet day indoors.'
      }
    ],
    glossary: [
      { word: '一日中', reading: 'いちにちじゅう', gloss: 'all day long' },
      { word: '猫', reading: 'ねこ', gloss: 'cat' },
      { word: '近く', reading: 'ちかく', gloss: 'near, nearby' },
      { word: '寝ていました', reading: 'ねていました', gloss: 'was sleeping' },
      { word: '重かった', reading: 'おもかった', gloss: 'was heavy' },
      { word: '晴れる', reading: 'はれる', gloss: 'to clear up, to be sunny' }
    ]
  }
]
