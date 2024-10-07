import React from 'react';
import './ServicesPage.css';

const services = [
  {
    id: 1,
    title: 'Manage Promotions',
    description: 'Create and manage promotions for your products.',
    link: '/promotions',
    icon: '📊', // You can replace this with an actual icon or image
  },
  {
    id: 2,
    title: 'Campaigns',
    description: 'Create email campaigns and track their performance.',
    link: '/campaigns',
    icon: '✉️',
  },
  {
    id: 3,
    title: 'Reports',
    description: 'View detailed reports on system activities and performance.',
    link: '/reports',
    icon: '📈',
  },
  {
    id: 4,
    title: 'Analytics',
    description: 'Analyze data and gain insights into your business.',
    link: '/analytics',
    icon: '📊',
  },
  // Add more services as needed
];

const ServicesPage = () => {
  return (
    <div className="services-page">
      <h1>Services</h1>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href={service.link} className="service-link">
              View {service.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
