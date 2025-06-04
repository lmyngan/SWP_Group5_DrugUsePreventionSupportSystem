// src/pages/BlogPage.js
import React from 'react';
import './BlogPage.css';

const blogPosts = [
  {
    id: 1,
    title: 'Câu chuyện vượt qua cám dỗ',
    author: 'Nguyễn Văn A',
    videoUrl: 'https://www.youtube.com/embed/a_frdvO7f44',
    comments: ['Rất truyền cảm hứng!', 'Cảm ơn bạn đã chia sẻ.'],
  },
  {
    id: 2,
    title: 'Làm sao để nói "Không" với ma túy?',
    author: 'Trần Thị B',
    videoUrl: 'https://www.youtube.com/embed/DzMN3e5YbHk',
    comments: ['Bài học thực tế quá!', 'Thật đáng suy ngẫm.'],
  },
];

const BlogPage = () => {
  return (
    <div className="blog-page">
      <h2>Blog Chia Sẻ Kinh Nghiệm</h2>
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-post">
          <h3>{post.title}</h3>
          <p><strong>Người đăng:</strong> {post.author}</p>
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="315"
              src={post.videoUrl}
              title={post.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="comments">
            <strong>Bình luận:</strong>
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index}>– {comment}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
