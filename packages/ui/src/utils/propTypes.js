import PropTypes from 'prop-types';

const propTypesChild = PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.object]);

export const propTypesChildren = PropTypes.oneOfType([
    propTypesChild,
    PropTypes.arrayOf(propTypesChild),
]);

export const propTypesRef = PropTypes.oneOfType([
    // A function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.object }),
]);

export const propTypesRefElement = PropTypes.oneOfType([
    // A function
    PropTypes.func,
    // Or the instance of a DOM native element - requires Element shim for SSR:
    // Element = typeof Element === 'undefined' ? function(){} : Element
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) }),
]);
