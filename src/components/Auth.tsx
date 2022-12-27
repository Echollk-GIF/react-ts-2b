import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface IProps {
  permission: string;
  children?: ReactNode;
}
function Auth({ permission, children }: IProps) {
  const { loading, permissionList } = useSelector((state: RootState) => state.userReducer);
  if (loading) {
    return null;
  }
  let permissionSet = new Set(permissionList.map((p) => p.uniqueKey));
  if (!permissionSet.has(permission)) {
    return null;
  }
  return <>{children}</>;
}

export default Auth;
