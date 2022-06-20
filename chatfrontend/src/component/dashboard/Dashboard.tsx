import React from 'react';
import './dashboard.css';
import Sidebar from '../sidebar/sidebar';
import Thread from '../thread/thread';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <Thread />
    </div>
  );
}

export default Dashboard;
