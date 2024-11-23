import Event from "../models/event.model.js";
import mongoose from "mongoose";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.log("Error fetching events:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  const event = req.body;

  if (!event.name || !event.time || !event.location) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newEvent = new Event(event);

  try {
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Event ID" });
  }

  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.log("Error deleting event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
