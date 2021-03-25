import React, { useState } from "react";
import "./App.css";
import { Configuration, DefaultApi, Item } from "./api";
import { Button } from "@chakra-ui/react";

const config = new Configuration({ basePath: "http://localhost:8000" }); // TODO: This is for dev
export const apiClient = new DefaultApi(config);

function App() {
  const [item, setItem] = useState<Item>();

  function updateItem() {
    apiClient.readItem(1, "my test item from api").then((response) => {
      setItem(response.data);
      console.log(response.data);
    });
  }

  return (
    <div className="App">
      <Button
        onClick={updateItem}
        loadingText="Get Item"
        colorScheme="teal"
        variant="outline"
      >
        Refresh
      </Button>
      <p>
        Item #{item?.id}: {item?.description ?? "no item available"}
      </p>
    </div>
  );
}

export default App;
