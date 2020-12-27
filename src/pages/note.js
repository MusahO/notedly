import React from 'react'
// import GraphQL dependencies
import { useQuery, gql } from '@apollo/client';
// import the Note component
import Note from '../components/Note';
// the note query, which accepts an ID variable
import { GET_NOTE } from '../gql/query';

const NotePage = props=>{
    const id = props.match.params.id // store the id found in the url as a variable

    // query hook, passing the id value as a variable
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    if (loading) return <p>Loading...</p>;

    // if there is an error fetching the data, display an error message
    console.log(error)
    if (error) return <p>Error! Note not found</p>;

    // if the data is successful, display the data in our UI
    return <Note note={data.note} />;
};

export default NotePage