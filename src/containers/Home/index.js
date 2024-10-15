import { useNavigate } from "react-router-dom";
import { getAll, update } from "../../BooksAPI";
import { useContext, useEffect } from "react";
import "../../App.css";
import AppContext from "../../AppContext";
import Book from "../../components/Book";

export default function Home() {
  const navigate = useNavigate();
  const showSearchPage = () => {
    navigate("/search");
  };
  const appContext = useContext(AppContext);
  const {
    listBooks,
    setListBooks,
    listCurrent,
    setListCurrent,
    listWant,
    setListWant,
    listRead,
    setListRead,
  } = appContext;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAll().then((data) => {
      const arrCurrent = [];
      const arrWant = [];
      const arrRead = [];
      for (let i = 0; i < data.length; i++) {
        const book = data[i];
        switch (book["shelf"]) {
          case "currentlyReading":
            arrCurrent.push(book);
            break;
          case "wantToRead":
            arrWant.push(book);
            break;
          case "read":
            arrRead.push(book);
            break;
          default:
            break;
        }
      }
      setListBooks(data);
      setListCurrent(arrCurrent);
      setListWant(arrWant);
      setListRead(arrRead);
    });
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {listCurrent.map((e, i) => (
                    <Book
                      key={`current-${i}`}
                      e={e}
                      callback={getData}
                      listBooks={listBooks}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {listWant.map((e, i) => (
                    <Book
                      key={`want-${i}`}
                      e={e}
                      callback={getData}
                      listBooks={listBooks}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {listRead.map((e, i) => (
                    <Book
                      key={`read-${i}`}
                      e={e}
                      callback={getData}
                      listBooks={listBooks}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <a onClick={showSearchPage}>Add a book</a>
        </div>
      </div>
    </div>
  );
}
