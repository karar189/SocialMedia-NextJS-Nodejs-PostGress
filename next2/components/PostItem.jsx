import React from "react";

const PostItem = ({ post, onEdit, onDelete, onUpdate }) => {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.image_url && (
        <img
          src={post.image_url}
          alt={`${post.title}-image`}
          style={{ width: "200px", height: "150px" }}
        />
      )}
      <button onClick={() => onEdit(post)}>Edit</button>
      <button onClick={() => onDelete(post.id)}>Delete</button>
      <button
        onClick={() => {
          onUpdate(post.id);
        }}
      >
        Update Post
      </button>
    </li>
  );
};

export default PostItem;
