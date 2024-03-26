import { generationList, typesList, sortList } from "@/utils/optionList";
import { useSearchForm } from "@/components/SearchForm/";

// UI
const SearchForm = () => {
  const { fieldKeyword, fieldGeneration, fieldSort, fieldType } =
    useSearchForm();
  return (
    <form className="grid md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[20px]">
      <div>
        <label
          // เลือกที่ไหน
          htmlFor="generation"
          className="block mb-2 text-mb font-medium text-white"
        >
          Generation
        </label>
        <select
          {...fieldGeneration}
          id="generation"
          className="bg-gray-700 capitalize border border-gray-500 text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block w-full p-2 "
        >
          {generationList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`generation-key-${index}`}
                value={index}
              >
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="type"
          className="block mb-2 text-mb font-medium text-white"
        >
          Type
        </label>
        <select
          {...fieldType}
          id="type"
          className="bg-gray-700 capitalize border border-gray-500 text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block w-full p-2 "
        >
          {typesList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`types-key-${index}`}
                value={item}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="sort"
          className="block mb-2 text-mb font-medium text-white"
        >
          Sort By
        </label>
        <select
          {...fieldSort}
          id="sort"
          className="bg-gray-700 capitalize border border-gray-500 text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block w-full p-2 "
        >
          {sortList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`sort-key-${index}`}
                value={item}
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="search"
          className="block mb-2 text-mb font-medium text-white"
        >
          Search
        </label>
        <input
          {...fieldKeyword}
          id="search"
          className="bg-gray-700 capitalize border border-gray-500 text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-cyan-500 block w-full p-2 "
          placeholder="Search"
        />
      </div>
    </form>
  );
};

export default SearchForm;
