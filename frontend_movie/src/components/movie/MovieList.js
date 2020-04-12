import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({movies, deleteMovie}) => (
    <tbody>
        { movies.length === 0 ?
        <tr>
            <td>Data not found</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
        </tr>
        :
        movies.map((movie, index) => <MovieItem key={index} movie={movie} deleteMovie={deleteMovie}/>)
        }
    </tbody>
)

export default MovieList;