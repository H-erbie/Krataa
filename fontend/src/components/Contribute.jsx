import { Plus } from "lucide-react";
import React from "react";

const Contribute = () => {
  return (
    <main className="min-h-[100vh] pt-20 flex items-center justify-center gap-y-10 flex-col">
      <p className="font-medium text-lg">Contribute to our collection below</p>
      <div className="container border-dashed p-3 rounded-md cursor-pointer  border border-gray-500 w-60 h-60 flex mx-auto justify-center">
        <p className="flex items-center mx-auto w-max text-gray-400 text-center">
          Drag file(s) here
          <Plus />
        </p>
      </div>
      <div className="flex gap-x-3">
      <label>Select file from PC</label>
      <input type="file" name="file" className="w-20 overflow-hidden"/>
      </div>
    </main>
  );
};

export default Contribute;
