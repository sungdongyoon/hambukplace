"use client";

import { Analytics } from "@vercel/analytics/next";

const AppAnalytics = () => {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem("analytics-disabled") === "true") {
          return null;
        }

        return event;
      }}
    />
  );
};

export default AppAnalytics;
