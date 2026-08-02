import type { EnPassage } from './types'

// Reading passages for the English test section, six C1 and six C2.
// Passage keys are FROZEN (quiz_session settings and writing prompts store
// them); titles, text and questions may be edited freely.

export const EN_PASSAGES: EnPassage[] = [
  {
    key: 'the-lost-art-of-boredom',
    title: 'The Lost Art of Boredom',
    topic: 'Psychology',
    level: 'C1',
    text: `Until quite recently, boredom was treated as a moral failing rather than a mental
state. Victorian parents warned that idle hands invited mischief; twentieth-century
educators tended to regard a bored child as a badly managed one. Psychologists were slow
to take an interest, partly because boredom is hard to induce in a laboratory without also
inducing irritation, and partly because it looked too trivial to merit funding.

That neglect is now being corrected. Researchers describe boredom not as an absence of
stimulation but as a mismatch: the mind wants to engage, finds nothing worth engaging
with, and registers the gap as discomfort. The distinction matters. A prisoner in solitary
confinement and a commuter scrolling a phone are both understimulated, yet only one of them
has run out of options. Boredom, on this account, is less a void than an alarm, an
instruction to go and find something better to do.

What the alarm produces, if it is allowed to sound, appears to be useful. In several
studies, participants asked to perform a deliberately tedious task, such as copying numbers
out of a telephone directory, subsequently generated more inventive uses for an everyday
object than a control group who had gone straight to the creative task. The effect is
modest and has not always replicated cleanly, but the underlying mechanism is plausible: an
unoccupied mind wanders, and wandering minds make the loose associations from which ideas
are assembled.

The complication is that the alarm can now be silenced instantly. A phone offers an
inexhaustible supply of mild novelty, none of it demanding and none of it satisfying, which
means the discomfort is relieved without the search that the discomfort was for. Critics of
this argument point out, fairly, that people have always had cheap distractions, that pubs
and gossip and disposable novels are older than any screen, and that nostalgia for a
contemplative past is usually nostalgia for a past that never existed. The difference may
well be one of degree rather than of kind. But degree, once it is measured in hours a day,
is not nothing.`,
    questions: [
      {
        prompt: 'Which statement best expresses the main argument of the passage?',
        kind: 'main-idea',
        options: [
          'Boredom is a harmful state that modern technology has fortunately made easier to avoid.',
          'Laboratory research has now proved that boredom reliably makes people more creative.',
          'Boredom is a prompt to seek better occupation, and constant cheap distraction removes the prompt without meeting the need behind it.',
          'Psychologists neglected boredom because it is difficult to study under controlled conditions.'
        ],
        correct: 2,
        explain:
          'The passage moves from boredom-as-signal to the worry that instant novelty silences the signal while leaving the underlying need unaddressed. The remark about psychologists is a supporting detail in the opening, not the thesis.'
      },
      {
        prompt:
          'The writer says the creativity effect "is modest". In this context, modest means:',
        kind: 'vocab-in-context',
        options: [
          'unassuming in the claims its authors make for it',
          'small in size',
          'not yet formally published',
          'disappointing to the researchers involved'
        ],
        correct: 1,
        explain:
          'Here modest is quantitative: the measured difference between groups is small, which is why the writer immediately adds that it has not always replicated. The everyday sense of modest as unassuming applies to people, not to effect sizes.'
      },
      {
        prompt:
          'How does the final paragraph handle the objection that people have always had cheap distractions?',
        kind: 'inference',
        options: [
          'It dismisses the objection as nostalgia for a past that never existed.',
          'It shows that pubs and novels demanded more attention than phones do.',
          'It concedes that the argument of the passage cannot really be defended.',
          'It accepts that the objection has force, then argues that the sheer scale of modern distraction still changes the case.'
        ],
        correct: 3,
        explain:
          'The objection is granted ("fairly") and the claim is then narrowed to a difference of degree that the writer insists is significant. The nostalgia remark belongs to the objection being reported, not to the writer\'s rebuttal.'
      },
      {
        prompt:
          'In the studies described, what did participants do immediately before the creative task?',
        kind: 'detail',
        options: [
          'They copied numbers out of a telephone directory.',
          'They sat alone in a room without a phone for twenty minutes.',
          'They listened to a recording of a lecture.',
          'They described a time when they had been bored.'
        ],
        correct: 0,
        explain:
          'The passage names copying numbers from a directory as the tedious preliminary task. The other options describe boredom inductions used elsewhere in the literature but not mentioned here.'
      },
      {
        prompt: 'The writer\'s attitude towards the creativity research is best described as:',
        kind: 'tone',
        options: [
          'enthusiastic and untroubled by its limitations',
          'dismissive of its methods',
          'sympathetic but careful not to overstate it',
          'indifferent to whether it holds up'
        ],
        correct: 2,
        explain:
          'The findings are called plausible and useful, yet the writer volunteers that the effect is small and has not always replicated. That combination is sympathy with reservations, not enthusiasm.'
      }
    ]
  },

  {
    key: 'mapping-the-ocean-floor',
    title: 'Mapping the Ocean Floor',
    topic: 'Science',
    level: 'C1',
    text: `We have better maps of the surface of Mars than of the floor of our own ocean. The
comparison is a favourite of oceanographers, and it is very nearly true. Roughly a quarter
of the seabed has been surveyed at a resolution fine enough to show features the size of a
city block; the rest is known in the way a landscape is known from a passing aircraft at
night.

The reason is physics. Light is useless below a few hundred metres, and the radar that
mapped Venus through its clouds cannot penetrate water at all. Satellites can infer the
shape of the seabed indirectly, because a large underwater mountain exerts enough
gravitational pull to raise the sea surface above it by a few centimetres, but the picture
this yields is coarse: it will find a seamount two kilometres across and miss everything
smaller.

Anything better requires a ship. Multibeam sonar sweeps a fan of sound across the seabed
and times the echoes, producing a strip of detailed bathymetry perhaps four times as wide
as the water is deep. In shallow water that strip is disappointingly narrow, which is why
coastal charting is slow and expensive, and why the deep abyssal plains, counter to
intuition, are the cheapest places of all to map.

Since 2017 an international project has coordinated the effort, largely by persuading
vessels that were going to be at sea anyway, among them cable ships, research cruises and
superyachts, to leave their sonar running and donate the data. Coverage has risen from
about six per cent to roughly a quarter. Whether the remainder can be finished by 2030, as
the project intends, depends less on technology than on money and on the willingness of
navies and survey companies to release soundings they currently treat as proprietary.

The argument for finishing is not merely cartographic. The shape of the seabed governs how
a tsunami travels, where currents lift cold water and its nutrients toward the surface, and
where fish and cables and pipelines can safely go. A map, in this case, is
infrastructure.`,
    questions: [
      {
        prompt: 'Which best states the main point of the passage?',
        kind: 'main-idea',
        options: [
          'Because light and radar fail underwater, detailed seabed mapping needs ships, and completing the map is now mainly a question of funding and data sharing.',
          'Satellite gravity measurements will shortly make ship-based sonar surveys unnecessary.',
          'Most of the ocean floor will never be mapped in useful detail.',
          'Seabed mapping is of interest chiefly to cartographers and historians of exploration.'
        ],
        correct: 0,
        explain:
          'The passage explains the physical constraint, the shipboard remedy, and the political and financial conditions for finishing. The claim that the job is impossible is contradicted by the reported rise in coverage.'
      },
      {
        prompt:
          'According to the passage, why are the deep abyssal plains comparatively cheap to map?',
        kind: 'detail',
        options: [
          'They contain fewer features that need to be resolved.',
          'Satellites can already resolve them without help from ships.',
          'Research vessels cross them more often than they cross coastal waters.',
          'A sonar swath widens with depth, so each pass covers more ground.'
        ],
        correct: 3,
        explain:
          'The swath is about four times the water depth, so a single deep-water pass covers far more seabed than a shallow one. Nothing is said about deep plains being featureless.'
      },
      {
        prompt:
          'The writer says the satellite method yields a picture that is "coarse". Here this means:',
        kind: 'vocab-in-context',
        options: [
          'produced by careless or crude methods',
          'unpleasant to look at',
          'lacking fine detail',
          'accurate about depth but not about position'
        ],
        correct: 2,
        explain:
          'Coarse describes resolution: the method finds large seamounts and misses small ones. It is not a judgement on the quality of the work, and positional accuracy is never discussed.'
      },
      {
        prompt: 'What does the passage imply about the 2030 completion target?',
        kind: 'inference',
        options: [
          'It is unrealistic because the necessary technology does not yet exist.',
          'It will certainly be met, since coverage has already reached a quarter.',
          'Whether it is met depends mainly on funding and on institutions releasing data they already hold.',
          'It has quietly been abandoned by the international project.'
        ],
        correct: 2,
        explain:
          'The passage states that the remainder depends less on technology than on money and on navies and survey firms releasing proprietary soundings. The technology obstacle is explicitly ruled out.'
      },
      {
        prompt:
          'The closing sentence, "A map, in this case, is infrastructure", is best understood to mean that:',
        kind: 'inference',
        options: [
          'the map ought to be paid for by construction companies',
          'seabed data is a practical necessity that other systems depend on, not a scholarly luxury',
          'the map is physically built rather than drawn',
          'infrastructure projects have historically driven the science of cartography'
        ],
        correct: 1,
        explain:
          'The sentence follows a list of practical dependencies: tsunami travel, nutrient upwelling, cable and pipeline routes. Calling the map infrastructure asserts that other systems rest on it.'
      }
    ]
  },

  {
    key: 'the-library-of-alexandria',
    title: 'The Library of Alexandria',
    topic: 'History',
    level: 'C1',
    text: `Everyone knows how the Library of Alexandria ended: a fire, a mob, a single
catastrophic night in which the accumulated learning of antiquity went up in smoke. It is a
wonderful story, and almost none of it is true.

The library was founded early in the third century BC under the Ptolemies, who ran
Alexandria as a Greek city on the Egyptian coast and who understood, as later patrons
would, that prestige can be bought with books. Ships docking in the harbour were searched
for scrolls; anything found was copied, and it was frequently the copy, not the original,
that went back to the owner. Estimates of the collection at its height run from forty
thousand rolls to seven hundred thousand, a spread wide enough to tell us that nobody
counted and everybody guessed.

What happened next was not a night but a long afternoon. Julius Caesar's troops did set
fire to ships in the harbour in 48 BC, and warehouses near the docks probably burned with
them; the library itself seems to have survived. In 145 BC a purge of intellectuals under
Ptolemy VIII had already scattered the scholars, and a library without scholars is a
warehouse. Roman civil wars, imperial neglect, the interruption of papyrus supplies, the
slow rise of the codex, which made unrecopied scrolls obsolete rather than merely old: each
took its share. By the time the various later candidates for villain arrive in the story,
there was very little left for them to destroy.

Historians dwell on this partly out of pedantry and partly because the true version is the
more unsettling of the two. A single arsonist can be condemned and, in principle,
prevented. Institutional decay cannot: it requires only that each generation find the
maintenance of the previous generation's archive slightly less urgent than something else.
The manuscripts that vanished from Alexandria were, for the most part, never burned at all.
They were simply not copied again.`,
    questions: [
      {
        prompt: 'Which best expresses the main idea of the passage?',
        kind: 'main-idea',
        options: [
          'Julius Caesar has been unfairly blamed for a fire he did not start.',
          'The library was lost gradually, through neglect and institutional decline, rather than in one destructive event.',
          'Ancient estimates of the collection cannot be trusted at all.',
          'The invention of the codex was the single decisive cause of the library\'s disappearance.'
        ],
        correct: 1,
        explain:
          'The passage replaces the one-night catastrophe with a sequence of purges, wars, neglect and technological change. The codex is named as one contributing factor among several, not as the decisive one.'
      },
      {
        prompt:
          'The estimates are said to differ by "a spread wide enough to tell us that nobody counted". Spread here means:',
        kind: 'vocab-in-context',
        options: [
          'the physical extent of the collection',
          'the range between the highest and lowest figures',
          'the rate at which the collection grew',
          'the distribution of the scrolls among several buildings'
        ],
        correct: 1,
        explain:
          'The word refers to the gap between forty thousand and seven hundred thousand. Its size is the writer\'s evidence that the figures are guesses rather than records.'
      },
      {
        prompt: 'What happened to scrolls found aboard ships docking at Alexandria?',
        kind: 'detail',
        options: [
          'They were copied, and often the copy rather than the original went back to the owner.',
          'They were bought from the owners at a fixed price.',
          'They were catalogued and returned untouched.',
          'They were held until the ship sailed and then released.'
        ],
        correct: 0,
        explain:
          'The passage says explicitly that the copy was frequently what the owner got back. The detail illustrates how aggressively the Ptolemies acquired texts.'
      },
      {
        prompt: 'The remark that "a library without scholars is a warehouse" implies that:',
        kind: 'inference',
        options: [
          'the collection was physically moved into warehouses near the docks',
          'the library\'s value depended on the community that used and maintained it',
          'the scrolls were badly stored after 145 BC',
          'Ptolemy VIII intended to convert the building into a storehouse'
        ],
        correct: 1,
        explain:
          'The point is that a collection without readers, copyists and teachers stops functioning as a library even if every scroll remains on its shelf. The warehouse is a metaphor, and the harbour warehouses are a separate detail.'
      },
      {
        prompt:
          'The writer\'s attitude towards the popular account of the library\'s destruction is best described as:',
        kind: 'tone',
        options: [
          'wryly corrective',
          'angrily contemptuous',
          'entirely neutral',
          'nostalgic for a lost golden age'
        ],
        correct: 0,
        explain:
          'The opening calls the legend "a wonderful story" before dismantling it, and the correction is delivered with dry phrases such as "not a night but a long afternoon". There is amusement in it, but no anger.'
      }
    ]
  },

  {
    key: 'the-price-of-free',
    title: 'The Price of Free',
    topic: 'Essay',
    level: 'C1',
    text: `There is an old line, older than the internet, that if you are not paying for the
product then you are the product. It has the ring of insight and the convenience of fitting
on a placard, which is usually a warning sign. As economics it is roughly right and
specifically wrong, and the gap between those two is where the interesting questions live.

Consider commercial television, which ran on precisely this model for fifty years without
anybody feeling especially violated. Advertisers paid for access to an audience; the
audience paid in attention; the programmes were, by the standards of the day, free. What
has changed is not the arrangement but its resolution. A broadcaster sold a slot to whoever
happened to be watching at nine o'clock on a Thursday. A platform sells the individual,
sorted by inference into categories that the individual has never seen and cannot contest.

The consequence is that the currency has quietly changed. Attention is finite and its
expenditure is obvious: an hour spent watching is an hour gone. Data is neither. It can be
given away a thousand times without being depleted, its value depends on what it is
combined with, and the cost of surrendering it is deferred, diffuse and almost impossible
to feel. A price that cannot be felt is not a price that a market can discipline.

The standard remedy is consent, delivered through a banner that nobody reads and a checkbox
that everybody clicks. Whether this constitutes agreement in any meaningful sense is
doubtful; it is more like a toll booth left permanently open, with a sign explaining that
passing through implies acceptance. The alternatives, which are paying in cash, regulating
collection at source, or ruling certain kinds of inference out of bounds regardless of what
anyone has agreed to, are each unpopular with somebody powerful. Which is why we continue
to be offered a choice between a service we cannot examine and no service at all.`,
    questions: [
      {
        prompt:
          'The writer says that what has changed is "not the arrangement but its resolution". Resolution here means:',
        kind: 'vocab-in-context',
        options: [
          'the determination shown by the companies involved',
          'the settlement of a long-running dispute',
          'the fineness of the detail at which individuals can be distinguished',
          'the sharpness of the images being displayed'
        ],
        correct: 2,
        explain:
          'The contrast drawn is between selling a time slot and selling a sorted individual, which is a difference of granularity. The word is borrowed from imaging, but nothing here concerns picture quality.'
      },
      {
        prompt: 'Which best captures the central claim of the passage?',
        kind: 'main-idea',
        options: [
          'Free services always turn out to be more expensive than paid ones.',
          'Television advertising was a fairer arrangement than online advertising.',
          'Consent banners should be redesigned so that users actually read them.',
          'The familiar slogan is broadly right but conceals what is distinctive about data: a cost too diffuse to feel, and therefore one that markets cannot discipline.'
        ],
        correct: 3,
        explain:
          'The passage grants the slogan its rough truth and then locates the real problem in the unfelt price. Redesigned banners are treated as an inadequate remedy, not as the recommendation.'
      },
      {
        prompt:
          'According to the passage, how did broadcast television differ from a modern platform?',
        kind: 'detail',
        options: [
          'It sold access to whoever happened to be watching at a given hour, rather than to individuals sorted by inference.',
          'It did not sell advertising at all.',
          'Its audiences paid a subscription in cash.',
          'It collected more data about viewers but used it less effectively.'
        ],
        correct: 0,
        explain:
          'The Thursday-at-nine slot is contrasted with the sale of the sorted individual. Television is presented as running on the same advertising model, only at a coarser grain.'
      },
      {
        prompt: 'The tone of the passage is best described as:',
        kind: 'tone',
        options: [
          'alarmed and urgent',
          'nostalgic for the era of broadcast television',
          'sardonic and sceptical',
          'impartial and technical'
        ],
        correct: 2,
        explain:
          'Dry asides such as "the convenience of fitting on a placard" and the toll-booth image carry an edge of mockery. The writer is not sounding an alarm, and the technical vocabulary is used ironically.'
      },
      {
        prompt:
          'The comparison of consent to "a toll booth left permanently open" suggests that:',
        kind: 'inference',
        options: [
          'users are effectively charged twice for the same service',
          'the form of agreement survives while the practical possibility of refusing has gone',
          'regulation has removed the barriers that once protected privacy',
          'the service could easily be provided free of charge'
        ],
        correct: 1,
        explain:
          'A booth that never lowers its barrier collects nothing but still displays its notice; the ritual of consent remains once the option of turning back has disappeared. The image is about the emptiness of the agreement, not about double charging.'
      }
    ]
  },

  {
    key: 'the-return-of-the-wolves',
    title: 'The Return of the Wolves',
    topic: 'Nature',
    level: 'C1',
    text: `The story is told so often that it has acquired the shape of a parable. Wolves were
reintroduced to Yellowstone National Park in 1995. The elk, no longer able to graze in
safety, stopped loitering in the valleys; willow and aspen recovered along the streams;
beavers returned to the willow; songbirds returned to the beaver ponds; and the rivers
themselves, stabilised by roots, changed course. Predators, the moral runs, hold the world
together from the top down.

Ecologists call this a trophic cascade, and something like it did occur. Vegetation along
several streams is measurably taller than it was thirty years ago, and elk now behave
differently in narrow valleys where escape is difficult. The mechanism is real. The trouble
is with the confidence, and with the rivers.

Yellowstone in 1995 was not a laboratory with one variable altered. Bears and cougars were
recovering at the same time. A long drought broke. Human hunting outside the park was
reducing the elk herd on its own, and bison, which wolves rarely trouble, increased and
grazed the same willow. Disentangling all this is close to impossible, and the researchers
who have tried report effects that are patchy: strong in some drainages, absent in adjacent
ones with apparently identical conditions.

None of which makes the reintroduction a failure. It makes it an ecosystem, which is a less
satisfying thing than a parable. The willow recovery has been genuine but partial, the
beaver population has grown without approaching historical numbers, and the claim that
wolves reshaped the geography of rivers rests on a handful of reaches and a great deal of
enthusiastic narration.

The reason to insist on the qualifications is not pedantry. Restoration is expensive and
politically fragile, and it is sold to legislatures and to ranchers on the strength of
stories like this one. A promise that predators will repair a landscape is a promise that
some landscape, somewhere, will eventually fail to keep.`,
    questions: [
      {
        prompt: 'The main point of the passage is that:',
        kind: 'main-idea',
        options: [
          'the wolf reintroduction produced no measurable ecological change',
          'trophic cascades have been discredited as a concept',
          'the reintroduction had real but uneven effects that the popular parable overstates',
          'restoration projects should not be funded until their outcomes are certain'
        ],
        correct: 2,
        explain:
          'The writer confirms that the mechanism is real and then documents how uneven and confounded the evidence is. The failure reading is contradicted by "none of which makes the reintroduction a failure".'
      },
      {
        prompt:
          'Which of the following is named in the passage as a complication in interpreting the changes?',
        kind: 'detail',
        options: [
          'The park was closed to visitors for several years.',
          'The wolves released were fewer than the plan required.',
          'Aspen had already recovered before the wolves arrived.',
          'Bison, which wolves seldom attack, increased and grazed the same willow.'
        ],
        correct: 3,
        explain:
          'Bison appear in the list of simultaneous changes, alongside bears, cougars, the end of a drought and hunting outside the park. The other options are not mentioned.'
      },
      {
        prompt: 'Researchers are said to report effects that are "patchy". This means the effects are:',
        kind: 'vocab-in-context',
        options: [
          'temporary',
          'poorly documented',
          'present in some places and absent in others',
          'smaller than had been predicted'
        ],
        correct: 2,
        explain:
          'The clause that follows spells the word out: strong in some drainages, absent in adjacent ones. It is a statement about spatial inconsistency, not about duration or record-keeping.'
      },
      {
        prompt:
          'According to the final paragraph, why does the writer insist on the qualifications?',
        kind: 'inference',
        options: [
          'Because ecologists object on principle to simplified accounts.',
          'Because overselling restoration wins support on a promise that some future project is bound to break.',
          'Because the reintroduction ought to be reversed.',
          'Because ranchers have turned out to be right about predators.'
        ],
        correct: 1,
        explain:
          'The argument is prudential: funding rests on the story, so an inflated story creates a debt that a later project must default on. Nothing suggests the writer opposes reintroduction.'
      },
      {
        prompt:
          'The sentence "It makes it an ecosystem, which is a less satisfying thing than a parable" is best read as:',
        kind: 'tone',
        options: [
          'a dry acknowledgement that reality resists tidy moral stories',
          'an admission that the research was badly designed',
          'a complaint about the technical language ecologists use',
          'a plea for more storytelling in science communication'
        ],
        correct: 0,
        explain:
          'The line concedes, with deliberate understatement, that the truthful account lacks narrative shape. It criticises the parable, not the research or the vocabulary.'
      }
    ]
  },

  {
    key: 'the-taste-for-subtitles',
    title: 'The Taste for Subtitles',
    topic: 'Culture',
    level: 'C1',
    text: `For most of the twentieth century the international film market divided neatly along a
line of habit. Small language markets subtitled; large ones dubbed. Sweden and the
Netherlands read their foreign films. Germany, Italy, Spain and France heard them in their
own language, delivered by studios of specialist actors whose names meant nothing to
audiences but whose careers could last decades attached to a single Hollywood star.

The line held because it was economic rather than aesthetic. Dubbing costs perhaps fifteen
times what subtitling costs, which is affordable only if the audience is large enough to
spread the expense. Nobody was ever going to dub an American thriller into Icelandic.

Streaming has been quietly dissolving this arrangement, though not in the direction that
champions of subtitling like to claim. Platforms commission in dozens of countries and then
push each title everywhere at once, which means the economics of dubbing now reach
programmes that would never previously have earned it: a Korean drama gets a German track,
a Spanish thriller a Polish one. Dubbing has expanded enormously. What has also happened,
and what attracts far more comment, is that younger viewers have begun choosing subtitles
even for material in their own language, apparently for reasons that have less to do with
authenticity than with mumbled dialogue, compressed audio and watching on a phone in a
shared room.

The result is a market in which both options have grown and the old geography has blurred.
Industry surveys suggest that most viewers hold no settled preference at all. They have a
default, set by whichever track the platform selects on their behalf, and they change it
only when something goes wrong. That is a modest finding, and it deflates a good deal of
commentary on both sides. The great subtitle revolution, in so far as it exists, may turn
out to be a story about menu design.`,
    questions: [
      {
        prompt:
          'Why, according to the passage, did some countries dub while others subtitled?',
        kind: 'detail',
        options: [
          'Because dubbing was thought to damage the artistic integrity of a film',
          'Because subtitles were technically impossible in some scripts',
          'Because governments in larger countries required films to be dubbed',
          'Because dubbing is far more expensive, and only a large audience makes the cost bearable'
        ],
        correct: 3,
        explain:
          'The passage states that the line held "because it was economic rather than aesthetic", and gives the fifteen-fold cost difference. Artistic objections are precisely what it rules out.'
      },
      {
        prompt: 'Which best states the main idea of the passage?',
        kind: 'main-idea',
        options: [
          'Subtitling has finally triumphed over dubbing in the streaming era.',
          'Dubbing studios have lost the influence they held in the twentieth century.',
          'Streaming has expanded dubbing and subtitling alike, and viewer behaviour is mostly set by platform defaults rather than by taste.',
          'Younger viewers value authenticity more highly than their parents did.'
        ],
        correct: 2,
        explain:
          'Both options are described as growing, and the surveys attribute viewer behaviour to defaults. The authenticity explanation is raised and then set aside in favour of mumbling and phone speakers.'
      },
      {
        prompt: 'The finding is said to "deflate" a good deal of commentary. This means it:',
        kind: 'vocab-in-context',
        options: [
          'contradicts the commentary outright',
          'takes the force out of it',
          'summarises it fairly',
          'postpones any judgement on it'
        ],
        correct: 1,
        explain:
          'To deflate an argument is to let the air out of it: the claims are left standing but suddenly seem overblown. Outright contradiction would be a stronger claim than the writer makes.'
      },
      {
        prompt:
          'What does the passage suggest about younger viewers who select subtitles for content in their own language?',
        kind: 'inference',
        options: [
          'They are motivated chiefly by respect for the original performances.',
          'Their choice is largely practical, driven by listening conditions and sound quality.',
          'They are following the example set by Sweden and the Netherlands.',
          'They almost never change the settings a platform gives them.'
        ],
        correct: 1,
        explain:
          'The reasons offered are mumbled dialogue, compressed audio and shared rooms, all conditions of listening. The passage explicitly contrasts these with authenticity.'
      },
      {
        prompt: 'The closing remark about "menu design" is best read as:',
        kind: 'tone',
        options: [
          'an optimistic prediction about better interfaces',
          'a deflating joke at the expense of grand cultural claims',
          'a criticism of platforms for hiding the subtitle option',
          'a neutral summary of the industry surveys'
        ],
        correct: 1,
        explain:
          'Reducing a supposed cultural revolution to the arrangement of a settings menu is a piece of deliberate anticlimax. It undercuts the commentators, not the platforms.'
      }
    ]
  },

  {
    key: 'the-tyranny-of-metrics',
    title: 'The Tyranny of Metrics',
    topic: 'Essay',
    level: 'C2',
    text: `Nobody sets out to game a metric. That is the first thing to understand about metrics,
and the thing most reformers decline to believe. The surgeon who turns down the difficult
case, the school that quietly reclassifies its weakest candidates, the police force that
records a burglary as criminal damage: none of these people wake up intending fraud. They
wake up intending to survive an assessment regime that has told them, with great precision,
which of their activities counts.

Charles Goodhart's observation, formulated about monetary policy and since promoted to a
law of nature, is that a measure which becomes a target ceases to be a good measure. The
formulation is elegant and slightly too kind, since it implies that the measure was good to
begin with. Most institutional metrics are not degraded proxies. They are proxies chosen
for their availability, which is to say for the ease with which they can be extracted from
a database somebody already maintains, and then dignified by publication. Waiting times are
counted because clocks exist. Whether a patient recovered, and whether the recovery was
owed to the treatment, is a harder question that no dashboard has yet been persuaded to
answer.

The defenders of measurement have the stronger opening argument. Before the audits,
professional discretion sheltered the incompetent along with the excellent, and the
historical record of trusting institutions to police themselves is not one that inspires
nostalgia. Sunlight has genuinely disinfected. The difficulty is that the disinfectant does
not stop working once the infection is gone. It goes on stripping, and what it strips is
judgement, that accumulated, unquantified and largely inarticulate sense of when a rule
ought to be bent, which is precisely the faculty a target renders professionally reckless
to exercise.

There is no clean resolution here, and one should be wary of anyone offering one. The
choice is not between measurement and trust but between different mixtures of the two,
calibrated to circumstances that vary by profession and by decade, and revised whenever the
mixture curdles. That is an unsatisfying conclusion. It is also, one suspects, the only
honest one available.`,
    questions: [
      {
        prompt: 'Which best expresses the argument of the passage as a whole?',
        kind: 'main-idea',
        options: [
          'Institutions should abolish performance measurement and return to professional self-regulation.',
          'Goodhart\'s law explains why every published metric eventually becomes worthless.',
          'Professionals who manipulate metrics are committing a form of fraud that stricter auditing could prevent.',
          'Measurement is necessary yet corrodes judgement, so the only honest position is a mixture of the two that is revised as circumstances change.'
        ],
        correct: 3,
        explain:
          'The third paragraph concedes the case for audit before describing its cost, and the last explicitly rejects a clean resolution in favour of a revisable balance. The opening paragraph rules out the fraud reading.'
      },
      {
        prompt:
          'Metrics are described as chosen for their availability "and then dignified by publication". Dignified here means:',
        kind: 'vocab-in-context',
        options: [
          'made more accurate through public scrutiny',
          'explained clearly to a lay audience',
          'protected from criticism by regulation',
          'given an authority they had not earned'
        ],
        correct: 3,
        explain:
          'The verb is ironic: printing a convenient number lends it a gravity that its origins do not justify. Nothing in the sentence suggests publication improves the measure.'
      },
      {
        prompt: 'The writer calls Goodhart\'s formulation "slightly too kind" because:',
        kind: 'inference',
        options: [
          'Goodhart was writing about monetary policy rather than public services',
          'the law has been repeated so often that it has lost its meaning',
          'it presumes the measure was a good one before it became a target, which is frequently false',
          'it blames individuals rather than the institutions that set the targets'
        ],
        correct: 2,
        explain:
          'The following sentences deny that most metrics are "degraded proxies", since they were selected for convenience in the first place. Goodhart is too generous about their starting quality, not about anybody\'s motives.'
      },
      {
        prompt: 'Why, according to the passage, are waiting times counted?',
        kind: 'detail',
        options: [
          'Because patients regard them as the most important aspect of care',
          'Because they correlate closely with recovery',
          'Because the data are easy to obtain: clocks exist',
          'Because regulators are obliged by statute to publish them'
        ],
        correct: 2,
        explain:
          'The passage gives availability as the reason, in the deliberately blunt form "clocks exist", and contrasts it with the harder question of whether the patient recovered.'
      },
      {
        prompt:
          'The image of a disinfectant that "does not stop working once the infection is gone" suggests that:',
        kind: 'inference',
        options: [
          'audits should be conducted more frequently than they are',
          'transparency continues past the point of usefulness and erodes the judgement it was meant to protect',
          'corrupt professionals eventually adapt to any regime of inspection',
          'measurement systems grow less accurate as they age'
        ],
        correct: 1,
        explain:
          'The sentence that follows names what is stripped away: professional judgement. The metaphor is about a remedy applied beyond its purpose, not about the durability of the instrument.'
      },
      {
        prompt: 'The tone of the final paragraph is best described as:',
        kind: 'tone',
        options: [
          'resigned, and self-consciously unsatisfying',
          'confidently prescriptive',
          'bitter and accusatory',
          'apologetic about the writer\'s own position'
        ],
        correct: 0,
        explain:
          'The writer admits the conclusion is unsatisfying and defends it only as the honest one, hedged further by "one suspects". No prescription is offered and no one is blamed.'
      }
    ]
  },

  {
    key: 'the-grammar-of-forgetting',
    title: 'The Grammar of Forgetting',
    topic: 'Science',
    level: 'C2',
    text: `The metaphors we use for memory have always been borrowed from whatever technology
happened to be impressive at the time. Plato had a wax tablet; the seventeenth century
preferred a cabinet; the twentieth settled comfortably on the filing system and then, with
evident relief, on the hard drive. Each carries the same buried assumption, which is that
remembering is retrieval, that the item persists somewhere unaltered and the only question
is whether one can find it again.

Work on reconsolidation has made that assumption difficult to hold. When a consolidated
memory is recalled it appears to become briefly labile, open to modification, and to
require re-stabilising before it settles once more. In rodents, a protein synthesis
inhibitor administered inside that window can abolish a fear response that was, minutes
earlier, entirely robust. The finding has been replicated widely enough to be taken
seriously and hedged widely enough that nobody sensible claims to know its boundary
conditions. What is not in dispute is the direction of the implication: recall is not a
read operation. It is a rewrite.

Anyone who has argued with a sibling about a shared childhood has intuited as much. What
the laboratory adds is that the drift is not a defect in an otherwise faithful mechanism
but a feature of how the mechanism works at all, and quite possibly the point of it. A
system that recorded the past perfectly would be poorly adapted to an organism whose
business is the future. What is wanted is not a transcript but a usable model, revised
continuously against whatever has since turned out to be the case.

The consequences for institutions built on testimony are uncomfortable and largely unmet. A
witness questioned repeatedly is not a recording played repeatedly; each interview is an
occasion for revision, and the confidence with which an account is eventually delivered
tracks the number of rehearsals at least as closely as it tracks the accuracy of the
original perception. Courts have absorbed some of this, slowly, and in the form of
directions asking jurors to distrust the one faculty they have spent their lives assuming
to be reliable. It is not obvious that anybody knows how to do that.`,
    questions: [
      {
        prompt:
          'A recalled memory is said to become briefly "labile". In this context the word means:',
        kind: 'vocab-in-context',
        options: [
          'unusually easy to remember',
          'stored in a different region of the brain',
          'weaker than it had been before',
          'open to alteration for a short period'
        ],
        correct: 3,
        explain:
          'The phrase that follows glosses it as "open to modification", and the memory then requires re-stabilising. Weakening is a possible outcome of the window, not the meaning of the word.'
      },
      {
        prompt: 'The central claim of the passage is that:',
        kind: 'main-idea',
        options: [
          'memories decay unless they are rehearsed at regular intervals',
          'eyewitness testimony ought to be excluded from criminal trials',
          'animal research can tell us very little about human memory',
          'the familiar metaphors for memory all fail in the same way, because recalling something rewrites it'
        ],
        correct: 3,
        explain:
          'The passage opens on the storage metaphors, shows that reconsolidation undermines the shared assumption behind them, and traces the consequences. It calls the legal position uncomfortable without proposing exclusion.'
      },
      {
        prompt: 'What did the rodent experiments show?',
        kind: 'detail',
        options: [
          'that fear responses cannot be removed once they are consolidated',
          'that protein synthesis inhibitors improve recall of remote memories',
          'that a drug given during the window after recall could abolish an established fear response',
          'that rodents and humans forget at approximately the same rate'
        ],
        correct: 2,
        explain:
          'The inhibitor is administered inside the labile window and erases a response that was robust minutes earlier. That is the evidence that recall destabilises what is recalled.'
      },
      {
        prompt:
          'Why, according to the passage, might a perfectly faithful memory be a poor design?',
        kind: 'inference',
        options: [
          'because an organism needs a revisable model for acting in the future rather than an archive of the past',
          'because perfect recall would consume more energy than the brain can supply',
          'because vivid memories are more painful to live with',
          'because the brain possesses no mechanism for permanent storage'
        ],
        correct: 0,
        explain:
          'The passage argues that drift may be the point: an organism "whose business is the future" is better served by a model updated against later evidence than by a transcript. Energy costs are never raised.'
      },
      {
        prompt:
          'The final sentence, "It is not obvious that anybody knows how to do that", conveys:',
        kind: 'tone',
        options: [
          'contempt for the courts',
          'confidence that jury directions have solved the problem',
          'measured doubt that the legal remedy can achieve what it asks of people',
          'indifference to the consequences for defendants'
        ],
        correct: 2,
        explain:
          'The understatement questions whether jurors can actually perform the distrust they are instructed to perform. Courts are credited with absorbing the science, so contempt is too strong.'
      }
    ]
  },

  {
    key: 'the-invention-of-the-teenager',
    title: 'The Invention of the Teenager',
    topic: 'History',
    level: 'C2',
    text: `Adolescence, we are assured, is a biological fact. So it is, in the narrow sense that
puberty happens and that the brain goes on remodelling itself for some years afterwards.
The teenager, however, is not a biological fact. The teenager is an artefact of the middle
of the twentieth century, and can be dated with a precision that ought to make us cautious
about the whole category.

Before industrialisation the years between childhood and adult work were not a stage so
much as a gradient, and a short one. A boy of fourteen in an agricultural economy was a
smaller labourer, not a member of a distinct social class with its own tastes, grievances
and music. What produced the teenager was a specific and rather narrow conjunction:
compulsory schooling extended upward, which kept the young together and apart; wartime and
postwar labour shortages, which put disposable income into their hands; and an advertising
industry that noticed, with the alacrity of its profession, that here was a cohort with
money, leisure and an unusually urgent need to signal who they were not.

The word itself is instructive. *Teenager* appears in American print in the early 1940s, in
the marketing pages well before the sociology journals, and it arrives already commercial.
Within a decade there existed magazines, films, a genre of music and a moral panic, all of
which took as given the existence of the thing they were addressing. Categories have a way
of becoming true once they are provisioned.

None of which is to say that adolescent turbulence was invented by copywriters. There are
complaints about the young in Hesiod, and they are recognisably the same complaints. What
was invented was the assumption that this turbulence constitutes an identity, that one is a
teenager in the way one is Dutch, rather than merely being of a certain age in a society
organised to keep one waiting. The distinction is not academic. Almost every policy we have
for the young, from curfews to the architecture of schools, is built on the first
understanding rather than the second, and it is at least worth asking whether the
arrangement produces some of the behaviour it claims merely to be managing.`,
    questions: [
      {
        prompt: 'Which best expresses the argument of the passage?',
        kind: 'main-idea',
        options: [
          'Adolescent rebellion was unknown before the twentieth century.',
          'Compulsory schooling was a mistake that created social problems among the young.',
          'Adolescence is biological, but the teenager is a mid-century social and commercial category whose assumptions still shape policy.',
          'Advertisers invented adolescent turbulence in order to sell records and magazines.'
        ],
        correct: 2,
        explain:
          'The passage separates the biological process from the social category and ends on the policies built on the latter. It explicitly denies that copywriters invented the turbulence itself, citing Hesiod.'
      },
      {
        prompt:
          'Advertisers are said to have noticed the new cohort "with the alacrity of its profession". Alacrity here means:',
        kind: 'vocab-in-context',
        options: [
          'the ruthlessness',
          'the brisk eagerness',
          'the caution',
          'the technical expertise'
        ],
        correct: 1,
        explain:
          'Alacrity is cheerful promptness, and the phrase teases the advertising industry for its speed in spotting a market. Ruthlessness would import a moral charge the sentence does not make.'
      },
      {
        prompt:
          'Which of the following is NOT given as a cause of the teenager\'s emergence?',
        kind: 'detail',
        options: [
          'schooling extended to older ages',
          'money in the hands of the young',
          'an advertising industry that spotted a market',
          'the lowering of the voting age'
        ],
        correct: 3,
        explain:
          'The passage lists exactly three elements in its conjunction: extended schooling, postwar disposable income and advertising. Voting is never mentioned.'
      },
      {
        prompt:
          '"Categories have a way of becoming true once they are provisioned" suggests that:',
        kind: 'inference',
        options: [
          'commercial categories usually describe their customers accurately',
          'a group supplied with its own products and institutions begins to behave as a real group',
          'labels are harmless so long as nobody believes in them',
          'sociologists eventually confirmed what marketers had already established'
        ],
        correct: 1,
        explain:
          'Provisioned means equipped, and the surrounding sentences list the magazines, films and music supplied to the new category. The claim is that the supply helped bring the category into being.'
      },
      {
        prompt: 'In the last paragraph the writer\'s position is best described as:',
        kind: 'tone',
        options: [
          'certain that youth policy causes the behaviour it manages',
          'dismissive of the idea that adolescence involves any real difficulty',
          'raising a possibility and inviting the reader to weigh it',
          'defending existing curfews and school design'
        ],
        correct: 2,
        explain:
          'The hedged closing formula, "it is at least worth asking whether", proposes the possibility without asserting it. The concession about Hesiod shows the difficulty is taken seriously.'
      }
    ]
  },

  {
    key: 'a-short-history-of-the-pause',
    title: 'A Short History of the Pause',
    topic: 'Language',
    level: 'C2',
    text: `Punctuation was invented for the mouth, not the eye. The earliest marks in Greek
manuscripts were not grammatical but respiratory: a system attributed to Aristophanes of
Byzantium in the third century BC placed dots at different heights to indicate how long a
reader ought to pause, on the reasonable assumption that a text existed in order to be read
aloud, probably by somebody who had not seen it before. Word spacing, that indispensable
convenience, arrived a thousand years later, largely through Irish monks working in a
language whose distance from Latin left them no oral fluency to fall back on.

The transition from breath to syntax was gradual, and it was never completed. This is why
educated adults still quarrel about commas: the mark serves two masters, one prosodic and
one structural, and where they disagree there is no authority to appeal to that the other
side accepts. The so-called Oxford comma is the most tedious front in this war, and also
the most revealing, since each camp can produce sentences in which the other's rule
generates absurdity, and neither camp is willing to concede that the correct answer is
usually to rewrite the sentence.

What is new is not the disputation but the audience. Print imposed a settlement of sorts,
because a compositor had a house style and the writer did not get a vote. That settlement
has dissolved. Most prose written today is composed by amateurs, published without an
intermediary, and read on a device that supplies its own apparatus of tone. The full stop,
in a text message, has acquired a mood: a message ending in one is read by younger
correspondents as curt or displeased, which is not a corruption of the mark's function but
a return to it. It is doing what Aristophanes wanted, and telling the reader how to sound.

One may lament this or not. What is unsustainable is the position, common among people who
consider themselves defenders of standards, that punctuation is a fixed system currently
under assault. It has been under assault, if that is the word, for twenty-three centuries.
The assault is how it got here.`,
    questions: [
      {
        prompt: 'What was the original purpose of the earliest Greek punctuation marks?',
        kind: 'detail',
        options: [
          'to mark grammatical structure',
          'to separate one word from the next',
          'to tell a reader aloud how long to pause',
          'to indicate quoted speech'
        ],
        correct: 2,
        explain:
          'The dots were placed at different heights to signal pause length for reading aloud. Word spacing is described as a separate innovation arriving a thousand years later.'
      },
      {
        prompt: 'The comma is said to "serve two masters". This means that it:',
        kind: 'vocab-in-context',
        options: [
          'is governed by two competing demands, one of sound and one of structure',
          'is used by both writers and editors',
          'has changed its function twice in its history',
          'belongs to the Greek and the Latin traditions equally'
        ],
        correct: 0,
        explain:
          'The following clause names the two masters as prosodic and structural. The image explains why disputes about commas have no agreed arbiter.'
      },
      {
        prompt:
          'Why does the writer call the moody full stop "not a corruption of the mark\'s function but a return to it"?',
        kind: 'inference',
        options: [
          'because young people are unaware of standard punctuation',
          'because it once again tells the reader how the sentence should sound',
          'because messaging apps use the same marks as Greek manuscripts',
          'because printers no longer impose a house style'
        ],
        correct: 1,
        explain:
          'Punctuation began as instruction for the voice, so a mark that signals mood is doing its oldest job. The next sentence makes the link to Aristophanes explicit.'
      },
      {
        prompt: 'Which best states the main idea of the passage?',
        kind: 'main-idea',
        options: [
          'Standards of punctuation have declined since the invention of printing.',
          'The Oxford comma dispute could be settled by appeal to the earliest sources.',
          'Punctuation would be better taught as a matter of breathing than of grammar.',
          'Punctuation has always been unstable, and its present instability continues its history rather than interrupting it.'
        ],
        correct: 3,
        explain:
          'The closing paragraph states that the system has been under assault for twenty-three centuries and that the assault is how it developed. The historical survey exists to support exactly that claim.'
      },
      {
        prompt:
          'The writer\'s attitude towards self-appointed "defenders of standards" is:',
        kind: 'tone',
        options: [
          'sympathetic but resigned',
          'openly amused and unpersuaded',
          'hostile to the point of insult',
          'strictly neutral'
        ],
        correct: 1,
        explain:
          'Their position is called unsustainable and then punctured by the joke about a twenty-three-century assault. The mockery is light rather than abusive.'
      }
    ]
  },

  {
    key: 'the-arithmetic-of-uncertainty',
    title: 'The Arithmetic of Uncertainty',
    topic: 'Science',
    level: 'C2',
    text: `A climate model is not a prediction machine, and the persistent public belief that it is
has done more damage to the credibility of the field than any of its critics. A model is an
argument conducted in arithmetic: a set of physical relationships, some known to five
decimal places and some frankly approximated, run forward under assumptions about what
human beings will choose to do, which is the one input no physics can supply.

The known parts are genuinely known. The radiative properties of carbon dioxide were
established in the laboratory in the nineteenth century and are not seriously contested by
anyone who has looked at them. Ocean heat uptake, the reflectivity of ice, the broad
circulation of the atmosphere: these are modelled with the ordinary confidence of fluid
dynamics. The difficulty lies in processes occurring at scales below the size of a grid
cell, of which clouds are the notorious example. A cloud is smaller than any cell a global
model can afford to resolve, and clouds both reflect sunlight and trap heat, in proportions
that depend on altitude, particle size and history. What a model does with them is not a
measurement but a rule of thumb, tuned until the model reproduces a climate we have already
observed.

Sceptics seize on this, understandably and wrongly. The inference they draw, that a tuned
parameter renders the whole enterprise arbitrary, would if applied consistently invalidate
most of engineering. The relevant question is never whether uncertainty exists but where it
lies and what it does to the answer, and here the record is awkward for both parties.
Successive generations of models have got the warming trajectory broadly right, which is
the sceptics' problem. They have also failed to narrow the plausible range of climate
sensitivity across fifty years of increasing sophistication, which is everybody else's.

The honest summary is therefore double-edged, and it is the kind of statement that survives
neither a headline nor a hearing. We know that it is warming and roughly how fast. We do
not know, within a factor that matters for planning, how bad the far end could be. Both
halves are load-bearing, and each is routinely quoted without the other.`,
    questions: [
      {
        prompt: 'Which best expresses the main argument of the passage?',
        kind: 'main-idea',
        options: [
          'Climate models combine well-established physics with approximated processes, and honesty requires stating the confidence and the residual uncertainty together.',
          'Climate models are arbitrary, because key processes are tuned by hand.',
          'The cloud problem will disappear once computers can resolve smaller grid cells.',
          'Public communication of climate science has on the whole been successful.'
        ],
        correct: 0,
        explain:
          'The passage separates what is known from what is approximated and closes on a two-part summary that it insists must be quoted whole. The arbitrariness charge is stated as the sceptics\' inference and rejected.'
      },
      {
        prompt: 'Why are clouds a particular difficulty for global models?',
        kind: 'detail',
        options: [
          'Their radiative properties have never been measured.',
          'They are smaller than the model\'s grid cells and have opposing warming and cooling effects.',
          'They cannot be observed from satellites.',
          'They vary too little from year to year to be worth modelling.'
        ],
        correct: 1,
        explain:
          'A cloud falls below the resolvable scale, and it both reflects sunlight and traps heat in proportions that vary. That combination is why the treatment is a tuned rule of thumb.'
      },
      {
        prompt: 'The writer says that "both halves are load-bearing". This means that:',
        kind: 'vocab-in-context',
        options: [
          'each is necessary to hold the conclusion up',
          'each half is a burden on policymakers',
          'each half is supported by strong evidence',
          'each is heavy with technical detail'
        ],
        correct: 0,
        explain:
          'The metaphor is architectural: remove either statement and the honest summary collapses, which is why quoting one without the other misleads. It says nothing about the weight of the evidence for each.'
      },
      {
        prompt:
          'The writer says that models getting the warming trajectory broadly right "is the sceptics\' problem". This is because:',
        kind: 'inference',
        options: [
          'sceptics have declined to publish models of their own',
          'a record of correct projections undercuts the charge that the models are arbitrary',
          'sceptics rely on the same tuned parameters as everyone else',
          'the trajectory has had to be revised on several occasions'
        ],
        correct: 1,
        explain:
          'If tuning made the whole enterprise arbitrary, the projections should not have held up; that they did is evidence against the sceptical inference. The companion sentence assigns the sensitivity failure to the other side.'
      },
      {
        prompt: 'The writer\'s stance towards the two sides of the public argument is best described as:',
        kind: 'tone',
        options: [
          'even-handed, and impatient with selective quotation',
          'broadly sympathetic to the sceptics',
          'dismissive of climate science as a whole',
          'unwilling to take any position at all'
        ],
        correct: 0,
        explain:
          'The record is called awkward for both parties, and the final line objects to each half being quoted without the other. Refusing a simple verdict is not the same as having no position.'
      },
      {
        prompt: 'What does the passage identify as the input that no physics can supply?',
        kind: 'detail',
        options: [
          'the radiative properties of carbon dioxide',
          'the rate at which the ocean takes up heat',
          'the behaviour of clouds at small scales',
          'what human beings will decide to do'
        ],
        correct: 3,
        explain:
          'The opening paragraph names future human choices as the assumption a model must be run under. Cloud behaviour is a difficulty of physics, not an absence of it.'
      }
    ]
  },

  {
    key: 'the-afterlife-of-ruins',
    title: 'The Afterlife of Ruins',
    topic: 'Culture',
    level: 'C2',
    text: `Ruins are a taste, and like most tastes it has a history and an economics. The
eighteenth-century English gentleman who commissioned a fake abbey for the far end of his
park was not confused about what he was buying. He wanted the melancholy without the
inconvenience of a genuinely collapsed building, and he wanted it visible from the
drawing-room window at four in the afternoon, when the light was good. That his descendants
would find the sham embarrassing says less about his sincerity than about theirs.

The pleasure such objects afford is real and slightly disreputable. A ruin flatters the
observer: it presents the failure of somebody else's project while confirming the
durability of the observer's own moment, from which the whole sorry arc can be surveyed.
Rose Macaulay, who wrote the best book on the subject amid the rubble of a bombed London,
was honest enough to notice that she was enjoying herself and rigorous enough to ask why,
which is more than can be said for the photographers who have since made a genre out of
derelict Midwestern factories.

Where the taste turns questionable is where the ruin is recent and somebody is still living
in it. There is a well-documented sequence by which the aestheticisation of decay precedes
its purchase: the photographs circulate, the district acquires a reputation for atmosphere,
the leases turn over, and within a decade the atmosphere has been renovated out of
existence and the photographers have moved on to somewhere more authentically abandoned.
This is not hypocrisy exactly. It is a failure to include the inhabitants in the frame,
which is also, as it happens, a literal description of the photographs.

None of this is an argument against looking. Decay is one of the few subjects on which a
building tells the truth, and a society that could not bear to look at its own would be in
a worse condition than one that looks too fondly. But the fondness deserves examination.
There is a difference between contemplating mortality and collecting it, and the
distinction, though easy enough to state, has never been easy to see from the drawing-room
window.`,
    questions: [
      {
        prompt:
          'The descendants find "the sham" embarrassing. In this context, sham means:',
        kind: 'vocab-in-context',
        options: [
          'the expense of the project',
          'the deliberate imitation',
          'the neglect into which the estate fell',
          'the melancholy mood the ruin was meant to create'
        ],
        correct: 1,
        explain:
          'The sham is the fake abbey itself, commissioned rather than inherited. The writer\'s point is that later generations were embarrassed by the artifice their ancestor was quite open about.'
      },
      {
        prompt: 'Which best expresses the main idea of the passage?',
        kind: 'main-idea',
        options: [
          'Photographing abandoned buildings ought to be discouraged by law.',
          'The eighteenth-century taste for ruins was more honest than anything that followed it.',
          'The pleasure taken in ruins is genuine but self-flattering, and it becomes questionable when the ruin is still inhabited.',
          'Ruins are valuable mainly because they teach architects how buildings fail.'
        ],
        correct: 2,
        explain:
          'The second paragraph diagnoses the flattery in the pleasure and the third locates the ethical problem in occupied ruins. The final paragraph explicitly refuses to argue against looking.'
      },
      {
        prompt:
          'What does the writer mean by "a failure to include the inhabitants in the frame"?',
        kind: 'inference',
        options: [
          'The photographers used lenses that were too narrow for the subject.',
          'The residents refused to be photographed.',
          'The photographers did not realise the buildings were occupied.',
          'The images empty the district of the people living there, in the moral sense as well as the literal one.'
        ],
        correct: 3,
        explain:
          'The sentence turns a moral charge into a description of composition, which is why the writer adds "as it happens, a literal description". Ignorance is ruled out by the deliberate search for atmosphere.'
      },
      {
        prompt: 'What does the writer credit Rose Macaulay with?',
        kind: 'detail',
        options: [
          'inventing the modern taste for ruins',
          'photographing bombed London',
          'admitting her own enjoyment and asking why she felt it',
          'campaigning against the reconstruction of the city'
        ],
        correct: 2,
        explain:
          'She is praised for being honest enough to notice her pleasure and rigorous enough to interrogate it, in contrast to later photographers of derelict factories.'
      },
      {
        prompt: 'The writer\'s attitude towards those who enjoy looking at ruins is:',
        kind: 'tone',
        options: [
          'permissive with a caveat: looking is defensible, but the fondness deserves scrutiny',
          'condemning: the pleasure is straightforwardly immoral',
          'indifferent to the question',
          'admiring of the photographers\' aesthetic sensitivity'
        ],
        correct: 0,
        explain:
          'The last paragraph says plainly that this is not an argument against looking, then insists that the fondness be examined. Condemnation is exactly the position the writer declines to take.'
      }
    ]
  }
]
