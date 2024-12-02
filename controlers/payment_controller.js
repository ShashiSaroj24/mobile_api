import { Payment } from '../models/Payment.js';
import mongoose from "mongoose";
// Controller to handle payment storage (without signature verification for testing)
export const storePayment = async (req, res) => {
  const { paymentId, orderId, amount, cartItems, userAddress, payStatus } = req.body;

  try {
    // Log for testing purposes
    console.log("Storing payment details:", { paymentId, orderId, amount });

    // Step 1: Save payment details to the database
    const paymentData = {
      paymentId,
      orderId,
      amount,
      cartItems,
      userAddress,
      payStatus: payStatus || 'Success', // Default to 'Success' if not provided
    };

    const newPayment = new Payment(paymentData);
    await newPayment.save();

    // Step 2: Respond to the client
    res.status(201).json({
      success: true,
      message: 'Payment stored successfully (Test Mode)',
      payment: newPayment,
    });
  } catch (error) {
    console.error('Error storing payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to store payment details',
      error: error.message,
    });
  }
};





// Get all payment orders
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find(); // Fetch all payment records
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment data', error });
  }
};


//

//  fetch single user order

export const userOrder = async (req, res) => {
  try {
    // Extract the logged-in user's ID
    const userId = req.user._id;

    console.log("Logged-in User ID:", userId);

    // Query the database to find orders for the specific user
    const orders = await Payment.find({ "userAddress.userId": userId.toString() });

    // Handle case where no orders are found
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    // Return the fetched orders
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders.",
      error: error.message,
    });
  }
};


//  order cancel
export const cancelOrder = async (req, res) => {
  try {
    // Extract the order ID from the request body or URL parameters
    const { orderId } = req.params;
    const userId = req.user._id;

    console.log("Request to cancel order ID:", orderId, "by User ID:", userId);

    // Find the order and ensure it belongs to the logged-in user
    const order = await Payment.findOne({
      _id: orderId,
      "userAddress.userId": userId.toString(),
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or does not belong to this user.",
      });
    }

    // Check if the order is already cancelled
    if (order.payStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled.",
      });
    }

    // Update the order status to "cancelled"
    order.payStatus = "cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order has been cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel the order.",
      error: error.message,
    });
  }
};
