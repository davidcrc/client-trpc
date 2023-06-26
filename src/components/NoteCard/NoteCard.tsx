"use client";

import React from "react";
import { trpc } from "../../utils/trpc";

interface NoteCradProps {
  note: {
    uuid: string;
    title: string;
    description: string;
    done: boolean
  };
}

const NoteCard = ({ note }: NoteCradProps) => {
  const utils = trpc.useContext()

  const { mutate: deleteMutation } = trpc.notes.delete.useMutation();
  const { mutate: toggleDoneMutation } = trpc.notes.toggleDone.useMutation();

  const handleDelete = () => {

    deleteMutation(note.uuid, {
      onSuccess: (data) => {
        if (data) {
          utils.notes.get.invalidate()
        }
      },
      onError(error) {
        console.log('Err delete', error)
      },
    });
  };

  const handleTogleDoneNote = () => {

    toggleDoneMutation(note.uuid, {
      onSuccess: (data) => {
        if (data) {
          // TODO: is better update cache I think
          utils.notes.get.invalidate()
        }
      },
      onError(error) {
        console.log('Err toggle done', error)
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">{note.title}</h1>
        <p>{note.description}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-red-400 rounded px-2 py-1" onClick={handleDelete} >Delete</button>
        <button className={`${note.done ? 'bg-green-400' : 'bg-red-300'} rounded px-2 py-1`} onClick={handleTogleDoneNote} >Done</button>
      </div>
    </div>
  );
};

export default NoteCard;
