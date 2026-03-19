import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useLogin } from './useLogin';
import { createWrapper } from '../../../test/utils';
import Cookies from 'js-cookie';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

vi.mock('js-cookie', () => ({
    default: {
        set: vi.fn(),
        remove: vi.fn(),
        get: vi.fn(),
    },
}));

describe('useLogin', () => {
    it('로그인 성공 시 토큰을 쿠키에 정상적으로 저장해야 한다', async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: createWrapper(),
        });

        await result.current.mutateAsync({ email: 'test@example.com', password: 'password' });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        
        expect(Cookies.set).toHaveBeenCalledWith('accessToken', 'mock-access-token', expect.any(Object));
    });
});
