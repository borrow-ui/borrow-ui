import PropTypes from 'prop-types';

export const propTypesChildren = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
]);
