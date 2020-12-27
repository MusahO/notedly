import { gql } from '@apollo/client';

const GET_NOTES = gql`
 query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
        cursor
        hasNextPage
        notes {
            id
            createdAt
            content
            likeCount
            author {
                username
                id
                avatar
            }
        }
    }
 }
`;
const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            likeCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const GET_ME = gql`
 query me {
    me {
        id
        likes {
            id
        }
    }
}
`;

const GET_MY_NOTES = gql`
    query me {
        me {
            id
            username
            notes {
                id
                createdAt
                content
               likeCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const GET_MY_FAVORITES = gql`
 query me {
    me {
        id
        username
        likes {
            id
            createdAt
            content
            likeCount
            author {
                username
                id
                avatar
            }
        }
    }
 }
`;


const IS_LOGGED_IN = gql`
 {
    isLoggedIn @client
 }
`;
export { GET_NOTES, GET_NOTE, IS_LOGGED_IN, GET_MY_NOTES, GET_MY_FAVORITES, GET_ME };