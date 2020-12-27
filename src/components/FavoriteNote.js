import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';

import { TOGGLE_FAVORITE } from '../gql/mutation';
// add the GET_MY_FAVORITES query to refetch
import { GET_MY_FAVORITES } from '../gql/query';


const FavoriteNote = props => {
    const [count, setCount] = useState(props.likeCount);
    // store if the user has favorited the note as state
    const [favorited, setFavorited] = useState(
        // check if the note exists in the user favorites list
        props.me.likes.filter(note => note.id === props.noteId).length > 0
    );

     // toggleFavorite mutation hook
    const [toggleLike] = useMutation(TOGGLE_FAVORITE, {
         variables: {
            id: props.noteId
        },
        // refetch the GET_MY_FAVORITES query to update the cache
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });

    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={()=> {
                        toggleLike();
                        setFavorited(false);
                        setCount(count-1);
                    }}
                >Dislike </ButtonAsLink>
            ): (<ButtonAsLink
                    onClick={()=>{
                        toggleLike();
                        setFavorited(true);
                        setCount(count+1);
                    }}
                >
                    like
            </ButtonAsLink>
        )}: {count}
        </React.Fragment>
    )
};
export default FavoriteNote;