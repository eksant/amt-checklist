export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      title: true,
      name: "Management Data",
      wrapper: {
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Manage Users",
      url: "/theme/colors",
      icon: "fa fa-users"
    },
    {
      name: "Manage AMT",
      url: "/theme/colors",
      icon: "fa fa-truck"
    },
    {
      name: "Daily AMT Check",
      url: "/theme/colors",
      icon: "fa fa-check-square-o"
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Reporting"
    },
    {
      name: "AMT Checklist",
      url: "/theme/colors",
      icon: "fa fa-list-alt"
    }
  ]
};
