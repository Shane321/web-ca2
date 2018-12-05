//
// Imports
//
import {withRouter} from 'next/router'

// Import fetch library
import fetch from "isomorphic-unfetch";

//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = "9102578f6e0b4430b8376be3365c29f9";

// Initial News source

const defaultNewsSource = "";

//
// async method fetches and returns data from a url
//
async function getNews(url) {
  // try fetch and catch any errors
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return data;
  } catch (error) {
    // return error if it occurs
    return error;
  }
}

//
//  The News page defined as an ES6 Class
//
class Article extends React.Component {
  // Constructor
  // Recieve props and initialise state properties
  constructor(props) {
    super(props);
    this.state = {};
  }

  //
  // render() method generates the page
  //
  render() {
    // Position in articles array to use 
    let id = 0;

    // Get single article
    let article = this.props.articles[id];

    return (
      <div>
        {/* Display a title based on source */}
        <h3>{defaultNewsSource.split("-").join(" ")}</h3>
        
        <div>
          {/* Show the article) */}
          <section>
         
          <p><h3>Title: </h3>{article.title}</p>
          <p><h3>Author: </h3>{article.author}</p><p><h3>Published: </h3>{article.publishedAt}</p>
          <p><img src={article.urlToImage} alt="article image" className="img-article"></img></p>
          <p>{article.description}</p>
          <p>{article.content}</p>

          </section>
          
        </div>
        <style jsx>{`
              /* CSS for this page */
              section {
                width: 50%;
                border: 6px solid #585858;
                border-radius: 8px 8px 8px 8px;
                background-color: #f0f0f0;
                padding: 4em;
                margin: 10em;
                top: 50%;
                left: 50%;
                margin-top: 30px;
                margin-left: 280px;
                position: inline;
              }

            .author {
                font-style: italic;
                font-size: 0.8em;
                color: bold black;
              }
            .img-article {
                width: 100%;
                padding: 1px;
                margin-top: 10px;
                border: 3px solid #585858;
                border-radius: 8px 8px 8px 8px;
              }

              .content{
                font-style: "Times new roman";   
                }

                .description{
                  font-style: "Times new roman";
                
                }

            .newsMenu {
              display: inline-table;
              flex-direction: row;
              margin: 5px;
              padding: 15px;
              margin-top: 20px;
              top: 50%;
              left: 50%;
              position: inline;
              margin-top: 10px;
              margin-left: 300px;
                 
            }
            .newsMenu li {
              margin-left: -302px;
              padding-left: -90px;

            }

            .newsMenu li a {
              font-size: 1em;
              color: #101010;
              display: block;
              position: inline;
              text-decoration: none;
              font-family:"Times New Roman";
              font-size: 18px;
              width: 200px;
              margin-top: 5px;
              margin-left: -12px;
              background: #f0f0f0;
              border: 1.2px solid #585858;
              border-right: 2px solid gray;
              border-left: 2px solid gray;
              border-radius: 8px 8px 8px 8px;
              padding: 10px 5px
              
              
            }

            .newsMenu li a:hover {
              color: green;
              text-decoration: underline;
            }
          `}</style>

        
      </div>
    );
  }

  //
  // Get initial data on server side using an AJAX call
  // This will initialise the 'props' for the News page
  //
  static async getInitialProps(res) {
    // Build the url which will be used to get the data
    const apikey = "9102578f6e0b4430b8376be3365c29f9";

    const defaultNewsSource = "mtv-news"

    
    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      };
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data);
      if (response) {
        response.statusCode = 400;
        response.end(data.message);
      }
    }
  }
} // End class

export default withRouter(Article)