import { Trash, X, Loader } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "./context";
import pdfIcon from "../assets/pdficon.png";
import imgIcon from "../assets/imgicon.png";
const Contribute = () => {
  const navigate = useNavigate();
  const { getCookie } = useGlobalContext();

  useEffect(() => {
    if (!getCookie) {
      navigate("/signin");
    }
  }, []);
  const [fileList, setfileList] = useState([]);
  const [bookName, setBookName] = useState("");
  const [isUploading, setIsUploading] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [ImageList, setImageList] = useState([]);
  const [invalid, setInvalid] = useState({successful:false, color:'red'});
  const [message, setMessage] = useState("");
  const [isDroppable, setIsDroppable] = useState(false);
  const [isBookDroppable, setIsBookDroppable] = useState(false);
  const wrapperRef = useRef(null);
  const bookWrapperRef = useRef(null);

  const onDragEnter = (wrap) => {
    if (wrap == wrapperRef) {
      setIsDroppable(true);
    } else {
      setIsBookDroppable(true);
    }
  };

  const onDragLeave = (wrap) => {
    if (wrap == wrapperRef) {
      setIsDroppable(false);
    } else {
      setIsBookDroppable(false);
    }
    wrap.current.classList.remove("opacity-50");
  };
  const onDrop = (wrap) => {
    if (wrap == wrapperRef) {
      setIsDroppable(false);
    } else {
      setIsBookDroppable(false);
    }
    wrap.current.classList.remove("opacity-50");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    const fileType = newFile.type.split("/");
    setInvalid({...invalid, successful: false});

    if (fileType[1] !== "pdf") {
      setInvalid({...invalid, successful: true, color:'red'});
      setMessage("Invalid file. Try again");
    }
    if (fileList.length > 0) {
      setInvalid({...invalid, successful: true, color:'red'});
      setMessage("You can only upload a book at a time");
    }
    if (newFile && fileType[1] === "pdf" && fileList.length === 0) {
      const updatedList = [...fileList, newFile];
      setfileList(updatedList);
      console.log(updatedList);
    }
  };
  const onCoverImageDrop = (e) => {
    const newFile = e.target.files[0];
    const fileType = newFile.type.split("/");
    setInvalid({...invalid, successful: false});

    if (
      fileType[1] !== "png" &&
      fileType[1] !== "jpeg" &&
      fileType[1] !== "jpg"
    ) {
      setInvalid({...invalid, successful: true, color:'red'});
      setMessage("Invalid file. Try again");
      console.log(fileType[1]);
    }
    if (ImageList.length > 0) {
      setInvalid({...invalid, successful: true, color:'red'});
      setMessage("You can only upload a cover Image at a time");
    }
    if (
      newFile &&
      (fileType[1] === "png" || fileType[1] === "jpeg") &&
      ImageList.length === 0
    ) {
      const updatedList = [...ImageList, newFile];
      setImageList(updatedList);
      console.log(updatedList);
    }
  };

  const deleteDroppedFile = (fileIndex) => {
    const updatedFileList = fileList.filter(
      (file, index) => index !== fileIndex
    );
    setfileList(updatedFileList);
  };
  const deleteCoverImg = (fileIndex) => {
    const updatedFileList = ImageList.filter(
      (file, index) => index !== fileIndex
    );
    setImageList(updatedFileList);
  };

  const uploadDocs = async (e) => {
    e.preventDefault()
    setIsUploading(true);
    const formData = new FormData()
    formData.append('img', ImageList[0])
    formData.append('pdf', fileList[0])
    formData.append('name', bookName)
    formData.append('author', author)
    formData.append('genre', genre)
    try {
      console.log(fileList[0])
      const res = await fetch("http://localhost:3001/api/books", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      if (res.ok) {

        console.log(await res.json());
        setIsUploading(false);
        setInvalid({...invalid, successful: true, color: 'black'});
        setMessage('Files Uploaded!😎');
        setAuthor('')
        setBookName('')
        setGenre('')
        setfileList([])
        setImageList([])
      }
      if (!res.ok) {
      setInvalid({...invalid, successful: true, color:'red'});
      const msg =   await res.json().msg
      setMessage(msg);
        setIsUploading(false);
      }
      setIsUploading(false);

    } catch (error) {
      setInvalid({...invalid, successful: true, color:'red'});
      setMessage(error.message);
      console.log(error);
      setIsUploading(false);
    }
  };
  return (
    <main className="min-h-[100vh] py-24 flex items-center  justify-center gap-y-10 flex-col">
      <p className="capitalize mt-5 text-2xl font-bold">
        Contribute to our collection below
      </p>
      <div className="grid grid-cols-2 gap-y-3 gap-x-3 items-center">
        <div className="flex flex-col gap-y-3">
          {" "}
          <label htmlFor="username">Book Name</label>
          <input
            className="border dark:bg-[#181B1F] dark:border-gray-300"
            type="text"
            placeholder="Grief Child"
            required
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label htmlFor="username">Book Author</label>

          <input
            className="border dark:bg-[#181B1F] dark:border-gray-300"
            type="text"
            placeholder="Lawerence Darmani"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3 col-span-2">
          <label htmlFor="username">Book Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="border p-2 rounded-md bg-transparent dark:bg-[#181B1F] dark:border-gray-300"
          >
            {" "}
            <option value=''>Select a genre</option>
            <option value='romance'>Romance</option>
            <option value='fiction'>Fiction</option>
            <option value='fantasy'>Fantasy</option>
            <option value='history'>History</option>
            <option value='action-adventure'>Action-Adventure</option>
            <option value='action'>Action</option>
            <option value='adventure'>Adventure</option>
            <option value='sci-fi'>Sci-fi</option>
            <option value='past questions'>Past Questions</option>
          </select>
        </div>
      </div>
      <div className="sm:flex-row flex flex-col gap-x-8">
        {" "}
        <div className="overflow-hidden">
          <div
            className={fileList.length > 0 ? "opacity-50 relative" : "relative"}
          >
            <div
              className={
                isBookDroppable
                  ? " bg-gray-200 dark:bg-gray-600 drag-box"
                  : "drag-box"
              }
            >
              {isBookDroppable
                ? "Now, take a deep breath and let go😤"
                : "Drag book here or click to select from your device🙂"}
            </div>
            <div className="">
              <input
                ref={bookWrapperRef}
                onDragEnter={() => onDragEnter(bookWrapperRef)}
                onDragLeave={() => onDragLeave(bookWrapperRef)}
                onDrop={() => onDrop(bookWrapperRef)}
                type="file"
                name="pdf"
                disabled={fileList.length > 0}
                className="w-full  disabled:cursor-not-allowed h-[280px] absolute -top-10 left-0 overflow-hidden"
                onChange={onFileDrop}
              />
            </div>
          </div>
          {fileList.length > 0 && (
            <div>
              {fileList.map((item, index) => {
               const charNum = item.name.split('')
               const imageName = item.name.slice(0,7)
               return <div
                  className="flex p-2 justify-evenly items-center bg-blue-50 dark:bg-slate-600 rounded-md"
                  key={index}
                >
                  <img
                    className="w-16 h-16"
                    src={
                      item.type.split("/")[1] == "jpeg" ||
                      item.type.split("/")[1] == "png"
                        ? imgIcon
                        : pdfIcon
                    }
                    alt=""
                  />
                  <div className="">
                    <p className="text-sm">{charNum.length > 7 ? `${imageName}...` : item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.size}Bytes</p>
                  </div>
                  <button
                    className="text-red-400"
                    onClick={() => deleteDroppedFile(index)}
                  >
                    <Trash />
                  </button>
                </div>
})}
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <div
            className={
              ImageList.length > 0 ? "opacity-50 relative" : "relative"
            }
          >
            <div
              className={
                isDroppable
                  ? " bg-gray-200 dark:bg-gray-600 drag-box"
                  : "drag-box"
              }
            >
              {isDroppable
                ? "Now, take a deep breath and let go😤"
                : "Drag cover image here or click to select from your device🙂"}
            </div>
            <div className="">
              <input
                ref={wrapperRef}
                onDrop={() => onDrop(wrapperRef)}
                onDragEnter={() => onDragEnter(wrapperRef)}
                onDragLeave={() => onDragLeave(wrapperRef)}
                type="file"
                disabled={ImageList.length > 0}
                name="img"
                className="w-full  disabled:cursor-not-allowed h-[280px] absolute -top-10 left-0overflow-hidden"
                onChange={onCoverImageDrop}
              />
            </div>
          </div>
          {ImageList.length > 0 && (
            <div>
              {ImageList.map((item, index) => {
                const charNum = item.name.split('')
                const imageName = item.name.slice(0,7)
                return <div
                  className="flex p-2 justify-evenly items-center bg-blue-50 dark:bg-slate-600 rounded-md"
                  key={index}
                >
                  <img
                    className="w-16 h-16"
                    src={
                      item.type.split("/")[1] == "jpeg" ||
                      item.type.split("/")[1] == "png"
                        ? imgIcon
                        : pdfIcon
                    }
                    alt=""
                  />
                  <div className="">
                    <p className="text-sm">{charNum.length > 7 ? `${imageName}...` : item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.size}Bytes</p>
                  </div>
                  <button
                    className="text-red-400"
                    onClick={() => deleteCoverImg(index)}
                  >
                    <Trash />
                  </button>
                </div>
})}
            </div>
          )}
        </div>
      </div>
      <div className={invalid.successful ? `bg-${invalid.color} fixed top-24 transition-all  text-white p-5 rounded-lg right-4` : `bg-${invalid.color}-400 fixed top-24 transition-all -right-[100VW] text-white p-5 rounded-lg`}>
        <button
          className="absolute top-1 right-1"
          onClick={() => setInvalid({...invalid, successful: false})}
        >
          <X />
        </button>
        <p>{message}</p>
      </div>
      <button
      // type="submit"
        onClick={uploadDocs}
        disabled={fileList.length === 0 || ImageList.length === 0 || bookName == '' || author == ''|| genre == ''}
        className="disabled:opacity-50 flex gap-x-1 disabled:cursor-not-allowed rounded-md border px-4 py-2"
      >
        {isUploading ? (
          <>
            <Loader className="animate-spin" /> "upload docs🚀"
          </>
        ) : (
          "upload docs🚀"
        )}
      </button>
    </main>
  );
};

Contribute.propt;
export default Contribute;
