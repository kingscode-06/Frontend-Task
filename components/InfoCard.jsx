import Image from "next/image";

const InfoCard = ({ ride }) => {
  return (
    <div className="my-3 px-7 py-6 flex rounded-xl bg-stone-800">
      <div>
        <div className="bg-neutral-700 h-36 w-64 rounded-md">
          <Image
            src={ride.map_url}
            alt="map"
            height={144}
            width={256}
            className="rounded-md z-0"
          />
        </div>
      </div>
      <div className="flex-1 pl-8 text-lg">
        <div>Ride Id: {ride.id}</div>
        <div>Origin Station: {ride.origin_station_code}</div>
        <div>Station Path: {`[${ride.station_path}]`}</div>
        <div>Date: {ride.date}</div>
        <div>Distance: {ride.distance}</div>
      </div>
      <div className="flex gap-x-4 text-xs">
        <div className="bg-stone-900 h-fit px-3 py-1 rounded-full">
          {ride.city}
        </div>
        <div className="bg-stone-900 h-fit px-3 py-1 rounded-full">
          {ride.state}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
