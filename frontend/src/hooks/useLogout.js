import { useAuthContext } from './useAuthContext'
import { useCyclesContext } from './useCyclesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchCycles } = useCyclesContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchCycles({type: 'SET_CYCLES', payload: null});
  }

  return { logout }
}