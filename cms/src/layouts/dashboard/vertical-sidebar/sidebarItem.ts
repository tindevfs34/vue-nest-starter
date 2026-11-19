// -- Core Framework --
import type { Component } from "vue";

// -- Third-party Libraries --
import {
  ArticleIcon,
  BrandGoogleAnalyticsIcon,
  BuildingStoreIcon,
  DeviceLaptopIcon,
  LayoutDashboardIcon,
  PhotoIcon,
  SettingsIcon,
  TagIcon,
  UserShieldIcon,
} from "vue-tabler-icons";

// -- Constants --
import { ROUTER_PATH } from "@/common/constants";

export interface SidebarMenuItemType {
  header?: string;
  title?: string;
  icon?: Component;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: SidebarMenuItemType[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  subTitle?: string;
  superAdminOnly?: boolean;
  adminOnly?: boolean;
}

const sidebarItems: SidebarMenuItemType[] = [
  {
    header: "DASHBOARDS",
  },
  {
    title: "Thống kê",
    icon: LayoutDashboardIcon,
    to: ROUTER_PATH.DASHBOARD,
  },
  {
    header: "APPS & CONTENT",
  },
  {
    title: "Thư viện",
    icon: PhotoIcon,
    to: ROUTER_PATH.MEDIA_LIB.LIST,
  },
  {
    title: "Nền tảng Affiliate",
    icon: BrandGoogleAnalyticsIcon,
    to: ROUTER_PATH.AFFILIATE_PLATFORM.LIST,
  },
  {
    title: "Sản phẩm",
    icon: DeviceLaptopIcon,
    to: ROUTER_PATH.PRODUCT.LIST
  },
  {
    title: "Bài viết",
    icon: ArticleIcon,
    to: ROUTER_PATH.POST.LIST
  },
  {
    title: "Thẻ",
    icon: TagIcon,
    to: ROUTER_PATH.TAGS,
  },
  {
    header: "ADMINISTRATION",
  },
  {
    title: "Quản lý Users",
    icon: UserShieldIcon,
    to: ROUTER_PATH.ADMIN_USERS,
    adminOnly: true,
  },
  {
    title: "Cài đặt",
    icon: SettingsIcon,
    to: ROUTER_PATH.GENERAL_SETTING,
    adminOnly: true,
  },
];

export default sidebarItems;
