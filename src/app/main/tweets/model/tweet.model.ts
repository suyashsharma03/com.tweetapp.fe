export interface Tweet {
    tweetText: string;
}

export interface TweetResponse {
    id: string;
    tweetText: string;
    userId: string;
    dateAndTimeOfTweet: Date;
    likes: number;
    firstName: string;
    lastName: string;
    likedBy: string[];
    replies: ReplyTweet[];
}

export interface ReplyTweet {
    replyText: string;
    userId: string;
    dateAndTimeOfReply: Date;
    firstName: string;
    lastName: string;
}

export interface ReplyText {
    tweetText: string;
}