"use client";

import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const NoteForm = () => {
  const [note, setNote] = useState({ title: "", description: "" });

  const addNote = trpc.notes.create.useMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("ee", note);

    addNote.mutate(note, {
      onSuccess: () => {
        console.log("success saved");
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
          Save
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
