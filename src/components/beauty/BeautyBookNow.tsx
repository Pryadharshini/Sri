"use client";
import React from 'react';
import BookAppointmentForm from '../Bookappointmentform';

export default function BeautyBookNow() {
  return (
    <BookAppointmentForm
      heading="Book an Appointment"
      tagline="Sri Sanjana Beauty Parlour"
      whatsappNumber="91 83447 18008" // TODO: replace with your WhatsApp business number (country code + number, no + or spaces)
      categories={[
        "Saree Pre-Pleating",
        "Professional Makeup & Hairdo",
        "Mehndi Designs",
      ]}
    />
  );
}