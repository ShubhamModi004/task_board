"use client";
import React, { useCallback, useEffect, useState, Suspense } from "react";
// components
import ModalContent from "@/components/home/modalContent/ModalContent";
import TableComponent from "@/components/home/table/Table";

// context providers
import TaskProvider from "@/providers/task/Task.provider";
import { Task } from "@/providers/task/Task.reducer";

const List = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/taskList");
      const tasks = await res.json();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="task-list-container">
      <TaskProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <TableComponent data={tasks} loading={loading} />
        </Suspense>
        <ModalContent />
      </TaskProvider>
    </div>
  );
};

export default List;
