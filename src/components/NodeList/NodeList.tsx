"use client";

import React from "react";
import { trpc } from "../../utils/trpc";
import { NoteCard  } from '../../components'

const NodeList = () => {
  const {data, isLoading, isError, error} = trpc.notes.get.useQuery();

  
  if(isLoading){
    return <div> Loading...</div>
  }
  
  if(isError){
    return <div> Error: {error.message}</div>
  }

  if(!isLoading && !data.length){
    return <div> There is no notes, please add some notes :D</div>
  }

  return <>
  {
    data.map((note: any, index: number) => {
      return <NoteCard key={index} note={note} />
    })
  }
  </>
};

export default NodeList;
