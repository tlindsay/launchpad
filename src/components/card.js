import React from 'react';
import PropTypes from'prop-types';

const Card = ({ className, children }) => {
  return (
    <div className={`${className} card`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default Card;
