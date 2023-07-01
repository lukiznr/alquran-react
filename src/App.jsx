import { useState } from "react";
import data from "./index.json";
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [surah, setSurah] = useState(0);
  const [ayat, setAyat] = useState(null);
  const [key, setKey] = useState(0);
  const getAyat = async (number) => {
    setAyat(null);
    setSurah(number);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/lukiznr/alquran-json/main/surah/${number}.json`
      );
      const data = await response.json();
      const value = Object.values(data)[0];
      const keys = Object.keys(value.text);
      setAyat(value);
      setKey(keys);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name_latin.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h1 className="center" style={{ margin: "5px" }}>
        Al Qur'an Web
      </h1>
      <div style={{ display: surah == 0 ? "block" : "none" }}>
        <div
          style={{
            margin: "6px",
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gridGap: "5px",
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
          />
          <button onClick={() => setSearchTerm("")}>Clear</button>
        </div>
        {data ? (
          <div className="quran-page">
            {filteredData.map((data, index) => (
              <div key={index} className="quran-details">
                <h2>
                  {data.number}. {data.name_latin}
                </h2>
                <h3 className="arab">
                  {data.name} ({data.number_of_ayah} Ayat)
                </h3>
                <button onClick={() => getAyat(data.number)}>Read Surah</button>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div style={{ display: surah == 0 ? "none" : "block" }}>
        {ayat ? (
          <div>
            <div className="quran-page">
              <button
                style={{ marginBottom: "5px" }}
                onClick={() => setSurah(0)}
              >
                Back
              </button>
              <div className="quran-details center">
                <h2>
                  Surah {ayat.name_latin} ( {ayat.number} )
                </h2>
                <h2>{ayat.name}</h2>
                <h3>
                  {ayat.number_of_ayah} ayah • {ayat.translations.id.name}
                </h3>
              </div>
              <div className="quran-details">
                {key?.map((key) => (
                  <div className="ayat" key={key}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>({key})</p>
                      <p>{ayat.text[key]}</p>
                    </div>
                    <h3>Artinya: {ayat.translations.id.text[key]}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}
