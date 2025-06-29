import React from "react";

const LocationSearch = (props) => {
  return (
    <div>
      <div ref={props.displayPick}>
        {props.picksuggestion.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                props.setPick(item.description);
              }}
              className="flex gap-5 px-2 py-2 items-center w-95 border-1 rounded my-4"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
                className="h-12 w-12 bg-gray-100 p-2 rounded-full m"
              ></img>
              <h3 className="text-xl font-semibold">{item.description}</h3>
            </div>
          );
        })}
      </div>
      <div ref={props.displayDrop}>
        {props.dropsuggestion.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                props.setDrop(item.description);
              }}
              className="flex gap-5 px-2 py-2 items-center w-95 border-1 rounded my-4"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
                className="h-12 w-12 bg-gray-100 p-2 rounded-full m"
              ></img>
              <h3 className="text-xl font-semibold">{item.description}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationSearch;
