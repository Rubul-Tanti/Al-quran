import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useSelector } from "react-redux";
import Loader from "../loader";
import EditPost from "./editPost";
import { toast } from "react-toastify";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(true);
  const [edit,setEdit]=useState({page:false,data:null});
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?._id) return;
    setLoading(true)

    const fetchPosts = async () => {
      try {
        // ✅ use POST if backend expects body
        const res = await api.post("/v1/fetchmyposts", {
          id: user._id,
          name: user?.persnalDetails?.fullName,
        });
        setPosts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }finally{setLoading(false)}
    };

    fetchPosts();
  }, [user,edit]); // ✅ add dependency

 const handleClosePost = (id) => {
    toast.info(
      <div className="text-blue-900">
        <p className="font-semibold">Close Post</p>
        <p className="text-sm">Are you sure you want to close this post?</p>
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => toast.dismiss()} // cancel action
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async() => {
            const {data}= await api.post(`/v1/deletejob/${id}`)
            if(data.success){
              toast("post deleted successfully")
            }else{toast.error("internal server Error")}
              toast.dismiss();
            }}
            className="px-3 py-1 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Close Post
          </button>
        </div>
      </div>,
      {
        position: "bottom-center",
        className: "bg-blue-50 rounded-lg shadow-lg",
        autoClose: false, // stay until action
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  };


  const handleClose = async (id) => {
    try {
      const res = await api.put(`/api/jobs/${id}/close`);
      if (res.status === 200) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === id ? { ...post, status: "closed" } : post
          )
        );
      }
    } catch (err) {
      console.error("Error closing job:", err);
    }
  };
  if(loading)return<Loader/>

  return (
    <>
    {edit.page?<EditPost data={edit.data} setEdit={setEdit} />:
    <div className="min-h-screen bg-white text-blue-900 px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">My Job Posts</h1>
        <button
          onClick={() => navigate("/create-job")}
          className="px-5 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition"
        >
          + Create Post
        </button>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-gray-100 rounded-xl border border-gray-200">
            <p className="text-blue-900 text-lg font-medium">
              No posts created yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-200 text-blue-900 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {post.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Budget: <span className="font-medium">${post.budget}</span>
                  </p>

                  <span

                    className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      post.status === "closed"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() =>{setEdit({page:true,data:post})}}
                    className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>{handleClosePost(post._id)}}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
                      post.status === "closed"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>}
    </>
  );}

