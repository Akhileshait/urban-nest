import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quod
            doloribus tenetur officia quam vel dolores laboriosam quo neque
            quibusdam alias recusandae, quisquam, ipsam a adipisci earum.
            Impedit, omnis praesentium.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
