import type { EnPassage } from './types'

// Reading passages, second set (+12, spread with the first set in
// passages.ts). Same rules as set 1: C1/C2, 250-450 words, 5-6 questions
// across the five kinds, Markdown-safe text. Keys FROZEN.
export const EN_PASSAGES_SET2: EnPassage[] = [
  {
    key: 'the-half-life-of-a-recipe',
    title: 'The Half-Life of a Recipe',
    topic: 'Food',
    level: 'C1',
    text: `A recipe looks like an instruction and behaves like a rumour. It is copied, misremembered,
adapted to whatever the shop actually had, and handed on with the serene confidence of
someone who has never wondered where it came from. The printed version freezes one
transmission of the rumour and then, because it is printed, acquires an authority the
rumour never had.

The histories bear this out with some regularity. Tempura descends from the fritters
Portuguese missionaries were eating on their fast days in sixteenth-century Nagasaki; the
tomato reached Italy at roughly the same moment and waited the better part of two centuries
before anybody with a kitchen took it seriously. Chicken tikka masala is claimed by Glasgow,
disputed by Delhi, and eaten by everybody, which is a fair summary of how these things
usually go.

Against this stands the purist, and the purist is not simply ridiculous. There is a
difference between a dish that has changed and a dish that has been hollowed out for an
export market, and anyone who has been served sweetened miso soup in a foreign airport
knows which is which. But it is worth noticing when the rules were written. The Neapolitan
pizza specification, the campaigns against cream in carbonara, the protected-origin
paperwork: these are recent documents, and they are almost always defensive, drawn up at the
point when a local dish became a global one and its makers wanted a say in what travelled
under the name.

That is a reasonable thing to want. It is not the same as having discovered the true
version. Authenticity of this kind is a snapshot mistaken for a lineage, one frame of a long
film held up as the film itself, and the frame chosen is generally the one from somebody's
childhood. The dishes that survive are, with very few exceptions, the ones that proved
willing to change; the ones that refused are in cookbooks nobody opens. A recipe is not a
score to be performed faithfully. It is a working hypothesis about what will taste good, and
it is revised by everyone who cooks it.`,
    questions: [
      {
        prompt: 'Which statement best captures the main argument of the passage?',
        kind: 'main-idea',
        options: [
          'Traditional dishes are being steadily degraded by adaptation for export markets.',
          'The origin stories of famous dishes have been deliberately falsified by their promoters.',
          'Recipes are best understood as revisable hypotheses, and claims of authenticity usually freeze one late moment of a long history.',
          'Written recipes are more trustworthy than oral ones because print resists distortion.'
        ],
        correct: 2,
        explain:
          'The passage moves from the printed recipe as a frozen rumour to the closing claim that a recipe is a hypothesis revised by every cook. The complaint about hollowed-out export versions is a concession along the way, not the thesis.'
      },
      {
        prompt:
          'The writer says the codifying documents are "almost always defensive". Here defensive means:',
        kind: 'vocab-in-context',
        options: [
          'written by people who feel their claim on a dish is under threat',
          'hostile towards cooks of other nationalities',
          'cautious about making any strong claim',
          'concerned primarily with hygiene and food safety'
        ],
        correct: 0,
        explain:
          'The same sentence explains the timing: the rules appear when a local dish goes global and its makers want a say in what travels under the name. That is protection of a claim, not hostility or caution.'
      },
      {
        prompt: 'According to the passage, tempura derives from:',
        kind: 'detail',
        options: [
          'a Chinese frying technique that reached Japan through Okinawa',
          'a dish invented for foreign visitors during the Meiji period',
          'a Dutch trading-post recipe recorded at Dejima',
          'fritters eaten by Portuguese missionaries in sixteenth-century Nagasaki'
        ],
        correct: 3,
        explain:
          'The second paragraph names Portuguese missionaries in Nagasaki and their fast-day fritters. The other options describe routes of culinary transmission that the passage never mentions.'
      },
      {
        prompt: 'The example of sweetened miso soup in an airport is used to:',
        kind: 'inference',
        options: [
          'show that dishes reliably improve as they travel',
          'concede that some adaptation genuinely ruins a dish, before the writer limits what the purist may conclude from that',
          'prove that protected-origin rules are necessary',
          'suggest that the writer distrusts all foreign versions of a national dish'
        ],
        correct: 1,
        explain:
          'It arrives immediately after "the purist is not simply ridiculous" and immediately before "But it is worth noticing when the rules were written". Its job is to grant the strongest version of the opposing case.'
      },
      {
        prompt: 'The writer\'s attitude towards purists is best described as:',
        kind: 'tone',
        options: [
          'openly contemptuous of them',
          'persuaded by their case',
          'unconvinced by their central claim, yet unwilling to dismiss them',
          'indifferent, on the grounds that the question is only about food'
        ],
        correct: 2,
        explain:
          'The purist is granted a real distinction and a reasonable motive, and is then denied the conclusion that any one version is the true one. That is qualified disagreement rather than contempt.'
      },
      {
        prompt: 'The passage implies that the version people call authentic is usually chosen because:',
        kind: 'inference',
        options: [
          'it has been verified against the earliest surviving written sources',
          'it is the version legally registered by the dish\'s country of origin',
          'it uses the smallest number of imported ingredients',
          'it happens to be the version the speaker grew up with'
        ],
        correct: 3,
        explain:
          'The passage says the frame held up as the whole film is "generally the one from somebody\'s childhood". Registration and documentary evidence are described as late and defensive, not as the source of the preference.'
      }
    ]
  },

  {
    key: 'the-cartographers-lie',
    title: 'The Cartographer\'s Lie',
    topic: 'Geography',
    level: 'C1',
    text: `Every flat map of the earth is wrong, and it is wrong in a way that cannot be corrected. The
surface of a sphere cannot be laid out on a plane without being stretched, torn or squeezed
somewhere; this is a result in geometry rather than a failure of draughtsmanship, and it has
been understood for as long as anybody has tried.

What a projection can do is choose its errors. Mercator, published in 1569, preserves
angles: a course of constant compass bearing appears as a straight line, which is exactly
what a navigator with a ruler requires. The price is area, and the price rises with
latitude, so that Greenland arrives on the page at roughly the size of Africa while being
about a fourteenth of it. Equal-area projections pay the reverse bill, keeping sizes honest
at the cost of shape, which is why the countries on them look faintly melted.

In the 1970s the Peters projection was promoted as a corrective with a moral dimension
attached, on the grounds that the familiar map had been quietly flattering the northern
countries that drew it. The political point had some force. The cartographic argument was
weaker, since the projection was neither new nor especially good, and the profession replied
with an irritation that did the debate no favours. What survived the row was the useful
part: a projection encodes a decision about what matters, and a decision is easier to argue
with once it is visible.

The odd afterlife of all this is that Mercator won anyway. Web maps use it, or a slight
variant of it, because their tiles are square, because zooming must not deform local shapes,
and because at street level the area distortion is imperceptible. The projection built for a
sixteenth-century navigator turns out to suit a twenty-first-century phone, and most of the
people complaining about Greenland are complaining on a screen that has already stopped
lying to them at the scale they are actually using.`,
    questions: [
      {
        prompt: 'The central claim of the passage is that:',
        kind: 'main-idea',
        options: [
          'the Mercator projection should be retired because it misrepresents the sizes of countries',
          'since no flat map can avoid distortion, a projection is a choice about which errors to accept and should be judged by its purpose',
          'cartographers in the 1970s were attacked unfairly for reasons that were purely political',
          'digital mapping has finally solved the problem of representing a sphere on a plane'
        ],
        correct: 1,
        explain:
          'The opening establishes that distortion is unavoidable and the rest of the passage treats each projection as a set of chosen trade-offs, ending with Mercator vindicated for the use it is actually put to.'
      },
      {
        prompt: 'What does the Mercator projection preserve?',
        kind: 'detail',
        options: [
          'angles, so that a constant compass bearing is drawn as a straight line',
          'the relative areas of landmasses at high latitudes',
          'true distance measured along any meridian',
          'the shape of every continent at every scale'
        ],
        correct: 0,
        explain:
          'The second paragraph states that Mercator preserves angles and that a course of constant bearing appears straight. Area is explicitly named as the price paid.'
      },
      {
        prompt: 'The writer says that a projection "encodes" a decision. In this context encodes means:',
        kind: 'vocab-in-context',
        options: [
          'conceals a decision so that it can never be recovered',
          'converts a decision into numerical form',
          'carries a decision within it without stating it openly',
          'requires a decision to be approved by an authority'
        ],
        correct: 2,
        explain:
          'The next clause says the decision is easier to argue with "once it is visible", which implies it was present but unannounced. Permanent concealment would make the arguing impossible.'
      },
      {
        prompt: 'What can be inferred about the writer\'s view of the Peters controversy?',
        kind: 'inference',
        options: [
          'that the Peters projection is the most accurate map available',
          'that cartographers should keep out of political arguments altogether',
          'that the northern bias of the Mercator map was invented by campaigners',
          'that the political criticism had merit even though the map offered as the remedy did not'
        ],
        correct: 3,
        explain:
          'The passage says the political point "had some force" while calling the cartographic case weak and the projection neither new nor especially good. Both halves are needed.'
      },
      {
        prompt: 'The tone of the final paragraph is best described as:',
        kind: 'tone',
        options: [
          'wryly amused by how the argument turned out',
          'indignant that a flawed map has survived',
          'alarmed at the influence of technology companies',
          'nostalgic for printed atlases'
        ],
        correct: 0,
        explain:
          'The paragraph enjoys the irony that a sixteenth-century navigational tool suits a phone, and ends by noting that the complainers are using the projection they object to. Nothing in it is angry or wistful.'
      },
      {
        prompt: 'Why does area distortion matter less on a phone, according to the passage?',
        kind: 'inference',
        options: [
          'because phone screens are too small to display a whole continent',
          'because web maps silently switch to an equal-area projection when the user zooms in',
          'because people using web maps are not interested in the sizes of countries',
          'because at street-level zoom the area shown is small enough for the stretching to go unnoticed'
        ],
        correct: 3,
        explain:
          'The last paragraph says the distortion is imperceptible at street level, and that the screen has "stopped lying at the scale they are actually using". No change of projection is described.'
      }
    ]
  },

  {
    key: 'what-the-clock-took',
    title: 'What the Clock Took',
    topic: 'History',
    level: 'C1',
    text: `For most of human history the correct time was a local fact, established by the sun and
disputed by nobody, because there was nothing to dispute it with. Noon in Bristol fell some
ten minutes after noon in London, and this was not an error; it was simply where the sun
was. A traveller who cared could reset a watch on arrival, and a traveller who did not care
lost nothing, since every journey took longer than the discrepancy it crossed.

The railway ended that arrangement, for reasons that were entirely practical. A timetable is
a promise about simultaneity, and the promise cannot be kept if the two ends of the line
disagree about what o'clock it is. The Great Western adopted London time in 1840 and the
rest of Britain followed within a decade or two, unevenly and with complaints. Some towns
split the difference by fitting a second minute hand to the public clock, one for the sun
and one for the railway, which is as neat an image of a society in transition as the period
offers.

The American case is stranger. Standard time zones were imposed across the United States on
a single day in November 1883 by the railway companies themselves, acting in concert and
without any legal authority whatever; Congress did not get round to ratifying the
arrangement until 1918. Newspapers grumbled that towns were now being governed by a clock in
another city, which was accurate. One Ohio editor advised readers that they might as well be
guided by the station, since the sun was no longer in charge of anything.

What was surrendered was small and real. Time stopped being something a person could read
off the sky and became something received from an institution, and every later step, the
telegraph pip, the speaking clock, the signal a phone accepts from a satellite without
consulting anyone, has followed the same direction. Nobody would seriously undo it. But it
is worth remembering that the most natural-seeming of our measurements is administered, and
that the administration was originally a private one.`,
    questions: [
      {
        prompt: 'Which statement best expresses the argument of the passage?',
        kind: 'main-idea',
        options: [
          'The railway companies acted illegally when they imposed standard time on the United States.',
          'Local solar time was more accurate than the standard time that displaced it.',
          'Standardised time was a practical necessity that also moved authority over the clock from nature to institutions.',
          'Modern timekeeping technology has made the nineteenth-century objections irrelevant.'
        ],
        correct: 2,
        explain:
          'The passage grants that the railways had no alternative and then traces what the change cost: time became something received from an institution. Both halves appear in the final paragraph.'
      },
      {
        prompt: 'Who imposed standard time zones on the United States in November 1883?',
        kind: 'detail',
        options: [
          'Congress, by statute',
          'the railway companies, acting together and without legal authority',
          'an international conference convened in Washington',
          'the individual state legislatures'
        ],
        correct: 1,
        explain:
          'The third paragraph is explicit that the companies acted in concert with no legal authority, and that Congress ratified the arrangement only in 1918.'
      },
      {
        prompt: 'A timetable is called "a promise about simultaneity". Simultaneity here means:',
        kind: 'vocab-in-context',
        options: [
          'events occurring at the same moment',
          'the speed at which a journey is completed',
          'agreement between two written documents',
          'the regular repetition of a schedule'
        ],
        correct: 0,
        explain:
          'The sentence continues that the promise fails if the two ends of the line disagree about what o\'clock it is, which is a disagreement about when a moment is, not about speed or repetition.'
      },
      {
        prompt: 'The clock with two minute hands is offered as an image of:',
        kind: 'inference',
        options: [
          'religious opposition to the railways',
          'clockmakers profiting from public confusion',
          'the unreliability of early railway timetables',
          'a period in which two systems of time were both still real to people'
        ],
        correct: 3,
        explain:
          'The writer calls it an image of "a society in transition", and the two hands track the sun and the railway respectively, so both standards are still being honoured at once.'
      },
      {
        prompt: 'The tone of the final paragraph is best described as:',
        kind: 'tone',
        options: [
          'alarmed at institutional power over daily life',
          'quietly regretful without any wish to reverse the change',
          'celebratory about the efficiency that was gained',
          'neutral, since the writer declines to evaluate the change at all'
        ],
        correct: 1,
        explain:
          'The loss is called "small and real" and the writer states plainly that nobody would seriously undo it, asking only that the arrangement be remembered as an administered one.'
      },
      {
        prompt: 'Why did an indifferent traveller lose nothing under local time?',
        kind: 'inference',
        options: [
          'because watches of the period could not be adjusted',
          'because very few people ever left their own town',
          'because journeys took longer than the time difference they crossed',
          'because the difference between towns was too small to be measured'
        ],
        correct: 2,
        explain:
          'The first paragraph gives exactly this reason: the journey outlasted the discrepancy, so arriving with an unadjusted watch cost nothing. The ten-minute Bristol gap shows it was measurable.'
      }
    ]
  },

  {
    key: 'the-economics-of-the-encore',
    title: 'The Economics of the Encore',
    topic: 'Economics',
    level: 'C1',
    text: `A string quartet takes four players about forty minutes to perform a late Beethoven work,
and it took four players about forty minutes in 1826. Almost nothing else in the economy can
say that. A weaver, a printer and a clerk have all been multiplied many times over by
machinery; the quartet has not been and cannot be, since the labour is the product. William
Baumol gave the asymmetry its name in the 1960s and drew the uncomfortable conclusion:
because musicians must be paid something like what their neighbours earn, and because those
neighbours keep getting more productive, the real cost of a live performance rises
indefinitely for no reason internal to music at all.

Recording looked like the exemption. A performance captured once could be sold a million
times, which is the productivity gain the quartet could never achieve on stage, and for
several decades it worked as advertised. Then the marginal cost of a copy fell to zero,
streaming turned the catalogue into a utility, and the recording stopped paying the musician
and started advertising the ticket. The economics inverted. The concert, the thing that
could not scale, became the income; the record, the thing that could, became the flyer.

This is the background to every argument about ticket prices. When a tour sells out in
ninety seconds and the same seat reappears at four times its face value, the promoter's
defence is that the higher figure was the price all along and the only real question was who
collected it. As economics that is hard to fault. It also misses what makes people angry. An
audience does not experience a concert as a market clearing; it experiences it as something
closer to a rite, with an implied membership, and a membership awarded to the highest bidder
is not obviously a membership at all.

Neither party is being stupid. The promoter is describing a market and the fan is describing
a community, and the ticket is the one object obliged to be both. That is why the row never
resolves, and why every technical remedy, whether lotteries, verified fans or capped resale,
is really an attempt to smuggle a non-market rule into a market.`,
    questions: [
      {
        prompt: 'Which statement best summarises the passage?',
        kind: 'main-idea',
        options: [
          'Streaming services have unfairly reduced the incomes of working musicians.',
          'Dynamic ticket pricing is economically indefensible and ought to be prohibited.',
          'Live music will eventually become too expensive for ordinary audiences to attend.',
          'Live performance cannot become more productive, which is why concerts now carry the income and why their pricing sets market logic against a sense of membership.'
        ],
        correct: 3,
        explain:
          'The passage runs from Baumol through the inversion of recording and touring to the unresolvable ticket argument. It calls the promoter\'s economics hard to fault, so it is not an argument for prohibition.'
      },
      {
        prompt: 'What is Baumol\'s conclusion, as the passage reports it?',
        kind: 'detail',
        options: [
          'that performers\' costs rise because their wages track productivity gains made elsewhere in the economy',
          'that audiences will not pay as much for classical music as for popular music',
          'that orchestras employ more musicians than their repertoire requires',
          'that recorded music will always outsell live performance'
        ],
        correct: 0,
        explain:
          'The first paragraph states that musicians must be paid roughly what their neighbours earn while those neighbours grow more productive, so the real cost of a performance rises for reasons external to music.'
      },
      {
        prompt: 'The passage says an audience experiences a concert as "a rite". Here rite means:',
        kind: 'vocab-in-context',
        options: [
          'a rehearsal opened to the public',
          'an occasion whose value depends on belonging rather than on price',
          'a legally protected entitlement to attend',
          'a habit repeated without thought'
        ],
        correct: 1,
        explain:
          'The word is immediately glossed by "with an implied membership", and the complaint that follows is that membership cannot be sold to the highest bidder.'
      },
      {
        prompt: 'What does the writer mean by saying the record "became the flyer"?',
        kind: 'inference',
        options: [
          'that major artists have stopped releasing recordings',
          'that physical formats now survive only as collectors\' items',
          'that recordings now function mainly as promotion for touring',
          'that concert audiences increasingly prefer unfamiliar material'
        ],
        correct: 2,
        explain:
          'The preceding sentence says the recording stopped paying the musician and started advertising the ticket. A flyer is advertising for the event that earns.'
      },
      {
        prompt: 'How does the writer treat the promoter\'s defence of resale prices?',
        kind: 'tone',
        options: [
          'grants that it is economically sound while denying that it answers the objection',
          'endorses it without reservation',
          'treats it as a transparent excuse for greed',
          'finds it too technical to evaluate'
        ],
        correct: 0,
        explain:
          'The defence is called hard to fault as economics, and the very next sentence says it misses what makes people angry. Both moves are made in a single breath.'
      },
      {
        prompt: 'What does the passage imply about lotteries, verified fans and capped resale?',
        kind: 'inference',
        options: [
          'that they have successfully eliminated resale in most countries',
          'that economists oppose them on grounds of efficiency',
          'that they raise revenue for promoters at the expense of fans',
          'that they try to impose a non-market rule inside a market, which is why none of them settles the argument'
        ],
        correct: 3,
        explain:
          'The closing sentence describes each remedy as smuggling a non-market rule into a market, and links this directly to the observation that the row never resolves.'
      }
    ]
  },

  {
    key: 'the-second-life-of-seeds',
    title: 'The Second Life of Seeds',
    topic: 'Nature',
    level: 'C1',
    text: `Inside a sandstone mountain on Spitsbergen, at the end of a tunnel kept below freezing by the
rock itself, sit rather more than a million sealed packets of seed. The Svalbard Global Seed
Vault is not a collection in its own right; it is a backup of other collections, a place
where the world's gene banks deposit duplicates against the day their own freezers, or their
own countries, fail. Nobody works there full time. The design ambition was a building that
would go on doing its job if everyone forgot about it.

It has been used in earnest once. In 2015 the regional seed bank that had been operating in
Aleppo asked for its deposits back, having been driven out of Syria by the war; the
withdrawal was made, the material was grown out in Lebanon and Morocco, and duplicates were
redeposited a few years later. The system did exactly what it was built to do, which is the
most that can be said of any insurance policy, and it is a great deal.

The limits are discussed less often. A seed in a freezer is a snapshot. The wheat in a
farmer's field is not: it is tested every season against a shifting cast of pests, droughts
and diseases, and the population that emerges is fitted to conditions that did not exist
when the vault was stocked. Conservation biologists call the distinction ex situ and in
situ, and the polite version of the argument between them is that the two approaches are
complementary. The blunter version is that a frozen archive preserves the material while the
practice that produced it goes extinct, and that a variety nobody has grown for forty years
arrives with no accompanying sense of when to sow it, what soil it wants, or which of its
qualities were the point of keeping it.

None of this is an argument against the vault, which costs very little and has already
justified itself. It is an argument against the comfort the vault provides. A civilisation
that has securely archived its crops has done something admirable, and something a great
deal easier than the alternative, which is to keep growing them.`,
    questions: [
      {
        prompt: 'The main point of the passage is that:',
        kind: 'main-idea',
        options: [
          'the Svalbard vault has failed in its purpose and should be redesigned',
          'seed vaults are worth having but cannot substitute for the living cultivation they archive',
          'the war in Syria showed that regional gene banks are unnecessary',
          'seeds stored below freezing lose their viability faster than was expected'
        ],
        correct: 1,
        explain:
          'The passage praises the vault, records its one successful use, and then argues that a frozen snapshot cannot do what a field does. The final paragraph states directly that this is not an argument against the vault.'
      },
      {
        prompt: 'What happened in 2015?',
        kind: 'detail',
        options: [
          'a Norwegian research station tested the stored seeds for viability',
          'a fire in a Lebanese gene bank destroyed a national collection',
          'a seed bank forced out of Aleppo recovered its deposits and later replaced them',
          'the vault distributed seed to farmers after a European drought'
        ],
        correct: 2,
        explain:
          'The second paragraph describes the withdrawal by the bank driven out of Syria, the growing out in Lebanon and Morocco, and the redeposit a few years afterwards.'
      },
      {
        prompt: 'The vault has been used "in earnest" once. In this context, in earnest means:',
        kind: 'vocab-in-context',
        options: [
          'for a real purpose rather than as a test',
          'with considerable urgency',
          'at very great expense',
          'without any publicity'
        ],
        correct: 0,
        explain:
          'The phrase introduces the single occasion on which a depositor actually needed its material back, as against the vault simply sitting there fulfilling its design.'
      },
      {
        prompt: 'What does the closing sentence imply?',
        kind: 'inference',
        options: [
          'that the vault should be closed and its budget transferred to farmers',
          'that the public has been misled about how the vault works',
          'that cultivated crops no longer evolve in any meaningful way',
          'that archiving appeals partly because it is easier than the harder work of continued cultivation'
        ],
        correct: 3,
        explain:
          'The sentence calls archiving admirable and then adds that it is much easier than the alternative of going on growing the crops, which is where the reader is invited to feel less comfortable.'
      },
      {
        prompt: 'The writer\'s attitude to the Svalbard vault is best described as:',
        kind: 'tone',
        options: [
          'sceptical that it serves any real purpose',
          'appreciative of it, yet unwilling to let it reassure the reader',
          'anxious about an imminent collapse of the food supply',
          'detached and purely descriptive'
        ],
        correct: 1,
        explain:
          'The vault is said to cost little and to have justified itself, while the target of the criticism is named as "the comfort the vault provides".'
      },
      {
        prompt: 'Why does a long-unplanted variety arrive with something missing?',
        kind: 'inference',
        options: [
          'because the knowledge of how to grow it is held by people and is not deposited with the seed',
          'because the seeds themselves deteriorate after about four decades',
          'because gene banks decline to publish their planting records',
          'because old varieties are legally barred from commercial fields'
        ],
        correct: 0,
        explain:
          'The third paragraph lists what does not travel with the packet: when to sow it, what soil it wants, and which of its qualities mattered. That is practice, not paperwork or viability.'
      }
    ]
  },

  {
    key: 'learning-to-see-a-colour',
    title: 'Learning to See a Colour',
    topic: 'Language',
    level: 'C1',
    text: `Japanese traffic lights are green and are called blue. Foreigners notice this early and
usually file it as a quaint mistake, which it is not: the word ao once covered a stretch of
the spectrum that English divides between blue and green, with midori establishing itself as
a separate basic term relatively late. The residue is everywhere in ordinary speech. An
unripe apple is a blue apple; so, for that matter, is a new employee.

Anthropologists once expected such variation to be limitless, on the assumption that
languages carve up the spectrum wherever they please. The evidence turned out to be more
orderly than that. Surveying a hundred languages in 1969, Brent Berlin and Paul Kay reported
that basic colour terms enter a vocabulary in a broadly predictable sequence, dark and light
first, then red, then green and yellow, then blue, and the finding has survived four decades
of well-aimed criticism in modified form. Whatever else the eye is doing, it is not being
invented from scratch by each language.

The more interesting question is whether a vocabulary changes what its speakers notice.
Russian has no single word covering the English range of blue, and treats siniy and goluboy
as separate colours in the way English treats blue and green. Asked to pick the odd square
out of three, Russian speakers are measurably quicker when the boundary between the squares
happens to fall on the boundary between those two words. Measurably quicker means, in
practice, a few dozen milliseconds; and the advantage vanishes when participants are made to
repeat a string of digits while they look, which suggests that the words are being used
silently during the task rather than having rebuilt the visual system that performs it.

That is a small effect, and it is worth being precise about how small, because the claim in
its loose form, that speakers of different languages inhabit different perceptual worlds,
has had a long and disreputable career. The defensible version is duller and more
interesting. Language does not install a filter in front of the eye. It supplies the
categories that attention reaches for first, and attention, over a lifetime of reaching, is
not nothing.`,
    questions: [
      {
        prompt: 'Which statement best expresses the argument of the passage?',
        kind: 'main-idea',
        options: [
          'Speakers of different languages literally see different colours.',
          'The Berlin and Kay sequence has been refuted by later work on Russian.',
          'Colour vocabulary varies in orderly ways and exerts a small but real pull on attention rather than remaking perception.',
          'Japanese use of the word ao shows that colour terms are assigned arbitrarily.'
        ],
        correct: 2,
        explain:
          'The passage establishes order in how terms appear, reports a measurable but tiny Russian effect, and closes by rejecting the strong claim in favour of language supplying the categories attention reaches for.'
      },
      {
        prompt: 'What removes the Russian speakers\' advantage in the experiment?',
        kind: 'detail',
        options: [
          'showing the coloured squares for a longer period',
          'requiring participants to hold and repeat a string of digits while looking',
          'testing bilingual participants instead of monolingual ones',
          'using shades near the extremes of each colour category'
        ],
        correct: 1,
        explain:
          'The third paragraph names the digit task as what makes the advantage vanish, and reads that as evidence the words are being used silently during the task.'
      },
      {
        prompt: 'The loose form of the claim is said to have had "a disreputable career". This means it:',
        kind: 'vocab-in-context',
        options: [
          'has been suppressed by academic institutions',
          'has been profitable for the people who promoted it',
          'has recently been revived by serious researchers',
          'has circulated widely in versions that scholarship cannot support'
        ],
        correct: 3,
        explain:
          'The phrase is contrasted immediately with "the defensible version", so the disrepute attaches to how far the claim was stretched, not to its suppression or its profits.'
      },
      {
        prompt: 'What does the digit-repetition result suggest?',
        kind: 'inference',
        options: [
          'that speakers are naming the colours to themselves, so the effect runs through language rather than through the eye',
          'that the effect is an artefact of a badly designed experiment',
          'that Russian speakers have better short-term memory than English speakers',
          'that colour discrimination improves under cognitive load'
        ],
        correct: 0,
        explain:
          'Occupying the verbal channel abolishes the advantage, which the passage takes as evidence that the words are being used silently rather than that the visual system has been rebuilt.'
      },
      {
        prompt: 'The writer\'s handling of the evidence is best described as:',
        kind: 'tone',
        options: [
          'excited by the implications for cross-cultural understanding',
          'dismissive of the whole line of research',
          'careful and deflationary, stating the claim only at the strength the evidence supports',
          'undecided between two competing accounts'
        ],
        correct: 2,
        explain:
          'The effect is quantified in milliseconds, the strong version is called disreputable, and the conclusion offered is described by the writer as duller. That is deliberate deflation, not dismissal.'
      },
      {
        prompt: 'In what order do Berlin and Kay say basic colour terms appear?',
        kind: 'detail',
        options: [
          'red, then blue, then green, then yellow',
          'black, white and blue before any other terms',
          'green and yellow before red',
          'dark and light, then red, then green and yellow, then blue'
        ],
        correct: 3,
        explain:
          'The second paragraph gives the sequence explicitly, with blue arriving late, which is what makes the Russian and Japanese cases interesting.'
      }
    ]
  },

  {
    key: 'the-quiet-authority-of-the-footnote',
    title: 'The Quiet Authority of the Footnote',
    topic: 'Essay',
    level: 'C2',
    text: `The footnote is a strange institution: a promise of verification that is almost never
redeemed, and which works anyway. A reader who meets a superscript numeral and follows it
down the page will find, in the ordinary case, an abbreviated reference to a document in a
library some distance away, in a language they may not read, catalogued under a system they
do not know. The invitation is real. Its acceptance is statistically negligible. Yet the
presence of the note does something to the sentence above it that its absence does not.

Anthony Grafton, whose history of the form is itself heavily annotated, locates its modern
consolidation in the nineteenth-century German seminar, where Ranke and his students made
the archive the guarantor of the account. The claim was never that the historian was
disinterested, an idea nobody who had met a historian could sustain, but that the sources
were now exposed and the argument could therefore be attacked at its foundations by anyone
prepared to do the work. The footnote is where a discipline agrees to be falsifiable.

Its more important function may be the one it performs before publication. A writer who
knows that every assertion must terminate in a citation writes differently, and mostly
worse, but also more honestly: the elegant generalisation that cannot be sourced tends to be
withdrawn quietly at the drafting stage. The apparatus disciplines the author more reliably
than it informs the reader, which is an odd thing for a piece of machinery to be good at,
and it goes some way towards explaining why prose carrying no notes reads as looser even
when it is not.

The hyperlink was supposed to be the apotheosis of the footnote and has disappointed in two
directions. It rots: a substantial share of the citations in older online scholarship now
lead to a parked domain or to nothing whatever, so the promise of verification expires on a
schedule nobody planned. And it flattens. A footnote distinguishes a manuscript from a
printed edition and both from a secondary work summarising them; a link is a link, and the
reader is left to infer from the colour of an underline what kind of authority is being
invoked. We built a faster machine for a job that was never about speed.`,
    questions: [
      {
        prompt: 'The central argument of the passage is that:',
        kind: 'main-idea',
        options: [
          'online scholarship should return to printed footnotes for the sake of permanence',
          'Ranke and his students devised the footnote in order to appear objective',
          'footnotes are largely decorative and could be dispensed with',
          'the footnote works less by being checked than by holding a discipline, and its writers, to account, which is what the hyperlink fails to reproduce'
        ],
        correct: 3,
        explain:
          'The passage insists that the invitation to verify is rarely accepted, locates the real work in falsifiability and in the discipline imposed on the writer, and then shows the link failing at both.'
      },
      {
        prompt: 'The hyperlink was to be "the apotheosis" of the footnote. Apotheosis here means:',
        kind: 'vocab-in-context',
        options: [
          'its inevitable replacement',
          'its highest and most complete form',
          'its commercial exploitation',
          'its simplified imitation'
        ],
        correct: 1,
        explain:
          'The word carries the promise that the link would perfect the footnote, which is why the two named failures register as disappointments rather than as differences.'
      },
      {
        prompt: 'In what two ways does the passage say the hyperlink has failed?',
        kind: 'detail',
        options: [
          'it decays over time, and it fails to distinguish between kinds of source',
          'it is costly to maintain, and it is difficult to typeset',
          'it is ignored by readers, and it is disliked by publishers',
          'it slows the page down, and it exposes the reader to advertising'
        ],
        correct: 0,
        explain:
          'The final paragraph names rot, with citations leading to parked domains, and flattening, where a manuscript and a summary look identical.'
      },
      {
        prompt: 'What is implied by "writes differently, and mostly worse, but also more honestly"?',
        kind: 'inference',
        options: [
          'that footnoted prose is always inferior to unfootnoted prose',
          'that academic writers deliberately obscure their meaning',
          'that the discipline of citation costs something in style and repays it in accuracy',
          'that honesty in prose is incompatible with elegance'
        ],
        correct: 2,
        explain:
          'The concession about quality is immediately paired with the gain: the unsourceable generalisation gets dropped. The writer is pricing a trade, not condemning annotated prose.'
      },
      {
        prompt: 'The tone of the passage is best described as:',
        kind: 'tone',
        options: [
          'affectionate towards the form and dry about how it is actually used',
          'solemn about a decline in scholarly standards',
          'impatient with the conventions of academic publishing',
          'neutral and expository throughout'
        ],
        correct: 0,
        explain:
          'The footnote is called strange and its invitation statistically negligible, yet it is credited with keeping a discipline falsifiable. The last line is a joke made at our own expense.'
      },
      {
        prompt: 'The remark about "the colour of an underline" suggests that:',
        kind: 'inference',
        options: [
          'readers cannot tell whether a given link still works',
          'the link format conveys nothing about the standing of what lies behind it',
          'digital typography has degraded the appearance of scholarship',
          'web pages deliberately disguise their authorship'
        ],
        correct: 1,
        explain:
          'It follows the observation that a link is a link, however different the underlying sources are. Rot, the other failure, is treated separately earlier in the paragraph.'
      }
    ]
  },

  {
    key: 'against-the-restored-cathedral',
    title: 'Against the Restored Cathedral',
    topic: 'Architecture',
    level: 'C2',
    text: `Eugene Viollet-le-Duc, who restored more of medieval France than most of the Middle Ages
managed to build, defined his own trade with a candour that has embarrassed his successors
ever since. To restore a building, he wrote, is to re-establish it in a complete state which
may never have existed at any given moment. He meant this approvingly. The building was to
be finished according to the logic its builders would have followed had they possessed his
resources and his understanding of their intentions, and the results are all over the
country: spires that had fallen or had never been raised, gargoyles designed in the
nineteenth century and weathered by the twentieth into perfect authenticity.

Ruskin, who thought this the moral equivalent of forgery, put the counter-case in the
strongest available terms. Restoration, he held, is a lie from beginning to end, and a
building is better allowed to die honestly than kept alive as a copy of itself. The
Ruskinian position has the advantage of consistency and the disadvantage of being
unliveable. Applied without exception it would have surrendered a good deal of what tourists
now queue to see, and its underlying picture of a building as a single organism with a
natural lifespan does not survive contact with structures altered continuously for eight
hundred years.

The spire that burned above Notre-Dame in 2019 was Viollet-le-Duc's, raised in the 1860s to
replace one dismantled in the 1790s. The decision to rebuild it as he had made it was
therefore a decision to restore a restoration, and the objections raised at the time, that a
twenty-first-century cathedral ought to carry a twenty-first-century mark, were arguing for
Viollet-le-Duc's principle in Ruskin's vocabulary.

The Venice Charter of 1964 tried to legislate a middle path, requiring that new work be
distinguishable from old and that interventions be reversible where possible. It is a good
rule and it does not settle the question, because the question is not technical. Every
choice about a historic building is a claim about which moment in its life is the one that
counts, and there is no moment that is not somebody's arbitrary preference, including the
preference for leaving things exactly as they happen to have been found.`,
    questions: [
      {
        prompt: 'The main argument of the passage is that:',
        kind: 'main-idea',
        options: [
          'Viollet-le-Duc\'s restorations were dishonest and should where possible be reversed',
          'the Venice Charter resolved the dispute between restoration and conservation',
          'because any treatment of a historic building privileges one moment of its life, the dispute cannot be settled on technical grounds',
          'Notre-Dame should have been rebuilt with a visibly modern spire'
        ],
        correct: 2,
        explain:
          'The final paragraph states that the question is not technical and that every choice, including doing nothing, prefers one moment over others. The Charter is praised as a rule and denied the status of a settlement.'
      },
      {
        prompt: 'The spire that burned in 2019 was:',
        kind: 'detail',
        options: [
          'the original medieval spire, untouched since it was built',
          'a nineteenth-century addition replacing one taken down in the 1790s',
          'a temporary structure put up during earlier repairs',
          'a twentieth-century reconstruction based on surviving drawings'
        ],
        correct: 1,
        explain:
          'The third paragraph dates it to the 1860s and to Viollet-le-Duc, replacing a spire dismantled in the 1790s, which is what makes rebuilding it a restoration of a restoration.'
      },
      {
        prompt: 'Ruskin\'s position is called "unliveable". This means that it is:',
        kind: 'vocab-in-context',
        options: [
          'unpopular with the general public',
          'unpleasant to read',
          'unsupported by any evidence',
          'impossible to act on consistently'
        ],
        correct: 3,
        explain:
          'The sentence that follows shows what applying it without exception would have cost, and the objection is practical rather than evidential.'
      },
      {
        prompt: 'What irony does the writer find in the objections raised after the 2019 fire?',
        kind: 'inference',
        options: [
          'that critics demanding a modern mark were endorsing Viollet-le-Duc\'s own doctrine while borrowing Ruskin\'s language',
          'that the critics had not realised the spire was destroyed',
          'that the critics were funded by the restoration industry',
          'that the critics preferred Ruskin but had misread him'
        ],
        correct: 0,
        explain:
          'Asking a building to be completed in the spirit of its own age is exactly Viollet-le-Duc\'s principle, even though the demand was framed as a refusal to fake the past.'
      },
      {
        prompt: 'The writer\'s attitude to the Venice Charter is:',
        kind: 'tone',
        options: [
          'contemptuous of it as bureaucratic compromise',
          'approving of it as a working rule while denying that it disposes of the underlying question',
          'confident that it makes further debate unnecessary',
          'unfamiliar with what it actually requires'
        ],
        correct: 1,
        explain:
          'It is called a good rule in the same sentence in which it is said not to settle the question, because the question is not one that a rule of practice can reach.'
      },
      {
        prompt: 'The last clause of the passage implies that:',
        kind: 'inference',
        options: [
          'conservation always costs less than restoration',
          'buildings discovered in ruins ought to be left in ruins',
          'expert consensus can eliminate arbitrary preferences',
          'leaving a building untouched is itself a choice rather than a neutral default'
        ],
        correct: 3,
        explain:
          'By including the preference for leaving things as they were found among the arbitrary preferences, the writer denies that inaction escapes the choice everyone else is accused of making.'
      }
    ]
  },

  {
    key: 'the-invention-of-the-audience',
    title: 'The Invention of the Audience',
    topic: 'Theatre',
    level: 'C2',
    text: `The audience that sits in the dark, silent, facing one lit rectangle, is a great deal younger
than almost anyone assumes. For most of the history of the theatre the house was as bright
as the stage, because both were lit by the same daylight or the same candles, and an
Elizabethan or a Georgian crowd behaved accordingly: it ate, moved about, greeted friends,
heckled, and applauded in the middle of speeches it liked. This was not a failure of
manners. The performance was one event in a room rather than a window in a wall, and the
audience was as visible to itself as the actors were.

Gas, and then electricity, made available a choice that had not previously existed. Wagner
took it at Bayreuth in 1876, darkening the auditorium and sinking the orchestra out of
sight, and his intentions were explicit: nothing was to compete with the stage picture, and
the spectator was to be delivered to the work without the distraction of other spectators.
The convention spread outward from opera, and by the time cinema arrived it was simply
inherited, along with its enforcement, which had by then passed from ushers to the audience
itself. The person who turns round and glares is doing volunteer work for a German composer
of the 1870s.

It is worth being clear about what this bought, since the story is often told as pure loss.
Concentrated attention is not a bourgeois affectation; some works genuinely require it, and
a play whose effects accumulate across three hours cannot survive a room that is talking.
The darkened house made possible a kind of art the candlelit one could not support, and the
fact that a discipline was invented does not make it arbitrary.

What follows is only that it is a convention, open to the same negotiation as any other, and
that present complaints about lit phone screens defend not the theatre as such but one
settlement reached in the 1870s. That is a perfectly reasonable thing to defend. It is a
weaker thing than what is usually claimed, which is that the offender has violated something
ancient.`,
    questions: [
      {
        prompt: 'Which statement best expresses the argument of the passage?',
        kind: 'main-idea',
        options: [
          'The silent, darkened audience is a recent convention with genuine artistic benefits, which makes it defensible but not sacred.',
          'Modern audiences behave considerably worse than Elizabethan ones did.',
          'Wagner\'s innovations at Bayreuth were resisted for decades before anyone adopted them.',
          'Cinema rather than theatre is responsible for the modern etiquette of silence.'
        ],
        correct: 0,
        explain:
          'The passage dates the convention to the 1870s, defends what it made possible, and then reduces the claim available to those who enforce it. Cinema is described as inheriting the rule, not inventing it.'
      },
      {
        prompt: 'What did Wagner do at Bayreuth in 1876?',
        kind: 'detail',
        options: [
          'abolished the interval and lengthened the performance',
          'introduced electric light to the stage for the first time',
          'darkened the auditorium and concealed the orchestra',
          'removed the boxes and seated the whole audience on one level'
        ],
        correct: 2,
        explain:
          'The second paragraph names both moves and gives the reason: nothing was to compete with the stage picture, including the other spectators.'
      },
      {
        prompt: 'Concentrated attention is said not to be "a bourgeois affectation". An affectation is:',
        kind: 'vocab-in-context',
        options: [
          'an emotional response to a performance',
          'a rule imposed by an institution',
          'a physical discomfort endured for art',
          'a manner adopted for show rather than out of need'
        ],
        correct: 3,
        explain:
          'The writer denies the charge by pointing out that some works genuinely require the attention, so the accusation being rebutted is that the behaviour is mere display.'
      },
      {
        prompt: 'What is implied by "doing volunteer work for a German composer of the 1870s"?',
        kind: 'inference',
        options: [
          'that Wagner\'s operas remain the most demanding works in the repertoire',
          'that spectators now enforce, unpaid and unknowingly, a rule that somebody else designed',
          'that theatre staff have abandoned their responsibilities',
          'that audiences resent being told how to behave'
        ],
        correct: 1,
        explain:
          'The preceding clause says enforcement passed from ushers to the audience, and the paragraph has just attributed the rule to Wagner. The glaring spectator is working, for free, on his behalf.'
      },
      {
        prompt: 'The tone of the passage is best described as:',
        kind: 'tone',
        options: [
          'nostalgic for the noisy playhouse',
          'severe towards audiences who use their phones',
          'even-handed: sympathetic to the convention while refusing the grandeur of its usual defence',
          'amused by the pretensions of opera'
        ],
        correct: 2,
        explain:
          'The third paragraph makes the strongest case for the darkened house, and the fourth grants that defending it is reasonable while denying that anything ancient is at stake.'
      },
      {
        prompt: 'The concession that "some works genuinely require it" functions to:',
        kind: 'inference',
        options: [
          'abandon the argument the passage has been making',
          'suggest that older plays were artistically inferior',
          'imply that most modern work does not deserve attention',
          'grant a real case for the convention before narrowing what may be concluded from it'
        ],
        correct: 3,
        explain:
          'It opens the paragraph that warns against telling the story as pure loss, and it is followed by the limiting move: a convention worth defending is still only a convention.'
      }
    ]
  },

  {
    key: 'the-long-shadow-of-the-standard',
    title: 'The Long Shadow of the Standard',
    topic: 'Technology',
    level: 'C2',
    text: `The usual parable about standards is the typewriter keyboard, and it is a bad one. QWERTY is
supposed to have been arranged to slow typists down and then to have trapped the world in a
demonstrably inferior layout, which is a satisfying story about markets choosing badly and
never recovering. The trouble is that the evidence for the superiority of the Dvorak
arrangement is thin, and largely traceable to studies conducted by Dvorak himself, while
later work has struggled to find the decisive margin the parable requires. The keyboard is a
poor witness for a phenomenon that is nevertheless entirely real.

Better witnesses are structural. The standard shipping container fixed its dimensions in the
late 1950s, and those dimensions have since determined the width of lorries, the span of
cranes, the depth of ports and the design of ships, so that a measurement adopted for the
convenience of one American trucking operation is now embedded in the physical layout of
world trade. The address space of the fourth version of the internet protocol was settled
when four billion addresses were an absurd abundance; the migration away from it has been
under way for a quarter of a century and is not finished. The two-digit year, likewise, was
a rational economy when storage was priced by the character, and its correction consumed a
global effort at the end of the century.

The pattern is that standards are cheap to choose and expensive to change, that the choice
is made early, when the least is known, and that the cost falls on people who were not
present at the decision and were frequently not born. Lock-in is not a market failure of the
ordinary kind: each participant is doing the sensible thing in adopting what everyone else
has adopted. The inefficiency is structural, and nobody is in a position to correct it
alone.

The obvious response, that standards ought to be chosen more carefully, is weaker than it
sounds. Deliberation costs time, and a standard agreed late has already lost to whatever
filled the vacuum. Almost every durable standard now in use was adopted before anyone could
have known whether it was any good. The realistic ambition is not the right standard but a
standard with a hinge in it, room for extension conceded in advance by people who accept
that they are guessing.`,
    questions: [
      {
        prompt: 'The passage argues that:',
        kind: 'main-idea',
        options: [
          'standards are usually chosen badly because the committees that choose them are slow and political',
          'lock-in is real but the keyboard is poor evidence for it, and since standards are settled early and cheaply the honest aim is to build in room for revision',
          'the Dvorak layout should replace QWERTY now that its advantages have been established',
          'world trade would be more efficient if the shipping container were redesigned'
        ],
        correct: 1,
        explain:
          'The first paragraph discards the stock example while keeping the phenomenon, the third generalises it, and the fourth rejects better deliberation in favour of a standard designed to be extended.'
      },
      {
        prompt: 'What is the writer\'s objection to the QWERTY parable?',
        kind: 'detail',
        options: [
          'that QWERTY was never intended to slow typists down',
          'that typewriters were superseded before the layout could be changed',
          'that most typists never learn to use the whole keyboard',
          'that the evidence for Dvorak\'s superiority traces back mainly to Dvorak'
        ],
        correct: 3,
        explain:
          'The first paragraph calls the evidence thin and largely traceable to studies by Dvorak himself, with later work unable to find the decisive margin.'
      },
      {
        prompt: 'A "standard with a hinge in it" is one that:',
        kind: 'vocab-in-context',
        options: [
          'is designed so that it can be extended later',
          'can be abandoned at no cost',
          'is enforced by a single authority',
          'joins two otherwise incompatible systems'
        ],
        correct: 0,
        explain:
          'The phrase is glossed in the same sentence as room for extension conceded in advance by people who know they are guessing.'
      },
      {
        prompt: 'The shipping container example is used to show that:',
        kind: 'inference',
        options: [
          'American firms deliberately imposed their preferences on world trade',
          'container dimensions were settled after wide international consultation',
          'an arbitrary early measurement can end up constraining vast quantities of later infrastructure',
          'shipping is the industry least able to adopt new technology'
        ],
        correct: 2,
        explain:
          'A measurement adopted for one trucking firm now fixes lorries, cranes, ports and ships. The passage attributes this to convenience and timing rather than to intent.'
      },
      {
        prompt: 'The writer\'s stance is best described as:',
        kind: 'tone',
        options: [
          'sceptical about the stock example while treating the phenomenon itself as real',
          'dismissive of the idea of path dependence altogether',
          'indignant at the costs imposed on later generations',
          'resigned to the impossibility of any improvement'
        ],
        correct: 0,
        explain:
          'The keyboard is demoted to a poor witness in the same breath in which the phenomenon is called entirely real, and the last paragraph still proposes something better to aim at.'
      },
      {
        prompt: 'Why is "choose standards more carefully" said to be weaker than it sounds?',
        kind: 'inference',
        options: [
          'because standards bodies are captured by the largest firms',
          'because the best standard is usually obvious in advance',
          'because deliberation takes time, and a standard agreed late loses to whatever has already filled the gap',
          'because engineers are unwilling to admit that they are guessing'
        ],
        correct: 2,
        explain:
          'The final paragraph gives exactly this reason and adds that almost every durable standard was adopted before its quality could have been known.'
      }
    ]
  },

  {
    key: 'a-defence-of-the-difficult',
    title: 'A Defence of the Difficult',
    topic: 'Criticism',
    level: 'C2',
    text: `Difficulty in writing is now widely treated as a defect of manners, a failure to consider the
reader, and the charge is fair often enough that the presumption has become hard to argue
with. A great deal of what passes for depth is ornament. A sentence that would survive
translation into plain English with nothing lost except the author's standing was never
difficult; it was expensive, and the expense was charged to the reader as a fee for
admission.

But the presumption conceals a distinction worth keeping. Some difficulty is ornamental in
exactly that way, and some is constitutive: the thought cannot be had in an easier form,
because the easier form is a different and smaller thought. A proof is not made friendlier
by the omission of a step. A late Beethoven quartet does not contain a simpler quartet
obscured by complication. A poem depending on four allusions is not a plain poem with
decoration added; remove the allusions and what remains is not the same poem simplified but
another poem, shorter and about less.

The working test is not whether a passage resists a first reading, since nearly everything
worth reading twice does. It is whether the resistance dissolves under effort into something
that could not have been got another way. Ornamental difficulty behaves differently on
rereading. It either stays opaque, which tells the reader there was nothing underneath, or
it resolves into a proposition so ordinary that the reader feels obscurely cheated.

What makes this hard to say without sounding like a snob is that the snobs got there first
and made the argument disreputable. It has since been overtaken by an economy that rewards
frictionlessness at every level, in which accessible has quietly become a term of praise for
a work rather than a description of an entrance, and in which the figure deciding what gets
commissioned is how many people reached the end. Under those conditions the constitutive
kind of difficulty is not defeated in argument. It is simply not produced, and its absence
goes unnoticed, because absence always does.`,
    questions: [
      {
        prompt: 'The main claim of the passage is that:',
        kind: 'main-idea',
        options: [
          'difficult writing is generally a form of showing off and should be discouraged',
          'readers today are less capable than earlier generations were',
          'Beethoven and allusive poets are the only reliable examples of genuine difficulty',
          'some difficulty is inseparable from what is being said, and a culture that rewards ease stops producing it rather than refuting it'
        ],
        correct: 3,
        explain:
          'The passage concedes that most difficulty is ornament, defends the constitutive kind with three examples, and ends on the claim that such work is not argued away but simply never commissioned.'
      },
      {
        prompt: 'Difficulty of the second kind is called "constitutive". This means that it is:',
        kind: 'vocab-in-context',
        options: [
          'part of the thought itself rather than added to it',
          'characteristic of one particular literary tradition',
          'imposed on the reader deliberately as a test',
          'capable of being removed without any loss'
        ],
        correct: 0,
        explain:
          'The clause after the colon says the thought cannot be had in an easier form, because the easier form would be a smaller thought. The three examples all turn on removal changing what is there.'
      },
      {
        prompt: 'What test does the writer propose for distinguishing the two kinds of difficulty?',
        kind: 'detail',
        options: [
          'whether the passage can be understood on a first reading',
          'whether other critics regard the writer as a serious one',
          'whether the resistance yields, under effort, to something unobtainable in an easier form',
          'whether the writer can summarise the work in plain English'
        ],
        correct: 2,
        explain:
          'The third paragraph rejects first-reading resistance as a criterion, since almost everything worth rereading resists, and offers what happens under effort instead.'
      },
      {
        prompt: 'The reader who "feels obscurely cheated" has discovered that:',
        kind: 'inference',
        options: [
          'the background needed to follow the argument is missing',
          'the effort was out of proportion to what the passage actually said',
          'the writer intended the passage to be misunderstood',
          'rereading is generally a waste of time'
        ],
        correct: 1,
        explain:
          'The phrase describes ornamental difficulty resolving into an ordinary proposition, so the payment of attention turns out to have bought very little.'
      },
      {
        prompt: 'The writer\'s manner in the final paragraph is best described as:',
        kind: 'tone',
        options: [
          'confident and untroubled by objections',
          'bitter about the state of contemporary publishing',
          'playfully provocative',
          'guarded, aware that the argument has been discredited by the company it has kept'
        ],
        correct: 3,
        explain:
          'It opens by admitting the difficulty of making the case without sounding like a snob, and blames the snobs for having spoiled it, which is a defensive rather than a combative posture.'
      },
      {
        prompt: 'What does the closing sentence imply?',
        kind: 'inference',
        options: [
          'that critics have failed to review difficult books fairly',
          'that what is never written cannot be missed, so the loss leaves no trace',
          'that readers have stopped buying serious literature altogether',
          'that publishers conceal how their commissioning decisions are made'
        ],
        correct: 1,
        explain:
          'The passage says such work is not produced rather than refuted, and that the absence goes unnoticed because absence always does. The loss is invisible by its nature.'
      }
    ]
  },

  {
    key: 'the-weather-in-the-model',
    title: 'The Weather in the Model',
    topic: 'Science',
    level: 'C2',
    text: `Edward Lorenz found the limit by accident in 1961, restarting a simulation from a printout
and entering 0.506 where the machine had been holding 0.506127. The rounded run tracked the
original for a while and then diverged from it completely, and the discovery was not that
the model was faulty but that the atmosphere it approximated has no tolerance for
imprecision at all. A weather forecast is therefore not a measurement problem that better
instruments will eventually close. Beyond about two weeks the initial state of the
atmosphere is not known well enough, and cannot be.

Forecasting responded by giving up on the single answer. A modern operational forecast is an
ensemble: the same model is run fifty times or more from initial states differing by amounts
too small to measure, and the spread of the results is the forecast. When the runs agree,
the atmosphere is in a condition whose future is insensitive to small differences and the
forecaster can be confident. When they scatter, no amount of computation will help, and the
honest output is a probability. This is a real scientific achievement and it is almost
entirely invisible to the public, because it arrives at the end of the pipeline as a number
beside a picture of a cloud.

That number is understood erratically. A thirty per cent chance of rain has been read as
rain over thirty per cent of the area, or for thirty per cent of the day, or by thirty per
cent of the forecasters, when the intended meaning is the probability of measurable rain at
a given point during the period. Surveys keep finding this and forecasters keep declining to
abandon the format, reasonably enough, since every alternative tested has been understood no
better.

The deeper problem is that probabilistic honesty is punished asymmetrically. A forecaster
who says twenty per cent and is rained on is remembered; one who says twenty per cent on
five occasions and is rained on once has been exactly right, and nobody keeps that record
except the forecaster. The incentive therefore runs towards the confident statement, which
is the one failure a science built specifically to quantify its own uncertainty should be
embarrassed to commit.`,
    questions: [
      {
        prompt: 'Which statement best expresses the argument of the passage?',
        kind: 'main-idea',
        options: [
          'better instruments will eventually make two-week forecasts reliable',
          'weather models are considerably less accurate than the public believes',
          'chaos forced forecasting into probabilities, which it now produces well and communicates badly, under incentives that reward false confidence',
          'ensemble forecasting has failed to improve on single-run models'
        ],
        correct: 2,
        explain:
          'The passage moves from Lorenz to ensembles, calls the achievement real but invisible, documents the misreading of percentages, and ends on the incentive towards overconfidence.'
      },
      {
        prompt: 'What did Lorenz do in 1961?',
        kind: 'detail',
        options: [
          're-entered a value at lower precision when restarting a run',
          'ran the same model on two different computers',
          'introduced a deliberate error in order to test the model',
          'compared his simulation with observed weather records'
        ],
        correct: 0,
        explain:
          'He typed 0.506 in place of the 0.506127 the machine had been holding, and the run diverged. The rounding was an accident of the printout, not a designed test.'
      },
      {
        prompt: 'An "ensemble", as the passage uses the word, is:',
        kind: 'vocab-in-context',
        options: [
          'a committee of forecasters who agree on a single published figure',
          'the complete set of instruments feeding a model',
          'an average taken across several competing models',
          'a set of runs from slightly different starting conditions, taken together'
        ],
        correct: 3,
        explain:
          'The second paragraph defines it as the same model run fifty times or more from initial states that differ by unmeasurably small amounts, with the spread itself being the forecast.'
      },
      {
        prompt: 'What does agreement among the runs indicate?',
        kind: 'inference',
        options: [
          'that the model has been correctly calibrated',
          'that the atmosphere is currently in a state whose development is insensitive to small errors',
          'that the forecast period is shorter than usual',
          'that the day\'s observations were unusually precise'
        ],
        correct: 1,
        explain:
          'The passage says agreement licenses confidence precisely because the future of that atmospheric state does not depend on differences too small to measure.'
      },
      {
        prompt: 'The tone of the final paragraph is best described as:',
        kind: 'tone',
        options: [
          'resigned to public ignorance',
          'scornful of forecasters who hedge their predictions',
          'critical of the incentives rather than of the forecasters',
          'optimistic that better presentation will solve the problem'
        ],
        correct: 2,
        explain:
          'The forecaster who hedges is shown to be exactly right and unrewarded; the blame falls on an asymmetry of memory that pushes the profession towards confident statements.'
      },
      {
        prompt: 'What does "punished asymmetrically" mean here?',
        kind: 'inference',
        options: [
          'that forecasters are formally penalised by their employers for wrong forecasts',
          'that probabilities below fifty per cent are meaningless to the public',
          'that forecasters issue different numbers to different audiences',
          'that only errors in one direction are remembered, so honest hedging is read as failure'
        ],
        correct: 3,
        explain:
          'The soaked listener remembers the twenty per cent that rained and keeps no record of the four occasions it did not, so a well-calibrated forecaster looks wrong.'
      }
    ]
  }
]
