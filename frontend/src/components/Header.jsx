import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = useNavigate();

  const changePage = (e) => {
    if (e.target.id !== "home") {
      setCurrentPage(e.target.id);
      navigate(e.target.id);
    } else {
      setCurrentPage("home");
      navigate("/");
    }
  };

  return (
    <header className="flex justify-between items-center px-[18px] py-[18px] lg:px-[80px] lg:py-[40px] shadow-lg">
      <h1 className="logo text-[18px] lg:text-[36px]">
        TO<span className="text-main_blue">DAY</span>
      </h1>
      <nav className="hidden lg:flex space-x-[65px] text-[24px] font-[500] group-hover:cursor-pointer">
        <h3
          className={
            currentPage === "home" ? "text-main_blue navButtons" : "navButtons"
          }
          id="home"
          onClick={changePage}
        >
          Home
        </h3>
        <h3
          className={
            currentPage === "posts" ? "text-main_blue navButtons" : "navButtons"
          }
          id="posts"
          onClick={changePage}
        >
          Posts
        </h3>
        <h3
          className={
            currentPage === "about" ? "text-main_blue navButtons" : "navButtons"
          }
          id="about"
          onClick={changePage}
        >
          About
        </h3>
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
      <div className="w-[20px] h-[18px] space-y-[4px] lg:hidden">
        <div className="mobileMenuSpan"></div>
        <div className="mobileMenuSpan"></div>
        <div className="mobileMenuSpan"></div>
      </div>
    </header>
  );
};

export default Header;
