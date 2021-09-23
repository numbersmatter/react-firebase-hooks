import { User, Auth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useMemo } from 'react';
import { LoadingHook, useLoadingValue } from '../util';

export type AuthStateHook = LoadingHook<
  User | null,
  Error
>;

export default (auth: firebase.auth.Auth): AuthStateHook => {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    firebase.User | null,
    firebase.auth.Error
  >(() => auth.currentUser);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, setValue, setError);

    return () => {
      listener();
    };
  }, [auth]);

  const resArray: AuthStateHook = [value, loading, error];
  return useMemo<AuthStateHook>(() => resArray, resArray);
};
