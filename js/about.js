function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	

	// find earliest and latest dates, update html accordingly
	var earliestDate = tweet_array[tweet_array.length-1].time;
	var latestDate = tweet_array[0].time;
	const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	$("#firstDate").text(earliestDate.toLocaleDateString("en-US", options));
	$("#lastDate").text(latestDate.toLocaleDateString("en-US", options));

	// find number of occurances for each type of event, update html accordingly
	var numLiveEvent = 0, numAchievements = 0, numCompletedEvents = 0, numMisc = 0;
	tweet_array.forEach(tweet => {
		if (tweet.source === "live_event") {
			numLiveEvent++;
		} else if (tweet.source === "achievement") {
			numAchievements++;
		} else if (tweet.source === "completed_event") {
			numCompletedEvents++;
		} else {
			numMisc++;
		}
	});

	var livePercent = ((numLiveEvent/tweet_array.length)*100).toFixed(2);
	var achievementPercent = ((numAchievements/tweet_array.length)*100).toFixed(2);
	var completedPercent = ((numCompletedEvents/tweet_array.length)*100).toFixed(2);
	var miscPercent = ((numMisc/tweet_array.length)*100).toFixed(2);

	$('.completedEvents').text(numCompletedEvents);
	$('.liveEvents').text(numLiveEvent);
	$('.achievements').text(numAchievements);
	$('.miscellaneous').text(numMisc);

	$('.completedEventsPct').text(completedPercent+"%");
	$('.liveEventsPct').text(livePercent+"%");
	$('.achievementsPct').text(achievementPercent+"%");
	$('.miscellaneousPct').text(miscPercent+"%");

	// find number of user written tweets, update html accordingly
	var numUserTweet = 0;
	tweet_array.forEach(tweet => {
		if( tweet.written ) {
			numUserTweet++;
		}
	});
	var userTweetPercent = ((numUserTweet/tweet_array.length)*100).toFixed(2);
	$('.written').text(numUserTweet);
	$('.writtenPct').text(userTweetPercent+"%");
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});