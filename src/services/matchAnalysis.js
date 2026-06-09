export function generateMatchAnalysis(fixture) {
  if (!fixture.score) return null

  const parts = fixture.score.split(' - ')
  if (parts.length !== 2) return null

  const homeGoals = parseInt(parts[0])
  const awayGoals = parseInt(parts[1])
  if (isNaN(homeGoals) || isNaN(awayGoals)) return null

  const totalGoals = homeGoals + awayGoals
  const goalDiff = Math.abs(homeGoals - awayGoals)
  const isDraw = homeGoals === awayGoals
  const isHomeWin = homeGoals > awayGoals
  const isAwayWin = awayGoals > homeGoals
  const winnerName = isHomeWin ? fixture.homeTeam : fixture.awayTeam
  const loserName = isHomeWin ? fixture.awayTeam : fixture.homeTeam
  const loserGoals = isHomeWin ? awayGoals : homeGoals
  const winnerKeptCleanSheet = isHomeWin ? awayGoals === 0 : homeGoals === 0

  const insights = []

  // --- Insight 1: The Result ---
  if (isDraw) {
    if (totalGoals === 0) {
      insights.push({
        icon: 'remove-circle-outline',
        heading: 'A Goalless Draw',
        body: fixture.homeTeam + ' and ' + fixture.awayTeam + ' played out a 0-0 draw. ' +
          'Goalless draws are a sign of two well-organised defenses refusing to give an inch. ' +
          'While they can look uneventful on the scoresheet, they usually represent a tactical battle where neither manager found a way to break the other down.',
      })
    } else if (totalGoals === 2) {
      insights.push({
        icon: 'swap-horizontal-outline',
        heading: 'An Even Contest',
        body: fixture.homeTeam + ' and ' + fixture.awayTeam + ' each scored once and shared the points. ' +
          'A 1-1 draw usually tells the story of two evenly matched teams — one side took the lead, the other found an equaliser. ' +
          'In the Premier League, a point away from home is never a bad result.',
      })
    } else {
      insights.push({
        icon: 'swap-horizontal-outline',
        heading: 'A High-Scoring Draw',
        body: fixture.homeTeam + ' and ' + fixture.awayTeam + ' shared the points in an entertaining ' + fixture.score + ' draw. ' +
          'When both teams score this freely, it suggests neither side could hold onto a lead when they had one. ' +
          'High-scoring draws often point to two attacking teams who were less solid defensively than they would have liked.',
      })
    }
  } else if (goalDiff === 1) {
    insights.push({
      icon: isAwayWin ? 'airplane-outline' : 'checkmark-circle-outline',
      heading: isAwayWin ? 'An Impressive Away Win' : 'A Tight Win',
      body: winnerName + ' beat ' + loserName + ' ' + fixture.score + '. ' +
        (isAwayWin
          ? 'Away wins are genuinely difficult in the Premier League — the home crowd, unfamiliar pitch, and travel all work against the visiting side. ' +
            fixture.awayTeam + ' deserve full credit for taking all three points on the road.'
          : 'A one-goal margin is the most common winning result in top-flight football and reflects just how tight the competition is. ' +
            'The gap between these two sides was small, but ' + winnerName + ' found the decisive moment when it mattered.'),
    })
  } else if (goalDiff === 2) {
    insights.push({
      icon: isAwayWin ? 'airplane-outline' : 'trending-up-outline',
      heading: 'A Comfortable Win',
      body: winnerName + ' beat ' + loserName + ' ' + fixture.score + ' in a convincing performance. ' +
        'Winning by two goals usually means the winning side had clear control for large periods of the match. ' +
        (isAwayWin
          ? 'Doing it away from home makes it even more impressive — ' + fixture.awayTeam + ' were the better team throughout the ninety minutes.'
          : fixture.homeTeam + ' made good use of home advantage and rarely looked threatened.'),
    })
  } else {
    insights.push({
      icon: 'trophy-outline',
      heading: 'A Dominant Display',
      body: winnerName + ' dismantled ' + loserName + ' ' + fixture.score + ' in a one-sided contest. ' +
        'Winning by three or more goals is rare in top-flight football — it usually signals one team was significantly better on the day or the opposition had a particularly difficult ninety minutes. ' +
        (isAwayWin
          ? 'An away win of this size is remarkable. ' + fixture.awayTeam + ' were near-perfect.'
          : fixture.homeTeam + ' were ruthless in attack and solid at the back.'),
    })
  }

  // --- Insight 2: Clean sheet or both teams scored ---
  if (!isDraw) {
    if (winnerKeptCleanSheet) {
      insights.push({
        icon: 'shield-checkmark-outline',
        heading: 'Clean Sheet',
        body: winnerName + ' kept a clean sheet — ' + loserName + ' could not find the net across the full ninety minutes. ' +
          'Clean sheets are one of the most valuable results for a defence. They mean the goalkeeper and defenders did their job completely, and the team only needed to score once to guarantee a win. ' +
          'In a competitive league, keeping the opposition off the scoresheet is always a meaningful achievement.',
      })
    } else {
      insights.push({
        icon: 'football-outline',
        heading: 'Both Teams Scored',
        body: loserName + ' scored ' + loserGoals + (loserGoals === 1 ? ' goal' : ' goals') + ' despite losing the match, which shows they created chances even in defeat. ' +
          'Scoring in a losing effort is sometimes called a consolation, but it also reflects quality going forward. ' +
          winnerName + ' had to do defensive work as well as score — they earned this result at both ends of the pitch.',
      })
    }
  }

  // --- Insight 3: Points context ---
  if (isDraw) {
    insights.push({
      icon: 'ellipse-outline',
      heading: 'One Point Each',
      body: 'Both teams take home one point from this draw. In a 38-game season, points from draws accumulate and can be decisive. ' +
        'For the team that was leading, this feels like dropped points — two points lost rather than one gained. ' +
        'For the team that came from behind to draw, it can feel like a win. Context is everything in a long season.',
    })
  } else {
    insights.push({
      icon: 'podium-outline',
      heading: 'Three Points',
      body: winnerName + ' take home the full three points. Over 38 games, the difference between winning and drawing is enormous — three points instead of one adds up fast. ' +
        (goalDiff >= 2
          ? 'The goal difference also improves significantly, which can prove decisive when teams finish level on points at the end of the season.'
          : 'Even a narrow win is worth exactly the same as a dominant one in the league table. Three points is three points.'),
    })
  }

  return insights
}