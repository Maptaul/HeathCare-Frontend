const prefix = "/patient";

export const patientRoutes = [
  {
    title: "Bookings",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Payment History",
        url: `${prefix}/payment-history`,
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
