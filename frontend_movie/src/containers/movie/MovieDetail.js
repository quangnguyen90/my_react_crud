import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../../actions/movieAction';
import { Link } from 'react-router-dom';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchMovie(this.props.match.params.id);
            this.setState({
                loading: true
            })
        }
    }

    render() {
        return (
            <div>
                <h3>Detail Movie</h3>
                <div className="form-group">
                    <label htmlFor="title">Movie Title: </label>
                    <span> {this.props.movie.title} </span>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Movie Type: </label>
                    <span> {this.props.movie.type} </span>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Movie year: </label>
                    <span> {this.props.movie.year} </span>
                </div>
                <div className="form-group">
                    <label htmlFor="cover">Movie Cover: </label>
                    <br/>
                    <img src={this.props.movie.cover} alt="cover" />
                </div>
                <div className="form-group">
                    <Link to={'/index'} className="btn btn-primary">Back to Index</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => (
    props.match.params.id ? { movie: state.movies.find(item => item._id = props.match.params.id)} : { movie: null }
);

const mapDispatchToProps = dispatch => ({
    fetchMovie: (id) => dispatch(fetchMovie(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)