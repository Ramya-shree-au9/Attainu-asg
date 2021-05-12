import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './display.scss'
import Display from './Displayusers'
import Header from './Header'
import Pagination from "react-js-pagination";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from '../Loader'

const App=(props)=>{
    const [posts,setPosts] =useState([])
    const [postPerPage] = useState(500);
    const [activePage,setActivePage] = useState(9)
    const [filteredData,setFilterData]=useState()
    const [update,setUpdate]=useState(false)

    useEffect(() => {
      const fetchPosts=async()=>{
        const res = await axios.get('http://localhost:5000/users')
        setPosts(res.data);
        setUpdate(false)           
        localStorage.setItem("lastId",res.data[res.data.length-1].Id)
      }
      fetchPosts()
    }, [])

    useEffect(()=>{
        const fetchPosts=async()=>{
            const res = await axios.get('http://localhost:5000/users')
            setPosts(res.data);
            setUpdate(false)  
            setFilterData('')         
            localStorage.setItem("lastId",res.data[res.data.length-1].Id)   
        }
        fetchPosts()
    },[update])

    const indexOfLastPost = activePage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost)
   
    const handlePageChange=(pageNumber)=> {
      setActivePage(pageNumber); 
    }

    return(
      <React.Fragment>
        {posts.length > 5?
        <div className='contents'>
         
            <Header posts={currentPosts} alldata={posts}  history={props.history} filter={(data)=>{setFilterData(data)}} />
            <div>
            <Display posts={filteredData || currentPosts} history={props.history} 
            updates={(data)=>{setUpdate(data)}} length={posts.length}/>
            </div>
            <div className='pagecontent'>
            {filteredData?<div></div>:
            
            <center ><Pagination
              activePage={activePage}
              itemsCountPerPage={postPerPage}
              totalItemsCount={posts.length}
              pageRangeDisplayed={15}
              onChange={handlePageChange}
            
            /></center>
            }
        
      </div>
      </div>:
      <center><Loader/></center>}
      </React.Fragment>
        
    )
}

export default App
