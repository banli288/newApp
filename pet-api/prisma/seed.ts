import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const IMG = 'https://picsum.photos/id/237/200/300';

async function main() {
  // ==================== 1. 清空数据（按外键依赖倒序） ====================
  await prisma.favorite.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.post.deleteMany();
  await prisma.liveRoom.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.carousel.deleteMany();
  await prisma.address.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.user.deleteMany();

  console.log('✔ 已清空所有表数据');

  // ==================== 2. 用户 ====================
  const defaultUser = await prisma.user.create({
    data: {
      id: 'default-user',
      name: '宠物体验官',
      avatar: IMG,
      level: 3,
      status: 1,
    },
  });

  const merchantUser1 = await prisma.user.create({
    data: { id: 'merchant-user-1', name: '萌宠严选店主', avatar: IMG, level: 0, status: 1 },
  });
  const merchantUser2 = await prisma.user.create({
    data: { id: 'merchant-user-2', name: '喵星人店长', avatar: IMG, level: 0, status: 1 },
  });
  const merchantUser3 = await prisma.user.create({
    data: { id: 'merchant-user-3', name: '水族小铺老板', avatar: IMG, level: 0, status: 1 },
  });

  console.log('✔ 用户创建完成');

  // ==================== 3. 商家 ====================
  const merchant1 = await prisma.merchant.create({
    data: {
      id: 'merchant-1',
      name: '萌宠严选',
      logo: IMG,
      description: '专注高品质宠物用品，严选每一件好物',
      userId: merchantUser1.id,
    },
  });
  const merchant2 = await prisma.merchant.create({
    data: {
      id: 'merchant-2',
      name: '喵星人旗舰店',
      logo: IMG,
      description: '猫咪的快乐星球，一站式猫咪用品专营',
      userId: merchantUser2.id,
    },
  });
  const merchant3 = await prisma.merchant.create({
    data: {
      id: 'merchant-3',
      name: '水族小铺',
      logo: IMG,
      description: '观赏鱼与水族器材，打造你的水下世界',
      userId: merchantUser3.id,
    },
  });

  console.log('✔ 商家创建完成');

  // ==================== 4. 分类 ====================
  const dogCategory = await prisma.category.create({
    data: { id: 'cat-dog', name: '狗狗用品', icon: IMG },
  });
  const catCategory = await prisma.category.create({
    data: { id: 'cat-cat', name: '猫咪专区', icon: IMG },
  });
  const fishCategory = await prisma.category.create({
    data: { id: 'cat-fish', name: '水族世界', icon: IMG },
  });

  const dogFood = await prisma.category.create({
    data: { id: 'cat-dog-food', name: '主粮', icon: IMG, parentId: dogCategory.id },
  });
  const dogSnack = await prisma.category.create({
    data: { id: 'cat-dog-snack', name: '零食', icon: IMG, parentId: dogCategory.id },
  });
  const dogToy = await prisma.category.create({
    data: { id: 'cat-dog-toy', name: '玩具', icon: IMG, parentId: dogCategory.id },
  });

  const catFood = await prisma.category.create({
    data: { id: 'cat-cat-food', name: '主粮', icon: IMG, parentId: catCategory.id },
  });
  const catSnack = await prisma.category.create({
    data: { id: 'cat-cat-snack', name: '零食', icon: IMG, parentId: catCategory.id },
  });
  const catToy = await prisma.category.create({
    data: { id: 'cat-cat-toy', name: '玩具', icon: IMG, parentId: catCategory.id },
  });

  const fishFood = await prisma.category.create({
    data: { id: 'cat-fish-food', name: '鱼粮', icon: IMG, parentId: fishCategory.id },
  });
  const fishEquipment = await prisma.category.create({
    data: { id: 'cat-fish-equip', name: '器材', icon: IMG, parentId: fishCategory.id },
  });

  console.log('✔ 分类创建完成');

  // ==================== 5. 商品 ====================
  const products = await Promise.all([
    // 狗狗 - 主粮
    prisma.product.create({
      data: {
        id: 'prod-1', name: '皇家幼犬狗粮 2kg', price: 128.0,
        images: [IMG], description: '适合2-12个月幼犬，添加DHA促进脑部发育',
        merchantId: merchant1.id, categoryId: dogFood.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-2', name: '全价冻干生骨肉 500g', price: 89.0,
        images: [IMG], description: '高蛋白低敏配方，适合全年龄段犬只',
        merchantId: merchant1.id, categoryId: dogFood.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-3', name: '无谷物三文鱼犬粮 3kg', price: 199.0,
        images: [IMG], description: '深海三文鱼配方，美毛护肤',
        merchantId: merchant1.id, categoryId: dogFood.id,
      },
    }),
    // 狗狗 - 零食
    prisma.product.create({
      data: {
        id: 'prod-4', name: '冻干鸡肉粒 200g', price: 39.9,
        images: [IMG], description: '纯鸡肉冻干，训练奖励必备',
        merchantId: merchant1.id, categoryId: dogSnack.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-5', name: '牛皮磨牙棒 5支装', price: 25.0,
        images: [IMG], description: '天然牛皮，清洁牙齿消耗精力',
        merchantId: merchant1.id, categoryId: dogSnack.id,
      },
    }),
    // 狗狗 - 玩具
    prisma.product.create({
      data: {
        id: 'prod-6', name: '耐咬飞盘 橡胶材质', price: 35.0,
        images: [IMG], description: '食品级橡胶，户外互动好帮手',
        merchantId: merchant1.id, categoryId: dogToy.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-7', name: '发声网球 3只装', price: 19.9,
        images: [IMG], description: '按压发声，吸引狗狗注意力',
        merchantId: merchant1.id, categoryId: dogToy.id,
      },
    }),
    // 猫咪 - 主粮
    prisma.product.create({
      data: {
        id: 'prod-8', name: '渴望全猫期猫粮 1.8kg', price: 258.0,
        images: [IMG], description: '85%动物成分，模拟自然饮食',
        merchantId: merchant2.id, categoryId: catFood.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-9', name: '生骨肉主食罐 80g×6', price: 72.0,
        images: [IMG], description: '鲜肉含量≥90%，补水又营养',
        merchantId: merchant2.id, categoryId: catFood.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-10', name: '冻干双拼猫粮 2kg', price: 159.0,
        images: [IMG], description: '冻干+膨化双拼，挑嘴猫也爱吃',
        merchantId: merchant2.id, categoryId: catFood.id,
      },
    }),
    // 猫咪 - 零食
    prisma.product.create({
      data: {
        id: 'prod-11', name: '金枪鱼猫条 15支', price: 29.9,
        images: [IMG], description: '鲜鱼肉泥，补水互动神器',
        merchantId: merchant2.id, categoryId: catSnack.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-12', name: '猫薄荷饼干 100g', price: 18.0,
        images: [IMG], description: '天然猫薄荷，帮助排毛球',
        merchantId: merchant2.id, categoryId: catSnack.id,
      },
    }),
    // 猫咪 - 玩具
    prisma.product.create({
      data: {
        id: 'prod-13', name: '猫薄荷发声鱼 绿色', price: 22.0,
        images: [IMG], description: '内置猫薄荷+发声器，逗猫神器',
        merchantId: merchant2.id, categoryId: catToy.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-14', name: '电动逗猫球 自动滚动', price: 49.0,
        images: [IMG], description: '智能避障，自动变向，解放双手',
        merchantId: merchant2.id, categoryId: catToy.id,
      },
    }),
    // 水族 - 鱼粮
    prisma.product.create({
      data: {
        id: 'prod-15', name: '热带鱼增色饲料 500ml', price: 32.0,
        images: [IMG], description: '螺旋藻配方，增强体色',
        merchantId: merchant3.id, categoryId: fishFood.id,
      },
    }),
    // 水族 - 器材
    prisma.product.create({
      data: {
        id: 'prod-16', name: '小型静音气泵', price: 58.0,
        images: [IMG], description: '超静音设计，适合30-60cm鱼缸',
        merchantId: merchant3.id, categoryId: fishEquipment.id,
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod-17', name: 'LED鱼缸灯 变色', price: 45.0,
        images: [IMG], description: '七彩渐变，防水IP68',
        merchantId: merchant3.id, categoryId: fishEquipment.id,
      },
    }),
  ]);

  console.log(`✔ 商品创建完成，共 ${products.length} 件`);

  // ==================== 6. 轮播图 ====================
  await prisma.carousel.createMany({
    data: [
      { id: 'carousel-1', image: IMG, link: '/pages/product/detail?id=prod-1', sortOrder: 1 },
      { id: 'carousel-2', image: IMG, link: '/pages/product/detail?id=prod-8', sortOrder: 2 },
      { id: 'carousel-3', image: IMG, link: '/pages/product/detail?id=prod-13', sortOrder: 3 },
    ],
  });

  console.log('✔ 轮播图创建完成');

  // ==================== 7. 直播间 ====================
  await prisma.liveRoom.createMany({
    data: [
      { id: 'live-1', coverImage: IMG, title: '萌宠严选 · 今日爆款直降', merchantId: merchant1.id },
      { id: 'live-2', coverImage: IMG, title: '喵星人旗舰店 · 新品首发', merchantId: merchant2.id },
    ],
  });

  console.log('✔ 直播间创建完成');

  // ==================== 8. 图文贴 ====================
  await prisma.post.createMany({
    data: [
      {
        id: 'post-1',
        images: [IMG],
        content: '今日种草｜这款冻干生骨肉真的绝了！我家金毛吃了两周毛发亮了一个度，强推给各位铲屎官～',
        merchantId: merchant1.id,
      },
      {
        id: 'post-2',
        images: [IMG],
        content: '猫咪新玩具开箱！这个电动逗猫球我家主子玩了一下午都不停，终于解放双手了😭',
        merchantId: merchant2.id,
      },
      {
        id: 'post-3',
        images: [IMG],
        content: '新手入坑水族推荐｜一个40cm小缸+气泵+LED灯就能搞定，成本不到200块，太治愈了！',
        merchantId: merchant3.id,
      },
    ],
  });

  console.log('✔ 图文贴创建完成');

  // ==================== 9. 私信（会话数据） ====================
  await prisma.message.createMany({
    data: [
      // default-user 与 merchant-user-1 (萌宠严选) 的对话
      { id: 'msg-1', content: '你好，请问皇家幼犬粮有货吗？', senderId: defaultUser.id, receiverId: merchantUser1.id },
      { id: 'msg-2', content: '有的亲，今天下单明天就能发货哦～', senderId: merchantUser1.id, receiverId: defaultUser.id },
      { id: 'msg-3', content: '好的，那冻干生骨肉呢？', senderId: defaultUser.id, receiverId: merchantUser1.id },
      { id: 'msg-4', content: '也有货的，这款最近卖得特别好！', senderId: merchantUser1.id, receiverId: defaultUser.id },
      // default-user 与 merchant-user-2 (喵星人旗舰店) 的对话
      { id: 'msg-5', content: '猫条能单买一包试试吗？', senderId: defaultUser.id, receiverId: merchantUser2.id },
      { id: 'msg-6', content: '可以的亲，支持单包购买，还有满减活动哦', senderId: merchantUser2.id, receiverId: defaultUser.id },
    ],
  });

  console.log('✔ 私信创建完成');

  // ==================== 10. 系统通知 ====================
  await prisma.notification.createMany({
    data: [
      {
        id: 'notif-1', type: 'logistics', title: '物流更新',
        content: '您的订单已从深圳仓库发出，预计明天送达',
        userId: defaultUser.id,
      },
      {
        id: 'notif-2', type: 'coupon', title: '优惠提醒',
        content: '恭喜获得满199减30优惠券，快去使用吧！',
        userId: defaultUser.id,
      },
    ],
  });

  console.log('✔ 系统通知创建完成');

  // ==================== 11. 收货地址 ====================
  await prisma.address.createMany({
    data: [
      {
        id: 'addr-1', name: '张三', phone: '13800138001',
        address: '湖南省湘潭市雨湖区建设路88号 幸福小区3栋502',
        isDefault: true, userId: defaultUser.id,
      },
      {
        id: 'addr-2', name: '李四', phone: '13900139002',
        address: '广东省珠海市香洲区情侣中路128号 海景花园A座1801',
        isDefault: false, userId: defaultUser.id,
      },
    ],
  });

  console.log('✔ 收货地址创建完成');

  // ==================== 12. 购物车 ====================
  await prisma.cartItem.createMany({
    data: [
      { id: 'cart-1', quantity: 1, userId: defaultUser.id, productId: 'prod-1', merchantId: merchant1.id },
      { id: 'cart-2', quantity: 2, userId: defaultUser.id, productId: 'prod-4', merchantId: merchant1.id },
      { id: 'cart-3', quantity: 1, userId: defaultUser.id, productId: 'prod-8', merchantId: merchant2.id },
      { id: 'cart-4', quantity: 3, userId: defaultUser.id, productId: 'prod-11', merchantId: merchant2.id },
      { id: 'cart-5', quantity: 1, userId: defaultUser.id, productId: 'prod-16', merchantId: merchant3.id },
    ],
  });

  console.log('✔ 购物车创建完成');

  // ==================== 13. 订单 + 订单商品 ====================
  const order1 = await prisma.order.create({
    data: {
      id: 'order-1',
      totalAmount: 218.0,
      status: 'shipped',
      userId: defaultUser.id,
      merchantId: merchant1.id,
    },
  });
  await prisma.orderItem.createMany({
    data: [
      { id: 'oi-1', orderId: order1.id, productId: 'prod-1', quantity: 1, price: 128.0 },
      { id: 'oi-2', orderId: order1.id, productId: 'prod-4', quantity: 2, price: 39.9 },
      { id: 'oi-3', orderId: order1.id, productId: 'prod-6', quantity: 1, price: 35.0 },
    ],
  });

  const order2 = await prisma.order.create({
    data: {
      id: 'order-2',
      totalAmount: 302.0,
      status: 'pending',
      userId: defaultUser.id,
      merchantId: merchant2.id,
    },
  });
  await prisma.orderItem.createMany({
    data: [
      { id: 'oi-4', orderId: order2.id, productId: 'prod-8', quantity: 1, price: 258.0 },
      { id: 'oi-5', orderId: order2.id, productId: 'prod-13', quantity: 2, price: 22.0 },
    ],
  });

  console.log('✔ 订单创建完成');

  // ==================== 14. 收藏 ====================
  await prisma.favorite.createMany({
    data: [
      { id: 'fav-1', userId: defaultUser.id, productId: 'prod-1' },
      { id: 'fav-2', userId: defaultUser.id, productId: 'prod-8' },
      { id: 'fav-3', userId: defaultUser.id, productId: 'prod-14' },
    ],
  });

  console.log('✔ 收藏创建完成');

  console.log('\n🎉 Seed 数据填充完毕！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
