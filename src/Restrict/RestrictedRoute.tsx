import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

const Restricted = (props: any) => {
  if (props.isLoggedIn !== 'true') {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

Restricted.propTypes = {
  isLoggedIn: PropTypes.any,
  children: PropTypes.any.isRequired
};

export default Restricted;
