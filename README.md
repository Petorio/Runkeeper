# Runkeeper

## Summarizing Tweets (about.js)
- Identified the earliest and latest tweet dates.
- Categorized tweets into completed events, live events, achievements, and miscellaneous.
- Determined the percentage of completed events containing user-written text.

## Identifying the Most Popular Activities (activities.js)
- Determined activity type and distance
- Updated activityType and distance getters in tweet.ts.
- Converted distances to Miles.
- Identified the most frequent and longest/shortest activity types.
- Analyzed if longest activities tend to be on weekdays or weekends.

## Graphing activities by distance
- Created plots using Vega-Lite:
 - Number of each activity type.
 - Distances by day of the week for the three most tweeted-about activities.
 - Aggregate distances by mean for the three most tweeted-about activities.

## Adding a Text Search Interface (description.js)
- Implemented a search box for running tweets.
- Updated table with tweet number and activity type dynamically.
- Made links in tweets clickable for exploring data.

# Installation

## Packages
```
npm i -g typescript
npm i -g live-server
```

## Running Transpiler
- After installing above packages, you can run the following command to recompile code automatically.
```
tsc --watch --p tsconfig.json
```

## View in live-server
- Use the live-server installed to view the application.
