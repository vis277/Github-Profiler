import { useContext, useEffect } from "react";
import { useState } from "react";
import { json, useNavigate, useSearchParams } from "react-router-dom";
import { centralData } from "../App";
import { initialDetails } from "../App";
import { follower } from "../App";
import { getUserRepos, getUserDetail } from "../services/apiMiddleware";
const Search = () => {
  const contextData = useContext(centralData);
  const { initialData, setInitialData } = contextData;

  const initialContextDetails = useContext(initialDetails);
  const { initialDetail, setInitialDetail } = initialContextDetails;

  const navigate = useNavigate();
  const [search, setSerch] = useState("");

  const [list, setList] = useState([]);

  const [visible, setVisible] = useState(false);

  const [userData, setUserData] = useState({});

  const followerData = useContext(follower);
  const { followers, setFollowers } = followerData;

  const [searchParam, setSearchParam] = useSearchParams();
  const userName = searchParam.get("q");

  const handleInput = (e) => {
    setSerch(e.target.value);
  };

  const handleSearch = async () => {
    const userDetails = await getUserDetail(search || userName);
    const userRepos = await getUserRepos(search || userName);

    setInitialData(userRepos);
    setUserData(userDetails);
    setVisible(true);

    return;
  };

  const handleRedirect = (id) => {
    navigate(`/${id}`);
  };

  const handleFollowers = (id) => {
    const url = userData.followers_url;

    async function getDetails() {
      let result = await fetch(url)
        .then((result) => result.json())
        .then((data) => {
          setFollowers([...data]);
        });
    }
    getDetails();
    navigate(`/follower?q=${search}`);
  };

  useEffect(() => {
    (async () => {
      if (!userName) {
        return;
      }
      const userDetails = await getUserDetail(search || userName);
      const userRepos = await getUserRepos(search || userName);

      setInitialData(userRepos);
      setUserData(userDetails);
      setVisible(true);
    })();

    setSerch(userName);
  }, [userName]);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={handleInput}
        style={{
          width: "18vw",
          height: "6vh",
          outline: "none",
          borderRadius: "8px",
          fontFamily: "sans-serif",
        }}
      ></input>
      <button
        onClick={handleSearch}
        style={{
          width: "90px",
          height: "6vh",
          marginLeft: "20px",
          borderRadius: "6px",
          backgroundColor: "coral",
          border: "transparent",
          cursor: "pointer",
          fontFamily: "sans-serif",
          fontWeight: "700",
        }}
      >
        Search
      </button>
      {visible ? (
        <div
          style={{
            display: "flex",
            backgroundColor: "bisque",
            justifyContent: "center",
            alignItems: "center",
            margin: "1em",
            flexDirection: "column",
            gap: "1em",
            borderRadius: "24px",
          }}
        >
          <img
            src={userData.avatar_url}
            alt="Loading..."
            style={{ height: "100px", width: "100px", padding: "1em" }}
          />

          <div style={{ fontSize: "26px", fontWeight: "600", color: "blue" }}>
            {userData.name}
          </div>
          <div style={{ fontSize: "18px", fontWeight: "600" }}>
            {userData.bio}
          </div>
          <div>
            <button
              onClick={() => handleFollowers(userData.id)}
              style={{
                width: "20vw",
                cursor: "pointer",
                borderRadius: "20px",
                outline: "none",
                borderColor: "transparent",
                backgroundColor: "coral",
                padding: "6px",
                margin: "4px",
                fontWeight: "700",
              }}
            >
              Followers
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          gap: "2em",
          flexWrap: "wrap",
          backgroundColor: "#c0c0c02b",
        }}
      >
        {visible
          ? initialData.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    // backgroundColor: "bisque",
                    borderRadius: "12px",
                    padding: "1em",
                    width: "40vw",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={() => handleRedirect(item.id)}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <div>
                      <img
                        src={item.owner.avatar_url}
                        alt="loading"
                        style={{
                          height: "150px",
                          width: "150px",
                        }}
                      ></img>
                    </div>
                    <div style={{ margin: "2em" }}>
                      <div
                        style={{
                          margin: "1em",
                          fontWeight: "700",
                          color: "blue",
                          fontSize: "26px",
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontFamily: "sans-serif" }}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : []}
      </div>
    </>
  );
};

export default Search;
