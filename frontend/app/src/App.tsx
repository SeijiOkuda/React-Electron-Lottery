import React, { useState, useEffect } from "react";
import "./App.css";

const SLOT_ITEMS = [
  "🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "🍎", "🍍", "🍒", "7️⃣", "BAR", "🔔", "💎", "⭐️", "🍀",
];

interface SlotProps {
  items: string[];
  spinning: boolean;
  position: number;
  onUpdatePosition: (newPosition: number) => void;
  onToggle: () => void;
}

const SlotColumn: React.FC<SlotProps> = ({
  items,
  spinning,
  position,
  onUpdatePosition,
  onToggle,
}) => {
  useEffect(() => {
    if (!spinning) return;

    const interval = setInterval(() => {
      onUpdatePosition((position + 1) % items.length);
    }, 10); // 回転速度

    return () => clearInterval(interval);
  }, [spinning, position, items.length, onUpdatePosition]);

  const visibleItems = [
    items[(position + items.length - 1) % items.length],
    items[position],
    items[(position + 1) % items.length],
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
        onClick={onToggle}
        disabled={!spinning}
      >
        Stop
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [positions, setPositions] = useState([0, 0, 0]); // 各列の位置
  const [spinning, setSpinning] = useState([true, true, true]); // 各列の回転状態
  const [result, setResult] = useState<string | null>(null); // ポップアップの内容

  const toggleSlot = (index: number) => {
    setSpinning((prev) => {
      const updated = [...prev];
      updated[index] = !prev[index];
      return updated;
    });
  };

  const updatePosition = (index: number, newPosition: number) => {
    setPositions((prev) => {
      const updated = [...prev];
      updated[index] = newPosition;
      return updated;
    });
  };

  useEffect(() => {
    if (spinning.every((spin) => !spin)) {
      // 全て停止した場合に中央のアイテムを表示
      const selectedItems = positions.map((pos) => SLOT_ITEMS[pos]);
      setResult(`当たった値: ${selectedItems.join(", ")}`);

      // 一定時間後に再回転開始
      setTimeout(() => {
        setSpinning([true, true, true]);
      }, 3000);
    }
  }, [spinning, positions]);

  const closePopup = () => setResult(null); // ポップアップを閉じる

  return (
    <div className="App">
      <h1>React Slot Machine</h1>
      <div className="slot-container">
        {positions.map((position, index) => (
          <SlotColumn
            key={index}
            items={SLOT_ITEMS}
            spinning={spinning[index]}
            position={position}
            onUpdatePosition={(newPosition) =>
              updatePosition(index, newPosition)
            }
            onToggle={() => toggleSlot(index)}
          />
        ))}
      </div>
      {result && (
        <div className="popup">
          <div className="popup-content">
            <p>{result}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
