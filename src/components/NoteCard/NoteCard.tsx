"use client";

import React from "react";
import { trpc } from "../../utils/trpc";

interface NoteCradProps {
  note: {
    uuid: string;
    title: string;
    description: string;
  };
}

const NoteCard = ({ note }: NoteCradProps) => {
  const utils = trpc.useContext()

  const { mutate: deleteMutation } = trpc.notes.delete.useMutation();

  const handleDelete = () => {

    deleteMutation(note.uuid, {
      onSuccess: (data) => {
        if(data){
          utils.notes.get.invalidate()
        }
      },
      onError(error) {
        console.log('Err delete', error)
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">{note.title}</h1>
        <p>{note.description}</p>
      </div>
      <div className="gap-2">
        <button className="bg-red-400 rounded px-2 py-1" onClick={handleDelete} >Delete</button>
        <button className="bg-red-400 rounded px-2 py-1">Done</button>
      </div>
    </div>
  );
};

export default NoteCard;
