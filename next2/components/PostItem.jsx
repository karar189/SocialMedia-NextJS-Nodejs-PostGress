import React from "react";

const PostItem = ({ post, onEdit, onDelete, onUpdate }) => {
  return (
    <div className="max-w-sm w-[40vw] lg:max-w-full lg:flex">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        {post.image_url && (
          <div className="mb-8">
            <img
              className="w-80 h-60 object-cover rounded"
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
            <p className="text-gray-600">{post.date}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => onEdit(post)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => onUpdate(post.id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
