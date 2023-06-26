"use client";

import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const DEFAULT_NOTE = { title: "", description: "" };

const NoteForm = () => {
  const [note, setNote] = useState(DEFAULT_NOTE);

  const { mutate: addNoteMutation, isLoading } =
    trpc.notes.create.useMutation();
  const utils = trpc.useContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNoteMutation(note, {
      onSuccess: () => {
        setNote(DEFAULT_NOTE);

        // TODO: is better update cache I think
        utils.notes.get.invalidate();
      },
      onError: (error) => {
        console.log("handle err", error);
      },
    });
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div className="bg-zinc-900 p-10 rounded-md">
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          className="text-white bg-neutral-800 px-3 py-2 w-full block rounded-md"
          name="title"
          value={note.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="text-white bg-neutral-800 px-3 py-2 w-full block rounded-md"
          placeholder="description"
          value={note.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-3 py-2 rounded-md w-40"
        >
          {isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
