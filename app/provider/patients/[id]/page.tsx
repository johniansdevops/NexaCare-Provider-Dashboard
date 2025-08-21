'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PatientProfile() {
  const params = useParams();
  const patientId = params.id as string;

  return (
    <div className="p-6 space-y-6">
      <h1>Patient Profile: {patientId}</h1>
      <Link href="/provider/patients">Back to Patients</Link>
    </div>
  );
} 