import Ticket from '../models/ticket.model.js';
import Event from "../models/event.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error in fetching products.", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createProduct = async (req, res) => {
    const { eventId, price, image } = req.body;
  
    if (!eventId || !price || !image) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
  
    try {
      const event = await Event.findOne({ eventId });
      if (!event) {
        return res.status(400).json({ success: false, message: "Invalid eventId. Event not found." });
      }
  
      const newTicket = new Ticket({ eventId, price, image });
      await newTicket.save();
  
      res.status(201).json({ success: true, data: newTicket });
    } catch (error) {
      console.error("Error creating ticket:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };


export const updateProduct = async (req,res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product ID"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(404).json({success: false, message: "Server Error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error in deleting product:", error.message);  
        res.status(500).json({success: false, message: "Server error"});
    }
}