"use client";
import React from 'react';
import BookAppointmentForm from '../Bookappointmentform';

export default function BharathanatyamBookNow() {
  return (
    <BookAppointmentForm
      heading="Book Your Order"
      tagline="Sri Sanjana Dance Attire"
      whatsappNumber="91 83447 18008" // TODO: replace with your WhatsApp business number (country code + number, no + or spaces)
      categories={[
        "Sun Pleated Pant Model with Silk Zari Border",
        "Sun Pleated Pant Model with Thread Border",
        "Skirt Model",
        "Practice Sarees",
        "Saree Convert Costumes",
        "Jewelry & Accessories",
      ]}
    />
  );
}