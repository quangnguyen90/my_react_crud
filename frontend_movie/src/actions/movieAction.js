import { GET_MOVIES, DELETE_MOVIE, CREATE_MOVIE, GET_MOVIE, UPDATE_MOVIE } from '../actionTypes/movieActionTypes';

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export const fetchMovies = () => (
    async dispatch => {
        const response  = await fetch('http://127.0.0.1:5000/api/movies');
        const movies = await response.json();
        await dispatch({
            type: GET_MOVIES,
            movies
        });
    }
)

export const deleteMovie = (id) => (
    async dispatch => {
        const movie = await fetch(`http://127.0.0.1:5000/api/movies/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        });
        handleResponse(movie);
        await dispatch({
            type: DELETE_MOVIE,
            id
        });
    }
)

export const createMovie = (data) => (
    async dispatch => {
        const movie = await fetch('http://127.0.0.1:5000/api/movies', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        handleResponse(movie);
        await dispatch({
            type: CREATE_MOVIE,
            movie
        });
    }
)

export const fetchMovie = (id) => (
    async dispatch => {
        const response  = await fetch(`http://127.0.0.1:5000/api/movies/${id}`);
        const movie = await response.json();
        await dispatch({
            type: GET_MOVIE,
            movie
        });
    }
)

export const updateMovie = (data) => (
    async dispatch => {
        const movie = await fetch(`http://127.0.0.1:5000/api/movies/${data.id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        handleResponse(movie);
        await dispatch({
            type: UPDATE_MOVIE,
            movie
        });
    }
)