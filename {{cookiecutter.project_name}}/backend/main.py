from typing import Optional

from fastapi import FastAPI
from fastapi.routing import APIRoute
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


import json

class Item(BaseModel):
    id: int
    description: Optional[str] = None


app = FastAPI()


# TODO: This is for development. Remove it for production.
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{id}", response_model=Item)
async def read_item(id: int, description: Optional[str] = None):
    return Item(id=id, description=description)


# generate OpenAPI JSON file for typescript interface generator

def _use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.
    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name


_use_route_names_as_operation_ids(app)
with open("./openapi.json", "w") as fp:
    json.dump(app.openapi(), fp=fp)


def main():
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)