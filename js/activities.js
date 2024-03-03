function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// create all activity type dictionaries (that I could see within the get_saved_tweets.js file) and put them into an array
	const skiing = {activityType: "skiing", count: 0, distance: 0};
	const running = {activityType: "running", count: 0, distance: 0};
	const walking = {activityType: "walking", count: 0, distance: 0};
	const biking = {activityType: "biking", count: 0, distance: 0};
	const elliptical = {activityType: "elliptical", count: 0, distance: 0};
	const hike = {activityType: "hike", count: 0, distance: 0};
	const activity = {activityType: "activity", count: 0, distance: 0};
	const swimming = {activityType: "swimming", count: 0, distance: 0};
	const mtnBiking = {activityType: "mtnBiking", count: 0, distance: 0};
	const rowing = {activityType: "rowing", count: 0, distance: 0};
	const nordic = {activityType: "nordic", count: 0, distance: 0};
	const chair = {activityType: "chair", count: 0, distance: 0};
	const skating = {activityType: "skating", count: 0, distance: 0};
	const snowboarding = {activityType: "snowboarding", count: 0, distance: 0};
	const circuit = {activityType: "circuit", count: 0, distance: 0};
	const mysports = {activityType: "mysports", count: 0, distance: 0};

	// indexes correspond to activity type at the start
	// 0: skiing, 1: running, 2: walking, 3: biking, 4: elliptical, 5: hike, 6: activity, 7: swimming, 8: mtnBiking, 9: rowing, 10: noridc, 11: chair, 12: skating, 13: snowboarding, 14: circuit, 15: mysports
	const activityArray = new Array(skiing, running, walking, biking, elliptical, hike, activity, swimming, mtnBiking, rowing, nordic, chair, skating, snowboarding, circuit, mysports);

	// parse through each activity type and count occurances & get total distance
	tweet_array.forEach(tweet => {
		if (tweet.activityType === "skiing") {
			activityArray[0].count++;
			activityArray[0].distance += tweet.distance;
		} else if (tweet.activityType === "running") {
			activityArray[1].count++;
			activityArray[1].distance += tweet.distance;
		} else if (tweet.activityType === "walking") {
			activityArray[2].count++;
			activityArray[2].distance += tweet.distance;
		} else if (tweet.activityType === "biking") {
			activityArray[3].count++;
			activityArray[3].distance += tweet.distance;
		} else if (tweet.activityType === "elliptical") {
			activityArray[4].count++;
			activityArray[4].distance += tweet.distance;
		} else if (tweet.activityType === "hike") {
			activityArray[5].count++;
			activityArray[5].distance += tweet.distance;
		} else if (tweet.activityType === "activity") {
			activityArray[6].count++;
			activityArray[6].distance += tweet.distance;
		} else if (tweet.activityType === "swimming") {
			activityArray[7].count++;
			activityArray[7].distance += tweet.distance;
		} else if (tweet.activityType === "mtn biking") {
			activityArray[8].count++;
			activityArray[8].distance += tweet.distance;
		} else if (tweet.activityType === "rowing") {
			activityArray[9].count++;
			activityArray[9].distance += tweet.distance;
		} else if (tweet.activityType === "nordic") {
			activityArray[10].count++;
			activityArray[10].distance += tweet.distance;
		} else if (tweet.activityType === "chair") {
			activityArray[11].count++;
			activityArray[11].distance += tweet.distance;
		} else if (tweet.activityType === "skating") {
			activityArray[12].count++;
			activityArray[12].distance += tweet.distance;
		} else if (tweet.activityType === "snowboarding") {
			activityArray[13].count++;
			activityArray[13].distance += tweet.distance;
		} else if (tweet.activityType === "circuit") {
			activityArray[14].count++;
			activityArray[14].distance += tweet.distance;
		} else if (tweet.activityType === "mysports") {
			activityArray[15].count++;
			activityArray[15].distance += tweet.distance;
		} 
	});

	// count total number of unique activities (should be 16 since I only made 16 dictionaries)
	let numActivities = 0;
	activityArray.forEach(activity => {
		if (activity.count > 0) {
			numActivities++;
		}
	})
	$('#numberActivities').text(numActivities);

	// sort array by activity count greatest to least, cannot use indicies anymore
	activityArray.sort(function(a,b) {
		return b.count - a.count;
	});

	// update html with ranking by activity count
	$('#firstMost').text(activityArray[0].activityType);
	$('#secondMost').text(activityArray[1].activityType);
	$('#thirdMost').text(activityArray[2].activityType);

	// find longest and shortest activity with their respective distances, update html accordingly
	var longestDistance = activityArray[0].distance;
	var longest = activityArray[0].activityType;
	var shortestDistance = activityArray[0].distance;
	var shortest = activityArray[0].activityType;

	if (activityArray[1].distance > longestDistance) {
		longestDistance = activityArray[1].distance;
		longest = activityArray[1].activityType;
	}
	if (activityArray[2].distance > longestDistance) {
		longestDistance = activityArray[2].distance;
		longest = activityArray[2].activityType;
	}

	if (activityArray[1].distance < shortestDistance) {
		shortestDistance = activityArray[1].distance;
		shortest = activityArray[1].activityType;
	}
	if (activityArray[2].distance < shortestDistance) {
		shortestDistance = activityArray[2].distance;
		shortest = activityArray[2].activityType;
	}

	$('#longestActivityType').text(longest);
	$('#shortestActivityType').text(shortest);

	// find number of activities on weekdays/weekends, update html with greater value
	var numWeekdays = 0;
	var numWeekends = 0;

	tweet_array.forEach(tweet => {
		if (tweet.activityType === longest) {
			if (tweet.getDay === "Sat" || tweet.getDay === "Sun") {
				numWeekends++;
			} else {
				numWeekdays++;
			}
		}
	});

	if (numWeekdays > numWeekends) {
		$('#weekdayOrWeekendLonger').text("weekdays");
	} else {
		$('#weekdayOrWeekendLonger').text("weekends");
	}

	// vega-lite visual representation for first plot
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "width": 500,
	  "height": 300,
	  "data": {
	    "values": activityArray
	  },
	  "mark": "point",
	  "encoding": {
		"x": {"field": "activityType", "type": "ordinal", "sort": "-y"},
		"y": {"field": "count", "type": "quantitative", "scale": {"type": "log"}}
	  },
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	// create custom array for plots 2 and 3
	let distanceVisArray = [];
	tweet_array.forEach(tweet => {
		if (tweet.activityType === activityArray[0].activityType || tweet.activityType === activityArray[1].activityType || tweet.activityType === activityArray[2].activityType) {
			distanceVisArray.push({activityType: tweet.activityType, distance: tweet.distance, day: tweet.getDay})
		}
	})

	// vega-lite visual representation for second plot
	distance_vis = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for top 3 most tweeted-about activities.",
		"width": 500,
		"height": 300,
		"data": {
		  "values": distanceVisArray
		},
		"mark": "point",
		"encoding": {
			"x": {"field": "day", "type": "ordinal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "axis": {"title": "time (day)"}},
			"y": {"field": "distance", "type": "quantitative"},
			"color": {"field": "activityType", "type": "nominal", "scale": {"domain": ["running", "walking", "biking"], "range": ["orange", "red", "blue"]}, "legend": {"title": "Activity Type"}}
		},
	};
	vegaEmbed('#distanceVis', distance_vis, {actions:false});

	// vega-lite visual representation for third plot
	distance_vis_aggr = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the distances by day of the week for top 3 most tweeted-about activities.",
		"width": 500,
		"height": 300,
		"data": {
		  "values": distanceVisArray
		},
		"mark": "point",
		"encoding": {
			"x": {"field": "day", "type": "ordinal", "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "axis": {"title": "time (day)"}},
			"y": {"field": "distance", "type": "quantitative", "aggregate": "mean"},
			"color": {"field": "activityType", "type": "nominal", "scale": {"domain": ["running", "walking", "biking"], "range": ["orange", "red", "blue"]}, "legend": {"title": "Activity Type"}}
		},
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggr, {actions:false});

	// script for mean/activity button
	$("#distanceVisAggregated").hide();
	$("#aggregate").click(function(event) {
		if ($("#aggregate").text() === "Show means") {
			$("#aggregate").text("Show all activites");
		} else {
			$("#aggregate").text("Show means");
		}
		$("#distanceVisAggregated").toggle();
		$("#distanceVis").toggle();
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});