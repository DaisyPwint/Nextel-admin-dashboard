import styles from './detail.module.css';
// import { useGetRoomTypeByIdQuery } from '../../features/room-type/typeApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTypeById } from '../../features/room-type/typeSlice';

const DetailRoomType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const {data:roomDetail,isLoading,error} = useGetRoomTypeByIdQuery(id);
  const roomDetail = useSelector((state) => selectTypeById(state,parseInt(id)));
  
const renderOverview = () => (
  <>
    <p className={styles.title}>Overview</p>
    <div className={styles['overview-item']}>
      {renderOverviewItem('Price per night', `USD ${roomDetail?.pricePerNight}`, {fontWeight: 'bold',fontFamily: 'Times New Roman',fontSize: '18px'})}
      {renderOverviewItem('Size', `${roomDetail?.size} m²`)}
      {renderOverviewItem('Occupancy', roomDetail?.maximumCapacity)}
      {renderOverviewItem('Bed type', 'Double/Twin')}
    </div>
  </>
);

const renderOverviewItem = (label, value, style) => (
  <div className={styles['overview-item-container']} key={label}>
    <p>{label}</p>
    <p> : <span style={style} >  {value} </span> </p>
  </div>
);

// const renderAmenities = () => (
//   <>
//     <p className={styles.title}>In-room Amenities</p>
//     <div className={styles['amenities-item-container']}>
//       {roomDetail?.amenities.map(renderAmenity)}
//     </div>
//   </>
// );

// const renderAmenity = (amenity) => (
//   <div key={amenity.id} className={styles['amenity-item-container']}>
//     <span className='material-symbols-outlined'>{amenity.icon}</span>
//     <p>{amenity.name}</p>
//   </div>
// );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <section className={styles.section}>
      <div className={styles["img-container"]}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${roomDetail?.imageUrl})`
          }}
        >
          <div className={styles['title-container']}>
            <h2>{roomDetail?.name}</h2>
            <p>
              From <span>USD {roomDetail?.pricePerNight}</span> / per night
            </p>
          </div>
        </div>            
      </div>
      <div className={styles.container}>
        <div className={styles['overview-container']}>
          <div className={styles.overviews}>
            {renderOverview()}
          </div>
          {/* <div className={styles.amenities}>
            {renderAmenities()}
          </div> */}
        </div>
        <div>
          <p className={styles.des}>Description</p>
          <p>{roomDetail?.description}</p>
        </div>
        <div className={styles['btn-container']}>
          <p onClick={() => navigate(-1)} className={styles.btn}>Discover more room</p>
        </div>
      </div>
    </section>
  )
}

export default DetailRoomType