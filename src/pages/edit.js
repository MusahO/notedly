import React from 'react'
// import GraphQL dependencies
import { useQuery, useMutation} from '@apollo/client';
// import the Noteform component
import NoteForm from '../components/NoteForm';
// the note query, which accepts an ID variable
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props=>{
    const id = props.match.params.id // store the id found in the url as a variable

    // query hook, passing the id value as a variable
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    // fetch the current user's data
    const { data: userdata } = useQuery(GET_ME);
    // define our mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if (loading) return <p>Loading...</p>;

    // if there is an error fetching the data, display an error message
    if (error) return <p>Error! Note not found</p>;

    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }

    // if the data is successful, display the data in our UI
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote