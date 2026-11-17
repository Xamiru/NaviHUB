import type { JpPassage } from '../types'

// N5 graded reading, second set (2026-11-17): passages 10-25, so a beginner
// has weeks of N5 text before moving up. Keys FROZEN. Same rules as ./n5.ts
// and tests/jpReadings.test.ts.
export const N5_MORE_PASSAGES: JpPassage[] = [
  {
    key: 'n5-10-jiko-shoukai',
    title: '自己紹介[じこしょうかい]',
    level: 'N5',
    topic: 'Self-introduction',
    text:
      'はじめまして。私[わたし]はマリアです。スペインから来[き]ました。今[いま]、東京[とうきょう]の大学[だいがく]で日本語[にほんご]を勉強[べんきょう]しています。しゅみは料理[りょうり]と写真[しゃしん]です。週末[しゅうまつ]はよく公園[こうえん]で写真[しゃしん]をとります。日本[にほん]の食[た]べ物[もの]では、ラーメンが一番[いちばん]好[す]きです。どうぞよろしくお願[ねが]いします。',
    questions: [
      {
        prompt: 'Where is Maria from?',
        kind: 'detail',
        options: ['Spain', 'Mexico', 'Italy', 'Brazil'],
        correct: 0,
        explain: 'スペインから来ました — Maria came from Spain.'
      },
      {
        prompt: 'What is Maria doing in Tokyo now?',
        kind: 'detail',
        options: [
          'Working at a ramen shop',
          'Studying Japanese',
          'Teaching Spanish to children',
          'Taking photos for a magazine'
        ],
        correct: 1,
        explain: '東京の大学で日本語を勉強しています — Maria studies Japanese at a university in Tokyo.'
      },
      {
        prompt: 'Maria says "shumi" before naming cooking and photography. What does the word mean?',
        kind: 'vocab',
        options: ['Jobs', 'Classes', 'Hobbies', 'Family members'],
        correct: 2,
        explain: 'しゅみ means hobbies: しゅみは料理と写真です names the two things Maria enjoys.'
      },
      {
        prompt: 'What kind of text is this?',
        kind: 'main-idea',
        options: [
          'A letter to a host family in Spain',
          'A restaurant review',
          'A news report',
          'A self-introduction'
        ],
        correct: 3,
        explain:
          'It opens with はじめまして and closes with どうぞよろしくお願いします, the frame of a self-introduction.'
      }
    ],
    glossary: [
      { word: '大学', reading: 'だいがく', gloss: 'university' },
      { word: '勉強', reading: 'べんきょう', gloss: 'study' },
      { word: '料理', reading: 'りょうり', gloss: 'cooking' },
      { word: '写真', reading: 'しゃしん', gloss: 'photograph' },
      { word: '公園', reading: 'こうえん', gloss: 'park' },
      { word: '一番', reading: 'いちばん', gloss: 'the most, number one' }
    ]
  },
  {
    key: 'n5-11-tomodachi-e-no-memo',
    title: 'けんさんへのメモ',
    level: 'N5',
    topic: 'Messages',
    text:
      'けんさんへ\n' +
      '今日[きょう]は夜[よる]九時[くじ]までアルバイトです。れいぞうこにカレーがあります。あたためて食[た]べてください。それから、ねこに水[みず]をあげてください。明日[あした]の朝[あさ]は、いっしょに駅[えき]まで行[い]きましょう。\n' +
      'ゆみより',
    questions: [
      {
        prompt: 'Until what time is Yumi working today?',
        kind: 'detail',
        options: ['Until six', 'Until nine at night', 'Until nine in the morning', 'Until seven'],
        correct: 1,
        explain: '今日は夜九時までアルバイトです — the part-time job runs until nine in the evening.'
      },
      {
        prompt: 'The curry is in the "reizouko". What is that?',
        kind: 'vocab',
        options: ['A bag', 'A pot on the stove', 'A refrigerator', 'A lunch box'],
        correct: 2,
        explain:
          'れいぞうこ is a refrigerator, and the next line asks Ken to warm the curry up before eating it.'
      },
      {
        prompt: 'What should Ken give the cat?',
        kind: 'detail',
        options: ['Some curry', 'Milk', 'Its dinner', 'Water'],
        correct: 3,
        explain: 'ねこに水をあげてください asks Ken to give the cat water.'
      },
      {
        prompt: 'What will Ken and Yumi probably do tomorrow morning?',
        kind: 'inference',
        options: [
          'Go to the station together',
          'Eat curry at a restaurant',
          'Go to the part-time job together early',
          'Buy food for the cat'
        ],
        correct: 0,
        explain: '明日の朝は、いっしょに駅まで行きましょう — Yumi suggests going to the station together.'
      }
    ],
    glossary: [
      { word: 'アルバイト', reading: 'アルバイト', gloss: 'part-time job' },
      { word: '水', reading: 'みず', gloss: 'water' },
      { word: '明日', reading: 'あした', gloss: 'tomorrow' },
      { word: '駅', reading: 'えき', gloss: 'station' }
    ]
  },
  {
    key: 'n5-12-pan-ya-oshirase',
    title: 'パン屋[や]のお知[し]らせ',
    level: 'N5',
    topic: 'Notices',
    text:
      'パン屋[や]「ひまわり」のお知[し]らせ\n' +
      'いつもありがとうございます。来週[らいしゅう]の月曜日[げつようび]と火曜日[かようび]は、店[みせ]を休[やす]みます。水曜日[すいようび]から、また朝[あさ]七時[しちじ]に開[あ]けます。水曜日[すいようび]は、パンが全部[ぜんぶ]百円[ひゃくえん]です。みなさん、来[き]てください。',
    questions: [
      {
        prompt: 'On which days is the bakery closed next week?',
        kind: 'detail',
        options: [
          'Sunday and Monday',
          'Only Wednesday',
          'Monday and Tuesday',
          'Tuesday and Wednesday'
        ],
        correct: 2,
        explain: '来週の月曜日と火曜日は、店を休みます — Monday and Tuesday are the days off.'
      },
      {
        prompt: 'What time does the shop open from Wednesday?',
        kind: 'detail',
        options: [
          'Six in the morning',
          'Nine in the morning',
          'Eight in the morning',
          'Seven in the morning'
        ],
        correct: 3,
        explain: '水曜日から、また朝七時に開けます — 七時 (しちじ) is seven o\'clock.'
      },
      {
        prompt: 'What is special about Wednesday?',
        kind: 'detail',
        options: [
          'Every bread costs 100 yen',
          'The shop gives away free coffee',
          'The shop opens at night',
          'Every cake is half price'
        ],
        correct: 0,
        explain: '水曜日は、パンが全部百円です — all the bread is one hundred yen that day.'
      },
      {
        prompt: 'What is the main purpose of this notice?',
        kind: 'main-idea',
        options: [
          'To find a new part-time worker for the weekend',
          'To tell about days off and a sale',
          'To explain how bread is made',
          'To say the bakery is moving'
        ],
        correct: 1,
        explain:
          'The notice gives the two closed days, the new opening day and the hundred-yen bread on Wednesday.'
      }
    ],
    glossary: [
      { word: 'パン屋', reading: 'ぱんや', gloss: 'bakery' },
      { word: '来週', reading: 'らいしゅう', gloss: 'next week' },
      { word: '休みます', reading: 'やすみます', gloss: 'to close, to take a day off' },
      { word: '全部', reading: 'ぜんぶ', gloss: 'all, everything' },
      { word: '百円', reading: 'ひゃくえん', gloss: '100 yen' }
    ]
  },
  {
    key: 'n5-13-sensei-e-no-meeru',
    title: '先生[せんせい]へのメール',
    level: 'N5',
    topic: 'Email',
    text:
      '田中[たなか]先生[せんせい]\n' +
      'おはようございます。リーです。すみません、今日[きょう]はねつがありますから、学校[がっこう]を休[やす]みます。きのうの宿題[しゅくだい]は明日[あした]出[だ]します。来週[らいしゅう]のテストは何曜日[なんようび]ですか。教[おし]えてください。\n' +
      'リー',
    questions: [
      {
        prompt: 'Why is Lee missing school today?',
        kind: 'detail',
        options: [
          'A train was late',
          'There is a family event',
          'The homework is not finished',
          'Lee has a fever'
        ],
        correct: 3,
        explain: 'ねつがありますから gives the reason: Lee has a fever, so stays home.'
      },
      {
        prompt: "When will Lee hand in yesterday's homework?",
        kind: 'detail',
        options: ['Tomorrow', 'Today, by email', 'Next week', 'After the test'],
        correct: 0,
        explain: 'きのうの宿題は明日出します — the homework will be handed in tomorrow.'
      },
      {
        prompt: 'Lee writes "netsu" to explain the problem. What is it?',
        kind: 'vocab',
        options: ['A cold wind', 'A fever', 'A broken bicycle', 'A test'],
        correct: 1,
        explain: 'ねつ is a fever (a high temperature), the reason given with から for missing school.'
      },
      {
        prompt: 'What does Lee want the teacher to answer?',
        kind: 'inference',
        options: [
          'Where the classroom is',
          'How long the test is',
          'Which day the test is',
          'What the homework was'
        ],
        correct: 2,
        explain: '来週のテストは何曜日ですか。教えてください asks which day of the week the test is.'
      }
    ],
    glossary: [
      { word: '先生', reading: 'せんせい', gloss: 'teacher' },
      { word: '学校', reading: 'がっこう', gloss: 'school' },
      { word: '宿題', reading: 'しゅくだい', gloss: 'homework' },
      { word: '何曜日', reading: 'なんようび', gloss: 'what day of the week' },
      { word: '教えて', reading: 'おしえて', gloss: 'tell me, teach me' }
    ]
  },
  {
    key: 'n5-14-watashi-no-ichinichi',
    title: '私[わたし]の一日[いちにち]',
    level: 'N5',
    topic: 'Daily life',
    text:
      '毎朝[まいあさ]六時半[ろくじはん]に起[お]きます。七時[しちじ]に朝[あさ]ごはんを食[た]べて、八時[はちじ]に家[いえ]を出[で]ます。仕事[しごと]は九時[くじ]から五時[ごじ]までです。昼[ひる]ごはんは会社[かいしゃ]の近[ちか]くの店[みせ]で食[た]べます。夜[よる]は本[ほん]を読[よ]んで、十一時[じゅういちじ]ごろ寝[ね]ます。',
    questions: [
      {
        prompt: 'What time does the writer get up?',
        kind: 'detail',
        options: ['Half past six', 'Six', 'Seven', 'Half past seven'],
        correct: 0,
        explain: '毎朝六時半に起きます — 半 means half past, so the writer gets up at 6:30.'
      },
      {
        prompt: 'When does work finish?',
        kind: 'detail',
        options: ['At nine', 'At five', 'At eight', 'At eleven'],
        correct: 1,
        explain: '仕事は九時から五時までです — work runs from nine until five.'
      },
      {
        prompt: 'Where does the writer eat lunch?',
        kind: 'detail',
        options: [
          'At home',
          'In the office kitchen',
          'At a shop near the office',
          'In a park next to the station'
        ],
        correct: 2,
        explain: '昼ごはんは会社の近くの店で食べます — lunch is at a shop near the workplace.'
      },
      {
        prompt: 'What does the passage describe?',
        kind: 'main-idea',
        options: [
          'A holiday trip to the sea',
          'A first day at a new job',
          'A day off at home',
          "The writer's usual weekday"
        ],
        correct: 3,
        explain:
          '毎朝 (every morning) and the fixed work hours show a normal routine, from getting up to going to bed.'
      }
    ],
    glossary: [
      { word: '毎朝', reading: 'まいあさ', gloss: 'every morning' },
      { word: '起きます', reading: 'おきます', gloss: 'to get up' },
      { word: '仕事', reading: 'しごと', gloss: 'work, job' },
      { word: '昼ごはん', reading: 'ひるごはん', gloss: 'lunch' },
      { word: '寝ます', reading: 'ねます', gloss: 'to go to bed' }
    ]
  },
  {
    key: 'n5-15-sobaya-de',
    title: 'そば屋[や]で',
    level: 'N5',
    topic: 'Dialogue',
    text:
      '店員[てんいん]「いらっしゃいませ。何人[なんにん]ですか」\n' +
      '客[きゃく]「二人[ふたり]です」\n' +
      '店員[てんいん]「こちらへどうぞ。何[なに]にしますか」\n' +
      '客[きゃく]「てんぷらそばを二[ふた]つと、オレンジジュースを一[ひと]つください」\n' +
      '店員[てんいん]「すみません、オレンジジュースはありません。りんごジュースはどうですか」\n' +
      '客[きゃく]「じゃあ、それをお願[ねが]いします」',
    questions: [
      {
        prompt: 'How many customers are there?',
        kind: 'detail',
        options: ['One', 'Two', 'Three', 'Four'],
        correct: 1,
        explain: 'Asked 何人ですか, the customer answers 二人です — two people.'
      },
      {
        prompt: 'What food do they order?',
        kind: 'detail',
        options: [
          'One bowl of ramen',
          'Two rice balls',
          'Two bowls of tempura soba',
          'Tempura on rice and a salad'
        ],
        correct: 2,
        explain: 'てんぷらそばを二つ — two bowls of tempura soba.'
      },
      {
        prompt: 'Why does the staff member suggest apple juice?',
        kind: 'inference',
        options: [
          'It is cheaper',
          'The customer asked for it',
          "It is the shop's special",
          'There is no orange juice'
        ],
        correct: 3,
        explain: 'オレンジジュースはありません comes first, so apple juice is offered in its place.'
      },
      {
        prompt: 'What is happening in this conversation?',
        kind: 'main-idea',
        options: [
          'Ordering a meal',
          'Cooking soba at home with a friend',
          'Shopping for juice at a supermarket',
          'Paying the bill after dinner'
        ],
        correct: 0,
        explain:
          'The staff greet the customers, seat them and take the order: 何にしますか, then the food and drink.'
      }
    ],
    glossary: [
      { word: '店員', reading: 'てんいん', gloss: 'shop staff' },
      { word: '客', reading: 'きゃく', gloss: 'customer' },
      { word: '何人', reading: 'なんにん', gloss: 'how many people' },
      { word: '二人', reading: 'ふたり', gloss: 'two people' },
      { word: 'お願いします', reading: 'おねがいします', gloss: 'please (I would like that)' }
    ]
  },
  {
    key: 'n5-16-kusuri-no-nomikata',
    title: 'くすりの飲[の]み方[かた]',
    level: 'N5',
    topic: 'Instructions',
    text:
      '一日[いちにち]に三回[さんかい]、ごはんの後[あと]に飲[の]んでください。大人[おとな]は一回[いっかい]に二[ふた]つです。子[こ]どもは一[ひと]つです。水[みず]かお湯[ゆ]で飲[の]んでください。お酒[さけ]といっしょに飲[の]まないでください。ねむくなりますから、車[くるま]を運転[うんてん]しないでください。',
    questions: [
      {
        prompt: 'How many times a day should this medicine be taken?',
        kind: 'detail',
        options: ['Once, before bed', 'Twice', 'Three times', 'Four times'],
        correct: 2,
        explain: '一日に三回 — three times a day, each time after a meal.'
      },
      {
        prompt: 'How many does a child take each time?',
        kind: 'detail',
        options: ['Two', 'Three', 'Half of one', 'One'],
        correct: 3,
        explain: '大人は一回に二つです。子どもは一つです — adults take two, children take one.'
      },
      {
        prompt: 'What must people not drink with the medicine?',
        kind: 'detail',
        options: ['Alcohol', 'Water', 'Hot water', 'Tea with milk'],
        correct: 0,
        explain: 'お酒といっしょに飲まないでください — do not take it with alcohol. Water and hot water are fine.'
      },
      {
        prompt: 'Why should people not drive after taking it?',
        kind: 'inference',
        options: [
          'It must be taken after food',
          'It may make them sleepy',
          'Their eyes may hurt for a day',
          'It is too strong for adults'
        ],
        correct: 1,
        explain: 'ねむくなりますから gives the reason: the medicine makes people sleepy.'
      }
    ],
    glossary: [
      { word: '三回', reading: 'さんかい', gloss: 'three times' },
      { word: '大人', reading: 'おとな', gloss: 'adult' },
      { word: 'お湯', reading: 'おゆ', gloss: 'hot water' },
      { word: 'お酒', reading: 'おさけ', gloss: 'alcohol' },
      { word: '運転', reading: 'うんてん', gloss: 'driving' }
    ]
  },
  {
    key: 'n5-17-kazoku-to-umi',
    title: '家族[かぞく]と海[うみ]へ',
    level: 'N5',
    topic: 'Diary',
    text:
      '八月[はちがつ]三日[みっか]、晴[は]れ。\n' +
      '今日[きょう]は家族[かぞく]と海[うみ]へ行[い]きました。車[くるま]で二時間[にじかん]かかりました。海[うみ]はとてもきれいでしたが、水[みず]は少[すこ]しつめたかったです。弟[おとうと]と泳[およ]いで、昼[ひる]にすいかを食[た]べました。帰[かえ]りの車[くるま]の中[なか]で、みんな寝[ね]ていました。',
    questions: [
      {
        prompt: 'How did the family travel to the sea?',
        kind: 'detail',
        options: ['By train, for about an hour', 'By bus', 'On foot from the house', 'By car'],
        correct: 3,
        explain: '車で二時間かかりました — they went by car, and it took two hours.'
      },
      {
        prompt: 'What was the water like?',
        kind: 'detail',
        options: ['A little cold', 'Very warm', 'Dirty', 'Too deep for swimming'],
        correct: 0,
        explain: '水は少しつめたかったです — the water was a little cold, though the sea was beautiful.'
      },
      {
        prompt: 'The writer ate "suika" at lunchtime. What is it?',
        kind: 'vocab',
        options: ['Grilled fish', 'Watermelon', 'Rice balls', 'Ice cream'],
        correct: 1,
        explain: 'すいか is watermelon, a typical summer food at the beach in August.'
      },
      {
        prompt: 'How did everyone probably feel on the way home?',
        kind: 'inference',
        options: [
          'Angry about the traffic',
          'Hungry for dinner',
          'Tired',
          'Cold and wet from the sea'
        ],
        correct: 2,
        explain: '帰りの車の中で、みんな寝ていました — everyone slept in the car, so they were tired.'
      }
    ],
    glossary: [
      { word: '家族', reading: 'かぞく', gloss: 'family' },
      { word: '二時間', reading: 'にじかん', gloss: 'two hours' },
      { word: '弟', reading: 'おとうと', gloss: 'younger brother' },
      { word: '泳いで', reading: 'およいで', gloss: 'swam, swimming' },
      { word: '帰り', reading: 'かえり', gloss: 'the way home' }
    ]
  },
  {
    key: 'n5-18-atarashii-heya',
    title: '新[あたら]しい部屋[へや]',
    level: 'N5',
    topic: 'Home',
    text:
      '先月[せんげつ]から新[あたら]しいアパートに住[す]んでいます。部屋[へや]はあまり広[ひろ]くないですが、明[あか]るくて静[しず]かです。駅[えき]から歩[ある]いて五分[ごふん]です。近[ちか]くにスーパーと銀行[ぎんこう]があります。でも、公園[こうえん]はありません。まどの前[まえ]に大[おお]きい木[き]があって、とてもきれいです。',
    questions: [
      {
        prompt: 'How does the writer feel about the new home?',
        kind: 'inference',
        options: [
          'Mostly happy with it',
          'Unhappy because it is small',
          'Worried about the noise',
          'Sad to leave the old home'
        ],
        correct: 0,
        explain:
          'The room is not big, but it is bright and quiet, close to the station, and the tree is とてもきれい.'
      },
      {
        prompt: 'How far is the apartment from the station?',
        kind: 'detail',
        options: [
          'Two minutes by bus',
          'Five minutes on foot',
          'Fifteen minutes on foot',
          'Ten minutes by bicycle'
        ],
        correct: 1,
        explain: '駅から歩いて五分です — 歩いて means on foot, and 五分 is five minutes.'
      },
      {
        prompt: 'What is NOT near the apartment?',
        kind: 'detail',
        options: ['A supermarket', 'A bank', 'A park', 'A big tree'],
        correct: 2,
        explain: 'スーパーと銀行があります, then でも、公園はありません — there is no park.'
      },
      {
        prompt: 'The room is described as "shizuka". What does that mean?',
        kind: 'vocab',
        options: ['Expensive', 'Clean', 'Warm', 'Quiet'],
        correct: 3,
        explain: '静か means quiet; it is paired with 明るい (bright) as a good point of the room.'
      }
    ],
    glossary: [
      { word: '先月', reading: 'せんげつ', gloss: 'last month' },
      { word: '住んでいます', reading: 'すんでいます', gloss: 'live (in a place)' },
      { word: '広くない', reading: 'ひろくない', gloss: 'not spacious' },
      { word: '静か', reading: 'しずか', gloss: 'quiet' },
      { word: '銀行', reading: 'ぎんこう', gloss: 'bank' }
    ]
  },
  {
    key: 'n5-19-tanjoubi-paatii',
    title: '誕生日[たんじょうび]パーティー',
    level: 'N5',
    topic: 'Messages',
    text:
      'アンナさんへ\n' +
      '来週[らいしゅう]の土曜日[どようび]は私[わたし]の誕生日[たんじょうび]です。うちで小[ちい]さいパーティーをします。時間[じかん]は午後[ごご]二時[にじ]から五時[ごじ]までです。ケーキとジュースがあります。プレゼントはいりません。駅[えき]に着[つ]いたとき、電話[でんわ]をください。\n' +
      'はるか',
    questions: [
      {
        prompt: 'When is the party?',
        kind: 'detail',
        options: [
          'Next Sunday, in the evening',
          'Next Saturday afternoon',
          'This Saturday morning',
          'Tomorrow at five'
        ],
        correct: 1,
        explain: '来週の土曜日, from 午後二時 to 五時 — next Saturday, in the afternoon.'
      },
      {
        prompt: 'What does Haruka say about presents?',
        kind: 'detail',
        options: [
          'Bring a small one',
          'Bring cake instead',
          'None are needed',
          'Buy one at the station'
        ],
        correct: 2,
        explain: 'プレゼントはいりません — いる here means to need, so no present is needed.'
      },
      {
        prompt: 'Why should Anna call on arriving at the station?',
        kind: 'inference',
        options: [
          'To order a big cake for everyone at the party',
          'To say the train is late',
          'To ask when the party ends',
          'So Haruka can come and meet Anna'
        ],
        correct: 3,
        explain:
          'The party is at Haruka\'s home, and the call comes from the station, most likely so Haruka can come out or give directions.'
      },
      {
        prompt: '"Gogo" comes before the party time. What does it mean?',
        kind: 'vocab',
        options: ['p.m.', 'a.m.', 'at night', 'about'],
        correct: 0,
        explain: '午後 means afternoon (p.m.), so 午後二時 is 2 p.m.; a.m. would be 午前.'
      }
    ],
    glossary: [
      { word: '誕生日', reading: 'たんじょうび', gloss: 'birthday' },
      { word: '土曜日', reading: 'どようび', gloss: 'Saturday' },
      { word: '午後', reading: 'ごご', gloss: 'afternoon, p.m.' },
      { word: '着いた', reading: 'ついた', gloss: 'arrived' },
      { word: '電話', reading: 'でんわ', gloss: 'phone call' }
    ]
  },
  {
    key: 'n5-20-toshokan-no-kimari',
    title: '図書館[としょかん]のきまり',
    level: 'N5',
    topic: 'Notices',
    text:
      '市[し]の図書館[としょかん]は、火曜日[かようび]から日曜日[にちようび]まで開[あ]いています。時間[じかん]は朝[あさ]九時[くじ]から夜[よる]七時[しちじ]までです。月曜日[げつようび]は休[やす]みです。本[ほん]を借[か]りるときは、カードを見[み]せてください。本[ほん]は一人[ひとり]五冊[ごさつ]までです。二週間[にしゅうかん]で返[かえ]してください。',
    questions: [
      {
        prompt: 'On which day is the library closed?',
        kind: 'detail',
        options: ['Sunday', 'Tuesday', 'Monday', 'Saturday'],
        correct: 2,
        explain: '月曜日は休みです — it opens Tuesday to Sunday and closes on Monday.'
      },
      {
        prompt: 'How many books can one person borrow?',
        kind: 'detail',
        options: ['Two', 'Three', 'Ten', 'Five'],
        correct: 3,
        explain: '本は一人五冊までです — up to five books per person.'
      },
      {
        prompt: 'What must people show when they borrow books?',
        kind: 'detail',
        options: ['Their library card', 'Their phone', 'A school ID and a letter', 'Nothing'],
        correct: 0,
        explain: '本を借りるときは、カードを見せてください — show the card when borrowing.'
      },
      {
        prompt: 'The last sentence ends with "kaeshite kudasai". What does it ask?',
        kind: 'vocab',
        options: ['Read them', 'Return them', 'Buy them', 'Carry them home'],
        correct: 1,
        explain: '返す means to give back, so 二週間で返してください asks for the books back in two weeks.'
      }
    ],
    glossary: [
      { word: '図書館', reading: 'としょかん', gloss: 'library' },
      { word: '借りる', reading: 'かりる', gloss: 'to borrow' },
      { word: '一人', reading: 'ひとり', gloss: 'one person' },
      { word: '五冊', reading: 'ごさつ', gloss: 'five (books)' },
      { word: '二週間', reading: 'にしゅうかん', gloss: 'two weeks' },
      { word: '返して', reading: 'かえして', gloss: 'give back, return' }
    ]
  },
  {
    key: 'n5-21-suupaa-kara-denwa',
    title: 'スーパーから電話[でんわ]',
    level: 'N5',
    topic: 'Dialogue',
    text:
      'ひろ「もしもし、お母[かあ]さん。今[いま]、スーパーにいます」\n' +
      '母[はは]「ありがとう。牛乳[ぎゅうにゅう]を一本[いっぽん]とたまごを買[か]ってください」\n' +
      'ひろ「わかりました。肉[にく]は？」\n' +
      '母[はは]「肉[にく]はきのう買[か]いましたから、いりません。それから、りんごを三[みっ]つお願[ねが]いします」\n' +
      'ひろ「はい。じゃあ、すぐ帰[かえ]ります」',
    questions: [
      {
        prompt: 'Where is Hiro calling from?',
        kind: 'detail',
        options: ['From home', 'From the station', "From a friend's house", 'From a supermarket'],
        correct: 3,
        explain: '今、スーパーにいます — Hiro is at the supermarket now.'
      },
      {
        prompt: 'Why does Hiro not need to buy meat?',
        kind: 'detail',
        options: [
          'It was bought yesterday',
          'The shop has none',
          'Nobody eats meat',
          'It is too expensive today'
        ],
        correct: 0,
        explain: '肉はきのう買いましたから、いりません — meat was bought yesterday, so none is needed.'
      },
      {
        prompt: 'How many apples should Hiro buy?',
        kind: 'detail',
        options: ['Two', 'Three', 'A bag of ten', 'None'],
        correct: 1,
        explain: 'りんごを三つお願いします — 三つ (みっつ) is three.'
      },
      {
        prompt: 'What is the call mainly about?',
        kind: 'main-idea',
        options: [
          'Planning a party for the weekend',
          'A lost wallet',
          'What to buy at the shop',
          'How to cook dinner'
        ],
        correct: 2,
        explain: 'Every line is about the shopping list: milk, eggs, no meat, and three apples.'
      }
    ],
    glossary: [
      { word: 'お母さん', reading: 'おかあさん', gloss: 'mother (when talking to her)' },
      { word: '牛乳', reading: 'ぎゅうにゅう', gloss: 'milk' },
      { word: '一本', reading: 'いっぽん', gloss: 'one (bottle)' },
      { word: '肉', reading: 'にく', gloss: 'meat' },
      { word: '三つ', reading: 'みっつ', gloss: 'three (things)' }
    ]
  },
  {
    key: 'n5-22-eki-kara-ie-made',
    title: '駅[えき]から家[いえ]まで',
    level: 'N5',
    topic: 'Instructions',
    text:
      '駅[えき]から私[わたし]の家[いえ]までの道[みち]です。北口[きたぐち]を出[で]て、右[みぎ]へ行[い]ってください。まっすぐ三分[さんぷん]ぐらい歩[ある]いてください。花屋[はなや]の前[まえ]で、左[ひだり]にまがってください。二[ふた]つ目[め]の白[しろ]い家[いえ]が私[わたし]の家[いえ]です。わからないときは、電話[でんわ]してください。',
    questions: [
      {
        prompt: 'Which exit of the station should be used?',
        kind: 'detail',
        options: ['The north exit', 'The south exit', 'The east exit', 'The west exit'],
        correct: 0,
        explain: '北口を出て — 北口 is the north exit.'
      },
      {
        prompt: 'Where should the visitor turn left?',
        kind: 'detail',
        options: ['At the bank', 'At the flower shop', 'At the second corner', 'At the school gate'],
        correct: 1,
        explain: '花屋の前で、左にまがってください — turn left in front of the flower shop.'
      },
      {
        prompt: 'Which house belongs to the writer?',
        kind: 'detail',
        options: [
          'The first blue house',
          'The house next to the flower shop',
          'The second white house',
          'The big house by the station'
        ],
        correct: 2,
        explain: '二つ目の白い家が私の家です — the second white house.'
      },
      {
        prompt: 'What should the visitor do if they get lost?',
        kind: 'inference',
        options: [
          'Go back to the station',
          'Ask at the flower shop',
          'Wait in front of the house',
          'Phone the writer'
        ],
        correct: 3,
        explain: 'わからないときは、電話してください — when unsure of the way, call.'
      }
    ],
    glossary: [
      { word: '道', reading: 'みち', gloss: 'way, road' },
      { word: '北口', reading: 'きたぐち', gloss: 'north exit' },
      { word: '花屋', reading: 'はなや', gloss: 'flower shop' },
      { word: '二つ目', reading: 'ふたつめ', gloss: 'the second' },
      { word: '白い', reading: 'しろい', gloss: 'white' }
    ]
  },
  {
    key: 'n5-23-watashi-no-shumi',
    title: '私[わたし]のしゅみ',
    level: 'N5',
    topic: 'Hobbies',
    text:
      '私[わたし]はギターがすきです。高校生[こうこうせい]のときから、毎日[まいにち]ひいています。でも、歌[うた]はあまり上手[じょうず]じゃありません。ですから、友[とも]だちのバンドでは全然[ぜんぜん]歌[うた]いません。毎週[まいしゅう]金曜日[きんようび]の夜[よる]、みんなで練習[れんしゅう]します。来月[らいげつ]、小[ちい]さい店[みせ]でライブをします。',
    questions: [
      {
        prompt: 'Since when has the writer played the guitar?',
        kind: 'detail',
        options: [
          'Since last year',
          'Since high school',
          'Since starting work',
          'Since elementary school'
        ],
        correct: 1,
        explain: '高校生のときから、毎日ひいています — every day since high school.'
      },
      {
        prompt: "What is the writer's part in the band?",
        kind: 'inference',
        options: [
          'Sings most of the songs',
          'Plays the drums and the piano',
          'Guitar, without singing',
          'Writes songs but never plays'
        ],
        correct: 2,
        explain:
          'The writer plays guitar every day but バンドでは全然歌いません, so the part in the band is guitar.'
      },
      {
        prompt: 'When does the band practise?',
        kind: 'detail',
        options: [
          'Every day after school',
          'Every Saturday morning',
          'Once a month',
          'Every Friday night'
        ],
        correct: 3,
        explain: '毎週金曜日の夜、みんなで練習します — every Friday evening.'
      },
      {
        prompt: '"Zenzen" with a negative verb means',
        kind: 'vocab',
        options: ['not at all', 'only sometimes', 'a little', 'very well'],
        correct: 0,
        explain: '全然歌いません means does not sing at all; 全然 + a negative is a complete no.'
      }
    ],
    glossary: [
      { word: '高校生', reading: 'こうこうせい', gloss: 'high school student' },
      { word: '毎日', reading: 'まいにち', gloss: 'every day' },
      { word: '上手', reading: 'じょうず', gloss: 'good at' },
      { word: '全然', reading: 'ぜんぜん', gloss: '(not) at all' },
      { word: '練習', reading: 'れんしゅう', gloss: 'practice' },
      { word: '来月', reading: 'らいげつ', gloss: 'next month' }
    ]
  },
  {
    key: 'n5-24-raishuu-no-yotei',
    title: '来週[らいしゅう]のよてい',
    level: 'N5',
    topic: 'Schedule',
    text:
      '月曜日[げつようび]と水曜日[すいようび]は、午前[ごぜん]十時[じゅうじ]から十二時[じゅうにじ]まで日本語[にほんご]のクラスがあります。火曜日[かようび]はテニスです。木曜日[もくようび]は何[なに]もありませんから、映画[えいが]を見[み]に行[い]きたいです。金曜日[きんようび]の夜[よる]は、友[とも]だちと晩[ばん]ごはんを食[た]べます。土曜日[どようび]は一日中[いちにちじゅう]家[いえ]で休[やす]みます。',
    questions: [
      {
        prompt: 'On which days are the Japanese classes?',
        kind: 'detail',
        options: [
          'Tuesday and Thursday',
          'Every weekday',
          'Monday and Wednesday',
          'Only Saturday'
        ],
        correct: 2,
        explain: '月曜日と水曜日は … 日本語のクラスがあります — Monday and Wednesday.'
      },
      {
        prompt: 'How long is each Japanese class?',
        kind: 'detail',
        options: ['One hour', 'Three hours', 'All day', 'Two hours'],
        correct: 3,
        explain: '午前十時から十二時まで — from ten to twelve, so two hours.'
      },
      {
        prompt: 'Why does the writer want to see a film on Thursday?',
        kind: 'inference',
        options: [
          'It is a free day',
          'A friend asked the writer to go',
          'Cinema tickets are cheap on Thursdays',
          'The class is cancelled'
        ],
        correct: 0,
        explain: '木曜日は何もありませんから — nothing is planned on Thursday, so there is time for a film.'
      },
      {
        prompt: 'What will the writer do on Saturday?',
        kind: 'detail',
        options: ['Play tennis', 'Rest at home all day', 'Eat dinner with friends', 'Go to class'],
        correct: 1,
        explain: '土曜日は一日中家で休みます — the writer rests at home all day.'
      }
    ],
    glossary: [
      { word: '午前', reading: 'ごぜん', gloss: 'morning, a.m.' },
      { word: '日本語', reading: 'にほんご', gloss: 'Japanese (language)' },
      { word: '映画', reading: 'えいが', gloss: 'film, movie' },
      { word: '晩ごはん', reading: 'ばんごはん', gloss: 'dinner' },
      { word: '一日中', reading: 'いちにちじゅう', gloss: 'all day long' }
    ]
  },
  {
    key: 'n5-25-kyouto-kara-no-hagaki',
    title: '京都[きょうと]からのはがき',
    level: 'N5',
    topic: 'Letters',
    text:
      'おばあちゃんへ\n' +
      'お元気[げんき]ですか。今[いま]、京都[きょうと]にいます。京都[きょうと]は古[ふる]いお寺[てら]が多[おお]くて、とてもきれいです。きのうは友[とも]だちと有名[ゆうめい]なお寺[てら]へ行[い]きました。人[ひと]が多[おお]かったですが、楽[たの]しかったです。食[た]べ物[もの]はおいしいですが、少[すこ]し高[たか]いです。日曜日[にちようび]に帰[かえ]ります。',
    questions: [
      {
        prompt: 'What is this postcard mainly about?',
        kind: 'main-idea',
        options: ['A new job in Kyoto', 'A problem at a hotel', 'A school test', 'A trip to Kyoto'],
        correct: 3,
        explain: 'The writer is in Kyoto now, visits a temple with a friend and goes home on Sunday.'
      },
      {
        prompt: 'What does the writer say Kyoto has many of?',
        kind: 'detail',
        options: ['Old temples', 'Tall buildings', 'Parks', 'Shops'],
        correct: 0,
        explain: '京都は古いお寺が多くて — Kyoto has many old temples.'
      },
      {
        prompt: 'What does the writer say about the food?',
        kind: 'detail',
        options: [
          'Cheap but not tasty',
          'Tasty but a little expensive',
          'Too spicy',
          'Not very different from food at home'
        ],
        correct: 1,
        explain: '食べ物はおいしいですが、少し高いです — tasty, but a little expensive.'
      },
      {
        prompt: 'How did the writer feel about the crowded temple?',
        kind: 'inference',
        options: [
          'Angry at the crowd',
          'Bored after an hour',
          'It was still fun',
          'Tired and wanting to go home'
        ],
        correct: 2,
        explain: '人が多かったですが、楽しかったです — crowded, but it was fun.'
      }
    ],
    glossary: [
      { word: 'お元気', reading: 'おげんき', gloss: 'well, in good health' },
      { word: '京都', reading: 'きょうと', gloss: 'Kyoto' },
      { word: 'お寺', reading: 'おてら', gloss: 'temple' },
      { word: '有名', reading: 'ゆうめい', gloss: 'famous' },
      { word: '楽しかった', reading: 'たのしかった', gloss: 'was fun' }
    ]
  }
]
