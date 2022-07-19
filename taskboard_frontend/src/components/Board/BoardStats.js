import { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../PieChart";
import { useSelector } from "react-redux";

const BoardStats = ({ board }) => {
  const { user } = useSelector((state) => state.auth);
  const [chartsData, setChartsData] = useState({ labels: [], datasets: [] });
  
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
    for (let i = 0; i < lists.length; i++) {
      for (let j = 0; j < lists[i].cards.length; j++) {
        cards.push(lists[i].cards[j]);
      }
    }
    
    setChartsData({
      labels: ['completed', "not completed", "late"],
      datasets: [
        {
          label: 'Projects completion',
          data: [cards.filter((c) => c.deliveryDate).length, cards.filter((c) => !c.deliveryDate).length, cards.filter((c) => (c.dueDate && new Date(c.createdAt) - new Date(c.dueDate) < 0)).length],
          backgroundColor: [
            "#3CCF4E",
            "#EF5B0C",
            "#FFC300"
          ],
          borderColor: '#FDF6EC',
          borderWidth: 3,
        }
      ]
    })
  }
  
  useEffect(() => {
    getBoardCards();
  }, []);
  
  return (
    <div>
      <div style={{ width: 500, padding: "10px 20px" }}>
        <PieChart chartData={chartsData}/>
      </div>
    </div>
  );
};

export default BoardStats;