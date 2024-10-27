import IRegion from "@/models/region";

export const Regions: IRegion[] = [
  {
    id: 1,
    name: "Eldorado Park 1",
    coordinates: {
      id: 1,
      name: "Region 1 Center",
      lat: -26.291952,
      lng: 27.936952,
    },
    stores: [
      {
        id: 1,
        name: "Mphoza",
        logoUrl: undefined,
        description: "Mphoza serves ikota ranging from R15 to R80",
        tags: ["Kota", "Bunny Chow"],
        location: { id: 1, name: "Mphoza", lat: -26.295634, lng: 27.93444 },
        menu: [
          {
            item: {
              name: "Number 1",
              description: "This is a kota worth R15. Number 1 on the list",
              price: 15,
              imageUrl: "/kota.jpg",
              includes: ["Chips", "Burgers", "Vienna"],
            },
          },
          {
            item: {
              name: "Number 2",
              description: "This is a kota worth R18. Number 1 on the list",
              price: 18,
              imageUrl: "/kota.jpg",
              includes: ["Chips", "Burgers", "Vienna", "French"],
            },
          },
        ],
        extras: [
          { name: "Buddy Coke", price: 18, imageUrl: undefined },
          { name: "Extra Cheese", price: 2, imageUrl: undefined },
        ],
        ratings: {
          ratings: [
            {
              userId: 1,
              rating: 4.5,
              comment: "Great product!",
              timestamp: "2024-01-01T10:00:00Z",
            },
            {
              userId: 2,
              rating: 3.8,
              comment: "Good but could be better.",
              timestamp: "2024-01-02T14:30:00Z",
            },
            {
              userId: 3,
              rating: 5.0,
              comment: "Excellent!",
              timestamp: "2024-01-03T08:15:00Z",
            },
          ],
          averageRating: function () {
            const total = this.ratings.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            return Number((total / this.ratings.length).toFixed(1));
          },
        },
      },
      {
        id: 2,
        name: "John",
        logoUrl: undefined,
        description: "John serves ikota ranging from R15 to R80",
        tags: ["Kota", "Bunny Chow"],
        location: { id: 2, name: "John", lat: -26.295269, lng: 27.932051 },
        menu: [
          {
            item: {
              name: "Number 1",
              description: "This is a kota worth R15. Number 1 on the list",
              price: 15,
              imageUrl: "/kota.jpg",
              includes: ["Chips", "Burgers", "Vienna"],
            },
          },
          {
            item: {
              name: "Number 2",
              description: "This is a kota worth R20. Number 2 on the list",
              price: 20,
              imageUrl: "/kota.jpg",
              includes: ["Chips", "Burgers", "Vienna", "French"],
            },
          },
        ],
        extras: undefined,
        ratings: {
          ratings: [
            {
              userId: 1,
              rating: 4.5,
              comment: "Great product!",
              timestamp: "2024-01-01T10:00:00Z",
            },
          ],
          averageRating: function () {
            const total = this.ratings.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            return Number((total / this.ratings.length).toFixed(1));
          },
        },
      },
    ],
    vehicles: [
      {
        id: 1,
        registration: "X545",
        idleAt: { id: 1, name: "X545 Idle", lat: -26.293151, lng: 27.934056 },
        owner: { name: "Lindelani" },
      },
    ],
  },
  {
    id: 1,
    name: "Freedom Park",
    coordinates: {
      id: 2,
      name: "Region 2 Center",
      lat: -26.291905,
      lng: 27.911338,
    },
    stores: [
      {
        id: 1,
        name: "Joe",
        logoUrl: undefined,
        description: "Joe serves serves Indian cuisine ranging from R15 to R80",
        tags: ["Samoosas", "Curry"],
        location: { id: 3, name: "Joe", lat: -26.29619, lng: 27.920145 },
        menu: [
          {
            item: {
              name: "Samoosas",
              description: "Samoosas with some curry",
              price: 3,
              imageUrl: "/kota.jpg",
              includes: ["Curry"],
            },
          },
          {
            item: {
              name: "Briyani",
              description: "Briyani with roasted chicken",
              price: 18,
              imageUrl: "/kota.jpg",
              includes: ["Chicken", "Rice", "Potatoes"],
            },
          },
        ],
        extras: undefined,
        ratings: {
          ratings: [
            {
              userId: 1,
              rating: 4.5,
              comment: "Great product!",
              timestamp: "2024-01-01T10:00:00Z",
            },
            {
              userId: 2,
              rating: 3.8,
              comment: "Good but could be better.",
              timestamp: "2024-01-02T14:30:00Z",
            },
            {
              userId: 3,
              rating: 5.0,
              comment: "Excellent!",
              timestamp: "2024-01-03T08:15:00Z",
            },
          ],
          averageRating: function () {
            const total = this.ratings.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );
            return Number((total / this.ratings.length).toFixed(1));
          },
        },
      },
      
    ],
    vehicles: [
      {
        id: 1,
        registration: "X545",
        idleAt: { id: 1, name: "X545 Location", lat: -26.293151, lng: 27.934056 },
        owner: { name: "Lindelani" },
      },
      {
        id: 1,
        registration: "Y276",
        idleAt: { id: 1, name: "Y276 Location", lat: -26.293151, lng: 27.934056 },
        owner: { name: "Lindelani" },
      },
    ],
  },
];
