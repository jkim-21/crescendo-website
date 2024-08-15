import { Router } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

router.post("/validate-address", async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const validationUrl = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(validationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: {
          addressLines: [address]
        }
      })
    });

    const data = await response.json();
    console.log("Full API response:", JSON.stringify(data, null, 2));

    if (data.result && data.result.address) {
      const validatedAddress = data.result.address;
      console.log("Validated address:", JSON.stringify(validatedAddress, null, 2));

      if (!validatedAddress) {
        console.log("Validated address is missing");
        return res.json({ valid: false, error: 'Missing address', suggestedAddress: null });
      }

      const addressComponents = validatedAddress.addressComponents || [];
      
      const stateComponent = addressComponents.find(c => c.componentType === 'administrative_area_level_1');
      const cityComponent = addressComponents.find(c => c.componentType === 'locality');
      const postalCodeComponent = addressComponents.find(c => c.componentType === 'postal_code');
      const streetNumberComponent = addressComponents.find(c => c.componentType === 'street_number');

      console.log("State:", stateComponent);
      console.log("City:", cityComponent);
      console.log("Postal Code:", postalCodeComponent);
      console.log("Street Number", streetNumberComponent);

      let contradictions = [];

      
      if (!stateComponent || stateComponent.confirmationLevel !== 'CONFIRMED') {
        contradictions.push("State not confiremd");
      }
      if (!cityComponent || cityComponent.confirmationLevel !== 'CONFIRMED') {
        contradictions.push("City not confirmed");
      }
      if (!postalCodeComponent || postalCodeComponent.confirmationLevel !== 'CONFIRMED') {
        contradictions.push("Postal code not confirmed");
      } else if (postalCodeComponent.componentName.text.length !== 5) {
        contradictions.push("Postal code not 5 digits");
      }
      if (!streetNumberComponent || streetNumberComponent.confirmationLevel !== 'CONFIRMED') {
        contradictions.push("Street Number not confirmed");
      }
      if (cityComponent.replaced) {
        contradictions.push("State questionable");
      }


      if (contradictions.length === 0) {
        
        const formattedAddress = validatedAddress.formattedAddress.replace(/(\d{5})-\d{4}/, '$1');
        console.log("Address validated successfully");
        res.json({ 
          valid: true, 
          formattedAddress: formattedAddress,
          geocode: data.result.geocode
        });
      } else {
        
        const suggestedAddress = validatedAddress.formattedAddress.replace(/(\d{5})-\d{4}/, '$1');
        console.log("Address validation failed:", contradictions);
        res.json({ 
          valid: false, 
          error: 'Address has contradictions or missing components',
          details: contradictions,
          suggestedAddress: suggestedAddress
        });
      }
    } else {
      console.log("Could not validate address: No result in API response");
      res.json({ valid: false, error: 'Could not validate address', suggestedAddress: null });
    }
  } catch (err) {
    console.error("Error validating address:", err);
    res.status(500).json({
      error: "An error occurred while validating the address. Please try again later.",
      details: [err.message],
      suggestedAddress: null
    });
  }
});

router.get("/geocode", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(
        `Geocoding API error: ${data.status}.${data.error_message || ""}`
      );
    }

    const { lat, lng } = data.results[0].geometry.location;
    console.log(lat, lng);
    res.json({ lat, lng });
  } catch (err) {
    console.error("Error in geocoding:", err);
    res.status(500).json({
      error: `An error occurred while geocoding the address: ${err.message}`,
    });
  }
});

router.get("/reverse-geocode", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(reverseGeocodeUrl);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(
        `Reverse Geocoding API error: ${data.status}. ${data.error_message || ""}`
      );
    }

    const address = data.results[0].formatted_address;
    res.json({ address });
  } catch (err) {
    console.error("Error in reverse geocoding:", err);
    res.status(500).json({
      error:
        "An error occurred while reverse geocoding. Please try again later.",
    });
  }
});

export default router;
