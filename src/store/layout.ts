import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
    layoutColor: 'light',
    layoutType: 'vertical',
    layoutWidth: 'fluid',
    menuPosition: 'scrollable',
    leftSideBarTheme: 'dark',
    leftSideBarType: 'default',
    showSidebarUserInfo: true,
    topbarTheme: 'dark',
    isOpenRightSideBar: false,
    pageTitle: { title: '', breadCrumbItems: [] },
};

const manageBodyClass = (cssClass: string, action = 'toggle') => {
    switch (action) {
        case 'add':
            if (document.body) document.body.classList.add(cssClass);
            break;
        case 'remove':
            if (document.body) document.body.classList.remove(cssClass);
            break;
        default:
            if (document.body) document.body.classList.toggle(cssClass);
            break;
    }

    return true;
};

const Layout = createSlice({
    name: 'Layout',
    initialState,
    reducers: {
        showRightSidebar: (state) => {
            manageBodyClass('right-bar-enabled', 'add');
            state.isOpenRightSideBar = true;
        },
        hideRightSidebar: (state) => {
            manageBodyClass('right-bar-enabled', 'remove');
            state.isOpenRightSideBar = false;
        },
        changeLayout: (state, action) => {
            state.layoutType = action.payload;
        },
        changeLayoutColor: (state, action) => {
            state.layoutColor = action.payload;
        },
        changeLayoutWidth: (state, action) => {
            state.layoutWidth = action.payload;
        },
        changeMenuPositions: (state, action) => {
            state.menuPosition = action.payload;
        },
        changeSidebarTheme: (state, action) => {
            state.leftSideBarTheme = action.payload;
        },
        changeSidebarType: (state, action) => {
            state.leftSideBarType = action.payload;
        },
        toggleSidebarUserInfo: (state, action) => {
            state.showSidebarUserInfo = action.payload;
        },
        changeTopbarTheme: (state, action) => {
            state.topbarTheme = action.payload;
        },
        changePageTitle: (state, action) => {
            state.pageTitle = action.payload;
        },
    },
});

export const {
    showRightSidebar,
    hideRightSidebar,
    changeLayout,
    changeLayoutColor,
    changeLayoutWidth,
    changeMenuPositions,
    changeSidebarTheme,
    changeSidebarType,
    toggleSidebarUserInfo,
    changeTopbarTheme,
    changePageTitle,
} = Layout.actions;
export default Layout.reducer;
