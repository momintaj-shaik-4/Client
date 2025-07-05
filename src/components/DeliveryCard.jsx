import { useState } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';
import {
  FaUser, FaMapMarkerAlt, FaClipboard,
  FaEnvelope, FaTruck, FaCheckCircle,
  FaComment, FaTimes
} from "react-icons/fa";
import ConfirmationModal from './ConfirmationModal';
import ChatRoom from './ChatRoom';

const statusBadgeStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-blue-100 text-blue-800",
  "In-Transit": "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
};

const DeliveryCard = ({
  delivery,
  showAcceptButton,
  showStatusActions,
  onStatusChange,
  onAcceptSuccess,
  currentUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [showPickupConfirmation, setShowPickupConfirmation] = useState(false);
  const [showOtpPrompt, setShowOtpPrompt] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [pendingStatus, setPendingStatus] = useState(null);
   const [showChat, setShowChat] = useState(
    ["Accepted", "In-Transit"].includes(delivery.status)
  );

  const handleStatusUpdate = async (newStatus, confirmed = false) => {
    try {
      setLoading(true);

      if (newStatus === "In-Transit" && !confirmed) {
        setPendingStatus(newStatus);
        setShowPickupConfirmation(true);
        setLoading(false);
        return;
      }

      if (newStatus === "Completed") {
        const otpRes = await api.post(`/deliveries/${delivery._id}/send-otp`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (otpRes.data.success) {
          toast.success("OTP sent to customer");
          setShowOtpPrompt(true);
          setPendingStatus("Completed");
          setLoading(false);
          return;
        } else {
          throw new Error("Failed to send OTP");
        }
      }

      const res = await api.patch(`/deliveries/${delivery._id}/status`, {
        newStatus,
        confirmation: confirmed
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.success) {
        toast.success(`Marked as ${newStatus}`);
        onStatusChange();
      } else {
        throw new Error(res.data.message || 'Status update failed');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteWithOtp = async () => {
    if (!otpInput.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await api.patch(`/deliveries/${delivery._id}/status`, {
        newStatus: "Completed",
        enteredOtp: otpInput.trim()
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.success) {
        toast.success("Delivery marked as Completed");
        setShowOtpPrompt(false);
        onStatusChange();
      } else {
        throw new Error(res.data.message || 'OTP verification failed');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      const res = await api.patch(`/deliveries/${delivery._id}/accept`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.success) {
        toast.success("Delivery accepted");
        onAcceptSuccess();
      } else {
        throw new Error(res.data.message || 'Accept failed');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };
  

  return (
    <div className="bg-white shadow-md rounded-xl border p-5 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">Delivery #{delivery._id.slice(-6)}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeStyles[delivery.status]}`}>
          {delivery.status}
        </span>
      </div>

      <div className="mb-2">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FaUser className="text-gray-500" /> Customer
        </h4>
        <p className="ml-5 text-sm">{delivery.createdBy?.name}</p>
        <p className="ml-5 text-sm flex items-center gap-1">
          <FaEnvelope className="text-gray-500" /> {delivery.createdBy?.email}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" /> Locations
        </h4>
        <div className="ml-5 text-sm space-y-1">
          <p><strong>From:</strong> {delivery.pickupAddress}</p>
          <p><strong>To:</strong> {delivery.dropoffAddress}</p>
        </div>
      </div>

      {delivery.packageNote && (
        <p className="text-sm flex items-start gap-2 mt-2 ml-5">
          <FaClipboard className="text-gray-500 mt-0.5" />
          <span><strong>Note:</strong> {delivery.packageNote}</span>
        </p>
      )}

      <div className="mt-4 space-y-2">
        {showAcceptButton && (
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Accepting..." : "Accept Delivery"}
          </button>
        )}

        {showStatusActions && delivery.status === "Accepted" && (
          <button
            onClick={() => handleStatusUpdate("In-Transit")}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition"
          >
            <FaTruck className="inline mr-2" /> Mark as In-Transit
          </button>
        )}

        {showStatusActions && delivery.status === "In-Transit" && (
          <button
            onClick={() => handleStatusUpdate("Completed")}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            <FaCheckCircle className="inline mr-2" /> Mark as Completed
          </button>
        )}

        {/* Live Chat Button */}
       {["Accepted", "In-Transit"].includes(delivery.status) && (
        <button
          onClick={toggleChat}
          className={`w-full py-2 rounded-md font-medium transition flex items-center justify-center gap-2 ${
            showChat 
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {showChat ? (
            <>
              <FaTimes /> Close Chat
            </>
          ) : (
            <>
              <FaComment /> Live Chat
            </>
          )}
        </button>
      )}
      </div>

      {delivery.status === "Completed" && delivery.feedback && (
        <div className="mt-4 border-t pt-3 text-sm text-gray-700">
          <h4 className="font-semibold text-gray-800 mb-1">Customer Feedback</h4>
          <p><strong>Rating:</strong> {delivery.feedback.rating} ⭐</p>
          {delivery.feedback.comment && (
            <p><strong>Comment:</strong> {delivery.feedback.comment}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Submitted on: {new Date(delivery.feedback.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Real-Time Chat (now conditionally rendered) */}
      {showChat && ["Accepted", "In-Transit"].includes(delivery.status) && (
        <div className="mt-5">
          <ChatRoom deliveryId={delivery._id} currentUser={currentUser} />
        </div>
      )}

      {/* Pickup confirmation */}
      {showPickupConfirmation && (
        <ConfirmationModal
          title="Confirm Pickup"
          message="Are you sure you've collected the package?"
          onConfirm={() => handleStatusUpdate(pendingStatus, true)}
          onCancel={() => {
            setPendingStatus(null);
            setShowPickupConfirmation(false);
          }}
        />
      )}

      {/* OTP Modal */}
      {showOtpPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Enter OTP</h2>
            <p className="text-sm text-gray-600 mb-3">
              An OTP has been sent to the customer's email. Please enter it below to confirm delivery completion.
            </p>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full border p-2 rounded-md mb-3"
              placeholder="Enter OTP"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOtpPrompt(false)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteWithOtp}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCard;