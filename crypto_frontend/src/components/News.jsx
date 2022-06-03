import React from "react"

import { useGetCryptoNewsQuery } from "../reducers/cryptoNewsApi"

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: "Cryptocurrency", count: simplified ? 5 : 15})
    
    console.log(cryptoNews)

    if(!cryptoNews?.value) return "Loading..."
    
    return(

        <div className="crypto-card-container grid grid-cols-5 gap-5">
            {cryptoNews.value.map((news, i) => (
                 <div class="card card-compact w-96 h-64 shadow" key={i}>
                     <a href={news.url} target="_blank" rel="noreferrer" >
                         <div className="news-image-container">
                             <h1 className="font-bold">{news.name}</h1>
                             <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                         </div>
                         <p className="text-sm">{news.description.length >100 ? `${news.description.substring(0,100)}...` : news.description}</p>
                     </a>
                 </div>
            ))}
        </div>
    )
}

export default News