// Site Navigation menu
// https://www.sitepoint.com/responsive-fluid-width-variable-item-navigation-css/
// https://www.w3schools.com/Css/css_navbar.asp

import Link from 'next/link';

const Nav = () => (
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Home</a></Link></li>
            <li><Link href="/news"><a>News</a></Link></li>
            <li><Link href="/business"><a>Business</a></Link></li>
            <li><Link href="/sport"><a>Sport</a></Link></li>
            <li><Link href="/entertainment"><a>Entertainment</a></Link></li>
           </ul>
       </nav>
       {/* Define css for this page or component */}
       {/* Note back ticks `` surrounding css are required */}
       <style jsx>{`
        nav {
            max-width: 900px;
            background: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 8px 8px 8px 8px;
            border-right: 0px;
            top: 50%;
            left: 50%;
            position: inline;
            margin-top: 10px;
            margin-left: 230px;
            
        }


        nav ul {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            list-style: none;
            float: left;
            flex-grow: 1;
            text-align: center;
            border-left: 2px solid #fff;
            border-right: 2px solid #ccc;
            width: 16.6667%; /* fallback for non-calc() browsers */
            width: calc(100% / 6);
            box-sizing: border-box;
            
        }

        nav ul li:first-child {
            border-left: none;
            border-right: none;
        }

        nav ul li a {
            font-size: 1em;
            display: block;
            font-family:"Times new roman";
            text-decoration: none;
            color: #101010;
            padding: 5px 0;
            
        }

        nav ul li:hover {
            background: slategray;
        }
        nav ul li a:hover {
            color: white;
        }

        `}</style>
   </div> 
)

export default Nav;

