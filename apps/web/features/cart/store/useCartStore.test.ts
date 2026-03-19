import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './useCartStore';

describe('useCartStore', () => {
    beforeEach(() => {
        useCartStore.getState().clearCart();
    });

    const mockItem = {
        id: 1,
        productId: 101,
        name: '테스트 상품',
        price: 100,
        quantity: 1,
        size: 'M',
        color: 'Red',
        image: '/test.png'
    };

    it('장바구니에 아이템이 정상적으로 추가되어야 한다', () => {
        useCartStore.getState().addItem(mockItem);
        const { items } = useCartStore.getState();
        
        expect(items).toHaveLength(1);
        expect(items[0]!).toEqual(mockItem);
    });

    it('동일한 아이템(상품ID, 사이즈, 색상 동일) 추가 시 수량만 증가해야 한다', () => {
        useCartStore.getState().addItem(mockItem);
        useCartStore.getState().addItem({ ...mockItem, quantity: 2 });
        
        const { items } = useCartStore.getState();
        expect(items).toHaveLength(1);
        expect(items[0]!.quantity).toBe(3);
    });

    it('사이즈나 색상이 다르면 별도의 아이템으로 추가되어야 한다', () => {
        useCartStore.getState().addItem(mockItem);
        useCartStore.getState().addItem({ ...mockItem, size: 'L' });
        
        const { items } = useCartStore.getState();
        expect(items).toHaveLength(2);
    });

    it('기존 아이템의 수량을 정상적으로 업데이트할 수 있어야 한다', () => {
        useCartStore.getState().addItem(mockItem);
        useCartStore.getState().updateQuantity(101, 5, 'M', 'Red');
        
        const { items } = useCartStore.getState();
        expect(items[0]!.quantity).toBe(5);
    });

    it('장바구니에서 특정 아이템을 제거할 수 있어야 한다', () => {
        useCartStore.getState().addItem(mockItem);
        useCartStore.getState().removeItem(101, 'M', 'Red');
        
        const { items } = useCartStore.getState();
        expect(items).toHaveLength(0);
    });

    it('장바구니를 완전히 비울 수 있어야 한다', () => {
        useCartStore.getState().addItem(mockItem);
        useCartStore.getState().clearCart();
        
        const { items } = useCartStore.getState();
        expect(items).toHaveLength(0);
    });
});
