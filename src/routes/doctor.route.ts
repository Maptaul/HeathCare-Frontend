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
        title: "My Schedules",
        url: `${prefix}/schedules`,
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
