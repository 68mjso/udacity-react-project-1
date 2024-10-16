import { update } from "../../BooksAPI";

export default function Book(props) {
  const { e, callback, listBooks } = props;

  const onChangeBookShelf = (val, el) => {
    const id = el.id;
    const book = listBooks.find((e) => e.id === id);
    if (!book) {
      return;
    }
    update(book, val).then(() => {
      callback();
    });
  };

  const renderBookOption = (el) => {
    return (
      <select
        name="shelf"
        value={el?.shelf ?? "none"}
        onChange={(e) => {
          onChangeBookShelf(e.target.value, el);
        }}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        {el.shelf && el.shelf !== "none" ? (
          <option value="none">None</option>
        ) : null}
      </select>
    );
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${e?.imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">{renderBookOption(e)}</div>
        </div>
        <div className="book-title">{e?.title}</div>
        <div className="book-authors">
          {e.authors ? e.authors.join(",") : "Unknown"}
        </div>
      </div>
    </li>
  );
}
