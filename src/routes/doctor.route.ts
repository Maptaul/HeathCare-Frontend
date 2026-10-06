const prefix = "/doctor";

export const doctorRoutes = [
  {
    title: "ScheduleController",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "create Schedule ",
        url: `${prefix}/create-schedule`,
      },
    ],
  },
  {
    title: "App setting",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
    ],
  },
];
