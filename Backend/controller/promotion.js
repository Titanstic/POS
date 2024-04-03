const router = require("express").Router();
const Promotion = require("../model/promotion");
const Items = require("../model/nonuniqueItems");
const Category = require("../model/category");

router.get("/", async (req, res) => {
  try {
    const promotion = await Promotion.findAll({
      order: [["id", "DESC"]],
      include: Category,
    });
    console.log("promotion-----", promotion.length)
    return res.status(200).json(promotion);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

router.get('/:id',async(req,res)=>{
  const promotionId = req.params.id;
  // console.log(promotionId)

  try{
    const singlePromotion = await Promotion.findOne ({
      where : {id : promotionId}
    })
    return res.status(200).json(singlePromotion)

  }catch(e){
    return res.status(500).json(e.message)
  }
})

router.post("/", async (req, res) => {
  const { name, selectedCategory, promotionValue, startDate, endDate } = req.body;
  try {
  const promotionData =  await Promotion.create({
      name,
      categoryId : selectedCategory,
      promotionValue,
      startDate,
      endDate,
    });

    const promoId = promotionData.id;
   
    await Items.update(
      { promotionId : promoId },
      {
        where: {
          categoryId: selectedCategory,
        },
      }
    );
    return res.status(200).json({ msg: "promotion added" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

router.put("/:id", async(req,res)=>{
  const promotionId = req.params.id;
  const { name, promotionValue, category, startDate, endDate } = req.body;

  try{
    const singlePromotion = await Promotion.findOne({ 
      where: { id: promotionId }
    })
    console.log("categoryid", singlePromotion.dataValues.categoryId);

    await Promotion.update(
      {
        name, promotionValue, startDate, endDate, categoryId : category
      },
      {where: { id: promotionId}}
      );

    if(category !== singlePromotion.dataValues.categoryId){
      // for change category id, 
      // remove promotion in old item
      await Items.update(
        { promotionId : null },
        {
          where: {
            categoryId: singlePromotion.dataValues.categoryId,
          },
        }
      );
      // add new promotion in new item
      await Items.update(
        { promotionId : promotionId },
        {
          where: {
            categoryId: category,
          },
        }
      );
    }

      return res.status(200).json({ msg: "Promotion has been updated"})
  }catch(e) {
    return res.status(500).json(e.message);
  }
})

router.delete("/:id", async(req,res)=>{
  const id = req.params.id;
  console.log("promotion", id);
  try{
    await Promotion.destroy({ where: { id }});
    return res.status(200).json({msg: "Promotion has been deleted"});
  }catch(e) {
    return res.status(500).json(err);
  }
})

module.exports = router;
