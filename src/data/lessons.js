const lessons = [
  {
    id: '1',
    icon: '📖',
    title: 'The Basic Rules',
    duration: '5 min',
    category: 'Beginner',
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
    id: '2',
    icon: '🏃',
    title: 'Player Positions',
    duration: '7 min',
    category: 'Beginner',
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
    id: '3',
    icon: '🟨',
    title: 'Fouls & Cards',
    duration: '6 min',
    category: 'Beginner',
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
    id: '4',
    icon: '🧠',
    title: 'Formations Explained',
    duration: '10 min',
    category: 'Intermediate',
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
    icon: '⚡',
    title: 'Pressing & Defending',
    duration: '8 min',
    category: 'Intermediate',
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
    id: '6',
    icon: '🏆',
    title: 'Famous Tournaments',
    duration: '6 min',
    category: 'History',
    content: [
      {
        heading: 'The World Cup',
        body: 'The FIFA World Cup is the biggest soccer tournament in the world. It is held every four years and features 32 national teams. It is the most watched sporting event on the planet.',
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
        body: 'The Copa America is the oldest international tournament in soccer. It features the national teams of South America and is held every four years.',
      },
    ],
  },
]

export default lessons