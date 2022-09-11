import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";

import { useState } from "react";
import { setModalState } from "../features/serverSlice";
import { TextField } from "@mui/material";
import CreateButton from "../components/CreateButton";

const CreateServer = () => {
  const [banner, setBanner] = useState("");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { modalIsOpen } = useSelector((state) => state.server);

  const filePickerForBanner = useRef(null);
  const filePickerForIcon = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e, setValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Converting to base 64
      reader.onload = () => {
        setValue(reader.result);
      };
      reader.onerror = (err) => {
        console.log(err);
      };
    }
  };

  return (
    modalIsOpen && (
      <div className="bg-black h-screen w-screen bg-opacity-50 fixed inset-0 z-50">
        <div className="fixed inset-0 h-screen w-screen z-50 bg-[#202225] sm:h-[35rem] sm:m-auto sm:w-[35rem]">
          <div className="flex items-center justify-between px-3 pt-2 sm:p-4">
            <h1 className="text-white text-xl font-bold">
              Create a new server
            </h1>

            <CloseOutlinedIcon
              className=" text-gray-500 transition-colors duration-300 hover:text-gray-300 cursor-pointer text-3xl"
              onClick={() => dispatch(setModalState(false))}
            />
          </div>
          <form className="mx-5 sm:mx-auto min-w-[20rem] max-w-[30rem] h-max pb-4 bg-zinc-600 sm:bg-zinc-700 fixed inset-0 m-auto rounded-md">
            {banner ? (
              <div className="relative">
                <CloseOutlinedIcon
                  className="text-5xl p-2 m-auto rounded-full bg-gray-200 absolute inset-0 cursor-pointer hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => setBanner("")}
                />
                <img
                  src={banner}
                  alt="Banner"
                  className="h-36 w-full rounded-t-md"
                />
              </div>
            ) : (
              <div className="h-36 w-full bg-gray-300 relative rounded-t-md">
                <CameraAltOutlined
                  className="text-6xl p-2 m-auto rounded-full bg-gray-200 absolute inset-0 cursor-pointer hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => filePickerForBanner.current.click()}
                />
                <input
                  type="file"
                  className="hidden"
                  ref={filePickerForBanner}
                  onChange={(e) => handleChange(e, setBanner)}
                />
              </div>
            )}
            {icon ? (
              <div className="h-12 w-12 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors duration-300 relative -mt-8 ml-3">
                <CloseOutlinedIcon
                  className="text-3xl  m-auto rounded-full absolute inset-0 cursor-pointer transition-colors duration-300"
                  onClick={() => setIcon("")}
                />
                <img src={icon} alt="Icon" className="h-12 w-12 rounded-full" />
              </div>
            ) : (
              <div
                className="h-12 w-12 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors duration-300 relative -mt-8 ml-3"
                onClick={() => filePickerForIcon.current.click()}
              >
                <CameraAltOutlined className="text-4xl p-2 m-auto rounded-full absolute inset-0 cursor-pointer transition-colors duration-300" />
                <input
                  type="file"
                  className="hidden"
                  ref={filePickerForIcon}
                  onChange={(e) => handleChange(e, setIcon)}
                />
              </div>
            )}
            <div className="px-2 mt-2">
              <div className="space-y-2">
                <TextField
                  variant="standard"
                  label="Title"
                  fullWidth
                  inputProps={{
                    minLength: 3,
                    maxLength: 255,
                    className: "text-white",
                  }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <TextField
                  variant="standard"
                  label="Description"
                  minRows={3}
                  maxRows={5}
                  multiline={true}
                  fullWidth
                  inputProps={{
                    minLength: 3,
                    maxLength: 255,
                    className: "text-white",
                  }}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <CreateButton
                text="Create Server"
                isLoading={null}
                className="mt-4 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateServer;
