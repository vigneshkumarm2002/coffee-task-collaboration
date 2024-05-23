"use client";
import Head from "next/head";
import CommentList from "./comps/CommentList";
import TextEditor from "./comps/TextEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Collaborative Editor</title>
      </Head>
      <main className="max-w-7xl mx-auto grid grid-cols-2   gap-8 bg-white p-8 rounded shadow-md">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Text Editor</h2>
          <TextEditor />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <CommentList />
        </div>
      </main>
    </div>
  );
}
