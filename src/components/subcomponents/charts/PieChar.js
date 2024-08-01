import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./chars.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalUserPieChart = (props) => {
  const dc = props.dataCounts;
  const data = {
    labels: ["Pending", "Accepted", "InProgress", "Completed", "Cancelled", "Rejected"],
    datasets: [
      {
        data: [dc.pending, dc.accepted, dc.inprogress, dc.completed, dc.cancelled, dc.rejected],
        backgroundColor: [
          'rgb(97, 17, 169)',
          'royalblue',
          'orange',
          'rgb(9, 82, 1)',
          'rgb(90, 20, 20)',
          'rgb(255, 0, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='max-w-[500px] max-h-[500px] chars'>
      <Pie data={data} />
    </div>
  )
}

export default TotalUserPieChart