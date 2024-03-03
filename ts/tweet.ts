class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if (this.text.startsWith("Watch my")) {
            return "live_event";
        } else if (this.text.startsWith("Achieved") || this.text.startsWith("I just set a goal")) {
            return "achievement";
        } else if (this.text.startsWith("Just completed") || this.text.startsWith("Just posted")) {
            return "completed_event";
        } else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if (this.text.includes("TomTom MySports Watch")) {
            return false;
        } else if (this.text.includes("-")) {
            return true;
        }
        return false;
    }

    // get user's written text (if there is any) of this current tweet
    get writtenText():string {
        if(!this.written) {
            return "";
        }
        return this.text.substring(this.text.indexOf("-")+2, this.text.indexOf("https://"));
    }

    // get activity type of this current tweet
    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        if (this.text.includes("ski run")) {
            return "skiing";
        } else if (this.text.includes("run")) {
            return "running";
        } else if (this.text.includes("nordic")) {
            return "nordic";
        } else if (this.text.includes("walk")) {
            return "walking";
        } else if (this.text.includes("mtn bike")) {
            return "mtn biking";
        } else if (this.text.includes("bike")) {
            return "biking";
        } else if (this.text.includes("elliptical")) {
            return "elliptical";
        } else if (this.text.includes("hike")) {
            return "hike";
        } else if (this.text.includes("activity")) {
            return "activity";
        } else if (this.text.includes("swim")) {
            return "swimming";
        } else if (this.text.includes("row")) {
            return "rowing";
        } else if (this.text.includes("chair ride")) {
            return "chair";
        } else if (this.text.includes("skate")) {
            return "skating";
        } else if (this.text.includes("snowboard")) {
            return "snowboarding";
        } else if (this.text.includes("circuit")) {
            return "circuit";
        } else if (this.text.includes("MySports Freestyle")) {
            return "mysports";
        } else { // dont need to parse time duration activities
            return "";
        }
    }

    // get distance of this current tweet
    get distance():number {
        var miIndex = this.text.search("mi");
        var kmIndex = this.text.search("km");
        const textArray = this.text.split(" ");
        if (miIndex === -1 && kmIndex === -1) {
            return 0;
        } else if (miIndex === -1) { // km
            var kmDistance = parseFloat(textArray[3]);
            var miDistance = kmDistance/1.609;
            let tempstring: string = miDistance.toFixed(2);
            let miles = parseFloat(tempstring);
            return miles;
        } else { // mi
            var miDistance = parseFloat(textArray[3]);
            let tempstring: string = miDistance.toFixed(2);
            let miles = parseFloat(tempstring);
            return miles;
        }
    }

    // return all the information needed in order to add table row (<tr>) to html
    getHTMLTableRow(rowNumber:number):string {
        let result = "<tr> ";
        let numTweet = "<td> " + rowNumber + " </td>";
        result += numTweet;
        let activityType = "<td> " + this.activityType + "</td>";
        result += activityType;
        let splitText = this.text.split(" ");
        let tweetText = "";
        for (let i = 0; i < splitText.length; i++) {
            if (splitText[i].toLowerCase().startsWith("https")) {
                tweetText += this.makeClickableLink(splitText[i]);
                tweetText += " ";
            } else {
                tweetText += splitText[i];
                tweetText += " ";
            }
        }
        let tableElementTweet = "<td> " + tweetText + " </td>";
        result += tableElementTweet;

        var positive = ["enjoy", " fun ", "happy", "good", "love", "fantastic", "wonderful", "better", "nice"]
        var negative = ["brutal", " sad ", " bad ", " tough", "not happy", " rough ", " hot ", " slow "]
        var priority = 0;
        let sentiment = "";
        for (let i = 0; i < negative.length; i++) {
            if (this.text.toLowerCase().includes(negative[i])) {
                sentiment = "Negative";
                priority = 1;
                break;
            }
        }
        for (let i = 0; i < positive.length; i++) {
            if (this.text.toLowerCase().includes(positive[i])) {
                sentiment = "Positive";
                break;
            }
        }
        if (sentiment === "") {
            sentiment = "No detectable sentiment in message";
        } else if (priority === 1) {
            sentiment = "Negative";
        }
        let tableElementSentiment = "<td> " + sentiment + " </td>";
        result += tableElementSentiment;
        result += " </tr>"
        return result;
    }

    // gets the day of the week for this current tweet
    get getDay():string {
        const options: Intl.DateTimeFormatOptions = {weekday: "short", year: 'numeric', month: 'long', day: 'numeric'};
        let fullDate = this.time.toLocaleDateString("en-US", options);
		let splitDate = fullDate.split(",");
        return splitDate[0];
    }

    // gets all of the text in this current tweet before the link (includes non-user written messages)
    get beforeLinkText():string {
        let splitText = this.text.split(" ");
        let tweetText = "";
        for (let i = 0; i < splitText.length; i++) {
            if (splitText[i].toLowerCase().startsWith("https")) {
                break;
            } else {
                tweetText += splitText[i];
                tweetText += " ";
            }
        }
        return tweetText;
    }

    // gets/makes the stringLink and clickable link using the a tag
    makeClickableLink(stringLink:string):string {
        let formatted = '<a href="' + stringLink + '"> ' + stringLink + ' </a>';
        return formatted;
    }
}