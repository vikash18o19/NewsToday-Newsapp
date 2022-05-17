import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    
    static defaultProps ={
        country: 'in',
        pageSize: '20',
        category: 'general',
        api: '67f4e8d2aef446adbeb787f496d920a2'
    }

    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        api: PropTypes.string
    }

    constructor(){
        super();
        console.log("hello i am constructor from news.js")
        this.state={
                articles: [],
                loading: false,
                page:1,
                
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({loading:false})
        this.setState({
            articles: parsedData.articles,
            results: parsedData.totalResults
        })
    }

    handleNextClick= async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({loading:false})
        this.setState({
            page:this.state.page+1,
            articles: parsedData.articles,
            results: parsedData.totalResults
        })
    }

    handlePrevClick= async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({loading:false})
        this.setState({
            page:this.state.page-1,
            articles: parsedData.articles,
            results: parsedData.totalResults
        })
    }



  render() {
    return (
      <div className='container my-4'>
          {this.state.loading && <Spinner/>}
          <div>
                <h2 className='text-center' style = {{margin: "40px 0px"}}>NewsToday - Top Headlines - {this.props.category}</h2>
          </div>
          
          <div className='row my-4'>
              {!this.state.loading && this.state.articles.map((element)=>{
                    return <div key={element.url} className='col-md-4'>
                        <NewsItem title = {element.title} description = {element.description?element.description.slice(0,88):""} 
                        imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
              })}
              
              
          </div>
          <div className='container d-flex justify-content-between'>
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-4 my-4" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page>=(this.state.results/this.props.pageSize?this.state.results/this.props.pageSize:this.state.results%this.props.pageSize+1)}
                type="button" className="btn btn-dark mx-4 my-4" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        
      </div>
    )
  }
}

export default News