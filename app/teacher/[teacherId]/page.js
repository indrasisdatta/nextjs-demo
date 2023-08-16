"use client";

import { useRouter } from "next/navigation";
import React from "react";

const TeacherDetails = ({ params }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <p className="my-5">Showing details of teacher #{params.teacherId}</p>
    </div>
  );
};

export default TeacherDetails;
