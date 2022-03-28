const MobileMenu = ({ currentPage, changePage, isOpen }) => {
  return (
    <div className={isOpen ? "mobileMenu animate-fadeIn" : "hidden"}>
      <div className="flex flex-col justify-center items-center bg-white w-full px-[30px] py-[40px] rounded-[8px]">
        <nav className="flex justify-center text-[24px] font-[500] ">
          <ul className="space-y-[20px]">
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
        <div className="flex space-x-[25px] mt-[35px] ">
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
      </div>
    </div>
  );
};
export default MobileMenu;
