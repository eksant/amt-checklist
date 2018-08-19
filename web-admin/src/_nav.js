export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Master Data',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Mobil Tangki',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      title: true,
      name: 'Checking',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Shipment',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Report',
    },
    {
      name: 'Checklist Shipment',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
  ],
};
