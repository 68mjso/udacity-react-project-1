import { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../AppContext";
import { getAll, search } from "../../BooksAPI";
import Book from "../../components/Book";
import { debounce } from "lodash";
export default function Search() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  const appContext = useContext(AppContext);
  const { searchInput, setSearchInput, searchList, setSearchList } = appContext;
  useEffect(() => {
    debounceInput(searchInput);
  }, [searchInput]);

  const debounceInput = useCallback(
    debounce((searchInput) => {
      if (!searchInput || searchInput.trim() === "") {
        return;
      }
      getData(searchInput);
    }, 1000),
    []
  );

  const getData = (input) => {
    getAll().then((listBooks) => {
      search(input, 10).then((data) => {
        if (!data) {
          setSearchList([]);
          return;
        }
        for (let i = 0; i < listBooks.length; i++) {
          const id = listBooks[i].id;
          const book = data.find((e) => e.id === id);
          if (!book) {
            continue;
          }
          const index = data.map((e) => e.id).indexOf(id);
          data[index]["shelf"] = listBooks[i]["shelf"];
        }
        setSearchList(data);
      });
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
      {searchInput && searchInput.trim() !== "" ? (
        <div className="search-books-results">
          <ol className="books-grid">
            {searchList && searchList.length > 0
              ? searchList.map((e, i) => (
                  <Book
                    key={`current-${i}`}
                    e={e}
                    callback={() => {
                      getData(searchInput);
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
