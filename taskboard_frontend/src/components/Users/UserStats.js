import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PieChart from "../PieChart";

const UserStats = ({ boardId }) => {
  const [chartsData, setChartsData] = useState({labels: [], datasets: []});
  const params = useParams();
  console.log('chartsData', chartsData);
  
  const getCardsOfBoard = async () => {
    const lists = [];
    const cards = [];
    const cardPermissionsCards = [];
    const cardPermissions = await axios.get(`http://localhost:3001/cardPermission/${params.member}`);
    cardPermissions.data.map((cp) => cardPermissionsCards.push(cp.card));
    
    const listsOfBoard = await axios.post(`http://localhost:3001/list/board/${boardId}`, { cards: cardPermissionsCards });
    listsOfBoard.data.map((list) => lists.push(list));
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
    getCardsOfBoard();
  }, [boardId]);
  
  return (
    <div>
      <div style={{ width: 500 }}>
        <PieChart chartData={chartsData}/>
      </div>
    </div>
  );
};

export default UserStats;