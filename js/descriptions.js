var writtenArray = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// create and populate global writtenArray with the Tweet class, the current number count of tweets, all of the text before the link in the tweet
	var numTweet = 1;
	tweet_array.forEach(tweet => {
		writtenArray.push({
				tweet: tweet,
				numberTweet: numTweet,
				beforeLinkText: tweet.beforeLinkText,
		})
		numTweet++;
	});

	// initialize html fields to empty/0 to match example in assignment document
	$('#searchText').text('');
	$('#searchCount').text('0');
}

function addEventHandlerForSearch() {
	// add a listener to the textFilter ID to detect user input, parse and add to html through getHTMLTableRow.
	// resets html table every "instance" of event (every time a user inputs/delets something in the input field)
	document.getElementById("textFilter").addEventListener("input", event => {
		var filtered = [];
		var numTweet = 1;
		$("#tweetTable").empty();
		const value = event.target.value;
		$('#searchText').text(value);
		if (value != "") {
			filtered = writtenArray.filter(element => {
				if (element.beforeLinkText.toLowerCase().includes(value)) {
					$("#tweetTable").append(element.tweet.getHTMLTableRow(numTweet));
					numTweet++;
				}
			})
			$('#searchCount').text(numTweet-1);
		} else { // reinitialize to empty/0 since search field is empty
			$('#searchText').text('');
			$('#searchCount').text('0');
		}
	})
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});