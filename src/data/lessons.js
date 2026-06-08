const lessons = [
  {
    id: '1',
    icon: 'document-text-outline',
    title: 'The Basic Rules',
    duration: '5 min',
    category: 'Beginner',
    track: 'beginner',
    content: [
      {
        heading: 'The Objective',
        body: 'The goal of soccer is simple — get the ball into the opposing teams net more times than they get it into yours. The team with the most goals at the end of the match wins.',
      },
      {
        heading: 'The Match',
        body: 'A match is made up of two 45 minute halves, with a 15 minute break in between. If the game is tied in a knockout competition, it may go to extra time and then a penalty shootout.',
      },
      {
        heading: 'The Offside Rule',
        body: 'A player is offside if they are closer to the opponents goal line than both the ball and the second to last defender when the ball is played to them. This is one of the most debated rules in soccer.',
      },
      {
        heading: 'Fouls',
        body: 'A foul is called when a player makes illegal contact with an opponent. Common fouls include tripping, pushing, and handball. Fouls result in a free kick for the opposing team.',
      },
    ],
  },
  {
    id: '3',
    icon: 'alert-circle-outline',
    title: 'Fouls & Cards',
    duration: '6 min',
    category: 'Beginner',
    track: 'beginner',
    content: [
      {
        heading: 'Yellow Card',
        body: 'A yellow card is a warning given to a player for serious foul play, dissent, or unsporting behavior. If a player receives two yellow cards in one match, they are sent off.',
      },
      {
        heading: 'Red Card',
        body: 'A red card means immediate dismissal from the match. The player cannot be replaced, leaving their team with ten men. Red cards are given for violent conduct or a second yellow card.',
      },
      {
        heading: 'Free Kicks',
        body: 'When a foul is committed outside the penalty area, the opposing team gets a free kick. A direct free kick can be shot straight at goal. An indirect free kick must touch another player first.',
      },
      {
        heading: 'Penalties',
        body: 'If a foul is committed inside the penalty area, the opposing team gets a penalty kick. The ball is placed on the penalty spot and a player shoots one on one against the goalkeeper.',
      },
    ],
  },
  {
    id: '7',
    icon: 'flag-outline',
    title: 'Offside Explained',
    duration: '6 min',
    category: 'Beginner',
    track: 'beginner',
    content: [
      {
        heading: 'What Offside Means',
        body: 'A player is in an offside position if they are nearer to the opponents goal line than both the ball and the second to last defender at the moment a teammate plays the ball to them. The goalkeeper usually counts as the last defender.',
      },
      {
        heading: 'Why It Exists',
        body: 'The rule stops attackers from simply standing next to the goal waiting for a long pass. It forces them to time their runs and keeps the game spread out across the pitch.',
      },
      {
        heading: 'Active vs Passive',
        body: 'Being in an offside position is not an offence on its own. It is only punished if the player gets involved in the play — touching the ball, blocking an opponent, or gaining an advantage.',
      },
      {
        heading: 'Why It Is So Debated',
        body: 'Offside is often a matter of inches, and it is judged at the exact moment the ball is played. This is why video review and the offside line cause so many arguments among fans.',
      },
    ],
  },
  {
    id: '2',
    icon: 'people-outline',
    title: 'Player Positions',
    duration: '7 min',
    category: 'Beginner',
    track: 'positions',
    content: [
      {
        heading: 'Goalkeeper',
        body: 'The last line of defense. The goalkeeper is the only player allowed to use their hands, and only within their own penalty area. Their job is to stop the other team from scoring.',
      },
      {
        heading: 'Defenders',
        body: 'Defenders protect the area in front of the goalkeeper. Centre backs are the most central defenders, while fullbacks patrol the left and right sides of the pitch.',
      },
      {
        heading: 'Midfielders',
        body: 'Midfielders are the engine of the team. They connect the defense and attack, win the ball back, and control the tempo of the game.',
      },
      {
        heading: 'Forwards',
        body: 'Forwards are the main attackers. Their primary job is to score goals. Strikers play through the middle while wingers operate on the left and right sides.',
      },
    ],
  },
  {
    id: '8',
    icon: 'shield-checkmark-outline',
    title: 'The Goalkeeper',
    duration: '6 min',
    category: 'Beginner',
    track: 'positions',
    content: [
      {
        heading: 'The Last Line',
        body: 'The goalkeeper is the only player allowed to handle the ball, and only inside their own penalty area. They wear a different colored shirt so the referee can tell them apart.',
      },
      {
        heading: 'Shot Stopping',
        body: 'The most obvious job is keeping the ball out of the net — diving saves, blocking shots, and claiming crosses in the air. Positioning and reflexes are everything.',
      },
      {
        heading: 'Distribution',
        body: 'Modern keepers start attacks. They throw or pass to teammates to begin a build up, so being comfortable with the ball at their feet is now a key skill.',
      },
      {
        heading: 'The Sweeper Keeper',
        body: 'Some keepers play far from their goal, rushing out to clear danger behind a high defensive line. This lets their team defend higher up the pitch but is risky if they get it wrong.',
      },
    ],
  },
  {
    id: '9',
    icon: 'swap-horizontal-outline',
    title: 'Modern Fullbacks',
    duration: '7 min',
    category: 'Intermediate',
    track: 'positions',
    content: [
      {
        heading: 'What Is a Fullback',
        body: 'Fullbacks are the defenders on the left and right edges of the back line. Traditionally their job was simply to stop the opposition wingers from getting past them.',
      },
      {
        heading: 'Going Forward',
        body: 'In the modern game fullbacks push high up the pitch to support attacks and provide width, often delivering crosses into the box. They cover huge distances every match.',
      },
      {
        heading: 'The Inverted Fullback',
        body: 'Some coaches ask fullbacks to move inside into midfield when their team has the ball, creating an extra passer in the center and helping control possession.',
      },
      {
        heading: 'Defensive Duties',
        body: 'Despite all the attacking, their first job is still to defend. A fullback caught too far forward leaves space behind for the opposition to attack into.',
      },
    ],
  },
  {
    id: '4',
    icon: 'grid-outline',
    title: 'Formations Explained',
    duration: '10 min',
    category: 'Intermediate',
    track: 'tactics',
    content: [
      {
        heading: 'What is a Formation?',
        body: 'A formation describes how a team lines up on the pitch. It is written as a series of numbers representing the defenders, midfielders, and forwards. For example, 4-3-3 means four defenders, three midfielders, and three forwards.',
      },
      {
        heading: 'The 4-4-2',
        body: 'One of the most classic formations. Four defenders, four midfielders, two strikers. It is balanced and easy to understand, which is why it was so popular for decades.',
      },
      {
        heading: 'The 4-3-3',
        body: 'Used by many top clubs today. Four defenders, three midfielders, three forwards. It is an attacking formation that gives width through the wingers.',
      },
      {
        heading: 'The 5-3-2',
        body: 'A more defensive setup with five defenders. Teams use this to protect a lead or when playing against stronger opposition. The wingbacks can push forward to help in attack.',
      },
    ],
  },
  {
    id: '5',
    icon: 'shield-outline',
    title: 'Pressing & Defending',
    duration: '8 min',
    category: 'Intermediate',
    track: 'tactics',
    content: [
      {
        heading: 'What is Pressing?',
        body: 'Pressing is when a team aggressively chases the ball when they do not have it. The idea is to win the ball back quickly and high up the pitch, close to the opponents goal.',
      },
      {
        heading: 'High Press',
        body: 'A high press means the whole team pushes up and pressures the opponents near their own goal. Teams like Liverpool and Manchester City are famous for this style.',
      },
      {
        heading: 'Low Block',
        body: 'A low block is the opposite. The team sits deep and defends close to their own goal, making it hard for the opponent to find space. It is a more cautious defensive approach.',
      },
      {
        heading: 'Counter Attacking',
        body: 'Counter attacking teams absorb pressure and defend deep, then attack quickly when they win the ball. This catches the opposition out of position and creates chances on the break.',
      },
    ],
  },
  {
    id: '10',
    icon: 'trending-up-outline',
    title: 'Attacking Patterns',
    duration: '8 min',
    category: 'Intermediate',
    track: 'tactics',
    content: [
      {
        heading: 'Creating Space',
        body: 'Good attacks are really about moving defenders to create gaps. Players make runs not just to receive the ball, but to drag a defender away and open space for a teammate.',
      },
      {
        heading: 'Overloads',
        body: 'Teams try to create situations where they have more players than defenders in one area of the pitch. Win that numbers battle and a chance usually follows.',
      },
      {
        heading: 'Switching Play',
        body: 'Moving the ball quickly from one side of the pitch to the other stretches the defense. Defenders shift across to cover, leaving space on the far side to attack.',
      },
      {
        heading: 'The Final Ball',
        body: 'The pass or cross that actually creates a chance. Timing and quality matter far more than power — the best players pick the right moment to release it.',
      },
    ],
  },
  {
    id: '6',
    icon: 'trophy-outline',
    title: 'Famous Tournaments',
    duration: '6 min',
    category: 'Beginner',
    track: 'history',
    content: [
      {
        heading: 'The World Cup',
        body: 'The FIFA World Cup is the biggest soccer tournament in the world. It is held every four years and features national teams. It is the most watched sporting event on the planet.',
      },
      {
        heading: 'The Champions League',
        body: 'The UEFA Champions League is the premier club competition in Europe. The best clubs from each country compete for the trophy, which is considered the greatest prize in club soccer.',
      },
      {
        heading: 'The Premier League',
        body: 'The English Premier League is widely regarded as the most competitive domestic league in the world. It features 20 clubs and runs from August to May each season.',
      },
      {
        heading: 'The Copa America',
        body: 'The Copa America is the oldest international tournament in soccer. It features the national teams of South America and is held every few years.',
      },
    ],
  },
  {
    id: '11',
    icon: 'earth-outline',
    title: 'The World Cup Story',
    duration: '7 min',
    category: 'Beginner',
    track: 'history',
    content: [
      {
        heading: 'The Biggest Stage',
        body: 'The FIFA World Cup is the most watched sporting event on earth, held every four years. National teams spend years qualifying just for the chance to compete in the final tournament.',
      },
      {
        heading: 'The Early Years',
        body: 'The first World Cup was held in Uruguay in 1930 with just 13 teams. The hosts won it, and the tournament has grown enormously in size and importance ever since.',
      },
      {
        heading: 'Legendary Moments',
        body: 'From Pele lighting up 1970 to Maradona in 1986 to Zidane in 1998, the World Cup has produced the games greatest icons and most unforgettable moments.',
      },
      {
        heading: '2026 and Beyond',
        body: 'The 2026 World Cup will be the first hosted by three nations — the USA, Canada and Mexico — and the first to feature 48 teams, making it the largest in history.',
      },
    ],
  },
  {
    id: '12',
    icon: 'business-outline',
    title: 'Club Football Explained',
    duration: '6 min',
    category: 'Beginner',
    track: 'history',
    content: [
      {
        heading: 'Clubs vs Countries',
        body: 'For most of the year players represent their clubs, not their countries. Club football is the day to day heart of the sport, with national team games happening only now and then.',
      },
      {
        heading: 'Domestic Leagues',
        body: 'Each country has its own league, like the Premier League in England or La Liga in Spain. Teams play each other over a long season, and the team with the most points wins the title.',
      },
      {
        heading: 'Continental Cups',
        body: 'The best clubs also compete against teams from other countries in tournaments like the Champions League in Europe, played alongside their normal league season.',
      },
      {
        heading: 'Promotion and Relegation',
        body: 'In most leagues the worst teams drop down to a lower division at the end of the season, while the best teams from the division below move up to replace them.',
      },
    ],
  },
]

export default lessons