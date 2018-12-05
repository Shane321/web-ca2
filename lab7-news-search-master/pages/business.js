// Passing from child to parent
// https://www.robinwieruch.de/react-pass-props-to-component/#react-props

//
// Imports
//

// This is the Link API
import Link from 'next/link';
// Import fetch library
import fetch from 'isomorphic-unfetch';
// mport SearchForm Component
import SearchForm from '../components/SearchForm';


//(free version) API key from  https://newsapi.org/
// Get your own key!
const apiKey = '9102578f6e0b4430b8376be3365c29f9';

// Initial News source
const defaultNewsSource = 'business-insider-uk';

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
    return (data);
  } catch (error) {
    // return error if it occurs
    return (error);
  }
}

//
//  The News page defined as an ES6 Class
//
export default class News extends React.Component {

  // Constructor
  // Recieve props and initialise state properties
  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }
  // This function is passed to the SearchForm and used the get the value entered
  // This value will be used to generate the api url
  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
    })
  }

  // Get all articles by searching for keyword(s)
  // https://newsapi.org/docs/endpoints/
  //
  searchNewsAPI = (event) => {
    // set state values - this will trigger an update and componentDidUpdate
    this.setState({
      // Get the link text
      newsSource: `${event.target.innerText}`,
      // Build the search URL using the link name
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
    })
    console.log(this.state.url);
  }

  //
  // render() method generates the page
  //
  render() {

    // if state.articles is empty copy props to it
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }
    return (
      <div>
        { /* Add the SearchForm component */}
        { /* Pass the setNewsSource function as a prop with the same name*/}
        <SearchForm setNewsSource={this.setNewsSource} />

        { /* Example search links - note using name attribute for parameters(!!) */}
        <ul className="newsMenu">
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=business">Business News Ireland</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?sources=financial-times">Finance</a></li>
          <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?sources=cnbc">Stock Market</a></li>
        </ul>
        { /* Display a title based on source */}
        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>
          { /* Iterate through articles using Array map) */}
          { /* Display author, publishedAt, image, description, and content */}
          { /* for each story. Also a link for more.. */}
          { /* the map index property gives the position in the array for each article - see the link below */}
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author} {article.publishedAt}</p>
              <img src={article.urlToImage} alt="article image" className="img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              { /* adding the index value as a paramater to be passed with a request for the single article page*/}
            <button><p><Link as={`/article/${index}`} href={`/article?id=${index}`}><a>Read More</a></Link></p></button> 
            </section>
          ))}
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
                margin-top: -230px;
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

                button{
                  margin-left: 270px;
                  margin-bottom: 10px;
                 
                }

                button:hover{
                  background-color: gray;
                  color: gray;
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
  static async getInitialProps(response) {

    // Build the url which will be used to get the data
    const apikey = "9102578f6e0b4430b8376be3365c29f9";

    const defaultNewsSource = "business-insider-uk"

    const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;

    // Get news data from the api url
    const data = await getNews(defaultUrl);

    // If the result contains and articles array then it is good so return articles
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    // Otherwise it contains an error, log and redirect to error page (status code 400)
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  }

  // componentDidUpdate is called when the page state or props re updated
  // It can be over-ridden to perform other functions when an update occurs
  // Here it fetches new data using this.state.newsSource as the source
  async componentDidUpdate(prevProps, prevState) {

    // Check if newsSource url has changed to avoid unecessary updates 
    if (this.state.url !== prevState.url) {

      // Use api url (from state) to fetch data and call getNews()
      const data = await getNews(this.state.url);

      // If the result contains and articles array then it is good so update articles
      if (Array.isArray(data.articles)) {
        // Store articles in state
        this.state.articles = data.articles;
        // Force page update by changing state (make sure it happens!)
        this.setState(this.state);
      }
      // Otherwise it contains an error, log and redirect to error page (status code 400)
      else {
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  } // End componentDidUpdate



} // End class


