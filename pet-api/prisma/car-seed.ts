import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 先清空旧的购物车和收藏数据，避免重复
  await prisma.favorite.deleteMany();
  await prisma.cartItem.deleteMany();

  console.log('✔ 已清空购物车与收藏数据');

  const userId = 'default-user';

  // 购物车数据：覆盖多个商家的多种商品
  const cartItems = await prisma.cartItem.createMany({
    data: [
      { quantity: 1, userId, productId: 'prod-1', merchantId: 'merchant-1' },
      { quantity: 2, userId, productId: 'prod-4', merchantId: 'merchant-1' },
      { quantity: 1, userId, productId: 'prod-6', merchantId: 'merchant-1' },
      { quantity: 3, userId, productId: 'prod-8', merchantId: 'merchant-2' },
      { quantity: 1, userId, productId: 'prod-11', merchantId: 'merchant-2' },
      { quantity: 2, userId, productId: 'prod-13', merchantId: 'merchant-2' },
      { quantity: 1, userId, productId: 'prod-15', merchantId: 'merchant-3' },
      { quantity: 1, userId, productId: 'prod-16', merchantId: 'merchant-3' },
    ],
  });

  console.log(`✔ 购物车创建完成，共 ${cartItems.count} 条`);

  // 收藏数据
  const favorites = await prisma.favorite.createMany({
    data: [
      { userId, productId: 'prod-1' },
      { userId, productId: 'prod-2' },
      { userId, productId: 'prod-8' },
      { userId, productId: 'prod-9' },
      { userId, productId: 'prod-13' },
      { userId, productId: 'prod-14' },
      { userId, productId: 'prod-16' },
    ],
  });

  console.log(`✔ 收藏创建完成，共 ${favorites.count} 条`);

  console.log('\n🎉 购物车 & 收藏 Seed 数据填充完毕！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
