import type Database from 'better-sqlite3'
import {
  RADICALS_COURSE,
  COUNTERS_COURSE,
  SFX_COURSE,
  SPEECH_COURSE,
  IDIOMS_COURSE
} from './japaneseSeed2'
import {
  N2_VOCAB_COURSE,
  N2_KANJI_COURSE,
  N1_VOCAB_COURSE,
  N1_KANJI_COURSE
} from './japaneseSeed3'

// Starter content for the Japanese learning section, shipped as independent
// packs: the N5 foundations course, an N5 kanji course, and a casual/manga-
// speech course. Each pack is seeded once, guarded by its OWN settings flag
// (existing installs already carry the first flag, so later packs still land),
// and the user can freely edit or delete any of it without it coming back.
//
// Takes the db as a parameter (rather than importing connection.ts) so tests
// can run it against an in-memory database.

export interface SeedCard {
  front: string
  reading?: string
  back: string
  pos?: string
  notes?: string
  onyomi?: string
  kunyomi?: string
  exampleJp?: string
  exampleReading?: string
  exampleEn?: string
}

export interface SeedLesson {
  kind: 'grammar' | 'vocab' | 'kanji'
  title: string
  body?: string
  cards: SeedCard[]
}

export interface SeedCourse {
  title: string
  description: string
  level: string // display label, e.g. "N5", "N4–N3"
  difficulty: number // recommended study-order step (1 = start here)
  lessons: SeedLesson[]
}

