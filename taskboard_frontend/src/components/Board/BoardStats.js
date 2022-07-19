import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PieChart from "../PieChart";
import { useSelector } from "react-redux";

const BoardStats = ({ board }) => {
  const { user } = useSelector((state) => state.auth);
  const [chartsData, setChartsData] = useState({labels: [], datasets: []});
  console.log(chartsData);
  
  const getBoardCards = async () => {
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const d = await axios.get(`http://localhost:3001/board/${board._id}`, config);
    const boardData = d.data;
    const lists = boardData.lists.map((l) => l);
    const cards = [];
    for(let i = 0; i < lists.length; i++) {
      for(let j = 0; j < lists[i].cards.length; j++) {
        cards.push(lists[i].cards[j]);
      }
    }
    
    console.log('cards', cards);
    setChartsData({
          labels: ['completed', "not completed"],
          datasets: [
            {
              label: 'Projects completion',
              data: [cards.filter((c) => c.deliveryDate).length, cards.filter((c) => !c.deliveryDate).length],
              backgroundColor: [
                "#3AB0FF",
                "#F15412"
              ],
              borderColor: '#7F8487',
              borderWidth: 2,
            }
          ]
        })
  }
  
  useEffect(() => {
    getBoardCards();
  }, []);
  
  return (
    <div>
      <div style={{ width: 500 , padding: "10px 20px"}}>
        <PieChart chartData={chartsData}/>
      </div>
    </div>
  );
};

export default BoardStats;