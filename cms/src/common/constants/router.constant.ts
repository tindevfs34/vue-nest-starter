/**
 * Router path constants
 */
export const ROUTER_PATH = {
  DASHBOARD: "/dashboard",
  DASHBOARD_SUPER_ADMIN: "/dashboard/super-admin",

  MEDIA_LIB: {
    LIST: "/media-lib",
    UPLOAD: "/media-lib/upload",
  },

  AFFILIATE_PLATFORM: {
    LIST: "/affiliate-platform",
  },

  PRODUCT: {
    LIST: "/product",
    ADD: "/product/add",
    EDIT: (id: string = ":id") => `/product/${id}`,
    CATEGORIES: "/product/categories",
    CATEGORIES_ADD: "/product/categories/add",
    CATEGORIES_EDIT: (id: string = ":id") => `/product/categories/${id}`,
    TYPES: "/affiliate-platform",
    DRAFT_EDIT: (id: string = ":id") => `/product/draft/${id}`,
  },

  POST: {
    LIST: "/post",
    ADD: "/post/add",
    EDIT: (id: string = ":id") => `/post/${id}`,
    CATEGORIES: "/post/categories",
    DRAFT_EDIT: (id: string = ":id") => `/post/draft/${id}`,
  },

  BLOG: {
    LIST: "/post",
    ADD: "/post/add",
    EDIT: (id: string = ":id") => `/post/${id}`,
    DRAFT_EDIT: (id: string = ":id") => `/post/draft/${id}`,
    TOPICS: "/post/categories",
  },

  TAGS: "/tags",

  ADMIN: "/settings/admin-list",

  ADMIN_USERS: "/admin/users",

  PERMISSION: "/settings/permission",

  ROLE: "/settings/role",

  PROFILE_SETTING: "/settings/profile",

  GENERAL_SETTING: "/settings/general",

  MAIL_SETTING: "/settings/mail",

  SECURITY_SETTING: "/settings/security",

  SEO_SETTING: "/settings/seo",

  SEO_REDIRECT: "/settings/seo/redirect",
  
  SEO_404_LOGS: "/settings/seo/404-logs",
} as const;

/**
 * Router name constants
 */
export const ROUTER_NAME = {
  DASHBOARD: "Dashboard",
  DASHBOARD_SUPER_ADMIN: "SuperAdminDashboard",
  MEDIA_LIB: {
    LIST: "MediaLib",
    UPLOAD: "MediaLibUpload",
  },

  AFFILIATE_PLATFORM: {
    LIST: "AffiliatePlatformList",
  },

  PRODUCT: {
    LIST: "ProductList",
    ADD: "ProductAdd",
    EDIT: "ProductEdit",
    CATEGORIES: "ProductCategories",
    CATEGORIES_ADD: "CategoryAdd",
    CATEGORIES_EDIT: "CategoryEdit",
    TYPES: "AffiliatePlatformList",
    TECHNICALS: "ProductTechnicals",
    DRAFT_EDIT: "ProductDraftEdit",
  },

  POST: {
    LIST: "PostList",
    ADD: "PostAdd",
    EDIT: "PostEdit",
    CATEGORIES: "PostCategories",
    DRAFT_EDIT: "PostDraftEdit",
  },

  BLOG: {
    LIST: "PostList",
    ADD: "PostAdd",
    EDIT: "PostEdit",
    TOPICS: "PostCategories",
    DRAFT_EDIT: "PostDraftEdit",
  },

  TAGS: "Tags",

  TESTIMONIALS: "Testimonials",

  CONTACT_REQUEST: {
    LIST: "ContactRequestList",
    EDIT: "ContactRequestEdit",
  },

  CONTRACT: {
    LIST: "ContractList",
    ADD: "ContractAdd",
    EDIT: "ContractEdit",
  },

  CUSTOMER: {
    LIST: "CustomerList",
    ADD: "CustomerAdd",
    EDIT: "CustomerEdit",
  },

  ADMIN: "Admin",

  ADMIN_USERS: "AdminUserManagement",

  PERMISSION: "Permission",

  ROLE: "Role",

  PROFILE_SETTING: "ProfileSetting",

  GENERAL_SETTING: "GeneralSetting",

  MAIL_SETTING: "MailSetting",

  SECURITY_SETTING: "SecuritySetting",

  SEO_SETTING: "SeoSetting",

  SEO_REDIRECT: "SeoRedirect",

  SEO_404_LOGS: "Seo404Logs",
} as const;
