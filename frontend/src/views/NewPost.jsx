import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { Header } from "../components/components";
import { createPost, reset } from "../features/post/postSlicer";

const NewPost = () => {
  const [image, setImage] = useState();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  const currentUser = user && JSON.parse(user);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Encode user image to base64
  const encodeImage = async () => {
    Resizer.imageFileResizer(
      image,
      960,
      540,
      "JPEG",
      75,
      0,
      (res) => {
        setFormData((prevState) => ({
          ...prevState,
          image: res,
        }));
      },
      "base64"
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!image || formData.title === "") {
      toast.error("Please fill all required fileds");
    } else {
      const post = {
        user: currentUser._id,
        name: currentUser.name,
        postPic: formData.image,
        postTitle: formData.title,
        postDesc: formData.desc,
      };

      dispatch(createPost(post));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (isLoading) {
      toast.warning("Please wait");
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Successfully posted");
      navigate("/posts");
    }

    if (image) {
      encodeImage();
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isLoading, isSuccess, isError, message, image]);

  return (
    <div>
      <Header />
      <div className="flex justify-center w-screen">
        <div className="flex flex-col justify-center items-center py-[50px] px-[25px] w-full max-w-[1100px]">
          <h2 className="font-bold text-[36px] text-center">Create new post</h2>
          <hr className="w-full h-[2px] bg-black opacity-50 mt-[20px] mb-[20px]" />
          <form
            className="flex flex-col justify-center w-full"
            onSubmit={onSubmit}
          >
            <label className="label">Image:</label>
            <label className="border-2 border-main_blue p-[12px] text-main_blue text-center font-medium rounded-[8px] active:bg-main_blue active:text-white  ">
              <span>{!image ? "Select an image" : "Image selected"}</span>
              <input
                className="hidden"
                type="file"
                name="image"
                accept="image/jpeg , image/png"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <label className="label">Title:</label>
            <input
              className="bg-slate-200 p-[16px] rounded-[8px] font-medium focus:outline-main_blue"
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title for your post"
              onChange={onChange}
            />
            <label className="label">description (optional):</label>
            <input
              className="bg-slate-200 p-[16px] rounded-[8px] font-medium focus:outline-main_blue"
              type="text"
              name="desc"
              id="desc"
              placeholder="Enter a description for your post"
              onChange={onChange}
            />
            <button
              className="bg-green-500 p-[12px] text-white font-bold rounded-[8px] mt-[25px]"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewPost;
