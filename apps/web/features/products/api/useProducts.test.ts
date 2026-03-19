import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useProducts } from './useProducts';
import { createWrapper } from '../../../test/utils';

describe('useProducts', () => {
    it('상품 목록 데이터를 서버로부터 정상적으로 가져와야 한다', async () => {
        const { result } = renderHook(() => useProducts(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        
        const items = result.current.data!.items;
        expect(items).toHaveLength(2);
        expect(items[0]!.name).toBe('Product 1');
    });
});
