import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('*/auth/login', () => {
    return HttpResponse.json({
      accessToken: 'mock-access-token',
      user: { id: 1, email: 'test@example.com', name: 'Test User' }
    });
  }),

  http.post('*/auth/logout', () => {
    return new HttpResponse(null, { status: 200 });
  }),
  
  http.get('*/auth/profile', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json({ id: 1, email: 'test@example.com', name: 'Test User' });
  }),

  // Product Handlers
  http.get('*/products', () => {
    return HttpResponse.json({
      items: [
        { id: 1, name: 'Product 1', price: 100, images: ['/img1.png'], categoryId: 1 },
        { id: 2, name: 'Product 2', price: 200, images: ['/img2.png'], categoryId: 1 }
      ],
      total: 2
    });
  }),

  // Cart Handlers
  http.get('*/cart', () => {
    return HttpResponse.json([
      {
        id: 1,
        productId: 101,
        quantity: 2,
        size: 'M',
        color: 'Red',
        product: { id: 101, name: 'Server Product', price: 50, images: ['/server.png'] }
      }
    ]);
  }),
];
