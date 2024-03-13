const routes = {
    home: '/',
    call: '/api/call/:idConver/:id',
    profile: '/api/profile/:nickname',
    search: '/api/search',
    messages: '/api/messages',
    matching: '/api/matching',
    settingProfile: '/api/setting/editprofile',
    settingPassword: '/api/setting/changepassword',

    adminShowUser: '/api/adminShowUser',
    adminDelUser: '/api/adminDelUser',
    adminShowDetailUser: '/api/adminShowDetailUser/:id',
    adminShowMessage: '/api/adminShowMessage',
    adminCreateMessage: '/api/adminCreateMessage',
    adminReadDetailMessage: '/api/adminReadDetailMessage/:id',
    adminShowReport: '/api/adminShowReport',
    adminShowDetailReport: '/api/adminShowDetailReport/:id',
};

export default routes;
