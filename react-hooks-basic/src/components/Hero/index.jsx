import React from 'react';
import PropTypes from 'prop-types';

Hero.propTypes = {
    name: PropTypes.string,
};

Hero.defaultProps = {
    name: ''
}

function Hero(props) {
    const { name } = props;
    console.log("Hero name", name)
    return (
        <div>
            Hero {name}
        </div>
    );
}

export default React.memo(Hero);