const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/secret');
var app = express();


mongoose.connect(config.database, function(err){
  if(err) console.log(err);
  console.log('Connected to DB');
})

app.use(cors())


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

const testroutes = require('./routes/test');

app.use(testroutes);

const port = process.env.PORT || 5050;

app.get('/getdata', (req, res) => {
    res.json(
        [
  {
    "_id": "5b422ac826e8169873acc76c",
    "index": 0,
    "guid": "2930520b-ebb1-47aa-b19c-8f9198e76633",
    "isActive": false,
    "balance": "$3,355.67",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "brown",
    "name": "Jill Ford",
    "gender": "female",
    "company": "CYTRAK",
    "email": "jillford@cytrak.com",
    "phone": "+1 (989) 584-3242",
    "address": "661 Atlantic Avenue, Norfolk, Missouri, 6542",
    "about": "Tempor proident commodo ut pariatur sunt nisi velit fugiat deserunt reprehenderit laborum. Quis Lorem tempor ad aliqua esse do sit tempor quis quis officia. Minim magna occaecat aliquip et elit velit. Officia sint nisi adipisicing consequat pariatur. Laborum amet exercitation voluptate nostrud do laboris consectetur aliqua sint irure proident. Esse quis magna dolor est anim pariatur officia dolore eu et.\r\n",
    "registered": "2016-11-14T12:17:01 -06:00",
    "latitude": -66.769563,
    "longitude": -52.37462,
    "tags": [
      "consequat",
      "do",
      "sit",
      "ex",
      "et",
      "deserunt",
      "veniam"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tameka Elliott"
      },
      {
        "id": 1,
        "name": "Gilda Terry"
      },
      {
        "id": 2,
        "name": "Bradford Perry"
      }
    ],
    "greeting": "Hello, Jill Ford! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b422ac88c4d1e97a3795597",
    "index": 1,
    "guid": "0e972c02-3e65-4093-9b0a-c48cc6937359",
    "isActive": false,
    "balance": "$1,868.29",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "green",
    "name": "Schmidt Mayer",
    "gender": "male",
    "company": "NAMEBOX",
    "email": "schmidtmayer@namebox.com",
    "phone": "+1 (964) 575-3577",
    "address": "103 Chapel Street, Golconda, Wyoming, 6765",
    "about": "Non adipisicing officia voluptate duis in Lorem Lorem esse nulla occaecat sit consequat tempor in. Consectetur laborum anim velit elit ex nostrud magna dolor tempor. Irure in enim consectetur nulla commodo dolore quis ut laboris.\r\n",
    "registered": "2015-12-31T09:29:50 -06:00",
    "latitude": 62.404039,
    "longitude": 70.912986,
    "tags": [
      "nisi",
      "enim",
      "tempor",
      "mollit",
      "consectetur",
      "esse",
      "anim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kerry Ware"
      },
      {
        "id": 1,
        "name": "Gladys Perez"
      },
      {
        "id": 2,
        "name": "Rosemarie Burke"
      }
    ],
    "greeting": "Hello, Schmidt Mayer! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b422ac8058cfc95a7734f53",
    "index": 2,
    "guid": "20bce334-8cd1-412f-afb1-5ad04621a966",
    "isActive": false,
    "balance": "$2,142.58",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "green",
    "name": "Bernice Morrison",
    "gender": "female",
    "company": "NEBULEAN",
    "email": "bernicemorrison@nebulean.com",
    "phone": "+1 (943) 424-2159",
    "address": "556 Regent Place, Chesterfield, Georgia, 7673",
    "about": "Dolor fugiat consectetur ad duis exercitation magna laborum et ex ut aliqua occaecat. Non id culpa sit cupidatat laboris eiusmod anim esse nulla occaecat ipsum. Reprehenderit ad tempor dolor aute cupidatat dolore. Ea ipsum dolor sint magna cillum amet magna excepteur fugiat consectetur in irure.\r\n",
    "registered": "2015-08-23T06:27:10 -06:00",
    "latitude": -81.70727,
    "longitude": -112.266477,
    "tags": [
      "officia",
      "deserunt",
      "deserunt",
      "magna",
      "consectetur",
      "sunt",
      "commodo"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hardy Mullins"
      },
      {
        "id": 1,
        "name": "Pacheco Golden"
      },
      {
        "id": 2,
        "name": "Ellis Mejia"
      }
    ],
    "greeting": "Hello, Bernice Morrison! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5b422ac88908f45d3affff79",
    "index": 3,
    "guid": "6f5a11e1-3420-4f04-8001-1ab5a38c22b1",
    "isActive": true,
    "balance": "$3,737.95",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "green",
    "name": "Kent Smith",
    "gender": "male",
    "company": "CODAX",
    "email": "kentsmith@codax.com",
    "phone": "+1 (815) 574-3760",
    "address": "415 Hull Street, Taft, Rhode Island, 711",
    "about": "Eiusmod fugiat nostrud nulla magna excepteur ut deserunt irure mollit dolore in deserunt excepteur. Aliqua irure ad adipisicing deserunt aliqua nostrud non nostrud irure. Nostrud fugiat culpa cillum incididunt officia exercitation Lorem. Ea duis est nisi commodo in sint incididunt sint ipsum ex pariatur Lorem enim. Elit sunt pariatur laboris id aliqua. Consectetur consectetur sunt ex incididunt. Eu occaecat consequat occaecat nostrud id veniam cupidatat velit nulla et fugiat tempor nisi.\r\n",
    "registered": "2016-05-23T03:08:18 -06:00",
    "latitude": -51.068824,
    "longitude": 176.744107,
    "tags": [
      "excepteur",
      "ullamco",
      "sit",
      "deserunt",
      "consequat",
      "ipsum",
      "velit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Charles Mckenzie"
      },
      {
        "id": 1,
        "name": "Collins Barry"
      },
      {
        "id": 2,
        "name": "Conner Chapman"
      }
    ],
    "greeting": "Hello, Kent Smith! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b422ac8e3273b8b3dc6ddfa",
    "index": 4,
    "guid": "824e46a7-63b8-4507-a446-ee7698f57001",
    "isActive": false,
    "balance": "$3,546.37",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "blue",
    "name": "Valentine Lindsey",
    "gender": "male",
    "company": "SEQUITUR",
    "email": "valentinelindsey@sequitur.com",
    "phone": "+1 (883) 470-2232",
    "address": "979 Ocean Court, Jamestown, Hawaii, 6719",
    "about": "Non est ut adipisicing id laborum. Est adipisicing ex cupidatat et minim. Cupidatat laboris ad do sint ut nulla mollit reprehenderit.\r\n",
    "registered": "2017-11-17T03:28:08 -06:00",
    "latitude": 77.359456,
    "longitude": -25.310805,
    "tags": [
      "voluptate",
      "culpa",
      "ad",
      "sunt",
      "ea",
      "aliquip",
      "nulla"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lynne Miles"
      },
      {
        "id": 1,
        "name": "Cabrera Knapp"
      },
      {
        "id": 2,
        "name": "Rivas Patterson"
      }
    ],
    "greeting": "Hello, Valentine Lindsey! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5b422ac8c0fd3ad3d03f0e0f",
    "index": 5,
    "guid": "e003a6b2-af86-4236-a59a-2a4fed085d52",
    "isActive": false,
    "balance": "$3,198.15",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Franks Cortez",
    "gender": "male",
    "company": "BEDLAM",
    "email": "frankscortez@bedlam.com",
    "phone": "+1 (878) 559-2814",
    "address": "394 Cass Place, Brady, Minnesota, 8769",
    "about": "Sint sunt est aute incididunt consequat minim laborum in est cupidatat nisi nostrud. Esse in ipsum deserunt eiusmod non labore voluptate sint tempor. Fugiat quis exercitation aute ut sit minim enim sit nulla non veniam. Esse et fugiat sunt irure do consequat.\r\n",
    "registered": "2017-06-24T09:19:19 -06:00",
    "latitude": 86.658422,
    "longitude": 48.228712,
    "tags": [
      "labore",
      "ipsum",
      "qui",
      "deserunt",
      "amet",
      "quis",
      "ut"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Haynes George"
      },
      {
        "id": 1,
        "name": "Marshall Owen"
      },
      {
        "id": 2,
        "name": "Ramirez Bender"
      }
    ],
    "greeting": "Hello, Franks Cortez! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5b422ac8b6ddd31d15e47e77",
    "index": 6,
    "guid": "15604a8b-1e4b-428f-a8fa-5d4089b2a7de",
    "isActive": false,
    "balance": "$2,492.52",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "blue",
    "name": "Mcfarland Soto",
    "gender": "male",
    "company": "ESCHOIR",
    "email": "mcfarlandsoto@eschoir.com",
    "phone": "+1 (832) 599-3408",
    "address": "855 Laurel Avenue, Indio, Delaware, 4225",
    "about": "Non ea qui sit consectetur Lorem laboris ea. Ullamco fugiat ea magna laborum ullamco voluptate commodo anim reprehenderit. Eu esse Lorem velit est. Fugiat consectetur incididunt sit do dolor cillum.\r\n",
    "registered": "2016-06-09T05:15:06 -06:00",
    "latitude": 12.22115,
    "longitude": -93.818837,
    "tags": [
      "est",
      "consequat",
      "et",
      "veniam",
      "eu",
      "exercitation",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mann Wagner"
      },
      {
        "id": 1,
        "name": "Hayden Weber"
      },
      {
        "id": 2,
        "name": "Hilary Parks"
      }
    ],
    "greeting": "Hello, Mcfarland Soto! You have 8 unread messages.",
    "favoriteFruit": "banana"
  }
]
    );
})

app.listen(port, () => {

    console.log( `Express server listening on port ${port}`);
})
