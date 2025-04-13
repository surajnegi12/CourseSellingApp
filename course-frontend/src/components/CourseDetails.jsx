import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { URL } from "../assets/assets";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [input, setInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingInput, setEditingInput] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const res = await axios.get(
          `${URL}/user/v1/details/${courseId}`
        );
        setCourse(res.data.course);
        setAllComments(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch course details:", err);
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  async function handleComment() {
    if (!user.isAuthenticated) {
      toast.error("Please sign in to add comment!");
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/user/v1/comment`,
        { comment: input, courseId },
        { headers: { token: user.token.token } }
      );
      setAllComments((prev) => [...prev, res.data.comment]);
      setInput("");
      toast.success("Comment added!");
    } catch (err) {
      console.error("Error posting comment:", err);
      toast.error("Failed to add comment");
    }
  }

  async function handleDelete(commentId) {
    try {
      await axios.delete(`${URL}/user/v1/comment/${commentId}`, {
        headers: { token: user.token.token },
      });
      setAllComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted!");
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment");
    }
  }

  async function handleSaveEdit(commentId) {
    try {
      const res = await axios.put(
        `${URL}/user/v1/comment/${commentId}`,
        { updatedComment: editingInput },
        { headers: { token: user.token.token } }
      );
      setAllComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, comment: res.data.updatedComment.comment }
            : c
        )
      );
      setEditingCommentId(null);
      setEditingInput("");
      toast.success("Comment updated!");
    } catch (err) {
      console.error("Error updating comment:", err);
      toast.error("Failed to update comment");
    }
  }

  return (
    <div className="text-white p-4 pt-24 min-h-screen bg-gray-900">
      {course ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <img
            src={course.imgUrl}
            alt={course.title}
            className="w-96 h-96 object-cover rounded-lg mb-4"
          />
          <p className="text-lg mb-2">{course.description}</p>
          <p className="text-green-400 font-semibold text-xl mb-6">
            ${course.price}
          </p>
          <h2 className="text-2xl font-semibold mb-2">Comments</h2>

          <div>
            <input
              className="rounded p-2 bg-white text-black w-full mb-2"
              type="text"
              placeholder="Write your comment..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleComment}
              disabled={!input.trim()}
              className="ml-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-500 disabled:opacity-50"
            >
              Add Comment
            </button>
          </div>

          <ul className="space-y-2 mt-4">
            {allComments.map((comment) => (
              <li key={comment._id} className="bg-gray-800 p-3 rounded-md">
                <strong>
                  {comment.userId.firstName} {comment.userId.lastName}
                </strong>
                :
                {editingCommentId === comment._id ? (
                  <div className="mt-2">
                    <input
                      className="rounded p-2 bg-white text-black w-full"
                      value={editingInput || ""} 
                      onChange={(e) => setEditingInput(e.target.value)}
                    />
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleSaveEdit(comment._id)}
                        className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditingInput("");
                        }}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span> {comment.comment}</span>
                )}
                {comment.userId._id === user.userinfo._id &&
                  editingCommentId !== comment._id && (
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditingInput(comment.comment);
                        }}
                        className="text-cyan-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading course...</p>
      )}
    </div>
  );
};

export default CourseDetails;
