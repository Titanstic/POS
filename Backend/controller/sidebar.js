const router = require("express").Router();
const Sidebar = require("../model/sidebar");
const { upload, deleteFile } = require("../component/gallery");
const SidebarCategory = require("../model/sidebarcategory");

router.get("/", async (req, res) => {
  try {
    // const getData = await Sidebar.findAll({ include: SidebarCategory });
    const getData = [
      {
          "id": 1,
          "name": "Unique",
          "pathname": "unique",
          "image": "image_1700816389081deployed_code.png",
          "createdAt": "2023-11-24T08:59:49.090Z",
          "updatedAt": "2023-11-24T08:59:49.090Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 2,
          "name": "NonUnique",
          "pathname": "nonunique",
          "image": "image_1700816406865deployed_code.png",
          "createdAt": "2023-11-24T09:00:06.869Z",
          "updatedAt": "2023-11-24T09:00:06.869Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 3,
          "name": "Purchase",
          "pathname": "purchase",
          "image": "image_1700816472068shopping_cart.png",
          "createdAt": "2023-11-24T09:01:12.073Z",
          "updatedAt": "2023-11-24T09:01:12.073Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 4,
          "name": "Category",
          "pathname": "category",
          "image": "image_1700816506681category.png",
          "createdAt": "2023-11-24T09:01:46.685Z",
          "updatedAt": "2023-11-24T09:01:46.685Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 5,
          "name": "Sale Reports",
          "pathname": "salereport",
          "image": "image_1700816537767receipt_long.png",
          "createdAt": "2023-11-24T09:02:17.771Z",
          "updatedAt": "2023-11-24T09:02:17.771Z",
          "sidebarcategoryId": 2,
          "sidebarcategory": {
              "id": 2,
              "name": "Reports",
              "createdAt": "2023-11-24T08:58:41.361Z",
              "updatedAt": "2023-11-24T08:58:41.361Z"
          }
      },
      {
          "id": 6,
          "name": "Purchase Reports",
          "pathname": "purchasereport",
          "image": "image_1700816560926receipt_long.png",
          "createdAt": "2023-11-24T09:02:40.931Z",
          "updatedAt": "2023-11-24T09:02:40.931Z",
          "sidebarcategoryId": 2,
          "sidebarcategory": {
              "id": 2,
              "name": "Reports",
              "createdAt": "2023-11-24T08:58:41.361Z",
              "updatedAt": "2023-11-24T08:58:41.361Z"
          }
      },
      {
          "id": 7,
          "name": "Sidebar Settings",
          "pathname": "sidebar",
          "image": "image_1700816594025settings.png",
          "createdAt": "2023-11-24T09:03:14.029Z",
          "updatedAt": "2023-11-24T09:03:14.029Z",
          "sidebarcategoryId": 3,
          "sidebarcategory": {
              "id": 3,
              "name": "Settings",
              "createdAt": "2023-11-24T08:59:00.995Z",
              "updatedAt": "2023-11-24T08:59:00.995Z"
          }
      },
      {
          "id": 8,
          "name": "Expense",
          "pathname": "expense",
          "image": "image_1703234761802deployed_code.png",
          "createdAt": "2023-12-22T08:46:01.816Z",
          "updatedAt": "2023-12-22T08:46:01.816Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 9,
          "name": "Item Sale Reports",
          "pathname": "itemreport",
          "image": "image_1703234830196receipt_long.png",
          "createdAt": "2023-12-22T08:47:10.200Z",
          "updatedAt": "2023-12-27T08:59:29.884Z",
          "sidebarcategoryId": 2,
          "sidebarcategory": {
              "id": 2,
              "name": "Reports",
              "createdAt": "2023-11-24T08:58:41.361Z",
              "updatedAt": "2023-11-24T08:58:41.361Z"
          }
      },
      {
          "id": 10,
          "name": "Profit & Loss",
          "pathname": "profit",
          "image": "image_1703234848891receipt_long.png",
          "createdAt": "2023-12-22T08:47:28.897Z",
          "updatedAt": "2023-12-22T08:47:28.897Z",
          "sidebarcategoryId": 2,
          "sidebarcategory": {
              "id": 2,
              "name": "Reports",
              "createdAt": "2023-11-24T08:58:41.361Z",
              "updatedAt": "2023-11-24T08:58:41.361Z"
          }
      },
      {
          "id": 11,
          "name": "Rental",
          "pathname": "rental",
          "image": "image_1704446297688sell.png",
          "createdAt": "2024-01-05T09:18:17.693Z",
          "updatedAt": "2024-01-05T09:18:17.693Z",
          "sidebarcategoryId": 4,
          "sidebarcategory": {
              "id": 4,
              "name": "Renting",
              "createdAt": "2023-11-24T08:59:00.995Z",
              "updatedAt": "2023-11-24T08:59:00.995Z"
          }
      },
      {
          "id": 12,
          "name": "Supplier",
          "pathname": "supplier",
          "image": "image_17072115651460-02-06-8a2065e207b54a70a29e1e0b23a407b4cd13fc2eb4f4919e5588652ca7ae9f5b_27a6d254559.png",
          "createdAt": "2024-02-06T09:26:05.154Z",
          "updatedAt": "2024-02-06T09:26:05.154Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 13,
          "name": "Promotions",
          "pathname": "promotion",
          "image": "image_17072115858340-02-06-8a2065e207b54a70a29e1e0b23a407b4cd13fc2eb4f4919e5588652ca7ae9f5b_27a6d254559.png",
          "createdAt": "2024-02-06T09:26:25.835Z",
          "updatedAt": "2024-02-06T09:26:25.835Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      },
      {
          "id": 14,
          "name": "Dashboard",
          "pathname": "dashboard",
          "image": "image_17072144295810-02-06-8a2065e207b54a70a29e1e0b23a407b4cd13fc2eb4f4919e5588652ca7ae9f5b_27a6d254559.png",
          "createdAt": "2024-02-06T10:13:49.586Z",
          "updatedAt": "2024-02-06T10:13:49.586Z",
          "sidebarcategoryId": 1,
          "sidebarcategory": {
              "id": 1,
              "name": "Products",
              "createdAt": "2023-11-24T08:57:55.639Z",
              "updatedAt": "2023-11-24T08:57:55.639Z"
          }
      }
  ];
    return res.status(200).json(getData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    await Sidebar.create({ ...req.body, image: req.file.filename });
    return res.status(200).json({ msg: " Sidebar is created" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const sidebarId = req.params.id;
    const singleData = await Sidebar.findOne({ where: { id: sidebarId } });
    return res.status(200).json(singleData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  // const sidebarId = req.body.id;
  // console.log(sidebarId, "hello");
  // console.log(req.body);
  try {
    if (req.file) {
      const sidebarData = await Sidebar.findOne({ where: { id: req.body.id } });
      await deleteFile(sidebarData.dataValues.image);
      await Sidebar.update(
        { ...req.body, image: req.file.filename },
        { where: { id: req.body.id } }
      );
    } else {
      await Sidebar.update({ ...req.body }, { where: { id: req.body.id } });
    }
    return res.status(200).json({ msg: " sidebar is updated" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const sidebarId = req.params.id;
    const SidebarData = await Sidebar.findOne({ where: { id: sidebarId } });
    await deleteFile(SidebarData.dataValues.image);
    await Sidebar.destroy({ where: { id: sidebarId } });
    return res.status(200).json({ msg: "sidebar was deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
