const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-center ">
      <h1 className="logo text-main_blue text-[60px] lg:text-[120px]">404</h1>
      <h3 className="font-bold text-[15px] lg:text-[30px]">
        The page you're looking for does not exist !
      </h3>
    </div>
  );
};

export default NotFound;
