"use client";

import { getTodo } from "@/services/auth.service";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: getTodo,
  });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      {data && (
        <ul>
          {data.todos.map((todo: any) => (
            <li key={todo.id}>{todo.todo}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
