import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const imageAPIUrl = "https://picsum.photos/1280/1280";

  const [image, setImage] = useState();
  const [newPage, setNewPage] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all required fields", {
        toastId: "error 2",
      });
    } else {
      const user = {
        email: form.email,
        username: form.email,
        password: form.password,
      };

      dispatch(login(user));
    }
  };

  useEffect(() => {
    if (newPage) {
      fetch(imageAPIUrl).then((res) => setImage(res.url));
      setNewPage(false);
    }

    if (isLoading) {
      toast.warning("Please wait", {
        toastId: "wait 1",
      });
    }

    if (isError) {
      toast.error(message, {
        toastId: "error 1",
      });
    }

    if (isSuccess) {
      toast.success("Sucessfully logged in", {
        toastId: "sucess 1",
      });
    }

    if (user) {
      navigate("/posts");
    }
  }, [isLoading, isError, message, isSuccess, newPage, user, navigate]);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col w-full items-center px-[42px] py-[55px] lg:px-[85px] lg:py-[115px] min-h-screen">
        <div className="text-center ">
          <h1 className="logo text-[36px] lg:text-[72px] cursor-pointer">
            TO<span className="text-main_blue">DAY</span>
          </h1>
          <p className="text-[18px] mt-[-15px]">a slice from daily life</p>
        </div>
        <div className="flex flex-col justify-center w-full h-full">
          <h2 className="text-center lg:text-left text-[32px] lg:text-[64px]">
            Login
          </h2>
          <form
            className="mt-[30px] lg:mt-[65px] space-y-[25px] lg:space-y-[40px]"
            onSubmit={submit}
          >
            <input
              className="w-full bg-slate-300 p-[15px] lg:p-[25px] rounded-[10px] placeholder:text-[12px] lg:placeholder:text-[18px] focus:outline-main_blue"
              type="text"
              name="email"
              id="email"
              value={form.email}
              placeholder="Enter your email or username"
              onChange={onChange}
            />
            <input
              className="w-full bg-slate-300 p-[15px] lg:p-[25px] rounded-[10px] placeholder:text-[12px] lg:placeholder:text-[18px] focus:outline-main_blue"
              type="password"
              name="password"
              id="password"
              value={form.password}
              placeholder="Enter your password"
              onChange={onChange}
            />
            <button
              type="submit"
              className="w-full bg-[#1CBB19] text-white font-medium text-[18px] p-[12px] lg:p-[25px] rounded-[10px] placeholder:text-[18px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <img
        className={
          image
            ? "hidden lg:block object-fit  h-screen w-[55%]"
            : "hidden lg:block opacity-0 w-full"
        }
        src={image ?? image}
        alt="random image"
        loading="lazy"
      />
    </div>
  );
};
export default Login;
