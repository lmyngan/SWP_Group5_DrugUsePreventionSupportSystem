// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';

const blogVideos = [
  {
    id: 1,
    title: ' How to say "No" to drugs??',
    uploader: 'Ms.Marrie',
    videoUrl: 'https://www.youtube.com/embed/a_frdvO7f44', // Thay bằng link nhúng thật
    description: 'Share practical ways to turn down drug offers from friends...',
    comments: [
      'Helpful tips, thank you!',
      'Thanks for sharing your experience',
    ],
  },
  {
    id: 2,
    title: 'Story of overcoming temptation',
    uploader: 'Mr.David',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Thay bằng link nhúng thật
    description: 'A young man s true experience of being lured and how he overcame it...',
    comments: [
      'Admire your strong spirit!',
      'What a touching story',
    ],
  },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <section id="gioithieu" className="section">
        <h2>Free Truth About Drugs E-Courses</h2>
        <p>
          This series of interactive Truth About Drugs courses has been designed so you can learn the truth about drugs at your own pace...
        </p>
      </section>

      <section id="blog" className="section">
        <h2>Blog Sharing Expenriece</h2>
        {blogVideos.map((video) => (
          <div key={video.id} className="blog-post">
            <h3>{video.title}</h3>
            <p><strong>Author:</strong> {video.uploader}</p>
            <div className='video-wrapper'>
            <iframe
              width="100%"
              height="315"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            </div>
            <p>{video.description}</p>
            <div className="comments">
              <strong> Comments:</strong>
              <ul>
                {video.comments.map((comment, index) => (
                  <li key={index}>- {comment}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
