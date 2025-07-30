import { use, useEffect, useState } from "react";
import "./App.css";
import logo from "./images/unsplash-logo.png";
function App() {
  const [keyword, setKeyword] = useState("illusion");
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [access, setAccess] = useState(
    "8Ez01s8MPTUf_CnBbgdaIlvPfmFtmz9GTiVUkkzlPiA"
  );
  const [results, setResults] = useState([]);
  const [imgsPerPage, setImgsPerPage] = useState(12);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (value) {
      setKeyword(value);
      setPage(1);
    }
  };


  const searchByKeywordClick = (text) => {
    setKeyword(text)
    setPage(1)
  }

  const handlePage = (action) => {
    if (action === "add") {
      setPage((prev) => prev + 1);
      scrollTo(0, 0);
    }

    if (action === "minus") {
      if (page != 1) {
        setPage((prev) => prev - 1);
        scrollTo(0, 0);
      }
    }
  };

  const searchImage = async () => {
    const API = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access}&per_page=${imgsPerPage}`;

    // console.log(API);

    const res = await fetch(API);
    const data = await res.json();
    setResults(data.results);
  };

  useEffect(() => {
    searchImage();
  }, [keyword, page]);

  return (
    <div className="app">
      <section className="heading">
        <h1>
          <img className="logo" src={logo} alt="" />
          Unsplash Images
        </h1>
        <p>
          "Built an image gallery using Unsplash API, enabling search,
          display, and download of high-quality photos."
        </p>
      </section>

      <section className="search-area">
          <img src={logo} alt="" />
        <form onSubmit={handleFormSubmit}>
          <div className="text-field">
            <input
              type="text"
              placeholder="Search Image"
              onChange={(e) => setValue(e.target.value)}
            />
            <button><i className="uil uil-search-alt"></i></button>
          </div>
        </form>
      </section>

      <section className="suggestions">
        <p className="suggestion"
          onClick={() => searchByKeywordClick('all')}
        >All</p>
      
        <p className="suggestion"
          onClick={() => searchByKeywordClick('Phone Wallpaper')}
        >Phone Wallpaper</p>
        <p className="suggestion"
          onClick={() => searchByKeywordClick('Desktop Wallpaper')}
        >Desktop Wallpaper</p>
        <p className="suggestion"
          onClick={() => searchByKeywordClick('portrait')}
        >Portraits</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Illustration')}>Illustration</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Abstract')}>Abstract</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Nature')}>Nature</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Animals')}>Animals</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Moon')}>Moon</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Photography')}>Photography</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Street Photography')}>Street Photography</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('3d Renders')}>3d Renders</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Textures')}>Textures</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Architecture')}>Architecture</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Travel')}>Travel</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Food and Drink')}>Food & Drink</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Film')}>Film</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Earth')}>Earth</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Sports')}>Sports</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Cars')}>Cars</p>
        <p className="suggestion" onClick={() => searchByKeywordClick('Bikes')}>Bikes</p>
      </section>

      <section className="result-container">
        <div className="result-content">
          {keyword &&
            results.map((item, key) => {
              return (
                <div key={key} className="image" >
                  <img src={item.urls.small} alt="" />
                  <p>{item.width} x {item.height}</p>
                  <div className="buttons">
                    <a href={item.links.download} download><i className="uil uil-image-download"></i> Download</a>
                    <a href={item.links.download} target="_blank">
                    <i className="uil uil-eye"></i>View Image
                    </a>
                  </div>

                  {/* <div className="overlay">
                    <a href={item.links.download} target="_blank" download>
                      Download Direct
                    </a>
                    <a href={item.links.html} target="_blank">
                      Download on Unsplash
                    </a>
                  </div> */}
                </div>
              );
            })}
        </div>

        {keyword && (
          <div className="loadmore">
            <button onClick={() => handlePage("minus")}>
            <i className="uil uil-angle-left-b"></i>
            </button>
            <p>{page}</p>
            <button onClick={() => handlePage("add")}>
            <i className="uil uil-angle-right-b"></i>
            </button>
          </div>
        )}
      </section>

      <footer>
        <p>Powered By <a href="https://linkedin.com/in/shaik-sohail-ba49351b3"> Shaik Sohail</a> </p>
      </footer>
    </div>
  );
}

export default App;
