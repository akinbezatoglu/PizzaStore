# PizzaStore
A full-stack Pizza Store app built using React for the frontend and an ASP.NET Core 8.0 Minimal API for the backend.

### PizzaStore Api

```ps
cd PizzaStore.Api
dotnet run
```

`http://localhost:5089/swagger`

![image](https://github.com/user-attachments/assets/4b20eab8-1737-4353-aa68-b5192e5e4201)

### Run React App
```ps
cd PizzaStore.Client
npm run dev
```

##### vite.config.js
```
  server: {
    port: 3000,
    proxy: {
      '/pizzas': {
        target: 'http://localhost:5089',
    ...
```
`http://localhost:3000/`

![image](https://github.com/user-attachments/assets/98cb03ab-d41e-4048-9e82-c62a7708f850)

### Pagination
The API supports pagination in the [`GetPizzas`](https://github.com/akinbezatoglu/PizzaStore/blob/master/PizzaStore.Api/Features/Pizzas/GetPizzas.cs) request, allowing you to specify Page and PageSize parameters. The response body will return the corresponding page of pizzas based on these settings.

##### Request
![image](https://github.com/user-attachments/assets/93eae861-81d2-4b35-a21b-972f62dd28ba)
##### Response
```
{
  "items": [
    {
      "id": "705258cb-1314-437e-b526-3f5ebaaee31e",
      "name": "Hawaiian",
      "description": "A unique and controversial choice that brings together contrasting flavors in harmony. This pizza features sweet pineapple chunks paired with savory ham on a bed of melted mozzarella cheese. The rich tomato sauce acts as the perfect base, while the combination of sweet and salty elements creates a distinctive and enjoyable taste experience.",
      "createdAtUtc": "2024-08-19T21:00:24.5178012",
      "updatedAtUtc": null
    },
    {
      "id": "93d396b5-3ec3-49fa-96b3-6fe76382f688",
      "name": "Four Cheese",
      "description": "Indulge in a decadent blend of four exceptional cheeses. This pizza combines the creamy richness of mozzarella with the sharp, tangy flavors of gorgonzola and parmesan. Ricotta adds a smooth, velvety texture, creating a multi-layered cheese experience that is both rich and satisfying. Each bite delivers a perfect balance of flavors and textures.",
      "createdAtUtc": "2024-08-19T21:00:24.5178014",
      "updatedAtUtc": null
    },
    {
      "id": "79f59a18-de66-4d5a-b60b-c3efcef56eb4",
      "name": "Veggie Delight",
      "description": "For those who appreciate a bounty of fresh vegetables, this pizza is a true delight. It features a colorful array of bell peppers, black olives, red onions, and juicy tomatoes, all atop a generous layer of mozzarella cheese. The tomato sauce is seasoned with herbs and spices, enhancing the freshness of the vegetables and creating a well-rounded and nutritious pizza.",
      "createdAtUtc": "2024-08-19T21:00:24.5178016",
      "updatedAtUtc": null
    }
  ],
  "page": 2,
  "pageSize": 3,
  "totalItems": 118,
  "hasNextPage": true,
  "hasPreviousPage": true
}
```

The React app handles pagination in the UI by using the API's pagination parameters. It sends requests with the Page and PageSize values and displays the corresponding page of pizzas based on the API's response.

![image](https://github.com/user-attachments/assets/05dfcaa9-0a27-4087-89b2-5d438325ef64)
![image](https://github.com/user-attachments/assets/1ab2aea7-3164-484c-aa5a-f24a7deee135)

### Create a new Pizza
To create a new pizza in the React app, you would typically begin by creating a form that allows users to input the necessary details, such as the pizza's name and description. Once the form is filled out, the user submits the data, which triggers a function to send this information to the backend API.

![image](https://github.com/user-attachments/assets/0170951e-d565-4faa-934c-f4204918be1f)

Clicking the button opens a modal where you can create a new pizza. For example, you could add a pizza like "Spicy Inferno Delight."

![image](https://github.com/user-attachments/assets/e15c0b60-7791-412c-a1d7-73041fe64dc9)

The newly added pizza will appear at the end of the list.

![image](https://github.com/user-attachments/assets/562384e8-e2a9-4dc7-8481-4727df7f2bf1)

### Update Pizza
Clicking the green edit button in the pizza container will open a modal for editing the pizza.

Edit the description of the newly created pizza to the following.

![image](https://github.com/user-attachments/assets/5afd017a-91f6-4944-ac9d-b50f3ebcaf1e)


Last updated list
![image](https://github.com/user-attachments/assets/badb7941-60c4-47fe-8211-c8dfeb42d97b)

### Delete Pizza
Clicking the red delete button in the pizza container will delete the pizza.

![image](https://github.com/user-attachments/assets/13f2440e-44e7-4635-8f2e-fa8012ed5554)

