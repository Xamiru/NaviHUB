import type { JpPassage } from '../types'

// N4 graded reading, second set (2026-10-16): passages 10-25, so a reading
// learner has weeks of N4 text before moving up. Keys FROZEN. Same rules as
// ./n4.ts and tests/jpReadings.test.ts.
export const N4_MORE_PASSAGES: JpPassage[] = [
  {
    key: 'n4-10-manga-kissa',
    title: '漫画喫茶[まんがきっさ]で',
    level: 'N4',
    topic: 'Manga',
    text:
      '日曜日[にちようび]、雨[あめ]が降[ふ]っていたので、駅前[えきまえ]の漫画喫茶[まんがきっさ]に行[い]きました。\n' +
      '店[みせ]には漫画[まんが]が三万冊[さんまんさつ]もあって、どれを読[よ]むか決[き]めるのに時間[じかん]がかかりました。友[とも]だちがすすめてくれた古[ふる]いサッカーの漫画[まんが]を一巻[いっかん]から読[よ]み始[はじ]めました。\n' +
      '気[き]がついたら、もう夜[よる]の八時[はちじ]でした。十巻[じっかん]まで読[よ]みましたが、まだ半分[はんぶん]も終[お]わっていません。来週[らいしゅう]も来[く]るつもりです。',
    questions: [
      {
        prompt: 'Why did the writer go to the manga café?',
        kind: 'detail',
        options: [
          'It was raining that Sunday.',
          'A friend was working there.',
          'The café was giving away free comics.',
          'The writer had a test about manga.'
        ],
        correct: 0,
        explain: 'The first sentence gives the reason with ame ga futte ita node: it was raining, so the writer went indoors.'
      },
      {
        prompt: 'Which manga did the writer start reading?',
        kind: 'detail',
        options: [
          'A new manga that came out that week.',
          'The most popular manga in the shop.',
          'An old football manga a friend recommended.',
          'A manga about a café owner and the regular customers.'
        ],
        correct: 2,
        explain: 'Tomodachi ga susumete kureta furui sakkā no manga: an old football manga that a friend recommended.'
      },
      {
        prompt: 'What does "ki ga tsuitara" tell us in the last paragraph?',
        kind: 'vocab',
        options: [
          'The writer felt sick after reading.',
          'The writer forgot to pay at the counter.',
          'The writer decided to stop reading.',
          'Time passed without the writer noticing.'
        ],
        correct: 3,
        explain: 'Ki ga tsuitara means "when I noticed": the writer was so absorbed that it was suddenly eight in the evening.'
      },
      {
        prompt: 'How does the writer feel about the manga?',
        kind: 'inference',
        options: [
          'Bored, because the story is too long.',
          'Interested enough to come back next week.',
          'Angry that the shop closed early.',
          'Disappointed that the ending was sad.'
        ],
        correct: 1,
        explain: 'Ten volumes in one day and raishū mo kuru tsumori desu show the writer wants to keep reading.'
      }
    ],
    glossary: [
      { word: '漫画喫茶', reading: 'まんがきっさ', gloss: 'manga café' },
      { word: '一巻', reading: 'いっかん', gloss: 'volume one' },
      { word: '半分', reading: 'はんぶん', gloss: 'half' },
      { word: 'つもり', reading: 'つもり', gloss: 'intention, plan' }
    ]
  },
  {
    key: 'n4-11-onsen',
    title: '家族[かぞく]で温泉[おんせん]へ',
    level: 'N4',
    topic: 'Travel',
    text:
      '先月[せんげつ]、家族[かぞく]と山[やま]の中[なか]の温泉[おんせん]に行[い]きました。電車[でんしゃ]とバスで四時間[よじかん]かかりましたが、窓[まど]から見[み]える紅葉[こうよう]がとてもきれいでした。\n' +
      '旅館[りょかん]に着[つ]いてすぐ、外[そと]のお風呂[ふろ]に入[はい]りました。空気[くうき]は冷[つめ]たかったですが、お湯[ゆ]は熱[あつ]くて、体[からだ]がすぐに温[あたた]かくなりました。\n' +
      '夜[よる]は父[ちち]と将棋[しょうぎ]をして、三回[さんかい]とも負[ま]けてしまいました。',
    questions: [
      {
        prompt: 'What did the writer enjoy on the way to the hot spring?',
        kind: 'detail',
        options: [
          'Eating a big lunch they bought at the station on the bus.',
          'Sleeping on the train.',
          'Talking with the bus driver.',
          'The autumn leaves outside the window.'
        ],
        correct: 3,
        explain: 'Mado kara mieru kōyō ga totemo kirei deshita: the autumn colours seen from the window were beautiful.'
      },
      {
        prompt: 'What was the outdoor bath like?',
        kind: 'detail',
        options: [
          'The air was cold, but the water was hot.',
          'Both the air and the water were cold.',
          'It was closed because of the weather.',
          'It was too crowded to get in.'
        ],
        correct: 0,
        explain: 'Kūki wa tsumetakatta desu ga, oyu wa atsukute: cold air, hot water, and the writer warmed up quickly.'
      },
      {
        prompt: 'What does "makete shimaimashita" show about the shogi games?',
        kind: 'vocab',
        options: [
          'The writer won every game easily.',
          'The writer lost all three, to their regret.',
          'The games were stopped before the end.',
          'The writer did not want to play shogi with the father at all.'
        ],
        correct: 1,
        explain: 'Makeru is "to lose", and te shimau adds regret: the writer lost all three games (sankai tomo) and was not pleased about it.'
      },
      {
        prompt: 'What is the passage mainly about?',
        kind: 'main-idea',
        options: [
          'How to choose a good ryokan.',
          'Why the writer dislikes long bus trips.',
          'A pleasant family trip to a hot spring.',
          'Learning to play shogi from a teacher.'
        ],
        correct: 2,
        explain: 'The three paragraphs follow one family trip: the journey, the bath and the evening.'
      }
    ],
    glossary: [
      { word: '温泉', reading: 'おんせん', gloss: 'hot spring' },
      { word: '紅葉', reading: 'こうよう', gloss: 'autumn leaves' },
      { word: '旅館', reading: 'りょかん', gloss: 'Japanese inn' },
      { word: '将棋', reading: 'しょうぎ', gloss: 'shogi (Japanese chess)' }
    ]
  },
  {
    key: 'n4-12-neko-no-sewa',
    title: '友[とも]だちの猫[ねこ]',
    level: 'N4',
    topic: 'Pets',
    text:
      '友[とも]だちが一週間[いっしゅうかん]旅行[りょこう]に行[い]くので、猫[ねこ]の世話[せわ]を頼[たの]まれました。猫[ねこ]の名前[なまえ]はモチです。\n' +
      '最初[さいしょ]の日[ひ]、モチはベッドの下[した]に隠[かく]れて、全然[ぜんぜん]出[で]てきませんでした。ご飯[はん]を置[お]いておくと、夜[よる]の間[あいだ]に食[た]べたようでした。\n' +
      '三日目[みっかめ]から、モチは私[わたし]のひざの上[うえ]で寝[ね]るようになりました。友[とも]だちが帰[かえ]ってきた日[ひ]は、少[すこ]し寂[さび]しかったです。',
    questions: [
      {
        prompt: 'Why was the writer looking after Mochi?',
        kind: 'detail',
        options: [
          'Mochi had been found on the street.',
          'The friend went on a week-long trip.',
          'The writer wanted to buy a cat.',
          'The friend was sick in hospital.'
        ],
        correct: 1,
        explain: 'Tomodachi ga isshūkan ryokō ni iku node: the friend was travelling for a week, so the writer was asked to help.'
      },
      {
        prompt: 'How did Mochi behave on the first day?',
        kind: 'detail',
        options: [
          'It played with the writer all day.',
          'It refused to eat anything.',
          'It hid under the bed and stayed there.',
          'It tried to run out of the door.'
        ],
        correct: 2,
        explain: 'Beddo no shita ni kakurete, zenzen dete kimasen deshita: Mochi hid and would not come out, though it ate the food at night.'
      },
      {
        prompt: 'What changed from the third day?',
        kind: 'inference',
        options: [
          'Mochi began to trust the writer.',
          'Mochi stopped eating its food.',
          'The friend came home early.',
          'The writer moved Mochi to another room.'
        ],
        correct: 0,
        explain: 'Sleeping on the writer\'s lap (hiza no ue de neru yō ni narimashita) shows the cat had grown used to them.'
      },
      {
        prompt: 'How did the writer feel when the friend came back?',
        kind: 'detail',
        options: [
          'Happy to be free again.',
          'Worried that Mochi was sick.',
          'Angry about the extra work.',
          'A little lonely.'
        ],
        correct: 3,
        explain: 'Sukoshi sabishikatta desu: the writer felt a little lonely after a week with the cat.'
      }
    ],
    glossary: [
      { word: '世話', reading: 'せわ', gloss: 'looking after, care' },
      { word: '隠れて', reading: 'かくれて', gloss: 'hiding' },
      { word: 'ひざ', reading: 'ひざ', gloss: 'lap, knee' },
      { word: '寂しかった', reading: 'さびしかった', gloss: 'was lonely' }
    ]
  },
  {
    key: 'n4-13-yoru-no-konbini',
    title: '夜[よる]のコンビニ',
    level: 'N4',
    topic: 'Daily life',
    text:
      '大学[だいがく]の近[ちか]くのコンビニで、夜[よる]の十時[じゅうじ]から働[はたら]いています。夜[よる]はお客[きゃく]さんが少[すく]ないと思[おも]っていましたが、そうではありませんでした。\n' +
      '仕事[しごと]が終[お]わった人[ひと]や、試験[しけん]の勉強[べんきょう]をしている学生[がくせい]がよく来[き]ます。一番[いちばん]売[う]れるのは、温[あたた]かいおにぎりとコーヒーです。\n' +
      '毎晩[まいばん]同[おな]じ時間[じかん]に来[く]るおじいさんがいて、いつも「お疲[つか]れさま」と言[い]ってくれます。',
    questions: [
      {
        prompt: 'What did the writer expect before starting the job?',
        kind: 'detail',
        options: [
          'That the work would be dangerous at night.',
          'That the pay would be very high.',
          'That few customers would come at night.',
          'That the shop would close at ten.'
        ],
        correct: 2,
        explain: 'Kyaku-san ga sukunai to omotte imashita ga, sō de wa arimasen deshita: the writer thought nights were quiet, and was wrong.'
      },
      {
        prompt: 'What sells best at night?',
        kind: 'detail',
        options: [
          'Warm rice balls and coffee.',
          'Magazines and manga.',
          'Cold drinks and ice cream.',
          'Lunch boxes for the next day.'
        ],
        correct: 0,
        explain: 'Ichiban ureru no wa, atatakai onigiri to kōhī desu.'
      },
      {
        prompt: 'What does the old man\'s "otsukaresama" express?',
        kind: 'vocab',
        options: [
          'A complaint about the service.',
          'A request for a discount.',
          'A question about the opening hours.',
          'Thanks for the writer\'s hard work.'
        ],
        correct: 3,
        explain: 'Otsukaresama thanks someone for their effort, so the old man is kindly recognising the late-night work.'
      },
      {
        prompt: 'What is the main point of the passage?',
        kind: 'main-idea',
        options: [
          'Night shifts are far too tiring for students who also have classes.',
          'A late-night shop is busier and friendlier than expected.',
          'Convenience stores should close earlier.',
          'Coffee is better at night than in the morning.'
        ],
        correct: 1,
        explain: 'The writer learns the night is busy and finds a friendly regular: busier and kinder than expected.'
      }
    ],
    glossary: [
      { word: 'お客さん', reading: 'おきゃくさん', gloss: 'customer' },
      { word: '試験', reading: 'しけん', gloss: 'exam' },
      { word: '売れる', reading: 'うれる', gloss: 'to sell (well)' },
      { word: 'お疲れさま', reading: 'おつかれさま', gloss: 'thanks for your hard work' }
    ]
  },
  {
    key: 'n4-14-tanjoubi-keeki',
    title: '母[はは]の誕生日[たんじょうび]',
    level: 'N4',
    topic: 'Family',
    text:
      '母[はは]の誕生日[たんじょうび]に、妹[いもうと]と二人[ふたり]でケーキを作[つく]ることにしました。料理[りょうり]の動画[どうが]を見[み]ながら作[つく]りましたが、オーブンの温度[おんど]をまちがえて、少[すこ]し焦[こ]げてしまいました。\n' +
      'でも、焦[こ]げたところを切[き]って、いちごをたくさんのせたら、きれいになりました。\n' +
      '母[はは]は一口[ひとくち]食[た]べて、「お店[みせ]のよりおいしい」と笑[わら]いました。',
    questions: [
      {
        prompt: 'Who made the cake?',
        kind: 'detail',
        options: [
          'The writer\'s mother.',
          'A shop near the house.',
          'The writer and the younger sister.',
          'The writer alone, while the sister was at school.'
        ],
        correct: 2,
        explain: 'Imōto to futari de kēki o tsukuru koto ni shimashita: the writer and the younger sister made it together.'
      },
      {
        prompt: 'What went wrong while baking?',
        kind: 'detail',
        options: [
          'They used the wrong oven temperature.',
          'They forgot to buy strawberries.',
          'The video stopped in the middle.',
          'Their mother came home too early.'
        ],
        correct: 0,
        explain: 'Ōbun no ondo o machigaete, sukoshi kogete shimaimashita: the wrong temperature burnt the cake a little.'
      },
      {
        prompt: 'How did they fix the problem?',
        kind: 'detail',
        options: [
          'They gave up and bought a new cake from a shop near the station.',
          'They baked a second cake.',
          'They covered it with chocolate.',
          'They cut off the burnt part and added strawberries.'
        ],
        correct: 3,
        explain: 'Kogeta tokoro o kitte, ichigo o takusan nosetara: they trimmed it and piled strawberries on top.'
      },
      {
        prompt: 'What does the mother\'s comment suggest?',
        kind: 'inference',
        options: [
          'She wanted a cake from a shop instead.',
          'She was happy with the cake the two of them made.',
          'She noticed that the cake was burnt.',
          'She did not like strawberries.'
        ],
        correct: 1,
        explain: 'She laughs and says it tastes better than a shop cake: she is pleased, whatever the burnt edges.'
      }
    ],
    glossary: [
      { word: '動画', reading: 'どうが', gloss: 'video' },
      { word: '温度', reading: 'おんど', gloss: 'temperature' },
      { word: '焦げて', reading: 'こげて', gloss: 'getting burnt' },
      { word: '一口', reading: 'ひとくち', gloss: 'one bite' }
    ]
  },
  {
    key: 'n4-15-densha-okure',
    title: '電車[でんしゃ]が止[と]まった朝[あさ]',
    level: 'N4',
    topic: 'Notice',
    text:
      '朝[あさ]、駅[えき]に着[つ]くと、「大雪[おおゆき]のため、電車[でんしゃ]が止[と]まっています」というお知[し]らせが出[で]ていました。\n' +
      '駅員[えきいん]さんによると、動[うご]き始[はじ]めるのは十時[じゅうじ]ごろだそうです。会社[かいしゃ]に電話[でんわ]をすると、課長[かちょう]は「無理[むり]をしないで、家[いえ]で仕事[しごと]をしてください」と言[い]いました。\n' +
      '帰[かえ]る途中[とちゅう]、雪[ゆき]だるまを作[つく]っている子[こ]どもたちを見[み]ました。',
    questions: [
      {
        prompt: 'Why had the trains stopped?',
        kind: 'detail',
        options: [
          'Because of heavy snow.',
          'Because of an accident on the line.',
          'Because the station was being repaired.',
          'Because of a strike by the staff.'
        ],
        correct: 0,
        explain: 'Ōyuki no tame: "because of heavy snow" is in the station notice itself.'
      },
      {
        prompt: 'When did the station staff say the trains would start again?',
        kind: 'detail',
        options: [
          'At around noon.',
          'Not until the evening.',
          'The next morning.',
          'At around ten o\'clock.'
        ],
        correct: 3,
        explain: 'Ugokihajimeru no wa jūji goro da sō desu: around ten, reported with the hearsay sō desu.'
      },
      {
        prompt: 'What did the section manager tell the writer to do?',
        kind: 'detail',
        options: [
          'Take a taxi to the office.',
          'Wait at the station until ten.',
          'Work from home instead.',
          'Take the whole day off.'
        ],
        correct: 2,
        explain: 'Muri o shinai de, ie de shigoto o shite kudasai: do not push it, work at home.'
      },
      {
        prompt: 'What is the mood of the last sentence?',
        kind: 'inference',
        options: [
          'Angry about the lost morning.',
          'Calm, even a little cheerful.',
          'Worried about being late again.',
          'Afraid of slipping on the ice.'
        ],
        correct: 1,
        explain: 'Children building a snowman close the scene on a light note after the trouble at the station.'
      }
    ],
    glossary: [
      { word: '大雪', reading: 'おおゆき', gloss: 'heavy snow' },
      { word: '駅員', reading: 'えきいん', gloss: 'station staff' },
      { word: '課長', reading: 'かちょう', gloss: 'section manager' },
      { word: '雪だるま', reading: 'ゆきだるま', gloss: 'snowman' }
    ]
  },
  {
    key: 'n4-16-figyua',
    title: '秋葉原[あきはばら]のフィギュア',
    level: 'N4',
    topic: 'Hobby',
    text:
      '好[す]きなアニメのフィギュアがほしくて、初[はじ]めて秋葉原[あきはばら]に行[い]きました。駅[えき]を出[で]ると、大[おお]きな看板[かんばん]がたくさんあって、どこへ行[い]けばいいか分[わ]かりませんでした。\n' +
      '五軒[ごけん]目[め]の店[みせ]で、やっと見[み]つけました。でも、値段[ねだん]を見[み]て驚[おどろ]きました。一[いっ]か月[げつ]分[ぶん]のお小遣[こづか]いより高[たか]かったのです。\n' +
      'その日[ひ]は写真[しゃしん]だけ撮[と]って帰[かえ]りました。',
    questions: [
      {
        prompt: 'Why did the writer go to Akihabara?',
        kind: 'detail',
        options: [
          'To meet a friend from an anime club.',
          'To buy a figure from a favourite anime.',
          'To sell old games.',
          'To see a famous signboard.'
        ],
        correct: 1,
        explain: 'Suki na anime no figyua ga hoshikute: the writer wanted a figure from a favourite anime.'
      },
      {
        prompt: 'What was the problem when the writer left the station?',
        kind: 'detail',
        options: [
          'All the shops were closed because it was a national holiday that day.',
          'It started to rain heavily.',
          'The writer lost their wallet.',
          'There were so many signs that it was hard to know where to go.'
        ],
        correct: 3,
        explain: 'Kanban ga takusan atte, doko e ikeba ii ka wakarimasen deshita: so many signs that the writer did not know where to go.'
      },
      {
        prompt: 'Why was the writer surprised by the price?',
        kind: 'inference',
        options: [
          'It cost more than a month of pocket money.',
          'It was much cheaper than online.',
          'The shop gave a big discount.',
          'The price was written in dollars.'
        ],
        correct: 0,
        explain: 'Ikkagetsu-bun no okozukai yori takakatta: more than a whole month of the writer\'s allowance.'
      },
      {
        prompt: 'What did the writer do in the end?',
        kind: 'detail',
        options: [
          'Bought the figure anyway.',
          'Ordered it to be delivered later.',
          'Only took a photo and went home.',
          'Asked the shop to keep it.'
        ],
        correct: 2,
        explain: 'Shashin dake totte kaerimashita: just a photo, then home.'
      }
    ],
    glossary: [
      { word: 'フィギュア', reading: 'フィギュア', gloss: 'figure (collectible)' },
      { word: '看板', reading: 'かんばん', gloss: 'signboard' },
      { word: '値段', reading: 'ねだん', gloss: 'price' },
      { word: 'お小遣い', reading: 'おこづかい', gloss: 'pocket money' }
    ]
  },
  {
    key: 'n4-17-tsuyu',
    title: '梅雨[つゆ]の日記[にっき]',
    level: 'N4',
    topic: 'Diary',
    text:
      '六月[ろくがつ]になってから、毎日[まいにち]雨[あめ]が降[ふ]っています。洗濯物[せんたくもの]が乾[かわ]かないので、部屋[へや]の中[なか]に干[ほ]していますが、なかなか乾[かわ]きません。\n' +
      '今日[きょう]は傘[かさ]を持[も]って出[で]かけるのを忘[わす]れて、学校[がっこう]からの帰[かえ]り道[みち]でぬれてしまいました。\n' +
      'でも、雨[あめ]の中[なか]で咲[さ]いているあじさいはとてもきれいです。早[はや]く梅雨[つゆ]が終[お]わってほしいけれど、この花[はな]を見[み]られなくなるのは少[すこ]し残念[ざんねん]です。',
    questions: [
      {
        prompt: 'What is the problem with the laundry?',
        kind: 'detail',
        options: [
          'It will not dry, even indoors.',
          'The washing machine is broken.',
          'The wind blew it away.',
          'There is no room to hang it outside.'
        ],
        correct: 0,
        explain: 'Heya no naka ni hoshite imasu ga, nakanaka kawakimasen: hung inside, it still hardly dries.'
      },
      {
        prompt: 'Why did the writer get wet today?',
        kind: 'detail',
        options: [
          'A car splashed water on them.',
          'Their umbrella broke in the wind.',
          'They lent their umbrella to a friend.',
          'They forgot to take an umbrella.'
        ],
        correct: 3,
        explain: 'Kasa o motte dekakeru no o wasurete: the writer forgot to take an umbrella.'
      },
      {
        prompt: 'What does "nakanaka kawakimasen" mean?',
        kind: 'vocab',
        options: [
          'It dries in the middle only.',
          'It dries very quickly.',
          'It hardly dries, however long you wait.',
          'It never gets wet at all.'
        ],
        correct: 2,
        explain: 'Nakanaka with a negative means "not easily, hardly": the laundry will not dry however long it hangs.'
      },
      {
        prompt: 'How does the writer feel about the end of the rainy season?',
        kind: 'inference',
        options: [
          'Only glad, with no regrets.',
          'Mixed: glad, but sorry to lose the flowers.',
          'Worried that summer will be too hot.',
          'Indifferent, because they stay indoors.'
        ],
        correct: 1,
        explain: 'Hayaku owatte hoshii keredo … sukoshi zannen: the writer wants it over but will miss the hydrangeas.'
      }
    ],
    glossary: [
      { word: '梅雨', reading: 'つゆ', gloss: 'the rainy season' },
      { word: '洗濯物', reading: 'せんたくもの', gloss: 'laundry' },
      { word: '乾かない', reading: 'かわかない', gloss: 'does not dry' },
      { word: 'あじさい', reading: 'あじさい', gloss: 'hydrangea' }
    ]
  },
  {
    key: 'n4-18-kotoba-koukan',
    title: '言葉[ことば]の交換[こうかん]',
    level: 'N4',
    topic: 'Friends',
    text:
      '毎週[まいしゅう]木曜日[もくようび]、カフェでアメリカ人[じん]のトムさんと会[あ]っています。三十分[さんじゅっぷん]は日本語[にほんご]で、三十分[さんじゅっぷん]は英語[えいご]で話[はな]します。\n' +
      'トムさんは漢字[かんじ]が苦手[にがて]ですが、話[はな]すのはとても上手[じょうず]です。私[わたし]は反対[はんたい]で、読[よ]むのは得意[とくい]ですが、話[はな]すときは緊張[きんちょう]してしまいます。\n' +
      '二人[ふたり]で教[おし]え合[あ]うと、自分[じぶん]の弱[よわ]いところがよく分[わ]かります。',
    questions: [
      {
        prompt: 'How do the writer and Tom use their time together?',
        kind: 'detail',
        options: [
          'They study kanji for the full hour.',
          'They only speak English to help the writer.',
          'They watch Japanese films without talking.',
          'Half the time in Japanese, half in English.'
        ],
        correct: 3,
        explain: 'Sanjuppun wa nihongo de, sanjuppun wa eigo de: thirty minutes in each language.'
      },
      {
        prompt: 'What is Tom good at?',
        kind: 'detail',
        options: [
          'Speaking Japanese.',
          'Writing kanji.',
          'Reading long texts.',
          'Teaching grammar rules.'
        ],
        correct: 0,
        explain: 'Kanji ga nigate desu ga, hanasu no wa totemo jōzu: weak at kanji, but a good speaker.'
      },
      {
        prompt: 'What does "hantai" mean in the second paragraph?',
        kind: 'vocab',
        options: [
          'The writer disagrees with Tom.',
          'The writer is the opposite of Tom.',
          'The writer sits across the table.',
          'The writer refuses to speak.'
        ],
        correct: 1,
        explain: 'Watashi wa hantai de: the writer is the reverse case, good at reading and nervous when speaking.'
      },
      {
        prompt: 'What does the writer learn from these meetings?',
        kind: 'main-idea',
        options: [
          'That English is easier than Japanese.',
          'That cafés are too noisy for study.',
          'Where their own weak points are.',
          'That Tom should study more kanji.'
        ],
        correct: 2,
        explain: 'Jibun no yowai tokoro ga yoku wakarimasu: teaching each other shows each person their weak points.'
      }
    ],
    glossary: [
      { word: '苦手', reading: 'にがて', gloss: 'weak at, not good at' },
      { word: '得意', reading: 'とくい', gloss: 'good at' },
      { word: '緊張', reading: 'きんちょう', gloss: 'nervousness' },
      { word: '教え合う', reading: 'おしえあう', gloss: 'to teach each other' }
    ]
  },
  {
    key: 'n4-19-michi-ni-mayou',
    title: '道[みち]に迷[まよ]った日[ひ]',
    level: 'N4',
    topic: 'Story',
    text:
      '大阪[おおさか]で友[とも]だちの家[いえ]に行[い]くとき、スマホの電池[でんち]が切[き]れてしまいました。住所[じゅうしょ]は覚[おぼ]えていましたが、道[みち]が分[わ]かりません。\n' +
      '近[ちか]くのパン屋[や]で道[みち]を聞[き]くと、店[みせ]の人[ひと]が紙[かみ]に地図[ちず]を書[か]いてくれました。それに、焼[や]きたてのパンを一[ひと]つくれました。\n' +
      '友[とも]だちの家[いえ]に着[つ]いたとき、私[わたし]はパンの話[はなし]ばかりしていました。',
    questions: [
      {
        prompt: 'Why could the writer not find the way?',
        kind: 'detail',
        options: [
          'They had forgotten the address.',
          'Their phone battery ran out.',
          'The friend gave the wrong address.',
          'The streets were closed for a festival.'
        ],
        correct: 1,
        explain: 'Sumaho no denchi ga kirete shimaimashita: the phone died, so the map was gone, though the address was remembered.'
      },
      {
        prompt: 'How did the bakery staff help?',
        kind: 'detail',
        options: [
          'They drove the writer to the house.',
          'They lent the writer a phone charger.',
          'They drew a map on paper.',
          'They called the writer\'s friend.'
        ],
        correct: 2,
        explain: 'Kami ni chizu o kaite kuremashita: a hand-drawn map on paper.'
      },
      {
        prompt: 'What does "sore ni" add in the second paragraph?',
        kind: 'vocab',
        options: [
          'On top of that, there was more kindness.',
          'After that, the shop closed.',
          'Because of that, the writer got lost again.',
          'Instead of that, they gave directions.'
        ],
        correct: 0,
        explain: 'Sore ni means "besides, on top of that": as well as the map, the staff gave a fresh loaf too.'
      },
      {
        prompt: 'Why did the writer talk about bread so much at the friend\'s house?',
        kind: 'inference',
        options: [
          'The friend works at a bakery.',
          'The writer was very hungry after walking around for a long time.',
          'The writer wanted to open a bakery.',
          'The kindness at the bakery left a strong impression.'
        ],
        correct: 3,
        explain: 'After the map and the free bread, the bakery visit is what the writer wanted to talk about: it left a strong impression.'
      }
    ],
    glossary: [
      { word: '電池', reading: 'でんち', gloss: 'battery' },
      { word: '住所', reading: 'じゅうしょ', gloss: 'address' },
      { word: '地図', reading: 'ちず', gloss: 'map' },
      { word: '焼きたて', reading: 'やきたて', gloss: 'freshly baked' }
    ]
  },
  {
    key: 'n4-20-sensei-e-meeru',
    title: '先生[せんせい]へのメール',
    level: 'N4',
    topic: 'Email',
    text:
      '山田先生[やまだせんせい]\n' +
      'すみません、熱[ねつ]があるので、明日[あした]の授業[じゅぎょう]を休[やす]ませてください。昨日[きのう]の夜[よる]から頭[あたま]が痛[いた]くて、今朝[けさ]病院[びょういん]に行[い]ったら、二[に]、三日[さんにち]は家[いえ]で寝[ね]ていたほうがいいと言[い]われました。\n' +
      '来週[らいしゅう]の発表[はっぴょう]の準備[じゅんび]は、家[いえ]でも続[つづ]けます。資料[しりょう]ができたら、メールで送[おく]ります。\n' +
      '林[はやし]',
    questions: [
      {
        prompt: 'Why is Hayashi writing to the teacher?',
        kind: 'main-idea',
        options: [
          'To ask for help with a presentation.',
          'To say they will miss tomorrow\'s class.',
          'To complain about a hospital.',
          'To change the date of a test.'
        ],
        correct: 1,
        explain: 'Ashita no jugyō o yasumasete kudasai: a polite request to be excused from tomorrow\'s class.'
      },
      {
        prompt: 'What did the doctor say?',
        kind: 'detail',
        options: [
          'Hayashi should stay home in bed for two or three days.',
          'Hayashi could go to class tomorrow.',
          'Hayashi needs to come back next week.',
          'Hayashi should take the medicine and still come to class tomorrow.'
        ],
        correct: 0,
        explain: 'Ni-san-nichi wa ie de nete ita hō ga ii: better to rest at home for two or three days.'
      },
      {
        prompt: 'What does "yasumasete kudasai" express?',
        kind: 'vocab',
        options: [
          'An order to the teacher.',
          'A question about the timetable for next week\'s classes.',
          'An apology for being late.',
          'A polite request for permission to be absent.'
        ],
        correct: 3,
        explain: 'The causative yasumaseru (te-form yasumasete) + kudasai asks to be allowed: "please let me take the day off".'
      },
      {
        prompt: 'What will Hayashi do about next week\'s presentation?',
        kind: 'detail',
        options: [
          'Ask a classmate to present instead.',
          'Cancel it until after the illness.',
          'Keep preparing at home and email the materials.',
          'Present it by video call tomorrow.'
        ],
        correct: 2,
        explain: 'Ie de mo tsuzukemasu … shiryō ga dekitara, mēru de okurimasu: work continues at home, materials by email.'
      }
    ],
    glossary: [
      { word: '授業', reading: 'じゅぎょう', gloss: 'class, lesson' },
      { word: '発表', reading: 'はっぴょう', gloss: 'presentation' },
      { word: '準備', reading: 'じゅんび', gloss: 'preparation' },
      { word: '資料', reading: 'しりょう', gloss: 'materials, handout' }
    ]
  },
  {
    key: 'n4-21-hanabi',
    title: '夏[なつ]の花火大会[はなびたいかい]',
    level: 'N4',
    topic: 'Event',
    text:
      '八月[はちがつ]の土曜日[どようび]、川[かわ]の近[ちか]くで花火大会[はなびたいかい]がありました。人[ひと]がとても多[おお]いので、友[とも]だちと昼[ひる]の三時[さんじ]から場所[ばしょ]を取[と]っておきました。\n' +
      '浴衣[ゆかた]を着[き]て、屋台[やたい]でたこ焼[や]きとかき氷[ごおり]を買[か]いました。\n' +
      '七時半[しちじはん]に最初[さいしょ]の花火[はなび]が上[あ]がると、周[まわ]りの人[ひと]がみんな「わあ」と言[い]いました。帰[かえ]りの電車[でんしゃ]はとても混[こ]んでいましたが、いい思[おも]い出[で]になりました。',
    questions: [
      {
        prompt: 'Why did the writer arrive at three in the afternoon?',
        kind: 'detail',
        options: [
          'To get a good spot before the crowds.',
          'To help the stalls set up.',
          'Because the fireworks started at three.',
          'To buy a yukata before the shops closed.'
        ],
        correct: 0,
        explain: 'Hito ga totemo ōi node … basho o totte okimashita: they claimed a spot early because of the crowds.'
      },
      {
        prompt: 'What did the writer buy at the stalls?',
        kind: 'detail',
        options: [
          'A yukata and a fan.',
          'Grilled fish and juice.',
          'Fireworks to take home.',
          'Takoyaki and shaved ice.'
        ],
        correct: 3,
        explain: 'Yatai de takoyaki to kakigōri o kaimashita.'
      },
      {
        prompt: 'What does "totte okimashita" show?',
        kind: 'vocab',
        options: [
          'They took the spot from another group that had arrived first.',
          'They gave up their spot.',
          'They took the spot in advance, ready for later.',
          'They forgot to take a spot.'
        ],
        correct: 2,
        explain: 'Te oku means doing something in advance: they secured the place hours ahead.'
      },
      {
        prompt: 'How does the writer sum up the evening?',
        kind: 'inference',
        options: [
          'Tiring and not worth the crowds.',
          'A good memory despite the busy train.',
          'Disappointing, because it rained.',
          'Too expensive to do again.'
        ],
        correct: 1,
        explain: 'Densha wa totemo konde imashita ga, ii omoide ni narimashita: crowded train, but a good memory.'
      }
    ],
    glossary: [
      { word: '花火大会', reading: 'はなびたいかい', gloss: 'fireworks festival' },
      { word: '浴衣', reading: 'ゆかた', gloss: 'summer kimono' },
      { word: '屋台', reading: 'やたい', gloss: 'food stall' },
      { word: '思い出', reading: 'おもいで', gloss: 'memory' }
    ]
  },
  {
    key: 'n4-22-jimu',
    title: 'ジムに通[かよ]い始[はじ]めた',
    level: 'N4',
    topic: 'Health',
    text:
      '最近[さいきん]、階段[かいだん]を上[のぼ]るとすぐ疲[つか]れるので、会社[かいしゃ]の近[ちか]くのジムに通[かよ]い始[はじ]めました。\n' +
      '最初[さいしょ]の週[しゅう]は、次[つぎ]の日[ひ]に体[からだ]中[じゅう]が痛[いた]くて、もうやめようと思[おも]いました。でも、トレーナーに「最初[さいしょ]は軽[かる]い運動[うんどう]だけでいいですよ」と言[い]われて、続[つづ]けることにしました。\n' +
      '二[に]か月[げつ]たった今[いま]は、駅[えき]の階段[かいだん]も平気[へいき]です。',
    questions: [
      {
        prompt: 'Why did the writer join a gym?',
        kind: 'detail',
        options: [
          'A doctor told them at a check-up to lose some weight.',
          'The company paid for it.',
          'They got tired quickly when climbing stairs.',
          'A friend wanted a training partner.'
        ],
        correct: 2,
        explain: 'Kaidan o noboru to sugu tsukareru node: climbing stairs made the writer tired quickly.'
      },
      {
        prompt: 'How did the writer feel after the first week?',
        kind: 'detail',
        options: [
          'Sore all over and ready to quit.',
          'Stronger than ever before.',
          'Bored with the same exercises.',
          'Proud of losing weight.'
        ],
        correct: 0,
        explain: 'Karada-jū ga itakute, mō yameyō to omoimashita: aching everywhere, thinking of quitting.'
      },
      {
        prompt: 'What made the writer keep going?',
        kind: 'inference',
        options: [
          'A free month of training that the gym offered to new members.',
          'A friend who joined at the same time.',
          'Losing weight in the first week.',
          'The trainer saying light exercise was enough at first.'
        ],
        correct: 3,
        explain: 'Saisho wa karui undō dake de ii desu yo: being told to start easy convinced the writer to continue.'
      },
      {
        prompt: 'What does "heiki" mean in the last sentence?',
        kind: 'vocab',
        options: [
          'Dangerous.',
          'No problem at all.',
          'Very crowded.',
          'Under repair.'
        ],
        correct: 1,
        explain: 'Heiki means fine, no trouble: two months on, the station stairs are easy.'
      }
    ],
    glossary: [
      { word: '階段', reading: 'かいだん', gloss: 'stairs' },
      { word: '通い始めました', reading: 'かよいはじめました', gloss: 'started going (regularly)' },
      { word: '運動', reading: 'うんどう', gloss: 'exercise' },
      { word: '平気', reading: 'へいき', gloss: 'fine, no problem' }
    ]
  },
  {
    key: 'n4-23-karaoke',
    title: '初[はじ]めてのカラオケ',
    level: 'N4',
    topic: 'Friends',
    text:
      '歌[うた]が下手[へた]なので、カラオケにはずっと行[い]きませんでした。でも、同[おな]じクラスの人[ひと]たちに誘[さそ]われて、断[ことわ]れませんでした。\n' +
      '部屋[へや]に入[はい]ると、みんなはアニメの歌[うた]ばかり歌[うた]っていました。上手[じょうず]な人[ひと]もいましたが、下手[へた]でも大[おお]きな声[こえ]で楽[たの]しそうに歌[うた]う人[ひと]もいました。\n' +
      '私[わたし]も好[す]きなアニメの歌[うた]を一曲[いっきょく]だけ歌[うた]いました。点数[てんすう]は低[ひく]かったですが、みんなが拍手[はくしゅ]してくれました。',
    questions: [
      {
        prompt: 'Why had the writer avoided karaoke before?',
        kind: 'detail',
        options: [
          'They did not know any songs.',
          'They thought they were a bad singer.',
          'Karaoke was too expensive.',
          'Their parents did not allow it.'
        ],
        correct: 1,
        explain: 'Uta ga heta na node: the writer thought they sang badly.'
      },
      {
        prompt: 'What did the writer notice about the others?',
        kind: 'inference',
        options: [
          'Some sang badly but still had fun.',
          'Everyone was a professional singer.',
          'Nobody wanted to sing.',
          'They only sang old pop songs.'
        ],
        correct: 0,
        explain: 'Heta demo ōkina koe de tanoshisō ni utau hito mo imashita: not everyone was good, and that was fine.'
      },
      {
        prompt: 'What does "kotowaremasen deshita" mean?',
        kind: 'vocab',
        options: [
          'The writer was not invited.',
          'The writer forgot the time.',
          'The writer could not say no.',
          'The writer did not understand.'
        ],
        correct: 2,
        explain: 'Kotowaru is "to refuse", here in the potential negative: the writer could not turn the invitation down.'
      },
      {
        prompt: 'What is the passage mainly about?',
        kind: 'main-idea',
        options: [
          'How to get a high karaoke score.',
          'Why anime songs are so popular with university students today.',
          'A classmate who sings very well.',
          'Enjoying karaoke without being a good singer.'
        ],
        correct: 3,
        explain: 'A low score and applause anyway: the evening shows that skill is not the point.'
      }
    ],
    glossary: [
      { word: '下手', reading: 'へた', gloss: 'bad at' },
      { word: '誘われて', reading: 'さそわれて', gloss: 'being invited' },
      { word: '点数', reading: 'てんすう', gloss: 'score' },
      { word: '拍手', reading: 'はくしゅ', gloss: 'applause' }
    ]
  },
  {
    key: 'n4-24-sobo-no-reshipi',
    title: '祖母[そぼ]のみそ汁[しる]',
    level: 'N4',
    topic: 'Family',
    text:
      '一人[ひとり]で暮[く]らし始[はじ]めてから、祖母[そぼ]のみそ汁[しる]が飲[の]みたくなりました。電話[でんわ]で作[つく]り方[かた]を聞[き]くと、祖母[そぼ]は「だしが大切[たいせつ]だよ」と言[い]いました。\n' +
      '言[い]われたとおりに、昆布[こんぶ]と鰹節[かつおぶし]でだしを取[と]りました。時間[じかん]はかかりましたが、台所[だいどころ]がいいにおいになりました。\n' +
      '飲[の]んでみると、祖母[そぼ]の味[あじ]に近[ちか]かったです。でも、何[なに]かが少[すこ]し足[た]りない気[き]がしました。',
    questions: [
      {
        prompt: 'When did the writer start wanting the grandmother\'s miso soup?',
        kind: 'detail',
        options: [
          'After visiting the grandmother.',
          'After seeing a cooking show.',
          'After getting sick.',
          'After starting to live alone.'
        ],
        correct: 3,
        explain: 'Hitori de kurashihajimete kara: since moving out to live alone.'
      },
      {
        prompt: 'What did the grandmother say was important?',
        kind: 'detail',
        options: [
          'Using expensive miso.',
          'The soup stock.',
          'Cooking it quickly.',
          'Adding lots of tofu.'
        ],
        correct: 1,
        explain: 'Dashi ga taisetsu da yo: the stock matters most.'
      },
      {
        prompt: 'What does "iwareta tōri ni" mean?',
        kind: 'vocab',
        options: [
          'Exactly as the grandmother had said.',
          'Against the grandmother\'s advice.',
          'Without asking anyone.',
          'In a completely new way.'
        ],
        correct: 0,
        explain: 'Tōri ni means "just as": the writer followed the instructions exactly.'
      },
      {
        prompt: 'What might the writer mean by "something is missing"?',
        kind: 'inference',
        options: [
          'The writer forgot to add miso.',
          'The soup was too salty to drink.',
          'Some feeling of home cannot be copied by a recipe.',
          'The writer\'s small kitchen did not have the right kind of pot.'
        ],
        correct: 2,
        explain: 'An inference: the taste is close but not the same, so what seems to be missing is something personal rather than an ingredient.'
      }
    ],
    glossary: [
      { word: 'みそ汁', reading: 'みそしる', gloss: 'miso soup' },
      { word: 'だし', reading: 'だし', gloss: 'soup stock' },
      { word: '昆布', reading: 'こんぶ', gloss: 'kelp' },
      { word: '鰹節', reading: 'かつおぶし', gloss: 'dried bonito flakes' },
      { word: '台所', reading: 'だいどころ', gloss: 'kitchen' }
    ]
  },
  {
    key: 'n4-25-atarashii-sumaho',
    title: '新[あたら]しいスマホ',
    level: 'N4',
    topic: 'Shopping',
    text:
      '五年[ごねん]使[つか]ったスマホが急[きゅう]に動[うご]かなくなったので、新[あたら]しいのを買[か]いに行[い]きました。\n' +
      '店員[てんいん]さんがいろいろな機種[きしゅ]を説明[せつめい]してくれましたが、カメラの話[はなし]ばかりで、よく分[わ]かりませんでした。私[わたし]がほしいのは、電池[でんち]が長[なが]く持[も]って、字[じ]が大[おお]きく見[み]えるスマホです。\n' +
      '結局[けっきょく]、一番[いちばん]安[やす]いのを選[えら]びました。今[いま]のところ、困[こま]ったことはありません。',
    questions: [
      {
        prompt: 'Why did the writer buy a new phone?',
        kind: 'detail',
        options: [
          'The old phone suddenly stopped working.',
          'The writer wanted a better camera.',
          'The old phone was stolen.',
          'A shop was having a big sale.'
        ],
        correct: 0,
        explain: 'Kyū ni ugokanaku natta node: the five-year-old phone suddenly died.'
      },
      {
        prompt: 'What did the shop assistant mostly talk about?',
        kind: 'detail',
        options: [
          'Battery life.',
          'Large text on the screen.',
          'Monthly prices.',
          'The cameras.'
        ],
        correct: 3,
        explain: 'Kamera no hanashi bakari: only cameras, which the writer did not care about.'
      },
      {
        prompt: 'What does the writer want from a phone?',
        kind: 'detail',
        options: [
          'The newest design.',
          'A long-lasting battery and large text.',
          'A good camera for travel photos.',
          'Lots of storage for games.'
        ],
        correct: 1,
        explain: 'Denchi ga nagaku motte, ji ga ōkiku mieru: battery life and readable text.'
      },
      {
        prompt: 'What does "kekkyoku" tell us?',
        kind: 'vocab',
        options: [
          'The writer chose before the assistant spoke.',
          'The writer changed shops.',
          'In the end, after all the explanations.',
          'The writer bought two phones.'
        ],
        correct: 2,
        explain: 'Kekkyoku means "in the end": after all the camera talk, the writer just took the cheapest.'
      }
    ],
    glossary: [
      { word: '機種', reading: 'きしゅ', gloss: 'model (of a device)' },
      { word: '店員', reading: 'てんいん', gloss: 'shop assistant' },
      { word: '結局', reading: 'けっきょく', gloss: 'in the end' },
      { word: '選びました', reading: 'えらびました', gloss: 'chose' }
    ]
  }
]
