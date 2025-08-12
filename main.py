from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API服务运行正常"}

@app.get("/api/stock/{code}")
async def get_stock_info(code: str):
    return {
        "stock_code": code,
        "board": "沪市主板",
        "limit_up": 10,
        "current_deviation": 4.5,
        "10_day_cumulative": 105.2,
        "30_day_cumulative": 210.8,
        "predict_trigger_price_10": 20.0,
        "predict_trigger_price_30": 22.5,
        "index_info": {
            "上证综指_10d": 1.5,
            "上证综指_30d": 3.2,
            "深证成指_10d": 1.8,
            "深证成指_30d": 3.6,
            "创业板指_10d": 2.1,
            "创业板指_30d": 4.0,
            "科创50_10d": 2.5,
            "科创50_30d": 4.5,
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)