import type { JpPassage } from '../types'

// N4 graded reading passages. Keys FROZEN. Rules in ../types.ts and
// tests/jpReadings.test.ts — every kanji run carries a reading, 4 questions,
// 3-6 glossary entries whose words occur in the stripped text.
export const N4_PASSAGES: JpPassage[] = [
  {
    key: 'n4-01-first-shift',
    title: '初[はじ]めてのアルバイト',
    level: 'N4',
    topic: 'Work',
    text:
      '先週[せんしゅう]から、駅[えき]の近[ちか]くの本屋[ほんや]でアルバイトを始[はじ]めました。初[はじ]めての日[ひ]は心配[しんぱい]で、朝[あさ]ご飯[はん]もあまり食[た]べられませんでした。\n' +
      '店長[てんちょう]は仕事[しごと]をゆっくり説明[せつめい]してくれましたが、覚[おぼ]えることが多[おお]くて、レジでお金[かね]をまちがえてしまいました。\n' +
      '「だれでも初[はじ]めは失敗[しっぱい]しますよ」と言[い]われたので、少[すこ]し安心[あんしん]しました。帰[かえ]るとき足[あし]は痛[いた]かったですが、明日[あした]も働[はたら]きたいと思[おも]いました。',
    questions: [
      {
        prompt: 'Why did the writer eat almost no breakfast on the first day?',
        kind: 'detail',
        options: [
          'They had to leave the house before sunrise that morning.',
          'The bookstore gave its staff a free meal.',
          'They were worried about the new job.',
          'They woke up late and had no time.'
        ],
        correct: 2,
        explain:
          'The sentence hajimete no hi wa shinpai de gives the reason: nerves, not the clock and not a meal at the shop.'
      },
      {
        prompt: 'In the advice the writer is given, what does "shippai" mean?',
        kind: 'vocab',
        options: [
          'Making a mistake.',
          'Arriving late for work.',
          'Asking a coworker for help.',
          'Forgetting to lock the shop door at night.'
        ],
        correct: 0,
        explain:
          'Shippai is a failure or mistake, and the line comes right after the writer gets the money wrong at the register.'
      },
      {
        prompt: 'How does the writer feel about the job at the end of the shift?',
        kind: 'inference',
        options: [
          'Angry at the manager for explaining too quickly.',
          'Sure that the work is too difficult to continue.',
          'Sorry that the shop is so far from the station.',
          'Tired, but willing to come back.'
        ],
        correct: 3,
        explain:
          'The last sentence puts sore feet and ashita mo hatarakitai side by side, so the tiredness does not mean quitting.'
      },
      {
        prompt: 'What is this passage mainly about?',
        kind: 'main-idea',
        options: [
          'How to count money correctly at a register.',
          'A nervous but encouraging first day at work.',
          'Why bookstores near stations are always busy.',
          'A student choosing between two part-time jobs.'
        ],
        correct: 1,
        explain:
          'All three paragraphs follow one shift, from the anxious morning through the mistake to the manager kind words.'
      }
    ],
    glossary: [
      { word: 'アルバイト', reading: 'アルバイト', gloss: 'part-time job' },
      { word: '店長', reading: 'てんちょう', gloss: 'shop manager' },
      { word: '説明', reading: 'せつめい', gloss: 'explanation' },
      { word: '失敗', reading: 'しっぱい', gloss: 'mistake, failure' },
      { word: '安心', reading: 'あんしん', gloss: 'relief' }
    ]
  },
  {
    key: 'n4-02-new-flat',
    title: '新[あたら]しい部屋[へや]',
    level: 'N4',
    topic: 'Moving',
    text:
      '今月[こんげつ]、大学[だいがく]の近[ちか]くの新[あたら]しいアパートに引[ひ]っ越[こ]しました。前[まえ]の部屋[へや]はせまくて、本[ほん]やゲームを置[お]く場所[ばしょ]がありませんでした。\n' +
      '新[あたら]しい部屋[へや]は少[すこ]し高[たか]いですが、窓[まど]が大[おお]きくて明[あか]るいので、昼[ひる]でも電気[でんき]をつけなくてもいいです。\n' +
      '荷物[にもつ]を運[はこ]びながら、友[とも]だちが「本棚[ほんだな]はどこに置[お]く？」と聞[き]きました。私[わたし]は、まんがを全部[ぜんぶ]並[なら]べられる大[おお]きい本棚[ほんだな]を買[か]いたいと答[こた]えました。',
    questions: [
      {
        prompt: 'What was the problem with the old room?',
        kind: 'detail',
        options: [
          'It was too far from the university campus.',
          'There was no space for books and games.',
          'The rent went up every year without warning.',
          'It was dark because the windows were small.'
        ],
        correct: 1,
        explain:
          'The first paragraph says the old room was semakute and had no basho for books or games; rent is never mentioned.'
      },
      {
        prompt: 'Why can the writer leave the light off during the day?',
        kind: 'inference',
        options: [
          'The new flat has no electricity yet.',
          'Electricity is expensive near the university.',
          'The friend told them to save money on the bill.',
          'The big window lets in enough light.'
        ],
        correct: 3,
        explain:
          'Mado ga ookikute akarui node is the stated reason, so the brightness comes from the window and not from saving money.'
      },
      {
        prompt: 'What does "hikkoshimashita" mean in the first sentence?',
        kind: 'vocab',
        options: [
          'Moved to a new home.',
          'Cleaned the whole room.',
          'Went back to the old flat.',
          'Started studying at a new university.'
        ],
        correct: 0,
        explain:
          'Hikkosu is to move house, and the sentence marks atarashii apaato ni as the destination of that move.'
      },
      {
        prompt: 'How does the writer feel about the new flat?',
        kind: 'main-idea',
        options: [
          'Regret, because the rent is far too high.',
          'Worry about carrying so much luggage alone.',
          'Pleased, despite the higher rent.',
          'Bored, because the room is still empty.'
        ],
        correct: 2,
        explain:
          'Sukoshi takai desu ga is followed only by good points: the light, the space, and the plan to buy a big bookshelf.'
      }
    ],
    glossary: [
      { word: '引っ越し', reading: 'ひっこし', gloss: 'moving house' },
      { word: '場所', reading: 'ばしょ', gloss: 'place, space' },
      { word: '荷物', reading: 'にもつ', gloss: 'luggage, belongings' },
      { word: '本棚', reading: 'ほんだな', gloss: 'bookshelf' },
      { word: '全部', reading: 'ぜんぶ', gloss: 'all of it' }
    ]
  },
  {
    key: 'n4-03-anime-osusume',
    title: '友[とも]だちのおすすめ',
    level: 'N4',
    topic: 'Anime',
    text:
      '昼休[ひるやす]みに、友[とも]だちの田中[たなか]さんが「今[いま]、すごく面白[おもしろ]いアニメがあるよ」と教[おし]えてくれました。\n' +
      '「どんな話[はなし]？」と聞[き]くと、田中[たなか]さんは「主人公[しゅじんこう]は弱[よわ]いけれど、あきらめないところがいいんだ」と答[こた]えました。\n' +
      '私[わたし]は一話[いちわ]だけ見[み]るつもりでしたが、続[つづ]きが気[き]になって、夜中[よなか]まで見[み]てしまいました。次[つぎ]の日[ひ]は眠[ねむ]かったのに、学校[がっこう]で田中[たなか]さんに「ありがとう」と言[い]いに行[い]きました。',
    questions: [
      {
        prompt: 'What did Tanaka say was good about the main character?',
        kind: 'detail',
        options: [
          'He is the strongest fighter in the story.',
          'He looks like someone from a famous game.',
          'He never gives up.',
          'He is funny and makes the other characters laugh.'
        ],
        correct: 2,
        explain:
          'Tanaka says yowai keredo akiramenai tokoro ga ii, praising the refusal to give up rather than any strength.'
      },
      {
        prompt: 'Why was the writer sleepy the next day?',
        kind: 'inference',
        options: [
          'They kept watching far past bedtime.',
          'They studied for a test until morning.',
          'They walked to school very early.',
          'They talked with Tanaka on the phone all night.'
        ],
        correct: 0,
        explain:
          'One episode was the plan, but yonaka made mite shimaimashita shows the writer watched deep into the night.'
      },
      {
        prompt: 'What does "tsuzuki" mean in the third paragraph?',
        kind: 'vocab',
        options: [
          'The opening song.',
          'The first episode.',
          'The main character.',
          'What happens next.'
        ],
        correct: 3,
        explain:
          'Tsuzuki is the continuation of a story, so tsuzuki ga ki ni natte means the writer wanted to know what came next.'
      },
      {
        prompt: 'What is this passage mainly about?',
        kind: 'main-idea',
        options: [
          'A friend who watches too much television.',
          'An anime recommendation that worked.',
          'A student who is often late for school.',
          'Why the main character of an anime is weak.'
        ],
        correct: 1,
        explain:
          'The passage runs from the suggestion at lunch to the thank-you the next day, so the recommendation is the thread.'
      }
    ],
    glossary: [
      { word: '昼休み', reading: 'ひるやすみ', gloss: 'lunch break' },
      { word: '面白い', reading: 'おもしろい', gloss: 'interesting, fun' },
      { word: '主人公', reading: 'しゅじんこう', gloss: 'main character' },
      { word: '続き', reading: 'つづき', gloss: 'what comes next' },
      { word: '夜中', reading: 'よなか', gloss: 'the middle of the night' }
    ]
  },
  {
    key: 'n4-04-lost-wallet',
    title: 'なくした財布[さいふ]',
    level: 'N4',
    topic: 'Station',
    text:
      '金曜日[きんようび]、電車[でんしゃ]を降[お]りてから、財布[さいふ]がないことに気[き]がつきました。かばんの中[なか]を何度[なんど]も探[さが]しましたが、見[み]つかりませんでした。\n' +
      '心配[しんぱい]になって、駅[えき]の事務所[じむしょ]で聞[き]いてみました。駅員[えきいん]さんは「同[おな]じような財布[さいふ]が届[とど]いていますよ」と言[い]って、見[み]せてくれました。\n' +
      '中[なか]のお金[かね]もカードもなくなっていませんでした。名前[なまえ]は分[わ]かりませんが、拾[ひろ]ってくれた人[ひと]にお礼[れい]が言[い]いたかったです。',
    questions: [
      {
        prompt: 'When did the writer notice the wallet was gone?',
        kind: 'detail',
        options: [
          'After getting off the train.',
          'While buying a ticket at the machine.',
          'Before leaving the house on Friday.',
          'When the station attendant called out to them.'
        ],
        correct: 0,
        explain:
          'Densha o orite kara places the discovery immediately after the writer stepped off the train, not before the trip.'
      },
      {
        prompt: 'What can we tell about the person who found the wallet?',
        kind: 'inference',
        options: [
          'They took the money but left the cards.',
          'They were a friend of the family.',
          'They handed it in without leaving a name.',
          'They work at the station office on Fridays.'
        ],
        correct: 2,
        explain:
          'The money and cards were untouched and namae wa wakarimasen, so the finder turned it in and stayed anonymous.'
      },
      {
        prompt: 'What does "todoite imasu" mean when the attendant says it?',
        kind: 'vocab',
        options: [
          'It has been sold.',
          'It has been handed in.',
          'It has been thrown away.',
          'It has been sent to the police.'
        ],
        correct: 1,
        explain:
          'Todoku covers something that has arrived or been turned in, and the attendant then shows the blue wallet itself.'
      },
      {
        prompt: 'What is this passage mainly about?',
        kind: 'main-idea',
        options: [
          'How to buy a new wallet cheaply.',
          'A dangerous evening at a train station.',
          'Why the writer stopped carrying cards.',
          'A lost wallet that came back.'
        ],
        correct: 3,
        explain:
          'One wallet carries the whole passage, from the moment it goes missing to the moment the attendant returns it.'
      }
    ],
    glossary: [
      { word: '財布', reading: 'さいふ', gloss: 'wallet' },
      { word: '事務所', reading: 'じむしょ', gloss: 'office' },
      { word: '駅員', reading: 'えきいん', gloss: 'station staff' },
      { word: '届いて', reading: 'とどいて', gloss: 'has been handed in' },
      { word: 'お礼', reading: 'おれい', gloss: 'thanks' }
    ]
  },
  {
    key: 'n4-05-cooking-fail',
    title: 'カレーの失敗[しっぱい]',
    level: 'N4',
    topic: 'Cooking',
    text:
      '土曜日[どようび]の夜[よる]、アニメで見[み]たカレーを自分[じぶん]で作[つく]ってみることにしました。買[か]い物[もの]に行[い]って、肉[にく]と野菜[やさい]を買[か]いました。\n' +
      'テレビを見[み]ながら野菜[やさい]を切[き]っていたので、指[ゆび]を少[すこ]し切[き]ってしまいました。それから、塩[しお]と砂糖[さとう]をまちがえて入[い]れました。\n' +
      'できたカレーは甘[あま]くて変[へん]な味[あじ]でした。友[とも]だちに写真[しゃしん]を送[おく]ったら、「今度[こんど]は料理[りょうり]の本[ほん]を見[み]ながら作[つく]ったほうがいいよ」と返事[へんじ]が来[き]ました。',
    questions: [
      {
        prompt: 'What happened while the writer was cutting the vegetables?',
        kind: 'detail',
        options: [
          'The rice burned on the stove.',
          'A friend called and the meat went bad.',
          'The television was too loud to hear the timer.',
          'They cut their finger a little.'
        ],
        correct: 3,
        explain:
          'Terebi o minagara is followed by yubi o sukoshi kitte shimaimashita, so the cut happens during the chopping.'
      },
      {
        prompt: 'The curry is described as "amakute hen na aji". What does that mean?',
        kind: 'vocab',
        options: [
          'Salty and much too hot.',
          'Sweet and strange.',
          'Cold and hard to eat.',
          'Delicious but rather expensive.'
        ],
        correct: 1,
        explain:
          'Amai means sweet and hen na aji is a strange taste, exactly what sugar in place of salt would produce.'
      },
      {
        prompt: 'Why did the curry taste wrong?',
        kind: 'inference',
        options: [
          'Sugar went in instead of salt.',
          'The vegetables were old.',
          'Too much meat was used.',
          'The recipe in the book was wrong.'
        ],
        correct: 0,
        explain:
          'Shio to satou o machigaete iremashita in the second paragraph is the deciding sentence for the odd flavour.'
      },
      {
        prompt: 'What is this passage mainly about?',
        kind: 'main-idea',
        options: [
          'A recipe the writer learned from a friend.',
          'How to shop for meat and vegetables cheaply.',
          'A first attempt at cooking that went badly.',
          'Why watching anime while eating is a bad idea.'
        ],
        correct: 2,
        explain:
          'Each paragraph is one step of the same failed dish, from the shopping to the reply from the friend at the end.'
      }
    ],
    glossary: [
      { word: '野菜', reading: 'やさい', gloss: 'vegetables' },
      { word: '砂糖', reading: 'さとう', gloss: 'sugar' },
      { word: '味', reading: 'あじ', gloss: 'taste' },
      { word: '料理', reading: 'りょうり', gloss: 'cooking, a dish' },
      { word: '返事', reading: 'へんじ', gloss: 'reply' }
    ]
  },
  {
    key: 'n4-06-new-year-shrine',
    title: 'お正月[しょうがつ]の神社[じんじゃ]',
    level: 'N4',
    topic: 'Shrine',
    text:
      '一月[いちがつ]一日[ついたち]の朝[あさ]、家族[かぞく]と神社[じんじゃ]へ行[い]きました。人[ひと]がとても多[おお]くて、お参[まい]りするまで三十分[さんじゅっぷん]ぐらい待[ま]たなければなりませんでした。\n' +
      '寒[さむ]かったのに、みんな楽[たの]しそうな顔[かお]をしていました。私[わたし]は「今年[ことし]は日本語[にほんご]の試験[しけん]に合格[ごうかく]できますように」とお願[ねが]いしました。\n' +
      'おみくじを引[ひ]いたら「小吉[しょうきち]」でした。あまりよくないですが、姉[あね]は「毎日[まいにち]勉強[べんきょう]すれば、きっと大丈夫[だいじょうぶ]だよ」と笑[わら]いました。',
    questions: [
      {
        prompt: 'How long did the family have to wait?',
        kind: 'detail',
        options: [
          'Until the shrine opened in the afternoon.',
          'About ten minutes.',
          'They did not wait at all.',
          'About thirty minutes.'
        ],
        correct: 3,
        explain:
          'Sanjuppun gurai matanakereba narimasen deshita gives the wait, and the crowd is the reason for it.'
      },
      {
        prompt: 'What can we guess about the writer from the wish they made?',
        kind: 'inference',
        options: [
          'They have already passed the Japanese test.',
          'They are studying for a Japanese test.',
          'They want to work at the shrine next year.',
          'They visit this shrine every single month.'
        ],
        correct: 1,
        explain:
          'Shiken ni goukaku dekimasu you ni asks for a result that has not happened yet, so the test is still ahead.'
      },
      {
        prompt: 'What is an "omikuji"?',
        kind: 'vocab',
        options: [
          'A small New Year gift of money.',
          'A wooden plate for writing wishes.',
          'A paper fortune drawn at a shrine.',
          'A special dish eaten on the first of January.'
        ],
        correct: 2,
        explain:
          'The writer draws one and reads shoukichi, a small-luck grade, which is how the fortune slips at a shrine are graded.'
      },
      {
        prompt: 'What is this passage mainly about?',
        kind: 'main-idea',
        options: [
          'A New Year visit to a shrine.',
          'A sister who studies Japanese every day.',
          'Why shrines are colder in January.',
          'How to write a good New Year card.'
        ],
        correct: 0,
        explain:
          'The three paragraphs are one visit: the queue, the wish at the front, and the fortune the sister laughs about.'
      }
    ],
    glossary: [
      { word: '神社', reading: 'じんじゃ', gloss: 'shrine' },
      { word: 'お参り', reading: 'おまいり', gloss: 'a visit to pray' },
      { word: '試験', reading: 'しけん', gloss: 'exam' },
      { word: '合格', reading: 'ごうかく', gloss: 'passing an exam' },
      { word: 'おみくじ', reading: 'おみくじ', gloss: 'paper fortune' }
    ]
  }
]
