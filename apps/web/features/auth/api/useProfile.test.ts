import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProfile } from './useProfile';
import { createWrapper } from '../../../test/utils';
import { useAuthStore } from '../store/useAuthStore';

describe('useProfile', () => {
    beforeEach(() => {
        useAuthStore.getState().logoutAction();
    });

    it('토큰이 있을 때 내 프로필 정보를 정상적으로 가져와야 한다', async () => {
        useAuthStore.getState().setToken('valid-token');

        const { result } = renderHook(() => useProfile(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.email).toBe('test@example.com');
    });

    it('토큰이 없을 때는 프로필 조회를 하지 않아야 한다 (idle 상태)', async () => {
        const { result } = renderHook(() => useProfile(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.fetchStatus).toBe('idle'));
        expect(result.current.data).toBeUndefined();
    });
});
