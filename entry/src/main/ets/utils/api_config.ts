// API接口路径配置

export const API = {
  // 认证相关
  AUTH: {
    LOGIN: '/api/sign/reg_login',  // 登录/注册接口
  },
  
  // 壁纸相关
  WALLPAPER: {
    LIST: '/api/wallpaper/list',      // 壁纸列表
    DETAIL: '/api/wallpaper/detail',  // 壁纸详情
    SEARCH: '/api/wallpaper/search',  // 搜索壁纸
  },
  
  // 分类相关
  CATEGORY: {
    LIST: '/api/category/list',       // 分类列表
  },
  
  // 用户相关
  USER: {
    INFO: '/api/user/info',           // 用户信息
    UPDATE: '/api/user/update',       // 更新用户信息
  },
  
  // 收藏相关
  COLLECTION: {
    LIST: '/api/collection/list',     // 收藏列表
    ADD: '/api/collection/add',       // 添加收藏
    REMOVE: '/api/collection/remove', // 取消收藏
  },
}
