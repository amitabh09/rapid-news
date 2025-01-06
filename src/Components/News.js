import React from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState,useEffect } from 'react';

import { xapi } from '../Apikey';
import '../App.css';
import Spinner from './Spinner';

const News =(props)=>
{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const updateNews = async()=>
    {
        //this.setState({loading:true});
        props.setProgress(0);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${xapi}&page=${page}&pageSize=${props.pageSize}`;
        // const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=2c9e59abe4474363b648fcadc0ebb456';
        props.setProgress(30);
        const data= await fetch(url);
        console.log("1 step");
        props.setProgress(50);
        const parsedData= await data.json();
        console.log("2 step");
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setPage(page+1)
        //this.setState({articles : parsedData.articles,totalResults:parsedData.totalResults,loading:false,page:page+1});
        props.setProgress(100);
        console.log("news end");
        
    }

    const fetchMoreData = async() =>
    {
        //this.setState({page:page+1});
        //this.setState({loading:true});
        //props.setProgress(0);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${xapi}&page=${page}&pageSize=${props.pageSize}`;
        // const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=2c9e59abe4474363b648fcadc0ebb456';
        const data= await fetch(url);
        const parsedData= await data.json();
        //console.log(parsedData.articles);
        //props.setProgress(100);
        setArticles(articles.concat(parsedData.articles))
        setLoading(false)
        setPage(page+1)
        //this.setState({articles : articles.concat(parsedData.articles),totalResults:parsedData.totalResults,loading:false,page:page+1});
    }

    useEffect(() => {
        let x=props.category;
        x=x.charAt(0).toUpperCase()+x.slice(1)
        document.title=`${x}-Rapid News`
        updateNews();
    }, [])

        return (
            <>
            <h1 className='text-center' style={{marginTop:'100px'}}>Rapid News - Top {(props.category).charAt(0).toUpperCase()+(props.category).slice(1)} Headlines</h1>
            {loading && <Spinner />}
            {/* <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}> */}
            <div className='container my-3'>
            <div className='row'>
            {
                articles?
                articles.map((element)=>{
                    console.log(element.title)
                    return  <div className='col-md-4' key={element.url}>
                                <NewsItem
                                title={element.title?element.title.slice(0,45):"No Title"}
                                imageUrl={element.urlToImage?element.urlToImage:"https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source.name}
                                description={element.description?element.description.slice(0,100):"No Description"} />
                            </div>
                    })
                :console.log("nahi hai")
            }
            </div>
            </div>
            {/* </InfiniteScroll> */}
        </>
    )
}

export default News

