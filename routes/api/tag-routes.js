const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { destroy } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      "id", "tag_name"
    ],
    include: [
      {
        model: ProductTag,
        attributes: ["product_id"],
        include: {
          model: Product,
          attributes: [
            "product_name",
            "price",
            "stock",
            "category_id"
          ]
        }
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      "id", "tag_name"
    ],
    include: [
      {
        model: ProductTag,
        attributes: ["product_id"],
        include: {
          model: Product,
          attributes: [
            "product_name",
            "price",
            "stock",
            "category_id"
          ]
        }
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => res.status(200).json(newTag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
      if(!tagData) {
        res.status(404).json({ message: "No tag with this id exists in the database." });
        return;
      }
  res.status(200).json({ message: "This tag has been successfully updated!" })
})
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
    if(!tagData) {
      res.status(404).json({ message: "No tag with this id exists in the database." });
      return;
    }
    res.status(200).json({ message: "Successfully deleted!"});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;