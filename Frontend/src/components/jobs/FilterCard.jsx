import { filterData } from "../../utils/filterData";

const FilterCard = () => {
  return (
    <div>
      <h1>Filter Jobs</h1>

      {filterData.map((filter, index) => (
        <div key={index}>
          <h3>{filter.filterType}</h3>

          {filter.options.map((option, idx) => (
            <div key={idx}>
              <input
                type="radio"
                name={filter.filterType}
                value={option}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;