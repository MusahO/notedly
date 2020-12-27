import React from 'react'

import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
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

const Home = ()=>{
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES); // query hook

    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
            <Button
                onClick={()=>
                    fetchMore({
                        variables: {cursor: data.noteFeed.cursor},
                        updateQuery: (previousResult, {fetchMoreResult})=>{
                            return{
                                noteFeed:{
                                    cursor: fetchMoreResult.noteFeed.cursor,
                                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                    //combine new result with old
                                    notes: [
                                        ...previousResult.noteFeed.notes,
                                        ...fetchMoreResult.noteFeed.notes
                                    ],
                                    __typename: 'noteFeed'
                                }
                            };
                        }
                    })
                }>
                Load more
            </Button>)}
        </React.Fragment>
        );
};

export default Home;