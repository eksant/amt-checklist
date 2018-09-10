export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Management Data',
      wrapper: {
        element: '', // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '', // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Manage Admins',
      url: '/admins',
      icon: 'fa fa-user-secret',
      group: 'Superadmin',
    },
    {
      name: 'Manage Users',
      url: '/users',
      icon: 'fa fa-users',
    },
    {
      name: 'Manage AMT',
      url: '/mobiltangkis',
      icon: 'fa fa-truck',
    },
    // {
    //   name: "Daily AMT Check",
    //   url: "/theme/colors",
    //   icon: "fa fa-check-square-o"
    // },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Reporting',
    },
    {
      name: 'AMT Checklist',
      url: '/theme/colors',
      icon: 'fa fa-list-alt',
    },
  ],
}
