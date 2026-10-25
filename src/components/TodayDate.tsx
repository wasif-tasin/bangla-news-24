"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getDate() {
  return new Intl.DateTimeFormat("bn-BD", { dateStyle: "full" }).format(new Date());
}

export default function TodayDate() {
  const date = useSyncExternalStore(subscribe, getDate, () => "");

  return (
    <time suppressHydrationWarning dateTime={new Date().toISOString().slice(0, 10)}>
      {date}
    </time>
  );
}
