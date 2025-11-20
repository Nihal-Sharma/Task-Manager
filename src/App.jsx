import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskPage from "./pages/TaskPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/*  top bar */}
      <header className="border-b bg-white/80 ">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold ">
            Task Tracker
          </h1>
         
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
