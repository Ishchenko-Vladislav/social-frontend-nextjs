"use client";
import Link from "next/link";
export default async function NotFound() {
  return (
    <div>
      <h2>user not found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
