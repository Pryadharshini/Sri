"use client";
import React from 'react';
import BookAppointmentForm from '../Bookappointmentform';

export default function TailoringBookNow() {
  return (
    <BookAppointmentForm
      heading="Book Your Order"
      tagline="Sri Sanjana Tailoring"
      whatsappNumber="917200695444"// TODO: replace with your WhatsApp business number (country code + number, no + or spaces)
      categories={[
        "Blouse Designs",
        "Ready-Made Blouses",
        "Aari Work Blouses",
        "Machine Embroidery",
        "Pattu Pavadai",
        "Lehenga",
        "Customized Chudi Sets",
        "Mom & Daughter Combo",
        "Siblings Combo",
        "Family Combos",
        "Long Gowns",
        "Kids Gowns",
        "Other / Custom Stitching",
      ]}
    />
  );
}