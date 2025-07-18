import './HeaderUser.css';
import { useState,useEffect,useCallback } from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import AllPosts from './AllPosts';
import Blogs from './Blogs';
function HeaderUser()
{
    const navigate=useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [blog, setBlog] = useState(false);
    const [search,setSearch]=useState(null);

    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll); // cleanup
        };
    }, []);

    const clickHome=()=>
    {
        if(blog)
        {
            setBlog(false);
        }
    }

    const clickBlog=()=>
    {
        if(!blog)
        {
            setBlog(true);
        }
    }

    const openProfile=()=>
    {
        navigate('/profile');
    }

    const searchBasedOnTags=async()=>
    {
        try
        {
            const data={
                tags:search,
            }
            console.log(data);
            const token=localStorage.getItem("token");
            if(!token)
            {
                console.log("token is required");
            }

            const responce=await fetch(`http://localhost:8000/api/v1/posts/postsBasedOnTags`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify(data)
            })

            const result= await responce.json();
            if(responce.ok)
            {
                alert('fetched all posts successfully');
            }
            else
            {
                alert('Something went wrong');
            }
        }
        catch(e)
        {
            console.error(e);
        }
    }

    return (<>
        <div  className={`header-user ${scrolled ? 'scrolled' : ''}`}>
            <div className="leftSideHeader-user">
                <h1>BlogStore</h1>
            </div>
            <div className="rightSideHeader-user">
                <div className="searchDiv-user">
                    <div className="searchIcon-user">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#01060e",}} onClick={searchBasedOnTags}/>
                    </div>
                    <input placeholder='Search here' className='search-user' onChange={(e)=>setSearch(e.target.value)}></input>
                </div>
                <div className="sections-user">
                    <div className="home-user">
                        <NavLink to="" className="home-user" onClick={clickHome}><p>Home</p></NavLink>
                    </div>
                    <div className="blog-user" >
                        <NavLink to="" className="blog-user" onClick={clickBlog}><p>Blog</p></NavLink>
                    </div>
                    <div className="about-user">
                        <NavLink to="" className="about-user"><p>Create</p></NavLink>
                    </div>
                    <div className="circle" onClick={() => {openProfile();}}>
                            <div class="profileImage-user">
                            <img src="./src/assets/download (1).jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {blog ? <Blogs /> : <AllPosts />}


    </>)
}

export default HeaderUser;