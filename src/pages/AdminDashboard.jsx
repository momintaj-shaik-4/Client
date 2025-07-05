import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { format } from 'date-fns';

const AdminDashboard = ({ user }) => {
  const [data, setData] = useState({
    users: [],
    deliveries: [],
    loading: true,
    error: null
  });
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const [usersRes, deliveriesRes] = await Promise.allSettled([
        api.get('/admin/users'),
        api.get('/admin/deliveries')
      ]);

      const users = usersRes.status === 'fulfilled' ? usersRes.value.data : [];
      const deliveries = deliveriesRes.status === 'fulfilled' ? deliveriesRes.value.data : [];

      setData({
        users: Array.isArray(users) ? users : [],
        deliveries: Array.isArray(deliveries) ? deliveries : [],
        loading: false,
        error: null
      });

    } catch (err) {
      console.error('Admin data fetch error:', err);
      setData({
        users: [],
        deliveries: [],
        loading: false,
        error: err.response?.data?.error || 'Failed to load admin data'
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (itemToDelete.type === 'user') {
        await api.delete(`/admin/users/${itemToDelete.id}`);
      } else if (itemToDelete.type === 'delivery') {
        await api.delete(`/admin/deliveries/${itemToDelete.id}`);
      }
      
      setShowDeleteConfirm(false);
      fetchAdminData(); // Refresh data
    } catch (err) {
      console.error('Delete error:', err);
      alert(`Failed to delete ${itemToDelete.type}: ${err.response?.data?.error || 'Server error'}`);
    }
  };

  const openDeleteDialog = (type, id) => {
    setItemToDelete({ type, id });
    setShowDeleteConfirm(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'PPpp');
  };

  if (data.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{data.error}</p>
        </div>
        <button
          onClick={fetchAdminData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(to right top, #eef2f3, #8ec5fc)' }} className="min-h-screen">
      <div className="container mx-auto p-6">
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete this {itemToDelete.type}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Details Modal */}
        {selectedDelivery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Delivery Details</h3>
                <button
                  onClick={() => setSelectedDelivery(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        selectedDelivery.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        selectedDelivery.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedDelivery.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Created:</span> {formatDate(selectedDelivery.createdAt)}</p>
                    {selectedDelivery.acceptedAt && (
                      <p><span className="font-medium">Accepted:</span> {formatDate(selectedDelivery.acceptedAt)}</p>
                    )}
                    {selectedDelivery.completedAt && (
                      <p><span className="font-medium">Completed:</span> {formatDate(selectedDelivery.completedAt)}</p>
                    )}
                  </div>

                  <h4 className="font-semibold mt-4 mb-2">Addresses</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Pickup:</span> {selectedDelivery.pickupAddress}</p>
                    <p><span className="font-medium">Dropoff:</span> {selectedDelivery.dropoffAddress}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Package Details</h4>
                  <p className="mb-4">{selectedDelivery.packageNote}</p>
                  
                  {selectedDelivery.itemImage && (
                    <div className="mt-2">
                      <h4 className="font-semibold mb-2">Item Image</h4>
                      <img 
                        src={selectedDelivery.itemImage} 
                        alt="Package item" 
                        className="max-w-full h-auto rounded border border-gray-200"
                      />
                    </div>
                  )}

                  {selectedDelivery.feedback && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Feedback</h4>
                      <p><span className="font-medium">Rating:</span> {selectedDelivery.feedback.rating}/5</p>
                      {selectedDelivery.feedback.comment && (
                        <p><span className="font-medium">Comment:</span> {selectedDelivery.feedback.comment}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Parties</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm text-gray-600">Sender</h5>
                    <p>{selectedDelivery.createdBy?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{selectedDelivery.createdBy?.email || 'N/A'}</p>
                  </div>
                  {selectedDelivery.acceptedBy && (
                    <div>
                      <h5 className="font-medium text-sm text-gray-600">Driver</h5>
                      <p>{selectedDelivery.acceptedBy?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{selectedDelivery.acceptedBy?.email || 'N/A'}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => openDeleteDialog('delivery', selectedDelivery._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Delivery
                </button>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Users ({data.users.length})</h2>
            </div>
            {data.users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'driver' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => openDeleteDialog('user', user._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No users found</p>
            )}
          </div>

          {/* Deliveries Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Deliveries ({data.deliveries.length})</h2>
            </div>
            {data.deliveries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Pickup</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.deliveries.map(delivery => (
                      <tr key={delivery._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {delivery._id?.substring(18, 24) || 'N/A'}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {delivery.pickupAddress.substring(0, 20)}...
                        </td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            delivery.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            delivery.status === 'Failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {delivery.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => setSelectedDelivery(delivery)}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openDeleteDialog('delivery', delivery._id)}
                            className="text-red-500 hover:text-red-700 text-sm ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No deliveries found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
