import Link from "next/link";
import React from "react";

const StudentList = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/student/1">Student 1</Link>
        </li>
        <li>
          <Link href="/student/2">Student 2</Link>
        </li>
        <li>
          <Link href="/student/3">Student 3</Link>
        </li>
        <li>
          <Link href="/student/4">Student 4</Link>
        </li>
        <li>
          <Link href="/student/5">Student 5</Link>
        </li>
      </ul>
    </div>
  );
};

export default StudentList;
