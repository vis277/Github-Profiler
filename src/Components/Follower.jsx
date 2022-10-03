import { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { initialDetails } from "../App";

import { follower } from "../App";
const Follower = () => {
  const [searcParam, setSearchParam] = useSearchParams();
  const queryData = searcParam.get("q");
  const followerData = useContext(follower);
  const { followers: followerList } = followerData;
  console.log("ln11", followerList);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/?q=${id}`);
  };

  return (
    <div>
      <div
        style={{ marginBottom: "20px", textDecoration: "none", color: "black" }}
      >
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

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3em",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {followerList.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#d75555",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleClick(item.login)}
            >
              <img
                src={item.avatar_url}
                style={{ height: "100px", width: "100px", borderRadius: "50%" }}
              ></img>
              <p style={{ fontWeight: "800", fontFamily: "sans-serif" }}>
                {item.login}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Follower;
