import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCartManage } from './useCartManage';
import { createWrapper } from '../../../test/utils';
import { useProfile } from '@/features/auth/api/useProfile';
import { useCartStore } from '../store/useCartStore';

vi.mock('@/features/auth/api/useProfile');

describe('useCartManage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useCartStore.getState().clearCart();
    });

    it('로그인하지 않았을 때는 로컬 스토리지의 아이템을 반환해야 한다', async () => {
        (useProfile as any).mockReturnValue({ data: null });
        
        useCartStore.getState().addItem({
            id: 0,
            productId: 1,
            name: '로컬 상품',
            price: 10,
            quantity: 1,
            size: 'M',
            color: 'Blue',
            image: ''
        });

        const { result } = renderHook(() => useCartManage(), {
            wrapper: createWrapper(),
        });

        expect(result.current.isLogin).toBe(false);
        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0]!.name).toBe('로컬 상품');
    });

    it('로그인했을 때는 서버의 장바구니 아이템을 반환해야 한다', async () => {
        (useProfile as any).mockReturnValue({ data: { id: 1, name: '사용자' } });

        const { result } = renderHook(() => useCartManage(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.items).toHaveLength(1));
        expect(result.current.isLogin).toBe(true);
        expect(result.current.items[0]!.name).toBe('Server Product');
    });
});
