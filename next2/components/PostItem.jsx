import React, { useState } from "react";
import { useStore } from "../store/index";

const PostItem = ({ post, onEdit, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { likePost, dislikePost } = useStore((state) => ({
    likePost: state.likePost,
    dislikePost: state.dislikePost,
  }));

  const handleEdit = (post) => {
    setIsEditing(true);
    onEdit(post);
  };

  const handleUpdate = (postId) => {
    onUpdate(postId);
    setIsEditing(false);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="mt-5">
      <div className="max-w-sm w-[50vw] lg:max-w-full lg:flex ">
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="flex">
            <span>
              {" "}
              <img
                className="h-14 w-14 pb-4 rounded-full object-cover"
                src="https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600nw-2107967969.jpg"
                alt="Your Name"
              />
            </span>
            <p className="text-gray-700 text-base font-semibold mt-2">
              {" "}
              User Number - {post.user_id}
            </p>
          </div>
          <p className="text-gray-600 mb-2">{formatDate(post.created_at)}</p>
          {post.image_url && (
            <div className="mb-8">
              <img
                className="w-[45vw] h-60 object-cover rounded"
                src={post.image_url}
                alt={`${post.title}-image`}
              />
            </div>
          )}
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {post.title}
            </div>
            <p className="text-gray-700 text-base">{post.content}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{post.author}</p>

              <p className="text-gray-600">Likes👍{post.like_count}</p>
              <p className="text-gray-600">Dislikes👎{post.dislike_count}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            {isEditing ? (
              <button
                onClick={() => handleUpdate(post.id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            ) : (
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(post.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => likePost(post.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Like
            </button>
            <button
              onClick={() => dislikePost(post.id)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Dislike
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
