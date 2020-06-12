import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import HobbyList from '../components/Home/HobbyList';
import { addNewHobby, setActiveHobby } from '../actions/hobby';

Homepage.propTypes = {
    
};

const randomNumber = () => {
    return 1000 + Math.trunc((Math.random() * 9000));
}

function Homepage(props) {
    // Strict Comparison === : compare old & new state --> if #, re-render
    const hobbyList = useSelector(state => state.hobby.list);
    const activeId = useSelector(state => state.hobby.activeId);

    // Shallow comparison: {a, b} {a, b}
    // const hobbyState = useSelector(state => ({
    //     list: state.hobby.list,
    //     activeId: state.hobby.activeId
    // }));

    const dispatch = useDispatch();
    console.log('Hobby list: ', hobbyList);

    const handleAddHobbyClick = () => {
        //random a hobby object: id + title
        const newId = randomNumber();
        const newHobby = {
            id: newId,
            title: `Hobby ${newId}`
        }
        // dispatch action to add a new hobby to redux store
        const action = addNewHobby(newHobby);
        dispatch(action);
    }

    const handleHobbyClick = (hobby) => {
        const action = setActiveHobby(hobby);
        dispatch(action);
    }

    return (
        <div className="home-page">
            <h1>REDUX HOOKS - Home Page</h1>
            <button onClick={handleAddHobbyClick}>Random hobby</button>
            <HobbyList
                hobbyList={hobbyList}
                activeId={activeId}
                onHobbyClick={handleHobbyClick}
            />
        </div>
    );
}

export default Homepage;