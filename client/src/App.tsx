import useAuth from "./hooks/useAuth";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import DiscordLogo from "./images/discord_logo.png";
import SidebarOption from "./components/home/SidebarOption";
import useLogout from "./hooks/useLogout";
import useAxiosAuth from "./hooks/useAxiosAuth";

import { ReactComponent as People } from "./images/people.svg";
import { ReactComponent as DiscordTextLogo } from "./images/discord_text_logo.svg";
import { ReactComponent as MenuIcon } from "./images/menu_icon.svg";
import { ReactComponent as DownloadIcon } from "./images/download_icon.svg";
import { ReactComponent as Aliens } from "./images/aliens.svg";
import { ReactComponent as Clouds } from "./images/clouds.svg";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOutsideAlerter from "./hooks/useOutsideAlerter";

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState<boolean>(false);

  const { auth, setAuth } = useAuth();

  const logout = useLogout();
  const axiosAuth = useAxiosAuth();
  const menuRef = useRef<any>(null);
  useOutsideAlerter(menuRef, setProfileMenuIsOpen);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      const { data } = await axiosAuth.get("/users/me", {
        signal: controller.signal,
      });

      isMounted &&
        setAuth &&
        setAuth((prev) => {
          return { ...prev, user: data };
        });
    };
    auth && auth.accessToken && getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (sidebarIsOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [sidebarIsOpen]);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div>
      <main className="bg-[#404EED] h-[45rem] xl:h-[40rem] w-screen relative overflow-x-hidden p-3">
        <Clouds className="absolute bottom-0 hidden lg:block z-10" />
        <People className="z-20 absolute bottom-0 w-[500px] h-[300px] -ml-[88px] md:hidden lg:block lg:w-[700px] lg:h-[400px]" />
        <Aliens className="z-20 absolute bottom-0 right-0 hidden md:block" />
        <nav className="flex items-center justify-between max-w-[70rem] mx-auto z-20">
          <Link to="/" className="z-20">
            <DiscordTextLogo fill="#fff" />
          </Link>
          <div className="hidden lg:flex lg:items-center lg:space-x-10 lg:text-white lg:font-bold z-20">
            <Link className="hover:underline" to="#">
              Download
            </Link>
            <Link className="hover:underline" to="#">
              Nitro
            </Link>
            <Link className="hover:underline" to="#">
              Discover
            </Link>
            <Link className="hover:underline" to="#">
              Safety
            </Link>
            <Link className="hover:underline" to="#">
              Support
            </Link>
            <Link className="hover:underline" to="#">
              Blog
            </Link>
            <Link className="hover:underline" to="#">
              Careers
            </Link>
          </div>
          <div className="flex items-center space-x-3 relative">
            {auth && auth.accessToken ? (
              <img
                src={
                  auth.user?.profilePic ? auth.user?.profilePic : DiscordLogo
                }
                alt="Profile"
                className="h-10 w-10 rounded-full bg-gray-600 cursor-pointer z-20"
                onClick={() => setProfileMenuIsOpen(true)}
              />
            ) : (
              <Link
                to="/login"
                className="py-2 hover:text-blue-700 hover:shadow-xl transition-all duration-300 text-sm px-3 rounded-full bg-white"
              >
                Login
              </Link>
            )}
            <MenuIcon
              className="text-white cursor-pointer lg:hidden"
              onClick={() => setSidebarIsOpen(true)}
            />
            {profileMenuIsOpen && (
              <menu
                className="absolute top-12 right-16 lg:right-4 py-1 w-[10rem] bg-[#23272A] rounded-sm z-20"
                ref={menuRef}
              >
                <h1
                  className="p-1.5 hover:bg-[#434b50] cursor-pointer text-red-500 flex items-center flex-wrap gap-x-2"
                  onClick={() => handleLogout()}
                >
                  <LogoutOutlined />
                  Sign out
                </h1>
              </menu>
            )}
          </div>
          {sidebarIsOpen && (
            <menu className="fixed h-screen inset-0 m-auto w-screen bg-black transition-all duration-200 bg-opacity-30 z-20">
              <div className="w-[330px] rounded-l-lg bg-white float-right sidebar-animation h-screen py-6 pl-6 pr-9 relative">
                <div className="flex items-center justify-between">
                  <DiscordTextLogo fill="#000" />
                  <CloseOutlined
                    className="text-lg cursor-pointer absolute right-6"
                    onClick={() => setSidebarIsOpen(false)}
                  />
                </div>
                <div className="border-[0.1px] my-6" />
                <div className="space-y-2 flex flex-col">
                  <SidebarOption text="Home" active={true} />
                  <SidebarOption text="Download" />
                  <SidebarOption text="Nitro" />
                  <SidebarOption text="Discover" />
                  <SidebarOption text="Support" />
                  <SidebarOption text="Blog" />
                  <SidebarOption text="Careers" />
                </div>
                <div className="flex items-center absolute bottom-5 space-x-3 bg-blue-500 py-2 px-3 cursor-pointer hover:bg-opacity-80 hover:shadow-2xl transition-all duration-300 rounded-full text-white w-max">
                  <DownloadIcon fill="#fff" />
                  <p>Download for {window.navigator.platform.split(" ")[0]}</p>
                </div>
              </div>
            </menu>
          )}
        </nav>
        <article className="h-[70%] flex flex-col justify-center md:w-[60%] lg:w-full lg:px-6 ">
          <div className="lg:text-center lg:max-w-[40rem] xl:max-w-[45rem] xl:mt-28 lg:mx-auto z-20">
            <h1 className="text-white font-black text-4xl sm:text-5xl uppercase lg:text-6xl xl:text-7xl">
              Imagine a place...
            </h1>
            <p className="text-sm font-light text-white sm:text-base lg:text-lg max-w-[25rem] sm:max-w-[30rem] lg:max-w-[40rem] lg:mt-5">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
          </div>
          <Link
            className="py-4 px-7 mt-6 rounded-full bg-[#23272A] hover:bg-[#36393F] hover:shadow-2xl transition-all duration-300 w-max text-lg font-bold text-white lg:mx-auto z-20"
            to={auth.accessToken ? `/me` : `/register`}
          >
            Open Discord in your browser
          </Link>
        </article>
      </main>
    </div>
  );
};

export default App;
