import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies, deleteMovie } from '../../actions/movieAction';
import MovieList from '../../components/movie/MovieList';

class MoviePage extends React.Component {
    componentDidMount() {
        this.props.fetchMovies();
    }

    render() {
        return (
            <div>
                <h3 align="center">Movie List</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Year</th>
                        <th>Cover</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <MovieList movies={this.props.movies} deleteMovie={this.props.deleteMovie} />
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    movies: state.movies
});

const mapDispatchToProps = dispatch => ({
    fetchMovies: () => dispatch(fetchMovies()),
    deleteMovie: (id) => dispatch(deleteMovie(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);