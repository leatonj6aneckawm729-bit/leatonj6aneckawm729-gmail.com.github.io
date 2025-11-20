import { useState, useEffect, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { Book, FileText, PenTool, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@/styles/water-animations.css';

export interface LiteraryWork {
  id: string;
  title: string;
  type: 'poetry' | 'short-story' | 'novel' | 'article';
  style: string;
  description: string;
  excerpt: string;
  fullContent?: string;
  wordCount?: number;
  readingTime?: number;
}

export interface ReadingSettings {
  fontSize: string;
  lineHeight: string;
  fontFamily: string;
}

// 懒加载阅读器组件
const LazyReaderModal = lazy(() => import('./ReaderModal'));

// 优化的作品卡片组件
const WorkCard = memo(({
  work,
  onClick,
  mounted,
  index,
  isSelected,
  getTypeIcon,
  getTypeColor,
  getTypeBgColor
}: {
  work: LiteraryWork;
  onClick: (work: LiteraryWork) => void;
  mounted: boolean;
  index: number;
  isSelected: boolean;
  getTypeIcon: (type: string) => JSX.Element;
  getTypeColor: (type: string) => string;
  getTypeBgColor: (type: string) => string;
}) => {
  const handleClick = useCallback(() => {
    onClick(work);
  }, [work, onClick]);

  return (
    <div
      className={`glass-effect rounded-2xl p-6 hover-lift soft-shadow ripple-effect cursor-pointer smooth-transition ${
        mounted ? 'opacity-100' : 'opacity-0'
      } ${isSelected ? 'ring-2 ring-white/50' : ''}`}
      style={{
        animationDelay: mounted ? `${0.2 + index * 0.1}s` : '0s',
        animation: mounted ? `slide-in-up 0.6s ease-out ${0.2 + index * 0.1}s both` : 'none'
      }}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeBgColor(work.type)}`}>
            <div className={`bg-gradient-to-br ${getTypeColor(work.type)} bg-clip-text text-transparent`}>
              {getTypeIcon(work.type)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{work.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{work.style}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getTypeColor(work.type)} text-white text-xs font-medium`}>
          {work.type.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{work.description}</p>

      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 mb-4 border border-gray-100">
        <p className="text-gray-700 text-sm italic whitespace-pre-line leading-relaxed">
          "{work.excerpt}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {work.wordCount && (
            <span className="flex items-center space-x-1">
              <FileText className="w-3 h-3" />
              <span>{work.wordCount} words</span>
            </span>
          )}
          {work.readingTime && (
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>{work.readingTime} min read</span>
            </span>
          )}
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClick(work);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Read Now</span>
        </Button>
      </div>
    </div>
  );
});

WorkCard.displayName = 'WorkCard';

