import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker} from "antd";
import styles from './pieChart.module.css';
import DashboardTitle from "../typo-title/DashboardTitle";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const rooms = [
  {
      "id": 1,
      "roomNumber": 101,
      "roomType": "Deluxe Single",
      "reservationId": 1,
      "checkIn": "2023-12-16T07:30:00Z",
      "checkOut": "2023-12-18T05:30:00Z",
      "pricePerNight": 100,
      "status": "CONFIRMED"
  },
  {
      "id": 2,
      "roomNumber": 201,
      "roomType": "Deluxe Double",
      "reservationId": 1,
      "checkIn": "2023-12-16T07:30:00Z",
      "checkOut": "2023-12-18T05:30:00Z",
      "pricePerNight": 200,
      "status": "CONFIRMED"
  },
  {
    "id": 3,
    "roomNumber": 202,
    "roomType": "Deluxe Family",
    "reservationId": 1,
    "checkIn": "2023-12-16T07:30:00Z",
    "checkOut": "2023-12-18T05:30:00Z",
    "pricePerNight": 500,
    "status": "CONFIRMED"
}
]

const PieChart = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [ dates,setDates ] = useState({year: currentYear,month: currentMonth});

  let outerLabel = [];
  const innerLabel = [];
  const colors = [
    "#FA16C8",
    "#FA5E8D",
    "#F9C74F",
    "#6BBD99",
    "#FF9677",
    "#40A9FF"
  ];

const data = {
  labels: outerLabel,
  datasets: [
    {
      label: '% of rooms',
      data: innerLabel,
      backgroundColor: colors,
    },
  ],
};

const noData = {
  labels: ["No Data"],
  datasets: [
    {
      data: [100],
      backgroundColor: ['#d3d3d3'],
    }
  ]
}

const options = {
  maintainAspectRatio: false,
  plugins: {
    // title: {
    //   display: true,
    //   text: 'Room Reservation Chart',
    //   align: 'start',
    //   color: '#fff',
    //   font: {
    //     size: 18,
    //     family: 'Inter'
    //   }
    // },
    legend: {
      display: true,
      position: "right",
      align: "center",
      labels: {
        color: '#000',
        usePointStyle: true,
        font: {
          size: 14,
          family: 'Roboto',
        }
      }
    },
  },
};
  
  const typeCounts = useMemo(() => {
    const roomType = rooms?.map(room => room.roomType);
    const typeCounts = roomType?.reduce((counts, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});
    return typeCounts;
  }, [rooms]);

  for(const type in typeCounts){
    outerLabel?.push(type);
    const calPercentage = (typeCounts[type] / rooms?.length) * 100;
    innerLabel?.push(calPercentage);
  }

  const onChange = (_,dateString) => {
    const [year,month] = dateString.split('-');
    setDates({year,month});
    if(!dateString){
      setDates({
        year: currentYear,month: currentMonth
      });
    }
  }


  return (
    <div className={styles['container']}>
      <div className={styles['date-container']}>
        <div>
          <DashboardTitle>Room Reservation Chart</DashboardTitle>
          <p>A showcase of the distribution of Reserved Rooms for a specific month.</p>
        </div>
        <DatePicker onChange={onChange} picker="month"/>
      </div>
      <div>
        <Pie data={rooms && rooms.length !== 0 ? data : noData } width={300} height={300} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
