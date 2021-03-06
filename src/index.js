import getFirebaseSyncHelpers from './utils/helpers'
import getFirebaseSyncSelector from './utils/selector'
import getFirebaseSyncMapState from './utils/mapState'
import getFirebaseSyncConnect from './utils/connect'
import * as firebaseSyncActions from './redux/actions'
import getFirebaseSync from './containers/FirebaseSync/FirebaseSync'

import getFirebaseSyncReducer from './redux/reducer'
export { getFirebaseSyncReducer }

export default function buildFirebaseSync(options) {
  const minDefaultProps = {
    basePath: options.basePath || options.reducerName || 'firebase'
  }
  const defaultProps = options.defaultProps
    ? { ...minDefaultProps, ...options.defaultProps }
    : minDefaultProps
  const basePath = defaultProps.basePath

  const _getFirebaseSyncHelpers = getFirebaseSyncHelpers(
    options.firebase,
    options.store
  )
  const _getFirebaseSync = getFirebaseSync(_getFirebaseSyncHelpers)

  return {
    getFirebaseSync: _getFirebaseSync,
    getFirebaseSyncHelpers: _getFirebaseSyncHelpers,
    FirebaseSync: _getFirebaseSync(defaultProps),
    firebaseSyncHelpers: _getFirebaseSyncHelpers(defaultProps),
    firebaseSyncSelector: getFirebaseSyncSelector(basePath),
    firebaseSyncMapState: getFirebaseSyncMapState(basePath),
    firebaseSyncConnect: getFirebaseSyncConnect(basePath),
    firebaseSyncActions
  }
}
