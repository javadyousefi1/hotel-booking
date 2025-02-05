// react query
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
// services
import { apiCheckAuth } from '@/services/auth';
import { useEffect } from 'react';
import useUserStore from '@/store/userStore';

const useCheckAuth = () => {
  const { setUser } = useUserStore();
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.auth.CHECK_USER_AUTH],
    queryFn: apiCheckAuth,
  });

  useEffect(() => {
    if (data?.success) {
      setUser(data.data);
    }
  }, [isLoading]);
};

export default useCheckAuth;