const N5_COURSE: SeedCourse = {
  title: 'JLPT N5 Foundations',
  description:
    'Core beginner grammar and vocabulary, roughly following the JLPT N5 syllabus. ' +
    'Read a lesson, mark it as learned, then practice it in Review and Quiz.',
  level: 'N5',
  difficulty: 1,
  lessons: [
    {
      kind: 'vocab',
      title: 'Greetings & set phrases',
      cards: [
        { front: 'おはようございます', back: 'good morning', pos: 'expression' },
        { front: 'こんにちは', back: 'hello / good afternoon', pos: 'expression' },
        { front: 'こんばんは', back: 'good evening', pos: 'expression' },
        { front: 'さようなら', back: 'goodbye', pos: 'expression' },
        { front: 'おやすみなさい', back: 'good night', pos: 'expression' },
        { front: 'ありがとうございます', back: 'thank you', pos: 'expression' },
        { front: 'すみません', back: 'excuse me / sorry', pos: 'expression' },
        { front: 'ごめんなさい', back: 'I am sorry', pos: 'expression' },
        { front: 'はい', back: 'yes', pos: 'expression' },
        { front: 'いいえ', back: 'no', pos: 'expression' },
        { front: 'お願いします', reading: 'おねがいします', back: 'please (requesting)', pos: 'expression' },
        { front: 'はじめまして', back: 'nice to meet you', pos: 'expression' },
        {
          front: 'いただきます',
          back: 'said before eating',
          pos: 'expression',
          notes: 'Literally "I humbly receive".'
        },
        { front: 'ごちそうさまでした', back: 'said after eating', pos: 'expression' },
        { front: 'いってきます', back: "I'm off (leaving home)", pos: 'expression' },
        { front: 'ただいま', back: "I'm home", pos: 'expression' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Topics with は',
      body: `は marks the TOPIC of the sentence — what the sentence is about. Written with the kana は but pronounced "wa" when used as a particle.

Pattern: [topic] は [comment]。

私は学生です。 — "As for me, (I) am a student."

The topic is often dropped entirely once it is clear from context; Japanese prefers to omit what is obvious:

（私は）日本人です。 — "(I) am Japanese."

は is not a subject marker. It sets the frame for the sentence; whatever follows is a statement about that frame. Contrast with が (introduced later), which points at the grammatical subject itself.`,
      cards: [
        { front: '私は学生です。', reading: 'わたしはがくせいです。', back: 'I am a student.' },
        { front: 'これは本です。', reading: 'これはほんです。', back: 'This is a book.' },
        {
          front: '田中さんは先生です。',
          reading: 'たなかさんはせんせいです。',
          back: 'Mr. Tanaka is a teacher.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'です / だ — polite and plain',
      body: `です is the polite copula — "is / am / are". Its plain (casual) form is だ.

X は Y です。 — polite: "X is Y."
X は Y だ。 — plain: "X is Y."

Use です with strangers, teachers, and in most learning materials. Plain だ appears in casual speech, diaries and inner monologue — and is often dropped altogether:

これはペンです。 → これ、ペン(だ)。

Negative and past of です:
・じゃないです / ではありません — "is not"
・でした — "was"
・じゃなかったです / ではありませんでした — "was not"`,
      cards: [
        { front: '私は元気です。', reading: 'わたしはげんきです。', back: 'I am fine.' },
        { front: 'それは犬だ。', reading: 'それはいぬだ。', back: 'That is a dog. (plain)' },
        {
          front: '山田さんは医者ではありません。',
          reading: 'やまださんはいしゃではありません。',
          back: 'Ms. Yamada is not a doctor.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'People & family',
      cards: [
        { front: '人', reading: 'ひと', back: 'person', pos: 'noun' },
        { front: '男', reading: 'おとこ', back: 'man', pos: 'noun' },
        { front: '女', reading: 'おんな', back: 'woman', pos: 'noun' },
        { front: '子供', reading: 'こども', back: 'child', pos: 'noun' },
        { front: '友達', reading: 'ともだち', back: 'friend', pos: 'noun' },
        { front: '家族', reading: 'かぞく', back: 'family', pos: 'noun' },
        { front: '父', reading: 'ちち', back: '(my) father', pos: 'noun' },
        { front: '母', reading: 'はは', back: '(my) mother', pos: 'noun' },
        { front: 'お父さん', reading: 'おとうさん', back: "father (someone's / addressing)", pos: 'noun' },
        { front: 'お母さん', reading: 'おかあさん', back: "mother (someone's / addressing)", pos: 'noun' },
        { front: '兄', reading: 'あに', back: '(my) older brother', pos: 'noun' },
        { front: '姉', reading: 'あね', back: '(my) older sister', pos: 'noun' },
        { front: '弟', reading: 'おとうと', back: 'younger brother', pos: 'noun' },
        { front: '妹', reading: 'いもうと', back: 'younger sister', pos: 'noun' },
        { front: '先生', reading: 'せんせい', back: 'teacher', pos: 'noun' },
        { front: '学生', reading: 'がくせい', back: 'student', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Questions with か and question words',
      body: `Add か to the end of a statement to turn it into a question — no word-order change, and no question mark needed:

これは本です。 → これは本ですか。 — "Is this a book?"

Common question words:
・何（なに／なん） — what
・誰（だれ） — who
・どこ — where
・いつ — when
・どれ — which one
・いくら — how much

The question word simply sits where the answer would go:

トイレはどこですか。 — "Where is the toilet?"
それはいくらですか。 — "How much is that?"`,
      cards: [
        { front: 'これは何ですか。', reading: 'これはなんですか。', back: 'What is this?' },
        { front: 'トイレはどこですか。', reading: 'トイレはどこですか。', back: 'Where is the toilet?' },
        { front: 'あの人は誰ですか。', reading: 'あのひとはだれですか。', back: 'Who is that person?' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Numbers & time',
      cards: [
        { front: '一', reading: 'いち', back: 'one', pos: 'number' },
        { front: '二', reading: 'に', back: 'two', pos: 'number' },
        { front: '三', reading: 'さん', back: 'three', pos: 'number' },
        { front: '四', reading: 'よん', back: 'four', pos: 'number' },
        { front: '五', reading: 'ご', back: 'five', pos: 'number' },
        { front: '六', reading: 'ろく', back: 'six', pos: 'number' },
        { front: '七', reading: 'なな', back: 'seven', pos: 'number' },
        { front: '八', reading: 'はち', back: 'eight', pos: 'number' },
        { front: '九', reading: 'きゅう', back: 'nine', pos: 'number' },
        { front: '十', reading: 'じゅう', back: 'ten', pos: 'number' },
        { front: '百', reading: 'ひゃく', back: 'hundred', pos: 'number' },
        { front: '千', reading: 'せん', back: 'thousand', pos: 'number' },
        { front: '今日', reading: 'きょう', back: 'today', pos: 'noun' },
        { front: '明日', reading: 'あした', back: 'tomorrow', pos: 'noun' },
        { front: '昨日', reading: 'きのう', back: 'yesterday', pos: 'noun' },
        { front: '今', reading: 'いま', back: 'now', pos: 'noun' },
        { front: '時間', reading: 'じかん', back: 'time; hour', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Verb groups and the ます form',
      body: `Japanese verbs come in three groups. Dictionary form ends in -u; the polite ます form is what you'll use most at first.

Group 1 (u-verbs): the final -u column changes to -i, then ます.
・飲む → 飲みます (drink)　・書く → 書きます (write)　・話す → 話します (speak)

Group 2 (ru-verbs): drop る, add ます.
・食べる → 食べます (eat)　・見る → 見ます (see)

Group 3 (irregular — only two):
・する → します (do)　・来る（くる） → 来ます（きます） (come)

ます covers present AND future: 飲みます = "drink / will drink". Time words like 毎日 (every day) or 明日 (tomorrow) make it clear which.`,
      cards: [
        { front: '毎日水を飲みます。', reading: 'まいにちみずをのみます。', back: 'I drink water every day.' },
        { front: '七時に起きます。', reading: 'しちじにおきます。', back: 'I get up at seven.' },
        {
          front: '日本語を勉強します。',
          reading: 'にほんごをべんきょうします。',
          back: 'I study Japanese.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Everyday verbs I',
      cards: [
        { front: '行く', reading: 'いく', back: 'to go', pos: 'verb (u)' },
        { front: '来る', reading: 'くる', back: 'to come', pos: 'verb (irregular)' },
        { front: '帰る', reading: 'かえる', back: 'to return home', pos: 'verb (u)' },
        { front: '食べる', reading: 'たべる', back: 'to eat', pos: 'verb (ru)' },
        { front: '飲む', reading: 'のむ', back: 'to drink', pos: 'verb (u)' },
        { front: '見る', reading: 'みる', back: 'to see; to watch', pos: 'verb (ru)' },
        { front: '聞く', reading: 'きく', back: 'to listen; to ask', pos: 'verb (u)' },
        { front: '読む', reading: 'よむ', back: 'to read', pos: 'verb (u)' },
        { front: '書く', reading: 'かく', back: 'to write', pos: 'verb (u)' },
        { front: '話す', reading: 'はなす', back: 'to speak', pos: 'verb (u)' },
        { front: '買う', reading: 'かう', back: 'to buy', pos: 'verb (u)' },
        { front: '会う', reading: 'あう', back: 'to meet', pos: 'verb (u)' },
        { front: '起きる', reading: 'おきる', back: 'to get up; to wake', pos: 'verb (ru)' },
        { front: '寝る', reading: 'ねる', back: 'to sleep; to go to bed', pos: 'verb (ru)' },
        { front: '立つ', reading: 'たつ', back: 'to stand', pos: 'verb (u)' },
        { front: '座る', reading: 'すわる', back: 'to sit', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Objects and targets: を and に',
      body: `を marks the DIRECT OBJECT — the thing the action is done to. As a particle it is pronounced "o".

パンを食べます。 — "(I) eat bread."

に marks a TARGET or POINT: destinations, specific times, and the receiver of an action.

・destination: 学校に行きます。 — "go to school"
・time: 七時に起きます。 — "get up at seven"
・receiver: 友達に手紙を書きます。 — "write a letter to a friend"

A sentence can use both at once: [receiver]に [object]を [verb].`,
      cards: [
        { front: 'パンを食べます。', reading: 'パンをたべます。', back: 'I eat bread.' },
        { front: '学校に行きます。', reading: 'がっこうにいきます。', back: 'I go to school.' },
        {
          front: '友達に手紙を書きます。',
          reading: 'ともだちにてがみをかきます。',
          back: 'I write a letter to my friend.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Places & directions',
      cards: [
        { front: '家', reading: 'いえ', back: 'house; home', pos: 'noun' },
        { front: '学校', reading: 'がっこう', back: 'school', pos: 'noun' },
        { front: '駅', reading: 'えき', back: 'station', pos: 'noun' },
        { front: '銀行', reading: 'ぎんこう', back: 'bank', pos: 'noun' },
        { front: '病院', reading: 'びょういん', back: 'hospital', pos: 'noun' },
        { front: '図書館', reading: 'としょかん', back: 'library', pos: 'noun' },
        { front: '公園', reading: 'こうえん', back: 'park', pos: 'noun' },
        { front: '店', reading: 'みせ', back: 'shop', pos: 'noun' },
        { front: 'レストラン', back: 'restaurant', pos: 'noun' },
        { front: 'トイレ', back: 'toilet', pos: 'noun' },
        { front: '上', reading: 'うえ', back: 'up; above; on top', pos: 'noun' },
        { front: '下', reading: 'した', back: 'down; below; under', pos: 'noun' },
        { front: '中', reading: 'なか', back: 'inside; middle', pos: 'noun' },
        { front: '外', reading: 'そと', back: 'outside', pos: 'noun' },
        { front: '右', reading: 'みぎ', back: 'right (side)', pos: 'noun' },
        { front: '左', reading: 'ひだり', back: 'left (side)', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Location and direction: で and へ',
      body: `で marks WHERE an action happens:

図書館で勉強します。 — "(I) study at the library."

Compare with に, which marks where something exists or arrives. Rough rule: action happening at a place → で; existence at / movement to a place → に.

へ marks DIRECTION of movement, much like に for destinations. As a particle it is pronounced "e". With motion verbs the two are nearly interchangeable:

日本へ行きます。 ≈ 日本に行きます。 — "go to Japan"

で also marks the MEANS of doing something: バスで行きます — "go by bus"; 日本語で話します — "speak in Japanese".`,
      cards: [
        {
          front: '図書館で勉強します。',
          reading: 'としょかんでべんきょうします。',
          back: 'I study at the library.'
        },
        { front: '日本へ行きたいです。', reading: 'にほんへいきたいです。', back: 'I want to go to Japan.' },
        { front: 'バスで駅へ行きます。', reading: 'バスでえきへいきます。', back: 'I go to the station by bus.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Negative and past: ません / ました / ませんでした',
      body: `The ます ending conjugates for polarity and tense — the verb itself doesn't change further:

・食べます — eat / will eat
・食べません — don't / won't eat
・食べました — ate
・食べませんでした — didn't eat

That's the whole polite system: swap the ending, done.

Time words usually pin down the tense: 昨日 (yesterday) + ました, 明日 (tomorrow) + ます.`,
      cards: [
        { front: '肉を食べません。', reading: 'にくをたべません。', back: "I don't eat meat." },
        { front: '昨日映画を見ました。', reading: 'きのうえいがをみました。', back: 'I watched a movie yesterday.' },
        {
          front: '今朝コーヒーを飲みませんでした。',
          reading: 'けさコーヒーをのみませんでした。',
          back: "I didn't drink coffee this morning."
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Food & drink',
      cards: [
        { front: '水', reading: 'みず', back: 'water', pos: 'noun' },
        { front: 'お茶', reading: 'おちゃ', back: 'tea', pos: 'noun' },
        { front: 'コーヒー', back: 'coffee', pos: 'noun' },
        { front: '牛乳', reading: 'ぎゅうにゅう', back: 'milk', pos: 'noun' },
        { front: 'ご飯', reading: 'ごはん', back: 'rice; meal', pos: 'noun' },
        { front: 'パン', back: 'bread', pos: 'noun' },
        { front: '肉', reading: 'にく', back: 'meat', pos: 'noun' },
        { front: '魚', reading: 'さかな', back: 'fish', pos: 'noun' },
        { front: '野菜', reading: 'やさい', back: 'vegetables', pos: 'noun' },
        { front: '果物', reading: 'くだもの', back: 'fruit', pos: 'noun' },
        { front: '卵', reading: 'たまご', back: 'egg', pos: 'noun' },
        { front: '寿司', reading: 'すし', back: 'sushi', pos: 'noun' },
        { front: 'お酒', reading: 'おさけ', back: 'alcohol; sake', pos: 'noun' },
        { front: '朝ご飯', reading: 'あさごはん', back: 'breakfast', pos: 'noun' },
        { front: '昼ご飯', reading: 'ひるごはん', back: 'lunch', pos: 'noun' },
        { front: '晩ご飯', reading: 'ばんごはん', back: 'dinner', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'い-adjectives',
      body: `い-adjectives end in い and conjugate by themselves — no です needed for the grammar, though polite speech adds です anyway:

・高い — is expensive / tall
・高くない — is not expensive
・高かった — was expensive
・高くなかった — was not expensive

Before a noun they attach directly: 高い山 — "a tall mountain".

Watch out: いい (good) conjugates from its older form よい → よくない, よかった, よくなかった.`,
      cards: [
        { front: 'この本は面白いです。', reading: 'このほんはおもしろいです。', back: 'This book is interesting.' },
        { front: '今日は暑いです。', reading: 'きょうはあついです。', back: 'It is hot today.' },
        {
          front: 'その映画は面白くなかったです。',
          reading: 'そのえいがはおもしろくなかったです。',
          back: 'That movie was not interesting.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Core adjectives',
      cards: [
        { front: '大きい', reading: 'おおきい', back: 'big', pos: 'i-adjective' },
        { front: '小さい', reading: 'ちいさい', back: 'small', pos: 'i-adjective' },
        { front: '新しい', reading: 'あたらしい', back: 'new', pos: 'i-adjective' },
        { front: '古い', reading: 'ふるい', back: 'old (things)', pos: 'i-adjective' },
        { front: '高い', reading: 'たかい', back: 'tall; expensive', pos: 'i-adjective' },
        { front: '安い', reading: 'やすい', back: 'cheap', pos: 'i-adjective' },
        { front: 'いい', back: 'good', pos: 'i-adjective', notes: 'Conjugates from よい: よくない, よかった.' },
        { front: '悪い', reading: 'わるい', back: 'bad', pos: 'i-adjective' },
        { front: '暑い', reading: 'あつい', back: 'hot (weather)', pos: 'i-adjective' },
        { front: '寒い', reading: 'さむい', back: 'cold (weather)', pos: 'i-adjective' },
        { front: '面白い', reading: 'おもしろい', back: 'interesting; funny', pos: 'i-adjective' },
        { front: '美味しい', reading: 'おいしい', back: 'delicious', pos: 'i-adjective' },
        { front: '難しい', reading: 'むずかしい', back: 'difficult', pos: 'i-adjective' },
        { front: '簡単', reading: 'かんたん', back: 'easy; simple', pos: 'na-adjective' },
        { front: '静か', reading: 'しずか', back: 'quiet', pos: 'na-adjective' },
        { front: '元気', reading: 'げんき', back: 'healthy; energetic', pos: 'na-adjective' },
        { front: '好き', reading: 'すき', back: 'liked; favorite', pos: 'na-adjective' }
      ]
    },
    {
      kind: 'grammar',
      title: 'な-adjectives and possessive の',
      body: `な-adjectives behave like nouns: they need な before a noun and です／だ to end a sentence.

・静かです。 — "It is quiet."
・静かな町 — "a quiet town" (な appears only before a noun)
・静かじゃないです — "is not quiet"　・静かでした — "was quiet"

好き (like) and 嫌い (dislike) are な-adjectives, and what you like takes が:
私は犬が好きです。 — "I like dogs."

の links two nouns, most often as the possessive:
・私の傘 — "my umbrella"
・日本語の本 — "a Japanese(-language) book"`,
      cards: [
        { front: 'ここは静かな公園です。', reading: 'ここはしずかなこうえんです。', back: 'This is a quiet park.' },
        { front: '私は犬が好きです。', reading: 'わたしはいぬがすきです。', back: 'I like dogs.' },
        { front: 'これは私の傘です。', reading: 'これはわたしのかさです。', back: 'This is my umbrella.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'て-form and てください',
      body: `The て-form connects verbs to other words and chains actions. Formation from the ます-stem:

Group 1 (u-verbs) by final sound:
・う・つ・る → って（買う→買って、待つ→待って）
・む・ぶ・ぬ → んで（飲む→飲んで、遊ぶ→遊んで）
・く → いて（書く→書いて）／ ぐ → いで（泳ぐ→泳いで）
・す → して（話す→話して）
・exception: 行く→行って

Group 2 (ru-verbs): る → て（食べる→食べて）
Group 3: する→して、来る→来て（きて）

Two everyday uses:
・requests: てください — 待ってください "please wait"
・chaining: 朝ご飯を食べて、学校に行きます — "eat breakfast, then go to school"`,
      cards: [
        { front: 'ちょっと待ってください。', reading: 'ちょっとまってください。', back: 'Please wait a moment.' },
        { front: '窓を開けてください。', reading: 'まどをあけてください。', back: 'Please open the window.' },
        {
          front: '朝ご飯を食べて、学校に行きます。',
          reading: 'あさごはんをたべて、がっこうにいきます。',
          back: 'I eat breakfast and then go to school.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Everyday verbs II',
      cards: [
        { front: 'する', back: 'to do', pos: 'verb (irregular)' },
        { front: '勉強する', reading: 'べんきょうする', back: 'to study', pos: 'verb (irregular)' },
        { front: '働く', reading: 'はたらく', back: 'to work', pos: 'verb (u)' },
        { front: '休む', reading: 'やすむ', back: 'to rest; to take a day off', pos: 'verb (u)' },
        { front: '作る', reading: 'つくる', back: 'to make', pos: 'verb (u)' },
        { front: '使う', reading: 'つかう', back: 'to use', pos: 'verb (u)' },
        { front: '待つ', reading: 'まつ', back: 'to wait', pos: 'verb (u)' },
        { front: '歩く', reading: 'あるく', back: 'to walk', pos: 'verb (u)' },
        { front: '走る', reading: 'はしる', back: 'to run', pos: 'verb (u)' },
        { front: '泳ぐ', reading: 'およぐ', back: 'to swim', pos: 'verb (u)' },
        { front: '教える', reading: 'おしえる', back: 'to teach; to tell', pos: 'verb (ru)' },
        { front: '分かる', reading: 'わかる', back: 'to understand', pos: 'verb (u)' },
        { front: '知る', reading: 'しる', back: 'to know', pos: 'verb (u)' },
        { front: '入る', reading: 'はいる', back: 'to enter', pos: 'verb (u)' },
        { front: '出る', reading: 'でる', back: 'to exit; to leave', pos: 'verb (ru)' },
        { front: '遊ぶ', reading: 'あそぶ', back: 'to play; to hang out', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Existence: います / あります and counters',
      body: `Two verbs mean "there is / to exist":

・います — living things (people, animals)
・あります — inanimate things (objects, plants, events)

The thing that exists takes が; the location takes に:

机の上に本があります。 — "There is a book on the desk."
公園に子供がいます。 — "There are children in the park."

Counting uses COUNTERS matched to the thing's shape or type:
・〜人（にん） people: 一人（ひとり）、二人（ふたり）、三人（さんにん）…
・〜匹（ひき） small animals: 一匹（いっぴき）、二匹（にひき）、三匹（さんびき）…
・〜つ generic: 一つ（ひとつ）、二つ（ふたつ）、三つ（みっつ）…

The counter usually sits right before the verb: 猫が二匹います。`,
      cards: [
        {
          front: '机の上に本があります。',
          reading: 'つくえのうえにほんがあります。',
          back: 'There is a book on the desk.'
        },
        {
          front: '公園に子供が三人います。',
          reading: 'こうえんにこどもがさんにんいます。',
          back: 'There are three children in the park.'
        },
        { front: '猫が二匹います。', reading: 'ねこがにひきいます。', back: 'There are two cats.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Daily life & objects',
      cards: [
        { front: '本', reading: 'ほん', back: 'book', pos: 'noun' },
        { front: 'ペン', back: 'pen', pos: 'noun' },
        { front: '机', reading: 'つくえ', back: 'desk', pos: 'noun' },
        { front: '椅子', reading: 'いす', back: 'chair', pos: 'noun' },
        { front: '車', reading: 'くるま', back: 'car', pos: 'noun' },
        { front: '電車', reading: 'でんしゃ', back: 'train', pos: 'noun' },
        { front: '自転車', reading: 'じてんしゃ', back: 'bicycle', pos: 'noun' },
        { front: '電話', reading: 'でんわ', back: 'telephone', pos: 'noun' },
        { front: '時計', reading: 'とけい', back: 'clock; watch', pos: 'noun' },
        { front: '傘', reading: 'かさ', back: 'umbrella', pos: 'noun' },
        { front: '鞄', reading: 'かばん', back: 'bag', pos: 'noun' },
        { front: '服', reading: 'ふく', back: 'clothes', pos: 'noun' },
        { front: '靴', reading: 'くつ', back: 'shoes', pos: 'noun' },
        { front: 'お金', reading: 'おかね', back: 'money', pos: 'noun' },
        { front: '映画', reading: 'えいが', back: 'movie', pos: 'noun' },
        { front: '音楽', reading: 'おんがく', back: 'music', pos: 'noun' },
        { front: '天気', reading: 'てんき', back: 'weather', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Connecting: と, も and the plain past た-form',
      body: `と joins nouns — a closed "and" list (only nouns, all items named):

犬と猫 — "dogs and cats"

も means "also / too" and REPLACES は・が・を:

私も行きます。 — "I will go too."
寿司も食べました。 — "(I) ate sushi too."

The plain past た-form is the casual counterpart of ました. Make it from the て-form by swapping て→た（で→だ）:

食べて→食べた　飲んで→飲んだ　行って→行った

昨日寿司を食べた。 — "(I) ate sushi yesterday." (casual)

The た-form also appears inside larger patterns later (たことがある "have done before"), so it's worth knowing early.`,
      cards: [
        { front: '犬と猫が好きです。', reading: 'いぬとねこがすきです。', back: 'I like dogs and cats.' },
        { front: '私も行きます。', reading: 'わたしもいきます。', back: 'I will go too.' },
        { front: '昨日寿司を食べた。', reading: 'きのうすしをたべた。', back: 'I ate sushi yesterday. (casual)' }
      ]
    }
  ]
}

// Kanji cards: front = the character, reading = its most common reading,
// back = meaning, onyomi/kunyomi = comma-separated readings (kun readings show
// okurigana in parentheses), example_* = one common word using the kanji.
const N5_KANJI_COURSE: SeedCourse = {
  title: 'JLPT N5 Kanji',
  description:
    'The ~100 kanji of JLPT N5, grouped by theme. Recognizing these (plus your vocab) ' +
    'is the first big step toward reading manga and visual novels without furigana.',
  level: 'N5',
  difficulty: 3,
  lessons: [
    {
      kind: 'kanji',
      title: 'Numbers & time',
      cards: [
        { front: '一', reading: 'いち', back: 'one', onyomi: 'イチ', kunyomi: 'ひと(つ)', exampleJp: '一つ', exampleReading: 'ひとつ', exampleEn: 'one (thing)' },
        { front: '二', reading: 'に', back: 'two', onyomi: 'ニ', kunyomi: 'ふた(つ)', exampleJp: '二人', exampleReading: 'ふたり', exampleEn: 'two people' },
        { front: '三', reading: 'さん', back: 'three', onyomi: 'サン', kunyomi: 'みっ(つ)', exampleJp: '三月', exampleReading: 'さんがつ', exampleEn: 'March' },
        { front: '四', reading: 'よん', back: 'four', onyomi: 'シ', kunyomi: 'よん, よっ(つ)', exampleJp: '四時', exampleReading: 'よじ', exampleEn: "four o'clock" },
        { front: '五', reading: 'ご', back: 'five', onyomi: 'ゴ', kunyomi: 'いつ(つ)', exampleJp: '五分', exampleReading: 'ごふん', exampleEn: 'five minutes' },
        { front: '六', reading: 'ろく', back: 'six', onyomi: 'ロク', kunyomi: 'むっ(つ)', exampleJp: '六百', exampleReading: 'ろっぴゃく', exampleEn: 'six hundred' },
        { front: '七', reading: 'なな', back: 'seven', onyomi: 'シチ', kunyomi: 'なな(つ)', exampleJp: '七時', exampleReading: 'しちじ', exampleEn: "seven o'clock" },
        { front: '八', reading:'はち', back: 'eight', onyomi: 'ハチ', kunyomi: 'やっ(つ)', exampleJp: '八月', exampleReading: 'はちがつ', exampleEn: 'August' },
        { front: '九', reading: 'きゅう', back: 'nine', onyomi: 'キュウ, ク', kunyomi: 'ここの(つ)', exampleJp: '九時', exampleReading: 'くじ', exampleEn: "nine o'clock" },
        { front: '十', reading: 'じゅう', back: 'ten', onyomi: 'ジュウ', kunyomi: 'とお', exampleJp: '十日', exampleReading: 'とおか', exampleEn: 'the 10th (of the month)' },
        { front: '百', reading: 'ひゃく', back: 'hundred', onyomi: 'ヒャク', exampleJp: '三百', exampleReading: 'さんびゃく', exampleEn: 'three hundred' },
        { front: '千', reading: 'せん', back: 'thousand', onyomi: 'セン', kunyomi: 'ち', exampleJp: '千円', exampleReading: 'せんえん', exampleEn: '1,000 yen' },
        { front: '万', reading: 'まん', back: 'ten thousand', onyomi: 'マン, バン', exampleJp: '一万', exampleReading: 'いちまん', exampleEn: 'ten thousand' },
        { front: '円', reading: 'えん', back: 'yen; circle', onyomi: 'エン', kunyomi: 'まる(い)', exampleJp: '百円', exampleReading: 'ひゃくえん', exampleEn: '100 yen' },
        { front: '年', reading: 'とし', back: 'year', onyomi: 'ネン', kunyomi: 'とし', exampleJp: '今年', exampleReading: 'ことし', exampleEn: 'this year' },
        { front: '月', reading: 'つき', back: 'month; moon', onyomi: 'ゲツ, ガツ', kunyomi: 'つき', exampleJp: '月曜日', exampleReading: 'げつようび', exampleEn: 'Monday' },
        { front: '日', reading: 'ひ', back: 'day; sun', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, か', exampleJp: '日本', exampleReading: 'にほん', exampleEn: 'Japan' },
        { front: '時', reading: 'じ', back: 'time; hour', onyomi: 'ジ', kunyomi: 'とき', exampleJp: '時間', exampleReading: 'じかん', exampleEn: 'time' },
        { front: '分', reading: 'ふん', back: 'minute; part', onyomi: 'フン, ブン', kunyomi: 'わ(かる)', exampleJp: '半分', exampleReading: 'はんぶん', exampleEn: 'half' },
        { front: '週', reading: 'しゅう', back: 'week', onyomi: 'シュウ', exampleJp: '先週', exampleReading: 'せんしゅう', exampleEn: 'last week' },
        { front: '今', reading: 'いま', back: 'now', onyomi: 'コン', kunyomi: 'いま', exampleJp: '今日', exampleReading: 'きょう', exampleEn: 'today' }
      ]
    },
    {
      kind: 'kanji',
      title: 'People & body',
      cards: [
        { front: '人', reading: 'ひと', back: 'person', onyomi: 'ジン, ニン', kunyomi: 'ひと', exampleJp: '日本人', exampleReading: 'にほんじん', exampleEn: 'Japanese person' },
        { front: '男', reading: 'おとこ', back: 'man; male', onyomi: 'ダン', kunyomi: 'おとこ', exampleJp: '男の子', exampleReading: 'おとこのこ', exampleEn: 'boy' },
        { front: '女', reading: 'おんな', back: 'woman; female', onyomi: 'ジョ', kunyomi: 'おんな', exampleJp: '女の人', exampleReading: 'おんなのひと', exampleEn: 'woman' },
        { front: '子', reading: 'こ', back: 'child', onyomi: 'シ', kunyomi: 'こ', exampleJp: '子供', exampleReading: 'こども', exampleEn: 'child' },
        { front: '父', reading: 'ちち', back: 'father', onyomi: 'フ', kunyomi: 'ちち', exampleJp: 'お父さん', exampleReading: 'おとうさん', exampleEn: 'father' },
        { front: '母', reading: 'はは', back: 'mother', onyomi: 'ボ', kunyomi: 'はは', exampleJp: 'お母さん', exampleReading: 'おかあさん', exampleEn: 'mother' },
        { front: '友', reading: 'とも', back: 'friend', onyomi: 'ユウ', kunyomi: 'とも', exampleJp: '友達', exampleReading: 'ともだち', exampleEn: 'friend' },
        { front: '先', reading: 'さき', back: 'ahead; previous', onyomi: 'セン', kunyomi: 'さき', exampleJp: '先生', exampleReading: 'せんせい', exampleEn: 'teacher' },
        { front: '生', reading: 'せい', back: 'life; birth; raw', onyomi: 'セイ, ショウ', kunyomi: 'い(きる), う(まれる), なま', exampleJp: '学生', exampleReading: 'がくせい', exampleEn: 'student' },
        { front: '名', reading: 'な', back: 'name', onyomi: 'メイ', kunyomi: 'な', exampleJp: '名前', exampleReading: 'なまえ', exampleEn: 'name' },
        { front: '手', reading: 'て', back: 'hand', onyomi: 'シュ', kunyomi: 'て', exampleJp: '手紙', exampleReading: 'てがみ', exampleEn: 'letter' },
        { front: '足', reading: 'あし', back: 'foot; leg; to suffice', onyomi: 'ソク', kunyomi: 'あし, た(りる)', exampleJp: '足りる', exampleReading: 'たりる', exampleEn: 'to be enough' },
        { front: '目', reading: 'め', back: 'eye', onyomi: 'モク', kunyomi: 'め', exampleJp: '目がいい', exampleReading: 'めがいい', exampleEn: 'to have good eyesight' },
        { front: '口', reading: 'くち', back: 'mouth', onyomi: 'コウ', kunyomi: 'くち', exampleJp: '入り口', exampleReading: 'いりぐち', exampleEn: 'entrance' },
        { front: '耳', reading: 'みみ', back: 'ear', onyomi: 'ジ', kunyomi: 'みみ', exampleJp: '耳が遠い', exampleReading: 'みみがとおい', exampleEn: 'hard of hearing' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Places & nature',
      cards: [
        { front: '山', reading: 'やま', back: 'mountain', onyomi: 'サン', kunyomi: 'やま', exampleJp: '富士山', exampleReading: 'ふじさん', exampleEn: 'Mt. Fuji' },
        { front: '川', reading: 'かわ', back: 'river', onyomi: 'セン', kunyomi: 'かわ', exampleJp: '川で泳ぐ', exampleReading: 'かわでおよぐ', exampleEn: 'to swim in the river' },
        { front: '田', reading: 'た', back: 'rice field', onyomi: 'デン', kunyomi: 'た', exampleJp: '田中さん', exampleReading: 'たなかさん', exampleEn: 'Mr./Ms. Tanaka' },
        { front: '空', reading: 'そら', back: 'sky; empty', onyomi: 'クウ', kunyomi: 'そら, あ(く)', exampleJp: '空港', exampleReading: 'くうこう', exampleEn: 'airport' },
        { front: '天', reading: 'てん', back: 'heaven; sky', onyomi: 'テン', exampleJp: '天気', exampleReading: 'てんき', exampleEn: 'weather' },
        { front: '気', reading: 'き', back: 'spirit; energy; mood', onyomi: 'キ, ケ', exampleJp: '元気', exampleReading: 'げんき', exampleEn: 'healthy; energetic' },
        { front: '雨', reading: 'あめ', back: 'rain', onyomi: 'ウ', kunyomi: 'あめ', exampleJp: '大雨', exampleReading: 'おおあめ', exampleEn: 'heavy rain' },
        { front: '電', reading: 'でん', back: 'electricity', onyomi: 'デン', exampleJp: '電気', exampleReading: 'でんき', exampleEn: 'electricity; light' },
        { front: '車', reading: 'くるま', back: 'car; vehicle', onyomi: 'シャ', kunyomi: 'くるま', exampleJp: '電車', exampleReading: 'でんしゃ', exampleEn: 'train' },
        { front: '駅', reading: 'えき', back: 'station', onyomi: 'エキ', exampleJp: '駅前', exampleReading: 'えきまえ', exampleEn: 'in front of the station' },
        { front: '道', reading: 'みち', back: 'road; way', onyomi: 'ドウ', kunyomi: 'みち', exampleJp: '道を渡る', exampleReading: 'みちをわたる', exampleEn: 'to cross the street' },
        { front: '国', reading: 'くに', back: 'country', onyomi: 'コク', kunyomi: 'くに', exampleJp: '外国', exampleReading: 'がいこく', exampleEn: 'foreign country' },
        { front: '外', reading: 'そと', back: 'outside', onyomi: 'ガイ', kunyomi: 'そと', exampleJp: '外国人', exampleReading: 'がいこくじん', exampleEn: 'foreigner' },
        { front: '店', reading: 'みせ', back: 'shop', onyomi: 'テン', kunyomi: 'みせ', exampleJp: '喫茶店', exampleReading: 'きっさてん', exampleEn: 'café' },
        { front: '学', reading: 'がく', back: 'study; learning', onyomi: 'ガク', kunyomi: 'まな(ぶ)', exampleJp: '学校', exampleReading: 'がっこう', exampleEn: 'school' },
        { front: '校', reading: 'こう', back: 'school', onyomi: 'コウ', exampleJp: '高校', exampleReading: 'こうこう', exampleEn: 'high school' },
        { front: '会', reading: 'かい', back: 'meeting; to meet', onyomi: 'カイ', kunyomi: 'あ(う)', exampleJp: '会社', exampleReading: 'かいしゃ', exampleEn: 'company' },
        { front: '社', reading: 'しゃ', back: 'company; shrine', onyomi: 'シャ', kunyomi: 'やしろ', exampleJp: '社長', exampleReading: 'しゃちょう', exampleEn: 'company president' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Verbs & actions',
      cards: [
        { front: '行', reading: 'い(く)', back: 'to go', onyomi: 'コウ, ギョウ', kunyomi: 'い(く), おこな(う)', exampleJp: '銀行', exampleReading: 'ぎんこう', exampleEn: 'bank' },
        { front: '来', reading: 'く(る)', back: 'to come', onyomi: 'ライ', kunyomi: 'く(る)', exampleJp: '来週', exampleReading: 'らいしゅう', exampleEn: 'next week' },
        { front: '見', reading: 'み(る)', back: 'to see; to look', onyomi: 'ケン', kunyomi: 'み(る), み(せる)', exampleJp: '見せる', exampleReading: 'みせる', exampleEn: 'to show' },
        { front: '聞', reading: 'き(く)', back: 'to hear; to ask', onyomi: 'ブン', kunyomi: 'き(く)', exampleJp: '新聞', exampleReading: 'しんぶん', exampleEn: 'newspaper' },
        { front: '読', reading: 'よ(む)', back: 'to read', onyomi: 'ドク', kunyomi: 'よ(む)', exampleJp: '読書', exampleReading: 'どくしょ', exampleEn: 'reading (books)' },
        { front: '書', reading: 'か(く)', back: 'to write', onyomi: 'ショ', kunyomi: 'か(く)', exampleJp: '辞書', exampleReading: 'じしょ', exampleEn: 'dictionary' },
        { front: '話', reading: 'はな(す)', back: 'to speak; story', onyomi: 'ワ', kunyomi: 'はな(す), はなし', exampleJp: '電話', exampleReading: 'でんわ', exampleEn: 'telephone' },
        { front: '買', reading: 'か(う)', back: 'to buy', onyomi: 'バイ', kunyomi: 'か(う)', exampleJp: '買い物', exampleReading: 'かいもの', exampleEn: 'shopping' },
        { front: '食', reading: 'た(べる)', back: 'to eat; food', onyomi: 'ショク', kunyomi: 'た(べる)', exampleJp: '食堂', exampleReading: 'しょくどう', exampleEn: 'dining hall' },
        { front: '飲', reading: 'の(む)', back: 'to drink', onyomi: 'イン', kunyomi: 'の(む)', exampleJp: '飲み物', exampleReading: 'のみもの', exampleEn: 'drink; beverage' },
        { front: '立', reading: 'た(つ)', back: 'to stand', onyomi: 'リツ', kunyomi: 'た(つ)', exampleJp: '立ってください', exampleReading: 'たってください', exampleEn: 'please stand up' },
        { front: '休', reading: 'やす(む)', back: 'to rest', onyomi: 'キュウ', kunyomi: 'やす(む)', exampleJp: '休み', exampleReading: 'やすみ', exampleEn: 'holiday; break' },
        { front: '出', reading: 'で(る)', back: 'to exit; to put out', onyomi: 'シュツ', kunyomi: 'で(る), だ(す)', exampleJp: '出口', exampleReading: 'でぐち', exampleEn: 'exit' },
        { front: '入', reading: 'はい(る)', back: 'to enter; to put in', onyomi: 'ニュウ', kunyomi: 'はい(る), い(れる)', exampleJp: '入り口', exampleReading: 'いりぐち', exampleEn: 'entrance' },
        { front: '言', reading: 'い(う)', back: 'to say', onyomi: 'ゲン, ゴン', kunyomi: 'い(う)', exampleJp: '言葉', exampleReading: 'ことば', exampleEn: 'word; language' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Adjectives, size & direction',
      cards: [
        { front: '大', reading: 'おお(きい)', back: 'big', onyomi: 'ダイ, タイ', kunyomi: 'おお(きい)', exampleJp: '大学', exampleReading: 'だいがく', exampleEn: 'university' },
        { front: '小', reading: 'ちい(さい)', back: 'small', onyomi: 'ショウ', kunyomi: 'ちい(さい), こ', exampleJp: '小学校', exampleReading: 'しょうがっこう', exampleEn: 'elementary school' },
        { front: '高', reading: 'たか(い)', back: 'tall; expensive', onyomi: 'コウ', kunyomi: 'たか(い)', exampleJp: '高校生', exampleReading: 'こうこうせい', exampleEn: 'high school student' },
        { front: '安', reading: 'やす(い)', back: 'cheap; peaceful', onyomi: 'アン', kunyomi: 'やす(い)', exampleJp: '安い店', exampleReading: 'やすいみせ', exampleEn: 'a cheap shop' },
        { front: '新', reading: 'あたら(しい)', back: 'new', onyomi: 'シン', kunyomi: 'あたら(しい)', exampleJp: '新聞', exampleReading: 'しんぶん', exampleEn: 'newspaper' },
        { front: '古', reading: 'ふる(い)', back: 'old (things)', onyomi: 'コ', kunyomi: 'ふる(い)', exampleJp: '古本', exampleReading: 'ふるほん', exampleEn: 'secondhand book' },
        { front: '長', reading: 'なが(い)', back: 'long; chief', onyomi: 'チョウ', kunyomi: 'なが(い)', exampleJp: '社長', exampleReading: 'しゃちょう', exampleEn: 'company president' },
        { front: '多', reading: 'おお(い)', back: 'many', onyomi: 'タ', kunyomi: 'おお(い)', exampleJp: '多分', exampleReading: 'たぶん', exampleEn: 'probably' },
        { front: '少', reading: 'すこ(し)', back: 'few; a little', onyomi: 'ショウ', kunyomi: 'すこ(し), すく(ない)', exampleJp: '少し', exampleReading: 'すこし', exampleEn: 'a little' },
        { front: '上', reading: 'うえ', back: 'up; above', onyomi: 'ジョウ', kunyomi: 'うえ, あ(がる), のぼ(る)', exampleJp: '上手', exampleReading: 'じょうず', exampleEn: 'good at' },
        { front: '下', reading: 'した', back: 'down; below', onyomi: 'カ, ゲ', kunyomi: 'した, さ(がる), くだ(さい)', exampleJp: '下手', exampleReading: 'へた', exampleEn: 'bad at' },
        { front: '中', reading: 'なか', back: 'inside; middle', onyomi: 'チュウ', kunyomi: 'なか', exampleJp: '中国', exampleReading: 'ちゅうごく', exampleEn: 'China' },
        { front: '右', reading: 'みぎ', back: 'right (side)', onyomi: 'ウ, ユウ', kunyomi: 'みぎ', exampleJp: '右手', exampleReading: 'みぎて', exampleEn: 'right hand' },
        { front: '左', reading: 'ひだり', back: 'left (side)', onyomi: 'サ', kunyomi: 'ひだり', exampleJp: '左側', exampleReading: 'ひだりがわ', exampleEn: 'left side' },
        { front: '前', reading: 'まえ', back: 'front; before', onyomi: 'ゼン', kunyomi: 'まえ', exampleJp: '名前', exampleReading: 'なまえ', exampleEn: 'name' },
        { front: '後', reading: 'あと', back: 'after; behind', onyomi: 'ゴ, コウ', kunyomi: 'あと, うし(ろ)', exampleJp: '午後', exampleReading: 'ごご', exampleEn: 'afternoon; p.m.' },
        { front: '間', reading: 'あいだ', back: 'interval; between', onyomi: 'カン, ケン', kunyomi: 'あいだ, ま', exampleJp: '時間', exampleReading: 'じかん', exampleEn: 'time' },
        { front: '半', reading: 'はん', back: 'half', onyomi: 'ハン', kunyomi: 'なか(ば)', exampleJp: '半分', exampleReading: 'はんぶん', exampleEn: 'half' }
      ]
    },
    {
      kind: 'kanji',
      title: 'School, days & everyday',
      cards: [
        { front: '本', reading: 'ほん', back: 'book; origin', onyomi: 'ホン', kunyomi: 'もと', exampleJp: '日本', exampleReading: 'にほん', exampleEn: 'Japan' },
        { front: '語', reading: 'ご', back: 'language; word', onyomi: 'ゴ', kunyomi: 'かた(る)', exampleJp: '日本語', exampleReading: 'にほんご', exampleEn: 'Japanese language' },
        { front: '文', reading: 'ぶん', back: 'sentence; text', onyomi: 'ブン, モン', exampleJp: '文法', exampleReading: 'ぶんぽう', exampleEn: 'grammar' },
        { front: '字', reading: 'じ', back: 'character; letter', onyomi: 'ジ', exampleJp: '漢字', exampleReading: 'かんじ', exampleEn: 'kanji' },
        { front: '英', reading: 'えい', back: 'England; brilliant', onyomi: 'エイ', exampleJp: '英語', exampleReading: 'えいご', exampleEn: 'English language' },
        { front: '私', reading: 'わたし', back: 'I; private', onyomi: 'シ', kunyomi: 'わたし', exampleJp: '私たち', exampleReading: 'わたしたち', exampleEn: 'we' },
        { front: '白', reading: 'しろ(い)', back: 'white', onyomi: 'ハク', kunyomi: 'しろ(い)', exampleJp: '面白い', exampleReading: 'おもしろい', exampleEn: 'interesting' },
        { front: '毎', reading: 'まい', back: 'every', onyomi: 'マイ', exampleJp: '毎日', exampleReading: 'まいにち', exampleEn: 'every day' },
        { front: '何', reading: 'なに', back: 'what', onyomi: 'カ', kunyomi: 'なに, なん', exampleJp: '何時', exampleReading: 'なんじ', exampleEn: 'what time' },
        { front: '水', reading: 'みず', back: 'water', onyomi: 'スイ', kunyomi: 'みず', exampleJp: '水曜日', exampleReading: 'すいようび', exampleEn: 'Wednesday' },
        { front: '火', reading: 'ひ', back: 'fire', onyomi: 'カ', kunyomi: 'ひ', exampleJp: '火曜日', exampleReading: 'かようび', exampleEn: 'Tuesday' },
        { front: '木', reading: 'き', back: 'tree; wood', onyomi: 'モク', kunyomi: 'き', exampleJp: '木曜日', exampleReading: 'もくようび', exampleEn: 'Thursday' },
        { front: '金', reading: 'かね', back: 'gold; money', onyomi: 'キン', kunyomi: 'かね', exampleJp: 'お金', exampleReading: 'おかね', exampleEn: 'money' },
        { front: '土', reading: 'つち', back: 'earth; soil', onyomi: 'ド', kunyomi: 'つち', exampleJp: '土曜日', exampleReading: 'どようび', exampleEn: 'Saturday' },
        { front: '曜', reading: 'よう', back: 'day of the week', onyomi: 'ヨウ', exampleJp: '日曜日', exampleReading: 'にちようび', exampleEn: 'Sunday' },
        { front: '午', reading: 'ご', back: 'noon', onyomi: 'ゴ', exampleJp: '午前', exampleReading: 'ごぜん', exampleEn: 'morning; a.m.' }
      ]
    }
  ]
}

const CASUAL_COURSE: SeedCourse = {
  title: 'Manga & VN Japanese',
  description:
    'The casual, spoken Japanese that fills manga and visual novel dialogue but ' +
    'textbooks barely touch: contractions, sentence-final particles, gendered speech ' +
    'and slang. Assumes the N5 Foundations grammar.',
  level: 'N5–N4',
  difficulty: 4,
  lessons: [
    {
      kind: 'grammar',
      title: 'てる / でる — the ている contraction',
      body: `In speech and dialogue, 〜ている almost always drops the い:

・食べている → 食べてる — "is eating"
・飲んでいる → 飲んでる — "is drinking"
・していた → してた — "was doing"

This is the single most common contraction in manga — expect it in nearly every panel. It conjugates exactly like ている: てる／てた／てない／てて.

The polite form contracts too in relaxed speech: 知ってます, 待ってました.`,
      cards: [
        { front: '何してるの？', reading: 'なにしてるの？', back: 'What are you doing?' },
        { front: '雨が降ってる。', reading: 'あめがふってる。', back: "It's raining." },
        { front: 'ずっと待ってたよ。', reading: 'ずっとまってたよ。', back: 'I was waiting the whole time!' }
      ]
    },
    {
      kind: 'grammar',
      title: 'ちゃう / じゃう — the てしまう contraction',
      body: `〜てしまう (to do completely / to do regrettably / to end up doing) contracts in speech:

・てしまう → ちゃう　・でしまう → じゃう
・てしまった → ちゃった　・でしまった → じゃった

食べてしまった → 食べちゃった — "I (accidentally / completely) ate it."

The nuance ranges from "oops" to "totally/all the way", read it from context:

・忘れちゃった — "I totally forgot" (oops)
・死んじゃう！ — "I'm gonna die!" (dramatic, everywhere in manga)

Future/volitional: 行っちゃおう — "let's just go".`,
      cards: [
        { front: '忘れちゃった。', reading: 'わすれちゃった。', back: 'I totally forgot.' },
        { front: '全部食べちゃったの？', reading: 'ぜんぶたべちゃったの？', back: 'You ate it ALL?' },
        { front: 'もう帰っちゃうの？', reading: 'もうかえっちゃうの？', back: "You're leaving already?" }
      ]
    },
    {
      kind: 'grammar',
      title: 'なきゃ / なくちゃ — casual obligation',
      body: `"Must do" in textbooks is なければならない／なくてはいけない. Dialogue contracts it hard, and usually drops the second half entirely:

・なければ → なきゃ
・なくては → なくちゃ

行かなきゃ（ならない） — "I have to go."
勉強しなくちゃ — "I gotta study."

Dropping ならない/いけない is standard; the bare なきゃ／なくちゃ IS the sentence. You'll also see 〜ないと used the same way: もう行かないと — "I'd better go".`,
      cards: [
        { front: 'もう行かなきゃ。', reading: 'もういかなきゃ。', back: 'I gotta go.' },
        { front: '勉強しなくちゃ。', reading: 'べんきょうしなくちゃ。', back: 'I have to study.' },
        { front: '早く逃げないと！', reading: 'はやくにげないと！', back: 'We have to run, now!' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Sentence-final particles: よ・ね・な・ぞ・ぜ',
      body: `These carry the tone of a line — manga dialogue leans on them constantly:

・よ — asserting new info to the listener: 違うよ "that's wrong (I'm telling you)"
・ね — seeking agreement / softening: いい天気だね "nice weather, huh"
・よね — "…right?": これでいいよね
・な(あ) — talking to yourself, wishing: 腹減ったなあ "man, I'm hungry"
・ぞ — rough, self-assertive (mostly male): 行くぞ "we're going!"
・ぜ — rough, showy (male, very manga): やるぜ "let's do this!"

な directly after a dictionary-form verb is a PROHIBITION: 触るな！ "don't touch!" — different from the musing なあ.`,
      cards: [
        { front: 'いい天気だね。', reading: 'いいてんきだね。', back: 'Nice weather, huh?' },
        { front: 'それは違うよ。', reading: 'それはちがうよ。', back: "That's wrong, you know." },
        { front: '行くぞ！', reading: 'いくぞ！', back: "We're going! (rough)" }
      ]
    },
    {
      kind: 'grammar',
      title: 'Casual questions — の？ and dropped か',
      body: `Polite questions end in か. Casual speech usually drops it and asks with rising intonation, or ends in の:

・食べる？ — "You eating?" (plain verb + rising tone)
・食べるの？ — "You're eating?" (の asks for explanation, very common)
・何それ？ — "What's that?" (casual word order flip of それは何？)

の also answers: 食べるの — "(yes,) I'm eating." In male rough speech のか appears: 行くのか？

Bare か after plain forms sounds blunt/masculine: 来るか？ — often だ is dropped instead: 元気？ 大丈夫？`,
      cards: [
        { front: 'これ、食べるの？', reading: 'これ、たべるの？', back: 'You gonna eat this?' },
        { front: '大丈夫？', reading: 'だいじょうぶ？', back: 'You okay?' },
        { front: '何それ？', reading: 'なにそれ？', back: "What's that?" }
      ]
    },
    {
      kind: 'grammar',
      title: 'じゃない・だろ・でしょ — assertions and tag questions',
      body: `Three lookalikes that dialogue uses constantly:

・じゃない(か)  — as a falling-tone exclamation it's POSITIVE: いいじゃない！ "that's great!"; with rising tone it doubts: 嘘じゃない？ "isn't that a lie?"
・だろ(う) — "right? / probably" (masculine when clipped): 言っただろ "I told you, didn't I"
・でしょ(う) — the softer/neutral version: 分かるでしょ？ "you get it, right?"

On weather forecasts and predictions でしょう is the standard "probably": 明日は雨でしょう.`,
      cards: [
        { front: 'いいじゃない！', reading: 'いいじゃない！', back: "That's great! (exclamation)" },
        { front: '言っただろ。', reading: 'いっただろ。', back: "I told you, didn't I? (masc.)" },
        { front: '分かるでしょ？', reading: 'わかるでしょ？', back: 'You get it, right?' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Masculine vs feminine speech',
      body: `Japanese fiction marks character gender/roughness through speech style — crucial for reading dialogue:

First person pronouns:
・私（わたし） neutral-polite ・あたし casual feminine
・僕（ぼく） soft masculine ・俺（おれ） rough masculine

Typical feminine markers: sentence-final わ(よ), かしら ("I wonder"), の as a statement, softer forms overall: 知らないわ.
Typical masculine markers: ぞ/ぜ, だろ, clipped か, rough contractions: 知らねえ (ない→ねえ), うるせえ.

Real people mix these freely; manga exaggerates them so you can tell who's talking without a name tag.`,
      cards: [
        { front: '俺が行くよ。', reading: 'おれがいくよ。', back: "I'll go. (rough masculine)" },
        { front: 'あたし、知らないわ。', reading: 'あたし、しらないわ。', back: "I don't know. (feminine)" },
        { front: 'そんなの知らねえよ。', reading: 'そんなのしらねえよ。', back: "How should I know?! (very rough)" }
      ]
    },
    {
      kind: 'grammar',
      title: 'Commands: imperatives, 〜な and volitional',
      body: `Manga is full of shouted commands the ます form never prepared you for:

Imperative (rough command):
・Group 1: う-row → え-row: 待つ→待て！, 頑張る→頑張れ！
・Group 2: る→ろ: 食べる→食べろ！, やめる→やめろ！
・する→しろ！, 来る→来い（こい）！

Prohibition: dictionary form + な: 触るな！ "don't touch!", 泣くな "don't cry".

Volitional ("let's"): ます-stem-based polite ましょう → plain form:
・Group 1: う-row → おう: 行く→行こう ・Group 2: る→よう: 食べよう ・する→しよう

一緒に行こう — "let's go together". Also used for "shall I…?": 手伝おうか？`,
      cards: [
        { front: '待て！', reading: 'まて！', back: 'Wait! (command)' },
        { front: '触るな！', reading: 'さわるな！', back: "Don't touch it!" },
        { front: '一緒に行こう。', reading: 'いっしょにいこう。', back: "Let's go together." }
      ]
    },
    {
      kind: 'grammar',
      title: 'って — casual quotes and topics',
      body: `って is the swiss-army particle of spoken Japanese, replacing longer patterns:

1. Quotation (= と言う): 好きだって言った — "(she) said she likes you". Alone at sentence end it reports: 行くって — "(he) says he's going."
2. Casual topic (= は/というのは): 田中さんって誰？ — "Who's Tanaka?"; 明日って何曜日？ — "What day is tomorrow, again?"
3. ってこと (= ということ): "meaning… / so that means…": 行かないってこと？ — "So you mean you're not going?"

If a line has って, first try reading it as "says/said" — then as "as for".`,
      cards: [
        { front: '明日って何曜日？', reading: 'あしたってなんようび？', back: 'What day is it tomorrow, again?' },
        { front: '田中さんって誰？', reading: 'たなかさんってだれ？', back: "Who's Tanaka?" },
        { front: '好きだって言った。', reading: 'すきだっていった。', back: '(She) said she likes you.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Trailing けど / のに — unfinished sentences',
      body: `Japanese dialogue loves ending mid-sentence; the trailing particle carries the unsaid part:

・けど literally "but": 行きたいんだけど… — "I'd like to go, (but…)" — a soft request or hesitation. あの、すみませんけど… — polite lead-in.
・のに "even though": 言ったのに… — "but I TOLD you…" — reproach/disappointment.
・し lists reasons and can also trail: 時間もないし… — "we don't have time, and…"

The 〜んだ／〜の before けど (行きたい**んだ**けど) adds the explanatory tone — extremely common combo.`,
      cards: [
        { front: '行きたいんだけど…。', reading: 'いきたいんだけど…。', back: 'I want to go, but… (trailing)' },
        { front: '言ったのに…。', reading: 'いったのに…。', back: 'But I told you…' },
        { front: '時間もないし…。', reading: 'じかんもないし…。', back: "We don't have time, and… (trailing)" }
      ]
    },
    {
      kind: 'vocab',
      title: 'Slang & interjections',
      cards: [
        { front: 'まじ', back: 'seriously?; for real', pos: 'slang', notes: 'まじで？ = "Seriously?!"' },
        { front: 'やばい', back: 'crazy; awesome; bad news', pos: 'slang', notes: 'Both "amazing" and "we\'re screwed" — read the panel.' },
        { front: 'すげえ', back: 'whoa; amazing', pos: 'slang', notes: 'Rough form of すごい.' },
        { front: 'うるさい', reading: 'うるさい', back: 'noisy; "shut up!"', pos: 'i-adjective', notes: 'Shouted as うるせえ in rough speech.' },
        { front: 'なんか', back: 'like; kinda; somehow', pos: 'filler', notes: 'Filler word, also "something like".' },
        { front: 'ほら', back: 'look!; see?', pos: 'interjection' },
        { front: 'おい', back: 'hey!', pos: 'interjection', notes: 'Rough attention-getter.' },
        { front: 'えっと', back: 'umm; let me see', pos: 'filler' },
        { front: 'だって', back: 'but; because (excuse)', pos: 'conjunction', notes: 'Whiny sentence-starter: だって、無理だもん.' },
        { front: 'ちょっと', back: 'a little; "hey, wait"', pos: 'adverb', notes: 'ちょっと！ alone = "hey!/excuse me!"' },
        { front: '別に', reading: 'べつに', back: 'not really; nothing special', pos: 'adverb', notes: 'The classic sulky answer.' },
        { front: 'うそ', reading: 'うそ', back: 'no way!; you\'re kidding (lit. lie)', pos: 'noun', notes: 'うそだろ！？ = "No way!"' },
        { front: 'やった', back: 'yay!; I did it!', pos: 'interjection' },
        { front: 'くそ', back: 'damn it', pos: 'interjection', notes: 'Also くっそ〜 when gritted through teeth.' }
      ]
    }
  ]
}

const N4_COURSE: SeedCourse = {
  title: 'JLPT N4 Grammar',
  description:
    'The next tier after N5 Foundations: the patterns that unlock most real manga and ' +
    'VN sentences — relative clauses, んだ, potential, conditionals, passive/causative, ' +
    'hearsay and appearance, giving and receiving.',
  level: 'N4',
  difficulty: 6,
  lessons: [
    {
      kind: 'grammar',
      title: 'Explanatory ～んです / ～んだ',
      body: `んです (casual んだ, written のだ) wraps a sentence to mark it as an EXPLANATION — of a situation, or a request for one. Dialogue is saturated with it.

Formation: plain form + んです／んだ. Nouns and な-adjectives insert な:
・学生なんです — "(it's that) I'm a student"
・静かなんだ — "(the thing is) it's quiet"

As a question it asks "what's going on?":
どうしたんですか。 — "What's wrong?" (I can see something is)

As a statement it answers that implied question:
頭が痛いんです。 — "(It's that) I have a headache."

In casual speech it often shows up as just の: 行くの？／行くんだ.`,
      cards: [
        { front: 'どうしたんですか。', reading: 'どうしたんですか。', back: "What's wrong? (asking for an explanation)" },
        { front: '頭が痛いんです。', reading: 'あたまがいたいんです。', back: '(It’s that) I have a headache.' },
        { front: '明日、試験があるんだ。', reading: 'あした、しけんがあるんだ。', back: '(The thing is,) I have an exam tomorrow.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Relative clauses — sentences that modify nouns',
      body: `Japanese has no "who/that/which". Instead, the WHOLE modifying clause goes directly in front of the noun, in plain form:

母が作った料理 — "the food [my mother made]"
眼鏡をかけている人 — "the person [wearing glasses]"

Inside the clause, the subject is usually marked with が (or の):
・友達が撮った写真 — "the photo my friend took"

This is arguably THE most important structure for reading: long Japanese sentences are usually one small sentence wearing several of these noun-modifying clauses. When lost, find the main noun and read the clause before it as "[the one that] …".`,
      cards: [
        { front: '母が作った料理は美味しい。', reading: 'ははがつくったりょうりはおいしい。', back: 'The food my mother makes is delicious.' },
        { front: '眼鏡をかけている人は先生です。', reading: 'めがねをかけているひとはせんせいです。', back: 'The person wearing glasses is the teacher.' },
        { front: '昨日買った本を読んでいる。', reading: 'きのうかったほんをよんでいる。', back: "I'm reading the book I bought yesterday." }
      ]
    },
    {
      kind: 'grammar',
      title: 'Potential form — できる・～える・～られる',
      body: `"Can do" has its own conjugation:

・Group 1: final う-row → え-row + る: 飲む→飲める, 読む→読める, 話す→話せる
・Group 2: る → られる: 食べる→食べられる, 見る→見られる
・する → できる　・来る → 来られる（こられる）

The thing you can do usually takes が: 日本語が読める.

In casual speech Group 2 often drops the ら (ら抜き): 食べれる, 見れる — technically "wrong", everywhere in real dialogue.

The potential verb conjugates like a Group 2 verb: 読めない, 読めた, 読めます.`,
      cards: [
        { front: '日本語が読めますか。', reading: 'にほんごがよめますか。', back: 'Can you read Japanese?' },
        { front: '納豆は食べられない。', reading: 'なっとうはたべられない。', back: "I can't eat nattō." },
        { front: '明日は来られる？', reading: 'あしたはこられる？', back: 'Can you come tomorrow?' }
      ]
    },
    {
      kind: 'grammar',
      title: '～たり～たりする — doing things like…',
      body: `Lists actions non-exhaustively ("things like X and Y, among others"). Compare と, which lists nouns exhaustively — たり does for verbs what など does for nouns.

Formation: た-form + り, repeat, close with する (which carries the tense):

週末は映画を見たり、買い物したりします。
— "On weekends I do things like watch movies and go shopping."

With one verb it implies "…and stuff": 泣いたりしないで — "don't cry (or anything)".

Paired opposites make an idiom: 行ったり来たり "back and forth", つけたり消したり "on and off".`,
      cards: [
        { front: '週末は映画を見たり、買い物したりします。', reading: 'しゅうまつはえいがをみたり、かいものしたりします。', back: 'On weekends I watch movies, go shopping and such.' },
        { front: '泣いたり笑ったりした。', reading: 'ないたりわらったりした。', back: 'I cried and laughed (by turns).' },
        { front: '行ったり来たりしている。', reading: 'いったりきたりしている。', back: '(He) keeps going back and forth.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ながら — while doing',
      body: `Two actions by the same person at the same time: ます-stem + ながら. The MAIN action comes last; the ながら clause is the background one.

音楽を聞きながら勉強する。 — "I study while listening to music."
(studying is the main point; music is background)

Order matters: 勉強しながら音楽を聞く flips which action is primary.

Only for simultaneous actions by one subject — "while I was out, he called" uses 間に instead.`,
      cards: [
        { front: '音楽を聞きながら勉強する。', reading: 'おんがくをききながらべんきょうする。', back: 'I study while listening to music.' },
        { front: '歩きながら話しましょう。', reading: 'あるきながらはなしましょう。', back: "Let's talk while we walk." },
        { front: 'テレビを見ながらご飯を食べる。', reading: 'テレビをみながらごはんをたべる。', back: 'I eat while watching TV.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Conditionals I: ～たら',
      body: `The all-purpose "if / when / after": た-form + ら.

・if: 雨が降ったら、行きません。 — "If it rains, I won't go."
・when/after (one-time): 家に帰ったら、電話して。 — "Call me when you get home."

Works with adjectives and nouns too:
・安かったら買う — "if it's cheap, I'll buy it"
・暇だったら来て — "come if you're free"

たらどうですか（casual: たら？） makes a suggestion: 休んだら？ — "why don't you rest?"

たら is the safest conditional to produce — it fits almost everywhere と/ば/なら do.`,
      cards: [
        { front: '雨が降ったら、行きません。', reading: 'あめがふったら、いきません。', back: "If it rains, I won't go." },
        { front: '家に帰ったら、電話してね。', reading: 'いえにかえったら、でんわしてね。', back: 'Call me when you get home.' },
        { front: '安かったら、買います。', reading: 'やすかったら、かいます。', back: "If it's cheap, I'll buy it." }
      ]
    },
    {
      kind: 'grammar',
      title: 'Conditionals II: ～と and ～ば',
      body: `と — automatic/natural consequence. Dictionary form + と; the result must be something that reliably follows, not a request or decision:

このボタンを押すと、ドアが開く。 — "Press this button and the door opens."
春になると、桜が咲く。 — "When spring comes, cherries bloom."

ば — the classic "if":
・Group 1 & adjectives: final う-row／い → え-row／ければ + ば: 行く→行けば, 安い→安ければ
・Group 2: る→れば　・する→すれば　・ある→あれば

時間があれば、手伝います。 — "If I have time, I'll help."

ば leans hypothetical; と states a rule. Both ban commands in the result clause — use たら for those.`,
      cards: [
        { front: '春になると、桜が咲きます。', reading: 'はるになると、さくらがさきます。', back: 'When spring comes, the cherry blossoms bloom.' },
        { front: 'このボタンを押すと、ドアが開く。', reading: 'このボタンをおすと、ドアがあく。', back: 'If you press this button, the door opens.' },
        { front: '時間があれば、手伝います。', reading: 'じかんがあれば、てつだいます。', back: "If I have time, I'll help." }
      ]
    },
    {
      kind: 'grammar',
      title: 'Conditionals III: ～なら — "if that\'s the case"',
      body: `なら takes something the OTHER person said or implied and builds on it: "if we're talking about X / if it's true that X".

A: 日本に行きたい。 B: 日本に行くなら、京都がおすすめだよ。
— "If you're going to Japan (as you say), I recommend Kyoto."

Directly after nouns it scopes a topic:
寿司なら、あの店が一番。 — "If it's sushi (you want), that place is best."

Key contrast with たら: 日本に行ったら買う = buy AFTER arriving; 日本に行くなら買う = buy BEFORE going (e.g. a guidebook) — なら doesn't imply the condition happens first.`,
      cards: [
        { front: '日本に行くなら、京都がおすすめです。', reading: 'にほんにいくなら、きょうとがおすすめです。', back: "If you're going to Japan, I recommend Kyoto." },
        { front: '寿司なら、あの店が一番だ。', reading: 'すしなら、あのみせがいちばんだ。', back: "If it's sushi (you want), that place is the best." },
        { front: '嫌なら、やめてもいいよ。', reading: 'いやなら、やめてもいいよ。', back: "If you don't like it, you can quit." }
      ]
    },
    {
      kind: 'grammar',
      title: 'Giving & receiving: あげる・くれる・もらう',
      body: `Three verbs encode WHO benefits — Japanese never skips this:

・あげる — I/we give outward: 友達にプレゼントをあげた。
・くれる — someone gives IN toward me/my group: 姉が傘をくれた。
・もらう — receive (receiver is subject, giver takes に/から): 姉に傘をもらった。

Attached to て-forms they mark who a favor was done for:
・貸してあげる — "I'll lend it (for you)"
・貸してくれた — "(she) kindly lent me"
・貸してもらった — "I got (her) to lend me"

くれる vs あげる is about direction relative to YOU — mixing them up is the classic mistake. In manga, ～てくれ (rough male) is a demand: 助けてくれ！ "help me!"`,
      cards: [
        { front: '友達にプレゼントをあげた。', reading: 'ともだちにプレゼントをあげた。', back: 'I gave my friend a present.' },
        { front: '姉が傘を貸してくれた。', reading: 'あねがかさをかしてくれた。', back: 'My (older) sister kindly lent me an umbrella.' },
        { front: '先生に漢字を教えてもらった。', reading: 'せんせいにかんじをおしえてもらった。', back: 'I had the teacher teach me kanji.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ておく・～てある・～てみる',
      body: `Three て-form helpers you meet constantly:

・ておく — do in advance / leave as is: ホテルを予約しておいた "I booked ahead". Casual contraction とく: 予約しとく, やめとけ ("drop it").
・てある — a state resulting from someone's deliberate action (transitive verb, thing as subject): 窓が開けてある "the window has been (left) opened" — compare 窓が開いている, which just describes it being open.
・てみる — try doing (and see): 食べてみて "try a bite". Past てみた = "gave it a try".

All three conjugate on the final verb: 買っておいた, 書いてあった, 聞いてみよう.`,
      cards: [
        { front: 'ホテルを予約しておいた。', reading: 'ホテルをよやくしておいた。', back: 'I booked a hotel in advance.' },
        { front: '窓が開けてある。', reading: 'まどがあけてある。', back: 'The window has been (left) opened.' },
        { front: '一度食べてみてください。', reading: 'いちどたべてみてください。', back: 'Please try eating it once.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Passive ～れる／～られる',
      body: `Formation:
・Group 1: final う-row → あ-row + れる: 読む→読まれる, 言う→言われる
・Group 2: る → られる: 食べる→食べられる (same shape as potential — context decides)
・する→される　・来る→来られる

The doer takes に:
先生に褒められた。 — "I was praised by the teacher."

Japanese also has the "suffering passive" for things done TO your inconvenience — even with intransitive verbs:
雨に降られた — "I got rained on"; 財布を盗まれた — "I had my wallet stolen".

Dialogue uses 言われた ("was told / they said to me") constantly.`,
      cards: [
        { front: '先生に褒められた。', reading: 'せんせいにほめられた。', back: 'I was praised by the teacher.' },
        { front: '雨に降られて、風邪をひいた。', reading: 'あめにふられて、かぜをひいた。', back: 'I got rained on and caught a cold.' },
        { front: '財布を盗まれた！', reading: 'さいふをぬすまれた！', back: 'My wallet got stolen!' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Causative ～せる／～させる',
      body: `"Make someone do" or "let someone do":

・Group 1: final う-row → あ-row + せる: 飲む→飲ませる, 笑う→笑わせる
・Group 2: る → させる: 食べる→食べさせる
・する→させる　・来る→来させる

The person made/allowed to act takes に (or を for intransitives):
母は弟に野菜を食べさせた。 — "Mom made my brother eat vegetables."

"Make" vs "let" is context: 遊ばせる is usually "let play". させてください — "please let me (do it)" — is the polite way to volunteer.

Causative + passive = "was made to do": 飲まされた "I was made to drink".`,
      cards: [
        { front: '母は弟に野菜を食べさせた。', reading: 'はははおとうとにやさいをたべさせた。', back: 'Mom made my little brother eat vegetables.' },
        { front: '子供を公園で遊ばせる。', reading: 'こどもをこうえんであそばせる。', back: 'I let the kids play in the park.' },
        { front: '笑わせないでよ。', reading: 'わらわせないでよ。', back: "Don't make me laugh!" }
      ]
    },
    {
      kind: 'grammar',
      title: 'The two ～そう — "looks like" vs "I heard"',
      body: `Same syllable, two different grammars — telling them apart is a rite of passage:

1. APPEARANCE: ます-stem／adjective stem + そう — "looks / seems about to":
・雨が降りそうだ — "it looks like rain (any second)"
・美味しそう！ — "that looks delicious!"
・いい → よさそう; ない → なさそう

2. HEARSAY: PLAIN form + そうだ — "I hear that / they say":
・雨が降るそうだ — "I hear it's going to rain"
・美味しいそうだ — "they say it's delicious"

Rule of thumb: stem+そう = your eyes; plain+そう = your ears. Before a noun the appearance そう becomes そうな: 美味しそうなケーキ.`,
      cards: [
        { front: '雨が降りそうだ。', reading: 'あめがふりそうだ。', back: "It looks like it's about to rain." },
        { front: 'このケーキ、美味しそう！', reading: 'このケーキ、おいしそう！', back: 'This cake looks delicious!' },
        { front: '田中さんは来ないそうだ。', reading: 'たなかさんはこないそうだ。', back: 'I hear Tanaka isn’t coming.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～らしい・～みたい・～よう(だ)',
      body: `Three ways to hedge, from evidence-based to impressionistic:

・らしい — inference from what you heard/observed, some distance: 彼は学生らしい "apparently he's a student". Also "typical of": 男らしい "manly", 彼女らしくない "not like her".
・みたい — casual "like / seems": 夢みたいだ "it's like a dream"; 子供みたいなことを言うな "don't talk like a kid". Conjugates like a な-adjective.
・ようだ — the formal/written counterpart of みたい: 誰もいないようだ "it seems nobody's here". Before nouns: 氷のような目 "eyes like ice".

For reading: みたい dominates dialogue, ようだ dominates narration.`,
      cards: [
        { front: '彼は学生らしい。', reading: 'かれはがくせいらしい。', back: "Apparently he's a student." },
        { front: '夢みたいだ。', reading: 'ゆめみたいだ。', back: "It's like a dream." },
        { front: '誰もいないようだ。', reading: 'だれもいないようだ。', back: 'It seems nobody is here.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～かもしれない・～はず(だ)',
      body: `・かもしれない — "might / maybe" (weak, ~50% or less). Plain form + かもしれない; casual clip: かも.
　嘘かもしれない — "it might be a lie"; 行けないかも — "might not be able to go".

・はずだ — "should / is supposed to" (strong expectation from reasoning):
　もう着いているはずだ — "(they) should have arrived by now".
　Negative: 来ないはずだ "shouldn't be coming" vs はずがない "there's NO WAY": 彼が犯人のはずがない！ — a manga staple.

Both attach to plain forms; nouns take の before はず (学生のはず) and nothing before かも (学生かも).`,
      cards: [
        { front: '明日は雪かもしれない。', reading: 'あしたはゆきかもしれない。', back: 'It might snow tomorrow.' },
        { front: 'もう着いているはずだ。', reading: 'もうついているはずだ。', back: 'They should have arrived by now.' },
        { front: 'そんなはずがない！', reading: 'そんなはずがない！', back: "That can't be! / No way!" }
      ]
    },
    {
      kind: 'grammar',
      title: 'Volitional + と思う・つもり — plans and intentions',
      body: `The plain volitional (行こう, 食べよう — from the casual-speech course) combines with と思う for soft intentions:

留学しようと思っている。 — "I'm thinking of studying abroad."
(と思う = decided just now; と思っている = been planning for a while)

つもり states a firmer plan: dictionary form + つもりだ:
夏休みに国へ帰るつもりだ。 — "I intend to go home over summer break."
Negative: 行かないつもり ("plan not to") vs 行くつもりはない ("have no intention of going" — stronger).

Volitional + かな muses aloud: 何を食べようかな — "what'll I eat, I wonder…" — inner-monologue fuel in manga.`,
      cards: [
        { front: '留学しようと思っています。', reading: 'りゅうがくしようとおもっています。', back: "I'm thinking of studying abroad." },
        { front: '夏休みに国へ帰るつもりだ。', reading: 'なつやすみにくにへかえるつもりだ。', back: 'I plan to go back home for summer break.' },
        { front: '何を食べようかな。', reading: 'なにをたべようかな。', back: 'What shall I eat, I wonder…' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Purpose: ～ために・～ように',
      body: `・ために — deliberate purpose, controllable action (same subject): 家族のために働く "work for my family"; 家を買うために貯金している "saving to buy a house". After nouns: Nの ために.

・ように — aiming at a STATE or something not directly controllable — so it loves potential and negative verbs:
　日本語が話せるように、毎日練習する。 — "I practice daily so that I can speak Japanese."
　忘れないように、メモした。 — "I noted it down so I wouldn't forget."

Test: if the goal verb is potential (～える) or negative (～ない), it's ように; a plain action you'll do yourself → ために.`,
      cards: [
        { front: '家族のために働いている。', reading: 'かぞくのためにはたらいている。', back: "I work for my family's sake." },
        { front: '日本語が話せるように、毎日練習する。', reading: 'にほんごがはなせるように、まいにちれんしゅうする。', back: 'I practice every day so that I can speak Japanese.' },
        { front: '忘れないように、メモした。', reading: 'わすれないように、メモした。', back: "I made a note so I wouldn't forget." }
      ]
    },
    {
      kind: 'grammar',
      title: '～やすい・～にくい・～すぎる',
      body: `Three suffixes that glue onto the ます-stem:

・やすい — easy to: 読みやすい "easy to read", 分かりやすい "easy to understand"
・にくい — hard to: 覚えにくい "hard to memorize", 言いにくい "hard to say (awkward)"
・すぎる — too much / overdo: 食べすぎる "eat too much", 高すぎる "too expensive" (adjective stem + すぎる)

All three make the result conjugate like its ending: やすい/にくい like い-adjectives (読みやすかった), すぎる like a Group 2 verb (飲みすぎた).

Casual clipped exclamation: やばすぎ！ 高すぎ！ — the る drops.`,
      cards: [
        { front: 'この本は読みやすい。', reading: 'このほんはよみやすい。', back: 'This book is easy to read.' },
        { front: 'この漢字は覚えにくい。', reading: 'このかんじはおぼえにくい。', back: 'This kanji is hard to memorize.' },
        { front: '食べすぎた。お腹が痛い。', reading: 'たべすぎた。おなかがいたい。', back: 'I ate too much. My stomach hurts.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'こと patterns: ことができる・たことがある・ことにする',
      body: `こと ("thing/fact") nominalizes verbs into several set patterns:

・dictionary + ことができる — "can" (stiffer than the potential form; common in writing): 漢字を読むことができる.
・た-form + ことがある — "have (ever) done": 日本に行ったことがある "I've been to Japan". Negative: 見たことがない "never seen it".
・dictionary + ことにする — "decide to": 毎日走ることにした "I decided to run daily".
・dictionary + ことになる — "it's been decided / turn out that": 引っ越すことになった "it's been settled that we're moving" (decision made around you).

する = your choice, なる = the world's choice — a very Japanese distinction worth internalizing.`,
      cards: [
        { front: '日本に行ったことがありますか。', reading: 'にほんにいったことがありますか。', back: 'Have you ever been to Japan?' },
        { front: '毎日走ることにした。', reading: 'まいにちはしることにした。', back: 'I decided to run every day.' },
        { front: '東京に引っ越すことになった。', reading: 'とうきょうにひっこすことになった。', back: "It's been decided that I'm moving to Tokyo." }
      ]
    },
    {
      kind: 'grammar',
      title: 'Comparisons: ～より・～のほうが・～ほど～ない',
      body: `・XよりYのほうが… — "Y more than X": 犬より猫のほうが好きだ "I like cats more than dogs". Either half can drop when obvious: こっちのほうがいい "this one's better".

・Xほど～ない — "not as … as X": 今日は昨日ほど暑くない "today isn't as hot as yesterday". ほど only lives in negatives for this meaning.

・Questions pick with どちら／どっち: 犬と猫と、どっちが好き？ — "dogs or cats, which do you like?"

・Superlative is simply 一番: 世界で一番強い — "strongest in the world" (you will read this in shōnen manga weekly).`,
      cards: [
        { front: '犬より猫のほうが好きだ。', reading: 'いぬよりねこのほうがすきだ。', back: 'I like cats more than dogs.' },
        { front: '今日は昨日ほど暑くない。', reading: 'きょうはきのうほどあつくない。', back: "Today isn't as hot as yesterday." },
        { front: '世界で一番強い。', reading: 'せかいでいちばんつよい。', back: 'The strongest in the world.' }
      ]
    }
  ]
}

const N4_VOCAB_COURSE: SeedCourse = {
  title: 'JLPT N4 Vocabulary',
  description:
    'Core N4 words grouped by theme — the everyday vocabulary that carries most ' +
    'slice-of-life manga and VN scenes. Best studied alongside the N4 Grammar course.',
  level: 'N4',
  difficulty: 7,
  lessons: [
    {
      kind: 'vocab',
      title: 'Time & frequency',
      cards: [
        { front: 'いつも', back: 'always; usually', pos: 'adverb' },
        { front: 'たいてい', back: 'usually; mostly', pos: 'adverb' },
        { front: 'ときどき', reading: 'ときどき', back: 'sometimes', pos: 'adverb' },
        { front: 'たまに', back: 'occasionally', pos: 'adverb' },
        { front: 'ぜんぜん', back: 'not at all (with negative)', pos: 'adverb' },
        { front: 'もうすぐ', back: 'soon; any time now', pos: 'adverb' },
        { front: 'さっき', back: 'a moment ago', pos: 'adverb' },
        { front: 'あとで', back: 'later', pos: 'adverb' },
        { front: '急に', reading: 'きゅうに', back: 'suddenly', pos: 'adverb' },
        { front: 'やっと', back: 'finally; at last', pos: 'adverb' },
        { front: 'ずっと', back: 'the whole time; by far', pos: 'adverb' },
        { front: '最近', reading: 'さいきん', back: 'recently', pos: 'noun/adverb' },
        { front: 'このごろ', back: 'these days', pos: 'adverb' },
        { front: '将来', reading: 'しょうらい', back: 'the future', pos: 'noun' },
        { front: '途中', reading: 'とちゅう', back: 'on the way; midway', pos: 'noun' },
        { front: '間に合う', reading: 'まにあう', back: 'to be on time; to make it', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Feelings & reactions',
      cards: [
        { front: '嬉しい', reading: 'うれしい', back: 'happy; glad', pos: 'i-adjective' },
        { front: '悲しい', reading: 'かなしい', back: 'sad', pos: 'i-adjective' },
        { front: '寂しい', reading: 'さびしい', back: 'lonely', pos: 'i-adjective' },
        { front: '恥ずかしい', reading: 'はずかしい', back: 'embarrassed; embarrassing', pos: 'i-adjective' },
        { front: '怖い', reading: 'こわい', back: 'scary; scared', pos: 'i-adjective' },
        { front: '眠い', reading: 'ねむい', back: 'sleepy', pos: 'i-adjective' },
        { front: '疲れる', reading: 'つかれる', back: 'to get tired', pos: 'verb (ru)' },
        { front: '心配', reading: 'しんぱい', back: 'worry; concern', pos: 'na-adjective/noun' },
        { front: '安心', reading: 'あんしん', back: 'relief; peace of mind', pos: 'na-adjective/noun' },
        { front: '気分', reading: 'きぶん', back: 'mood; feeling', pos: 'noun' },
        { front: '気持ち', reading: 'きもち', back: 'feeling; sensation', pos: 'noun' },
        { front: '楽しみ', reading: 'たのしみ', back: 'something to look forward to', pos: 'noun', notes: '楽しみにしている = "I\'m looking forward to it".' },
        { front: 'びっくりする', back: 'to be surprised', pos: 'verb (irregular)' },
        { front: '怒る', reading: 'おこる', back: 'to get angry', pos: 'verb (u)' },
        { front: '笑う', reading: 'わらう', back: 'to laugh; to smile', pos: 'verb (u)' },
        { front: '泣く', reading: 'なく', back: 'to cry', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'vocab',
      title: 'People & communication',
      cards: [
        { front: '挨拶', reading: 'あいさつ', back: 'greeting', pos: 'noun' },
        { front: '返事', reading: 'へんじ', back: 'reply; answer', pos: 'noun' },
        { front: '連絡', reading: 'れんらく', back: 'contact; getting in touch', pos: 'noun' },
        { front: '相談', reading: 'そうだん', back: 'consultation; talking something over', pos: 'noun' },
        { front: '約束', reading: 'やくそく', back: 'promise; appointment', pos: 'noun' },
        { front: 'けんか', back: 'fight; quarrel', pos: 'noun' },
        { front: 'お礼', reading: 'おれい', back: 'thanks; token of gratitude', pos: 'noun' },
        { front: '失礼', reading: 'しつれい', back: 'rudeness; excuse me', pos: 'na-adjective/noun', notes: '失礼します = "pardon the intrusion".' },
        { front: '丁寧', reading: 'ていねい', back: 'polite; careful', pos: 'na-adjective' },
        { front: '客', reading: 'きゃく', back: 'guest; customer', pos: 'noun', notes: 'Usually お客さん／お客様.' },
        { front: '理由', reading: 'りゆう', back: 'reason', pos: 'noun' },
        { front: '意見', reading: 'いけん', back: 'opinion', pos: 'noun' },
        { front: '興味', reading: 'きょうみ', back: 'interest (in something)', pos: 'noun', notes: '～に興味がある.' },
        { front: '嘘をつく', reading: 'うそをつく', back: 'to tell a lie', pos: 'expression' },
        { front: '誘う', reading: 'さそう', back: 'to invite', pos: 'verb (u)' },
        { front: '紹介する', reading: 'しょうかいする', back: 'to introduce', pos: 'verb (irregular)' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Daily life & plans',
      cards: [
        { front: '洗濯', reading: 'せんたく', back: 'laundry', pos: 'noun' },
        { front: '掃除', reading: 'そうじ', back: 'cleaning', pos: 'noun' },
        { front: '引っ越し', reading: 'ひっこし', back: 'moving (house)', pos: 'noun' },
        { front: '留守', reading: 'るす', back: 'being away from home', pos: 'noun' },
        { front: 'ごみ', back: 'trash; garbage', pos: 'noun' },
        { front: '鍵', reading: 'かぎ', back: 'key; lock', pos: 'noun' },
        { front: '財布', reading: 'さいふ', back: 'wallet', pos: 'noun' },
        { front: '携帯', reading: 'けいたい', back: 'mobile phone', pos: 'noun', notes: 'Also スマホ (smartphone).' },
        { front: '布団', reading: 'ふとん', back: 'futon; bedding', pos: 'noun' },
        { front: '予定', reading: 'よてい', back: 'plan; schedule', pos: 'noun' },
        { front: '都合', reading: 'つごう', back: 'convenience; circumstances', pos: 'noun', notes: '都合がいい／悪い = works / doesn\'t work (for me).' },
        { front: '用事', reading: 'ようじ', back: 'errand; things to do', pos: 'noun' },
        { front: '準備', reading: 'じゅんび', back: 'preparation', pos: 'noun' },
        { front: '約束を守る', reading: 'やくそくをまもる', back: 'to keep a promise', pos: 'expression' },
        { front: '片付ける', reading: 'かたづける', back: 'to tidy up; to put away', pos: 'verb (ru)' },
        { front: '捨てる', reading: 'すてる', back: 'to throw away', pos: 'verb (ru)' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Getting around',
      cards: [
        { front: '近く', reading: 'ちかく', back: 'nearby; vicinity', pos: 'noun' },
        { front: '隣', reading: 'となり', back: 'next to; neighbor', pos: 'noun' },
        { front: '向かい', reading: 'むかい', back: 'across from; opposite', pos: 'noun' },
        { front: '交差点', reading: 'こうさてん', back: 'intersection', pos: 'noun' },
        { front: '信号', reading: 'しんごう', back: 'traffic light', pos: 'noun' },
        { front: '橋', reading: 'はし', back: 'bridge', pos: 'noun' },
        { front: 'まっすぐ', back: 'straight ahead', pos: 'adverb' },
        { front: '曲がる', reading: 'まがる', back: 'to turn (a corner)', pos: 'verb (u)' },
        { front: '渡る', reading: 'わたる', back: 'to cross (a street, bridge)', pos: 'verb (u)' },
        { front: '止まる', reading: 'とまる', back: 'to stop', pos: 'verb (u)' },
        { front: '乗り換える', reading: 'のりかえる', back: 'to transfer (trains)', pos: 'verb (ru)' },
        { front: '迎える', reading: 'むかえる', back: 'to go meet; to welcome', pos: 'verb (ru)', notes: '迎えに行く = "go pick (someone) up".' },
        { front: '寄る', reading: 'よる', back: 'to drop by', pos: 'verb (u)' },
        { front: '道に迷う', reading: 'みちにまよう', back: 'to get lost', pos: 'expression' },
        { front: '急ぐ', reading: 'いそぐ', back: 'to hurry', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Everyday verbs III',
      cards: [
        { front: '見つける', reading: 'みつける', back: 'to find', pos: 'verb (ru)' },
        { front: '探す', reading: 'さがす', back: 'to look for', pos: 'verb (u)' },
        { front: '選ぶ', reading: 'えらぶ', back: 'to choose', pos: 'verb (u)' },
        { front: '決める', reading: 'きめる', back: 'to decide', pos: 'verb (ru)' },
        { front: '変わる', reading: 'かわる', back: 'to change (by itself)', pos: 'verb (u)', notes: '変える = to change (something).' },
        { front: '続ける', reading: 'つづける', back: 'to continue (something)', pos: 'verb (ru)' },
        { front: '覚える', reading: 'おぼえる', back: 'to memorize; to learn', pos: 'verb (ru)' },
        { front: '思い出す', reading: 'おもいだす', back: 'to recall; to remember', pos: 'verb (u)' },
        { front: '忘れる', reading: 'わすれる', back: 'to forget', pos: 'verb (ru)' },
        { front: '調べる', reading: 'しらべる', back: 'to look up; to investigate', pos: 'verb (ru)' },
        { front: '伝える', reading: 'つたえる', back: 'to convey; to pass on (a message)', pos: 'verb (ru)' },
        { front: '受ける', reading: 'うける', back: 'to receive; to take (an exam)', pos: 'verb (ru)' },
        { front: '遅れる', reading: 'おくれる', back: 'to be late', pos: 'verb (ru)' },
        { front: '慣れる', reading: 'なれる', back: 'to get used to', pos: 'verb (ru)' },
        { front: '手伝う', reading: 'てつだう', back: 'to help (with a task)', pos: 'verb (u)' },
        { front: '頑張る', reading: 'がんばる', back: 'to do one\'s best', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Description II',
      cards: [
        { front: '便利', reading: 'べんり', back: 'convenient', pos: 'na-adjective' },
        { front: '不便', reading: 'ふべん', back: 'inconvenient', pos: 'na-adjective' },
        { front: '有名', reading: 'ゆうめい', back: 'famous', pos: 'na-adjective' },
        { front: '大事', reading: 'だいじ', back: 'important; precious', pos: 'na-adjective', notes: 'お大事に = "get well soon".' },
        { front: '大切', reading: 'たいせつ', back: 'important; treasured', pos: 'na-adjective' },
        { front: '必要', reading: 'ひつよう', back: 'necessary', pos: 'na-adjective/noun' },
        { front: '自由', reading: 'じゆう', back: 'free; freedom', pos: 'na-adjective/noun' },
        { front: '危ない', reading: 'あぶない', back: 'dangerous', pos: 'i-adjective' },
        { front: '安全', reading: 'あんぜん', back: 'safe; safety', pos: 'na-adjective/noun' },
        { front: '邪魔', reading: 'じゃま', back: 'hindrance; in the way', pos: 'na-adjective/noun', notes: 'お邪魔します when entering a home.' },
        { front: '真面目', reading: 'まじめ', back: 'serious; diligent', pos: 'na-adjective' },
        { front: '優しい', reading: 'やさしい', back: 'kind; gentle', pos: 'i-adjective' },
        { front: '厳しい', reading: 'きびしい', back: 'strict; harsh', pos: 'i-adjective' },
        { front: 'ひどい', back: 'terrible; cruel', pos: 'i-adjective' },
        { front: '素晴らしい', reading: 'すばらしい', back: 'wonderful', pos: 'i-adjective' },
        { front: '変', reading: 'へん', back: 'strange; weird', pos: 'na-adjective' }
      ]
    }
  ]
}

const N4_KANJI_COURSE: SeedCourse = {
  title: 'JLPT N4 Kanji',
  description:
    'The ~160 kanji of JLPT N4, grouped by theme. Together with the N5 deck this ' +
    'covers the characters that appear on nearly every manga page.',
  level: 'N4',
  difficulty: 8,
  lessons: [
    {
      kind: 'kanji',
      title: 'Seasons & time',
      cards: [
        { front: '春', reading: 'はる', back: 'spring', onyomi: 'シュン', kunyomi: 'はる', exampleJp: '春休み', exampleReading: 'はるやすみ', exampleEn: 'spring break' },
        { front: '夏', reading: 'なつ', back: 'summer', onyomi: 'カ', kunyomi: 'なつ', exampleJp: '夏休み', exampleReading: 'なつやすみ', exampleEn: 'summer vacation' },
        { front: '秋', reading: 'あき', back: 'autumn', onyomi: 'シュウ', kunyomi: 'あき', exampleJp: '秋', exampleReading: 'あき', exampleEn: 'autumn' },
        { front: '冬', reading: 'ふゆ', back: 'winter', onyomi: 'トウ', kunyomi: 'ふゆ', exampleJp: '冬休み', exampleReading: 'ふゆやすみ', exampleEn: 'winter break' },
        { front: '朝', reading: 'あさ', back: 'morning', onyomi: 'チョウ', kunyomi: 'あさ', exampleJp: '今朝', exampleReading: 'けさ', exampleEn: 'this morning' },
        { front: '昼', reading: 'ひる', back: 'noon; daytime', onyomi: 'チュウ', kunyomi: 'ひる', exampleJp: '昼ご飯', exampleReading: 'ひるごはん', exampleEn: 'lunch' },
        { front: '夜', reading: 'よる', back: 'night', onyomi: 'ヤ', kunyomi: 'よる', exampleJp: '今夜', exampleReading: 'こんや', exampleEn: 'tonight' },
        { front: '夕', reading: 'ゆう', back: 'evening', onyomi: 'セキ', kunyomi: 'ゆう', exampleJp: '夕方', exampleReading: 'ゆうがた', exampleEn: 'early evening' },
        { front: '去', reading: 'きょ', back: 'past; to leave', onyomi: 'キョ, コ', kunyomi: 'さ(る)', exampleJp: '去年', exampleReading: 'きょねん', exampleEn: 'last year' },
        { front: '回', reading: 'かい', back: 'times; to turn', onyomi: 'カイ', kunyomi: 'まわ(る)', exampleJp: '一回', exampleReading: 'いっかい', exampleEn: 'one time' },
        { front: '度', reading: 'ど', back: 'degree; occurrence', onyomi: 'ド', kunyomi: 'たび', exampleJp: '今度', exampleReading: 'こんど', exampleEn: 'next time' },
        { front: '早', reading: 'はや(い)', back: 'early; fast', onyomi: 'ソウ', kunyomi: 'はや(い)', exampleJp: '早く', exampleReading: 'はやく', exampleEn: 'quickly; early' },
        { front: '遅', reading: 'おそ(い)', back: 'late; slow', onyomi: 'チ', kunyomi: 'おそ(い), おく(れる)', exampleJp: '遅刻', exampleReading: 'ちこく', exampleEn: 'being late' },
        { front: '始', reading: 'はじ(める)', back: 'to begin', onyomi: 'シ', kunyomi: 'はじ(める)', exampleJp: '始まる', exampleReading: 'はじまる', exampleEn: 'to begin (intr.)' },
        { front: '終', reading: 'お(わる)', back: 'to end', onyomi: 'シュウ', kunyomi: 'お(わる)', exampleJp: '終わり', exampleReading: 'おわり', exampleEn: 'the end' },
        { front: '次', reading: 'つぎ', back: 'next', onyomi: 'ジ', kunyomi: 'つぎ', exampleJp: '次の駅', exampleReading: 'つぎのえき', exampleEn: 'the next station' }
      ]
    },
    {
      kind: 'kanji',
      title: 'World & places',
      cards: [
        { front: '風', reading: 'かぜ', back: 'wind; style', onyomi: 'フウ', kunyomi: 'かぜ', exampleJp: '台風', exampleReading: 'たいふう', exampleEn: 'typhoon' },
        { front: '雪', reading: 'ゆき', back: 'snow', onyomi: 'セツ', kunyomi: 'ゆき', exampleJp: '大雪', exampleReading: 'おおゆき', exampleEn: 'heavy snow' },
        { front: '海', reading: 'うみ', back: 'sea', onyomi: 'カイ', kunyomi: 'うみ', exampleJp: '海外', exampleReading: 'かいがい', exampleEn: 'overseas' },
        { front: '池', reading: 'いけ', back: 'pond', onyomi: 'チ', kunyomi: 'いけ', exampleJp: '池', exampleReading: 'いけ', exampleEn: 'pond' },
        { front: '森', reading: 'もり', back: 'forest', onyomi: 'シン', kunyomi: 'もり', exampleJp: '森', exampleReading: 'もり', exampleEn: 'forest' },
        { front: '林', reading: 'はやし', back: 'woods; grove', onyomi: 'リン', kunyomi: 'はやし', exampleJp: '林', exampleReading: 'はやし', exampleEn: 'woods' },
        { front: '村', reading: 'むら', back: 'village', onyomi: 'ソン', kunyomi: 'むら', exampleJp: '村', exampleReading: 'むら', exampleEn: 'village' },
        { front: '町', reading: 'まち', back: 'town', onyomi: 'チョウ', kunyomi: 'まち', exampleJp: '町', exampleReading: 'まち', exampleEn: 'town' },
        { front: '都', reading: 'と', back: 'metropolis; capital', onyomi: 'ト, ツ', kunyomi: 'みやこ', exampleJp: '東京都', exampleReading: 'とうきょうと', exampleEn: 'Tokyo Metropolis' },
        { front: '区', reading: 'く', back: 'ward; district', onyomi: 'ク', exampleJp: '区', exampleReading: 'く', exampleEn: 'city ward' },
        { front: '世', reading: 'せ', back: 'world; generation', onyomi: 'セ, セイ', kunyomi: 'よ', exampleJp: '世界', exampleReading: 'せかい', exampleEn: 'the world' },
        { front: '界', reading: 'かい', back: 'boundary; world', onyomi: 'カイ', exampleJp: '世界中', exampleReading: 'せかいじゅう', exampleEn: 'all over the world' },
        { front: '地', reading: 'ち', back: 'ground; earth', onyomi: 'チ, ジ', exampleJp: '地図', exampleReading: 'ちず', exampleEn: 'map' },
        { front: '図', reading: 'ず', back: 'diagram; plan', onyomi: 'ズ, ト', kunyomi: 'はか(る)', exampleJp: '図書館', exampleReading: 'としょかん', exampleEn: 'library' },
        { front: '野', reading: 'の', back: 'field; plain', onyomi: 'ヤ', kunyomi: 'の', exampleJp: '野菜', exampleReading: 'やさい', exampleEn: 'vegetables' },
        { front: '場', reading: 'ば', back: 'place', onyomi: 'ジョウ', kunyomi: 'ば', exampleJp: '場所', exampleReading: 'ばしょ', exampleEn: 'place; location' },
        { front: '所', reading: 'ところ', back: 'place; point', onyomi: 'ショ', kunyomi: 'ところ', exampleJp: '台所', exampleReading: 'だいどころ', exampleEn: 'kitchen' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Body & health',
      cards: [
        { front: '体', reading: 'からだ', back: 'body', onyomi: 'タイ', kunyomi: 'からだ', exampleJp: '体', exampleReading: 'からだ', exampleEn: 'body' },
        { front: '頭', reading: 'あたま', back: 'head', onyomi: 'トウ', kunyomi: 'あたま', exampleJp: '頭がいい', exampleReading: 'あたまがいい', exampleEn: 'smart' },
        { front: '顔', reading: 'かお', back: 'face', onyomi: 'ガン', kunyomi: 'かお', exampleJp: '笑顔', exampleReading: 'えがお', exampleEn: 'smiling face' },
        { front: '声', reading: 'こえ', back: 'voice', onyomi: 'セイ', kunyomi: 'こえ', exampleJp: '大声', exampleReading: 'おおごえ', exampleEn: 'loud voice' },
        { front: '心', reading: 'こころ', back: 'heart; mind', onyomi: 'シン', kunyomi: 'こころ', exampleJp: '安心', exampleReading: 'あんしん', exampleEn: 'relief' },
        { front: '力', reading: 'ちから', back: 'power; strength', onyomi: 'リョク, リキ', kunyomi: 'ちから', exampleJp: '力', exampleReading: 'ちから', exampleEn: 'strength' },
        { front: '病', reading: 'びょう', back: 'illness', onyomi: 'ビョウ', kunyomi: 'やまい', exampleJp: '病気', exampleReading: 'びょうき', exampleEn: 'sickness' },
        { front: '医', reading: 'い', back: 'medicine; doctor', onyomi: 'イ', exampleJp: '医者', exampleReading: 'いしゃ', exampleEn: 'doctor' },
        { front: '薬', reading: 'くすり', back: 'medicine; drug', onyomi: 'ヤク', kunyomi: 'くすり', exampleJp: '薬', exampleReading: 'くすり', exampleEn: 'medicine' },
        { front: '死', reading: 'し(ぬ)', back: 'death; to die', onyomi: 'シ', kunyomi: 'し(ぬ)', exampleJp: '死ぬ', exampleReading: 'しぬ', exampleEn: 'to die' },
        { front: '元', reading: 'げん', back: 'origin; former', onyomi: 'ゲン, ガン', kunyomi: 'もと', exampleJp: '元気', exampleReading: 'げんき', exampleEn: 'healthy; energetic' }
      ]
    },
    {
      kind: 'kanji',
      title: 'People & relationships',
      cards: [
        { front: '兄', reading: 'あに', back: 'older brother', onyomi: 'キョウ, ケイ', kunyomi: 'あに', exampleJp: 'お兄さん', exampleReading: 'おにいさん', exampleEn: 'older brother' },
        { front: '姉', reading: 'あね', back: 'older sister', onyomi: 'シ', kunyomi: 'あね', exampleJp: 'お姉さん', exampleReading: 'おねえさん', exampleEn: 'older sister' },
        { front: '弟', reading: 'おとうと', back: 'younger brother', onyomi: 'ダイ, テイ', kunyomi: 'おとうと', exampleJp: '兄弟', exampleReading: 'きょうだい', exampleEn: 'siblings' },
        { front: '妹', reading: 'いもうと', back: 'younger sister', onyomi: 'マイ', kunyomi: 'いもうと', exampleJp: '姉妹', exampleReading: 'しまい', exampleEn: 'sisters' },
        { front: '家', reading: 'いえ', back: 'house; family', onyomi: 'カ, ケ', kunyomi: 'いえ, や', exampleJp: '家族', exampleReading: 'かぞく', exampleEn: 'family' },
        { front: '族', reading: 'ぞく', back: 'tribe; family', onyomi: 'ゾク', exampleJp: '家族', exampleReading: 'かぞく', exampleEn: 'family' },
        { front: '親', reading: 'おや', back: 'parent; intimate', onyomi: 'シン', kunyomi: 'おや, した(しい)', exampleJp: '両親', exampleReading: 'りょうしん', exampleEn: 'parents' },
        { front: '主', reading: 'しゅ', back: 'main; master', onyomi: 'シュ', kunyomi: 'おも, ぬし', exampleJp: 'ご主人', exampleReading: 'ごしゅじん', exampleEn: '(someone\'s) husband' },
        { front: '者', reading: 'もの', back: 'person', onyomi: 'シャ', kunyomi: 'もの', exampleJp: '若者', exampleReading: 'わかもの', exampleEn: 'young person' },
        { front: '員', reading: 'いん', back: 'member; staff', onyomi: 'イン', exampleJp: '店員', exampleReading: 'てんいん', exampleEn: 'shop clerk' },
        { front: '民', reading: 'みん', back: 'people; citizen', onyomi: 'ミン', kunyomi: 'たみ', exampleJp: '市民', exampleReading: 'しみん', exampleEn: 'citizen' },
        { front: '様', reading: 'さま', back: 'honorific; manner', onyomi: 'ヨウ', kunyomi: 'さま', exampleJp: 'お客様', exampleReading: 'おきゃくさま', exampleEn: 'customer (honorific)' },
        { front: '君', reading: 'きみ', back: 'you (familiar); -kun', onyomi: 'クン', kunyomi: 'きみ', exampleJp: '君', exampleReading: 'きみ', exampleEn: 'you (to an equal/junior)' },
        { front: '彼', reading: 'かれ', back: 'he; boyfriend', onyomi: 'ヒ', kunyomi: 'かれ, かの', exampleJp: '彼女', exampleReading: 'かのじょ', exampleEn: 'she; girlfriend' },
        { front: '自', reading: 'じ', back: 'self', onyomi: 'ジ, シ', kunyomi: 'みずか(ら)', exampleJp: '自分', exampleReading: 'じぶん', exampleEn: 'oneself' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Movement & travel',
      cards: [
        { front: '帰', reading: 'かえ(る)', back: 'to return home', onyomi: 'キ', kunyomi: 'かえ(る)', exampleJp: '帰り', exampleReading: 'かえり', exampleEn: 'the way home' },
        { front: '歩', reading: 'ある(く)', back: 'to walk', onyomi: 'ホ', kunyomi: 'ある(く)', exampleJp: '散歩', exampleReading: 'さんぽ', exampleEn: 'a stroll' },
        { front: '走', reading: 'はし(る)', back: 'to run', onyomi: 'ソウ', kunyomi: 'はし(る)', exampleJp: '走る', exampleReading: 'はしる', exampleEn: 'to run' },
        { front: '通', reading: 'とお(る)', back: 'to pass through; commute', onyomi: 'ツウ', kunyomi: 'とお(る), かよ(う)', exampleJp: '通う', exampleReading: 'かよう', exampleEn: 'to commute' },
        { front: '運', reading: 'うん', back: 'to carry; luck', onyomi: 'ウン', kunyomi: 'はこ(ぶ)', exampleJp: '運転', exampleReading: 'うんてん', exampleEn: 'driving' },
        { front: '転', reading: 'てん', back: 'to turn; to tumble', onyomi: 'テン', kunyomi: 'ころ(ぶ)', exampleJp: '自転車', exampleReading: 'じてんしゃ', exampleEn: 'bicycle' },
        { front: '動', reading: 'うご(く)', back: 'to move', onyomi: 'ドウ', kunyomi: 'うご(く)', exampleJp: '動物', exampleReading: 'どうぶつ', exampleEn: 'animal' },
        { front: '乗', reading: 'の(る)', back: 'to ride; to board', onyomi: 'ジョウ', kunyomi: 'の(る)', exampleJp: '乗り物', exampleReading: 'のりもの', exampleEn: 'vehicle' },
        { front: '送', reading: 'おく(る)', back: 'to send; to see off', onyomi: 'ソウ', kunyomi: 'おく(る)', exampleJp: '送る', exampleReading: 'おくる', exampleEn: 'to send' },
        { front: '旅', reading: 'たび', back: 'journey', onyomi: 'リョ', kunyomi: 'たび', exampleJp: '旅行', exampleReading: 'りょこう', exampleEn: 'trip; travel' },
        { front: '着', reading: 'つ(く)', back: 'to arrive; to wear', onyomi: 'チャク', kunyomi: 'つ(く), き(る)', exampleJp: '着く', exampleReading: 'つく', exampleEn: 'to arrive' },
        { front: '発', reading: 'はつ', back: 'departure; emission', onyomi: 'ハツ', exampleJp: '出発', exampleReading: 'しゅっぱつ', exampleEn: 'departure' },
        { front: '急', reading: 'いそ(ぐ)', back: 'to hurry; sudden', onyomi: 'キュウ', kunyomi: 'いそ(ぐ)', exampleJp: '急に', exampleReading: 'きゅうに', exampleEn: 'suddenly' },
        { front: '遠', reading: 'とお(い)', back: 'far', onyomi: 'エン', kunyomi: 'とお(い)', exampleJp: '遠い', exampleReading: 'とおい', exampleEn: 'far away' },
        { front: '近', reading: 'ちか(い)', back: 'near', onyomi: 'キン', kunyomi: 'ちか(い)', exampleJp: '近所', exampleReading: 'きんじょ', exampleEn: 'neighborhood' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Learning & work',
      cards: [
        { front: '勉', reading: 'べん', back: 'exertion; effort', onyomi: 'ベン', exampleJp: '勉強', exampleReading: 'べんきょう', exampleEn: 'studying' },
        { front: '強', reading: 'つよ(い)', back: 'strong', onyomi: 'キョウ', kunyomi: 'つよ(い)', exampleJp: '強い', exampleReading: 'つよい', exampleEn: 'strong' },
        { front: '教', reading: 'おし(える)', back: 'to teach', onyomi: 'キョウ', kunyomi: 'おし(える)', exampleJp: '教室', exampleReading: 'きょうしつ', exampleEn: 'classroom' },
        { front: '室', reading: 'しつ', back: 'room', onyomi: 'シツ', exampleJp: '教室', exampleReading: 'きょうしつ', exampleEn: 'classroom' },
        { front: '習', reading: 'なら(う)', back: 'to learn', onyomi: 'シュウ', kunyomi: 'なら(う)', exampleJp: '練習', exampleReading: 'れんしゅう', exampleEn: 'practice' },
        { front: '研', reading: 'けん', back: 'to sharpen; research', onyomi: 'ケン', exampleJp: '研究', exampleReading: 'けんきゅう', exampleEn: 'research' },
        { front: '究', reading: 'きゅう', back: 'to investigate', onyomi: 'キュウ', exampleJp: '研究者', exampleReading: 'けんきゅうしゃ', exampleEn: 'researcher' },
        { front: '試', reading: 'し', back: 'to try; test', onyomi: 'シ', kunyomi: 'ため(す)', exampleJp: '試験', exampleReading: 'しけん', exampleEn: 'exam' },
        { front: '験', reading: 'けん', back: 'testing; experience', onyomi: 'ケン', exampleJp: '経験', exampleReading: 'けいけん', exampleEn: 'experience' },
        { front: '質', reading: 'しつ', back: 'quality; substance', onyomi: 'シツ', exampleJp: '質問', exampleReading: 'しつもん', exampleEn: 'question' },
        { front: '問', reading: 'もん', back: 'question; to ask', onyomi: 'モン', kunyomi: 'と(う)', exampleJp: '問題', exampleReading: 'もんだい', exampleEn: 'problem' },
        { front: '題', reading: 'だい', back: 'topic; title', onyomi: 'ダイ', exampleJp: '宿題', exampleReading: 'しゅくだい', exampleEn: 'homework' },
        { front: '答', reading: 'こた(える)', back: 'to answer', onyomi: 'トウ', kunyomi: 'こた(える)', exampleJp: '答え', exampleReading: 'こたえ', exampleEn: 'answer' },
        { front: '宿', reading: 'しゅく', back: 'lodging', onyomi: 'シュク', kunyomi: 'やど', exampleJp: '宿題', exampleReading: 'しゅくだい', exampleEn: 'homework' },
        { front: '業', reading: 'ぎょう', back: 'business; occupation', onyomi: 'ギョウ', exampleJp: '授業', exampleReading: 'じゅぎょう', exampleEn: 'class; lesson' },
        { front: '仕', reading: 'し', back: 'to serve; work', onyomi: 'シ', kunyomi: 'つか(える)', exampleJp: '仕事', exampleReading: 'しごと', exampleEn: 'work; job' },
        { front: '事', reading: 'こと', back: 'thing; matter', onyomi: 'ジ', kunyomi: 'こと', exampleJp: '大事', exampleReading: 'だいじ', exampleEn: 'important' },
        { front: '働', reading: 'はたら(く)', back: 'to work', onyomi: 'ドウ', kunyomi: 'はたら(く)', exampleJp: '働く', exampleReading: 'はたらく', exampleEn: 'to work' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Actions & thought',
      cards: [
        { front: '思', reading: 'おも(う)', back: 'to think', onyomi: 'シ', kunyomi: 'おも(う)', exampleJp: '思い出', exampleReading: 'おもいで', exampleEn: 'memory' },
        { front: '知', reading: 'し(る)', back: 'to know', onyomi: 'チ', kunyomi: 'し(る)', exampleJp: '知り合い', exampleReading: 'しりあい', exampleEn: 'acquaintance' },
        { front: '考', reading: 'かんが(える)', back: 'to think; to consider', onyomi: 'コウ', kunyomi: 'かんが(える)', exampleJp: '考え', exampleReading: 'かんがえ', exampleEn: 'an idea' },
        { front: '待', reading: 'ま(つ)', back: 'to wait', onyomi: 'タイ', kunyomi: 'ま(つ)', exampleJp: '待つ', exampleReading: 'まつ', exampleEn: 'to wait' },
        { front: '持', reading: 'も(つ)', back: 'to hold; to have', onyomi: 'ジ', kunyomi: 'も(つ)', exampleJp: '気持ち', exampleReading: 'きもち', exampleEn: 'feeling' },
        { front: '使', reading: 'つか(う)', back: 'to use', onyomi: 'シ', kunyomi: 'つか(う)', exampleJp: '使う', exampleReading: 'つかう', exampleEn: 'to use' },
        { front: '作', reading: 'つく(る)', back: 'to make', onyomi: 'サク, サ', kunyomi: 'つく(る)', exampleJp: '作品', exampleReading: 'さくひん', exampleEn: 'a work (of art)' },
        { front: '開', reading: 'あ(く)', back: 'to open', onyomi: 'カイ', kunyomi: 'あ(く), ひら(く)', exampleJp: '開ける', exampleReading: 'あける', exampleEn: 'to open (something)' },
        { front: '借', reading: 'か(りる)', back: 'to borrow', onyomi: 'シャク', kunyomi: 'か(りる)', exampleJp: '借りる', exampleReading: 'かりる', exampleEn: 'to borrow' },
        { front: '貸', reading: 'か(す)', back: 'to lend', onyomi: 'タイ', kunyomi: 'か(す)', exampleJp: '貸す', exampleReading: 'かす', exampleEn: 'to lend' },
        { front: '売', reading: 'う(る)', back: 'to sell', onyomi: 'バイ', kunyomi: 'う(る)', exampleJp: '売り場', exampleReading: 'うりば', exampleEn: 'sales floor' },
        { front: '写', reading: 'うつ(す)', back: 'to copy; to photograph', onyomi: 'シャ', kunyomi: 'うつ(す)', exampleJp: '写真', exampleReading: 'しゃしん', exampleEn: 'photo' },
        { front: '真', reading: 'ま', back: 'true; exact', onyomi: 'シン', kunyomi: 'ま', exampleJp: '真ん中', exampleReading: 'まんなか', exampleEn: 'the very middle' },
        { front: '起', reading: 'お(きる)', back: 'to get up; to occur', onyomi: 'キ', kunyomi: 'お(きる)', exampleJp: '起こす', exampleReading: 'おこす', exampleEn: 'to wake (someone)' },
        { front: '集', reading: 'あつ(まる)', back: 'to gather', onyomi: 'シュウ', kunyomi: 'あつ(まる), あつ(める)', exampleJp: '集める', exampleReading: 'あつめる', exampleEn: 'to collect' },
        { front: '切', reading: 'き(る)', back: 'to cut', onyomi: 'セツ', kunyomi: 'き(る)', exampleJp: '大切', exampleReading: 'たいせつ', exampleEn: 'important; precious' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Food & creatures',
      cards: [
        { front: '肉', reading: 'にく', back: 'meat', onyomi: 'ニク', exampleJp: '牛肉', exampleReading: 'ぎゅうにく', exampleEn: 'beef' },
        { front: '魚', reading: 'さかな', back: 'fish', onyomi: 'ギョ', kunyomi: 'さかな', exampleJp: '魚', exampleReading: 'さかな', exampleEn: 'fish' },
        { front: '牛', reading: 'うし', back: 'cow', onyomi: 'ギュウ', kunyomi: 'うし', exampleJp: '牛乳', exampleReading: 'ぎゅうにゅう', exampleEn: 'milk' },
        { front: '鳥', reading: 'とり', back: 'bird', onyomi: 'チョウ', kunyomi: 'とり', exampleJp: '鳥', exampleReading: 'とり', exampleEn: 'bird' },
        { front: '馬', reading: 'うま', back: 'horse', onyomi: 'バ', kunyomi: 'うま', exampleJp: '馬', exampleReading: 'うま', exampleEn: 'horse' },
        { front: '犬', reading: 'いぬ', back: 'dog', onyomi: 'ケン', kunyomi: 'いぬ', exampleJp: '犬', exampleReading: 'いぬ', exampleEn: 'dog' },
        { front: '茶', reading: 'ちゃ', back: 'tea', onyomi: 'チャ, サ', exampleJp: 'お茶', exampleReading: 'おちゃ', exampleEn: 'tea' },
        { front: '飯', reading: 'はん', back: 'meal; cooked rice', onyomi: 'ハン', kunyomi: 'めし', exampleJp: 'ご飯', exampleReading: 'ごはん', exampleEn: 'meal; rice' },
        { front: '料', reading: 'りょう', back: 'fee; materials', onyomi: 'リョウ', exampleJp: '料理', exampleReading: 'りょうり', exampleEn: 'cooking' },
        { front: '理', reading: 'り', back: 'reason; logic', onyomi: 'リ', exampleJp: '無理', exampleReading: 'むり', exampleEn: 'impossible; no way' },
        { front: '味', reading: 'あじ', back: 'flavor', onyomi: 'ミ', kunyomi: 'あじ', exampleJp: '意味', exampleReading: 'いみ', exampleEn: 'meaning' },
        { front: '品', reading: 'しな', back: 'goods; article', onyomi: 'ヒン', kunyomi: 'しな', exampleJp: '品物', exampleReading: 'しなもの', exampleEn: 'goods' },
        { front: '物', reading: 'もの', back: 'thing', onyomi: 'ブツ, モツ', kunyomi: 'もの', exampleJp: '買い物', exampleReading: 'かいもの', exampleEn: 'shopping' },
        { front: '服', reading: 'ふく', back: 'clothes', onyomi: 'フク', exampleJp: '洋服', exampleReading: 'ようふく', exampleEn: '(Western) clothes' },
        { front: '洋', reading: 'よう', back: 'ocean; Western', onyomi: 'ヨウ', exampleJp: '洋画', exampleReading: 'ようが', exampleEn: 'Western film' },
        { front: '色', reading: 'いろ', back: 'color', onyomi: 'ショク', kunyomi: 'いろ', exampleJp: '色々', exampleReading: 'いろいろ', exampleEn: 'various' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Buildings & directions',
      cards: [
        { front: '屋', reading: 'や', back: 'shop; roof', onyomi: 'オク', kunyomi: 'や', exampleJp: '部屋', exampleReading: 'へや', exampleEn: 'room' },
        { front: '堂', reading: 'どう', back: 'hall', onyomi: 'ドウ', exampleJp: '食堂', exampleReading: 'しょくどう', exampleEn: 'dining hall' },
        { front: '館', reading: 'かん', back: 'large building', onyomi: 'カン', exampleJp: '映画館', exampleReading: 'えいがかん', exampleEn: 'movie theater' },
        { front: '院', reading: 'いん', back: 'institution', onyomi: 'イン', exampleJp: '病院', exampleReading: 'びょういん', exampleEn: 'hospital' },
        { front: '銀', reading: 'ぎん', back: 'silver', onyomi: 'ギン', exampleJp: '銀行', exampleReading: 'ぎんこう', exampleEn: 'bank' },
        { front: '台', reading: 'だい', back: 'stand; counter for machines', onyomi: 'ダイ, タイ', exampleJp: '台所', exampleReading: 'だいどころ', exampleEn: 'kitchen' },
        { front: '建', reading: 'た(てる)', back: 'to build', onyomi: 'ケン', kunyomi: 'た(てる)', exampleJp: '建物', exampleReading: 'たてもの', exampleEn: 'building' },
        { front: '門', reading: 'もん', back: 'gate', onyomi: 'モン', kunyomi: 'かど', exampleJp: '門', exampleReading: 'もん', exampleEn: 'gate' },
        { front: '京', reading: 'きょう', back: 'capital', onyomi: 'キョウ, ケイ', exampleJp: '京都', exampleReading: 'きょうと', exampleEn: 'Kyoto' },
        { front: '東', reading: 'ひがし', back: 'east', onyomi: 'トウ', kunyomi: 'ひがし', exampleJp: '東京', exampleReading: 'とうきょう', exampleEn: 'Tokyo' },
        { front: '西', reading: 'にし', back: 'west', onyomi: 'セイ, サイ', kunyomi: 'にし', exampleJp: '関西', exampleReading: 'かんさい', exampleEn: 'Kansai region' },
        { front: '南', reading: 'みなみ', back: 'south', onyomi: 'ナン', kunyomi: 'みなみ', exampleJp: '南', exampleReading: 'みなみ', exampleEn: 'south' },
        { front: '北', reading: 'きた', back: 'north', onyomi: 'ホク', kunyomi: 'きた', exampleJp: '北海道', exampleReading: 'ほっかいどう', exampleEn: 'Hokkaidō' },
        { front: '方', reading: 'ほう', back: 'direction; way; person (polite)', onyomi: 'ホウ', kunyomi: 'かた', exampleJp: '夕方', exampleReading: 'ゆうがた', exampleEn: 'early evening' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Description & qualities',
      cards: [
        { front: '楽', reading: 'たの(しい)', back: 'fun; easy; music', onyomi: 'ガク, ラク', kunyomi: 'たの(しい)', exampleJp: '音楽', exampleReading: 'おんがく', exampleEn: 'music' },
        { front: '悪', reading: 'わる(い)', back: 'bad', onyomi: 'アク', kunyomi: 'わる(い)', exampleJp: '悪い', exampleReading: 'わるい', exampleEn: 'bad' },
        { front: '好', reading: 'す(き)', back: 'to like', onyomi: 'コウ', kunyomi: 'す(き), この(む)', exampleJp: '大好き', exampleReading: 'だいすき', exampleEn: 'to love; really like' },
        { front: '明', reading: 'あか(るい)', back: 'bright; clear', onyomi: 'メイ', kunyomi: 'あか(るい)', exampleJp: '説明', exampleReading: 'せつめい', exampleEn: 'explanation' },
        { front: '暗', reading: 'くら(い)', back: 'dark', onyomi: 'アン', kunyomi: 'くら(い)', exampleJp: '暗い', exampleReading: 'くらい', exampleEn: 'dark; gloomy' },
        { front: '暑', reading: 'あつ(い)', back: 'hot (weather)', onyomi: 'ショ', kunyomi: 'あつ(い)', exampleJp: '暑い', exampleReading: 'あつい', exampleEn: 'hot' },
        { front: '寒', reading: 'さむ(い)', back: 'cold (weather)', onyomi: 'カン', kunyomi: 'さむ(い)', exampleJp: '寒い', exampleReading: 'さむい', exampleEn: 'cold' },
        { front: '重', reading: 'おも(い)', back: 'heavy', onyomi: 'ジュウ', kunyomi: 'おも(い), かさ(ねる)', exampleJp: '重い', exampleReading: 'おもい', exampleEn: 'heavy' },
        { front: '軽', reading: 'かる(い)', back: 'light (weight)', onyomi: 'ケイ', kunyomi: 'かる(い)', exampleJp: '軽い', exampleReading: 'かるい', exampleEn: 'light' },
        { front: '弱', reading: 'よわ(い)', back: 'weak', onyomi: 'ジャク', kunyomi: 'よわ(い)', exampleJp: '弱い', exampleReading: 'よわい', exampleEn: 'weak' },
        { front: '太', reading: 'ふと(い)', back: 'thick; fat', onyomi: 'タイ', kunyomi: 'ふと(い), ふと(る)', exampleJp: '太る', exampleReading: 'ふとる', exampleEn: 'to gain weight' },
        { front: '青', reading: 'あお', back: 'blue', onyomi: 'セイ', kunyomi: 'あお(い)', exampleJp: '青い', exampleReading: 'あおい', exampleEn: 'blue' },
        { front: '赤', reading: 'あか', back: 'red', onyomi: 'セキ', kunyomi: 'あか(い)', exampleJp: '赤ちゃん', exampleReading: 'あかちゃん', exampleEn: 'baby' },
        { front: '黒', reading: 'くろ', back: 'black', onyomi: 'コク', kunyomi: 'くろ(い)', exampleJp: '黒い', exampleReading: 'くろい', exampleEn: 'black' },
        { front: '同', reading: 'おな(じ)', back: 'same', onyomi: 'ドウ', kunyomi: 'おな(じ)', exampleJp: '同じ', exampleReading: 'おなじ', exampleEn: 'the same' },
        { front: '別', reading: 'べつ', back: 'separate; different', onyomi: 'ベツ', kunyomi: 'わか(れる)', exampleJp: '特別', exampleReading: 'とくべつ', exampleEn: 'special' },
        { front: '特', reading: 'とく', back: 'special', onyomi: 'トク', exampleJp: '特に', exampleReading: 'とくに', exampleEn: 'especially' },
        { front: '有', reading: 'ゆう', back: 'to exist; to have', onyomi: 'ユウ', kunyomi: 'あ(る)', exampleJp: '有名', exampleReading: 'ゆうめい', exampleEn: 'famous' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Media & communication',
      cards: [
        { front: '歌', reading: 'うた', back: 'song; to sing', onyomi: 'カ', kunyomi: 'うた, うた(う)', exampleJp: '歌手', exampleReading: 'かしゅ', exampleEn: 'singer' },
        { front: '音', reading: 'おと', back: 'sound', onyomi: 'オン', kunyomi: 'おと', exampleJp: '音楽', exampleReading: 'おんがく', exampleEn: 'music' },
        { front: '映', reading: 'えい', back: 'to reflect; to project', onyomi: 'エイ', kunyomi: 'うつ(る)', exampleJp: '映画', exampleReading: 'えいが', exampleEn: 'movie' },
        { front: '画', reading: 'が', back: 'picture; stroke', onyomi: 'ガ, カク', exampleJp: '漫画', exampleReading: 'まんが', exampleEn: 'manga' },
        { front: '漢', reading: 'かん', back: 'China; man', onyomi: 'カン', exampleJp: '漢字', exampleReading: 'かんじ', exampleEn: 'kanji' },
        { front: '意', reading: 'い', back: 'mind; meaning', onyomi: 'イ', exampleJp: '意味', exampleReading: 'いみ', exampleEn: 'meaning' },
        { front: '用', reading: 'よう', back: 'use; business', onyomi: 'ヨウ', kunyomi: 'もち(いる)', exampleJp: '用事', exampleReading: 'ようじ', exampleEn: 'errand' },
        { front: '不', reading: 'ふ', back: 'not; un-', onyomi: 'フ, ブ', exampleJp: '不便', exampleReading: 'ふべん', exampleEn: 'inconvenient' },
        { front: '便', reading: 'べん', back: 'convenience; mail', onyomi: 'ベン, ビン', kunyomi: 'たよ(り)', exampleJp: '便利', exampleReading: 'べんり', exampleEn: 'convenient' },
        { front: '利', reading: 'り', back: 'advantage; profit', onyomi: 'リ', kunyomi: 'き(く)', exampleJp: '便利', exampleReading: 'べんり', exampleEn: 'convenient' },
        { front: '計', reading: 'けい', back: 'to measure; plan', onyomi: 'ケイ', kunyomi: 'はか(る)', exampleJp: '時計', exampleReading: 'とけい', exampleEn: 'clock; watch' },
        { front: '合', reading: 'あ(う)', back: 'to fit; to match', onyomi: 'ゴウ', kunyomi: 'あ(う)', exampleJp: '試合', exampleReading: 'しあい', exampleEn: 'match; game' },
        { front: '正', reading: 'ただ(しい)', back: 'correct', onyomi: 'セイ, ショウ', kunyomi: 'ただ(しい)', exampleJp: 'お正月', exampleReading: 'おしょうがつ', exampleEn: 'New Year' },
        { front: '引', reading: 'ひ(く)', back: 'to pull', onyomi: 'イン', kunyomi: 'ひ(く)', exampleJp: '引っ越し', exampleReading: 'ひっこし', exampleEn: 'moving (house)' },
        { front: '説', reading: 'せつ', back: 'to explain; theory', onyomi: 'セツ', kunyomi: 'と(く)', exampleJp: '小説', exampleReading: 'しょうせつ', exampleEn: 'novel' },
        { front: '紙', reading: 'かみ', back: 'paper', onyomi: 'シ', kunyomi: 'かみ', exampleJp: '手紙', exampleReading: 'てがみ', exampleEn: 'letter' }
      ]
    }
  ]
}

const CASUAL2_COURSE: SeedCourse = {
  title: 'Manga & VN Japanese II',
  description:
    'The second helping of dialogue Japanese: recognizing polite/honorific speech, ' +
    'rough contractions, Kansai dialect, character role-language, and the onomatopoeia ' +
    'that fills every panel.',
  level: 'N4–N3',
  difficulty: 10,
  lessons: [
    {
      kind: 'grammar',
      title: 'Keigo I — recognizing honorific speech (尊敬語)',
      body: `Butlers, shopkeepers and polite characters use 尊敬語 (respectful language) about OTHERS' actions. You mostly need to RECOGNIZE the special verbs:

・いらっしゃる → いる／行く／来る: 先生はいらっしゃいますか。
・おっしゃる → 言う: お名前は何とおっしゃいますか。
・なさる → する: どうなさいますか。
・召し上がる（めしあがる） → 食べる／飲む
・ご覧になる（ごらんになる） → 見る

Plus the pattern お + ます-stem + になる: お帰りになる = 帰る.

The store-clerk set phrase いらっしゃいませ ("welcome!") is いらっしゃる in disguise. When a character suddenly speaks like this, they're being formal, sarcastic — or they're a butler.`,
      cards: [
        { front: '先生はいらっしゃいますか。', reading: 'せんせいはいらっしゃいますか。', back: 'Is the teacher in? (honorific)' },
        { front: 'どうぞ召し上がってください。', reading: 'どうぞめしあがってください。', back: 'Please, go ahead and eat. (honorific)' },
        { front: 'お名前は何とおっしゃいますか。', reading: 'おなまえはなんとおっしゃいますか。', back: 'What is your name? (honorific)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Keigo II — humble speech (謙譲語) and です/ます upgrades',
      body: `謙譲語 (humble language) lowers the SPEAKER's own actions:

・申す（もうす） → 言う: 田中と申します。 — "My name is Tanaka."
・参る（まいる） → 行く／来る: すぐ参ります。 — "I'll be right there."
・いただく → もらう／食べる: お手紙をいただきました。
・伺う（うかがう） → 聞く／訪ねる: ちょっと伺いますが…

Pattern: お + ます-stem + する: お持ちします "I'll carry it (for you)".

Everyday upgrades you'll see constantly: します→いたします, あります→ございます, いいですか→よろしいでしょうか. ありがとうございます is ござる surviving in modern speech.`,
      cards: [
        { front: '田中と申します。', reading: 'たなかともうします。', back: 'My name is Tanaka. (humble)' },
        { front: 'すぐ参ります。', reading: 'すぐまいります。', back: "I'll be right there. (humble)" },
        { front: '少々お待ちください。', reading: 'しょうしょうおまちください。', back: 'Please wait a moment. (formal)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Rough speech: ねえ, ちゃ, and やがる',
      body: `Rough/male dialogue mangles standard forms in predictable ways:

・ない → ねえ: 知らない→知らねえ, わからない→わかんねえ, うまくない→うまくねえ. (あい／おい also flatten: すごい→すげえ, 悪い→わりい)
・ては／では → ちゃ／じゃ: 行ってはだめ→行っちゃだめ, それじゃ.
・るな→んな: 触るな→さわんな.
・やがる after the ます-stem adds contempt: 逃げやがった "the bastard ran".

Rough second-person pronouns: お前（おまえ）, てめえ, きさま — all "you", escalating in hostility. If a character says てめえ, a fight is starting.`,
      cards: [
        { front: 'そんなの知らねえよ。', reading: 'そんなのしらねえよ。', back: "How should I know?! (rough)" },
        { front: 'ここに入っちゃだめだ。', reading: 'ここにはいっちゃだめだ。', back: "You can't come in here." },
        { front: 'あいつ、逃げやがった！', reading: 'あいつ、にげやがった！', back: 'That bastard ran away!' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Kansai-ben basics',
      body: `The Osaka/Kyoto dialect is the most common non-standard speech in fiction — comedians, energetic characters, and anyone "from Osaka":

・だ → や: そうや！ (= そうだ), 好きやねん (= 好きなんだ)
・ない → へん: 分からへん (= 分からない), 行かへん (= 行かない)
・違う → ちゃう: ちゃうちゃう！ "no no, that's wrong!"
・very → めっちゃ: めっちゃうまい "super tasty"
・ほんま = 本当: ほんまに？ "really?"
・ええ = いい: ええやん "that's fine, isn't it"

Set phrases: なんでやねん！ ("what the heck!?" — the tsukkomi retort), おおきに ("thanks", shopkeeper speech).`,
      cards: [
        { front: 'そんなん知らんわ。', reading: 'そんなんしらんわ。', back: "I don't know anything about that. (Kansai)" },
        { front: 'ほんまにめっちゃうまいで！', reading: 'ほんまにめっちゃうまいで！', back: "It's seriously super tasty! (Kansai)" },
        { front: 'なんでやねん！', reading: 'なんでやねん！', back: 'What the heck!? (the classic tsukkomi)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Role language (役割語) — hearing the character type',
      body: `Fiction assigns stereotyped speech to character archetypes. Real people don't talk like this — manga characters absolutely do:

・Old man/wizard: わし (I), ～じゃ (=だ), ～のう: わしは知らんのじゃ。
・Ojōsama (refined young lady): ～ですわ, ～ますの, あら: 素敵ですわ！
・Samurai/ninja (archaic): 拙者（せっしゃ, I）, ～でござる: 拙者は忍者でござる。
・Boastful noble: ～だぞ？, フッ… plus おれさま "my great self".
・Animal mascots tack a sound on every line: ～にゃ (cats), ～だってばよ (a certain ninja).

You don't need to produce any of this — you need to stop being confused when じゃ isn't "well then" but an old man's だ.`,
      cards: [
        { front: 'わしは何も知らんのじゃ。', reading: 'わしはなにもしらんのじゃ。', back: "I don't know anything. (old-man speech)" },
        { front: 'まあ、素敵ですわ！', reading: 'まあ、すてきですわ！', back: 'My, how lovely! (ojōsama speech)' },
        { front: '拙者は忍者でござる。', reading: 'せっしゃはにんじゃでござる。', back: 'I am a ninja. (samurai speech)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'ってば・ったら・っけ — insistence and recall',
      body: `Three small endings that carry a lot of tone:

・ってば／ったら — exasperated insistence, "I SAID…": もういいってば！ "I said it's fine already!"; 待ってったら！ "I said WAIT!" Also teasing exasperation about a person: あの人ったら… "honestly, that man…"

・っけ — trying to recall something: なんだっけ？ "what was it again?"; 明日だっけ？ "it was tomorrow, right?" Attaches to plain past or だ.

Both are pure dialogue — you'll never see them in narration, and they instantly make a line sound spoken.`,
      cards: [
        { front: 'もういいってば！', reading: 'もういいってば！', back: "I SAID it's fine already!" },
        { front: 'あれ、今日って何曜日だっけ？', reading: 'あれ、きょうってなんようびだっけ？', back: 'Wait, what day is it again?' },
        { front: 'あの人ったら、また忘れたの。', reading: 'あのひとったら、またわすれたの。', back: 'Honestly, that man — he forgot again.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'かよ・かい・のか — question-particle flavors',
      body: `Beyond plain か, dialogue tunes questions with these:

・かよ — incredulous / retorting (rough): マジかよ！ "you're kidding me!"; 知らないのかよ。 "you seriously don't know?"
・かい — soft, friendly yes/no question (often older male): 元気かい？ "you doing okay?"
・のか — demanding an explanation (rough male): 行くのか？ "so you're going?"; そんなに悔しいのか。
・かな／かしら — wondering to oneself: 来るかな "will (he) come, I wonder" (かしら is feminine).

The rougher the particle, the more emotional the panel — かよ almost always comes with a sweat drop or a shout.`,
      cards: [
        { front: 'マジかよ！', reading: 'マジかよ！', back: "You're kidding me!" },
        { front: '元気かい？', reading: 'げんきかい？', back: 'You doing okay? (friendly)' },
        { front: '本当に行くのか？', reading: 'ほんとうにいくのか？', back: "You're really going? (blunt)" }
      ]
    },
    {
      kind: 'grammar',
      title: 'もん・んだもん・こと — excuse and exclamation endings',
      body: `・もん（＝もの） — childish/cute justification, "because…!": だって、眠いんだもん。 "but I'm sleepy!" Usually after んだ; the whole だって～んだもん frame is the signature of a pouting character.

・こと as a soft exclamation (feminine, refined): まあ、きれいだこと。 "my, how pretty."

・の as a plain statement ending (feminine/childlike): 知らないの。 "I don't know."

・ぞ to oneself: 変だぞ… "(something's) off…" — the internal-monologue version of ぞ.

These endings mark WHO is speaking as much as what they say — half of reading dialogue is voice identification.`,
      cards: [
        { front: 'だって、眠いんだもん。', reading: 'だって、ねむいんだもん。', back: "But I'm sleepy! (childish excuse)" },
        { front: 'まあ、きれいだこと。', reading: 'まあ、きれいだこと。', back: 'My, how pretty. (refined feminine)' },
        { front: 'なんか変だぞ…。', reading: 'なんかへんだぞ…。', back: "Something's off… (to oneself)" }
      ]
    },
    {
      kind: 'vocab',
      title: 'Onomatopoeia I — feelings & states',
      cards: [
        { front: 'ドキドキ', back: 'heart pounding (nerves, love)', pos: 'onomatopoeia' },
        { front: 'ワクワク', back: 'excited; thrilled', pos: 'onomatopoeia' },
        { front: 'イライラ', back: 'irritated', pos: 'onomatopoeia' },
        { front: 'ニコニコ', back: 'smiling warmly', pos: 'onomatopoeia' },
        { front: 'ニヤニヤ', back: 'grinning; smirking', pos: 'onomatopoeia' },
        { front: 'ハラハラ', back: 'on edge; anxious (watching something risky)', pos: 'onomatopoeia' },
        { front: 'ビクビク', back: 'timid; jumpy with fear', pos: 'onomatopoeia' },
        { front: 'ぼんやり', back: 'absent-minded; hazy', pos: 'onomatopoeia' },
        { front: 'ぐっすり', back: 'sleeping soundly', pos: 'onomatopoeia' },
        { front: 'ぺこぺこ', back: 'starving; bowing repeatedly', pos: 'onomatopoeia', notes: 'お腹がぺこぺこ = "I\'m starving".' },
        { front: 'くたくた', back: 'exhausted; worn out', pos: 'onomatopoeia' },
        { front: 'うとうと', back: 'dozing off', pos: 'onomatopoeia' },
        { front: 'ゾッとする', back: 'to shudder (with horror)', pos: 'onomatopoeia' },
        { front: 'ホッとする', back: 'to feel relieved', pos: 'onomatopoeia' },
        { front: 'ムカムカ', back: 'seething; queasy', pos: 'onomatopoeia' },
        { front: 'キラキラ', back: 'sparkling; glittering', pos: 'onomatopoeia' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Onomatopoeia II — actions & sounds',
      cards: [
        { front: 'こっそり', back: 'sneakily; in secret', pos: 'onomatopoeia' },
        { front: 'じっと', back: 'fixedly; without moving', pos: 'onomatopoeia', notes: 'じっと見る = to stare.' },
        { front: 'さっさと', back: 'quickly; without dawdling', pos: 'onomatopoeia', notes: 'さっさと行け！ = "get moving!"' },
        { front: 'ゆっくり', back: 'slowly; leisurely', pos: 'onomatopoeia' },
        { front: 'ちゃんと', back: 'properly; correctly', pos: 'onomatopoeia' },
        { front: 'しっかり', back: 'firmly; reliably', pos: 'onomatopoeia', notes: 'しっかりしろ！ = "pull yourself together!"' },
        { front: 'ばったり', back: 'running into (someone) by chance; collapsing', pos: 'onomatopoeia' },
        { front: 'ぺらぺら', back: 'fluently; flipping pages', pos: 'onomatopoeia' },
        { front: 'ガタガタ', back: 'rattling; trembling', pos: 'onomatopoeia' },
        { front: 'ドンドン', back: 'banging; (progressing) rapidly', pos: 'onomatopoeia' },
        { front: 'バタバタ', back: 'flustered rushing; flapping', pos: 'onomatopoeia' },
        { front: 'ゴロゴロ', back: 'lazing around; rumbling', pos: 'onomatopoeia', notes: '家でゴロゴロする = "laze around at home".' },
        { front: 'ボロボロ', back: 'worn out; falling apart', pos: 'onomatopoeia' },
        { front: 'ギリギリ', back: 'just barely; at the last moment', pos: 'onomatopoeia' },
        { front: 'そっと', back: 'gently; quietly', pos: 'onomatopoeia' },
        { front: 'わざと', back: 'on purpose', pos: 'adverb' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Slang & interjections II',
      cards: [
        { front: 'ちくしょう', back: 'damn it!; son of a…', pos: 'interjection' },
        { front: 'ふざけるな', back: "don't mess with me!; screw that!", pos: 'expression', notes: 'Rough: ふざけんな.' },
        { front: '勘弁して', reading: 'かんべんして', back: 'give me a break; spare me', pos: 'expression' },
        { front: 'いい加減にしろ', reading: 'いいかげんにしろ', back: 'cut it out!; enough already!', pos: 'expression' },
        { front: '相変わらず', reading: 'あいかわらず', back: 'same as always', pos: 'adverb' },
        { front: 'とりあえず', back: 'for now; first of all', pos: 'adverb' },
        { front: 'さすが', back: 'as expected (of you); impressive', pos: 'adverb' },
        { front: 'やれやれ', back: 'good grief; *sigh*', pos: 'interjection' },
        { front: 'お疲れ様', reading: 'おつかれさま', back: 'good work today (set greeting)', pos: 'expression', notes: 'Casual: おつかれ／おつ.' },
        { front: 'なるほど', back: 'I see; that makes sense', pos: 'interjection' },
        { front: 'まさか', back: 'no way; it can\'t be', pos: 'adverb' },
        { front: 'やっぱり', back: 'as I thought; after all', pos: 'adverb', notes: 'Casual: やっぱ.' },
        { front: 'ところで', back: 'by the way', pos: 'conjunction' },
        { front: '仕方がない', reading: 'しかたがない', back: "it can't be helped", pos: 'expression', notes: 'Casual: しょうがない.' },
        { front: 'お邪魔します', reading: 'おじゃまします', back: 'pardon the intrusion (entering a home)', pos: 'expression' },
        { front: 'ドンマイ', back: "don't worry about it (sports)", pos: 'interjection' }
      ]
    }
  ]
}

const N3_COURSE: SeedCourse = {
  title: 'JLPT N3 Grammar I',
  description:
    'A first pass at intermediate grammar — the patterns narration leans on once ' +
    'dialogue stops being the hard part. Do this after the N4 courses.',
  level: 'N3',
  difficulty: 11,
  lessons: [
    {
      kind: 'grammar',
      title: '～ところ — about to / in the middle of / just did',
      body: `ところ ("place/point") after a verb pins down WHERE in the action you are — the tense of the verb before it does all the work:

・dictionary + ところ: about to do — 今から食べるところだ。 "I'm just about to eat."
・ている + ところ: in the middle of — 今食べているところだ。 "I'm eating right now."
・た + ところ: just did — 今食べたところだ。 "I just ate."

Common in excuses on the phone: 今、出るところ！ "I'm just leaving!"

Compare たばかり (next lesson) — たところ is "at this very moment"; たばかり stretches to "recently".`,
      cards: [
        { front: '今から食べるところだ。', reading: 'いまからたべるところだ。', back: "I'm just about to eat." },
        { front: '今、宿題をしているところ。', reading: 'いま、しゅくだいをしているところ。', back: "I'm in the middle of homework right now." },
        { front: '駅に着いたところです。', reading: 'えきについたところです。', back: 'I just arrived at the station.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ばかり — just did / nothing but',
      body: `Two main jobs:

1. た + ばかり — "just did (recently)": 日本に来たばかりです。 "I just came to Japan." Looser than たところ — can be days or weeks if it FEELS recent.

2. て + ばかりいる — "does nothing but": 弟はゲームをしてばかりいる。 "My brother does nothing but game." Reproachful tone.

Also noun + ばかり "nothing but N": 肉ばかり食べる "eat nothing but meat".

In dialogue you'll meet the casual variant ばっか(り): 嘘ばっか！ "nothing but lies!"`,
      cards: [
        { front: '日本に来たばかりです。', reading: 'にほんにきたばかりです。', back: 'I just came to Japan (recently).' },
        { front: '弟はゲームをしてばかりいる。', reading: 'おとうとはゲームをしてばかりいる。', back: 'My brother does nothing but play games.' },
        { front: '嘘ばっかり！', reading: 'うそばっかり！', back: 'Nothing but lies!' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ば～ほど — the more, the more',
      body: `Repeat the verb/adjective in ば-form then plain form, add ほど:

・考えれば考えるほど、分からなくなる。 — "The more I think, the less I understand."
・安ければ安いほどいい。 — "The cheaper, the better."

な-adjectives: 静かなら静かなほど. Nouns work with であればあるほど (rare in dialogue).

Shortcut without repetition: plain + ほど also compares degree: 泣きたいほど嬉しい "so happy I could cry".`,
      cards: [
        { front: '考えれば考えるほど、分からなくなる。', reading: 'かんがえればかんがえるほど、わからなくなる。', back: 'The more I think about it, the less I understand.' },
        { front: '安ければ安いほどいい。', reading: 'やすければやすいほどいい。', back: 'The cheaper, the better.' },
        { front: '泣きたいほど嬉しい。', reading: 'なきたいほどうれしい。', back: 'So happy I could cry.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～うちに — while it lasts / before it changes',
      body: `うちに marks a window of opportunity: do it WHILE the state holds, because it won't.

・温かいうちに食べて。 — "Eat it while it's warm."
・明るいうちに帰ろう。 — "Let's go home while it's light."

With a NEGATIVE verb it means "before X happens":
・忘れないうちにメモする。 — "note it before I forget"
・雨が降らないうちに出よう。 — "let's leave before it rains"

Different from 間に: 間に is a neutral time span; うちに carries urgency — the window is closing.`,
      cards: [
        { front: '温かいうちに食べてください。', reading: 'あたたかいうちにたべてください。', back: "Please eat it while it's warm." },
        { front: '忘れないうちにメモしよう。', reading: 'わすれないうちにメモしよう。', back: 'Let me note it down before I forget.' },
        { front: '若いうちに色々な国へ行きたい。', reading: 'わかいうちにいろいろなくにへいきたい。', back: "I want to visit many countries while I'm young." }
      ]
    },
    {
      kind: 'grammar',
      title: '～間・～間に — during',
      body: `間（あいだ） is a time span. The に decides the shape of the action:

・間 (no に) — the action FILLS the whole span: 夏休みの間、田舎にいた。 "I was in the countryside all summer."
・間に — something happens AT A POINT inside the span: 夏休みの間に本を三冊読んだ。 "During summer break I read three books."; 留守の間に泥棒が入った。 "A burglar got in while (we) were out."

Attach to nouns with の, to verbs in ている form: 寝ている間に "while (I) was sleeping".`,
      cards: [
        { front: '夏休みの間、田舎にいた。', reading: 'なつやすみのあいだ、いなかにいた。', back: 'I was in the countryside throughout summer break.' },
        { front: '寝ている間に、雪が降った。', reading: 'ねているあいだに、ゆきがふった。', back: 'It snowed while I was sleeping.' },
        { front: '留守の間に泥棒が入った。', reading: 'るすのあいだにどろぼうがはいった。', back: 'A burglar broke in while we were out.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～たびに — every time',
      body: `Dictionary form (or Nの) + たびに — "every time X, Y":

・この曲を聞くたびに、あの夏を思い出す。 — "Every time I hear this song, I remember that summer."
・会うたびに大きくなってるね。 — "You're bigger every time I see you."

Nの form: 旅行のたびに "every time (I) travel".

Implies Y reliably accompanies X — often nostalgia or exasperation. For a plain conditional habit, と does the job; たびに adds the "each and every occasion" feel.`,
      cards: [
        { front: 'この曲を聞くたびに、昔を思い出す。', reading: 'このきょくをきくたびに、むかしをおもいだす。', back: 'Every time I hear this song, I remember the old days.' },
        { front: '会うたびに大きくなってるね。', reading: 'あうたびにおおきくなってるね。', back: "You're bigger every time I see you!" },
        { front: '旅行のたびにお土産を買う。', reading: 'りょこうのたびにおみやげをかう。', back: 'I buy souvenirs every time I travel.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～によると・～によって — according to / depending on',
      body: `Same に+よる, three distinct readings — context and the following clause decide:

・によると + hearsay そうだ/らしい — source of info: 天気予報によると、明日は雨だそうだ。 "According to the forecast, rain tomorrow."
・によって — depends on: 人によって考え方が違う。 "Ways of thinking differ by person."
・によって — by means of / caused by (written style): 地震によって家が壊れた。 "Houses were destroyed by the earthquake."

For reading, によると almost always signals "the narrator is citing something" — expect a そうだ at the end of the sentence.`,
      cards: [
        { front: '天気予報によると、明日は雨だそうだ。', reading: 'てんきよほうによると、あしたはあめだそうだ。', back: 'According to the forecast, it will rain tomorrow.' },
        { front: '人によって考え方が違う。', reading: 'ひとによってかんがえかたがちがう。', back: 'Ways of thinking differ from person to person.' },
        { front: '場合によっては中止になる。', reading: 'ばあいによってはちゅうしになる。', back: 'Depending on circumstances, it may be canceled.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'The わけ family — わけだ・わけがない・わけではない',
      body: `わけ ("reasoning/conclusion") builds three high-frequency patterns:

・わけだ — "so that means / no wonder": 道理で寒いわけだ。窓が開いてる。 "No wonder it's cold — the window's open."
・わけがない — "there's no way": 彼が犯人のわけがない。 "There's no way he's the culprit." (≒はずがない, slightly more emotional)
・わけではない — partial denial, "it's not that…": 嫌いなわけではない。 "It's not that I dislike it."

Dialogue clip: わけない (there's no way) and そういうわけで ("and that's why…") as a scene-opening recap.`,
      cards: [
        { front: '道理で寒いわけだ。', reading: 'どうりでさむいわけだ。', back: "No wonder it's cold." },
        { front: '彼が犯人のわけがない。', reading: 'かれがはんにんのわけがない。', back: "There's no way he's the culprit." },
        { front: '嫌いなわけではない。', reading: 'きらいなわけではない。', back: "It's not that I dislike it." }
      ]
    },
    {
      kind: 'grammar',
      title: '～べき — should (obligation/judgment)',
      body: `Dictionary form + べき(だ) — "should / ought to", a statement of what's RIGHT (stronger and more judgmental than ほうがいい):

・約束は守るべきだ。 — "Promises should be kept."
・する → するべき or すべき (both fine; すべき is tighter/written)

Negative judges the action itself: 行くべきではない "shouldn't go".
Past = regret: 言うべきだった "I should have said it".

Contrast:
・ほうがいい — friendly advice
・べきだ — moral/duty judgment
・はずだ — expectation (not obligation at all)`,
      cards: [
        { front: '約束は守るべきだ。', reading: 'やくそくはまもるべきだ。', back: 'Promises should be kept.' },
        { front: '君は医者に行くべきだよ。', reading: 'きみはいしゃにいくべきだよ。', back: 'You really should see a doctor.' },
        { front: 'もっと早く言うべきだった。', reading: 'もっとはやくいうべきだった。', back: 'I should have said it sooner.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～っぽい — -ish',
      body: `っぽい glues onto nouns, verb stems and adjective stems to make a casual "-ish/-like" い-adjective:

・子供っぽい — childish (negative nuance; compare 子供らしい "childlike, as a child should be")
・忘れっぽい — forgetful (prone to)
・安っぽい — cheap-looking
・白っぽい — whitish

It conjugates as an い-adjective: 子供っぽくない, 子供っぽかった.

らしい vs っぽい in one line: 男らしい praises manliness in a man; 男っぽい describes someone (often not a man) seeming masculine.`,
      cards: [
        { front: 'その言い方は子供っぽいよ。', reading: 'そのいいかたはこどもっぽいよ。', back: 'That way of talking is childish.' },
        { front: '最近、忘れっぽくなった。', reading: 'さいきん、わすれっぽくなった。', back: "I've gotten forgetful lately." },
        { front: 'この服、安っぽく見える？', reading: 'このふく、やすっぽくみえる？', back: 'Does this outfit look cheap?' }
      ]
    },
    {
      kind: 'grammar',
      title: '～がる・～たがる — third-person feelings',
      body: `Japanese avoids stating others' inner feelings directly — 彼は嬉しい is odd. がる converts a feeling into observable behavior:

・adjective stem + がる — "shows signs of": 怖がる "act scared", 嫌がる "show reluctance", 恥ずかしがる "be shy about".
・たい → たがる for third-person desires: 妹は犬を飼いたがっている。 "My sister wants a dog (visibly)."

Usually in ている form for a current state: 会いたがっている "(he) wants to meet (you)".

Noun form: 怖がり "a scaredy-cat", 寂しがり屋 "someone who gets lonely easily" — common character labels.`,
      cards: [
        { front: '妹は犬を飼いたがっている。', reading: 'いもうとはいぬをかいたがっている。', back: 'My little sister wants to get a dog.' },
        { front: '弟は注射を怖がっている。', reading: 'おとうとはちゅうしゃをこわがっている。', back: 'My little brother is scared of the shot.' },
        { front: '彼は寂しがり屋だ。', reading: 'かれはさびしがりやだ。', back: 'He gets lonely easily.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ようになる・～なくなる — change over time',
      body: `なる turns states into TRANSITIONS; with verbs it needs よう:

・dictionary/potential + ようになる — came to / became able: 日本語が読めるようになった。 "I've become able to read Japanese." (the learner's favorite sentence)
・ない + なくなる — stopped / no longer: 漢字が怖くなくなった。 "Kanji stopped being scary."
・する side: ようにする — "make a point of": 毎日単語を覚えるようにしている。 "I make it a habit to learn words daily."

The pair ようになる (change happens) vs ようにする (you push the change) mirrors ことになる/ことにする from N4.`,
      cards: [
        { front: '日本語が読めるようになった。', reading: 'にほんごがよめるようになった。', back: "I've become able to read Japanese." },
        { front: '彼は最近、話さなくなった。', reading: 'かれはさいきん、はなさなくなった。', back: 'He stopped talking (to us) recently.' },
        { front: '毎日復習するようにしている。', reading: 'まいにちふくしゅうするようにしている。', back: 'I make it a habit to review every day.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～かどうか — whether or not',
      body: `Embeds a yes/no question inside a sentence:

行くかどうか、まだ決めていない。 — "I haven't decided whether to go or not."

With a question word, plain か alone does it:
何を買うか、考えている。 — "I'm thinking about what to buy."
誰が来るか分からない。 — "No idea who's coming."

The embedded clause stays PLAIN even in a polite sentence: 来るかどうか分かりません (not 来ますかどうか).

Reading payoff: long narration sentences constantly nest questions this way — spotting the …か／かどうか + 分からない/決める/聞く frame untangles them.`,
      cards: [
        { front: '行くかどうか、まだ決めていない。', reading: 'いくかどうか、まだきめていない。', back: "I haven't decided whether to go or not." },
        { front: '本当かどうか分からない。', reading: 'ほんとうかどうかわからない。', back: "I don't know if it's true or not." },
        { front: '誰が来るか知っていますか。', reading: 'だれがくるかしっていますか。', back: 'Do you know who is coming?' }
      ]
    },
    {
      kind: 'grammar',
      title: '～しかない・～だけ — only',
      body: `Two "only"s with opposite grammar:

・だけ — plain "only", normal affirmative sentence: 千円だけある。 "I have just 1,000 yen."
・しか — always with a NEGATIVE verb, and feels insufficient: 千円しかない。 "I've got ONLY 1,000 yen (not enough)."

Verb + しかない — "no choice but to": 歩くしかない。 "Nothing for it but to walk."

やるしかない！ — "we just have to do it!" — the pre-battle line of every shōnen protagonist.`,
      cards: [
        { front: '千円しかない。', reading: 'せんえんしかない。', back: "I've only got 1,000 yen (not enough)." },
        { front: 'もう、やるしかない！', reading: 'もう、やるしかない！', back: 'There\'s no choice — we just have to do it!' },
        { front: '見ているだけでいい。', reading: 'みているだけでいい。', back: 'Just watching is enough for me.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'いくら～ても — no matter how much',
      body: `ても ("even if") scaled up with a question word:

・いくら＋ても: いくら食べても太らない。 "No matter how much I eat, I don't gain weight."
・どんなに＋ても: どんなに頑張っても勝てない。 "No matter how hard I try, I can't win."
・何回/誰/どこ + ても: 何回聞いても忘れる。 "However many times I hear it, I forget."

Formation: て-form + も (adjectives: 高くても; nouns/な-adj: 雨でも, 大変でも).

Plain ても alone = "even if": 雨が降っても行く。 "I'll go even if it rains."`,
      cards: [
        { front: 'いくら食べても太らない。', reading: 'いくらたべてもふとらない。', back: "No matter how much I eat, I don't gain weight." },
        { front: 'どんなに頑張っても勝てない。', reading: 'どんなにがんばってもかてない。', back: "No matter how hard I try, I can't win." },
        { front: '雨が降っても行くよ。', reading: 'あめがふってもいくよ。', back: "I'm going even if it rains." }
      ]
    },
    {
      kind: 'grammar',
      title: '～させてもらう・～させてください — causative + favors',
      body: `Causative + the giving/receiving verbs = asking for or taking permission, extremely common in dialogue:

・させてください — "please let me": 説明させてください。 "Let me explain."
・させてもらう — "get to do (with permission)": 休ませてもらった。 "They let me take the day off."
・させていただきます — the super-polite business version: 本日は休業させていただきます。 "We are (humbly) closed today."

Rough/confident: やらせてもらうぜ "I'll be taking this on" — permission phrasing used rhetorically.

Recognition beats production here: parse させて + くれ/もらう/ください as one "let me/them" unit.`,
      cards: [
        { front: 'ちょっと説明させてください。', reading: 'ちょっとせつめいさせてください。', back: 'Please let me explain.' },
        { front: '今日は早く帰らせてもらった。', reading: 'きょうははやくかえらせてもらった。', back: 'They let me go home early today.' },
        { front: '一人にさせてくれ。', reading: 'ひとりにさせてくれ。', back: 'Let me be alone. (rough)' }
      ]
    }
  ]
}

const N3B_COURSE: SeedCourse = {
  title: 'JLPT N3 Grammar II',
  description:
    'The second half of the core N3 patterns — contrast, cause, blame and the ' +
    'connective tissue of narration. Finishing this makes most seinen manga readable.',
  level: 'N3',
  difficulty: 12,
  lessons: [
    {
      kind: 'grammar',
      title: '～ずに — without doing',
      body: `ない-stem + ずに = "without doing" — the literary sibling of ないで:

朝ご飯を食べずに家を出た。 — "I left without eating breakfast."

Only irregular: する → せずに (NOT しずに): 何もせずに待っていた。

Narration prefers ずに; dialogue prefers ないで. VNs will hand you both in the same scene, so read them as the same thing. The bare ず appears mid-sentence in formal writing: 知らず知らずのうちに "without even realizing".`,
      cards: [
        { front: '朝ご飯を食べずに家を出た。', reading: 'あさごはんをたべずにいえをでた。', back: 'I left home without eating breakfast.' },
        { front: '何もせずに待っていた。', reading: 'なにもせずにまっていた。', back: 'I waited without doing anything.' },
        { front: '諦めずに頑張ろう。', reading: 'あきらめずにがんばろう。', back: "Let's keep at it without giving up." }
      ]
    },
    {
      kind: 'grammar',
      title: '～まま — as it is / leaving it that way',
      body: `まま freezes a state while something else happens:

・た-form + まま: 電気をつけたまま寝た。 — "fell asleep with the light on"
・ない + まま: 何も言わないまま帰った。 — "left without ever saying anything"
・noun + の + まま: 昔のままだ。 — "it's just like it used to be"
・demonstratives: このまま "like this", そのまま "as is".

このままじゃだめだ！ — "it can't go on like this!" — a stock dialogue line worth recognizing instantly.`,
      cards: [
        { front: '電気をつけたまま寝てしまった。', reading: 'でんきをつけたままねてしまった。', back: 'I fell asleep with the light on.' },
        { front: 'この町は昔のままだ。', reading: 'このまちはむかしのままだ。', back: 'This town is just as it used to be.' },
        { front: 'このままじゃだめだ！', reading: 'このままじゃだめだ！', back: "It can't go on like this!" }
      ]
    },
    {
      kind: 'grammar',
      title: '～だけでなく～も — not only… but also',
      body: `X だけでなく Y も — "not only X but Y too":

彼は英語だけでなく、日本語も話せる。 — "He speaks not only English but Japanese too."

Formal variants you'll read: ばかりでなく, のみならず (stiff/written). The Y clause usually carries も or まで.

With clauses, plain form + だけでなく: 安いだけでなく、美味しい。 "Not only cheap — it's good."`,
      cards: [
        { front: '彼は英語だけでなく、日本語も話せる。', reading: 'かれはえいごだけでなく、にほんごもはなせる。', back: 'He speaks not only English but also Japanese.' },
        { front: 'この店は安いだけでなく、美味しい。', reading: 'このみせはやすいだけでなく、おいしい。', back: 'This place is not only cheap but tasty.' },
        { front: '子供だけでなく、大人も楽しめる。', reading: 'こどもだけでなく、おとなもたのしめる。', back: 'Adults can enjoy it too, not just kids.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～はもちろん — not to mention',
      body: `X はもちろん Y (も) — "X goes without saying, and Y as well":

漢字はもちろん、カタカナも読めない。 — "He can't read katakana, let alone kanji."
平日はもちろん、週末も働いている。 — "Weekends too, never mind weekdays."

もちろん alone is the everyday "of course!" reply. The pattern version just extends that: "X — obviously — and also Y".`,
      cards: [
        { front: '平日はもちろん、週末も働いている。', reading: 'へいじつはもちろん、しゅうまつもはたらいている。', back: 'I work weekends too, not to mention weekdays.' },
        { front: 'ひらがなはもちろん、漢字も書ける。', reading: 'ひらがなはもちろん、かんじもかける。', back: 'She can write kanji, never mind hiragana.' },
        { front: 'もちろん、行くよ。', reading: 'もちろん、いくよ。', back: "Of course I'm going." }
      ]
    },
    {
      kind: 'grammar',
      title: '～に対して — toward / in contrast to',
      body: `Noun + に対して has two lives:

1. Target of attitude/action ("toward"): 客に対して失礼だ。 — "rude toward customers"; 質問に対して答える "answer to the question".

2. Contrast ("whereas"): 兄が静かなのに対して、弟はうるさい。 — "The older brother is quiet, whereas the younger is loud."

The noun-modifying form is に対する: 彼に対する気持ち "feelings toward him" — a phrase you will meet in every romance VN.`,
      cards: [
        { front: '目上の人に対して失礼だよ。', reading: 'めうえのひとにたいしてしつれいだよ。', back: "That's rude toward your seniors." },
        { front: '兄が静かなのに対して、弟はうるさい。', reading: 'あにがしずかなのにたいして、おとうとはうるさい。', back: 'The older brother is quiet, whereas the younger one is loud.' },
        { front: '彼に対する気持ちが分からない。', reading: 'かれにたいするきもちがわからない。', back: "I don't understand my feelings toward him." }
      ]
    },
    {
      kind: 'grammar',
      title: '～について・～に関して — about / regarding',
      body: `Both mark a topic of discussion:

・について — everyday "about": 日本の歴史について話す。 "talk about Japanese history"
・に関して（かんして） — the stiffer, written "regarding": この件に関しては後で説明する。

Noun-modifying forms: についての／に関する + noun: 事件に関する情報 "information regarding the incident" — standard mystery-VN phrasing.

Don't confuse について with につれて ("as… progresses", an N2 pattern) — same に+verb shape, unrelated meaning.`,
      cards: [
        { front: '日本の歴史について話しましょう。', reading: 'にほんのれきしについてはなしましょう。', back: "Let's talk about Japanese history." },
        { front: 'その件に関しては、後で説明する。', reading: 'そのけんにかんしては、あとでせつめいする。', back: "Regarding that matter, I'll explain later." },
        { front: '事件に関する情報を集めている。', reading: 'じけんにかんするじょうほうをあつめている。', back: "I'm gathering information about the incident." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ため(に) — because of (cause)',
      body: `You met ために as PURPOSE (N4). Its second reading is CAUSE — and tense tells them apart:

・purpose: dictionary form + ために (action you intend)
・cause: past/adjective/noun-の + ため(に): 事故のため、電車が遅れています。 — "Trains are delayed due to an accident."

台風が来たため、学校が休みになった。 — "School was canceled because a typhoon came."

This is announcement/narration language — station loudspeakers, news captions, and the omniscient VN narrator all lean on ため.`,
      cards: [
        { front: '事故のため、電車が遅れています。', reading: 'じこのため、でんしゃがおくれています。', back: 'Trains are delayed due to an accident.' },
        { front: '台風のため、学校が休みになった。', reading: 'たいふうのため、がっこうがやすみになった。', back: 'School was canceled because of the typhoon.' },
        { front: '雨のため、試合は中止です。', reading: 'あめのため、しあいはちゅうしです。', back: 'The match is canceled due to rain.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～せいで・～おかげで — blame and credit',
      body: `Both mean "because of", but with opposite feelings:

・せいで — blame (bad result): お前のせいで負けた！ "We lost because of you!"; 寝不足のせいで頭が痛い.
・おかげで — gratitude (good result): 先生のおかげで合格した。 "I passed thanks to my teacher."

Attach with の to nouns, plain form to clauses. せいにする = "pin the blame on": 人のせいにするな。 "Don't blame others."

Sarcastic おかげで exists too: おかげでひどい目にあったよ "thanks to that, I had a terrible time" — tone decides.`,
      cards: [
        { front: 'お前のせいで負けたんだぞ！', reading: 'おまえのせいでまけたんだぞ！', back: 'We lost because of you!' },
        { front: '先生のおかげで合格しました。', reading: 'せんせいのおかげでごうかくしました。', back: 'I passed thanks to my teacher.' },
        { front: '人のせいにするなよ。', reading: 'ひとのせいにするなよ。', back: "Don't blame it on others." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ふりをする — pretending',
      body: `Plain form / noun-の + ふりをする — "pretend to":

寝ているふりをした。 — "I pretended to be asleep."
聞こえないふりをするな。 — "Don't pretend you can't hear me."
知らないふり = feigning ignorance; 平気なふり = acting like you're fine.

The noun ふり alone shows up in 見て見ぬふり "turning a blind eye" (seeing but pretending not to see) — a set phrase worth memorizing whole.`,
      cards: [
        { front: '寝ているふりをした。', reading: 'ねているふりをした。', back: 'I pretended to be asleep.' },
        { front: '聞こえないふりをするな。', reading: 'きこえないふりをするな。', back: "Don't pretend you can't hear me." },
        { front: '彼女は平気なふりをしている。', reading: 'かのじょはへいきなふりをしている。', back: "She's acting like she's fine." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ということ — the fact that…',
      body: `という + こと wraps a whole clause into a noun — how Japanese embeds statements:

彼が犯人だということが分かった。 — "It became clear that he is the culprit."

Set frames built on it:
・～ということだ — "that means / I hear that": 中止ということだ "word is it's canceled"
・～ということは — "so that means…?": ということは、君も見たのか。
・どういうこと？ — "what's that supposed to mean?!" — top-ten manga line.

When a sentence feels endless, find ということ and read everything before it as one boxed-up noun.`,
      cards: [
        { front: '彼が犯人だということが分かった。', reading: 'かれがはんにんだということがわかった。', back: 'It became clear that he is the culprit.' },
        { front: 'ということは、君も見たのか。', reading: 'ということは、きみもみたのか。', back: 'So that means you saw it too?' },
        { front: 'どういうことだよ！', reading: 'どういうことだよ！', back: "What's that supposed to mean?!" }
      ]
    },
    {
      kind: 'grammar',
      title: '～場合（は） — in the case of',
      body: `場合（ばあい） is the formal "if/when the situation arises":

雨の場合は中止です。 — "In case of rain, it's canceled."
遅れる場合は連絡してください。 — "If you're going to be late, contact us."

Attach: noun + の場合, plain verb + 場合 (both tenses fine: 見つけた場合 "in the event you find it").

Cousin phrase: 場合によっては "depending on circumstances". Rules, announcements and tutorial text (game menus!) are full of 場合.`,
      cards: [
        { front: '雨の場合は中止です。', reading: 'あめのばあいはちゅうしです。', back: 'In case of rain, it will be canceled.' },
        { front: '遅れる場合は連絡してください。', reading: 'おくれるばあいはれんらくしてください。', back: "Please contact us if you'll be late." },
        { front: '見つけた場合はどうすればいい？', reading: 'みつけたばあいはどうすればいい？', back: 'What should I do if I find it?' }
      ]
    },
    {
      kind: 'grammar',
      title: 'たとえ～ても — even if (hypothetically)',
      body: `たとえ announces up front that the coming ても is hypothetical — it braces the sentence:

たとえ雨が降っても、行く。 — "Even if it rains, I'm going."
たとえ冗談でも、言っていいことと悪いことがある。 — "Even as a joke, some things shouldn't be said."

The combo pattern to burn in: たとえ + て-form + も. Dramatic dialogue loves it: たとえ世界が敵になっても… "even if the world becomes my enemy…" — yes, someone says this in every other shōnen.`,
      cards: [
        { front: 'たとえ雨が降っても、行くよ。', reading: 'たとえあめがふっても、いくよ。', back: "Even if it rains, I'm going." },
        { front: 'たとえ冗談でも、それは言うな。', reading: 'たとえじょうだんでも、それはいうな。', back: "Even as a joke, don't say that." },
        { front: 'たとえ世界が敵になっても、守る。', reading: 'たとえせかいがてきになっても、まもる。', back: "Even if the world turns against us, I'll protect you." }
      ]
    },
    {
      kind: 'grammar',
      title: '～わりに(は) — considering',
      body: `X わりに Y — "Y, considering X" (the two don't match expectations):

値段のわりに美味しい。 — "Tasty for the price."
彼は年のわりに若く見える。 — "He looks young for his age."
勉強しなかったわりには、よくできた。 — "Did pretty well considering I didn't study."

Attach: noun + の, plain forms directly. Cousin: にしては ("for a…"): 初めてにしては上手だ "good for a first try" — にしては takes specific facts, わりに takes general qualities.`,
      cards: [
        { front: 'この店は値段のわりに美味しい。', reading: 'このみせはねだんのわりにおいしい。', back: 'This place is tasty for the price.' },
        { front: '彼は年のわりに若く見える。', reading: 'かれはとしのわりにわかくみえる。', back: 'He looks young for his age.' },
        { front: '初めてにしては上手だね。', reading: 'はじめてにしてはじょうずだね。', back: "You're good, for a first-timer." }
      ]
    },
    {
      kind: 'grammar',
      title: '～くせに — even though (accusing)',
      body: `くせに is のに with a sneer — "even though / and yet", aimed AT someone:

知ってるくせに、教えてくれない。 — "You KNOW, and you still won't tell me."
子供のくせに生意気だ。 — "Cheeky, for a kid."

Attach: plain form; noun + の; な-adj + な. Only about people, always disapproving or teasing.

Trailing off with it is a tsundere trademark: 何よ、心配したくせに…。 "What, and here you were all worried…" Reading VNs without knowing くせに means missing half the flirting.`,
      cards: [
        { front: '知ってるくせに、教えてくれない。', reading: 'しってるくせに、おしえてくれない。', back: "You know, and yet you won't tell me." },
        { front: '子供のくせに生意気だ。', reading: 'こどものくせになまいきだ。', back: 'Cheeky, for a kid.' },
        { front: '心配したくせに…。', reading: 'しんぱいしたくせに…。', back: 'Even though you were worried about me… (teasing)' }
      ]
    },
    {
      kind: 'grammar',
      title: '～っぱなし — left running / kept on',
      body: `ます-stem + っぱなし — something started and never dealt with:

・neglect: 水を出しっぱなしにするな。 "Don't leave the water running." テレビつけっぱなし, 窓開けっぱなし.
・continuous state (often tiring): 一日中立ちっぱなしだった。 "I was on my feet all day." 負けっぱなし "on a losing streak".

Grammatically a noun: takes だ/の/にする. The casual cousin of てある/ておく gone wrong — てある is deliberate, っぱなし is sloppy.`,
      cards: [
        { front: '水を出しっぱなしにしないで。', reading: 'みずをだしっぱなしにしないで。', back: "Don't leave the water running." },
        { front: '今日は一日中立ちっぱなしだった。', reading: 'きょうはいちにちじゅうたちっぱなしだった。', back: 'I was on my feet all day today.' },
        { front: 'うちのチームは負けっぱなしだ。', reading: 'うちのチームはまけっぱなしだ。', back: "Our team just keeps losing." }
      ]
    },
    {
      kind: 'grammar',
      title: '～とおり(に) — just as / the way',
      body: `とおり ("way/route") after a clause or noun = "exactly as":

・plain verb + とおり(に): 私が言うとおりにやって。 "Do it the way I say."
・past for things already stated: 思ったとおりだ。 "Just as I thought."
・noun + の + とおり／noun + どおり (rendaku): 予定どおり "on schedule", 説明書のとおり "as the manual says".

思ったとおり and やっぱり are the twin "called it!" expressions — expect them at every plot reveal.`,
      cards: [
        { front: '私が言うとおりにやってみて。', reading: 'わたしがいうとおりにやってみて。', back: 'Try doing it just the way I say.' },
        { front: '思ったとおりだ。', reading: 'おもったとおりだ。', back: 'Just as I thought.' },
        { front: '作戦は予定どおりに進んでいる。', reading: 'さくせんはよていどおりにすすんでいる。', back: 'The operation is going according to plan.' }
      ]
    }
  ]
}

const N3_VOCAB_COURSE: SeedCourse = {
  title: 'JLPT N3 Vocabulary',
  description:
    'Core intermediate words — feelings, judgment, society and the abstract nouns ' +
    'narration runs on. From here on, most new vocabulary should come from what you ' +
    'read (mine it!); this deck covers the unavoidable core.',
  level: 'N3',
  difficulty: 13,
  lessons: [
    {
      kind: 'vocab',
      title: 'Emotions & the heart',
      cards: [
        { front: '不安', reading: 'ふあん', back: 'anxiety; unease', pos: 'na-adjective/noun' },
        { front: '我慢', reading: 'がまん', back: 'endurance; putting up with it', pos: 'noun', notes: '我慢できない = "I can\'t stand it".' },
        { front: '緊張', reading: 'きんちょう', back: 'nervousness; tension', pos: 'noun' },
        { front: '感動', reading: 'かんどう', back: 'being (deeply) moved', pos: 'noun' },
        { front: '期待', reading: 'きたい', back: 'expectation; hope', pos: 'noun' },
        { front: '後悔', reading: 'こうかい', back: 'regret', pos: 'noun' },
        { front: '恋', reading: 'こい', back: 'romantic love', pos: 'noun' },
        { front: '憧れる', reading: 'あこがれる', back: 'to yearn for; to look up to', pos: 'verb (ru)' },
        { front: '羨ましい', reading: 'うらやましい', back: 'envious; "I\'m jealous"', pos: 'i-adjective' },
        { front: '悔しい', reading: 'くやしい', back: 'frustrating; vexing', pos: 'i-adjective', notes: 'The post-defeat word in every sports manga.' },
        { front: '落ち込む', reading: 'おちこむ', back: 'to feel down', pos: 'verb (u)' },
        { front: '照れる', reading: 'てれる', back: 'to be bashful', pos: 'verb (ru)' },
        { front: '甘える', reading: 'あまえる', back: 'to act spoiled; to depend on someone\'s kindness', pos: 'verb (ru)' },
        { front: '気になる', reading: 'きになる', back: 'to weigh on one\'s mind; to be curious about', pos: 'expression' },
        { front: '気に入る', reading: 'きにいる', back: 'to take a liking to', pos: 'expression' },
        { front: 'ほっとする', back: 'to feel relieved', pos: 'expression' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Verbs IV — trust, choice, change',
      cards: [
        { front: '気づく', reading: 'きづく', back: 'to notice; to realize', pos: 'verb (u)' },
        { front: '諦める', reading: 'あきらめる', back: 'to give up', pos: 'verb (ru)' },
        { front: '信じる', reading: 'しんじる', back: 'to believe; to trust', pos: 'verb (ru)' },
        { front: '疑う', reading: 'うたがう', back: 'to doubt; to suspect', pos: 'verb (u)' },
        { front: '断る', reading: 'ことわる', back: 'to refuse; to decline', pos: 'verb (u)' },
        { front: '頼む', reading: 'たのむ', back: 'to request; to rely on', pos: 'verb (u)', notes: '頼む！ alone = "please, I\'m begging you!"' },
        { front: '助ける', reading: 'たすける', back: 'to save; to help', pos: 'verb (ru)' },
        { front: '守る', reading: 'まもる', back: 'to protect; to keep (a promise)', pos: 'verb (u)' },
        { front: '育てる', reading: 'そだてる', back: 'to raise; to bring up', pos: 'verb (ru)' },
        { front: '増える', reading: 'ふえる', back: 'to increase', pos: 'verb (ru)' },
        { front: '減る', reading: 'へる', back: 'to decrease', pos: 'verb (u)', notes: 'お腹が減った = "I\'m hungry" (casual).' },
        { front: '進む', reading: 'すすむ', back: 'to advance; to progress', pos: 'verb (u)' },
        { front: '戻る', reading: 'もどる', back: 'to return; to go back', pos: 'verb (u)' },
        { front: '渡す', reading: 'わたす', back: 'to hand over', pos: 'verb (u)' },
        { front: '拾う', reading: 'ひろう', back: 'to pick up (off the ground)', pos: 'verb (u)' },
        { front: '隠す', reading: 'かくす', back: 'to hide (something)', pos: 'verb (u)', notes: '隠れる = to hide (oneself).' }
      ]
    },
    {
      kind: 'vocab',
      title: 'School, work & society',
      cards: [
        { front: '社会', reading: 'しゃかい', back: 'society', pos: 'noun' },
        { front: '先輩', reading: 'せんぱい', back: 'senior (school/work)', pos: 'noun' },
        { front: '後輩', reading: 'こうはい', back: 'junior (school/work)', pos: 'noun' },
        { front: '上司', reading: 'じょうし', back: 'boss; superior', pos: 'noun' },
        { front: '部下', reading: 'ぶか', back: 'subordinate', pos: 'noun' },
        { front: '同僚', reading: 'どうりょう', back: 'coworker', pos: 'noun' },
        { front: '会議', reading: 'かいぎ', back: 'meeting; conference', pos: 'noun' },
        { front: '書類', reading: 'しょるい', back: 'documents; paperwork', pos: 'noun' },
        { front: '給料', reading: 'きゅうりょう', back: 'salary', pos: 'noun' },
        { front: '残業', reading: 'ざんぎょう', back: 'overtime work', pos: 'noun' },
        { front: '就職', reading: 'しゅうしょく', back: 'getting a job', pos: 'noun' },
        { front: '面接', reading: 'めんせつ', back: 'interview', pos: 'noun' },
        { front: '卒業', reading: 'そつぎょう', back: 'graduation', pos: 'noun' },
        { front: '入学', reading: 'にゅうがく', back: 'school entrance', pos: 'noun' },
        { front: '成績', reading: 'せいせき', back: 'grades; results', pos: 'noun' },
        { front: '部活', reading: 'ぶかつ', back: 'school club activities', pos: 'noun' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Abstract nouns — cause, result, state',
      cards: [
        { front: '目的', reading: 'もくてき', back: 'purpose; goal', pos: 'noun' },
        { front: '理想', reading: 'りそう', back: 'ideal', pos: 'noun' },
        { front: '想像', reading: 'そうぞう', back: 'imagination', pos: 'noun' },
        { front: '記憶', reading: 'きおく', back: 'memory (faculty)', pos: 'noun', notes: '記憶喪失 = amnesia — you WILL meet this word.' },
        { front: '経験', reading: 'けいけん', back: 'experience', pos: 'noun' },
        { front: '知識', reading: 'ちしき', back: 'knowledge', pos: 'noun' },
        { front: '判断', reading: 'はんだん', back: 'judgment; decision', pos: 'noun' },
        { front: '解決', reading: 'かいけつ', back: 'resolution; solving', pos: 'noun' },
        { front: '結果', reading: 'けっか', back: 'result', pos: 'noun' },
        { front: '原因', reading: 'げんいん', back: 'cause', pos: 'noun' },
        { front: '影響', reading: 'えいきょう', back: 'influence; effect', pos: 'noun' },
        { front: '状態', reading: 'じょうたい', back: 'state; condition', pos: 'noun' },
        { front: '状況', reading: 'じょうきょう', back: 'situation; circumstances', pos: 'noun' },
        { front: '可能', reading: 'かのう', back: 'possible', pos: 'na-adjective' },
        { front: '無駄', reading: 'むだ', back: 'futile; waste', pos: 'na-adjective/noun', notes: '無駄だ！ = "It\'s useless!"' },
        { front: '秘密', reading: 'ひみつ', back: 'secret', pos: 'noun' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Adverbs & connectors II',
      cards: [
        { front: '例えば', reading: 'たとえば', back: 'for example', pos: 'adverb' },
        { front: 'つまり', back: 'in other words; in short', pos: 'conjunction' },
        { front: 'ただし', back: 'however; provided that', pos: 'conjunction' },
        { front: 'しかも', back: 'moreover; on top of that', pos: 'conjunction' },
        { front: 'さらに', back: 'furthermore; even more', pos: 'adverb' },
        { front: '一応', reading: 'いちおう', back: 'more or less; just in case', pos: 'adverb' },
        { front: '結局', reading: 'けっきょく', back: 'in the end; after all', pos: 'adverb' },
        { front: '案外', reading: 'あんがい', back: 'unexpectedly; surprisingly', pos: 'adverb' },
        { front: '意外と', reading: 'いがいと', back: 'surprisingly; contrary to expectations', pos: 'adverb' },
        { front: '絶対に', reading: 'ぜったいに', back: 'absolutely; definitely', pos: 'adverb' },
        { front: '必ず', reading: 'かならず', back: 'without fail; always', pos: 'adverb' },
        { front: 'きっと', back: 'surely; no doubt', pos: 'adverb' },
        { front: 'もしかしたら', back: 'possibly; perhaps', pos: 'adverb' },
        { front: 'なるべく', back: 'as much as possible', pos: 'adverb' },
        { front: 'わざわざ', back: 'going out of one\'s way (to do)', pos: 'adverb' },
        { front: 'それにしても', back: 'even so; still…', pos: 'conjunction' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Body, life & money',
      cards: [
        { front: '怪我', reading: 'けが', back: 'injury', pos: 'noun', notes: '怪我をする = to get hurt.' },
        { front: '涙', reading: 'なみだ', back: 'tears', pos: 'noun' },
        { front: '汗', reading: 'あせ', back: 'sweat', pos: 'noun' },
        { front: '息', reading: 'いき', back: 'breath', pos: 'noun', notes: '息をする = to breathe.' },
        { front: '夢', reading: 'ゆめ', back: 'dream', pos: 'noun' },
        { front: '骨', reading: 'ほね', back: 'bone', pos: 'noun' },
        { front: '血', reading: 'ち', back: 'blood', pos: 'noun' },
        { front: '肌', reading: 'はだ', back: 'skin', pos: 'noun' },
        { front: '命', reading: 'いのち', back: 'life (the one you have)', pos: 'noun' },
        { front: '家賃', reading: 'やちん', back: 'rent', pos: 'noun' },
        { front: '貯金', reading: 'ちょきん', back: 'savings', pos: 'noun' },
        { front: '節約', reading: 'せつやく', back: 'saving; economizing', pos: 'noun' },
        { front: '借金', reading: 'しゃっきん', back: 'debt', pos: 'noun' },
        { front: '無料', reading: 'むりょう', back: 'free of charge', pos: 'noun', notes: 'Also タダ (casual).' },
        { front: '募集', reading: 'ぼしゅう', back: 'recruitment; "wanted"', pos: 'noun' },
        { front: '遅刻', reading: 'ちこく', back: 'being late', pos: 'noun' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Character & description III',
      cards: [
        { front: '複雑', reading: 'ふくざつ', back: 'complicated', pos: 'na-adjective' },
        { front: '単純', reading: 'たんじゅん', back: 'simple; simplistic', pos: 'na-adjective' },
        { front: '正直', reading: 'しょうじき', back: 'honest', pos: 'na-adjective', notes: '正直、～ = "honestly, …" as an adverb.' },
        { front: '素直', reading: 'すなお', back: 'honest with oneself; docile', pos: 'na-adjective', notes: '素直じゃない = the tsundere diagnosis.' },
        { front: '真剣', reading: 'しんけん', back: 'serious; earnest', pos: 'na-adjective' },
        { front: '熱心', reading: 'ねっしん', back: 'enthusiastic; devoted', pos: 'na-adjective' },
        { front: '冷静', reading: 'れいせい', back: 'calm; cool-headed', pos: 'na-adjective' },
        { front: '積極的', reading: 'せっきょくてき', back: 'proactive; assertive', pos: 'na-adjective' },
        { front: '消極的', reading: 'しょうきょくてき', back: 'passive; reserved', pos: 'na-adjective' },
        { front: '得意', reading: 'とくい', back: 'good at; one\'s forte', pos: 'na-adjective' },
        { front: '苦手', reading: 'にがて', back: 'bad at; hard to deal with', pos: 'na-adjective' },
        { front: '平気', reading: 'へいき', back: 'fine; unfazed', pos: 'na-adjective', notes: '平気だよ = "I\'m fine."' },
        { front: '不思議', reading: 'ふしぎ', back: 'mysterious; strange', pos: 'na-adjective' },
        { front: '当たり前', reading: 'あたりまえ', back: 'obvious; a given', pos: 'na-adjective/noun', notes: '当たり前だろ！ = "obviously!"' },
        { front: '適当', reading: 'てきとう', back: 'suitable — or half-hearted (context!)', pos: 'na-adjective' },
        { front: '面倒', reading: 'めんどう', back: 'a hassle; troublesome', pos: 'na-adjective/noun', notes: '面倒くさい／めんどくさい = "what a pain".' }
      ]
    }
  ]
}

const N3_KANJI_COURSE: SeedCourse = {
  title: 'JLPT N3 Kanji Essentials',
  description:
    'The ~150 highest-value kanji of the N3 set (the full level has ~370). Past this ' +
    'point, new kanji stick best through reading — let the mining inbox catch the rest.',
  level: 'N3',
  difficulty: 14,
  lessons: [
    {
      kind: 'kanji',
      title: 'Emotions',
      cards: [
        { front: '感', reading: 'かん', back: 'feeling; sense', onyomi: 'カン', exampleJp: '感じる', exampleReading: 'かんじる', exampleEn: 'to feel' },
        { front: '情', reading: 'じょう', back: 'emotion; circumstances', onyomi: 'ジョウ', kunyomi: 'なさ(け)', exampleJp: '感情', exampleReading: 'かんじょう', exampleEn: 'emotions' },
        { front: '悲', reading: 'かな(しい)', back: 'sad', onyomi: 'ヒ', kunyomi: 'かな(しい)', exampleJp: '悲しみ', exampleReading: 'かなしみ', exampleEn: 'sorrow' },
        { front: '泣', reading: 'な(く)', back: 'to cry', onyomi: 'キュウ', kunyomi: 'な(く)', exampleJp: '泣き虫', exampleReading: 'なきむし', exampleEn: 'crybaby' },
        { front: '笑', reading: 'わら(う)', back: 'to laugh', onyomi: 'ショウ', kunyomi: 'わら(う), え(む)', exampleJp: '笑顔', exampleReading: 'えがお', exampleEn: 'smile' },
        { front: '怒', reading: 'おこ(る)', back: 'to get angry', onyomi: 'ド', kunyomi: 'おこ(る), いか(る)', exampleJp: '怒り', exampleReading: 'いかり', exampleEn: 'rage' },
        { front: '恐', reading: 'おそ(れる)', back: 'fear', onyomi: 'キョウ', kunyomi: 'おそ(れる), こわ(い)', exampleJp: '恐怖', exampleReading: 'きょうふ', exampleEn: 'terror' },
        { front: '驚', reading: 'おどろ(く)', back: 'to be astonished', onyomi: 'キョウ', kunyomi: 'おどろ(く)', exampleJp: '驚く', exampleReading: 'おどろく', exampleEn: 'to be surprised' },
        { front: '愛', reading: 'あい', back: 'love', onyomi: 'アイ', exampleJp: '愛する', exampleReading: 'あいする', exampleEn: 'to love' },
        { front: '恋', reading: 'こい', back: 'romantic love', onyomi: 'レン', kunyomi: 'こい', exampleJp: '恋人', exampleReading: 'こいびと', exampleEn: 'boyfriend/girlfriend' },
        { front: '幸', reading: 'しあわ(せ)', back: 'happiness; fortune', onyomi: 'コウ', kunyomi: 'しあわ(せ), さいわ(い)', exampleJp: '幸せ', exampleReading: 'しあわせ', exampleEn: 'happiness' },
        { front: '苦', reading: 'くる(しい)', back: 'suffering; bitter', onyomi: 'ク', kunyomi: 'くる(しい), にが(い)', exampleJp: '苦手', exampleReading: 'にがて', exampleEn: 'bad at' },
        { front: '悩', reading: 'なや(む)', back: 'to worry; to agonize', onyomi: 'ノウ', kunyomi: 'なや(む)', exampleJp: '悩み', exampleReading: 'なやみ', exampleEn: 'a worry' },
        { front: '涙', reading: 'なみだ', back: 'tears', onyomi: 'ルイ', kunyomi: 'なみだ', exampleJp: '涙', exampleReading: 'なみだ', exampleEn: 'tears' },
        { front: '喜', reading: 'よろこ(ぶ)', back: 'to rejoice', onyomi: 'キ', kunyomi: 'よろこ(ぶ)', exampleJp: '喜ぶ', exampleReading: 'よろこぶ', exampleEn: 'to be delighted' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Body & health II',
      cards: [
        { front: '命', reading: 'いのち', back: 'life', onyomi: 'メイ', kunyomi: 'いのち', exampleJp: '命', exampleReading: 'いのち', exampleEn: 'life' },
        { front: '息', reading: 'いき', back: 'breath', onyomi: 'ソク', kunyomi: 'いき', exampleJp: '息子', exampleReading: 'むすこ', exampleEn: 'son' },
        { front: '骨', reading: 'ほね', back: 'bone', onyomi: 'コツ', kunyomi: 'ほね', exampleJp: '骨', exampleReading: 'ほね', exampleEn: 'bone' },
        { front: '血', reading: 'ち', back: 'blood', onyomi: 'ケツ', kunyomi: 'ち', exampleJp: '血', exampleReading: 'ち', exampleEn: 'blood' },
        { front: '髪', reading: 'かみ', back: 'hair (on the head)', onyomi: 'ハツ', kunyomi: 'かみ', exampleJp: '髪の毛', exampleReading: 'かみのけ', exampleEn: 'hair' },
        { front: '指', reading: 'ゆび', back: 'finger', onyomi: 'シ', kunyomi: 'ゆび, さ(す)', exampleJp: '指輪', exampleReading: 'ゆびわ', exampleEn: 'ring' },
        { front: '腕', reading: 'うで', back: 'arm; skill', onyomi: 'ワン', kunyomi: 'うで', exampleJp: '腕', exampleReading: 'うで', exampleEn: 'arm' },
        { front: '背', reading: 'せ', back: 'back; height', onyomi: 'ハイ', kunyomi: 'せ, せい', exampleJp: '背中', exampleReading: 'せなか', exampleEn: 'one\'s back' },
        { front: '肩', reading: 'かた', back: 'shoulder', onyomi: 'ケン', kunyomi: 'かた', exampleJp: '肩', exampleReading: 'かた', exampleEn: 'shoulder' },
        { front: '腹', reading: 'はら', back: 'belly', onyomi: 'フク', kunyomi: 'はら', exampleJp: 'お腹', exampleReading: 'おなか', exampleEn: 'stomach' },
        { front: '首', reading: 'くび', back: 'neck', onyomi: 'シュ', kunyomi: 'くび', exampleJp: '首', exampleReading: 'くび', exampleEn: 'neck' },
        { front: '眠', reading: 'ねむ(る)', back: 'to sleep', onyomi: 'ミン', kunyomi: 'ねむ(る), ねむ(い)', exampleJp: '眠い', exampleReading: 'ねむい', exampleEn: 'sleepy' },
        { front: '疲', reading: 'つか(れる)', back: 'to tire', onyomi: 'ヒ', kunyomi: 'つか(れる)', exampleJp: '疲れる', exampleReading: 'つかれる', exampleEn: 'to get tired' },
        { front: '痛', reading: 'いた(い)', back: 'painful', onyomi: 'ツウ', kunyomi: 'いた(い)', exampleJp: '頭痛', exampleReading: 'ずつう', exampleEn: 'headache' },
        { front: '健', reading: 'けん', back: 'healthy; robust', onyomi: 'ケン', kunyomi: 'すこ(やか)', exampleJp: '健康', exampleReading: 'けんこう', exampleEn: 'health' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Movement & change II',
      cards: [
        { front: '変', reading: 'か(わる)', back: 'to change; strange', onyomi: 'ヘン', kunyomi: 'か(わる), か(える)', exampleJp: '大変', exampleReading: 'たいへん', exampleEn: 'tough; serious' },
        { front: '増', reading: 'ふ(える)', back: 'to increase', onyomi: 'ゾウ', kunyomi: 'ふ(える), ま(す)', exampleJp: '増える', exampleReading: 'ふえる', exampleEn: 'to increase' },
        { front: '減', reading: 'へ(る)', back: 'to decrease', onyomi: 'ゲン', kunyomi: 'へ(る)', exampleJp: '減る', exampleReading: 'へる', exampleEn: 'to decrease' },
        { front: '過', reading: 'す(ぎる)', back: 'to pass; excess', onyomi: 'カ', kunyomi: 'す(ぎる), あやま(ち)', exampleJp: '過去', exampleReading: 'かこ', exampleEn: 'the past' },
        { front: '進', reading: 'すす(む)', back: 'to advance', onyomi: 'シン', kunyomi: 'すす(む)', exampleJp: '進歩', exampleReading: 'しんぽ', exampleEn: 'progress' },
        { front: '戻', reading: 'もど(る)', back: 'to return', onyomi: 'レイ', kunyomi: 'もど(る), もど(す)', exampleJp: '戻る', exampleReading: 'もどる', exampleEn: 'to go back' },
        { front: '返', reading: 'かえ(す)', back: 'to give back', onyomi: 'ヘン', kunyomi: 'かえ(す)', exampleJp: '返事', exampleReading: 'へんじ', exampleEn: 'reply' },
        { front: '渡', reading: 'わた(る)', back: 'to cross; to hand over', onyomi: 'ト', kunyomi: 'わた(る), わた(す)', exampleJp: '渡す', exampleReading: 'わたす', exampleEn: 'to hand over' },
        { front: '越', reading: 'こ(える)', back: 'to go beyond', onyomi: 'エツ', kunyomi: 'こ(える), こ(す)', exampleJp: '引っ越す', exampleReading: 'ひっこす', exampleEn: 'to move house' },
        { front: '逃', reading: 'に(げる)', back: 'to flee', onyomi: 'トウ', kunyomi: 'に(げる), のが(す)', exampleJp: '逃げる', exampleReading: 'にげる', exampleEn: 'to run away' },
        { front: '追', reading: 'お(う)', back: 'to chase', onyomi: 'ツイ', kunyomi: 'お(う)', exampleJp: '追いかける', exampleReading: 'おいかける', exampleEn: 'to chase after' },
        { front: '落', reading: 'お(ちる)', back: 'to fall; to drop', onyomi: 'ラク', kunyomi: 'お(ちる), お(とす)', exampleJp: '落ち着く', exampleReading: 'おちつく', exampleEn: 'to calm down' },
        { front: '折', reading: 'お(る)', back: 'to fold; to break', onyomi: 'セツ', kunyomi: 'お(る), お(れる)', exampleJp: '骨折', exampleReading: 'こっせつ', exampleEn: 'broken bone' },
        { front: '投', reading: 'な(げる)', back: 'to throw', onyomi: 'トウ', kunyomi: 'な(げる)', exampleJp: '投げる', exampleReading: 'なげる', exampleEn: 'to throw' },
        { front: '打', reading: 'う(つ)', back: 'to hit', onyomi: 'ダ', kunyomi: 'う(つ)', exampleJp: '打つ', exampleReading: 'うつ', exampleEn: 'to strike' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Mind & communication II',
      cards: [
        { front: '覚', reading: 'おぼ(える)', back: 'to memorize; to wake', onyomi: 'カク', kunyomi: 'おぼ(える), さ(める)', exampleJp: '目覚める', exampleReading: 'めざめる', exampleEn: 'to awaken' },
        { front: '忘', reading: 'わす(れる)', back: 'to forget', onyomi: 'ボウ', kunyomi: 'わす(れる)', exampleJp: '忘れ物', exampleReading: 'わすれもの', exampleEn: 'lost item; something left behind' },
        { front: '決', reading: 'き(める)', back: 'to decide', onyomi: 'ケツ', kunyomi: 'き(める), き(まる)', exampleJp: '決して', exampleReading: 'けっして', exampleEn: 'never (with negative)' },
        { front: '選', reading: 'えら(ぶ)', back: 'to choose', onyomi: 'セン', kunyomi: 'えら(ぶ)', exampleJp: '選択肢', exampleReading: 'せんたくし', exampleEn: 'choices (VN menus!)' },
        { front: '調', reading: 'しら(べる)', back: 'to investigate; tune', onyomi: 'チョウ', kunyomi: 'しら(べる)', exampleJp: '調子', exampleReading: 'ちょうし', exampleEn: 'condition; form' },
        { front: '伝', reading: 'つた(える)', back: 'to convey', onyomi: 'デン', kunyomi: 'つた(える), つた(わる)', exampleJp: '手伝う', exampleReading: 'てつだう', exampleEn: 'to help' },
        { front: '頼', reading: 'たの(む)', back: 'to request; to rely', onyomi: 'ライ', kunyomi: 'たの(む), たよ(る)', exampleJp: '信頼', exampleReading: 'しんらい', exampleEn: 'trust' },
        { front: '信', reading: 'しん', back: 'to believe; trust', onyomi: 'シン', exampleJp: '信じる', exampleReading: 'しんじる', exampleEn: 'to believe' },
        { front: '疑', reading: 'うたが(う)', back: 'to doubt', onyomi: 'ギ', kunyomi: 'うたが(う)', exampleJp: '疑問', exampleReading: 'ぎもん', exampleEn: 'doubt; question' },
        { front: '願', reading: 'ねが(う)', back: 'to wish', onyomi: 'ガン', kunyomi: 'ねが(う)', exampleJp: 'お願い', exampleReading: 'おねがい', exampleEn: 'request; "please"' },
        { front: '望', reading: 'のぞ(む)', back: 'to hope for', onyomi: 'ボウ', kunyomi: 'のぞ(む)', exampleJp: '希望', exampleReading: 'きぼう', exampleEn: 'hope' },
        { front: '呼', reading: 'よ(ぶ)', back: 'to call', onyomi: 'コ', kunyomi: 'よ(ぶ)', exampleJp: '呼ぶ', exampleReading: 'よぶ', exampleEn: 'to call (someone)' },
        { front: '談', reading: 'だん', back: 'discussion', onyomi: 'ダン', exampleJp: '相談', exampleReading: 'そうだん', exampleEn: 'consultation' },
        { front: '認', reading: 'みと(める)', back: 'to acknowledge', onyomi: 'ニン', kunyomi: 'みと(める)', exampleJp: '認める', exampleReading: 'みとめる', exampleEn: 'to admit; to accept' },
        { front: '探', reading: 'さが(す)', back: 'to search', onyomi: 'タン', kunyomi: 'さが(す)', exampleJp: '探偵', exampleReading: 'たんてい', exampleEn: 'detective' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Bonds & battles',
      cards: [
        { front: '関', reading: 'かん', back: 'connection; barrier', onyomi: 'カン', kunyomi: 'かか(わる), せき', exampleJp: '関係', exampleReading: 'かんけい', exampleEn: 'relationship' },
        { front: '係', reading: 'けい', back: 'connection; in charge', onyomi: 'ケイ', kunyomi: 'かか(り)', exampleJp: '係の人', exampleReading: 'かかりのひと', exampleEn: 'person in charge' },
        { front: '約', reading: 'やく', back: 'promise; approximately', onyomi: 'ヤク', exampleJp: '約束', exampleReading: 'やくそく', exampleEn: 'promise' },
        { front: '束', reading: 'たば', back: 'bundle', onyomi: 'ソク', kunyomi: 'たば', exampleJp: '花束', exampleReading: 'はなたば', exampleEn: 'bouquet' },
        { front: '結', reading: 'むす(ぶ)', back: 'to tie; to conclude', onyomi: 'ケツ', kunyomi: 'むす(ぶ)', exampleJp: '結婚', exampleReading: 'けっこん', exampleEn: 'marriage' },
        { front: '婚', reading: 'こん', back: 'marriage', onyomi: 'コン', exampleJp: '結婚式', exampleReading: 'けっこんしき', exampleEn: 'wedding' },
        { front: '離', reading: 'はな(れる)', back: 'to separate', onyomi: 'リ', kunyomi: 'はな(れる), はな(す)', exampleJp: '離れる', exampleReading: 'はなれる', exampleEn: 'to move away from' },
        { front: '争', reading: 'あらそ(う)', back: 'to fight over', onyomi: 'ソウ', kunyomi: 'あらそ(う)', exampleJp: '戦争', exampleReading: 'せんそう', exampleEn: 'war' },
        { front: '戦', reading: 'たたか(う)', back: 'to battle', onyomi: 'セン', kunyomi: 'たたか(う), いくさ', exampleJp: '戦い', exampleReading: 'たたかい', exampleEn: 'battle' },
        { front: '勝', reading: 'か(つ)', back: 'to win', onyomi: 'ショウ', kunyomi: 'か(つ)', exampleJp: '勝負', exampleReading: 'しょうぶ', exampleEn: 'match; showdown' },
        { front: '負', reading: 'ま(ける)', back: 'to lose; to bear', onyomi: 'フ', kunyomi: 'ま(ける), お(う)', exampleJp: '負ける', exampleReading: 'まける', exampleEn: 'to lose' },
        { front: '敵', reading: 'てき', back: 'enemy', onyomi: 'テキ', kunyomi: 'かたき', exampleJp: '敵', exampleReading: 'てき', exampleEn: 'enemy' },
        { front: '助', reading: 'たす(ける)', back: 'to help; to save', onyomi: 'ジョ', kunyomi: 'たす(ける)', exampleJp: '助けて！', exampleReading: 'たすけて！', exampleEn: 'Help!' },
        { front: '守', reading: 'まも(る)', back: 'to protect', onyomi: 'シュ, ス', kunyomi: 'まも(る)', exampleJp: 'お守り', exampleReading: 'おまもり', exampleEn: 'protective charm' },
        { front: '殺', reading: 'ころ(す)', back: 'to kill', onyomi: 'サツ', kunyomi: 'ころ(す)', exampleJp: '殺人', exampleReading: 'さつじん', exampleEn: 'murder' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Abstract I',
      cards: [
        { front: '良', reading: 'よ(い)', back: 'good', onyomi: 'リョウ', kunyomi: 'よ(い)', exampleJp: '仲良し', exampleReading: 'なかよし', exampleEn: 'close friends' },
        { front: '必', reading: 'かなら(ず)', back: 'without fail', onyomi: 'ヒツ', kunyomi: 'かなら(ず)', exampleJp: '必ず', exampleReading: 'かならず', exampleEn: 'definitely' },
        { front: '要', reading: 'よう', back: 'need; essential', onyomi: 'ヨウ', kunyomi: 'い(る)', exampleJp: '必要', exampleReading: 'ひつよう', exampleEn: 'necessary' },
        { front: '単', reading: 'たん', back: 'single; simple', onyomi: 'タン', exampleJp: '単語', exampleReading: 'たんご', exampleEn: 'vocabulary word' },
        { front: '難', reading: 'むずか(しい)', back: 'difficult', onyomi: 'ナン', kunyomi: 'むずか(しい)', exampleJp: '難しい', exampleReading: 'むずかしい', exampleEn: 'difficult' },
        { front: '全', reading: 'ぜん', back: 'all; whole', onyomi: 'ゼン', kunyomi: 'すべ(て), まった(く)', exampleJp: '全部', exampleReading: 'ぜんぶ', exampleEn: 'everything' },
        { front: '部', reading: 'ぶ', back: 'section; club', onyomi: 'ブ', exampleJp: '部屋', exampleReading: 'へや', exampleEn: 'room' },
        { front: '番', reading: 'ばん', back: 'number; turn; watch', onyomi: 'バン', exampleJp: '一番', exampleReading: 'いちばん', exampleEn: 'number one; the most' },
        { front: '組', reading: 'く(む)', back: 'group; to assemble', onyomi: 'ソ', kunyomi: 'く(む), くみ', exampleJp: '番組', exampleReading: 'ばんぐみ', exampleEn: 'TV program' },
        { front: '案', reading: 'あん', back: 'plan; proposal', onyomi: 'アン', exampleJp: '案内', exampleReading: 'あんない', exampleEn: 'guidance' },
        { front: '表', reading: 'おもて', back: 'surface; to express', onyomi: 'ヒョウ', kunyomi: 'おもて, あらわ(す)', exampleJp: '発表', exampleReading: 'はっぴょう', exampleEn: 'presentation; announcement' },
        { front: '現', reading: 'あらわ(れる)', back: 'to appear; present', onyomi: 'ゲン', kunyomi: 'あらわ(れる)', exampleJp: '現実', exampleReading: 'げんじつ', exampleEn: 'reality' },
        { front: '実', reading: 'じつ', back: 'truth; fruit', onyomi: 'ジツ', kunyomi: 'み, みの(る)', exampleJp: '実は', exampleReading: 'じつは', exampleEn: 'actually…' },
        { front: '当', reading: 'あ(たる)', back: 'to hit; correct', onyomi: 'トウ', kunyomi: 'あ(たる), あ(てる)', exampleJp: '本当', exampleReading: 'ほんとう', exampleEn: 'true; really' },
        { front: '然', reading: 'ぜん', back: 'so; in that way', onyomi: 'ゼン, ネン', exampleJp: '全然', exampleReading: 'ぜんぜん', exampleEn: 'not at all' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Abstract II',
      cards: [
        { front: '最', reading: 'さい', back: 'most', onyomi: 'サイ', kunyomi: 'もっと(も)', exampleJp: '最高', exampleReading: 'さいこう', exampleEn: 'the best' },
        { front: '初', reading: 'はじ(め)', back: 'first', onyomi: 'ショ', kunyomi: 'はじ(め), はつ', exampleJp: '最初', exampleReading: 'さいしょ', exampleEn: 'the beginning' },
        { front: '期', reading: 'き', back: 'period; term', onyomi: 'キ', exampleJp: '期待', exampleReading: 'きたい', exampleEn: 'expectation' },
        { front: '続', reading: 'つづ(く)', back: 'to continue', onyomi: 'ゾク', kunyomi: 'つづ(く), つづ(ける)', exampleJp: '続き', exampleReading: 'つづき', exampleEn: 'continuation ("to be continued")' },
        { front: '経', reading: 'けい', back: 'to pass through; manage', onyomi: 'ケイ', kunyomi: 'へ(る)', exampleJp: '経験', exampleReading: 'けいけん', exampleEn: 'experience' },
        { front: '常', reading: 'じょう', back: 'ordinary; always', onyomi: 'ジョウ', kunyomi: 'つね', exampleJp: '非常に', exampleReading: 'ひじょうに', exampleEn: 'extremely' },
        { front: '非', reading: 'ひ', back: 'not; fault', onyomi: 'ヒ', exampleJp: '非常口', exampleReading: 'ひじょうぐち', exampleEn: 'emergency exit' },
        { front: '普', reading: 'ふ', back: 'general; wide', onyomi: 'フ', exampleJp: '普通', exampleReading: 'ふつう', exampleEn: 'normal' },
        { front: '段', reading: 'だん', back: 'step; grade', onyomi: 'ダン', exampleJp: '普段', exampleReading: 'ふだん', exampleEn: 'usually' },
        { front: '値', reading: 'ね', back: 'value; price', onyomi: 'チ', kunyomi: 'ね, あたい', exampleJp: '値段', exampleReading: 'ねだん', exampleEn: 'price' },
        { front: '例', reading: 'れい', back: 'example', onyomi: 'レイ', kunyomi: 'たと(えば)', exampleJp: '例えば', exampleReading: 'たとえば', exampleEn: 'for example' },
        { front: '由', reading: 'ゆう', back: 'reason; via', onyomi: 'ユ, ユウ', exampleJp: '自由', exampleReading: 'じゆう', exampleEn: 'freedom' },
        { front: '因', reading: 'いん', back: 'cause', onyomi: 'イン', exampleJp: '原因', exampleReading: 'げんいん', exampleEn: 'cause' },
        { front: '原', reading: 'はら', back: 'origin; field', onyomi: 'ゲン', kunyomi: 'はら', exampleJp: '原因', exampleReading: 'げんいん', exampleEn: 'cause' },
        { front: '果', reading: 'か', back: 'fruit; result', onyomi: 'カ', kunyomi: 'は(たす)', exampleJp: '結果', exampleReading: 'けっか', exampleEn: 'result' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Nature II',
      cards: [
        { front: '光', reading: 'ひかり', back: 'light', onyomi: 'コウ', kunyomi: 'ひかり, ひか(る)', exampleJp: '光る', exampleReading: 'ひかる', exampleEn: 'to shine' },
        { front: '星', reading: 'ほし', back: 'star', onyomi: 'セイ', kunyomi: 'ほし', exampleJp: '星空', exampleReading: 'ほしぞら', exampleEn: 'starry sky' },
        { front: '石', reading: 'いし', back: 'stone', onyomi: 'セキ', kunyomi: 'いし', exampleJp: '石', exampleReading: 'いし', exampleEn: 'stone' },
        { front: '岩', reading: 'いわ', back: 'boulder', onyomi: 'ガン', kunyomi: 'いわ', exampleJp: '岩', exampleReading: 'いわ', exampleEn: 'rock' },
        { front: '島', reading: 'しま', back: 'island', onyomi: 'トウ', kunyomi: 'しま', exampleJp: '島', exampleReading: 'しま', exampleEn: 'island' },
        { front: '波', reading: 'なみ', back: 'wave', onyomi: 'ハ', kunyomi: 'なみ', exampleJp: '波', exampleReading: 'なみ', exampleEn: 'wave' },
        { front: '氷', reading: 'こおり', back: 'ice', onyomi: 'ヒョウ', kunyomi: 'こおり', exampleJp: '氷', exampleReading: 'こおり', exampleEn: 'ice' },
        { front: '熱', reading: 'ねつ', back: 'heat; fever', onyomi: 'ネツ', kunyomi: 'あつ(い)', exampleJp: '熱がある', exampleReading: 'ねつがある', exampleEn: 'to have a fever' },
        { front: '冷', reading: 'つめ(たい)', back: 'cold (to the touch)', onyomi: 'レイ', kunyomi: 'つめ(たい), ひ(える)', exampleJp: '冷たい', exampleReading: 'つめたい', exampleEn: 'cold; distant' },
        { front: '温', reading: 'あたた(かい)', back: 'warm', onyomi: 'オン', kunyomi: 'あたた(かい)', exampleJp: '温泉', exampleReading: 'おんせん', exampleEn: 'hot spring' },
        { front: '湯', reading: 'ゆ', back: 'hot water', onyomi: 'トウ', kunyomi: 'ゆ', exampleJp: 'お湯', exampleReading: 'おゆ', exampleEn: 'hot water' },
        { front: '焼', reading: 'や(く)', back: 'to grill; to burn', onyomi: 'ショウ', kunyomi: 'や(く), や(ける)', exampleJp: '焼肉', exampleReading: 'やきにく', exampleEn: 'grilled meat' },
        { front: '花', reading: 'はな', back: 'flower', onyomi: 'カ', kunyomi: 'はな', exampleJp: '花見', exampleReading: 'はなみ', exampleEn: 'blossom viewing' },
        { front: '草', reading: 'くさ', back: 'grass', onyomi: 'ソウ', kunyomi: 'くさ', exampleJp: '草', exampleReading: 'くさ', exampleEn: 'grass (also net slang for "lol")' },
        { front: '葉', reading: 'は', back: 'leaf', onyomi: 'ヨウ', kunyomi: 'は', exampleJp: '言葉', exampleReading: 'ことば', exampleEn: 'word; language' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Home & objects II',
      cards: [
        { front: '橋', reading: 'はし', back: 'bridge', onyomi: 'キョウ', kunyomi: 'はし', exampleJp: '橋', exampleReading: 'はし', exampleEn: 'bridge' },
        { front: '庭', reading: 'にわ', back: 'garden', onyomi: 'テイ', kunyomi: 'にわ', exampleJp: '庭', exampleReading: 'にわ', exampleEn: 'garden' },
        { front: '窓', reading: 'まど', back: 'window', onyomi: 'ソウ', kunyomi: 'まど', exampleJp: '窓', exampleReading: 'まど', exampleEn: 'window' },
        { front: '壁', reading: 'かべ', back: 'wall', onyomi: 'ヘキ', kunyomi: 'かべ', exampleJp: '壁', exampleReading: 'かべ', exampleEn: 'wall' },
        { front: '戸', reading: 'と', back: 'door (sliding)', onyomi: 'コ', kunyomi: 'と', exampleJp: '戸', exampleReading: 'と', exampleEn: 'door' },
        { front: '押', reading: 'お(す)', back: 'to push', onyomi: 'オウ', kunyomi: 'お(す)', exampleJp: '押す', exampleReading: 'おす', exampleEn: 'to push' },
        { front: '箱', reading: 'はこ', back: 'box', kunyomi: 'はこ', exampleJp: '箱', exampleReading: 'はこ', exampleEn: 'box' },
        { front: '袋', reading: 'ふくろ', back: 'bag; sack', onyomi: 'タイ', kunyomi: 'ふくろ', exampleJp: '袋', exampleReading: 'ふくろ', exampleEn: 'bag' },
        { front: '鏡', reading: 'かがみ', back: 'mirror', onyomi: 'キョウ', kunyomi: 'かがみ', exampleJp: '眼鏡', exampleReading: 'めがね', exampleEn: 'glasses' },
        { front: '糸', reading: 'いと', back: 'thread', onyomi: 'シ', kunyomi: 'いと', exampleJp: '糸', exampleReading: 'いと', exampleEn: 'thread' },
        { front: '布', reading: 'ぬの', back: 'cloth', onyomi: 'フ', kunyomi: 'ぬの', exampleJp: '布団', exampleReading: 'ふとん', exampleEn: 'futon' },
        { front: '皿', reading: 'さら', back: 'plate', kunyomi: 'さら', exampleJp: 'お皿', exampleReading: 'おさら', exampleEn: 'plate' },
        { front: '杯', reading: 'はい', back: 'cup(ful); counter for drinks', onyomi: 'ハイ', kunyomi: 'さかずき', exampleJp: '一杯', exampleReading: 'いっぱい', exampleEn: 'one cup; full' },
        { front: '席', reading: 'せき', back: 'seat', onyomi: 'セキ', exampleJp: '席', exampleReading: 'せき', exampleEn: 'seat' },
        { front: '横', reading: 'よこ', back: 'side; horizontal', onyomi: 'オウ', kunyomi: 'よこ', exampleJp: '横', exampleReading: 'よこ', exampleEn: 'beside' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Success, failure & sums',
      cards: [
        { front: '倍', reading: 'ばい', back: 'times; double', onyomi: 'バイ', exampleJp: '二倍', exampleReading: 'にばい', exampleEn: 'twice as much' },
        { front: '数', reading: 'かず', back: 'number', onyomi: 'スウ', kunyomi: 'かず, かぞ(える)', exampleJp: '数学', exampleReading: 'すうがく', exampleEn: 'math' },
        { front: '量', reading: 'りょう', back: 'quantity', onyomi: 'リョウ', kunyomi: 'はか(る)', exampleJp: '量', exampleReading: 'りょう', exampleEn: 'amount' },
        { front: '費', reading: 'ひ', back: 'expense', onyomi: 'ヒ', kunyomi: 'つい(やす)', exampleJp: '交通費', exampleReading: 'こうつうひ', exampleEn: 'transport costs' },
        { front: '払', reading: 'はら(う)', back: 'to pay', onyomi: 'フツ', kunyomi: 'はら(う)', exampleJp: '払う', exampleReading: 'はらう', exampleEn: 'to pay' },
        { front: '得', reading: 'え(る)', back: 'to gain; profit', onyomi: 'トク', kunyomi: 'え(る)', exampleJp: '得意', exampleReading: 'とくい', exampleEn: 'good at' },
        { front: '失', reading: 'うしな(う)', back: 'to lose', onyomi: 'シツ', kunyomi: 'うしな(う)', exampleJp: '失敗', exampleReading: 'しっぱい', exampleEn: 'failure' },
        { front: '敗', reading: 'はい', back: 'defeat', onyomi: 'ハイ', kunyomi: 'やぶ(れる)', exampleJp: '敗北', exampleReading: 'はいぼく', exampleEn: 'defeat' },
        { front: '成', reading: 'な(る)', back: 'to become; to achieve', onyomi: 'セイ', kunyomi: 'な(る)', exampleJp: '成功', exampleReading: 'せいこう', exampleEn: 'success' },
        { front: '功', reading: 'こう', back: 'achievement', onyomi: 'コウ', exampleJp: '成功', exampleReading: 'せいこう', exampleEn: 'success' },
        { front: '完', reading: 'かん', back: 'complete', onyomi: 'カン', exampleJp: '完全', exampleReading: 'かんぜん', exampleEn: 'perfect; complete' },
        { front: '残', reading: 'のこ(る)', back: 'to remain', onyomi: 'ザン', kunyomi: 'のこ(る), のこ(す)', exampleJp: '残念', exampleReading: 'ざんねん', exampleEn: 'a shame; too bad' },
        { front: '消', reading: 'き(える)', back: 'to vanish; to erase', onyomi: 'ショウ', kunyomi: 'き(える), け(す)', exampleJp: '消える', exampleReading: 'きえる', exampleEn: 'to disappear' },
        { front: '定', reading: 'てい', back: 'to fix; determined', onyomi: 'テイ, ジョウ', kunyomi: 'さだ(める)', exampleJp: '予定', exampleReading: 'よてい', exampleEn: 'plan; schedule' },
        { front: '夫', reading: 'おっと', back: 'husband', onyomi: 'フ', kunyomi: 'おっと', exampleJp: '大丈夫', exampleReading: 'だいじょうぶ', exampleEn: 'okay; all right' }
      ]
    }
  ]
}

const N2A_COURSE: SeedCourse = {
  title: 'JLPT N2 Grammar I',
  description:
    'The high-frequency core of N2 — obligation, inevitability and emphasis. ' +
    'Half of these are dramatic-dialogue staples; the other half carry narration.',
  level: 'N2',
  difficulty: 16,
  lessons: [
    {
      kind: 'grammar',
      title: '～わけにはいかない — can\'t very well…',
      body: `Dictionary form + わけにはいかない — "can't (for social/moral reasons)", even though physically possible:

ここで諦めるわけにはいかない。 — "I can't give up here." (protagonist line, verbatim, everywhere)

負けるわけにはいかないんだ！ — "Losing is not an option!"

Negative + わけにはいかない = "have no choice but to": 行かないわけにはいかない "I can't NOT go."

Different from できない (ability) — わけにはいかない is about duty, face and stakes.`,
      cards: [
        { front: 'ここで諦めるわけにはいかない。', reading: 'ここであきらめるわけにはいかない。', back: "I can't give up here." },
        { front: '負けるわけにはいかないんだ！', reading: 'まけるわけにはいかないんだ！', back: 'Losing is not an option!' },
        { front: '行かないわけにはいかない。', reading: 'いかないわけにはいかない。', back: "I can't very well not go." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ざるを得ない — have no choice but to',
      body: `ない-stem + ざるを得ない（ざるをえない） — forced by circumstances:

認めざるを得ない。 — "I have to admit it."
する → せざるを得ない: 中止せざるを得なかった。 "We had no choice but to cancel."

Written/stiff — its presence marks formal narration or a reluctant character conceding. The casual equivalent is しかない (N3): やるしかない ≈ やらざるを得ない, minus the reluctance flavor.`,
      cards: [
        { front: '彼の実力は認めざるを得ない。', reading: 'かれのじつりょくはみとめざるをえない。', back: 'I have to admit his ability.' },
        { front: '大会は中止せざるを得なかった。', reading: 'たいかいはちゅうしせざるをえなかった。', back: 'We had no choice but to cancel the tournament.' },
        { front: '計画を変えざるを得ない。', reading: 'けいかくをかえざるをえない。', back: "We're forced to change the plan." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ずにはいられない — can\'t help but',
      body: `ない-stem + ずにはいられない — the urge is uncontrollable:

笑わずにはいられなかった。 — "I couldn't help laughing."
する → せずにはいられない.

Casual variant: ないではいられない. First-person by default (it describes an inner compulsion); for others add ようだ/らしい.

Compare ざるを得ない (external pressure) vs ずにはいられない (internal urge) — same ず, opposite direction of force.`,
      cards: [
        { front: '笑わずにはいられなかった。', reading: 'わらわずにはいられなかった。', back: "I couldn't help laughing." },
        { front: '彼女のことを考えずにはいられない。', reading: 'かのじょのことをかんがえずにはいられない。', back: "I can't stop thinking about her." },
        { front: '泣かずにはいられなかった。', reading: 'なかずにはいられなかった。', back: "I couldn't hold back my tears." }
      ]
    },
    {
      kind: 'grammar',
      title: '～に違いない・～に決まっている — must be / definitely',
      body: `Two confident conclusions:

・に違いない（ちがいない） — "must be" (reasoned certainty, common in mystery narration): 犯人はあいつに違いない。
・に決まっている（きまっている） — "obviously is / definitely" (emotional certainty, dialogue): 嘘に決まってるだろ！ "It's obviously a lie!"

Attach to plain forms and nouns directly. 決まってる in a retort = "duh": 行くに決まってる "of course I'm going".`,
      cards: [
        { front: '犯人はあいつに違いない。', reading: 'はんにんはあいつにちがいない。', back: 'The culprit must be him.' },
        { front: 'そんなの嘘に決まってるだろ！', reading: 'そんなのうそにきまってるだろ！', back: "That's obviously a lie!" },
        { front: '行くに決まってるじゃん。', reading: 'いくにきまってるじゃん。', back: "Of course I'm going, duh." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ものだ — truths, nostalgia and mild lectures',
      body: `ものだ after plain forms has three big readings:

1. general truth: 人間は失敗するものだ。 "People make mistakes — that's how it is."
2. nostalgia (た + ものだ): 昔はよく川で泳いだものだ。 "We used to swim in the river back then."
3. mild "should" (lecturing): 年上には敬語を使うものだ。 "One uses polite speech with elders."

Casual contraction もんだ; exclamatory: 時間が経つのは早いものだ "how fast time flies". The lecture use is the grandpa-character signature.`,
      cards: [
        { front: '人間は失敗するものだ。', reading: 'にんげんはしっぱいするものだ。', back: 'People make mistakes — that\'s just how it is.' },
        { front: '昔はよくここで遊んだものだ。', reading: 'むかしはよくここであそんだものだ。', back: 'We used to play here all the time.' },
        { front: '年上には敬語を使うものだよ。', reading: 'としうえにはけいごをつかうものだよ。', back: "You're supposed to use polite speech with your elders." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ものか — like hell it is!',
      body: `Plain form + ものか（もんか） — emphatic, emotional denial:

負けるもんか！ — "Like hell I'll lose!" / "I won't lose, no matter what!"
あんな店、二度と行くものか。 — "As if I'd ever go to that place again."

Rough male: ものか → もんか; feminine: ものですか. Rhetorical question form only — nobody expects an answer.

One of the highest-value manga patterns per syllable: three kana, an entire defiant panel.`,
      cards: [
        { front: '負けるもんか！', reading: 'まけるもんか！', back: "Like hell I'll lose!" },
        { front: 'あんな店、二度と行くものか。', reading: 'あんなみせ、にどといくものか。', back: "As if I'd ever go there again." },
        { front: '泣くもんか。', reading: 'なくもんか。', back: "I won't cry. I won't!" }
      ]
    },
    {
      kind: 'grammar',
      title: '～どころか・～どころではない — far from it',
      body: `・X どころか Y — "far from X, actually Y" (escalation or reversal):
　寒いどころか、雪まで降ってきた。 — "Cold? It's actually started snowing."
　感謝されるどころか、怒られた。 — "Far from being thanked, I got yelled at."

・どころではない — "this is no time/situation for":
　旅行どころではない。 — "A trip is out of the question right now."
　それどころじゃない！ — "I've got bigger problems!" — a panic-scene staple.`,
      cards: [
        { front: '感謝されるどころか、怒られた。', reading: 'かんしゃされるどころか、おこられた。', back: 'Far from being thanked, I got yelled at.' },
        { front: '今はそれどころじゃない！', reading: 'いまはそれどころじゃない！', back: "This is no time for that!" },
        { front: '寒いどころか、雪まで降ってきた。', reading: 'さむいどころか、ゆきまでふってきた。', back: "Cold? It's even started snowing." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ばかりに — just because (and I regret it)',
      body: `Plain form + ばかりに — a single cause led to a bad outcome; heavy with regret:

嘘をついたばかりに、信用を失った。 — "Just because I lied that once, I lost their trust."
お金がないばかりに、進学を諦めた。 — "Only because there was no money, (I) gave up on university."

The regret coloring separates it from neutral ため/から. Tragic-backstory narration runs on ばかりに.`,
      cards: [
        { front: '嘘をついたばかりに、信用を失った。', reading: 'うそをついたばかりに、しんようをうしなった。', back: 'Just because I lied, I lost their trust.' },
        { front: 'お金がないばかりに、夢を諦めた。', reading: 'おかねがないばかりに、ゆめをあきらめた。', back: 'Only because of money, I gave up my dream.' },
        { front: '油断したばかりに、負けてしまった。', reading: 'ゆだんしたばかりに、まけてしまった。', back: 'I let my guard down for a moment — and lost.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～あげく・～末に — after all that…',
      body: `Both mean "after much X, finally Y", attaching to た-form or noun+の:

・あげく（挙句） — the outcome is usually BAD: さんざん悩んだあげく、断った。 "After agonizing forever, I turned it down."
・末に（すえに） — neutral/formal, often good: 苦労の末に、成功した。 "After great hardship, (he) succeeded."

Both signal a long process compressed into one sentence — narration shorthand for "a whole arc happened here".`,
      cards: [
        { front: 'さんざん悩んだあげく、断った。', reading: 'さんざんなやんだあげく、ことわった。', back: 'After agonizing over it, I turned it down.' },
        { front: '苦労の末に、ついに成功した。', reading: 'くろうのすえに、ついにせいこうした。', back: 'After much hardship, he finally succeeded.' },
        { front: '長い戦いの末に、平和が戻った。', reading: 'ながいたたかいのすえに、へいわがもどった。', back: 'After a long war, peace returned.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～かける — half-done, about to',
      body: `ます-stem + かける／かけの — an action started but not finished:

食べかけのパン — "a half-eaten piece of bread"
言いかけてやめた。 — "started to say something, then stopped" (THE dramatic-pause sentence)
死にかけた。 — "(I) nearly died."

Related: 〜かけている "on the verge of": 消えかけている "flickering out". Every VN route has a 言いかけた line that the heroine never finishes.`,
      cards: [
        { front: '彼は何か言いかけて、やめた。', reading: 'かれはなにかいいかけて、やめた。', back: 'He started to say something, then stopped.' },
        { front: '食べかけのパンが置いてある。', reading: 'たべかけのパンがおいてある。', back: 'A half-eaten piece of bread is sitting there.' },
        { front: 'あの時、死にかけたんだ。', reading: 'あのとき、しにかけたんだ。', back: 'I nearly died back then.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～がち・～気味 — tends to / a touch of',
      body: `Both attach to ます-stem or nouns and describe tendencies:

・がち — prone to (usually undesirable): 遅れがち "tends to be late", 病気がち "sickly", 忘れがち "apt to forget".
・気味（ぎみ） — "a touch of / slightly": 風邪気味 "coming down with a cold", 太り気味 "a bit overweight", 緊張気味 "somewhat nervous".

がち generalizes over time; 気味 describes right now. Both conjugate as な-adjectives.`,
      cards: [
        { front: '最近、彼は学校を休みがちだ。', reading: 'さいきん、かれはがっこうをやすみがちだ。', back: "He's been missing school a lot lately." },
        { front: 'ちょっと風邪気味なんだ。', reading: 'ちょっとかぜぎみなんだ。', back: "I think I'm coming down with a cold." },
        { front: '大事なことを忘れがちだ。', reading: 'だいじなことをわすれがちだ。', back: 'I tend to forget the important things.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～向け・～向き — made for / suited to',
      body: `Both from 向く "to face":

・向け（むけ） — DESIGNED for: 子供向けのアニメ "anime made for kids", 初心者向けの本.
・向き（むき） — SUITED to (by nature): この仕事は君向きだ。 "This job suits you." 南向きの部屋 "south-facing room" (literal facing).

子供向け番組 was made for children; 子供向きの店 just happens to suit them. Store pages and game descriptions use 向け constantly.`,
      cards: [
        { front: 'これは子供向けのアニメだ。', reading: 'これはこどもむけのアニメだ。', back: 'This is an anime made for children.' },
        { front: 'この仕事は君向きだと思う。', reading: 'このしごとはきみむきだとおもう。', back: 'I think this job suits you.' },
        { front: '初心者向けに説明します。', reading: 'しょしんしゃむけにせつめいします。', back: "I'll explain it for beginners." }
      ]
    },
    {
      kind: 'grammar',
      title: '～はずだった — was supposed to',
      body: `はず (N4) in the past = a plan or expectation that DIDN'T happen:

今日は休みのはずだった。 — "Today was supposed to be my day off…"
彼が来るはずだったのに。 — "He was supposed to come, and yet…"

The trailing のに does the emotional work. Related: はずがない "impossible" and its past はずがなかった.

Tragedy setup in one pattern: こんなはずじゃなかった。 "It wasn't supposed to be like this." — memorize as a unit.`,
      cards: [
        { front: '今日は休みのはずだった。', reading: 'きょうはやすみのはずだった。', back: 'Today was supposed to be my day off…' },
        { front: '彼も来るはずだったのに。', reading: 'かれもくるはずだったのに。', back: 'He was supposed to come too, and yet…' },
        { front: 'こんなはずじゃなかった。', reading: 'こんなはずじゃなかった。', back: "It wasn't supposed to be like this." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ことに（は） — to my (surprise/joy/regret)',
      body: `Emotion word + ことに fronts the speaker's reaction before the fact:

驚いたことに、彼は無事だった。 — "To my surprise, he was unharmed."
残念なことに、間に合わなかった。 — "Regrettably, we didn't make it in time."
ありがたいことに — "thankfully"; 不思議なことに — "strangely enough".

Pure narration furniture — once you can skim ～ことに、 you read the emotion first and the event second, exactly as intended.`,
      cards: [
        { front: '驚いたことに、彼は無事だった。', reading: 'おどろいたことに、かれはぶじだった。', back: 'To my surprise, he was unharmed.' },
        { front: '残念なことに、間に合わなかった。', reading: 'ざんねんなことに、まにあわなかった。', back: "Regrettably, we didn't make it in time." },
        { front: '不思議なことに、誰もいなかった。', reading: 'ふしぎなことに、だれもいなかった。', back: 'Strangely enough, nobody was there.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ことだから — knowing (that person)',
      body: `Person + のことだから — a prediction based on their known character:

彼のことだから、また遅れてくるよ。 — "Knowing him, he'll be late again."
真面目な彼女のことだから、もう終わらせただろう。 — "Knowing how diligent she is, she's surely finished already."

Nearly always about a specific person both speakers know — it's gossip grammar, and slice-of-life dialogue is made of it.`,
      cards: [
        { front: '彼のことだから、また遅れてくるよ。', reading: 'かれのことだから、またおくれてくるよ。', back: "Knowing him, he'll be late again." },
        { front: '君のことだから、大丈夫だと思ってた。', reading: 'きみのことだから、だいじょうぶだとおもってた。', back: 'Knowing you, I figured you\'d be fine.' },
        { front: 'あの人のことだから、心配ないよ。', reading: 'あのひとのことだから、しんぱいないよ。', back: 'Knowing them, there\'s nothing to worry about.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～つつ（ある） — while / in the process of',
      body: `ます-stem + つつ — the literary counterpart of ながら:

・simultaneous: 悪いと知りつつ、嘘をついた。 "Knowing it was wrong, I still lied." (usually CONTRARY actions — "while knowing / despite")
・つつある — ongoing change (written): 町は変わりつつある。 "The town is changing."

Dialogue says ながら; narration says つつ. When a VN's prose shifts to つつある, it's zooming out to describe the world drifting — a tone marker as much as grammar.`,
      cards: [
        { front: '悪いと知りつつ、嘘をついた。', reading: 'わるいとしりつつ、うそをついた。', back: 'Knowing it was wrong, I still lied.' },
        { front: '町は少しずつ変わりつつある。', reading: 'まちはすこしずつかわりつつある。', back: 'The town is gradually changing.' },
        { front: '夢は現実になりつつあった。', reading: 'ゆめはげんじつになりつつあった。', back: 'The dream was becoming reality.' }
      ]
    }
  ]
}

const N2B_COURSE: SeedCourse = {
  title: 'JLPT N2 Grammar II',
  description:
    'The rest of the N2 core — parallel change, concession, limits and the ' +
    '“might/can’t quite” family. Heavy on narration patterns.',
  level: 'N2',
  difficulty: 17,
  lessons: [
    {
      kind: 'grammar',
      title: '～につれて・～に従って — as one thing changes…',
      body: `Both link two changes moving together:

・につれて — natural co-change: 年を取るにつれて、涙もろくなる。 "As you age, you cry more easily."
・に従って（したがって） — same, plus a "following/obeying" flavor: 指示に従って行動する "act according to instructions".

Related pair: とともに "together with / at the same time as" — 春の訪れとともに "with the coming of spring" (poetic openers).

All attach to dictionary form or nouns.`,
      cards: [
        { front: '年を取るにつれて、涙もろくなる。', reading: 'としをとるにつれて、なみだもろくなる。', back: 'As you get older, you cry more easily.' },
        { front: '指示に従って行動してください。', reading: 'しじにしたがってこうどうしてください。', back: 'Please act according to instructions.' },
        { front: '春の訪れとともに、雪が解けた。', reading: 'はるのおとずれとともに、ゆきがとけた。', back: 'With the coming of spring, the snow melted.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～一方（で）・～一方だ — meanwhile / keeps on',
      body: `一方（いっぽう） "one side" builds two patterns:

1. Contrast hinge: 兄は明るい。一方、弟は無口だ。 "The older brother is cheerful. The younger, meanwhile, is quiet." Also mid-sentence: 働く一方で、大学にも通っている。
2. One-way change: dictionary form + 一方だ — "keeps getting more and more": 物価は上がる一方だ。 "Prices just keep rising."

News narration and character-comparison scenes live on this word.`,
      cards: [
        { front: '物価は上がる一方だ。', reading: 'ぶっかはあがるいっぽうだ。', back: 'Prices just keep going up.' },
        { front: '働く一方で、大学にも通っている。', reading: 'はたらくいっぽうで、だいがくにもかよっている。', back: 'While working, she also attends university.' },
        { front: '状況は悪くなる一方だった。', reading: 'じょうきょうはわるくなるいっぽうだった。', back: 'The situation just kept getting worse.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～上に — on top of that',
      body: `Plain form / noun-の + 上に（うえに） — stacks a second fact on the first, same polarity (good+good or bad+bad):

このアパートは狭い上に、家賃が高い。 — "This apartment is cramped, and on top of that the rent is high."
道に迷った上に、雨まで降ってきた。 — "We got lost, and then it even started raining."

The まで in the second clause ("even") is a frequent partner. Don't mix polarities — 美味しい上に高い sounds broken.`,
      cards: [
        { front: 'このアパートは狭い上に、家賃が高い。', reading: 'このアパートはせまいうえに、やちんがたかい。', back: 'This apartment is cramped, and the rent is high on top of it.' },
        { front: '道に迷った上に、雨まで降ってきた。', reading: 'みちにまよったうえに、あめまでふってきた。', back: 'We got lost, and then it even started raining.' },
        { front: '彼は頭がいい上に、優しい。', reading: 'かれはあたまがいいうえに、やさしい。', back: "He's smart, and kind as well." }
      ]
    },
    {
      kind: 'grammar',
      title: '～からといって — just because… doesn\'t mean',
      body: `Plain form + からといって + negative — rejects a lazy inference:

日本人だからといって、敬語が完璧なわけではない。 — "Being Japanese doesn't mean your keigo is perfect."
若いからといって、無理をするな。 — "Don't overdo it just because you're young."

The tail is usually わけではない／とは限らない ("not necessarily"). Casual contraction: からって — 子供だからって馬鹿にするな！ "Don't look down on me just because I'm a kid!"`,
      cards: [
        { front: '若いからといって、無理をするな。', reading: 'わかいからといって、むりをするな。', back: "Don't overdo it just because you're young." },
        { front: '有名だからといって、いい人とは限らない。', reading: 'ゆうめいだからといって、いいひととはかぎらない。', back: 'Being famous doesn\'t necessarily make someone a good person.' },
        { front: '子供だからって馬鹿にするな！', reading: 'こどもだからってばかにするな！', back: "Don't look down on me just because I'm a kid!" }
      ]
    },
    {
      kind: 'grammar',
      title: '～とは限らない・～ないことはない — hedged truths',
      body: `Two logic hedges:

・とは限らない（かぎらない） — "not necessarily": 高いものがいいとは限らない。 "Expensive doesn't always mean good."
・ないことはない — double negative, grudging "well, it's not impossible": 食べられないことはないけど…。 "I CAN eat it, but…"

ないことはない is the polite way to say "yes-ish, reluctantly" — read hesitation into it every time. Its cousin ないこともない is identical.`,
      cards: [
        { front: '高いものがいいとは限らない。', reading: 'たかいものがいいとはかぎらない。', back: "Expensive doesn't necessarily mean good." },
        { front: '食べられないことはないけど…。', reading: 'たべられないことはないけど…。', back: "It's not that I can't eat it, but…" },
        { front: '行けないことはないよ。', reading: 'いけないことはないよ。', back: 'I could go, I suppose.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ようがない — no way to do it',
      body: `ます-stem + ようがない — the means simply don't exist:

連絡先が分からないから、知らせようがない。 — "I don't know their contact info, so there's no way to tell them."
直しようがないほど壊れている。 — "Broken beyond any hope of fixing."

Set phrase: どうしようもない — "hopeless / nothing can be done" (also said of people: どうしようもないやつ "a hopeless case").`,
      cards: [
        { front: '連絡先が分からないから、知らせようがない。', reading: 'れんらくさきがわからないから、しらせようがない。', back: "There's no way to contact them — I don't have their info." },
        { front: 'これはもう直しようがない。', reading: 'これはもうなおしようがない。', back: "This is beyond fixing." },
        { front: 'どうしようもないな、お前は。', reading: 'どうしようもないな、おまえは。', back: "You're hopeless, you know that?" }
      ]
    },
    {
      kind: 'grammar',
      title: '～かねない・～かねる — might (bad) / can\'t quite',
      body: `Same stem, opposite signs:

・かねない — "might well (do something bad)": あいつなら、やりかねない。 "Him? He might actually do it." Only for undesirable outcomes.
・かねる — polite "can't quite / find it difficult to": お答えしかねます。 "I'm afraid I cannot answer that." (business/formal refusals)

わかりかねます is the customer-service "I wouldn't know" — cold politeness. かねない in narration is a warning light: trouble incoming.`,
      cards: [
        { front: 'あいつなら、やりかねない。', reading: 'あいつなら、やりかねない。', back: 'Knowing him, he might actually do it.' },
        { front: 'その質問にはお答えしかねます。', reading: 'そのしつもんにはおこたえしかねます。', back: "I'm afraid I cannot answer that question." },
        { front: '事故になりかねないよ。', reading: 'じこになりかねないよ。', back: 'That could well end in an accident.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～おそれがある — risk of (news style)',
      body: `Plain form / noun-の + おそれがある（恐れがある） — "there is a danger of":

台風が上陸するおそれがある。 — "The typhoon may make landfall."
津波のおそれがあります。 — "There is a risk of tsunami."

Pure broadcast/announcement register — in fiction it appears on TVs in the background, emergency broadcasts and ominous newspaper closeups. If a panel shows a TV saying おそれがある, it's foreshadowing.`,
      cards: [
        { front: '台風が上陸するおそれがある。', reading: 'たいふうがじょうりくするおそれがある。', back: 'The typhoon may make landfall.' },
        { front: '津波のおそれがあります。', reading: 'つなみのおそれがあります。', back: 'There is a risk of a tsunami.' },
        { front: '計画は失敗するおそれがある。', reading: 'けいかくはしっぱいするおそれがある。', back: 'The plan risks failure.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～に限る・～に限らず — nothing beats / not only',
      body: `限る（かぎる） "to limit" in two set shapes:

・に限る — "nothing beats": 夏はビールに限る。 "In summer, nothing beats a beer." (dictionary-form verbs too: 疲れたら寝るに限る)
・に限らず — "not limited to": 子供に限らず、大人も楽しめる。 "Not just kids — adults enjoy it too."

Bonus: に限って — "of all people/times": うちの子に限って、そんなことはしない。 "MY child would never…" (famous last words in every drama).`,
      cards: [
        { front: '夏はビールに限る。', reading: 'なつはビールにかぎる。', back: 'In summer, nothing beats a beer.' },
        { front: '子供に限らず、大人も楽しめる。', reading: 'こどもにかぎらず、おとなもたのしめる。', back: 'Not just children — adults can enjoy it too.' },
        { front: 'うちの子に限って、そんなことはしません。', reading: 'うちのこにかぎって、そんなことはしません。', back: 'MY child would never do such a thing.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～きる・～きれない — completely / can\'t fully',
      body: `ます-stem + きる — do to completion; きれない — beyond capacity:

全部食べきった。 — "I ate it ALL."
多すぎて食べきれない。 — "Too much — I can't finish it."
数えきれないほどの星 — "more stars than you could count"

Extensions: 疲れきっている "utterly exhausted", 信じきっている "trusts completely", 分かりきったこと "a foregone conclusion". The emphatic cousin of てしまう — きる stresses THOROUGHNESS.`,
      cards: [
        { front: '多すぎて食べきれないよ。', reading: 'おおすぎてたべきれないよ。', back: "It's too much — I can't finish it." },
        { front: '数えきれないほどの星が見えた。', reading: 'かぞえきれないほどのほしがみえた。', back: 'We could see more stars than you could count.' },
        { front: '彼は疲れきっていた。', reading: 'かれはつかれきっていた。', back: 'He was utterly exhausted.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ぬく — to see it through',
      body: `ます-stem + 抜く（ぬく） — push through to the very end despite hardship:

最後まで走り抜いた。 — "I ran it through to the end."
考え抜いた末の決断だ。 — "A decision reached after thinking it all the way through."
生き抜く — "to survive (against the odds)" — post-apocalypse title vocabulary.

きる says "completely"; ぬく says "endured to the finish". Sports and battle manga are fueled by やり抜く.`,
      cards: [
        { front: '最後まで走り抜いた。', reading: 'さいごまではしりぬいた。', back: 'I ran it through to the very end.' },
        { front: '考え抜いた末の決断です。', reading: 'かんがえぬいたすえのけつだんです。', back: 'It\'s a decision I reached after thinking it through completely.' },
        { front: 'この時代を生き抜くんだ。', reading: 'このじだいをいきぬくんだ。', back: "We're going to survive this era." }
      ]
    },
    {
      kind: 'grammar',
      title: '～げ — looking (sad/happy/meaningful)',
      body: `Adjective stem + げ — turns a feeling into someone's visible air; conjugates as な-adjective:

悲しげな顔 — "a sorrowful face"
不安げに空を見た。 — "(she) looked at the sky uneasily"
意味ありげ — "meaningful-looking, suggestive" (the smirk before a plot twist)

Narration-only flavor: dialogue would say 悲しそう. When VN prose describes faces — which is constantly — it reaches for げ.`,
      cards: [
        { front: '彼女は悲しげな顔をした。', reading: 'かのじょはかなしげなかおをした。', back: 'She made a sorrowful face.' },
        { front: '不安げに空を見上げた。', reading: 'ふあんげにそらをみあげた。', back: 'He looked up at the sky uneasily.' },
        { front: '彼は意味ありげに笑った。', reading: 'かれはいみありげにわらった。', back: 'He smiled meaningfully.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～まい — never again / probably not',
      body: `Dictionary form + まい — a literary negative with two faces:

1. Negative volition: 二度と行くまい。 — "I shall never go again." (internal vows!)
2. Negative conjecture: 彼は来るまい。 — "He likely won't come." (≒来ないだろう)

Set frame: ～まいと思っていた "had sworn not to…". And the reflexive combo あるまいし: 子供じゃあるまいし "you're not a child, are you" — scolding classic.

Old-fashioned in speech, alive and well in narration and dramatic monologue.`,
      cards: [
        { front: 'あんな店、二度と行くまい。', reading: 'あんなみせ、にどといくまい。', back: 'I shall never go to that place again.' },
        { front: '泣くまいと決めていたのに。', reading: 'なくまいときめていたのに。', back: "And I'd sworn I wouldn't cry…" },
        { front: '子供じゃあるまいし。', reading: 'こどもじゃあるまいし。', back: "You're not a child, you know." }
      ]
    },
    {
      kind: 'grammar',
      title: '～て以来・～てからでないと — since / not until',
      body: `Two time anchors:

・て-form + 以来（いらい） — "ever since": 卒業して以来、会っていない。 "We haven't met since graduation." (nouns too: あの日以来 "since that day" — flashback fuel)
・てからでないと + negative — "not until / unless first": 許可をもらってからでないと、入れない。 "You can't enter until you get permission."

あの日以来 opening a chapter tells you a timeskip happened — read it as a scene-change cue.`,
      cards: [
        { front: '卒業して以来、彼に会っていない。', reading: 'そつぎょうしていらい、かれにあっていない。', back: "I haven't seen him since graduation." },
        { front: 'あの日以来、全てが変わった。', reading: 'あのひいらい、すべてがかわった。', back: 'Since that day, everything changed.' },
        { front: '許可をもらってからでないと入れない。', reading: 'きょかをもらってからでないとはいれない。', back: "You can't go in until you get permission." }
      ]
    },
    {
      kind: 'grammar',
      title: '～たとたん（に） — the instant that',
      body: `た-form + とたん（に）（途端） — Y happened the moment X did; Y is sudden and usually unexpected:

ドアを開けたとたん、猫が飛び出した。 — "The instant I opened the door, the cat shot out."
顔を見たとたん、泣き出した。 — "The moment she saw his face, she burst into tears."

Only for observed events — not your own planned actions (no 家に着いたとたん勉強しよう). The manga panel-transition pattern: page turn = とたん.`,
      cards: [
        { front: 'ドアを開けたとたん、猫が飛び出した。', reading: 'ドアをあけたとたん、ねこがとびだした。', back: 'The instant I opened the door, the cat shot out.' },
        { front: '顔を見たとたん、泣き出した。', reading: 'かおをみたとたん、なきだした。', back: 'The moment she saw his face, she burst into tears.' },
        { front: '立ち上がったとたん、めまいがした。', reading: 'たちあがったとたん、めまいがした。', back: 'The second I stood up, I felt dizzy.' }
      ]
    }
  ]
}

const N1A_COURSE: SeedCourse = {
  title: 'JLPT N1 Grammar I',
  description:
    'Advanced patterns chosen for fiction first: the literary, dramatic and archaic ' +
    'grammar that fantasy manga, period pieces and VN narration are written in.',
  level: 'N1',
  difficulty: 21,
  lessons: [
    {
      kind: 'grammar',
      title: '～ものの — although',
      body: `Plain form + ものの — a written "although"; the second clause undercuts the first:

引き受けたものの、自信がない。 — "I took the job on — though I have no confidence."
免許は持っているものの、運転したことがない。 — "I have a license, but I've never actually driven."

Same family as けど/のに but bookish; the classic frame is "did the thing, but the follow-through is shaky". とはいうものの as a sentence opener = "that said, …".`,
      cards: [
        { front: '引き受けたものの、自信がない。', reading: 'ひきうけたものの、じしんがない。', back: 'I took it on, though I have no confidence.' },
        { front: '免許は持っているものの、運転したことがない。', reading: 'めんきょはもっているものの、うんてんしたことがない。', back: "I have a license, but I've never driven." },
        { front: 'とはいうものの、心配だ。', reading: 'とはいうものの、しんぱいだ。', back: 'That said, I\'m worried.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～とはいえ — that said',
      body: `X とはいえ Y — concede X, then push back with Y; more formal than でも:

春とはいえ、まだ寒い。 — "It may be spring, but it's still cold."
子供とはいえ、許されないことだ。 — "Child or not, that is unforgivable."

Reads as "admittedly X, but". As an opener: とはいえ、… "even so, …". Narrators use it to walk back their own previous sentence — watch for it at paragraph pivots.`,
      cards: [
        { front: '春とはいえ、まだ寒い。', reading: 'はるとはいえ、まださむい。', back: "It may be spring, but it's still cold." },
        { front: '子供とはいえ、許されないことだ。', reading: 'こどもとはいえ、ゆるされないことだ。', back: 'Child or not, that cannot be forgiven.' },
        { front: 'とはいえ、他に方法がない。', reading: 'とはいえ、ほかにほうほうがない。', back: "Even so, there's no other way." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ときたら — when it comes to (exasperated)',
      body: `Noun + ときたら — raises a topic you're about to complain about, usually someone close:

うちの息子ときたら、ゲームばかりしている。 — "That son of mine — nothing but games."
最近の天気ときたら。 — "This weather lately, honestly." (trailing = the complaint is self-evident)

Strictly conversational and emotional — the fed-up parent/roommate/teammate particle. Compare neutral は: swapping ときたら in loads the sentence with an eye-roll.`,
      cards: [
        { front: 'うちの息子ときたら、ゲームばかりしている。', reading: 'うちのむすこときたら、ゲームばかりしている。', back: 'That son of mine — nothing but games.' },
        { front: '最近の天気ときたら…。', reading: 'さいきんのてんきときたら…。', back: 'This weather lately, honestly…' },
        { front: 'あいつときたら、また遅刻だ。', reading: 'あいつときたら、またちこくだ。', back: 'That guy — late AGAIN.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～たところで — even if (it\'s futile)',
      body: `た-form + ところで + negative — "even if you did, it wouldn't help":

今さら謝ったところで、許してもらえない。 — "Apologizing now won't get you forgiven."
急いだところで、間に合わない。 — "Even hurrying, we won't make it."

Built-in pessimism — the villain's taunt and the cynic's shrug: 逃げたところで無駄だ。 "Running is pointless." Compare neutral ても: たところで adds "and it's hopeless".`,
      cards: [
        { front: '今さら謝ったところで、遅い。', reading: 'いまさらあやまったところで、おそい。', back: "It's too late to apologize now." },
        { front: '逃げたところで無駄だ。', reading: 'にげたところでむだだ。', back: 'Running is pointless.' },
        { front: '急いだところで、間に合わないよ。', reading: 'いそいだところで、まにあわないよ。', back: "Even if we hurry, we won't make it." }
      ]
    },
    {
      kind: 'grammar',
      title: '～んばかり — as if about to',
      body: `ない-stem + んばかり(に/の) — on the very verge, visibly:

泣かんばかりの顔 — "a face on the verge of tears"
今にも殴りかからんばかりだった。 — "looked ready to throw a punch any second"
する → せんばかり.

Pure narration — it paints the held moment before an action that (usually) doesn't come. VN prose about faces and atmosphere leans on it; think of it as そう(appearance) with the intensity dial at maximum.`,
      cards: [
        { front: '彼女は泣かんばかりの顔をしていた。', reading: 'かのじょはなかんばかりのかおをしていた。', back: 'Her face looked ready to burst into tears.' },
        { front: '今にも殴りかからんばかりだった。', reading: 'いまにもなぐりかからんばかりだった。', back: 'He looked about to throw a punch any second.' },
        { front: '溢れんばかりの拍手が起こった。', reading: 'あふれんばかりのはくしゅがおこった。', back: 'Overflowing applause broke out.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～かのように — as if',
      body: `Plain form + かのように — describes something in terms of what it ISN'T (but resembles):

何事もなかったかのように、彼は笑った。 — "He smiled as if nothing had happened."
時間が止まったかのようだった。 — "It was as though time had stopped."

Before nouns: かのような + noun. The narrator's favorite simile machine — every dramatic VN scene has one 〜かのように. Plain ように compares; かのように insists the comparison is counterfactual.`,
      cards: [
        { front: '何事もなかったかのように、彼は笑った。', reading: 'なにごともなかったかのように、かれはわらった。', back: 'He smiled as if nothing had happened.' },
        { front: '時間が止まったかのようだった。', reading: 'じかんがとまったかのようだった。', back: 'It was as though time had stopped.' },
        { front: '夢の中にいるかのような気分だ。', reading: 'ゆめのなかにいるかのようなきぶんだ。', back: 'I feel as if I were inside a dream.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～まみれ・～だらけ・～ずくめ — covered in',
      body: `Three "full of" suffixes with different textures:

・だらけ — strewn with (broadest): 間違いだらけ "riddled with mistakes", 傷だらけ "covered in wounds".
・まみれ — smeared with something wet/dirty sticking to a surface: 血まみれ, 泥まみれ, 汗まみれ.
・ずくめ — uniformly of one kind (often clothes/events): 黒ずくめの男 "a man dressed all in black", いいことずくめ "nothing but good things".

Battle-manga triage: 傷だらけ (scraped up) < 血まみれ (bloodbath). 黒ずくめ is practically a mystery-series character class.`,
      cards: [
        { front: '彼は血まみれで立っていた。', reading: 'かれはちまみれでたっていた。', back: 'He stood there covered in blood.' },
        { front: 'この答案は間違いだらけだ。', reading: 'このとうあんはまちがいだらけだ。', back: 'This answer sheet is riddled with mistakes.' },
        { front: '黒ずくめの男が現れた。', reading: 'くろずくめのおとこがあらわれた。', back: 'A man dressed all in black appeared.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～めく — tinged with',
      body: `Noun + めく — takes on the air of; conjugates as a Group-1 verb, usually seen as めいた/めいて:

謎めいた微笑 — "an enigmatic smile"
春めいてきた。 — "It's starting to feel like spring."
皮肉めいた言い方 — "a sarcasm-tinged way of putting it"

Small productive set (春・謎・皮肉・冗談・脅し…), but 謎めいた alone earns the lesson: it's attached to every mysterious transfer student in fiction.`,
      cards: [
        { front: '彼女は謎めいた微笑を浮かべた。', reading: 'かのじょはなぞめいたびしょうをうかべた。', back: 'She wore an enigmatic smile.' },
        { front: 'だいぶ春めいてきたね。', reading: 'だいぶはるめいてきたね。', back: "It's really starting to feel like spring." },
        { front: '脅しめいた手紙が届いた。', reading: 'おどしめいたてがみがとどいた。', back: 'A threatening-sounding letter arrived.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～たる者 — one who would be…',
      body: `Noun + たる者（もの） — "anyone worthy of being called X" — sets a standard, then demands conduct:

王たる者、民を守らねばならない。 — "A king worthy of the name must protect his people."
プロたる者、言い訳をするな。 — "You call yourself a pro? No excuses."

たる is classical だ. This is SPEECH grammar — mentors, knights, proud rivals. If a character says たる者, they are about to lecture someone about duty.`,
      cards: [
        { front: '王たる者、民を守らねばならない。', reading: 'おうたるもの、たみをまもらねばならない。', back: 'A king worthy of the name must protect his people.' },
        { front: 'プロたる者、言い訳をするな。', reading: 'プロたるもの、いいわけをするな。', back: 'One who calls himself a pro makes no excuses.' },
        { front: '騎士たる者の務めだ。', reading: 'きしたるもののつとめだ。', back: 'It is the duty of a knight.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～べく・～べからず — in order to / thou shalt not',
      body: `Classical べし survives in three fossils:

・べく — "in order to" (formal narration): 敵を倒すべく、彼は旅に出た。 "He set out to defeat the enemy."
・べからず — prohibition on signs: 立入るべからず "No Entry", 忘るべからず "never forget".
・べからざる + noun: 許すべからざる行為 "an unforgivable act".

する → すべく. You'll meet べく in chapter openers and quest narration; べからず on old signs, dojo walls and anywhere the art wants to look antique.`,
      cards: [
        { front: '敵を倒すべく、彼は旅に出た。', reading: 'てきをたおすべく、かれはたびにでた。', back: 'He set out on a journey to defeat the enemy.' },
        { front: '立入るべからず。', reading: 'たちいるべからず。', back: 'No entry. (archaic sign)' },
        { front: 'それは許すべからざる行為だ。', reading: 'それはゆるすべからざるこういだ。', back: 'That is an unforgivable act.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～まじき — unbecoming of',
      body: `Classical negative of べし: あるまじき — "that must not be":

教師にあるまじき行為 — "conduct unbecoming of a teacher"
許すまじ！ — "Unforgivable!" (the raw classical form, shouted)

Pattern: noun + に + あるまじき + noun. Rare in real life, standard in fiction: scandal headlines, oath-swearing, and the clenched-fist 許すまじ. Recognize it; never produce it in conversation.`,
      cards: [
        { front: '教師にあるまじき行為だ。', reading: 'きょうしにあるまじきこういだ。', back: 'Conduct unbecoming of a teacher.' },
        { front: '許すまじ！', reading: 'ゆるすまじ！', back: 'Unforgivable! (archaic)' },
        { front: '騎士にあるまじき振る舞いだぞ。', reading: 'きしにあるまじきふるまいだぞ。', back: 'Behavior unbecoming of a knight!' }
      ]
    },
    {
      kind: 'grammar',
      title: '～(よ)うが・～(よ)うと — no matter what',
      body: `Volitional + が/と — "whether/no matter": the defiance conjugation:

誰が何と言おうと、俺は行く。 — "No matter what anyone says, I'm going."
何があろうと、君を守る。 — "Whatever happens, I'll protect you."
雨が降ろうが槍が降ろうが — "come rain or spears" (set idiom)

Paired opposites: 泣こうが笑おうが "cry or laugh, (it changes nothing)". This is THE dramatic-vow construction — climax dialogue guaranteed.`,
      cards: [
        { front: '誰が何と言おうと、俺は行く。', reading: 'だれがなんといおうと、おれはいく。', back: "No matter what anyone says, I'm going." },
        { front: '何があろうと、君を守る。', reading: 'なにがあろうと、きみをまもる。', back: "Whatever happens, I'll protect you." },
        { front: '雨が降ろうが槍が降ろうが、行くぞ。', reading: 'あめがふろうがやりがふろうが、いくぞ。', back: "Come rain or spears, we're going." }
      ]
    },
    {
      kind: 'grammar',
      title: '～ぬ・～ん・～ねばならぬ — the archaic negative',
      body: `Classical ぬ = ない, alive in fiction:

・知らぬ, 分からぬ, 許さぬ — old-fashioned/haughty ない: そんなことは知らぬ。
・West-Japan/casual ん: 知らん, 分からん, できん — everyday in Kansai speech.
・ねばならぬ／ねばならない — archaic must: 行かねばならぬ。 "I must go."

Character decoder: ぬ = samurai, nobles, dragons; ん = Kansai folk and gruff old men. Same negative, totally different costume. する → せぬ／せん.`,
      cards: [
        { front: 'そんなことは知らぬ。', reading: 'そんなことはしらぬ。', back: 'I know nothing of that. (archaic)' },
        { front: 'わしにも分からん。', reading: 'わしにもわからん。', back: "Beats me either. (old man / Kansai)" },
        { front: '行かねばならぬ。', reading: 'いかねばならぬ。', back: 'I must go. (archaic)' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ごとき・～ごとく — the likes of / like (classical)',
      body: `Classical ようだ. Two very different jobs:

1. Contempt (dialogue): noun + ごとき — "the likes of": お前ごときが俺に勝てるか！ "You think the LIKES OF YOU can beat me?!" Self-deprecating too: 私ごとき "someone as lowly as me".
2. Simile (narration): ごとく = のように: 矢のごとく飛んで行った。 "flew off like an arrow"; 氷のごとき視線 "a gaze like ice".

Villain arrogance and epic narration in one classical package — you cannot read battle manga without ごとき.`,
      cards: [
        { front: 'お前ごときが俺に勝てるか！', reading: 'おまえごときがおれにかてるか！', back: 'You think the likes of YOU can beat me?!' },
        { front: '矢のごとく飛んで行った。', reading: 'やのごとくとんでいった。', back: 'It flew off like an arrow.' },
        { front: '私ごときがお役に立てるなら。', reading: 'わたしごときがおやくにたてるなら。', back: 'If someone as humble as I can be of use…' }
      ]
    },
    {
      kind: 'grammar',
      title: '～なり — the moment / or something',
      body: `Two useful なり:

1. Dictionary form + なり — "the instant" (even tighter than とたん, same subject both clauses): 家に帰るなり、寝てしまった。 "The moment he got home, he crashed."
2. X なり Y なり — "X or Y or whatever": 電話するなりメールするなり、連絡して。 "Call, text, whatever — just contact me."

Bonus fossil: 大なり小なり "to a greater or lesser degree". The "instant" なり is pure narration; the "or" なり is impatient advice.`,
      cards: [
        { front: '家に帰るなり、寝てしまった。', reading: 'いえにかえるなり、ねてしまった。', back: 'The moment he got home, he crashed.' },
        { front: '電話するなりメールするなり、連絡して。', reading: 'でんわするなりメールするなり、れんらくして。', back: 'Call or text or whatever — just get in touch.' },
        { front: '顔を見るなり、泣き出した。', reading: 'かおをみるなり、なきだした。', back: 'The instant she saw his face, she burst into tears.' }
      ]
    }
  ]
}

const N1B_COURSE: SeedCourse = {
  title: 'JLPT N1 Grammar II',
  description:
    'The last stretch: emphasis, extremity and formality — はおろか, 極まりない, ' +
    'ならでは and friends. Finish this and no grammar in a manga or VN should stop you.',
  level: 'N1',
  difficulty: 22,
  lessons: [
    {
      kind: 'grammar',
      title: '～ばこそ — precisely because',
      body: `ば-form + こそ — flips a burden into devotion: the reason is exactly the positive one:

君のためを思えばこそ、厳しくするんだ。 — "It's precisely BECAUSE I care about you that I'm strict."
愛していればこそ、別れを選んだ。 — "Because I loved her — that's why I chose to part."

Formal/emotional; the sentence often ends in んだ. This is the stern-mentor and tragic-lover pattern — the emotional reveal that recolors earlier harshness.`,
      cards: [
        { front: '君のためを思えばこそ、厳しくするんだ。', reading: 'きみのためをおもえばこそ、きびしくするんだ。', back: "It's precisely because I care about you that I'm strict." },
        { front: '愛していればこそ、別れを選んだ。', reading: 'あいしていればこそ、わかれをえらんだ。', back: 'Precisely because I loved her, I chose to part.' },
        { front: '信じていればこそ、待てるんだ。', reading: 'しんじていればこそ、まてるんだ。', back: "It's because I believe in him that I can wait." }
      ]
    },
    {
      kind: 'grammar',
      title: '～すら・～だに — even (literary)',
      body: `Two literary escalations of さえ/も:

・すら — "even": 名前すら知らない。 "I don't even know their name." 子供ですら分かる。 "Even a child gets it."
・だに — "even (to merely)": frozen pairs — 想像するだに恐ろしい "terrifying even to imagine"; 微動だにしない "doesn't budge an inch"; 一顧だにしない "doesn't spare a glance".

すら is productive; だに lives in those set phrases. 微動だにしない is the stock description of an unbeatable opponent standing still.`,
      cards: [
        { front: '彼の名前すら知らない。', reading: 'かれのなまえすらしらない。', back: "I don't even know his name." },
        { front: '想像するだに恐ろしい。', reading: 'そうぞうするだにおそろしい。', back: 'Terrifying even to imagine.' },
        { front: '彼は微動だにしなかった。', reading: 'かれはびどうだにしなかった。', back: "He didn't budge an inch." }
      ]
    },
    {
      kind: 'grammar',
      title: '～いかんによって（は） — depending on',
      body: `Noun(+の) + いかん — "the how/what of it" (formal 如何):

結果いかんによっては、計画を変更する。 — "Depending on the results, we may change the plan."
理由のいかんを問わず — "regardless of the reason" (rules and contracts)
成功するかどうかは、努力いかんだ。 — "Success depends on effort."

Bureaucrat and commander register — briefing rooms, terms of service, military fantasy war councils.`,
      cards: [
        { front: '結果いかんによっては、計画を変更する。', reading: 'けっかいかんによっては、けいかくをへんこうする。', back: 'Depending on the results, we may change the plan.' },
        { front: '理由のいかんを問わず、遅刻は遅刻だ。', reading: 'りゆうのいかんをとわず、ちこくはちこくだ。', back: 'Regardless of the reason, late is late.' },
        { front: '合否は努力いかんだ。', reading: 'ごうひはどりょくいかんだ。', back: 'Pass or fail depends on your effort.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ならでは — unique to',
      body: `Noun + ならでは(の) — a quality ONLY that thing could produce; always positive:

京都ならではの風景 — "scenery you'll only find in Kyoto"
手作りならではの温かさ — "a warmth only handmade things have"
彼ならではの発想だ。 — "An idea only he could have."

Advertising and praise language. In fiction it's the compliment pattern: 職人ならではの技 "craftsmanship only a master has".`,
      cards: [
        { front: 'これは京都ならではの風景だ。', reading: 'これはきょうとならではのふうけいだ。', back: "This is scenery you'll only find in Kyoto." },
        { front: '手作りならではの温かさがある。', reading: 'てづくりならではのあたたかさがある。', back: 'It has a warmth only handmade things have.' },
        { front: '彼ならではの発想だ。', reading: 'かれならではのはっそうだ。', back: 'An idea only he could have come up with.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～をもって — by means of / as of (formal)',
      body: `Noun + をもって（を以て） — formal instrument or cutoff:

・means: 実力をもって証明する。 "I'll prove it with my own strength." 身をもって知る "learn firsthand (the hard way)".
・cutoff: 本日をもって閉店いたします。 "As of today, we are closing."

これをもって… closes ceremonies ("herewith"). Fantasy duels love 力をもって "by force"; store-closing notices and final chapters love 本日をもって.`,
      cards: [
        { front: '実力をもって証明してみせる。', reading: 'じつりょくをもってしょうめいしてみせる。', back: "I'll prove it with my own strength." },
        { front: '本日をもって閉店いたします。', reading: 'ほんじつをもってへいてんいたします。', back: 'As of today, this store is closing.' },
        { front: 'その痛みなら身をもって知っている。', reading: 'そのいたみならみをもってしっている。', back: 'I know that pain firsthand.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～に至って（は） — when it comes to / to the point of',
      body: `至る（いたる） "to reach" builds several "arrival at an extreme" patterns:

・に至っては — picking the worst example: 弟に至っては、挨拶さえしない。 "As for my younger brother, he doesn't even say hello."
・に至るまで — "down to the last": 髪の色に至るまで同じだ "identical down to hair color".
・(verb)に至った — formally "came to the point of": 閉店に至った "ended in closure".

The escalation ladder of formal complaint — each variant walks further down the list of grievances.`,
      cards: [
        { front: '弟に至っては、挨拶さえしない。', reading: 'おとうとにいたっては、あいさつさえしない。', back: "As for my little brother, he doesn't even say hello." },
        { front: '髪の色に至るまで同じだった。', reading: 'かみのいろにいたるまでおなじだった。', back: 'They were identical, down to their hair color.' },
        { front: '店は閉店に至った。', reading: 'みせはへいてんにいたった。', back: 'The store ended up closing.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～極まりない・～の極み — extremely / the height of',
      body: `極（きょく/きわ） "extreme" in two exclamation molds:

・な-adj stem + 極まりない: 失礼極まりない！ "the height of rudeness!"; 危険極まりない "extremely dangerous". (極まる without ない exists too: 感極まって "overcome with emotion")
・noun + の極み: 贅沢の極み "the pinnacle of luxury"; 痛恨の極み "bitterest regret" (politician-apology set phrase).

High-register indignation — the offended noble's vocabulary.`,
      cards: [
        { front: '失礼極まりない態度だ！', reading: 'しつれいきわまりないたいどだ！', back: 'The height of rudeness!' },
        { front: 'それは危険極まりない行為だ。', reading: 'それはきけんきわまりないこういだ。', back: 'That is an extremely dangerous act.' },
        { front: '感極まって泣いてしまった。', reading: 'かんきわまってないてしまった。', back: 'Overcome with emotion, I cried.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～てからというもの — ever since (and everything changed)',
      body: `て-form + からというもの — "ever since X, (a continuing change)":

彼女に出会ってからというもの、毎日が楽しい。 — "Ever since I met her, every day has been fun."
あの事件があってからというもの、街は変わってしまった。 — "Ever since the incident, the town hasn't been the same."

Heavier than て以来: it insists the change persists to now. First-line-of-a-chapter grammar — it announces "this is the after".`,
      cards: [
        { front: '彼女に出会ってからというもの、毎日が楽しい。', reading: 'かのじょにであってからというもの、まいにちがたのしい。', back: 'Ever since I met her, every day has been fun.' },
        { front: 'あの日からというもの、眠れない夜が続いている。', reading: 'あのひからというもの、ねむれないよるがつづいている。', back: 'Ever since that day, the sleepless nights have continued.' },
        { front: '引っ越してからというもの、体の調子がいい。', reading: 'ひっこしてからというもの、からだのちょうしがいい。', back: 'Ever since moving, I\'ve felt great.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ともなると — when you get to (that level)',
      body: `Noun + ともなると／ともなれば — "once it's a matter of (that scale), things differ":

プロともなると、練習量が違う。 — "At the pro level, the amount of practice is on another plane."
大晦日ともなると、この街も静かになる。 — "Come New Year's Eve, even this town goes quiet."

Sets a threshold and remarks on what naturally follows at it. Sports commentary, sensei-explanations, tournament arcs.`,
      cards: [
        { front: 'プロともなると、練習量が違う。', reading: 'プロともなると、れんしゅうりょうがちがう。', back: 'At the pro level, the amount of practice is something else.' },
        { front: '大晦日ともなると、街も静かになる。', reading: 'おおみそかともなると、まちもしずかになる。', back: "Come New Year's Eve, the town goes quiet." },
        { front: '決勝ともなれば、緊張もする。', reading: 'けっしょうともなれば、きんちょうもする。', back: "When it's the finals, of course you get nervous." }
      ]
    },
    {
      kind: 'grammar',
      title: '～はおろか — let alone',
      body: `X はおろか Y さえ/も + negative — "never mind X, not even Y":

漢字はおろか、ひらがなも読めなかった。 — "He couldn't read hiragana, let alone kanji."
貯金はおろか、家賃も払えない。 — "Rent is beyond me, never mind savings."

Order: the harder thing first, the easier thing second, both failed. The despair-inventory pattern — rock-bottom narration compresses beautifully into it.`,
      cards: [
        { front: '漢字はおろか、ひらがなも読めなかった。', reading: 'かんじはおろか、ひらがなもよめなかった。', back: "He couldn't even read hiragana, let alone kanji." },
        { front: '貯金はおろか、家賃も払えない。', reading: 'ちょきんはおろか、やちんもはらえない。', back: "I can't even pay rent, never mind save money." },
        { front: '歩くことはおろか、立つことさえできない。', reading: 'あるくことはおろか、たつことさえできない。', back: "He can't even stand, let alone walk." }
      ]
    },
    {
      kind: 'grammar',
      title: '～つ～つ — back and forth (literary)',
      body: `ます-stem + つ, twice — two actions alternating; a small set of fixed pairs:

・行きつ戻りつ — pacing back and forth
・浮きつ沈みつ — bobbing up and down
・抜きつ抜かれつ — neck and neck (races!)
・持ちつ持たれつ — give and take, mutual support

Purely literary; you'll meet it in narration and chapter titles. 抜きつ抜かれつの接戦 "a seesaw battle" is the sports-manga standard.`,
      cards: [
        { front: '彼は部屋を行きつ戻りつしていた。', reading: 'かれはへやをいきつもどりつしていた。', back: 'He paced back and forth in the room.' },
        { front: '抜きつ抜かれつの接戦だった。', reading: 'ぬきつぬかれつのせっせんだった。', back: 'It was a neck-and-neck race.' },
        { front: '世の中は持ちつ持たれつだ。', reading: 'よのなかはもちつもたれつだ。', back: 'The world runs on give and take.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～んがため — for the sake of (archaic purpose)',
      body: `ない-stem + んがため(に) — classical ために, deadly serious:

生きんがために、彼は何でもした。 — "To survive, he did whatever it took."
勝たんがための犠牲 — "sacrifices made for the sake of victory"
する → せんがため.

The stakes-raising purpose form: where ために states a goal, んがため implies desperation. Villain origin stories and war narration.`,
      cards: [
        { front: '生きんがために、彼は何でもした。', reading: 'いきんがために、かれはなんでもした。', back: 'To survive, he did whatever it took.' },
        { front: '勝たんがための犠牲だった。', reading: 'かたんがためのぎせいだった。', back: 'They were sacrifices for the sake of victory.' },
        { front: '真実を知らんがため、ここに来た。', reading: 'しんじつをしらんがため、ここにきた。', back: 'I came here to learn the truth.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ん(ばかり)・～う(ものなら) — if you dare',
      body: `ものなら — two dares built on it:

・potential + ものなら — "if (you think) you can": 逃げられるものなら、逃げてみろ。 "Escape — if you can."
・volitional + ものなら — "if (I) so much as": 遅れようものなら、大目玉だ。 "Be late even once and there'll be hell to pay."

The first is taunt grammar (villains); the second is dread grammar (strict households, military academies). Both signal power imbalance in a single clause.`,
      cards: [
        { front: '逃げられるものなら、逃げてみろ。', reading: 'にげられるものなら、にげてみろ。', back: 'Escape — if you can.' },
        { front: '遅れようものなら、大目玉だ。', reading: 'おくれようものなら、おおめだまだ。', back: "Be late even once and there'll be hell to pay." },
        { front: 'できるものなら、やり直したい。', reading: 'できるものなら、やりなおしたい。', back: 'If only I could, I\'d do it all over.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～ところを — right when (interrupted)',
      body: `Plain form + ところを — catches someone mid-state, usually to interrupt:

お忙しいところをすみません。 — "Sorry to bother you when you're busy." (the universal polite opener)
逃げようとしたところを捕まった。 — "He was caught just as he tried to flee."
危ないところを助けられた。 — "I was saved in the nick of time."

The を marks the scene itself as the object of what follows. Set opener + action-scene pivot in one pattern.`,
      cards: [
        { front: 'お忙しいところをすみません。', reading: 'おいそがしいところをすみません。', back: "Sorry to bother you when you're busy." },
        { front: '逃げようとしたところを捕まった。', reading: 'にげようとしたところをつかまった。', back: 'He was caught just as he tried to run.' },
        { front: '危ないところを助けてもらった。', reading: 'あぶないところをたすけてもらった。', back: 'I was saved in the nick of time.' }
      ]
    },
    {
      kind: 'grammar',
      title: '～と思いきや — or so I thought',
      body: `Plain form + と思いきや（おもいきや） — sets up an expectation, then yanks it away:

勝ったと思いきや、逆転された。 — "I thought we'd won — then they turned it around."
静かだと思いきや、大騒ぎだった。 — "Quiet? It was pandemonium."

Comedy timing in grammar form: the panel-to-panel bait-and-switch. Congratulations — with this and the rest of the path, no grammar between you and raw manga should be a wall anymore. 続きは、読むだけだ。`,
      cards: [
        { front: '勝ったと思いきや、逆転された。', reading: 'かったとおもいきや、ぎゃくてんされた。', back: "I thought we'd won — then they flipped it." },
        { front: '静かだと思いきや、大騒ぎだった。', reading: 'しずかだとおもいきや、おおさわぎだった。', back: 'Quiet? It was total chaos.' },
        { front: '晴れると思いきや、大雨になった。', reading: 'はれるとおもいきや、おおあめになった。', back: 'I expected it to clear up — instead it poured.' }
      ]
    }
  ]
}

// Inserts one pack's course if its flag is absent. Flags live in settings
// rather than on the course row, so deleting or renaming a course never
// re-seeds it.
function seedPack(sqlite: Database.Database, flag: string, course: SeedCourse): void {
  const seeded = sqlite.prepare('SELECT value FROM settings WHERE key = ?').get(flag)
  if (seeded) return

  const insertCourse = sqlite.prepare(
    'INSERT INTO jp_course (title, description, level, difficulty, sort_order) VALUES (?, ?, ?, ?, ?)'
  )
  const insertLesson = sqlite.prepare(
    'INSERT INTO jp_lesson (course_id, kind, title, body, sort_order) VALUES (?, ?, ?, ?, ?)'
  )
  const insertCard = sqlite.prepare(
    `INSERT INTO jp_card (lesson_id, sort_order, front, reading, back, pos, notes,
                          onyomi, kunyomi, example_jp, example_reading, example_en)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )

  const tx = sqlite.transaction(() => {
    const next = (
      sqlite.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_course').get() as {
        next: number
      }
    ).next
    const courseId = Number(
      insertCourse.run(course.title, course.description, course.level, course.difficulty, next)
        .lastInsertRowid
    )
    course.lessons.forEach((lesson, li) => {
      const lessonId = Number(
        insertLesson.run(courseId, lesson.kind, lesson.title, lesson.body ?? null, li).lastInsertRowid
      )
      lesson.cards.forEach((card, ci) => {
        insertCard.run(
          lessonId,
          ci,
          card.front,
          card.reading ?? null,
          card.back,
          card.pos ?? null,
          card.notes ?? null,
          card.onyomi ?? null,
          card.kunyomi ?? null,
          card.exampleJp ?? null,
          card.exampleReading ?? null,
          card.exampleEn ?? null
        )
      })
    })
    sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(flag, '1')
  })
  tx()
}

// Courses seeded before level/difficulty existed carry NULLs — stamp them by
// their original titles, once. Renamed courses are skipped (level stays NULL,
// editable in the course form); the flag stops this from re-running forever.
function backfillLevels(sqlite: Database.Database): void {
  const done = sqlite
    .prepare('SELECT value FROM settings WHERE key = ?')
    .get('japanese.seeded.levels')
  if (done) return
  const stamp = sqlite.prepare(
    'UPDATE jp_course SET level = ?, difficulty = ? WHERE title = ? AND level IS NULL AND difficulty IS NULL'
  )
  const tx = sqlite.transaction(() => {
    for (const c of ALL_PACKS) stamp.run(c.course.level, c.course.difficulty, c.course.title)
    sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded.levels', '1')
  })
  tx()
}

// Study-path order (difficulty = step). The 2026-07-05 wave (radicals,
// counters, SFX, speech styles, idioms) slotted INTO the existing path, so the
// original packs were renumbered — reorderSteps() migrates live DBs.
const ALL_PACKS: { flag: string; course: SeedCourse }[] = [
  { flag: 'japanese.seeded', course: N5_COURSE }, // 1
  { flag: 'japanese.seeded.radicals', course: RADICALS_COURSE }, // 2
  { flag: 'japanese.seeded.kanji', course: N5_KANJI_COURSE }, // 3
  { flag: 'japanese.seeded.casual', course: CASUAL_COURSE }, // 4
  { flag: 'japanese.seeded.counters', course: COUNTERS_COURSE }, // 5
  { flag: 'japanese.seeded.n4', course: N4_COURSE }, // 6
  { flag: 'japanese.seeded.n4vocab', course: N4_VOCAB_COURSE }, // 7
  { flag: 'japanese.seeded.n4kanji', course: N4_KANJI_COURSE }, // 8
  { flag: 'japanese.seeded.sfx', course: SFX_COURSE }, // 9
  { flag: 'japanese.seeded.casual2', course: CASUAL2_COURSE }, // 10
  { flag: 'japanese.seeded.n3', course: N3_COURSE }, // 11
  { flag: 'japanese.seeded.n3b', course: N3B_COURSE }, // 12
  { flag: 'japanese.seeded.n3vocab', course: N3_VOCAB_COURSE }, // 13
  { flag: 'japanese.seeded.n3kanji', course: N3_KANJI_COURSE }, // 14
  { flag: 'japanese.seeded.speech', course: SPEECH_COURSE }, // 15
  { flag: 'japanese.seeded.n2a', course: N2A_COURSE }, // 16
  { flag: 'japanese.seeded.n2b', course: N2B_COURSE }, // 17
  { flag: 'japanese.seeded.n2vocab', course: N2_VOCAB_COURSE }, // 18
  { flag: 'japanese.seeded.n2kanji', course: N2_KANJI_COURSE }, // 19
  { flag: 'japanese.seeded.idioms', course: IDIOMS_COURSE }, // 20
  { flag: 'japanese.seeded.n1a', course: N1A_COURSE }, // 21
  { flag: 'japanese.seeded.n1b', course: N1B_COURSE }, // 22
  { flag: 'japanese.seeded.n1vocab', course: N1_VOCAB_COURSE }, // 23
  { flag: 'japanese.seeded.n1kanji', course: N1_KANJI_COURSE } // 24
]

// The 2026-07-05 renumbering, applied once to DBs seeded under the old 1–15
// layout. Matched by ORIGINAL title + OLD step so renamed or user-re-numbered
// courses are left alone (same policy as backfillLevels). New step values come
// from the pack definitions, keeping this table one-sided.
const STEP_REORDER: [title: string, oldStep: number][] = [
  ['JLPT N5 Kanji', 2],
  ['Manga & VN Japanese', 3],
  ['JLPT N4 Grammar', 4],
  ['JLPT N4 Vocabulary', 5],
  ['JLPT N4 Kanji', 6],
  ['Manga & VN Japanese II', 7],
  ['JLPT N3 Grammar I', 8],
  ['JLPT N3 Grammar II', 9],
  ['JLPT N3 Vocabulary', 10],
  ['JLPT N3 Kanji Essentials', 11],
  ['JLPT N2 Grammar I', 12],
  ['JLPT N2 Grammar II', 13],
  ['JLPT N1 Grammar I', 14],
  ['JLPT N1 Grammar II', 15]
]

function reorderSteps(sqlite: Database.Database): void {
  const done = sqlite
    .prepare('SELECT value FROM settings WHERE key = ?')
    .get('japanese.seeded.order2')
  if (done) return
  const move = sqlite.prepare(
    'UPDATE jp_course SET difficulty = ? WHERE title = ? AND difficulty = ?'
  )
  const tx = sqlite.transaction(() => {
    for (const [title, oldStep] of STEP_REORDER) {
      const pack = ALL_PACKS.find((p) => p.course.title === title)
      if (pack) move.run(pack.course.difficulty, title, oldStep)
    }
    sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded.order2', '1')
  })
  tx()
}

// The 2026-07-27 renumbering: the N2 and N1 vocabulary/kanji packs slot in
// beside their grammar packs, pushing Idioms and the two N1 grammar courses
// down. Same one-sided policy as STEP_REORDER — matched by ORIGINAL title +
// OLD step, so a course the user renamed or renumbered is left alone.
const STEP_REORDER2: [title: string, oldStep: number][] = [
  ['Idioms & Set Phrases (慣用句)', 18],
  ['JLPT N1 Grammar I', 19],
  ['JLPT N1 Grammar II', 20]
]

function reorderSteps2(sqlite: Database.Database): void {
  const done = sqlite
    .prepare('SELECT value FROM settings WHERE key = ?')
    .get('japanese.seeded.order3')
  if (done) return
  const move = sqlite.prepare(
    'UPDATE jp_course SET difficulty = ? WHERE title = ? AND difficulty = ?'
  )
  const tx = sqlite.transaction(() => {
    // Highest step first: moving Idioms 18→20 before N1 Grammar II leaves 20,
    // so walking the table in reverse keeps every step unoccupied on arrival.
    for (const [title, oldStep] of [...STEP_REORDER2].reverse()) {
      const pack = ALL_PACKS.find((p) => p.course.title === title)
      if (pack) move.run(pack.course.difficulty, title, oldStep)
    }
    sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('japanese.seeded.order3', '1')
  })
  tx()
}

export function seedJapanese(sqlite: Database.Database): void {
  // Renumber BEFORE seeding so the new packs never share a step with a course
  // still carrying its old number.
  backfillLevels(sqlite)
  reorderSteps(sqlite)
  reorderSteps2(sqlite)
  for (const p of ALL_PACKS) seedPack(sqlite, p.flag, p.course)
}
