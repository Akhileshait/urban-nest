import "./listPage.scss";

import Filter from "../../components/filter/Filter.jsx";
import Card from "../../components/card/card.jsx";
import Map from "../../components/map/map.jsx";

import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const posts = useLoaderData();

  console.log(posts);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

          <Suspense fallback={<div>Loading...</div>}>
            <Await
              resolve={posts?.postResponse}
              errorElement={<div>Error loading post!</div>}
            >
              {(postResponse) =>
                postResponse?.data.map((item) => (
                  <Card key={item._id} item={item} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="mapContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={posts?.postResponse}
            errorElement={<div>Error loading post!</div>}
          >
            {(postResponse) => <Map items={postResponse?.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
