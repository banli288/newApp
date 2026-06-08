# Pet API 接口文档

> 宠物商城后端 API，基于 NestJS + Prisma + MySQL，共 **19 个模块、91 个接口**。
>
> 启动后访问 `http://localhost:3000/api` 查看 Swagger 在线文档。

---

## 目录

- [一、首页模块（14个接口）](#一首页模块)
- [二、首页-优惠券（1个接口）](#二首页-优惠券)
- [三、首页-排行榜（3个接口）](#三首页-排行榜)
- [四、首页-推荐（1个接口）](#四首页-推荐)
- [五、搜索模块（4个接口）](#五搜索模块)
- [六、购物车模块（4个接口）](#六购物车模块)
- [七、我的-基础（18个接口）](#七我的-基础)
- [八、我的-优惠券（3个接口）](#八我的-优惠券)
- [九、我的-消费看板（3个接口）](#九我的-消费看板)
- [十、我的-物流（1个接口）](#十我的-物流)
- [十一、签到积分（5个接口）](#十一签到积分)
- [十二、售后服务（4个接口）](#十二售后服务)
- [十三、浏览记录（3个接口）](#十三浏览记录)
- [十四、消息模块（8个接口）](#十四消息模块)
- [十五、后台-商品管理（7个接口）](#十五后台-商品管理)
- [十六、后台-分类管理（3个接口）](#十六后台-分类管理)
- [十七、后台-轮播图管理（3个接口）](#十七后台-轮播图管理)
- [十八、后台-直播间管理（3个接口）](#十八后台-直播间管理)
- [十九、后台-帖子管理（3个接口）](#十九后台-帖子管理)

---

## 一、首页模块

> 文件：`src/home/home.controller.ts` | 服务：`src/home/home.service.ts`

首页是用户打开 App 后看到的第一个页面，包含轮播图、商品列表、分类导航、直播间、帖子社区等核心内容。

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/home/carousels` | 获取轮播图列表 | 首页顶部轮播区域，按 sortOrder 排序 |
| GET | `/home/products` | 获取商品列表 | 首页商品瀑布流/网格，支持 **排序+筛选+分页** |
| GET | `/home/categories` | 获取分类树 | 首页分类导航，返回一级分类含 children 二级分类 |
| GET | `/home/categories/:id/products` | 分类商品列表 | 点击分类后展示该分类下的商品 |
| GET | `/home/merchants/:id/products` | 店铺商品列表 | 店铺详情页内的商品列表 |
| GET | `/home/live-rooms` | 获取直播间列表 | 首页直播入口卡片 |
| GET | `/home/posts` | 获取帖子列表 | 首页社区/动态模块，含点赞数和评论数 |
| POST | `/home/posts/:id/like` | 点赞/取消赞 | 帖子详情页点赞按钮，幂等切换 |
| GET | `/home/posts/:id/comments` | 帖子评论列表 | 帖子详情页评论区 |
| POST | `/home/posts/:id/comments` | 发表评论 | 帖子详情页评论输入 |
| GET | `/home/products/:id` | 商品详情 | 商品详情页，含规格/收藏数/评价数/销量/浏览量（自动+1） |
| GET | `/home/products/:id/reviews` | 商品评价列表 | 商品详情页评价 Tab |
| GET | `/home/products/:id/rating` | 评分统计 | 商品详情页评分雷达图，返回平均分+各星级分布 |
| GET | `/home/merchants/:id` | 店铺详情 | 店铺主页，含商品列表和粉丝数 |

### 商品列表筛选参数

| 参数 | 类型 | 说明 |
|------|------|------|
| sort | string | 排序：price_asc / price_desc / sales_desc / rating_desc / created_desc |
| categoryId | string | 分类ID筛选 |
| brand | string | 品牌筛选 |
| minRating | number | 最低评分 |
| minPrice | number | 最低价格 |
| maxPrice | number | 最高价格 |
| page / limit | number | 分页 |

---

## 二、首页-优惠券

> 文件：`src/home/home-coupon.controller.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/home/coupons` | 可领取的优惠券列表 | 首页优惠券领取区域，展示未过期的优惠券 |

---

## 三、首页-排行榜

> 文件：`src/home/home-ranking.controller.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/home/rankings/best-sellers` | 热销榜 | 按销量降序，`?limit=10` |
| GET | `/home/rankings/top-rated` | 好评榜 | 按评分降序，`?limit=10` |
| GET | `/home/rankings/new-arrivals` | 新品榜 | 按上架时间降序，`?limit=10` |

---

## 四、首页-推荐

> 文件：`src/home/home-recommend.controller.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/home/recommend` | 猜你喜欢 | 基于浏览历史的分类偏好推荐，无记录时返回热销商品 |

---

## 五、搜索模块

> 文件：`src/search/search.controller.ts` | 服务：`src/search/search.service.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/search` | 商品搜索 | 关键词模糊匹配 + 排序 + 分类 + 品牌 + 评分 + 价格区间筛选 |
| GET | `/search/shops` | 搜索店铺 | 按店铺名称/描述模糊搜索 |
| GET | `/search/brands` | 品牌列表 | 返回所有品牌名称（去重），用于筛选面板 |
| GET | `/search/hot` | 热门搜索词 | 搜索页"热门搜索"展示区域 |

---

## 六、购物车模块

> 文件：`src/cart/cart.controller.ts` | 服务：`src/cart/cart.service.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/cart` | 购物车列表 | 按商家分组展示，含商品详情 |
| POST | `/cart` | 加入购物车 | 同一商品自动累加数量 |
| PATCH | `/cart/:id` | 修改数量 | 步进器调整数量 |
| DELETE | `/cart/:id` | 移出购物车 | 滑动删除 |

---

## 七、我的-基础

> 文件：`src/user/user.controller.ts` | 服务：`src/user/user.service.ts`

用户中心核心功能，包含个人信息、地址、订单、收藏、关注、评价、余额。

### 用户信息

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/info` | 获取用户信息 | 个人中心页展示头像/昵称/等级/余额 |
| POST | `/user/balance/recharge` | 余额充值 | 充值页面 |

### 收货地址

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/addresses` | 地址列表 | 地址管理页，默认地址排首位 |
| POST | `/user/addresses` | 新增地址 | 新增地址页，含省市区选择器 |
| PATCH | `/user/addresses/:id` | 修改地址 | 编辑地址页 |
| DELETE | `/user/addresses/:id` | 删除地址 | 左滑删除或编辑页删除 |

### 订单管理

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/orders` | 订单列表 | 全部订单页，支持状态/时间/金额筛选 |
| GET | `/user/orders/:id` | 订单详情 | 订单详情页，含商品规格信息 |
| POST | `/user/orders` | 创建订单 | 结算页提交，余额支付，支持优惠券抵扣 |
| PATCH | `/user/orders/:id/cancel` | 取消订单 | 待付款订单取消，退余额+恢复库存 |
| PATCH | `/user/orders/:id/confirm` | 确认收货 | 已发货订单确认收货 |

**订单状态流转：** pending（待付款）→ paid（待发货）→ shipped（待收货）→ completed（已完成）/ cancelled（已取消）

**筛选参数：**

| 参数 | 说明 |
|------|------|
| status | pending / paid / shipped / completed / cancelled |
| startDate / endDate | 时间范围（ISO格式） |
| minAmount / maxAmount | 金额范围 |

### 收藏

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/favorites` | 收藏列表 | 收藏页，支持管理模式批量删除 |
| POST | `/user/favorites` | 添加收藏 | 商品详情页收藏按钮（幂等） |
| DELETE | `/user/favorites/:id` | 取消收藏 | 左滑删除或取消收藏按钮 |

### 关注店铺

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/follows` | 关注店铺列表 | 首页"关注"Tab |
| POST | `/user/follows` | 关注店铺 | 店铺详情页关注按钮（幂等） |
| DELETE | `/user/follows/:id` | 取消关注 | 取消关注按钮 |

### 评价

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| POST | `/user/reviews` | 发表评价 | 已完成订单的评价入口，1-5星评分 |

---

## 八、我的-优惠券

> 文件：`src/user/user-coupon.controller.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| POST | `/user/coupons/:id/claim` | 领取优惠券 | 首页优惠券领取按钮（幂等） |
| GET | `/user/coupons` | 我的优惠券 | 优惠券钱包，按状态筛选 unused/used/expired |
| GET | `/user/coupons/available` | 结算可用券 | 结算页选择优惠券，按订单金额筛选门槛 |

---

## 九、我的-消费看板

> 文件：`src/user/user-dashboard.controller.ts`

用于 ECharts 等图表库的数据可视化练习。

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/dashboard/summary` | 消费概览 | 数字卡片：累计消费/订单数/客单价/收藏数 |
| GET | `/user/dashboard/monthly` | 月度趋势 | 折线图：近12个月消费金额和订单数 |
| GET | `/user/dashboard/categories` | 分类占比 | 饼图：各分类消费金额和百分比 |

---

## 十、我的-物流

> 文件：`src/user/user-logistics.controller.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/user/orders/:id/logistics` | 物流时间线 | 订单详情页物流 Tab，含快递单号/公司/事件列表 |

---

## 十一、签到积分

> 文件：`src/user/user-sign.controller.ts`

签到积分系统，连续签到积分递增，积分可兑换优惠券。

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| POST | `/user/sign` | 每日签到 | 签到按钮，连续签到积分递增（+5→+6→...→+11→+10） |
| GET | `/user/sign/calendar` | 签到日历 | 日历组件标记已签日期，`?year=2026&month=6` |
| GET | `/user/points` | 积分概览 | 积分余额 + 连续签到天数 + 最近记录 |
| GET | `/user/points/logs` | 积分明细 | 积分变动列表，`?type=earn_sign` 筛选 |
| POST | `/user/points/redeem/:couponId` | 积分兑换优惠券 | 积分商城兑换，所需积分 = 面值 × 10 |

---

## 十二、售后服务

> 文件：`src/user/user-after-sale.controller.ts`

支持仅退款和退货退款两种售后类型，带进度时间轴。

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| POST | `/user/after-sales` | 申请售后 | 多步骤表单：选类型→填原因→传凭证→提交 |
| GET | `/user/after-sales` | 售后列表 | 我的售后页，按状态 Tab 切换 |
| GET | `/user/after-sales/:id` | 售后详情 | 售后详情页，含进度时间轴（van-steps） |
| PATCH | `/user/after-sales/:id/return` | 提交退货物流 | 退货退款审核通过后填写快递信息 |

**售后状态流转：**
- 仅退款：pending → approved → 自动退款 → completed
- 退货退款：pending → approved → returning → 确认退货 → 退款 → completed

---

## 十三、浏览记录

> 文件：`src/user/user-view-history.controller.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| POST | `/user/view-history/:productId` | 记录浏览 | 进入商品详情时调用，upsert 去重 |
| GET | `/user/view-history` | 浏览历史 | 浏览历史页，支持左滑删除 |
| DELETE | `/user/view-history/:id` | 删除记录 | 左滑删除交互 |

---

## 十四、消息模块

> 文件：`src/message/message.controller.ts` | 服务：`src/message/message.service.ts`

| 方法 | 路由 | 说明 | 用途 |
|------|------|------|------|
| GET | `/message/list` | 会话列表 | 消息中心页，按商家分组，含未读数 |
| GET | `/message/notifications` | 通知列表 | 系统通知 Tab，含 isRead 状态 |
| GET | `/message/unread-count` | 未读数量 | Tab 角标，返回 { messageCount, notificationCount } |
| PATCH | `/message/:id/read` | 标记消息已读 | 打开会话时标记 |
| PATCH | `/message/notifications/:id/read` | 标记通知已读 | 点击通知时标记 |
| PATCH | `/message/notifications/read-all` | 全部标记已读 | "一键已读"按钮 |
| DELETE | `/message/conversations/:merchantId` | 删除会话 | 左滑删除会话 |
| POST | `/message` | 发送消息 | 聊天页发送文字消息 |

---

## 十五、后台-商品管理

> 文件：`src/admin/admin-product.controller.ts`

| 方法 | 路由 | 说明 |
|------|------|------|
| POST | `/admin/products` | 创建商品 |
| PATCH | `/admin/products/:id` | 更新商品 |
| DELETE | `/admin/products/:id` | 删除商品 |
| GET | `/admin/products/:id/specs` | 查询商品规格列表 |
| POST | `/admin/products/specs` | 创建规格 |
| PATCH | `/admin/products/specs/:id` | 更新规格 |
| DELETE | `/admin/products/specs/:id` | 删除规格 |

---

## 十六、后台-分类管理

> 文件：`src/admin/admin-category.controller.ts`

| 方法 | 路由 | 说明 |
|------|------|------|
| POST | `/admin/categories` | 创建分类（支持父子层级） |
| PATCH | `/admin/categories/:id` | 更新分类 |
| DELETE | `/admin/categories/:id` | 删除分类 |

---

## 十七、后台-轮播图管理

> 文件：`src/admin/admin-carousel.controller.ts`

| 方法 | 路由 | 说明 |
|------|------|------|
| POST | `/admin/carousels` | 创建轮播图 |
| PATCH | `/admin/carousels/:id` | 更新轮播图 |
| DELETE | `/admin/carousels/:id` | 删除轮播图 |

---

## 十八、后台-直播间管理

> 文件：`src/admin/admin-liveroom.controller.ts`

| 方法 | 路由 | 说明 |
|------|------|------|
| POST | `/admin/live-rooms` | 创建直播间 |
| PATCH | `/admin/live-rooms/:id` | 更新直播间 |
| DELETE | `/admin/live-rooms/:id` | 删除直播间 |

---

## 十九、后台-帖子管理

> 文件：`src/admin/admin-post.controller.ts`

| 方法 | 路由 | 说明 |
|------|------|------|
| POST | `/admin/posts` | 创建帖子 |
| PATCH | `/admin/posts/:id` | 更新帖子 |
| DELETE | `/admin/posts/:id` | 删除帖子 |

---

## 数据模型

### 核心模型关系图

```
User ──┬── Order ──── OrderItem ──── Product ──── ProductSpec
       │      │                          │
       │      ├── Review                 ├── Category
       │      ├── AfterSale ── AfterSaleLog
       │      └── LogisticsEvent         ├── Favorite
       │                                 ├── Review
       ├── CartItem ── Product           └── ViewHistory
       ├── Favorite ── Product
       ├── Follow ── Merchant
       ├── UserCoupon ── Coupon
       ├── SignRecord
       ├── PointLog
       ├── ViewHistory ── Product
       ├── Message (sent/received)
       └── Notification
```

### 订单状态流转

```
pending（待付款）──→ paid（待发货）──→ shipped（待收货）──→ completed（已完成）
    │                                                     ↑
    └──→ cancelled（已取消）                                │
                                                          │
    AfterSale: refund ──→ 仅退款（paid状态可申请）           │
    AfterSale: return_refund ──→ 退货退款（completed状态可申请）
```

### 售后状态流转

```
pending（待审核）──→ approved（已通过）──→ returning（退货中）──→ completed（已完成）
                └──→ rejected（已拒绝）
```

### 积分规则

| 行为 | 积分变动 |
|------|---------|
| 签到第1天 | +5 |
| 签到第2天 | +6 |
| 签到第3天 | +7 |
| ... | 递增 |
| 签到第7天 | +11 |
| 第8天起 | +10/天 |
| 断签 | 连续天数归零 |
| 兑换优惠券 | -（面值×10） |

### 分页响应格式

所有分页接口统一返回：

```json
{
  "items": [],
  "total": 100,
  "page": 1,
  "limit": 10
}
```
