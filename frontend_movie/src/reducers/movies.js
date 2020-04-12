import { GET_MOVIES, DELETE_MOVIE, CREATE_MOVIE, GET_MOVIE, UPDATE_MOVIE } from "../actionTypes/movieActionTypes";

export default function movies(state = [], action = {}) {
    switch (action.type) {
        case GET_MOVIES:
            return action.movies;
        case DELETE_MOVIE:
            return state.filter(item => item._id !== action._id);
        case CREATE_MOVIE:
            return [...state, action.movie];
        case GET_MOVIE:
            const index = state.findIndex(item => item._id === action.movie._id);
            
            if (index > -1) {
                return state.map(item => {
                    if (item._id === action.movie._id) return action.movie;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.movie
                ]
            }
        case UPDATE_MOVIE:
            return state.map(item => {
                if (item._id === action.movie._id) return action.movie;
                return item;
            })
        default:    
            return state;
    }
}