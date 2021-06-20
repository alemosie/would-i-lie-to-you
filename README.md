# Would I Lie to You?

This app is based on the popular British panel show "Would I Lie to You?" 
To learn more about the show, visit the [BBC One page](https://www.bbc.co.uk/programmes/b007r3n8).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Preparing for gameplay

### Gather player information and statements

1. In `src/GAMEPLAY.js`, add all players to the `PLAYERS` object and their team affiliation (either `team1` or `team2`).

The object should look like this:

```
export const PLAYERS = {
  'matt': 'team1',
  'yuan': 'team1',
  'sam': 'team2',
  'aza': 'team2'
};
```

2. In `src/GAMEPLAY` below the `PLAYERS` object, add the truths and lies for each player in the `STATEMENTS` object. 

The object should look something like this:

```
export const statements = {
  matt: {
    truth: [
      "I was gifted a large fungus for my birthday one year.",
      "I once filmed an impromptu Kesha music video."
    ],
    lie: [
      "In 5th grade, I wrote an entire research paper for science class on the jackalope without realizing it was a real animal.",
      "I once won the caption contest of my local newspaper."
    ]
  },
  yuan: {
    truth: [
      "While in Thailand, I successfully chased down a missed train on a motorbike.",
      "I once burned a tick off of my neck with a fork."
    ],
    lie: [
      "While walking near the edge of a cliff, I was picked up off the ground by a gust of wind and blown dangerously close to the edge.",
      "I have an archnemesis at work."
    ]
  ... (continued for each player)
```

### Install dependencies

If you've never run a React app before, you'll likely need to install dependencies.

Run `npm install` in the app directory to do so.

## Gameplay 

## Run the app: `npm start`

`npm start` runs the app locally in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.
