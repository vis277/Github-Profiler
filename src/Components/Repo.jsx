import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { centralData } from "../App";
const Repo = () => {
  const { id } = useParams("id");

  const data = useContext(centralData);
  const { initialData } = data;
  const index = initialData.findIndex((item) => {
    return item.id == id;
  });

  return (
    <div>
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "green",
            padding: "4px",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Go to Home
        </Link>
      </div>
      <div style={{ display: "flex", gap: "3em", alignItems: "center" }}>
        <div>
          <div>
            <img
              src={initialData[index].owner.avatar_url}
              alt="Loading"
              style={{ height: "100px", width: "100px" }}
            />
          </div>
          <p style={{ fontWeight: "800", fontFamily: "sans-serif" }}>
            Verified by Github
          </p>
          <p style={{ fontFamily: "sans-serif" }}>
            GitHub confirms that this app meets the requirement for verification
          </p>
        </div>
        <div>
          <p style={{ fontWeight: "800", fontFamily: "sans-serif" }}>
            Application
          </p>
          <p style={{ fontWeight: "800", fontFamily: "sans-serif" }}>
            Name : {initialData[index].name}
          </p>
          <p style={{ fontWeight: "800", fontFamily: "sans-serif" }}>
            Description : {initialData[index].description}
          </p>
          <div>
            <button
              style={{
                height: "5vh",
                width: "12vw",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Set up a plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Repo;
