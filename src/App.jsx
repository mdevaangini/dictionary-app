import "./App.css";
import { DictionaryCard } from "./components/dictionary-card";
import { useFetchDictionaryData } from "./hooks/use-fetch-dictionary-data";

// browsers (chome, firefox, safari etc), servers (NodeJS, Bun.JS)
//
// browsers api
// -> DOM api -> getElementById, createElement
// -> URL, URLSearchParams, fetch // adopt

function App() {
  const { fetchData, response, loading } = useFetchDictionaryData();
  const [successData, errorData] = response;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputValue = formData.get("input");
    await fetchData(inputValue);
  }

  return (
    <div className={"dictionary"}>
      <h2 className="dictionary__heading">Dictionary App</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="input">
          Word
        </label>
        <input
          className="form__input"
          id="input"
          type="text"
          name="input"
          placeholder="Enter a word..."
        />
        <button className="form__button" type="submit">
          Search
        </button>
      </form>
      {loading && <p className="dictionary__loading">Loading...</p>}
      {errorData && <p className="dictionary__error">{errorData.title}</p>}
      <main className="dictionary__list">
        {successData?.map((item, index) => {
          return <DictionaryCard key={index} response={item} />;
        })}
      </main>
    </div>
  );
}

export default App;
