import { Button } from '@material-ui/core';
import { authAction } from 'features/auth/authSlice';
import * as React from 'react';
import { useAppDispatch } from '../../app/hooks';

export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => dispatch(authAction.logout())}>
        Logout
      </Button>
      AdminLayout
    </div>
  );
}
