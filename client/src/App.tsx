import useAuth from "./hooks/useAuth";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import DiscordLogo from "./images/discord_logo.png";
import SidebarOption from "./components/home/SidebarOption";
import useLogout from "./hooks/useLogout";
import useAxiosAuth from "./hooks/useAxiosAuth";

import { ReactComponent as People } from "./images/people.svg";
import { ReactComponent as DiscordTextLogo } from "./images/discord_text_logo.svg";
import { ReactComponent as MenuIcon } from "./images/menu_icon.svg";
import { ReactComponent as DownloadIcon } from "./images/download_icon.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const { auth, setAuth } = useAuth();

  const logout = useLogout();
  const axiosAuth = useAxiosAuth();

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
    if (menuIsOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [menuIsOpen]);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div>
      <main className="bg-[#404EED] h-[45rem] w-screen relative overflow-x-hidden p-3">
        <nav className="flex items-center justify-between">
          <Link to="/">
            <DiscordTextLogo fill="#fff" />
          </Link>
          <div className="flex items-center space-x-3">
            {auth && auth.accessToken ? (
              <img
                src={
                  auth.user?.profilePic ? auth.user?.profilePic : DiscordLogo
                }
                alt="Profile"
                className="h-10 w-10 rounded-full bg-gray-600"
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
              className="text-white cursor-pointer"
              onClick={() => setMenuIsOpen(true)}
            />
          </div>
          {menuIsOpen && (
            <menu className="fixed h-screen inset-0 m-auto z-50 w-screen bg-black transition-all duration-200 bg-opacity-30">
              <div className="w-[330px] rounded-l-lg bg-white float-right sidebar-animation h-screen py-6 pl-6 pr-9 relative">
                <div className="flex items-center justify-between">
                  <DiscordTextLogo fill="#000" />
                  <CloseOutlined
                    className="text-lg cursor-pointer absolute right-6"
                    onClick={() => setMenuIsOpen(false)}
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
                  {auth.accessToken && (
                    <SidebarOption
                      text="Sign out"
                      onClick={() => handleLogout()}
                    />
                  )}
                </div>
                <div className="flex items-center absolute bottom-5 space-x-3 bg-blue-500 py-2 px-3 cursor-pointer hover:bg-opacity-80 hover:shadow-2xl transition-all duration-300 rounded-full text-white w-max">
                  <DownloadIcon fill="#fff" />
                  <p>Download for {window.navigator.platform.split(" ")[0]}</p>
                </div>
              </div>
            </menu>
          )}
        </nav>
        <article className="h-[70%] flex flex-col justify-center">
          <div>
            <h1 className="text-white font-black text-3xl uppercase">
              Imagine a place...
            </h1>
            <p className="text-sm font-light text-white">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
          </div>
          <Link
            className="py-4 px-7 mt-6 rounded-full bg-[#23272A] hover:bg-[#36393F] hover:shadow-2xl transition-all duration-300 w-max text-lg font-bold text-white"
            to={auth.accessToken ? `/me` : `/register`}
          >
            Open Discord in your browser
          </Link>
        </article>
        <People className="absolute bottom-0 w-[500px] h-[300px] -ml-[88px]" />
      </main>
    </div>
  );
};

export default App;
