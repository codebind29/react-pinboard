import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "gif"];
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.search.activeTab);
  return (
    <div className="tabs">
      {tabs.map((elem) => {
        return (
          <button
            className={activeTab === elem ? "active" : ""}
            key={elem}
            onClick={() => {
              dispatch(setActiveTab(elem));
            }}
          >
            {elem === "gif" ? "GIFs" : elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
