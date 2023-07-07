import Warehouse from "../models/warehouseModel.js";

const wareCntrl = {
  getWares: async (req, res) => {
    try {
      const warehouses = await Warehouse.find();

      res.json(warehouses);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getWare: async (req,res) => {
    try{
      const _id = req.params.id; 
      const ware = await Warehouse.findById(_id)

      res.json(ware)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createWare: async (req, res) => {
    try {
      const { name, address, state, country, zip, point } = req.body;

      const newWare = new Warehouse({
        name,
        address,
        state,
        country,
        zip,
        point
      });

      await newWare.save();
      res.json(newWare);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteWare: async (req, res) => {
    try {
      const _id = req.params.id;
      const ware = await Warehouse.findByIdAndDelete({ _id: _id });

      return res.status(204).json({ msg: `${_id} Deleted` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default wareCntrl;
