import { ITEMSCATEGORY } from "@/models/items-category";
import IRegion from "@/models/region";

export const Regions: IRegion[] = [
  {
    id: 1,
    name: "Freedom Park",
    coordinates: {
      id: 1,
      name: "Region 1 Center",
      lat: -26.291952,
      lng: 27.936952,
    },
    popularItems: [
      {
        id: 1,
        name: "Kota 1",
        category: ITEMSCATEGORY.KOTA,
        price: 18,
        description: "Kota for only R18",
        imageUrl: "/kota.png",
        ingredients: ["Lettuce, Atchar, Chips"],
      },
      {
        id: 2,
        name: "Atchar",
        category: ITEMSCATEGORY.ATCHAR,
        price: 18,
        description: "Atchar cup",
        imageUrl: "/atchar.jpg",
        ingredients: ["Mango", "Spices", "Cooking Oil"],
      },
      {
        id: 3,
        name: "Fatcakes",
        category: ITEMSCATEGORY.FATCAKES,
        price: 18,
        description: "1 For R1",
        imageUrl: "/fatcakes.jpg",
        ingredients: ["Flour", "Cooking Oil"],
      },
      {
        id: 4,
        name: "Dagwood",
        category: ITEMSCATEGORY.DAGWOOD,
        price: 18,
        description: "Dagwood",
        imageUrl: "/dagwood.jpg",
        ingredients: ["Lettuce, Cheese, Chips"],
      },
    ],
    stores: [
      {
        id: 1,
        name: "Mphoza",
        logoUrl: undefined,
        description: "Mphoza serves ikota ranging from R15 to R80",
        tags: ["Kota", "Bunny Chow"],
        location: { id: 1, name: "Mphoza", lat: -26.295634, lng: 27.93444 },
        menu: {
          items: [
            {
              id: 1,
              name: "Number 1",
              description: "This is a kota worth R15. Number 1 on the list",
              price: 15,
              imageUrl: "/kota.jpg",
              category: ITEMSCATEGORY.KOTA,
              ingredients: ["Vienna", "Polony"],
            },
            {
              id: 2,
              name: "Number 2",
              description: "This is a kota worth R18. Number 1 on the list",
              price: 18,
              imageUrl: "/kota.jpg",
              category: ITEMSCATEGORY.KOTA,
              ingredients: ["Vienna", "Polony"],
            },
          ],
        },
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
        menu: {
          items: [
            {
              id: 3,
              name: "Number 1",
              description: "This is a kota worth R15. Number 1 on the list",
              price: 15,
              imageUrl: "/kota.jpg",
              category: ITEMSCATEGORY.KOTA,
              ingredients: ["Vienna", "Polony"],
            },
            {
              id: 4,
              name: "Number 2",
              description: "This is a kota worth R18. Number 1 on the list",
              price: 18,
              imageUrl: "/kota.jpg",
              category: ITEMSCATEGORY.KOTA,
              ingredients: ["Vienna", "Polony"],
            },
          ],
        },
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
    drivers: [
      {
        id: 1,
        position: { id: 1, lat: 0, lng: 0, name: "Freedom Park" },
        owner: { name: "Lindelani" },
      },
    ],
  },
  {
    id: 1,
    name: "Eldorado Park",
    coordinates: {
      id: 2,
      name: "Region 2 Center",
      lat: -26.291905,
      lng: 27.911338,
    },
    popularItems: [
      {
        id: 5,
        name: "Kota 1",
        category: ITEMSCATEGORY.KOTA,
        price: 18,
        description: "Kota for only R18",
        imageUrl: "/kota.png",
        ingredients: ["Lettuce, Atchar, Chips"],
      },
    ],
    stores: [
      {
        id: 1,
        name: "Joe",
        logoUrl: undefined,
        description: "Joe serves serves Indian cuisine ranging from R15 to R80",
        tags: ["Samoosas", "Curry"],
        location: { id: 3, name: "Joe", lat: -26.29619, lng: 27.920145 },
        menu: {
          items: [
            {
              id: 5,
              name: "Number 1",
              description: "This is a kota worth R15. Number 1 on the list",
              price: 15,
              imageUrl: "/kota.jpg",
              category: ITEMSCATEGORY.KOTA,
              ingredients: ["Vienna", "Polony"],
            },
            {
              id: 6,
              name: "Number 2",
              description: "This is a kota worth R18. Number 1 on the list",
              price: 18,
              imageUrl: "/kota.jpg",
              category: ITEMSCATEGORY.KOTA,
              ingredients: ["Vienna", "Polony"],
            },
          ],
        },
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
    drivers: [
      {
        id: 1,
        position: {
          id: 1,
          name: "X545 Location",
          lat: -26.293151,
          lng: 27.934056,
        },
        owner: { name: "Lindelani" },
      },
      {
        id: 1,
        position: {
          id: 1,
          name: "Y276 Location",
          lat: -26.293151,
          lng: 27.934056,
        },
        owner: { name: "Lindelani" },
      },
    ],
  },
];
