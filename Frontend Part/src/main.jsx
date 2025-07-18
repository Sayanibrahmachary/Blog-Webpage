import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.jsx';
import {createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider} from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import HomePageUser from './pages/HomePageUser.jsx';
import Profile from './components/Profile.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js'; // adjust the path as needed
import PostLayout from './components/PostsLayout.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/homePageUser' element={<HomePageUser/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/post' element={<PostLayout/>}/>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
