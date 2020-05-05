import PropTypes from 'prop-types';

const propTypesChild = PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.object]);

export const propTypesChildren = PropTypes.oneOfType([
    propTypesChild,
    PropTypes.arrayOf(propTypesChild),
]);
