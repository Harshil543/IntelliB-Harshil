// src/data/sidebarMenu.json
export const menuItems = [
    {
      "title": "Dashboard",
      "path": "/"
    },
    {
      "title": "Profile",
      "path": "/profile"
    },
    {
      "title": "Settings",
      "children": [
        {
          "title": "Account",
          "path": "/settings/account"
        },
        {
          "title": "Privacy",
          "path": "/settings/privacy"
        }
      ]
    }
  ]
  