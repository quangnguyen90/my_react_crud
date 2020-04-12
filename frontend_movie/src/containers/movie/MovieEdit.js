import React, { Component } from 'react';
import { updateMovie, fetchMovie } from '../../actions/movieAction';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class MovieEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            title: '',
            type: '',
            year: '',
            cover: '',
            error: {},
            loading: false,
            done: false
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchMovie(this.props.match.params.id);
            this.setState({
                loading: true,
                title: this.props.movie.title,
                type: this.props.movie.type,
                year: this.props.movie.year,
                cover: this.props.movie.cover,
                id: this.props.match.params.id
            });
        }
    }

    handleChange = (e) => {
        if (!!this.state.error[e.target.name]) {
            let error = Object.assign({}, this.state.error);
            delete error[e.target.name];
            this.setState({ [e.target.name]: e.target.value, error });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        const { id, title, type, year, cover } = this.state;
        e.preventDefault();
        // validation
        let error = {};
        if (title.trim() === '')  error.title  = "Can't be empty";
        if (type.trim() === '')  error.type  = "Can't be empty";
        if (year.trim() === '')  error.year  = "Can't be empty";
        if (cover.trim() === '') error.cover = "Can't be empty";
        this.setState({ error });

        const isValid = Object.keys(error).length === 0;

        if (isValid) {
            this.setState({ loading: true });
            this.props.updateMovie({
                id,
                title,
                type,
                year,
                cover
            }).then(
                () => { this.setState({ 
                    done: true,
                }) },
                (err) => err.response.json().then(({ error }) => this.setState({ error, loading: false }))
            );
        }
    }

    renderForm = () => (
        <div style={{marginTop: 10}}>
            <h3>Update Movie</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Movie Title:  </label>
                    <input
                        id="title"
                        name="title"
                        type="text" 
                        className="form-control"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <span>{this.state.error.title}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Movie Type: </label>
                    <input 
                        id="type"
                        name="type"
                        type="text" 
                        className="form-control"
                        value={this.state.type}
                        onChange={this.handleChange}
                    />
                    <span>{this.state.error.type}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Publish Year: </label>
                    <input 
                        id="year"
                        name="year"
                        type="text" 
                        className="form-control"
                        value={this.state.year}
                        onChange={this.handleChange}
                    />
                    <span>{this.state.error.year}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="cover">Movie Cover: </label>
                    <input
                        id="cover"
                        name="cover"
                        type="text" 
                        className="form-control"
                        value={this.state.cover}
                        onChange={this.handleChange}
                    />
                    <span>{this.state.error.cover}</span>
                </div>
                { this.state.cover.trim() !== '' &&
                    <div className="form-group">
                        <img src={this.state.cover} alt="cover" />
                    </div>
                }
                <div className="form-group">
                    <button className="btn btn-primary">Update Movie</button>
                </div>
            </form>
        </div>
    )

    render = () => (
        <div>
            {this.state.done ? <Redirect to="/index" /> : this.renderForm()}
        </div>
    )
}

const mapStateToProps = (state, props) => (
    props.match.params.id ? { movie: state.movies.find(item => item._id = props.match.params.id)} : { movie: null }
);

const mapDispatchToProps = dispatch => ({
    fetchMovie: (id) => dispatch(fetchMovie(id)),
    updateMovie: (data) => dispatch(updateMovie(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieEdit);