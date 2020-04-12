import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({movie, deleteMovie}) => (
    <tr>
        <td>{movie.title}</td>
        <td>{movie.type}</td>
        <td>{movie.year}</td>
        <td><img src={movie.cover} alt={'Movie cover'} style={{width:75,height:100}}/></td>
        <td>
            <Link to={`/detail/${movie._id}`} className="btn btn-primary">Detail</Link>
            <Link to={`edit/${movie._id}`} className="btn btn-warning">Edit</Link>
            <Link to={'/index'} onClick={() => deleteMovie(movie._id)} className="btn btn-danger">Delete</Link>
        </td>
    </tr>
)

export default MovieItem;