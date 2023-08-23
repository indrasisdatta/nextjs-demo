import Link from "next/link";
import React from "react";

const TeacherList = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/teacher/1">Teacher 1</Link>
        </li>
        <li>
          <Link href="/teacher/2">Teacher 2</Link>
        </li>
        <li>
          <Link href="/teacher/3">Teacher 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherList;
