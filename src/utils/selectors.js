import { createSelector } from 'reselect';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import values from 'lodash/values';

function defaultSortFn(a, b) {
  return (!isNaN(a) && !isNaN(b)) ? parseFloat(a) - parseFloat(b) : a - b;
}

function getStatePath(basePath, path) {
  return path.map
    ? [basePath].concat(path)
    : [basePath].concat(path.split('/'));
}

export function getFirebaseSelector(basePath) {
  return ({ path, orderBy }) => {

    const statePath = getStatePath(basePath, path);

    return createSelector(
      (state) => state.getIn ? state.getIn(statePath) : get(state, statePath),
      (possiblyImmData) => {
        
        if (!possiblyImmData) {
          return null;
        }

        const data = possiblyImmData.toJS
          ? possiblyImmData.toJS()
          : possiblyImmData;

        if (!!orderBy) {
          return (orderBy === '.value')
            ? values(data).sort(defaultSortFn)
            : sortBy(values(data), orderBy);
        }
        
        return data;

      }
    );
  }
}