export const LiteraryWorks: React.FC = () => {
  const [selectedWork, setSelectedWork] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [readingWork, setReadingWork] = useState<LiteraryWork | null>(null);
  const [readingSettings] = useState<ReadingSettings>({
    fontSize: 'text-lg',
    lineHeight: 'leading-relaxed',
    fontFamily: 'font-serif'
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleReadWork = useCallback((work: LiteraryWork) => {
    setSelectedWork(work.id);
    setReadingWork(work);
  }, []);

  const handleCloseReader = useCallback(() => {
    setReadingWork(null);
  }, []);

  // 格式化文本内容函数 - 清理所有段落前的空格和缩进
  const formatContent = useCallback((content: string, title: string) => {
    if (title !== 'Industried Farm') {
      return content;
    }

    return content
      .split('\n\n')
      .map(paragraph => {
        // 清理段落前后的空白，移除所有前置空格和缩进
        let cleanParagraph = paragraph.trim();

        // 移除所有前置空格和制表符，不添加任何缩进
        cleanParagraph = cleanParagraph.replace(/^[\s　]+/g, '');

        return cleanParagraph;
      })
      .join('\n\n');
  }, []);

  const literaryWorks: LiteraryWork[] = useMemo(() => [
    {
      id: '1',
      title: 'The Industrialized Farm',
      type: 'novel',
      style: 'Lovecraftian style',
      description: 'A work that adopts a Lovecraftian style to embody the psychological wounds inflicted by modernization.',
      excerpt: 'You see, the genius of intelligent progress lies in this: the beasts believe themselves producers or consumers… while in truth, they are the product...',
      fullContent: formatContent(`The Industrialized Farm
0. The Green Field
It turned out that dreams, too, could have a touch.
A moist, warm wind brushed against Feng Zhi's face, carrying the raw scent of young grass.
He rose slowly from the ground.
The drizzle in the countryside leapt joyfully among the mud, splashing up little brown blossoms. In the distance, layers of spring grass shimmered like ink-blue mist.
All around were hazy silhouettes of people, rustling softly as they drifted through the fields—like flocks of sheep grazing on a boundless prairie.
For a moment, he felt utterly relaxed, every pore breathing freely.
Then, all at once, a flash of white split the sky above. Feng Zhi jerked his head upward—but no silver wings of steel appeared. The dark clouds whispered songs of rain.
Could it be that he had returned to that day?
Horror spread across his face. He waved his arms at the villagers.
"Be careful! They're coming! They're coming!"
"They're coming… coming…" The wet wind drilled into his ears, carrying the faint chant from within the fog.
"Wake up!" Feng Zhi shouted to the people around him. "They're coming! They'll take you away!"
"Take… away… take away…" The fog coiled around him—warm, strong, maternal.
"Please," he begged, "don't let them take us…"
Then, all at once, the figures in the fields turned their heads together. Feng Zhi followed their gaze in terror. The mist began to spin slowly, creaking like an ancient wooden door. Each groan carved through his skull.
His knees buckled, and he knelt meekly in the mud.
White ripples rose within the fog, breeding and shrinking like tendrils.Milky tendrils wove and dispersed in senseless rotation, as though painting a grotesque ink wash no human mind could decipher—yet with a strange, mesmerizing beauty, like a lone pale lamp flickering in endless night.
The thick fog parted in the middle.A playful breeze slipped through, teasing Feng Zhi’s hair, purring softly.
“Please… stop all this…” he sobbed.
“Go home… go home…” it murmured gently. “Find us…”
A shriek exploded beside his ear.Feng Zhi trembled.
They had come.
The ink - dark sky shattered under bursts of white light.Silver, metallic wings filled the heavens.
Grotesque angels fluttered down, shedding metallic dust like swarms of moths.In their hands gleamed iron picks that birthed endless deformed spikes from the soil.
These unholy spires tore apart the tranquil countryside and intertwined in obscene ecstasy, forming colossal geometric structures.
  Then, translucent stones rose from the ground, glowing with star - like brilliance.
In an instant, a vast metropolis erupted from the carcass of his homeland.
1. The Manufacture of Anxiety
When Feng Zhi finally awoke from his nightmare, the alarm clock in his room was still screaming.
A flat mechanical voice droned:
“Good morning, dear workers! Welcome to Anxious Manufacture! Anxious Manufacture—the beautiful home of all workers!”
Still dazed, Feng Zhi rose from his bed.Screens lit up around him, casting a swollen, corpse - like pallor through the room.The sleepers’ groans and mutters wove together into an unpleasant hymn.
He straightened his bent back and shuffled into the corridor.Shadows wriggled at his feet, and pipes slithered along the walls like serpents.
Ever since his hometown was destroyed, Feng Zhi had been trapped in this factory.
“Anxious Manufacture is dedicated to providing the highest quality of anxiety,” the monotone voice echoed. “Our smart factory has undergone a full technological upgrade, far surpassing outdated industries that once specialized in mere physical pain.We understand: physical pain is insignificant, powerless before the human will.Iron nails wear down faster than gloves, and, as proven, are not environmentally friendly.Our intelligent products now feature the latest titanium chips and the Howler 4000x drive, processing data and emotion with higher efficiency—to deliver you a more personalized, sustainable anxiety experience.”
Dragging his feet, Feng Zhi entered the workshop.The walls were made of a flawless, cold metal that gleamed like tarnished bronze.Huge gears were embedded in the surface like the buckteeth of some monstrous rabbit, turning endlessly throughout the year.
No one knew what purpose those gears served—other than occasionally seizing a worker’s arm.
The broadcast volume suddenly rose, crackling with malignant static:
“The Pain Box—our most advanced product! Featuring the revolutionary dual - layer XSD circuit, pure gold filaments, and high - performance zinc - steel cooling fans—greatly enhancing safety hazards! Titanium chip clusters ensure optimal anxiety output for every user!”
A gray conveyor belt slithered before Feng Zhi like a river of stinking wastewater.Countless razor - edged plates divided the workspace so that each person barely fit between two slabs of iron.
Stretching or moving one’s arms was forbidden.
Sweat beaded in his palms.He no longer remembered how long he had worked here, but each day his heart would pound at this exact moment.
The twin iron slabs loomed before him, silent and menacing.Feng Zhi took a deep breath, forcing calm, and stepped into his station.
“This is the last time,” he told himself. “Tonight I’ll escape.”
A digital screen rose before him, glowing blood - red:
00:00
Four zeros glared like engorged, diseased eyes; the colon between them flickered nervously, as though pleading innocence.
The factory fell silent.Only the gears on the walls turned aimlessly, grinding out hoarse groans.
Every worker stood motionless between the slabs, waiting for the work bell.
Feng Zhi waited too.It would ring sooner or later.
The gears droned.
  Today, it seemed late.The air grew heavy, viscous.
He dared not relax—because when that bell rang, it pierced the heart like a blade.And it would come.Any moment now.
The gears droned.
Still nothing ? The air felt solid, compressing his chest.
From somewhere nearby came a harsh cough, then another.The echoes rattled through the metal hall.
The gears droned.
Why hasn’t it—
BEEP!
A sharp scream stabbed through Feng Zhi’s chest, almost stopping his breath.
The conveyor groaned; the display flickered.
03:00.
“Processing time per component,” it commanded. “Proceed.”
With a metallic clack, a half - finished Pain Box slid to Feng Zhi’s station.The timer began its furious chant:
Tick - tick - tick - tick - tick - tick!
Feng Zhi snatched up the gold filament and untied a knot with trembling speed.
His task was to connect the golden wires within the Pain Box.They said the filaments were mined in the gold mountains of Peru.Swiss goldsmiths were hired to—
BEEP! BEEP! Overtime imminent! a machine shrieked somewhere down the line.
—to carve exquisite micro - sculptures upon each filament: The School of Athens, Saturn Devouring His Son—then they would be shipped to—
BEEP! BEEP! One overtime recorded! Some fool had failed.The timer screamed incessantly: “One overtime! One overtime!”
Feng Zhi sent off a finished box.Clack.Another slid into place, exposing a nest of gold threads.
Where was I ? Ah yes—after the Swiss engraving, the filaments were sent to Paris for perfume—
BEEP! BEEP! Overtime imminent! Please focus!
Another fool makes a mistake.
“EeeeeeaaaAAAHHHHH!”
A Pain Box shrieked like a child the moment it was completed.
That was the mark of a high - quality Pain Box.
Every premium unit, upon completion, would inevitably let out—
“Eee—eee—eee—EEEEAAAAAAHHHHHHHH!”
Another top - grade Pain Box howled in exquisite agony.
Amid the roaring noise, Feng Zhi’s hands trembled as he uncoiled the golden filaments and fixed their edges to the five inner clasps of the box.His fingers danced—swift and serpentine—while sweat streamed down his forehead, blurring his sight.
The filaments always arrived tangled, their edges sharp, their texture rough—any small mistake would slice open a fingertip.Feng Zhi’s task was to fasten these wires onto the five—
BEEP BEEP BEEP BEEP!
“Two overtimes! Two overtimes!”
“Eee—eee—aaAAAH—two over—AAAHHHH!”
“Beep—beep—four over—beep—beep—two over—three over—beep—beep—four overtimes!”
As we were saying, Feng Zhi’s duty was to fix each filament upon the five inner clasps of the Pain Box—then seal it shut.
It was meaningful work, ensuring that no internal component could ever be seen or touched.This prevented customers from tampering with them for pleasure, which would otherwise lead to inefficient anxiety experiences.
“Eee—eee—EEEEAAAAHHHH!” screamed another box.
Feng Zhi tried to wipe the sweat from his brow, but a filament slit his hand open.The timer flared red.
“Injury detected! Injury detected!” it shrieked.
“Analyzing trauma! Anxious Manufacture hereby issues the following statement:
First, we deeply care—aaAAAH—about employee well - being.
  Second, you are permitted to leave work early—beep beep beep—
Third, you must complete your daily quota!
To assist you in finishing early, production speed will now increase!”
Beep beep beep beep beep!
“Ten overtimes! Beep beep beep beep!”
Feng Zhi gritted his teeth.His fingers leapt even faster, twitching uncontrollably as sweat poured from his face.
The noise clawed at him from every direction, trying to rip his ears off.He felt like a fish pressed flat under an iron spatula, sizzling on a dry griddle—his moisture draining away, dying parched and rigid.
Hold on.You must hold on! he screamed inwardly.
“AAH—beep—AAH—four—beep—six—beep—two—AAH—beep—injury—beep—injury—AAAH—team—beep—checking—AAAH!”
“Eee—eee—EEEEAAAAHHHH!”
Then, suddenly, the last Pain Box finished its shriek.The world fell silent—except for the soft beep beep beep ringing in Feng Zhi’s skull.
“Dear worker,” the machine droned,
“we thank you for your contribution to Anxious Manufacture.
Your labor is meaningful.Your value—extraordinary.
You have made an outstanding contribution to the consumers of anxiety.”
Feng Zhi slumped against the iron slab.The cold surface made him shudder; his back was soaked in sweat.
Another day survived.
  Gray - black Pain Boxes crawled along the conveyor belt, vanishing into a dark aperture at the far end of the factory.
Although everyone on the line took part in their creation, no one knew what these things were truly for.Most refused even to look at them.
But Feng Zhi had observed one once.It was a small gray box with a pair of plastic eyes stuck to the front—like a child’s broken toy.Its only known function was to emit random screams.
Yet Anxious Manufacture never engaged in false advertising.Feng Zhi could testify that each box contained the latest technologies: titanium chips, zinc - steel cooling fans, gold filaments, speakers.
All of it welded permanently inside.
No wires.No batteries.No sockets.
Then how—how did that thing scream ?
  What kind of deranged, ecstatic mind could design—or desire—such a product ?
    Whenever Feng Zhi tried to think about it, pain bloomed behind his eyes, as though his thoughts were colliding with an invisible wall of flesh and metal.
      Bang.
The last Pain Box slid into darkness, and the assembly line halted.
Feng Zhi dragged himself out of his station, leaving behind a long smear of sweat—like a dissolving snail.His coworkers bore the same hollow faces; no one spoke.
  Ahead, a gentle light flickered on.
“Workers, thank you for your effort! Please proceed to The Metropolis and enjoy your thrilling nightlife! The Smile Wholesalers and their products await your service!”
2. The Smiles Wholesaler
Time was unusually merciful in this city.
When night descended, the clock hands simply stopped.
The night here stretched like an infinite serpent of gluttony, swallowing the hours whole.Workers no longer feared the passing of time; they merely slithered up and down the map, waiting to devour the scarlet fruits that appeared at random—watchful only for the moment they might bite their own tail.
They could indulge themselves in endless mirth—until they collapsed.
In the blink of an eye, Feng Zhi found himself standing before a storefront, staring at a screen that blazed with unbearable brightness.
Entertainment in this city, it seemed, chose its own audience.
“The Smiles Wholesaler—forever loyal to our customers, providing the most efficient laughter available!”
The shop stood beneath a transparent obelisk.On its massive display, a cheerful public advertisement rolled:
“Our hottest smile - products are always ready to wash away your sorrow and anxiety!”
Between the obelisks, laughter filled the streets.In every shop window, rows of flickering electronic screens had long replaced any tangible goods or price tags.
“Unlike the outdated retail stores of ancient joy,”
the display explained,
“we no longer traffic in vulgar goods or foolish wrappings, for priced happiness is not true happiness! We release laughter through fiber - optic cables, liberate delight in the Wi - Fi signals, let smiles drift like violet - red sea stars through the city—efficiently clinging to every human face! Custom - designed laughter solutions! Mass - produced smart happiness! Absolutely free joy!”
The ad faded.Two cartoon cats appeared.
It seems another Cat Meme.
“Mrrrow - mrrrow!” one hissed fiercely at the other.
Text appeared: ‘All my family are dead.Every day hurts so much.What should I do?’
“Meow,” whispered the second cat.
  Text: ‘Play with your phone.’
The first cat bristled, “Mrrrow! Mrrrow! Mrrrow!”
The first cat cired, “Mrrrow! Mrrrow!”
Text: ‘I am so painful! Please help me.’
“Meow,” murmured the second cat, meek and pitiful.
  Text: ‘Your assistance quota has been exhausted.Please upgrade to a membership to unlock additional question credits..’
People around Feng Zhi burst into laughter.
“So true! My grandma used to ask me that exact thing—had I been sneaking candies again!”
“Oh my god, was everyone’s childhood the same template ?”
“Wait—why does this feel exactly like me and my girlfriend talking ?”
“Didn’t you hear the ad ? Personalized laughter plans!”
A dark shadow poured over Feng Zhi’s forehead and trickled down his cheek.
A chill rose within him.
The Smiles Wholesaler knew his past.
  Then… did it also know he was trying to escape ?
    Before he could react, another video began.
A white cat appeared.Its limbs were grotesquely elongated, as if pulled upward by invisible hooks.Its forelegs stretched taut toward the heavens, nailed by unseen barbs, while its hind legs convulsed upon the ground.Beneath its jet - black eyes opened a vast, blood - red grin.
It was laughing—at him.
Feng Zhi’s stomach lurched.He tried to back away, but the cat began to speak.
“Happy! Happy! Happy!”
It leapt in rhythm, laughing in hideous syncopation.
“Ha - ha! Ha - ha! Ha - ha!”
Feng Zhi pushed through the crowd in panic, but the cat pursued, riding a shadowy gust that clung to his spine, cackling madly.
“Happy hpy happ hppy happsad happhate happkill happkilled hateppy hatehatehahatehahathatehate—!”
Feng Zhi ran, gasping, until a white light blocked his path.
“Why are you unhappy ?” it asked.
“I’m not interested in this content!” he blurted out desperately. “Do you—do you know how to get to Wenhu ?”
“Your feedback has been received.We will optimize your recommendations accordingly.”
The light flashed—and Feng Zhi was transported into an enormous boutique.
Above the entrance hung an ornate signboard:
Wenhu Specialty Store.
Premium content, hand - picked for you.
Feng Zhi realized his destination was close.He sprinted down the main aisle, past countless figures whispering, scrolling, thinking.Every corridor shimmered with illusionary texts:
“Pigsy is dead.He…”
“The Oath of the Peach Garden was a monumental fraud…”
“Welcome to Green Meadow.Please obey the following rules…”
“What’s it like to date the boss in a horror story ?”
Suddenly, a rough hand seized his wrist.
A man with frog - like eyes grinned.
“Wanna join our dungeon run ? It’s top - tier folklore horror—S - Rank instance, four million reward.We split it evenly.”
“Just him ?” sneered a pale scholar.
“DBAA, don’t be an asshole.” muttered a gaunt, dark - skinned boy, “You even have a Wenhu membership ? Without it, you can’t unlock the full content.”
Feng Zhi ignored them and turned to leave.The frog - eyed man shouted after him:
“There’s a lot of prerequisites, yeah—but the rewards are—”
He didn’t stay to listen.
The marketplace behind him thundered with noise as he slipped into a quieter alley.
  Here, the air reeked faintly of ink and old timber.Though the storefronts still glimmered with digital light, the aroma carried the melancholy of books—paper spines and decaying glue.
It was the kind of place that attracted the era’s strangest creatures.
A pale man burst from a side alley, wearing a cropped shirt and flowered shorts.Grabbing Feng Zhi by the collar, he glanced about nervously, a long, bony finger pressed to his lips.
“Hey—you know what ? Kennedy was actually a hook - seller.”
A glowing red heart pulsed over his chest, counting the upward climb of his likes.
Further along, a monk twirled plastic beads with saintly patience.An LED halo of rotating characters framed his shaved head, painting his face in holy light. 
On his tablet glimmered a golden holographic Buddha—and beside it, a QR code even more merciful than the Enlightened One:
All payment methods accepted.
A scientist in a stained lab coat sat cross - legged behind a stall, shouting over the noise:
“Top - grade Illuminati scepters! Subscribe for full content access! Genuine dragon bones from the Northeast! Leave your thoughts in the comments! Did you know the Queen of England was a lizard ? Only 13 yuan per month!”
At the end of the alley stood a small, peculiar shop.
No screens—only books.
The light inside was dim, the air thick with dust and shadows.The covers of old volumes were coarse, their pages bound with black thread and rusted staples that twitched like living worms.
The place was crowded—rarity breeds demand.
Feng Zhi pushed past people taking selfies with books and approached the old man behind the counter.
“I’m Feng Zhi,” he whispered. “I’m here to see the Professor.”
The old man eyed him for a long moment.
“Signed up for the class, have you ? This way.”
3. The Night School of Reason
A corridor had appeared out of nothingness at the far end of the bookshop.
On both sides stood towering bookshelves, each lined with volumes meticulously preserved, bound in dark brown hide and embossed with letters of gold.
“Is this the place ?” Feng Zhi asked the old gatekeeper.
“If not here, then where ?” the man muttered, pointing lazily ahead.
Feng Zhi stepped forward.The golden titles crept past him like sluggish worms:
The Cartesian Essay Strategy.
Plato teaches you how to apply for Degree in Philosophy
Yes, You Can: Nietzsche’s Aesthetic Writings
At the end of the corridor lay a vast study, its door inscribed:
Rational Vocational Institute.
In the center stood a cushioned armchair.
The Professor of the Institute lounged comfortably within, awaiting Feng Zhi’s arrival.
“You are a brave young man, Feng Zhi,” the Professor said, spreading his hands in gentle admiration. “You wish to understand this world more deeply.”
“No,” Feng Zhi replied flatly. “I want to escape it.”
The Professor nodded. “Precisely.Yet in order to escape, one must first understand the world…”
“You’re not listening!” Feng Zhi roared. “I don’t want understanding! I want out! I want to go home!”
“All right, all right.” The Professor waved his hands nervously. “But we must pretend otherwise first.You must appear to seek knowledge.That’s the rule here.Only graduates of this institute are permitted freedom of action.Understand ?”
“Fine,” Feng Zhi sighed, sinking into the chair opposite him.
“Don’t worry.It won’t take long.”
The Professor opened a book.
“Our first lesson: The History of Farm Development.Please list five defects of traditional farming.”
“Large land use, low efficiency…” Feng Zhi rubbed his temples.
“That’s fine,” said the Professor, adjusting his glasses. “We’re merely going through the motions.You are correct—inefficiency is the fundamental flaw.Consider: livestock roaming freely across vast pastures, idling through long growth cycles.A political and economic catastrophe! We had to improve it, naturally.”
“Of course.Obviously.” Feng Zhi nodded, glancing around for a clock.
“The improvement was simple,” the Professor continued smoothly. “Concentrate the herds, strip away their mobility, and fill them with industrial feed.Efficiency—that is the triumph of the modern farm.The new farmers thus replaced the old.”
“Wonderful.So… is the class over?”
“Is it truly so simple ?” the Professor smiled thinly. “Indeed, the beasts yield more meat—but constant bodily agony spoils the flavor.Their flesh grows coarse.”
“So we return to traditional agriculture ?”
“Certainly not!” The Professor chuckled. “Reactionary methods can never solve the problems born of progress.We must instead employ smart technology.Give the livestock a sense of autonomy, keep them in vigorous motion to tighten the flesh—while simultaneously delighting their minds, to heighten savor.You see, the genius of intelligent progress lies in this: the beasts believe themselves producers or consumers… while in truth, they are the product.”
“I see,” murmured Feng Zhi, unwillingly intrigued. “Then—”
“Enough,” said the Professor, tossing the book into a trash bin. “You pass.Grade: B - plus.”
He opened another volume; the gold letters glimmered faintly.
The Human Psychological Cookbook
Feng Zhi blinked.A moment ago, he could have sworn it read The Psychology of Man.
“Don’t think of running,” warned the Professor. “University Psychology is compulsory, even when useless.Observe—if anxiety were a flavor, it would be salt and pepper: crisp, sharp, a savory tang of dread.Happiness, on the other hand, resembles cane sugar—cloying, crystalline…”
Suddenly, the Professor snapped the book shut.
“All right.I declare you graduated.We’ve reached our word limit.”
“Our… what ?”
“The word limit,” said the Professor matter - of - factly. “My narrative budget is fragmented.You must understand—brevity preserves funding.Without enough content, there’s no incentive to purchase the next installment…”
He grinned, placing the book beside him.
“Feng Zhi, the Smiles Wholesaler controls this city.The only legal exit is through tourism.But—I have another way.”
He paused. “I’ll make preparations.Wait here.”
The Professor turned—and his form melted into the shadow, vanishing entirely.
Feng Zhi wandered the study aimlessly, picking up books at random.
In A Brief History of Geological Disasters, a great earthquake had annihilated a village; almost all perished.The white light before the quake, it noted, was the key to survival.
A news piece chronicled a flourishing industrial city, swelling with migrant labor.
Social Psychology recorded the suicide of a factory worker—a textbook case of depression.
Another medical text claimed that moments before death, the human brain… accelerates.
“Hey, Feng Zhi! We’re running out of time!”
The Professor’s voice rang behind him.
“I even skipped my physical description to save words!”
Feng Zhi turned to see the flushed, panting man.
“What are you waiting for, Feng Zhi ?” the Professor urged.“We must depart.”
4. The Green Fields ?
  Before him, a long tunnel stretched into the distance, its walls coated with a strange black substance.From afar, it resembled gelatin, but on closer inspection, black tendrils slithered like snakes within the slick, flesh - like mass, clustering densely into a diseased crimson tumor.
“This is the passage you mentioned ?” Feng Zhi asked the professor, skeptical.
“If you don’t believe me, go sign up for the eco - tour,” the professor said with a sneer. “The Smile Wholesalers will provide you with the ‘most authentic’ rural experience!”
Feng Zhi steeled himself and stepped into the tunnel.With each step, the walls wriggled and shimmered underfoot, releasing rippling, eerie patterns.A foul, bloody stench hit him, almost suffocating him.
For a moment, he thought his nose was bleeding, but when he touched it, nothing was there.
  Suddenly, a familiar scent gripped him.Ahead, a white light glimmered faintly, revealing green fields.
The Green Fields.
Feng Zhi ran forward.The tunnel, covered with grotesque patches of blood - like matter, shook violently, letting out hoarse screams.Yet he paid no mind; he remembered the crisp scent of lotus under moonlight, the reeds swaying beneath the stars, the thick earthy smell of the fields.
The familiar aroma pulled him forward, like a herdsman guiding a cow by the nose ring.He ran until the white light poured over him, and a familiar breeze caressed his cheeks.
The verdant fields unfolded under the sun.His villagers worked in the fields, and the distant sound of a shepherd’s flute reached his ears.Tears streamed down Feng Zhi’s face as he fell to his knees, calling out.His villagers shouted joyfully, abandoning their tools to rush toward him.
Everything lost had returned.
  Familiar, warm faces surrounded him, cheering and singing for his return.
“You are…” an old white - haired man said, placing a hand on Feng Zhi’s shoulder, “you are Feng Zhi ?”
The old man spoke in Wu dialect, Feng Zhi’s native tongue.
“How did you know ?” Feng Zhi asked in surprise.
The old man’s silver eyebrows framed mischievous eyes, and a thick white beard adorned his face.
“I could recognize your scent,” the man said, clapping his hands with a smile. “You were the lost child, I knew it.”
Feng Zhi trembled, tears streaming down his cheeks.He hugged the old man tightly.
The white - haired man patted Feng Zhi’s back. “Since you’re home, you need a wife.We have many girls for you to choose from!”
He laughed heartily, stroking his beard. “Good heavens, they’ve raised you strong and well - fed.”
“Well - fed ?” Feng Zhi looked at his own thin frame.
“It’s the soul, child, your soul.Tonight, we shall dedicate you once again to the master.” The old man raised his hands to the sky. “Sow thou the hundred - fold grains, with ten thousand labors entwined.”
“踎——嘥——” the villagers responded solemnly.
“In my homeland dwells serene fortune, yet all bows to the True Sovereign.”
“踎——嘥——”
“Select the new bride—”
“踎！嘥！”
Feng Zhi was struck senseless by happiness as a group of girls wearing flower crowns entered his sight.White, fragrant glutinous rice sprinkled with black sesame and mixed with red dates was offered to Feng Zhi.Mugwort was wrapped around Jilin’s wrist, claimed to please the gods.
Feng Zhi finally chose a girl.They stripped him naked and placed him into a hot water tub filled with flower petals.The water scalded him red, like a steamed suckling pig.
A beautiful, warm life!
He remembered that as a child, villagers would offer young boys and girls to the ancestral temple’s gods, and those children shed tears of happiness.Tonight was no different.
The moon rose high.Villagers dressed Feng Zhi and led him to the ancestral hall.The red wooden building with its flying eaves glowed faintly with incense light.The smoke swirled, and for a moment, Feng Zhi thought he saw a figure on a white horse, staggering drunkenly inside.Then he looked again—his bride, wearing a blood - red veil, stood at the center of the hall, awaiting him.
Yet now he felt something strange.Villagers smiled as they pushed him into the hall.The dim light and pale incense smoke pressed upon him.The wooden door behind him creaked as if it were groaning in resentment.
The white - bearded man guided Feng Zhi to the bride.Feng Zhi glanced at the incense - lit altar but could not make out the deity.
The old man muttered a prayer.The guttural, raspy ancient Wu language echoed through the room.Villagers’ shadows flickered on the walls, like a banquet of ghosts in hell.
“Wuhu, O heavenly God, Wuhu, O Most High! I toil upon millet and grains, and naught I trust but the mercy of the Divine will.” the old man chanted.
“踎——！嘥——!”
Four villagers approached with smiles.Two held the bride’s arms; two gripped Feng Zhi’s shoulders.
“My granaries are brimm’d full, my storehouses teem with abundance.These I offer as meats and libations, to be relished and revered by the gods!”
“踎——！嘥——!”
They forced Feng Zhi and the bride to kneel.He panicked, looking around.They slammed their heads to the ground, blood running down Feng Zhi’s forehead.
“hee - hee - hee.......” The bride laughed strangely after a blow.
“Choose thou the kine and flock, for ages past consumed; whether flayed or sliced, whether boiled or roasted.”
“踎——！嘥——!”
Again, he fell; his nose broke, and he wailed.
“Giggling, hee - hee - hee - hee - hee - hee!” The bloodied bride’s laughter echoed in the room.
“The God delighteth in repast; grant me long life, I pray.”
“踎——！嘥——!” the villagers shouted in unison.
Blood spurted again.Feng Zhi staggered to his feet, covered in it.
“hee - hee - hee - hee - hee - hee!HAHHAHAHHA!” The bride shivered violently, her red veil soaked, leaving a dark, shocking mark.
“Feast the God——” the white - bearded man bellowed, “Please descend——无量九天宏教掌阴阳功过大道思仁紫极仙翁!”
The dry incense smoke was parted by mist.Feng Zhi’s eyes widened as two crane - like children floated out.They wore Taoist robes, one red, one white, eyes half - lidded with meteor - like pupils, porcelain skin blushed with blood - red layers, small mouths revealing sharp fangs.
“Behold, the celestial page——” the old man shouted.
The children landed, their necks “咔咔咔” turning, smiling at Feng Zhi and his bride.
“hee - hee!HAHHAHAHHA!” The bride trembled with laughter, her red veil bubbling with blood.
“Feast the page，more offspring, greater fortune——” The old man tore off the veil, tossing it into the air.A shower of blood rained on the children, who laughed wildly: “kakakakak........”
Feng Zhi turned to see his bride kneeling motionless, her face painted with a pair of danfeng eyes and two red blushes.
A paper bride ?
  But she had been alive just moments ago…
Feng Zhi trembled like a leaf in the wind.
  Suddenly, he heard the whinnying and galloping of a horse.A stiff ceramic horse emerged from the mist, its hooves white and pierced with blood - red barbs.Silver puppet strings extended upward from the barbs.
The horse’s back was empty.
“The celestial steed arriveth — rise, O bridegroom, and greet it!” the white - bearded man shouted.
Feng Zhi was lifted and brought before the beast.
The ceramic horse’s milky eyes rolled, revealing blood - red pupils.It neighed satisfactorily.
“The bridegroom hath won the favor of the steed — summon, I pray thee, the Celestial Lord!”
“Wuhu, O heavenly God, Wuhu, O Most High! I toil upon millet and grains, and naught I trust but the mercy of the Divine will.” villagers shouted loudly.
“踎——！嘥——!”
The strange, dense mist gradually dispersed.Feng Zhi shivered.
“My granaries are brimm’d full, my storehouses teem with abundance.These I offer as meats and libations, to be relished and revered by the gods!”
“踎——！嘥——!”
He suddenly recalled The Human Psychological Cookbook: Anxiety tastes like salted crispiness, joy like cane sugar… But what flavor is fear ?
“Choose thou the kine and flock, for ages past consumed; whether flayed or sliced, whether boiled or roasted!”
“踎——！嘥——!”
Something ancient and evil stirred in the mist, mounting the ceramic horse.
“The God delighteth in repast; grant me long life, I pray!”
“踎——！嘥——!” villagers shouted in unison.
Feng Zhi suddenly felt a sense of release.
This was the fate of livestock.
Whether on an industrial farm or a traditional farm, one cannot escape being consumed.
But at least he was home.
At least the suffering and terror before him were real.
At least he no longer lived in a void of meaning and depression…
Being devoured by the gods was the best ending for livestock.
“Welcome to China’s folklore S - level dungeon,” a voice said in his ear.
  Wait—? Feng Zhi opened his eyes abruptly.
    No.
“Your identity is Player.Please follow the rules: First, the white - haired elder is untrustworthy…”
No no no!
“Second, the bride is trustworthy… until she becomes paper.”
No no no no! Stop! Stop!
“System error, do not resist.Third, the fairy children, the divine beast, and the white horse are all evil gods.”
No no no no no! Feng Zhi screamed in despair.
“Fourth, Smile Wholesalers sincerely serve you! In collaboration with Anxiety Manufacturing, we provide the truest horror experience!”
“They’re all lies!” Feng Zhi yelled at the monsters. “I never escaped! I just want my past life back! I just want my life back! What wrong have I done! I just want to live freely! What wrong have I done! What wrong have I done!”
“So lively!” He heard shouting behind him.A burly man, a scholar, and a youth appeared at the temple door, holding Gatling guns. “It’s alright, times have changed!”
Bullets sprayed, blood flew.
Feng Zhi curled on the ground, covering his head.
“Don’t joke,” he pleaded.No one heard him. “Please! Don’t joke!”
They shot the cultists and evil gods, laughing wildly.
This wasn’t right.
Feng Zhi would rather be devoured by the god than return to that sick life.
That meaningless life.
But what was real ? What was false ?
  Had his past always been fabricated ?
    Had the green fields never existed ?
      Yet they clearly had! That had been his home!
Had it all been his imagination…
Why couldn’t he just die peacefully!
“Welcome to China folklore S - level dungeon: Green Fields.” The voice in his head said.
Shut up.
Feng Zhi roared, banging his head against the ground.
“Wellllllcccccome to Ccchhhchhina fssolkldsore Sdsad - l2eqvel dungeon: Green Fields.”
Shut up!
He slammed his head again.
“Wellllldasdao dsCcchhhfsachadssadaolkldsore Sdsad - l2eqvel dundasdaon: Gewqeen Fieldddddddds.........”
Shut! Up!
Feng Zhi hit the ground one last time.
The voice stopped.He lay on the scorching concrete floor, brain matter slowly seeping from his skull.
Had he died ?
  Had he returned to the Green Fields ?
“Hold on.” A burly man shook him with a Gatling gun.
“Don’t die, Feng Zhi.It’s all a dark web company conspiracy.They are the masterminds behind Anxiety Manufacturing and Smile Wholesalers.They created countless folklore dungeons just to
—————Minimum 0.3 yuan / day to activate membership and view full content—————
`, 'The Industrialized Farm'),
      wordCount: 5596,
      readingTime: 1
    }

  ], [formatContent]);

  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'poetry':
        return <PenTool className="w-4 h-4" />;
      case 'short-story':
        return <FileText className="w-4 h-4" />;
      case 'novel':
        return <Book className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  }, []);

  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'poetry':
        return 'from-purple-400 to-pink-500';
      case 'short-story':
        return 'from-blue-400 to-cyan-500';
      case 'novel':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-yellow-400 to-orange-500';
    }
  }, []);

  const getTypeBgColor = useCallback((type: string) => {
    switch (type) {
      case 'poetry':
        return 'from-purple-100 to-pink-100';
      case 'short-story':
        return 'from-blue-100 to-cyan-100';
      case 'novel':
        return 'from-green-100 to-emerald-100';
      default:
        return 'from-yellow-100 to-orange-100';
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* 头部标题 */}
      <div className={`text-center mb-8 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } smooth-transition-slow`}>
        <h2 className="text-4xl font-bold gradient-text mb-4">Literary Works</h2>
        <p className="text-gray-600 text-lg">Exploring narrative boundaries through creativity and imagination</p>
      </div>

      {/* 作品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {literaryWorks.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            onClick={handleReadWork}
            mounted={mounted}
            index={index}
            isSelected={selectedWork === work.id}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            getTypeBgColor={getTypeBgColor}
          />
        ))}
      </div>

      {/* 统计信息 */}
      <div className={`glass-effect rounded-2xl p-8 text-center soft-shadow smooth-transition ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        animationDelay: mounted ? '0.8s' : '0s',
        animation: mounted ? 'slide-in-up 0.6s ease-out 0.8s both' : 'none'
      }}>
        <h3 className="text-2xl font-bold gradient-text mb-6">Literary Portfolio Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '12', label: 'Poems', icon: PenTool, color: 'from-purple-400 to-pink-500' },
            { number: '8', label: 'Stories', icon: FileText, color: 'from-blue-400 to-cyan-500' },
            { number: '2', label: 'Novels', icon: Book, color: 'from-green-400 to-emerald-500' },
            { number: '15', label: 'Articles', icon: FileText, color: 'from-yellow-400 to-orange-500' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 懒加载阅读器模态框 */}
      {readingWork && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="text-gray-700">Loading reader...</span>
              </div>
            </div>
          </div>
        }>
          <LazyReaderModal
            work={readingWork}
            onClose={handleCloseReader}
            initialSettings={readingSettings}
          />
        </Suspense>
      )}
    </div>
  );
};