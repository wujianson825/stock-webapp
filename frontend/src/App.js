import React, { useState } from "react";

export default function App() {
  const [stockCode, setStockCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchStock() {
    if (!stockCode) {
      alert("请输入股票代码");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/stock/${stockCode}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("请求失败：" + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: 20 }}>
      <h2>股票严重异常波动计算器</h2>
      <input
        type="text"
        placeholder="请输入股票代码"
        value={stockCode}
        onChange={(e) => setStockCode(e.target.value)}
        style={{ fontSize: 16, padding: 6, marginRight: 10 }}
      />
      <button onClick={fetchStock} disabled={loading}>
        {loading ? "查询中..." : "计算"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>计算结果：</h3>
          <div>股票代码：{result.stock_code}</div>
          <div>所属板块：{result.board}</div>
          <div>日涨跌幅限制：±{result.limit_up}%</div>
          <div>当前偏离值：{result.current_deviation}%</div>
          <div>10日累计偏离值：{result["10_day_cumulative"]}%</div>
          <div>30日累计偏离值：{result["30_day_cumulative"]}%</div>
          <div>未来10日预测触发价：{result.predict_trigger_price_10} 元</div>
          <div>未来30日预测触发价：{result.predict_trigger_price_30} 元</div>

          <h3>指数信息（10日/30日涨跌幅）：</h3>
          <ul>
            {Object.entries(result.index_info).map(([key, val]) => (
              <li key={key}>
                {key} : {val}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
