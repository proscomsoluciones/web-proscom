"use client";

import React, { useState, useEffect } from "react";

export const CurrentYear: React.FC = () => {
  const [year, setYear] = useState("2026");

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setYear(new Date().getFullYear().toString());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return <>{year}</>;
};
