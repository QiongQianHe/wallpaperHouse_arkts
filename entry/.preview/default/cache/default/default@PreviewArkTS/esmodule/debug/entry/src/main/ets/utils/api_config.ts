// API接口路径配置
export const API = {
    // 认证相关
    AUTH: {
        LOGIN: '/api/sign/reg_login', // 登录/注册接口
    },
    // 壁纸相关
    WALLPAPER: {
        LIST: '/api/wallpaper/list',
        DETAIL: '/api/wallpaper/detail',
        SEARCH: '/api/wallpaper/search', // 搜索壁纸
    },
    // 分类相关
    CATEGORY: {
        LIST: '/api/category/list', // 分类列表
    },
    // 用户相关
    USER: {
        INFO: '/api/user/info',
        UPDATE: '/api/user/update', // 更新用户信息
    },
    // 收藏相关
    COLLECTION: {
        LIST: '/api/collection/list',
        ADD: '/api/collection/add',
        REMOVE: '/api/collection/remove', // 取消收藏
    },
};
