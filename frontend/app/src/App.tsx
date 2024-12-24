import React, { useState, useEffect } from "react";
import "./App.css";

const SLOT_ITEMS = [
  "🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "🍎", "🍍", "🍒", "7️⃣", "BAR", "🔔", "💎", "⭐️", "🍀"
];

interface SlotProps {
  items: string[];
  spinning: boolean;
  position: number;
  onUpdatePosition: (newPosition: number) => void;
  onStop: () => void;
}

const SlotColumn: React.FC<SlotProps> = ({
  items,
  spinning,
  position,
  onUpdatePosition,
  onStop,
}) => {
  useEffect(() => {
    if (!spinning) return;

    const interval = setInterval(() => {
      onUpdatePosition((position + 1) % items.length);
    }, 10); // 回転速度

    return () => clearInterval(interval);
  }, [spinning, position, items.length, onUpdatePosition]);

  const visibleItems = [
    items[(position + items.length - 1) % items.length], // 上
    items[position], // 中央
    items[(position + 1) % items.length], // 下
  ];

  return (
    <div className="slot-column">
      <div className="slot-items">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className={`slot-item ${index === 1 ? "selected" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      <button
        className="toggle-button"
        onClick={onStop}
        disabled={!spinning} // 回転中は無効化
      >
        Stop
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [positions, setPositions] = useState([0, 0, 0]); // 各列の位置
  const [spinning, setSpinning] = useState([true, true, true]); // 各列の回転状態
  const [popupVisible, setPopupVisible] = useState(false); // ポップアップの表示状態
  const [winningItems, setWinningItems] = useState<string[]>([]); // 当たったアイテム
  const [stoppedSlots, setStoppedSlots] = useState([false, false, false]); // 各スロットが停止したかどうか

  const stopSlot = (index: number) => {
    const newSpinning = [...spinning];
    newSpinning[index] = false;
    setSpinning(newSpinning);

    const newStoppedSlots = [...stoppedSlots];
    newStoppedSlots[index] = true;
    setStoppedSlots(newStoppedSlots);

    // すべてのスロットが停止したタイミングでポップアップを表示
    if (newStoppedSlots.every((stopped) => stopped)) {
      const newWinningItems = positions.map(position => SLOT_ITEMS[position]);
      setWinningItems(newWinningItems); // 各スロットの選ばれたアイテムを格納
      setPopupVisible(true);
    }
  };

  const updatePosition = (index: number, newPosition: number) => {
    setPositions((prev) => {
      const updated = [...prev];
      updated[index] = newPosition;
      return updated;
    });
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSpinning([true, true, true]); // ポップアップを閉じてスロット再開
    setStoppedSlots([false, false, false]); // 停止状態リセット
  };

  return (
    <div className="App">
      <h1>React Slot Machine</h1>
      <div className="slot-container">
        {positions.map((position, index) => (
          <SlotColumn
            key={index}
            items={SLOT_ITEMS}
            spinning={spinning[index]} // 各列ごとに停止状態
            position={position}
            onUpdatePosition={(newPosition) =>
              updatePosition(index, newPosition)
            }
            onStop={() => stopSlot(index)} // 個別停止処理
          />
        ))}
      </div>

      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>当たったアイテム: {winningItems.join(", ")}</p>
            <button onClick={handleClosePopup}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
