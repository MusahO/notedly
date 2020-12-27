import React, {useEffect} from  'react'
import {useMutation, gql} from '@apollo/client'
import NoteForm from '../components/NoteForm'

import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

// our new note query
const NEW_NOTE = gql`
 mutation newNote($content: String!) {
 newNote(content: $content) {
        id
        content
        createdAt
        likeCount
        likedBy {
            id
            username
        }
        author {
            username
            id
            }
        }
    }
   `;

const NewNote = props => {
    useEffect(()=>{
        document.title = 'New Note - Notedly'
    });
    
    const [data, {loading, error}] = useMutation(NEW_NOTE, {
        // refetch the GET_NOTES query to update the cache
        refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],

        onCompleted: data=>{
            // when complete, redirect the user to the note page
            props.history.push(`note/${data.newNote.id}`)
        }
    })
    return (
        <React.Fragment>
            {loading && <p>loadin...</p>}
            {error && <p>Error saving the note</p>}
            <NoteForm action={data} />
        </React.Fragment>
    )
};
export default NewNote;