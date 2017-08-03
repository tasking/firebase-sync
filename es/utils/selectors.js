import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import values from 'lodash/values';

function defaultSortFn(a, b) {
  return !isNaN(a) && !isNaN(b) ? parseFloat(a) - parseFloat(b) : a - b;
}

export function getFirebaseListSelector(basePath) {
  return function (_ref) {
    var path = _ref.path,
        orderBy = _ref.orderBy;
    return createSelector(function (state) {
      return get(state, path.map ? [basePath].concat(path) : [basePath].concat(path.split('/')));
    }, function (data) {
      if (!data) return null;
      return orderBy === '.value' ? values(data).sort(defaultSortFn) : sortBy(values(data), orderBy);
    });
  };
}