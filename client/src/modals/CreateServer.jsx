import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";

import { useState } from "react";
import {
  serverFail,
  serverSuccess,
  setIsLoading,
  setModalState,
} from "../features/serverSlice";
import CreateButton from "../components/Utils/CreateButton";
import InputField from "../components/Utils/InputField";
import { axiosAuth } from "../api/axios";
import { handleFileChange } from "../util/handleFileChange";

const CreateServer = () => {
  const { modalIsOpen, error, isLoading } = useSelector(
    (state) => state.server
  );

  const [banner, setBanner] = useState("");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const filePickerForBanner = useRef(null);
  const filePickerForIcon = useRef(null);
  const dispatch = useDispatch();

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(setIsLoading(true));
    try {
      await axiosAuth.post("/servers/create", {
        banner,
        icon,
        title,
        description,
      });

      dispatch(serverSuccess());
      dispatch(setModalState(false));
      setBanner("");
      setIcon("");
      setTitle("");
      setDescription("");
      window.location.reload();
    } catch (error) {
      dispatch(serverFail(error.response.data));
    }
  };

  return (
    modalIsOpen && (
      <div className="bg-black h-screen w-screen bg-opacity-50 fixed inset-0 z-50">
        <div className="fixed inset-0 h-screen w-screen z-50 bg-white sm:h-max py-8 sm:min-h-[30rem] sm:m-auto sm:w-[35rem] rounded-md">
          <CloseOutlinedIcon
            className=" text-gray-500 transition-colors duration-300 hover:text-gray-700 cursor-pointer text-3xl absolute right-5 top-5"
            onClick={() => dispatch(setModalState(false))}
          />
          <form
            className="mx-5 m-auto rounded-md flex flex-col justify-center h-full"
            onSubmit={(e) => handleOnClick(e)}
          >
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-center">
                Create a new server
              </h1>
              <p className="text-xs text-[#4F5660] text-center">
                Give your new server a personality with a name and an icon. You
                can alsways chane this later.
              </p>
            </div>
            {banner ? (
              <div className="relative">
                <CloseOutlinedIcon
                  className="text-5xl p-2 m-auto rounded-full bg-gray-200 absolute inset-0 cursor-pointer hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => setBanner("")}
                />
                <img src={banner} alt="Banner" className="h-36 w-full" />
              </div>
            ) : (
              <div className="h-36 w-full bg-gray-300 relative">
                <CameraAltOutlined
                  className="text-6xl p-2 m-auto rounded-full bg-gray-200 absolute inset-0 cursor-pointer hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => filePickerForBanner.current.click()}
                />
                <input
                  type="file"
                  className="hidden"
                  ref={filePickerForBanner}
                  onChange={(e) => handleFileChange(e, setBanner)}
                  accept="image/png, image/jpeg"
                />
              </div>
            )}
            {icon ? (
              <div
                className="h-16 w-16 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors duration-300 relative -mt-8 ml-5 cursor-pointer group"
                onClick={() => setIcon("")}
              >
                <CloseOutlinedIcon className="text-3xl m-auto rounded-full absolute inset-0 transition-all scale-0 duration-200 group-hover:scale-100" />
                <img
                  src={icon}
                  alt="Icon"
                  className="h-full w-full rounded-full"
                />
              </div>
            ) : (
              <div
                className="h-16 w-16 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors duration-300 relative -mt-10 ml-5 cursor-pointer"
                onClick={() => filePickerForIcon.current.click()}
              >
                <CameraAltOutlined className="text-5xl p-2 m-auto rounded-full absolute inset-0 transition-colors duration-300" />
                <input
                  type="file"
                  className="hidden"
                  ref={filePickerForIcon}
                  onChange={(e) => handleFileChange(e, setIcon)}
                  accept="image/png, image/jpeg"
                />
              </div>
            )}
            <div className="px-2 mt-2">
              <div className="space-y-2">
                <InputField
                  type="text"
                  label="Title"
                  inputClassName="bg-[#E3E5E8] text-black"
                  value={title}
                  setValue={setTitle}
                  minLength={3}
                  maxLength={255}
                  error={error?.includes("title") ? true : false}
                  errorMsg={error}
                />
                <InputField
                  type="text"
                  label="description"
                  inputClassName="bg-[#E3E5E8] text-black"
                  value={description}
                  setValue={setDescription}
                  minLength={15}
                  maxLength={1000}
                  error={error?.includes("description") ? true : false}
                  errorMsg={error}
                  multiline={true}
                  rows={5}
                />
              </div>
              <CreateButton
                text="Create Server"
                isLoading={isLoading}
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
