import { Header } from "../components/components";
import heroPicDesktop from "../assets/images/Hero Pics - desktop.png";
import heroPicMobile from "../assets/images/Hero Pics - mobile.png";

const Home = () => {
  return (
    <div className="w-scren min-h-screen h-full">
      <Header />
      <div className="flex flex-col lg:flex-row justify-evenly items-center px-[40px] py-[30px] lg:px-[150px] lg:py-[115px]">
        <img className="hidden lg:block" src={heroPicDesktop} alt="pictures" />
        <img className="lg:hidden" src={heroPicMobile} alt="pictures" />
        <div className="mt-[30px] lg:mt-0 lg:ml-[150px]">
          <h2 className="text-[32px] lg:text-[72px] font-[500] ">
            What is going on
            <span className="text-main_blue font-[600]"> TODAY</span> ?
          </h2>
          <p className="font-[300] text-[18px] lg:text-[36px] text-slate-400">
            With TODAY you can share any intresting moment of your day with
            others from all around the world...
          </p>
          <button className="bg-main_blue px-[22px] py-[10px] lg:px-[45px] lg:py-[20px] text-white rounded-[8px] mt-[20px] lg:mt-[50px]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
