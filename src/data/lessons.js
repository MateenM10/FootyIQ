const lessons = [
  {
    id: 1,
    icon: 'football-outline',
    title: 'The Basic Rules',
    category: 'Beginner',
    track: 'beginner',
    content: [
      {
        heading: 'The objective',
        body: 'Soccer is simple at its core: score more goals than the other team. A goal is scored when the ball crosses the opposing team\'s goal line between the posts and under the crossbar. The team with the most goals at the end of 90 minutes wins.',
      },
      {
        heading: 'The match',
        body: 'A match lasts 90 minutes, split into two 45-minute halves with a 15-minute break at half-time. The referee can add extra time at the end of each half to make up for stoppages — this is called injury time or stoppage time.',
      },
      {
        heading: 'The players',
        body: 'Each team has 11 players on the field, including one goalkeeper. Teams can make a limited number of substitutions during the match — typically up to 5 in most competitions. If a player is shown a red card, their team must play with 10 men.',
      },
      {
        heading: 'Restarts',
        body: 'When the ball goes out of play, the game restarts in different ways depending on who touched it last. A throw-in is taken when the ball crosses a sideline. A goal kick is taken when the ball goes over the end line off an attacker. A corner kick is awarded when it goes over the end line off a defender.',
      },
    ],
  },
  {
    id: 3,
    icon: 'shield-outline',
    title: 'Fouls & Cards',
    category: 'Beginner',
    track: 'beginner',
    content: [
      {
        heading: 'What is a foul?',
        body: 'A foul is an unfair action against an opponent — usually illegal physical contact. Common fouls include tripping, pushing, holding, or charging into a player recklessly. The referee awards a free kick to the team that was fouled.',
      },
      {
        heading: 'Yellow cards',
        body: 'A yellow card is a formal warning. Players receive them for persistent fouling, time-wasting, unsporting behaviour, or dissent toward the referee. Two yellow cards in the same match result in a red card and the player is sent off.',
      },
      {
        heading: 'Red cards',
        body: 'A red card means immediate dismissal. A player can be sent off for violent conduct, a serious foul, denying an obvious goal-scoring opportunity (sometimes called a "professional foul"), or receiving two yellow cards.',
      },
      {
        heading: 'Free kicks',
        body: 'After most fouls, the team that was fouled takes a free kick from the spot of the foul. Defenders must stand at least 9.15 metres away. A direct free kick can be shot straight at goal; an indirect free kick must touch another player first.',
      },
    ],
  },
  {
    id: 7,
    icon: 'flag-outline',
    title: 'Offside Explained',
    category: 'Beginner',
    track: 'beginner',
    content: [
      {
        heading: 'The offside rule',
        body: 'A player is in an offside position if any part of their body that can legally play the ball is closer to the opponent\'s goal line than both the ball and the second-to-last defender — usually the last outfield player — at the moment the ball is played to them.',
      },
      {
        heading: 'When offside is called',
        body: 'Being in an offside position is not itself an offence. A player is only penalised if they are "actively involved in play" — receiving the ball, gaining an advantage, or interfering with an opponent. The assistant referee raises their flag and play stops for an indirect free kick.',
      },
      {
        heading: 'Common exceptions',
        body: 'You cannot be offside from a goal kick, corner kick, or throw-in. You also cannot be offside if you are in your own half. These exceptions exist to prevent the rule from unfairly stopping restarts.',
      },
      {
        heading: 'VAR and offside',
        body: 'Video Assistant Referee (VAR) technology is used in many competitions to review offside decisions. Officials can draw lines on a freeze-frame of the moment the ball is played to check whether any body part was beyond the last defender. This has made the rule stricter and more precise — sometimes controversially so.',
      },
    ],
  },
  {
    id: 2,
    icon: 'people-outline',
    title: 'Player Positions',
    category: 'Positions',
    track: 'positions',
    content: [
      {
        heading: 'The goalkeeper',
        body: 'The last line of defence. The goalkeeper is the only player allowed to handle the ball, but only inside their own penalty area. Their primary job is to stop the opposing team from scoring.',
      },
      {
        heading: 'Defenders',
        body: 'Defenders protect the goalkeeper and prevent the opposition from creating chances. Centre-backs are the two central defenders who mark opposing strikers. Fullbacks play on the left and right sides, defending wide areas and often supporting attacks.',
      },
      {
        heading: 'Midfielders',
        body: 'Midfielders link defence and attack. Defensive midfielders (holding midfielders) sit in front of the defence and break up opposition play. Central midfielders control the tempo. Attacking midfielders or number 10s play behind the strikers and create chances.',
      },
      {
        heading: 'Forwards',
        body: 'Forwards are the main goal-scoring threat. A centre-forward or striker leads the attack and looks to score. Wingers play on the sides and deliver crosses or cut inside to shoot. A second striker or shadow striker plays just behind the main forward.',
      },
    ],
  },
  {
    id: 8,
    icon: 'hand-left-outline',
    title: 'The Goalkeeper',
    category: 'Positions',
    track: 'positions',
    content: [
      {
        heading: 'A unique role',
        body: 'The goalkeeper is unlike any other position in soccer. They are the only player permitted to use their hands — but only within their own penalty area. Outside that box, they must play like any outfield player.',
      },
      {
        heading: 'Organising the defence',
        body: 'Great goalkeepers are vocal leaders. Because they can see the entire field in front of them, they communicate constantly — directing defenders, calling for the ball, and organising the team\'s defensive shape. A quiet goalkeeper is often a poor one.',
      },
      {
        heading: 'Distribution',
        body: 'Modern goalkeepers are expected to be comfortable with the ball at their feet. They often act as the first link in a team\'s build-up play, passing short to defenders rather than launching the ball long. This requires excellent technique and composure under pressure.',
      },
      {
        heading: 'Shot-stopping and positioning',
        body: 'The most visible part of goalkeeping is saving shots, but positioning is what separates elite keepers from average ones. A well-positioned goalkeeper reduces the angles an attacker has to shoot at, making saves look easier than they are.',
      },
    ],
  },
  {
    id: 9,
    icon: 'swap-horizontal-outline',
    title: 'Modern Fullbacks',
    category: 'Positions',
    track: 'positions',
    content: [
      {
        heading: 'The traditional fullback',
        body: 'For most of football\'s history, fullbacks were pure defenders — their job was to stop the opposing winger and nothing else. They stayed wide, tracked their man, and rarely ventured into the opposition half.',
      },
      {
        heading: 'The evolution',
        body: 'Over the past two decades, the fullback role has transformed dramatically. Teams began using fullbacks as attacking weapons, overlapping with wingers and delivering crosses into the box. Players like Roberto Carlos and Cafu redefined what a fullback could be.',
      },
      {
        heading: 'The inverted fullback',
        body: 'A newer variation sees fullbacks cut inside rather than overlap, moving into central midfield positions when the team has the ball. This creates overloads in the middle and gives the team more control. Trent Alexander-Arnold and João Cancelo are famous examples.',
      },
      {
        heading: 'The demands today',
        body: 'A modern fullback needs to be athletic, technically gifted, and tactically intelligent. They must defend wide areas, support attacks, understand when to overlap and when to tuck in, and cover enormous distances over 90 minutes. It is one of the most demanding positions in the game.',
      },
    ],
  },
  {
    id: 4,
    icon: 'grid-outline',
    title: 'Formations Explained',
    category: 'Tactics',
    track: 'tactics',
    content: [
      {
        heading: 'What is a formation?',
        body: 'A formation is the organised shape a team uses when they don\'t have the ball. It is written as three numbers — like 4-3-3 or 4-4-2 — representing the number of defenders, midfielders, and forwards, always excluding the goalkeeper.',
      },
      {
        heading: 'The 4-4-2',
        body: 'The classic formation that dominated football for decades. Four defenders, four midfielders in a flat line, and two forwards up front. It provides balance and is easy to understand, which is why it was so popular. However, it can be outnumbered in midfield by teams playing with three central midfielders.',
      },
      {
        heading: 'The 4-3-3',
        body: 'Three central midfielders give the team numerical superiority in the middle of the pitch. Three forwards — a centre-forward flanked by two wingers — stretch the opposition defence wide. Used to great effect by Barcelona, Liverpool, and many of the most successful teams in recent history.',
      },
      {
        heading: 'Formations are fluid',
        body: 'Formations describe a starting shape, but in reality teams constantly change shape during a match. A 4-3-3 without the ball might become a 4-5-1 as the wingers drop to help defend. A 4-2-3-1 in possession might look like a 3-2-5 as fullbacks push high. The numbers are a starting point, not a rigid rule.',
      },
    ],
  },
  {
    id: 5,
    icon: 'shield-checkmark-outline',
    title: 'Pressing & Defending',
    category: 'Tactics',
    track: 'tactics',
    content: [
      {
        heading: 'What is pressing?',
        body: 'Pressing is the act of moving toward the player with the ball to win it back quickly, usually in the opponent\'s half. The idea is to deny the opposition time on the ball, force mistakes high up the pitch, and create scoring chances directly from turnovers.',
      },
      {
        heading: 'The high press',
        body: 'Some teams press aggressively when the opposition goalkeeper or defenders have the ball — this is called a high press. It is physically demanding and requires all players to understand their roles. Liverpool under Jurgen Klopp became famous for their intense, coordinated high press.',
      },
      {
        heading: 'The low block',
        body: 'The opposite of pressing is sitting in a low block — defending deep with a compact shape, usually with two banks of four. The idea is to take away space behind the defence and force the opposition to break through a packed midfield and defensive line. Effective but passive.',
      },
      {
        heading: 'Defending as a team',
        body: 'Modern defensive organisation requires the entire team to defend together. When possession is lost, attackers are often the first line of defence, pressing the ball immediately. The shape, spacing between lines, and collective movement are all carefully coached — good defending is as tactical as attacking.',
      },
    ],
  },
  {
    id: 10,
    icon: 'trending-up-outline',
    title: 'Attacking Patterns',
    category: 'Tactics',
    track: 'tactics',
    content: [
      {
        heading: 'Build-up play',
        body: 'Build-up play refers to how a team moves the ball from defence into attack. Patient teams play short passes through the lines, drawing opponents out before exploiting space. More direct teams play quickly forward, often bypassing the midfield entirely with long balls.',
      },
      {
        heading: 'Width and overloads',
        body: 'Effective attacks use the full width of the pitch. Wide players stretch the defence horizontally, creating gaps in the centre for midfielders and forwards to exploit. Overloads — having more attacking players on one side than defenders — force the opposition to make decisions they\'d rather avoid.',
      },
      {
        heading: 'The final third',
        body: 'The final third is the attacking third of the pitch, where teams try to create clear chances on goal. Combinations of passing, movement, and individual skill are used to break through or around the defensive block. Set pieces — corners and free kicks — are also crucial scoring opportunities.',
      },
      {
        heading: 'Counter-attacking',
        body: 'A counter-attack is a rapid, direct move toward goal immediately after winning the ball. It exploits the fact that the opposition is disorganised from attacking. Teams like Real Madrid and Leicester City have won trophies relying heavily on the counter — a small number of chances, but devastating quality.',
      },
    ],
  },
  {
    id: 6,
    icon: 'trophy-outline',
    title: 'Famous Tournaments',
    category: 'History',
    track: 'history',
    content: [
      {
        heading: 'The FIFA World Cup',
        body: 'Held every four years, the World Cup is the most-watched sporting event on earth. 32 national teams compete for the trophy across a month-long tournament. Brazil has won it five times — more than any other nation. The final is typically watched by over a billion people.',
      },
      {
        heading: 'The UEFA Champions League',
        body: 'The premier club competition in world football, bringing together the best teams from across Europe. Real Madrid have won it a record 15 times. The final is one of the biggest annual sporting events in the world, drawing hundreds of millions of viewers.',
      },
      {
        heading: 'The Premier League',
        body: 'England\'s top division, widely considered the most competitive and commercially successful league in the world. Twenty clubs compete across a 38-game season. Manchester United hold the record with 20 titles, though Manchester City have dominated in recent years.',
      },
      {
        heading: 'Other major competitions',
        body: 'La Liga in Spain is home to Real Madrid and Barcelona. Serie A in Italy produced legendary clubs like AC Milan and Juventus. The Copa América is South America\'s national team tournament, and the African Cup of Nations (AFCON) decides the best national team on the African continent.',
      },
    ],
  },
  {
    id: 11,
    icon: 'earth-outline',
    title: 'The World Cup Story',
    category: 'History',
    track: 'history',
    content: [
      {
        heading: 'The beginning',
        body: 'The first FIFA World Cup was held in Uruguay in 1930. Thirteen nations participated, and the host nation won. The tournament was not held in 1942 or 1946 due to the Second World War. Since 1950, it has taken place every four years without interruption.',
      },
      {
        heading: 'Iconic moments',
        body: 'The World Cup has produced some of football\'s most memorable moments. England\'s only triumph in 1966. Maradona\'s "Hand of God" goal in 1986. Zinedine Zidane\'s headbutt in the 2006 final. Each tournament generates stories that last generations.',
      },
      {
        heading: 'The greatest teams',
        body: 'Brazil\'s 1970 side — featuring Pelé, Jairzinho, and Rivelino — is often cited as the greatest team ever to win the tournament. Germany\'s efficiency has brought four titles. Argentina\'s 2022 triumph, led by Lionel Messi in what many consider his crowning achievement, captivated the world.',
      },
      {
        heading: 'The modern tournament',
        body: 'The 2026 World Cup will expand to 48 teams for the first time, hosted across the United States, Canada, and Mexico. The growth of the game globally — particularly in Asia, Africa, and North America — has driven this expansion.',
      },
    ],
  },
  {
    id: 12,
    icon: 'shirt-outline',
    title: 'Club Football Explained',
    category: 'History',
    track: 'history',
    content: [
      {
        heading: 'How leagues work',
        body: 'Most countries have a domestic league where clubs play each other home and away across a season. Teams earn 3 points for a win, 1 for a draw, and 0 for a loss. At the end of the season, the team with the most points wins the title. The bottom clubs are relegated to a lower division.',
      },
      {
        heading: 'Promotion and relegation',
        body: 'Unlike major American sports, European football has no fixed set of teams. The bottom clubs in each division are relegated — they drop down — while the top clubs from the division below are promoted. This means every game matters, even for mid-table teams fighting to stay up.',
      },
      {
        heading: 'Domestic cups',
        body: 'Alongside leagues, most countries have knockout cup competitions open to all clubs regardless of division. England\'s FA Cup is one of the oldest, famously allowing lower-league minnows to face Premier League giants. These upsets — called giant-killings — are a beloved part of football culture.',
      },
      {
        heading: 'European competition',
        body: 'The best-performing clubs in each country qualify for European competition. The UEFA Champions League is the most prestigious, followed by the Europa League and Conference League. For clubs outside the top leagues, reaching Europe at all can be a historic achievement.',
      },
    ],
  },
]

export default lessons