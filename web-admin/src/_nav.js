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
      groups: ['Superadmin', 'Admin'],
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
      groups: ['Superadmin'],
    },
    {
      name: 'Manage Users',
      url: '/users',
      icon: 'fa fa-users',
      groups: ['Superadmin', 'Admin'],
    },
    {
      name: 'Manage AMT',
      url: '/amts',
      icon: 'fa fa-truck',
      groups: ['Superadmin', 'Admin'],
    },
    {
      divider: true,
      name: 'Divider Approval',
      groups: ['Superadmin', 'Admin'],
    },
    {
      title: true,
      name: 'Approval AMT Checklist',
      groups: ['Superadmin', 'Admin'],
    },
    {
      name: "Daily AMT Check",
      url: "/theme/colors",
      icon: "fa fa-check-square-o",
      groups: ['Superadmin', 'Admin'],
    },
    {
      divider: true,
      name: 'Divider Reporting',
      groups: ['Superadmin', 'Admin'],
    },
    {
      title: true,
      name: 'Reporting',
      groups: ['Superadmin', 'Admin'],
    },
    {
      name: 'Daily Report',
      url: '/theme/colors',
      icon: 'fa fa-list-alt',
      groups: ['Superadmin', 'Admin'],
    },
  ],
}
