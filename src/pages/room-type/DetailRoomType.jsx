
import React from 'react'
import styles from './detail.module.css';
import { useGetRoomTypeByIdQuery } from '../../features/room-type/typeApiSlice';
import { useParams, Link } from 'react-router-dom';

const DetailRoomType = () => {
  const { id } = useParams();
  const {data:roomDetail,isLoading,error} = useGetRoomTypeByIdQuery(id);

  console.log(roomDetail);
  
const renderOverview = () => (
  <>
    <p className='font-serif text-3xl font-bold text-gray-100 mt-10'>Overview</p>
    <div className='flex flex-col gap-2 mt-8'>
      {renderOverviewItem('Price per night', `USD ${roomDetail?.pricePerNight}`, "font-serif text-xl font-bold")}
      {renderOverviewItem('Size', `${roomDetail?.size} m²`)}
      {renderOverviewItem('Occupancy', roomDetail?.maximumCapacity)}
      {renderOverviewItem('Bed type', 'Double/Twin')}
    </div>
  </>
);

const renderOverviewItem = (label, value, style) => (
  <div className="grid grid-cols-2 gap-10 font-medium" key={label}>
    <p>{label}</p>
    <p> : <span className={` ${style} `} >  {value} </span> </p>
  </div>
);

const renderAmenities = () => (
  <>
    <p className='font-serif text-3xl font-bold text-gray-100'>In-room Amenities</p>
    <div className='grid md:grid-cols-3 grid-cols-2 gap-4 mt-8'>
      {roomDetail?.amenities.map(renderAmenity)}
    </div>
  </>
);

const renderAmenity = (amenity) => (
  <div key={amenity.id} className='capitalize flex items-center gap-2 text-gray-100'>
    <span className='material-symbols-outlined'>{amenity.icon}</span>
    <p>{amenity.name}</p>
  </div>
);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className='pb-12 text-left'>
      <div className="flex justify-center items-center">
        <div
          className="bg-cover bg-center h-96 w-full relative"
          style={{
            backgroundImage: `url(${roomDetail?.imageUrl})`
          }}
        >
          <div className='text-secondary-100 font-serif absolute bottom-0 left-1/2 transform -translate-x-1/2 py-2 px-8 bg-black/10 backdrop-blur text-center'>
            <h2 className='text-4xl mb-1 capitalize'>{roomDetail?.name}</h2>
            <p className='font-gsans'>
              From <span className='font-bold font-serif text-xl'>USD {roomDetail?.pricePerNight}</span> / per night
            </p>
          </div>
        </div>            
      </div>
      <div className="container mx-auto lg:mt-24 md:mt-10">
        <div className='flex lg:flex-row flex-col lg:gap-16 md:gap-10 gap-8 mb-10'>
          <div className='w-[400px]'>
            {renderOverview()}
          </div>
          <div className='flex-auto'>
            {renderAmenities()}
          </div>
        </div>
        <div>
          <p className='font-serif text-3xl font-bold mb-8 text-gray-100'>Description</p>
          <p>{roomDetail?.description}</p>
        </div>
        <div className='flex justify-end mt-10'>
          <Link to={'/'} className='bg-primary text-secondary-50 p-4'>Discover more room</Link>
        </div>
      </div>
    </section>
  )
}

export default DetailRoomType