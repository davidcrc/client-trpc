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
    <div>
      <form className="flex flex-col gap-4 w-fit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          className="text-black"
          name="title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="text-black"
          placeholder="description"
          onChange={handleChange}
        />

        <button type="submit" className="bg-green-600 text-black">
          {isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
