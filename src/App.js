import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  console.log(characters);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://www.breakingbadapi.com/api/characters?limit=12&offset=12"
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError("Could not fetch data");
        console.log(err.message);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div className="   ">
      <nav className="bg-green-800 py-8 text-white">
        <ul className="flex justify-around">
          <li>Home</li>
          <li>About</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </nav>
      {error && <p>{error}</p>}
      <h1 className="text-6xl text-center p-8 text-red-600">
        Breaking Bad Characters
      </h1>
      <div className="flex text-center flex-wrap justify-center px-3.5 pb-36">
        {characters.map((character) => (
          <div
            className="bg-green-800 flex flex-col justify-center w-72 m-8 p-8 text-white rounded-lg"
            key={character.char_id}
          >
            <h1 className="text-2xl py-2">{character.name}</h1>
            <h3 className="py-6">{character.occupation}</h3>
            <img
              className="w-36 h-36 object-cover object-top m-auto"
              src={character.img}
              alt="breaking bad characters"
            ></img>
            <h5 className="py-6">{character.status}</h5>
          </div>
        ))}
        <footer className="py-8 bg-black bottom-0 left-0 w-full fixed text-white">
          Copyright Breaking Bad
        </footer>
      </div>
    </div>
  );
};

export default App;
