import { Router } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

router.get("/geocode", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Geocoding API error: ${data.status}. ${data.error_message || ''}`);
    }

    const { lat, lng } = data.results[0].geometry.location;
    console.log(lat,lng);
    res.json({ lat, lng });
  } catch (err) {
    console.error("Error in geocoding:", err);
    res.status(500).json({
      error: "An error occurred while geocoding the address. Please try again later.",
    });
  }
});

router.get("/reverse-geocode", async (req, res) => {
    const { lat, lng } = req.query;
  
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
  
    try {
      const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
  
      const response = await fetch(reverseGeocodeUrl);
      const data = await response.json();
  
      if (data.status !== "OK") {
        throw new Error(`Reverse Geocoding API error: ${data.status}. ${data.error_message || ''}`);
      }
  
      const address = data.results[0].formatted_address;
      res.json({ address });
    } catch (err) {
      console.error("Error in reverse geocoding:", err);
      res.status(500).json({
        error: "An error occurred while reverse geocoding. Please try again later.",
      });
    }
  });

export default router;