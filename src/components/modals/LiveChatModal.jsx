// components/modals/LiveChatModal.js
import React from 'react';

const LiveChatModal = ({ isOpen, onClose, delivery, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Live Chat for Delivery #{delivery?._id.slice(-6)}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        
        <div className="border rounded-lg p-4 h-64 mb-4 overflow-y-auto">
          {/* Chat messages would go here */}
          <p className="text-gray-500 text-center">Chat feature coming soon!</p>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border rounded-lg px-4 py-2"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChatModal;