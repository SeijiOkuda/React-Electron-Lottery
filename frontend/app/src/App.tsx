import React, { useState, useEffect } from "react";
import "./App.css";

const SLOT_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface SlotProps {
  items: number[];
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
    }, 100); // 回転速度

    return () => clearInterval(interval);
  }, [spinning, position, items.length, onUpdatePosition]);

  // 表示するスロットアイテムを計算（現在位置 + 前後）
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
      <button className="toggle-button" onClick={onToggle}>
        {spinning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [positions, setPositions] = useState([0, 0, 0]); // 各列の位置
  const [spinning, setSpinning] = useState([true, true, true]); // 各列の回転状態

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

  // すべてのスロットが停止状態なら、自動的に回転開始
  useEffect(() => {
    if (spinning.every((spin) => !spin)) {
      // すべてのスロットが停止状態なら回転開始
      setSpinning([true, true, true]);
    }
  }, [spinning]);

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
    </div>
  );
};

export default App;
