import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../AppContext";
import { search } from "../../BooksAPI";
import Book from "../../components/Book";
export default function Search() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  const appContext = useContext(AppContext);
  const { searchInput, setSearchInput, searchList, setSearchList } = appContext;
  useEffect(() => {
    if (!searchInput || searchInput.trim() == "") {
      return;
    }
    getData();
  }, [searchInput]);

  const getData = () => {
    search(searchInput, 10).then((data) => {
      if (!data) {
        setSearchList([]);
        return;
      }
      setSearchList(data);
    });
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={goBack}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            name={searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      {searchInput && searchInput.trim() != "" ? (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchList && searchList.length > 0
              ? searchList.map((e, i) => (
                  <Book
                    key={`current-${i}`}
                    e={e}
                    callback={() => {
                      getData();
                    }}
                    listBooks={searchList}
                  />
                ))
              : null}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
