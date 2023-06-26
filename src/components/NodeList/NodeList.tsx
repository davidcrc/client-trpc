"use client";

import React from "react";
import { trpc } from "../../utils/trpc";

const NodeList = () => {
  const notes = trpc.notes.get.useQuery();

  return <div>{JSON.stringify(notes.data)}</div>;
};

export default NodeList;
