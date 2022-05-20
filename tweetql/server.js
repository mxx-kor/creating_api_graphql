import { ApolloServer, gql } from "apollo-server"

let tweets = [
    {
        id: "1",
        text: "first one",
        userId: "2",
    },
    {
        id: "2",
        text: "second one",
        userId: "1",
    }
]

let users = [
    {
        id: "1",
        firstName: "mxx",
        lastName: "Kim"
    },
    {
        id: "2",
        firstName: "Elon",
        lastName: "Mask"
    }
]

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        """
        fullName is the sum of firstnName + lastName as a string
        """
        fullName: String!
    }
    """
    Tweet object represents a resource for a Tweet
    """
    type Tweet {
        id: ID!
        text: String!
        """
        Represent a user that wrote a Tweet
        """
        author: User
    }
    type Query {
        """
        Get all Users
        """
        allUsers: [User!]!
        """
        Get all tweets
        """
        allTweets: [Tweet!]!
        """
        Tweet object represents a resource for a Tweet
        """
        tweet(id: ID!): Tweet
    }
    type Mutation {
        """
        Post a new Tweet with text and userId
        """
        postTweet(text: String!, userId: ID!): Tweet!
        """
        Deletes a Tweet if found, else returns false    
        """
        deleteTweet(id: ID!): Boolean!
    }
`;

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        tweet(root, { id }) {
            return tweets.find((tweet)=> tweet.id === id);
        },
        allUsers() {
            return users;
        }
    },
    Mutation: {
        postTweet(_, { text, userId }) {
            const check = users.find(user => user.id === userId);
            if (!check) return console.log("failed: can not find user data");
            const newTweet = {
                id: tweets.length + 1,
                text,
                userId
            };
            tweets.push(newTweet);
            return newTweet
        },
        deleteTweet(_, { id }) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
        }
    },
    User: {
        fullName({ firstName, lastName }) {
            return `${firstName} ${lastName}`
        }
    },
    Tweet: {
        author({ userId }) {
            return users.find((user) => user.id == userId);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});