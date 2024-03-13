//Layouts
import config from '../config/routes';
import { DefaultLayout, SidebarOnly, TwoSideBar } from '~/layouts';

//Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
// import Search from '~/pages/Search';
import Message from '~/pages/Message';
import Search from '~/layouts/components/Search';
import Matching from '~/pages/Matching';
import Call from '~/pages/Call';
import SettingPassword from '~/pages/SettingPassword';
import SettingProfile from '~/pages/SettingProfile';
import AdminSidebarOnly from '~/layouts/AdminSidebarOnly';
import A_ShowUser from '~/pages/A_ShowUser';
import A_ShowUserDetail from '~/pages/A_ShowUserDetail';
import A_ShowZodiacMessage from '~/pages/A_ShowZodiacMessage';
import A_CreateZodiacMessage from '~/pages/A_CreateZodiacMessage';
import A_ShowReport from '~/pages/A_ShowReport';
import A_ShowDetailReport from '~/pages/A_ShowDetailReport';
import A_ReadDetailZodiacMessage from '~/pages/A_CreateDetailZodiacMessage/A_ReadDetailZodiacMessage';

//public routes
const publicRoutes = [
    { path: config.home, component: Home },
    { path: config.call, component: Call, layout: DefaultLayout },
    { path: config.profile, component: Profile, layout: SidebarOnly },
    { path: config.search, component: Search, layout: null },
    { path: config.messages, component: Message, layout: DefaultLayout },
    { path: config.matching, component: Matching, layout: SidebarOnly },
    { path: config.settingProfile, component: SettingProfile, layout: TwoSideBar },
    { path: config.settingPassword, component: SettingPassword, layout: TwoSideBar },

    { path: config.adminShowUser, component: A_ShowUser, layout: AdminSidebarOnly },
    { path: config.adminShowDetailUser, component: A_ShowUserDetail, layout: AdminSidebarOnly },
    { path: config.adminShowMessage, component: A_ShowZodiacMessage, layout: AdminSidebarOnly },
    { path: config.adminCreateMessage, component: A_CreateZodiacMessage, layout: AdminSidebarOnly },
    { path: config.adminReadDetailMessage, component: A_ReadDetailZodiacMessage, layout: AdminSidebarOnly },
    { path: config.adminShowReport, component: A_ShowReport, layout: AdminSidebarOnly },
    { path: config.adminShowDetailReport, component: A_ShowDetailReport, layout: AdminSidebarOnly },
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
