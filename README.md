# FootyIQ

A soccer learning app that actually teaches you the game. The rules, the positions, the tactics, and then it helps you read a real match result like you know what you're looking at.

I built FootyIQ to get properly hands-on with React Native, and honestly because most "learn football" content online is either way too basic or assumes you already know everything. It's a portfolio project, not a commercial app, but I tried to build it like it mattered.

---

## Try it yourself

Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) on your phone, then scan the QR code below to run FootyIQ directly, no build or setup needed.

![QR code](docs/screenshots/qr-code-footyiq.png)

Or open this link on your phone: [expo.dev/preview/update](https://expo.dev/preview/update?message=Portfolio+demo&updateRuntimeVersion=1.0.0&createdAt=2026-08-25T19%3A30%3A36.342Z&slug=exp&projectId=29c3e43e-0085-4a52-944f-de0cdf8da5be&group=f2376f36-c8b6-4342-9c39-6bac0efa3804)

---

## Screenshots

| Home | Learn | Daily |
|------|-------|-------|
| ![Home](docs/screenshots/home.png) | ![Learn](docs/screenshots/learn.png) | ![Daily](docs/screenshots/daily.png) |

| Lesson | Watch | Match Guide |
|--------|-------|-------------|
| ![Lesson](docs/screenshots/lesson.png) | ![Watch](docs/screenshots/watch.png) | ![Match Guide](docs/screenshots/fixture-guide.png) |

---

## What it does

- **Lessons.** 12 of them across 4 tracks (basics, positions, tactics, history), each with a short quiz at the end.
- **Daily challenge.** One question a day that rotates, with a streak counter so you keep coming back.
- **Progress.** Completed lessons and your streak save locally, and there's an animated progress bar that fills as you go.
- **Watch.** Pulls real Premier League fixtures from API-Football, with pull to refresh and a skeleton loader while it fetches.
- **Match analysis.** Every finished match gets a plain English breakdown of what the result actually means. No jargon, and it runs entirely off the score, no AI or paid API involved.
- **Glossary.** Tap any tactical term anywhere in the app to see what it means.

The Learn, Daily, and Settings sections work without any setup. Only Watch needs an API key.

---

## Tech

React Native and Expo (SDK 54), React Navigation for the tabs and stacks, AsyncStorage for everything that persists, and API Football's free tier for live data. Icons are Ionicons, animations use the built in Animated API, and tests run on Jest through the `jest-expo` preset.

---

## How it's put together

```
src/
├── components/   shared UI, Card, ScreenWrapper, IconContainer, etc.
├── data/         lessons, quizzes, questions, glossary
├── hooks/        useProgress, useStreak
├── navigation/   tab navigator plus Learn/Watch stacks
├── screens/      one file per screen
├── services/     footballApi (fetch + cache), matchAnalysis
└── theme/        colors and typography tokens
```

A few things worth pointing out.

Every screen is built from the same handful of components, Card, ScreenWrapper, IconContainer, SectionLabel, PrimaryButton. I didn't start with that. I wrote a few screens first, noticed I was copying the same card and icon styling into each one, and went back and pulled it all into shared components. Refactoring the whole app onto them cut out a huge amount of duplicated `StyleSheet` code.

Colors and font sizes all live in `src/theme`, nothing is hard coded into the screens themselves.

The free API tier doesn't let you request just the latest fixtures, so I fetch the whole season once and filter it client side, then cache the result in AsyncStorage for six hours to stay under the rate limit. Pull to refresh skips the cache when you actually want fresh data.

`matchAnalysis.js` is a pure function, give it a score, it hands back the insights. I went rule based instead of calling an AI API for it, mostly because it's free and instant, but also because a pure function is something I could actually write real tests for.

---

## Running it

You'll need Node, the Expo Go app on your phone (or a simulator), and a free API Football key if you want the Watch section to work.

```bash
git clone https://github.com/MateenM10/FootyIQ.git
cd FootyIQ

npm install --legacy-peer-deps

cp config.example.js config.js
# paste your API Football key into config.js

npx expo start
```

Then scan the QR code with Expo Go, or hit `i` for the simulator.

---

## Tests

```bash
npx jest
```

The match analysis logic has a full unit test suite covering wins, draws, clean sheets, blowouts, and the points context.

One bug the tests actually caught, and this is a good example of why I bothered writing them: my first test file mocked scores as `'2-1'`, no spaces. The real function splits on `' - '`, with spaces on both sides of the dash, because that's the exact format the API returns. So every test was silently getting `null` back and I spent a while confused about why a function I knew worked kept failing. The fix was just matching the real data format in the mocks, but it was a good reminder that a test is only as good as how honestly it represents the real input.

---

## What I learned

Most of what I got out of this was the gap between something working and something being built well.

The component refactor was the big one, already mentioned above, but it's the thing I'd point to first if someone asked what I actually learned doing this.

Building around the API's limits taught me more than a generous API would have. Figuring out a clean way to cache around the rate limit instead of just hitting it constantly felt like a small real engineering problem, not a tutorial exercise.

I also explored push notifications for the daily reminder and ended up cutting them. They technically worked, but `expo-notifications` isn't fully supported in Expo Go anymore, you need a native development build for it to actually fire. That's a heavier setup than I wanted for a project meant to be clonable and runnable in about two minutes, so I pulled the feature rather than ship something that only half works depending on how someone runs the app.

---

## Development notes

I used AI tools (Claude) as a pair programming assistant on this, mostly for talking through architecture decisions, speeding up repetitive refactors, and debugging. The feature scope, what got cut, and every decision in the app were mine, I reviewed and understood everything that went in. Felt worth being upfront about, since it's how I actually work.

---

## Things I'd add next

- A dev build so notifications can come back
- More lessons and a bigger question pool
- Leagues beyond the Premier League
- Saved quiz scores and a stats screen

---

_Built with React Native & Expo._