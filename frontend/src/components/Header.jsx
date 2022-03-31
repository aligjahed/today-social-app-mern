import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileMenu } from "./components";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import profilePlaceHolde from "../assets/images/profile-picture-placeholder.png";

const Header = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState();

  const navigate = useNavigate();

  // Importing user from redux state
  const { user } = useSelector((state) => state.auth);

  // Convert user to json
  const currentUser = JSON.parse(user);

  const changePage = (e) => {
    if (e.target.id !== currentPage && e.target.id !== "home") {
      setCurrentPage(e.target.id);
      navigate(`/${e.target.id}`);
    } else if (e.target.id === "home") {
      setCurrentPage("home");
      navigate("/");
    }
  };

  useEffect(() => {
    user && setProfilePic(currentUser.profilePic);
  }, [user]);

  return (
    <header className="flex justify-between items-center px-[18px] py-[18px] lg:px-[80px] lg:py-[40px] shadow-lg z-10">
      <h1
        className="logo text-[18px] lg:text-[36px] cursor-pointer"
        id="logo"
        onClick={() => {
          setCurrentPage("home");
          navigate("/");
        }}
      >
        TO<span className="text-main_blue">DAY</span>
      </h1>
      <nav className="hidden lg:flex  text-[24px] font-[500] ">
        <ul className="flex space-x-[65px]">
          <li
            className={
              currentPage === "home"
                ? "text-main_blue navButtons"
                : "navButtons"
            }
            id="home"
            onClick={changePage}
          >
            Home
          </li>
          <li
            className={
              currentPage === "posts"
                ? "text-main_blue navButtons"
                : "navButtons"
            }
            id="posts"
            onClick={changePage}
          >
            Posts
          </li>
          <li
            className={
              currentPage === "about"
                ? "text-main_blue navButtons"
                : "navButtons"
            }
            id="about"
            onClick={changePage}
          >
            About
          </li>
        </ul>
      </nav>
      <div className={user ? "hidden" : "hidden lg:flex space-x-[25px] "}>
        <button
          className="bg-main_blue text-white  button buttonTransition"
          id="login"
          onClick={changePage}
        >
          Login
        </button>
        <button
          className="bg-slate-200 button  buttonTransition"
          id="register"
          onClick={changePage}
        >
          Sign up
        </button>
      </div>
      <div className={user ? "hidden lg:flex items-center" : "hidden"}>
        <p className="font-normal text-slate-400 text-[18px]">How's your day</p>
        <h2 className="text-main_blue font-bold text-[24px] ml-[5px] ">
          {user && currentUser.name}
        </h2>
        <img
          src={
            !profilePic
              ? profilePlaceHolde
              : `data:image/jpeg;base64,${profilePic}`
          }
          className="w-[35px] border-[3px] border-main_blue rounded-[50%] ml-[10px] cursor-pointer"
          alt="profile picture placeholder"
        />
        <button
          className="flex items-center bg-main_blue text-white px-[12px] py-[10px] rounded-[6px] text-[12px] ml-[10px]"
          onClick={() => {
            setCurrentPage("newpost");
            navigate("/newpost");
          }}
        >
          <FaPlus />
          Add new post
        </button>
      </div>
      <div className="mobileMenuIcon" onClick={() => setIsOpen(!isOpen)}>
        <div className={isOpen ? "hidden" : "mobileMenuSpan"}></div>
        <div className={isOpen ? "hidden" : "mobileMenuSpan"}></div>
        <div className="mobileMenuSpan"></div>
      </div>
      <MobileMenu
        currentPage={currentPage}
        changePage={changePage}
        isOpen={isOpen}
      />
    </header>
  );
};

export default Header;
