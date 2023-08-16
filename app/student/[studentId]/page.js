"use client";

import { useRouter } from "next/navigation";
import React from "react";

const StudentDetails = ({ params }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <p className="my-5">Showing details of Student #{params.studentId}</p>
    </div>
  );
};

export default StudentDetails;
