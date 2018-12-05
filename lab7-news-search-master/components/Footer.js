// Footer component
const Footer = () => (
    <div>
        <footer>
            <p>contact information: info@newssite.com</p>
        </footer>
        <style jsx>{`
            footer {
                background-color: gray;
                max-width: 900px;
                font-size: 0.8em;
                text-align: center;
                color: black;
                clear: both;
                top: 50%;
                left: 50%;
                position: relative;
                margin-top: 10px;
                margin-left: -455px;
            }
        `}</style>
    </div> 
 )
 
 export default Footer;