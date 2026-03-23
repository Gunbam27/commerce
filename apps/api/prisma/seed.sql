-- 1. 기존 데이터 삭제
TRUNCATE "CartItem", "OrderItem", "Order", "Product", "Category" RESTART IDENTITY CASCADE;

-- 2. 카테고리 삽입
INSERT INTO "Category" (name, "updatedAt") 
VALUES 
    ('T-Shirts', NOW()),
    ('Shorts', NOW()),
    ('Shirts', NOW()),
    ('Hoodies', NOW()),
    ('Jeans', NOW())
ON CONFLICT (name) DO NOTHING;

-- 3. 삽입된 카테고리 ID 가져오기 및 상품 데이터 삽입
DO $$
DECLARE
    tshirts_id INT;
    shorts_id INT;
    shirts_id INT;
    hoodies_id INT;
    jeans_id INT;
    base_url TEXT := 'https://vhehjdaiqudprtxhmgvt.supabase.co/storage/v1/object/public/product-image/';
    default_sizes TEXT[] := ARRAY['S', 'M', 'L', 'XL', 'XXL'];
BEGIN
    SELECT id INTO tshirts_id FROM "Category" WHERE name = 'T-Shirts';
    SELECT id INTO shorts_id FROM "Category" WHERE name = 'Shorts';
    SELECT id INTO shirts_id FROM "Category" WHERE name = 'Shirts';
    SELECT id INTO hoodies_id FROM "Category" WHERE name = 'Hoodies';
    SELECT id INTO jeans_id FROM "Category" WHERE name = 'Jeans';

    INSERT INTO "Product" (name, price, stock, images, colors, sizes, "categoryId", description, "updatedAt")
    VALUES
        ('Classic Black Hoodie', 85, 50, ARRAY[base_url || 'hood001_black.png', base_url || 'hood001_skyblue.png'], ARRAY['Black', 'Skyblue'], default_sizes, hoodies_id, 'A cozy and stylish hoodie available in multiple colors.', NOW()),
        ('Premium Pink Hoodie', 89, 30, ARRAY[base_url || 'hood002_pink.png'], ARRAY['Pink'], default_sizes, hoodies_id, 'A premium soft hoodie with a vibrant pink color.', NOW()),
        ('Slim Fit Blue Jeans', 120, 45, ARRAY[base_url || 'jean001_blue.png'], ARRAY['Blue'], default_sizes, jeans_id, 'Modern slim-fit jeans made with durable denim.', NOW()),
        ('Classic Black Jeans', 115, 40, ARRAY[base_url || 'jean002_black.png'], ARRAY['Black'], default_sizes, jeans_id, 'Essential black jeans for every wardrobe.', NOW()),
        ('Casual Cotton Shirt', 65, 60, ARRAY[base_url || 'shirt001_pink.png', base_url || 'shirt001_yellow.png'], ARRAY['Pink', 'Yellow'], default_sizes, shirts_id, 'Breathable cotton shirt perfect for casual outings.', NOW()),
        ('Smart Look Shirt', 75, 35, ARRAY[base_url || 'shirt002_navy.png', base_url || 'shirt002_skyblue.png'], ARRAY['Navy', 'Skyblue'], default_sizes, shirts_id, 'A sharp, smart-looking shirt for professional and social events.', NOW()),
        ('Summer Cargo Shorts', 45, 80, ARRAY[base_url || 'shorts001_black.png', base_url || 'shorts001_blue.png'], ARRAY['Black', 'Blue'], default_sizes, shorts_id, 'Durable and practical cargo shorts for summer adventures.', NOW()),
        ('Classic White Shorts', 42, 25, ARRAY[base_url || 'shorts002_white.png'], ARRAY['White'], default_sizes, shorts_id, 'Clean and simple white shorts for a fresh summer look.', NOW()),
        ('Essential White T-Shirt', 25, 120, ARRAY[base_url || 'tshirt001_white.png'], ARRAY['White'], default_sizes, tshirts_id, 'The foundation of any outfit, a high-quality white t-shirt.', NOW()),
        ('Essential Black T-Shirt', 25, 110, ARRAY[base_url || 'tshirt002_black.png'], ARRAY['Black'], default_sizes, tshirts_id, 'Versatile black t-shirt made from premium soft cotton.', NOW());
END $$;
