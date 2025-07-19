import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get your Dream Place</h1>
          <p>
            Dive into a world of real estate – from cozy apartments to spacious
            homes – with stunning visuals, comprehensive features, and clear
            pricing. Connect directly with sellers, bookmark your top picks, and
            effortlessly list your property, making your real estate journey
            effortless.
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
