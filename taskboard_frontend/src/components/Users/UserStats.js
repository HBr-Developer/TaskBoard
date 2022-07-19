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
  
    // setChartsData({completed: cards.filter((c) => c.deliveryDate).length, "not completed": cards.filter((c) => !c.deliveryDate).length})
    
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