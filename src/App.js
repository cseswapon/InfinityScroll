import "./App.css";
import { Fragment, useEffect, useState } from "react";
import Card from "./Components/Card/Card";

function App() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const getMovieData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const data = await res.json();
    console.log(data);
    setMovie((prev) => [...prev, ...data]);
    // setMovie(data)
    setLoading(false);
  };
  useEffect(() => {
    getMovieData();
  }, [page]);
  const handelInfiniteScroll = async () => {
    try {
      // console.log('Scroll Height', document.documentElement.scrollHeight);
      // console.log('Window Height', window.innerHeight);
      // console.log('Scroll Top', document.documentElement.scrollTop);

      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
  return (
    <Fragment>
      <h2
        style={{
          textAlign: "center",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        This is a Infinity Scroll With a API Calling
      </h2>
      <Card props={movie} />
      {loading && (
        <p style={{ textAlign: "center", marginTop: "2%", marginBottom: "2%" }}>
          loading...
        </p>
      )}
    </Fragment>
  );
}

export default App;
