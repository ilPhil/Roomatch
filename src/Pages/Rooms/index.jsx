import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Rooms.module.scss";
import RoomCard from "../../components/RoomCard/RoomCard";
import { httpPOST } from "../../libs/http";
import CitiesFilter from "./../../components/CitiesFilter";
import PlaceHolder from "../../components/PlaceHolder";

const Rooms = () => {
  const user = useSelector(state => state.user);
  const [roomsList, setRoomList] = useState([]);
  const [result, setResult] = useState(false);
  const [filter, setFilter] = useState({
    city: user.city,
    town: user.town,
  });

  useEffect(() => {
    httpPOST("/getrooms", user.iam).then(data => setRoomList(data));
  }, [user.iam]);

  const setNoFilter = () => {
    setFilter({
      city: null,
      town: user.town
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.filter}>
        <CitiesFilter
          filter={filter}
          setResult={setResult}
          setFilter={setFilter}
          town={user.town}
          city={user.city}
        />
        <button className={styles.clearFilterBtn} onClick={setNoFilter}>No filter</button>
      </div>
      {roomsList.map(
        room =>
          !user.matches.map(item => item.roomId).includes(room._id) &&
          room.roomOwner !== user._id &&
          (filter.city
            ?
            (
              filter.city === room.city && (
                <RoomCard setResult={setResult} filter={filter.city} room={room} key={room._id} />
              )
            )
            : <RoomCard setResult={setResult} filter={filter.city} room={room} key={room._id} />
          )
      )}
      {!result && <PlaceHolder />}
    </div>
  );
};

export default Rooms;
