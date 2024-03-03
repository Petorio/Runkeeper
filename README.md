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
