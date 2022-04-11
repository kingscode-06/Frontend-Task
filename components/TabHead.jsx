import { useEffect, useState } from "react";
import axios from "axios";
import FilterDD from "./FilterDD";

const TabHead = ({ user, setShowData }) => {
  const [tabId, setTabId] = useState(0);
  const [filterData, setFilterData] = useState(null);
  const [isShowDD, setShowDD] = useState(false);
  const [data, setData] = useState(null);
  const [pastRidesCount, setPastRidesCount] = useState(0);
  const [upcomingRidesCount, setUpcomingRidesCount] = useState(0);
  const [location, setLocation] = useState({});

  useEffect(() => {
    axios.get("https://assessment.api.vweb.app/rides").then((res) => {
      let pastRides = 0;
      res.data.map((ride) => {
        const today = new Date();
        const rideDate = new Date(ride.date);
        if (today > rideDate) pastRides += 1;
      });

      setPastRidesCount(pastRides);
      setUpcomingRidesCount(res.data.length - pastRides);

      let newData = res.data.map((ride) => {
        ride.station_path.unshift(ride.origin_station_code);
        ride.station_path.push(ride.destination_station_code);
        let distance = Math.min(
          ...ride.station_path.map((v) =>
            Math.abs(v - (user?.station_code || 50))
          )
        );
        ride.distance = distance;
        return ride;
      });

      setData(newData);
      setFilterData(newData);

      let newLocation = {};
      newData.map((ride) => {
        if (!newLocation[ride.state]) newLocation[ride.state] = [];
        if (!newLocation[ride.state].includes(ride.city))
          newLocation[ride.state].push(ride.city);
      });

      setLocation(newLocation);
    });
  }, [user]);

  useEffect(() => {
    if (!filterData) return;

    let newData = filterData;
    if (tabId === 0) {
      newData.sort((a, b) => {
        const x = a.distance;
        const y = b.distance;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    } else if (tabId === 1) {
      const today = new Date();
      newData = newData
        .filter((ride) => {
          const date = new Date(ride.date);
          return date > today;
        })
        .sort((a, b) => {
          const x = new Date(a.date);
          const y = new Date(b.date);
          return x < y ? -1 : x > y ? 1 : 0;
        });
    } else if (tabId === 2) {
      const today = new Date();
      newData = newData
        .filter((ride) => {
          const date = new Date(ride.date);
          return date < today;
        })
        .sort((a, b) => {
          const x = new Date(a.date);
          const y = new Date(b.date);
          return x < y ? 1 : x > y ? -1 : 0;
        });
    }

    setShowData(newData);
  }, [filterData, tabId]);

  return (
    <div className="py-6 flex justify-between sticky top-20 bg-neutral-700 z-10">
      <div className="flex text-lg gap-x-10">
        <div
          className={`${
            tabId === 0 ? "font-semibold border-b-2" : "text-gray-300"
          } cursor-pointer`}
          onClick={() => setTabId(0)}
        >
          Nearest rides
        </div>
        <div
          className={`${
            tabId === 1 ? "font-semibold border-b-2" : "text-gray-300"
          } cursor-pointer`}
          onClick={() => setTabId(1)}
        >{`Upcoming rides (${upcomingRidesCount})`}</div>
        <div
          className={`${
            tabId === 2 ? "font-semibold border-b-2" : "text-gray-300"
          } cursor-pointer`}
          onClick={() => setTabId(2)}
        >{`Past rides (${pastRidesCount})`}</div>
      </div>
      <div
        className="flex gap-x-2 cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded-md"
        onClick={() => setShowDD(!isShowDD)}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <div>Filters</div>
      </div>
      {isShowDD && (
        <FilterDD location={location} setFilterData={setFilterData} />
      )}
    </div>
  );
};

export default TabHead;
