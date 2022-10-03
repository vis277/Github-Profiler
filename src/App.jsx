import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Search from "./Components/Search";

export const centralData = createContext();
const CentralDataProvider = centralData.Provider;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Repo from "./Components/Repo";
import Follower from "./Components/Follower";
export const initialDetails = createContext();
const InitialDetailsProvider = initialDetails.Provider;

export const follower = createContext();
const FollowerProvider = follower.Provider;

function App() {
  const [initialData, setInitialData] = useState([]);
  const [initialDetail, setInitialDetail] = useState([]);
  const [followers, setFollowers] = useState([]);
  return (
    <BrowserRouter>
      <CentralDataProvider value={{ initialData, setInitialData }}>
        <InitialDetailsProvider value={{ initialDetail, setInitialDetail }}>
          <FollowerProvider value={{ followers, setFollowers }}>
            <Routes>
              <Route path="/" element={<Search></Search>}></Route>
              <Route path="/:id" element={<Repo></Repo>}></Route>
              <Route path="/follower" element={<Follower></Follower>}></Route>
            </Routes>
          </FollowerProvider>
        </InitialDetailsProvider>
      </CentralDataProvider>
    </BrowserRouter>
  );
}

export default App;
