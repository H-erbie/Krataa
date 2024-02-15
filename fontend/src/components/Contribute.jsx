import { ImageIcon, Plus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "./context";
import pdfIcon from '../assets/pdficon.png'
import imgIcon from '../assets/imgicon.png'
const Contribute = () => {
  const navigate = useNavigate();
  const { getCookie } = useGlobalContext();

  useEffect(() => {
    if (!getCookie) {
      navigate("/signin");
    }
  }, []);
  const [fileList, setfileList] = useState([]);
  const [isDroppable, setIsDroppable] = useState(false);
  const [isBookDroppable, setIsBookDroppable] = useState(false);
  const wrapperRef = useRef(null);
  const bookWrapperRef = useRef(null);
  const onDragEnter = (wrap) => {
    if (wrap == wrapperRef) {
      setIsDroppable(true);
    } 
    else{
      setIsBookDroppable(true);
      
    }
    wrap.current.classList.remove("opacity-50");
  };
  function getFileType(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    console.log('File type:', extension);
}
  const onDragOver = (event) => {
    event.preventDefault(); // To prevent default browser behavior
    const dataTransfer = event.dataTransfer;

    // Check if files are being dragged
    if (dataTransfer.files.length > 0) {
        console.log('Files detected!');
        getFileType(dataTransfer.files[0]); // Assuming single file at a time
    } else {
        console.log('No files detected.');
    }
  }

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
  const newFile = e.target.files[0]
  if(newFile){
    const updatedList = [...fileList, newFile]
    setfileList(updatedList)
    console.log(updatedList)
  }
}
  return (
    <main className="min-h-[100vh] pt-20 flex items-center  justify-center gap-y-10 flex-col">
      <p className="font-medium text-lg">Contribute to our collection below</p>
      <div className="flex gap-x-8">
        {" "}
        <div className="relative">
          <div
            
            className="container border-dashed p-3 rounded-md cursor-pointer  border border-gray-500 w-60 h-60 flex mx-auto justify-center"
          >
            {isBookDroppable ? "Drop book here" : "Drag book here"}
          </div>
          <div className="flex gap-x-3">
            <input ref={bookWrapperRef}
            onDragEnter={() => onDragEnter(bookWrapperRef)}
            onDragOver={onDragOver}
            onDragLeave={() => onDragLeave(bookWrapperRef)}
            onDrop={() => onDrop(bookWrapperRef)} type="file" name="file" className="w-full opacity-0 h-full absolute top-0 left-0 overflow-hidden" onChange={onFileDrop}/>
          </div>
        </div>
        <div className="">
          <div
            ref={wrapperRef}
            onDrop={() => onDrop(wrapperRef)}
            onDragEnter={() => onDragEnter(wrapperRef)}
            onDragLeave={() => onDragLeave(wrapperRef)}
            className="container border-dashed p-3 rounded-md cursor-pointer  border border-gray-500 w-60 h-60 flex mx-auto justify-center"
          >
            {isDroppable
              ? "Drop book cover image here"
              : "Drag book cover image here"}
          </div>
          <div className="flex gap-x-3">
            <label>Select file from PC</label>
            <input type="file" name="file" className="w-20 overflow-hidden" />
          </div>
        </div>
      </div>
      {
        fileList.length > 0 && <div>
          <p className="">Ready to upload</p>
          {
            fileList.map((item, index)=> (
              <div className="" key={index}>
                <img className="w-10 h-10" src={item.type.split('/')[1] == 'jpeg' || item.type.split('/')[1] == 'png' ? imgIcon : pdfIcon}  alt="" />
              </div>
            ))
          }
        </div>
      }
    </main>
  );
};

Contribute.propt
export default Contribute;
