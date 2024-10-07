import React from 'react';
import './Blog.css'; // Add your styles here
import { assets } from '../../assets/assets'
import careersImage from '../../assets/careers.png';

const Blog = () => {
  // Example blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'How to Care for Indoor Plants',
      date: 'October 7, 2024',
      author: 'Nature Hug Team',
      image: '/assets/blog.png',
      content: 'Indoor plants not only beautify your living space, but they also improve air quality and bring a sense of calm to your environment. In this blog post, we will walk you through some simple steps to ensure your indoor plants stay healthy and vibrant...',
      tags: ['Plant Care', 'Indoor Plants', 'Sustainability']
    },
    {
      id: 2,
      title: 'Best Outdoor Plants for Your Garden',
      date: 'September 29, 2024',
      author: 'John Doe',
      image: '/assets/blog2.png',
      content: 'If you’re looking to transform your garden into a beautiful and sustainable space, choosing the right outdoor plants is key. This guide will help you pick the best outdoor plants that thrive in various weather conditions...',
      tags: ['Outdoor Plants', 'Gardening', 'Eco-Friendly']
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-header">
        <br></br><br></br>
        <h1>Nature Hug Blog</h1>
        <p>Your source for all things green and sustainable</p>
      </div>
      
      <div className="blog-content-wrapper">
        <div className="blog-main-content">
          {/* Mapping through blogPosts to display multiple posts */}
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              <p className="blog-date">Published on {post.date} by {post.author}</p>
           

              <p className="blog-content">{post.content}</p>
              <div className="blog-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="blog-tag">{tag}</span>
                ))}
              </div>
              <a href={`/blog/${post.id}`} className="read-more">Read More</a>
            </div>
          ))}
        </div>
        
        {/* Sidebar */}
        <div className="blog-sidebar">
          <h3>Recent Posts</h3>
          <ul>
            {blogPosts.map((post) => (
              <li key={post.id}><a href={`/blog/${post.id}`}>{post.title}</a></li>
            ))}
          </ul>
          
          <h3>Categories</h3>
          <ul>
            <li><a href="/categories/plant-care">Plant Care</a></li>
            <li><a href="/categories/gardening">Gardening</a></li>
            <li><a href="/categories/sustainability">Sustainability</a></li>
          </ul>
        </div>
      </div>
      
      <div className="blog-footer">
        <p>Want to learn more? Stay tuned for our next post or visit our <a href="/plant-care-tips">Plant Care Tips</a> section!</p>
      </div>
    </div>
  );
};

export default Blog;
