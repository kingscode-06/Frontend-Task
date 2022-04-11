import { useState } from "react";

const FilterDD = ({ location, setFilterData }) => {
  const [filterState, setFilterState] = useState("none");
  const [filterCity, setFilterCity] = useState("none");

  return (
    <div className="bg-stone-900 px-6 py-3 w-52 absolute right-0 top-16 rounded-xl">
      <div className="p-2 border-b-2 text-gray-400 border-gray-400">
        Filters
      </div>
      <div>
        <form className="pt-5 pb-2">
          <select
            name="state"
            id="state"
            className="bg-neutral-700 w-full p-1 mb-3 rounded-md"
            onChange={(e) => {
              setFilterState(e.target.value);
              setFilterData(
                data.filter(
                  (v) => e.target.value === "none" || e.target.value === v.state
                )
              );
            }}
          >
            <option value="none">All States</option>
            {Object.keys(location)
              .sort()
              .map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
          </select>
          <select
            name="city"
            id="city"
            className="bg-neutral-700 w-full p-1 rounded-md"
            onChange={(e) => {
              setFilterCity(e.target.value);
              setFilterData(
                data.filter((v) => {
                  if (e.target.value === "none")
                    return filterState === "none" || filterState === v.state;

                  return e.target.value === v.city;
                })
              );
            }}
          >
            <option value="none">All Cities</option>
            {location[filterState]?.sort().map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default FilterDD;
