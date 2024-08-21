import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from './ErrorBoundary';

// import TodoForm from 'todoform_app/TodoForm'
// import TodoList from 'todolist_app/TodoList'

const TodoForm = React.lazy(() => import("todoform_app/TodoForm"));
const TodoList = React.lazy(() => import("todolist_app/TodoList"));
import { Suspense } from "react";


function App() {
  const list = (<ErrorBoundary >
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <TodoList />
                  </Suspense>
              </ErrorBoundary>);
  const add = (<ErrorBoundary >
                <Suspense fallback={<h1>Loading...</h1>}>
                  <TodoForm />
                </Suspense>   
              </ErrorBoundary>);
  const edit = (<ErrorBoundary >
                <Suspense fallback={<h1>Loading...</h1>}>
                  <TodoForm type="edit" />
                </Suspense> 
              </ErrorBoundary>); 

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            list
          }
        />
        <Route
          path="/add"
          element={
            add
          }
        />
        <Route
          path="/edit/:id"
          element={
            edit
          }
        />
      </Routes>
    </div>
  );
}

export default App;