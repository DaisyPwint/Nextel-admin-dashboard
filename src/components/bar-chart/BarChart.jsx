import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { DatePicker, Typography } from "antd";
import { useGetDailyIncomeQuery } from "../../features/reservation/reserveApiSlice";
import styles from './barChart.module.css';
import { useState, useMemo } from "react";
import TypographyTitle from "../typo-title/TypographyTitle";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const BarChart = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [dates,setDates] = useState({year: currentYear,month: currentMonth});
  const { data: incomes,isLoading,error } = useGetDailyIncomeQuery(dates);

  const data = useMemo(()=> {
      const filterYear = dates?.year;
      const filterMonth = dates?.month;

      const lastDayOfMonth = new Date(filterYear,filterMonth,0).getDate();
      const daysInMonth = Array.from({length: lastDayOfMonth},(_,filterDay) => new Date(filterYear,filterMonth - 1,filterDay + 1))
      
      const formattedDates = daysInMonth?.map(day => day.toLocaleDateString('en-GB', { day: 'numeric',month: 'short',year: 'numeric' }))

      const dailyIncomeData = new Array(lastDayOfMonth).fill(0);

      incomes?.forEach(data => {
        const formattedDate = new Date(data.date).getDate();
        const income = data?.income;
        if (income !== undefined) {
          dailyIncomeData[formattedDate - 1] = income;
        }
      });
      return {
        labels: formattedDates || [], 
        datasets: [
          {
            label: 'Income',
            data: dailyIncomeData || [], 
            backgroundColor: 'linear-gradient(180deg, rgba(67, 67, 67, 0.50) 0%, #434343 100%);',
            // backgroundColor: "#43434380, #434343"
            barThickness: 30,
          }
        ]
      };
      
  },[incomes,dates?.year,dates?.month])
  
  const options = {
    responsive: true,
    scales:{
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
        legend: {
            display: false,
        },
      },    
}

  const onChange = (_,dateString) => {
    const [year,month] = dateString.split('-');
    setDates({year,month});
    if(!dateString){
      setDates({year: currentYear,month: currentMonth});
    }
  }

  if(isLoading) return <p>Loading...</p>;

  if(error) return <p>error</p>
  
  return (
    <div className={styles['container']}>
      <div className={styles['date-container']}>
        {/* <Typography.Title level={4} style={{ marginTop: '0.5em',color:"#262626",fontFamily:'Times New Roman, serif'}}>Income Chart</Typography.Title> */}
        <div>
          <TypographyTitle>Income Chart</TypographyTitle>
          <p className="text-[#BFBFBF]">A showcase of the daily income for a specific month.</p>
        </div>
        <DatePicker onChange={onChange} picker="month"/>
      </div>
      <div style={{ position: 'relative' }}>
        {incomes?.length === 0 && (
          <div className={styles['no-data-message']}>No Income in this month</div>
        )}
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
// style={{color:"#262626",fontFamily:'Times New Roman, serif'}}

export default BarChart
