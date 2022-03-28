import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileMenu } from "./components";

const Header = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const changePage = (e) => {
    if (e.target.id !== currentPage && e.target.id !== "home") {
      setCurrentPage(e.target.id);
      navigate(`/${e.target.id}`);
    } else if (e.target.id === "home") {
      setCurrentPage("home");
      navigate("/");
    }
  };

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
      <div className="hidden lg:flex space-x-[25px] ">
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
